const fs = require('fs');

const categories = ['Electronics', 'Footwear', 'Clothing', 'Accessories'];
const subCategories = {
    'Electronics': ['Smartphone', 'Laptop', 'Headphones', 'Smartwatch', 'Camera'],
    'Footwear': ['Running Shoes', 'Sneakers', 'Formal Shoes', 'Sandals'],
    'Clothing': ['T-Shirt', 'Jeans', 'Hoodie', 'Jacket', 'Dress'],
    'Accessories': ['Backpack', 'Sunglasses', 'Wallet', 'Watch']
};

const brands = {
    'Electronics': ['Apple', 'Samsung', 'Sony', 'Dell', 'Logitech', 'Xiaomi', 'OnePlus'],
    'Footwear': ['Nike', 'Adidas', 'Puma', 'Reebok', 'Bata'],
    'Clothing': ['Levi\'s', 'H&M', 'Zara', 'USPA', 'Roadster'],
    'Accessories': ['Fossil', 'Ray-Ban', 'Fastrack', 'Wildcraft']
};

const products = [];

for (let i = 1; i <= 60; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subCategory = subCategories[category][Math.floor(Math.random() * subCategories[category].length)];
    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
    const price = Math.floor(Math.random() * (100000 - 500) + 500);
    
    const getKeywords = (cat, sub) => {
        const mapping = {
            'Electronics': 'gadget,technology',
            'Footwear': 'footwear,sneakers',
            'Clothing': 'fashion,apparel',
            'Accessories': 'accessory,style'
        };
        let extra = sub.toLowerCase();
        if (extra.includes('formal shoes')) extra = 'business,shoes';
        if (extra.includes('smartphone')) extra = 'mobile,phone';
        if (extra.includes('laptop')) extra = 'computer,laptop';
        
        return `${mapping[cat]},${extra.replace(' ', ',')}`;
    };

    products.push({
        id: i,
        name: `${brand} ${subCategory} ${i}`,
        description: `This is a high-quality ${subCategory} from ${brand}. Features include durable build and modern design.`,
        price: price,
        category: category,
        image: `https://loremflickr.com/400/400/${getKeywords(category, subCategory)}?lock=${i}`
    });
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Generated 60 products');
