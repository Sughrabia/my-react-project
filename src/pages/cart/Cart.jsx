import React, { useState, useEffect } from 'react';
import './cart.css';
import {Link} from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);


  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20; 
  const total = subtotal + shipping;


  const handleRemove = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/remove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item._id !== id));
      } else {
        console.error('Error removing item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item._id}>
                <img src={`/${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>Quantity: 
                    <input type="number" value={item.quantity} min="1" readOnly />
                  </p>
                  <p>Price: ${item.price}</p>
                  <button onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Shipping: ${shipping}</p>
          <p>Total: USD ${total.toFixed(2)}</p>
          <input type="text" placeholder="Enter coupon code" className="coupon-input" />
          <Link to='/checkout'><button className="checkout-button">Checkout</button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
