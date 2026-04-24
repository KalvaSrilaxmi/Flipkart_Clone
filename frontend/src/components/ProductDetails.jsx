import React from 'react';
import { X } from 'lucide-react';

const ProductDetails = ({ product, onClose, onAddToCart }) => {
    if (!product) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}><X /></button>
                <div className="product-details-view">
                    <div className="image-section">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="info-section">
                        <h1>{product.name}</h1>
                        <p className="category-badge">{product.category}</p>
                        <p className="price-tag">₹{product.price.toLocaleString()}</p>
                        <div className="description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>
                        <button className="add-btn" onClick={() => {
                            onAddToCart(product);
                            onClose();
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
