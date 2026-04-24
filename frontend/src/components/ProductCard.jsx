import React from 'react';

const ProductCard = ({ product, onAddToCart, onClick }) => {
    return (
        <div className="product-card" onClick={() => onClick(product)}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
