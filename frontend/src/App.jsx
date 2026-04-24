import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Loader2 } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/products`);
            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setFilteredProducts(products);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/search`, { query: searchQuery });
            setFilteredProducts(res.data);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const handleCheckout = () => {
        setCart([]);
        setIsCartOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // Auto-hide after 5s
    };

    return (
        <div className="app">
            {showSuccess && (
                <div className="success-banner">
                    <div className="success-content">
                        <div className="check-icon">✓</div>
                        <h2>Order placed successfully!</h2>
                        <p>Thank you for shopping with FlipKartAI.</p>
                        <button onClick={() => setShowSuccess(false)}>Continue Shopping</button>
                    </div>
                </div>
            )}
            <header className="navbar">
                <div className="nav-container">
                    <div className="logo">FlipKartAI</div>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Try 'gaming phone under 15k'..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit"><Search size={20} /></button>
                    </form>
                    <div className="nav-actions">
                        <button className="cart-icon" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCart size={24} />
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container">
                {loading ? (
                    <div className="loader">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Searching for best products...</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={addToCart}
                                onClick={setSelectedProduct}
                            />
                        ))}
                    </div>
                )}
                {!loading && filteredProducts.length === 0 && (
                    <div className="no-results">
                        <p>No products found for "{searchQuery}"</p>
                        <button onClick={fetchProducts}>Reset View</button>
                    </div>
                )}
            </main>

            {isCartOpen && (
                <Cart 
                    cart={cart} 
                    onRemove={removeFromCart} 
                    onCheckout={handleCheckout} 
                    onClose={() => setIsCartOpen(false)}
                />
            )}

            {selectedProduct && (
                <ProductDetails 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={addToCart}
                />
            )}
        </div>
    );
}

export default App;
