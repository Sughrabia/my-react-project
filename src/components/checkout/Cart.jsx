import React, { useState, useEffect } from 'react';
import './cart.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const Cart = () => {
  const { cartItems} = useCart(); // Destructure from context
  const [fetchedCartItems, setFetchedCartItems] = useState([]); // Rename state

  useEffect(() => {
    // Fetch cart data if needed
    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        setFetchedCartItems(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  // Use fetchedCartItems or cartItems depending on your needs
  const itemsToDisplay = fetchedCartItems.length > 0 ? fetchedCartItems : cartItems;

  const subtotal = itemsToDisplay.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20; 
  const total = subtotal + shipping;

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/remove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFetchedCartItems(itemsToDisplay.filter(item => item._id !== id));
        // Optionally update context cartItems if you're using context for cart state
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
          {itemsToDisplay.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            itemsToDisplay.map(item => (
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
