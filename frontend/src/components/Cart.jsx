import React from 'react';
import { Trash2, X } from 'lucide-react';

const Cart = ({ cart, onRemove, onCheckout, onClose }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-overlay">
            <div className="cart-modal">
                <div className="cart-header">
                    <h2>Your Cart ({cart.length})</h2>
                    <button className="close-btn" onClick={onClose}><X /></button>
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price.toLocaleString()}</p>
                                </div>
                                <button className="remove-btn" onClick={() => onRemove(index)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="total">
                            <span>Total:</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
