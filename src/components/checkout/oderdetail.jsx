import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderdetail.css';
import { useCart } from '../../Context/CartContext';

const OrderCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const orderDetails = {
    productName: 'Sample Product',
    price: 199.99,
    customerName: 'John Doe',
    customerAddress: '123 Main Street, City, Country',
    email: 'johndoe@example.com',
    phone: '+1234567890'
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFinishOrder = () => {
    clearCart();
    alert(`Order placed with ${paymentMethod}`);
    navigate('/');
    
  };

  return (
    <div className="order-checkout">
      <div className="left-side">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h3>Select Payment Method</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={() => handlePaymentMethodChange('Cash on Delivery')}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={() => handlePaymentMethodChange('Stripe')}
            />
            Stripe
          </label>
        </div>
      </div>

      {/* Right Side - Order Details */}
      <div className="right-side">
        <h3>Order Details</h3>
        <div className="order-detail">
          <p><strong>Product Name:</strong> {orderDetails.productName}</p>
          <p><strong>Price:</strong> ${orderDetails.price.toFixed(2)}</p>
          <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
          <p><strong>Address:</strong> {orderDetails.customerAddress}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
        </div>
        
        <button className="finish-button" onClick={handleFinishOrder}>
          Finish Order
        </button>
      </div>
    </div>
  );
};

export default OrderCheckout;
