import React, { useState, useEffect } from 'react';
import './cart.css';
import { useCart } from '../../Context/CartContext';

const Cart = ({ onCartUpdate }) => {
  const { cartItems } = useCart();
  const [fetchedCartItems, setFetchedCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('https://glamgrabbackend-dxah8u9g.b4a.run/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        console.log(data);  // Log the fetched data to see the actual content
        setFetchedCartItems(data);

        const initialQuantities = {};
        data.forEach((item) => {
          initialQuantities[item._id] = item.quantity || 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [onCartUpdate]);

  const itemsToDisplay = fetchedCartItems.length > 0 ? fetchedCartItems : cartItems;

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`https://glamgrabbackend-dxah8u9g.b4a.run/cart/remove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFetchedCartItems(itemsToDisplay.filter((item) => item._id !== id));
      } else {
        console.error('Error removing item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate subtotal and total
  const subtotal = itemsToDisplay.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    if (isNaN(itemPrice)) {
      console.warn(`Invalid price for item ${item._id}, setting to 0`);
      return acc;
    }
    return acc + itemPrice * (quantities[item._id] || 1);
  }, 0);
  
  const shipping = 20; // Flat rate shipping
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {itemsToDisplay.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            itemsToDisplay.map((item) => (
              <div className="cart-item" key={item._id}>
                {item.imageUrl ? (
                  <img
                    src={`${item.imageUrl.replace(/\\/g, '/')}`} // Normalize image path
                    alt={item.name}
                    className="cart-item-image"
                  />
                ) : (
                  <p>Image not available</p>
                )}
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>Quantity:</p>
                  <button onClick={() => handleDecrease(item._id)}>-</button>
                  <input type="number" value={quantities[item._id] || 1} min="1" readOnly />
                  <button onClick={() => handleIncrease(item._id)}>+</button>

                  <p>
                    Price: ${((parseFloat(item.price) || 0) * (quantities[item._id] || 1)).toFixed(2)}
                  </p>
                  <button onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Shipping: ${shipping.toFixed(2)}</p>
          <p>Total: USD ${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
