import React, { useState } from 'react';
import Cart from './Cart';
import { useCart } from '../../Context/CartContext';
import ShippingDetail from './shippingdetail';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cart.css';

const Checkoutpage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCheckoutClick = () => {
    setStep(2); // Move to ShippingDetail step
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        cartItems,
        shippingDetails,
        paymentMethod,
      };
      const response = await axios.post('https://glamgrabbackend-dxah8u9g.b4a.run/order/detail', orderData);
      console.log('Order created:', response.data);
      alert('Order placed successfully!');
      clearCart();
      setStep(1); // Reset to cart step
      navigate('/'); // Navigate to home page after success
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {step === 1 && (
        <div>
          <Cart />
          <div className="button-container">
            <button className="checkout-button" onClick={handleCheckoutClick}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <ShippingDetail
            onShippingUpdate={setShippingDetails}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          {loading ? (
            <div className="loading">Placing your order...</div>
          ) : (
            <button onClick={handlePlaceOrder} className="place-order-button">
              Place Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkoutpage;
