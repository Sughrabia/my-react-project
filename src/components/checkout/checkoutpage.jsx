import React, { useState } from 'react';
import Cart from './Cart';
import { useCart } from '../../Context/CartContext';
import ShippingDetail from './shippingdetail';
import axios from 'axios';
import './cart.css'

const Checkoutpage = () => {
  const { cartItems, clearCart } = useCart(); 
  const [shippingDetails, setShippingDetails] = useState({}); 
  const [step, setStep] = useState(1); 

  const handleCartUpdate = (items) => {
    clearCart(items);
  };

  const handleShippingUpdate = (details) => {
    setShippingDetails(details);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        cartItems,
        shippingDetails,
      };
      const response = await axios.post('http://localhost:5000/order/detail', data);
      console.log('Order created:', response.data);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleCheckoutClick = () => {
    setStep(2); // Move to ShippingDetail step
  };

  return (
    <div>
      {step === 1 && (
        <div >
          <Cart onCartUpdate={handleCartUpdate} />
          <div className="button-container">
          <button className="checkout-button" onClick={handleCheckoutClick}>Checkout</button>
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div>
          <ShippingDetail onShippingUpdate={handleShippingUpdate} />
          <button onClick={handleSubmit}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkoutpage;
