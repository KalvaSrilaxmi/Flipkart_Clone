const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Helper to get products
const getProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
};

// GET all products
app.get('/api/products', (req, res) => {
    try {
        const products = getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load products' });
    }
});

// POST search with AI
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const products = getProducts();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        console.warn('OPENROUTER_API_KEY not found. Falling back to simple search.');
        // Simple fallback search
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
        return res.json(filtered);
    }

    try {
        const productSummary = products.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category }));
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
            messages: [
                {
                    role: 'system',
                    content: 'You are an e-commerce search assistant. Given a list of products and a user query, return only a JSON array of the product IDs that match the user\'s intent. For example: [1, 5, 23]. Return ONLY the JSON array. Do not provide explanations.'
                },
                {
                    role: 'user',
                    content: `Products: ${JSON.stringify(productSummary.slice(0, 50))}\nQuery: ${query}`
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content.trim();
        const match = content.match(/\[[\d\s,]*\]/);
        
        let matchingIds = [];
        if (match) {
            try {
                matchingIds = JSON.parse(match[0]);
            } catch (e) {
                console.error('JSON Parse error on AI response:', content);
            }
        }

        const filteredProducts = products.filter(p => matchingIds.includes(p.id));
        
        // If AI returned nothing or invalid, fall back to simple search
        if (filteredProducts.length === 0) {
            console.log('AI Search returned no results or failed to parse. Falling back.');
            return res.json(products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.category.toLowerCase().includes(query.toLowerCase())
            ));
        }

        res.json(filteredProducts);
    } catch (error) {
        console.error('AI Search Error:', error.response?.data || error.message);
        // Fallback to simple search on error
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.category.toLowerCase().includes(query.toLowerCase())
        );
        res.json(filtered);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
