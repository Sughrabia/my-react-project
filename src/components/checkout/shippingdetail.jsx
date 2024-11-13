import React, { useState } from 'react';
import './shippingdetail.css';
import { useNavigate } from 'react-router-dom';

const Shippingdetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [cartTotals] = useState({ subtotal: 158, deliveryFee: 5, total: 163 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData; 
    });
  };


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  
  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill all required fields.');
      return;
    }
  
    const cartItems = []
  
    const orderData = {
      cartItems, 
      shippingDetails: formData, 
      paymentMethod,
      cartTotals 
    };
  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/order/detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        alert('Order placed successfully!');
        navigate('/');

      } else {
        const data = await response.json();
        alert(`Failed to place order: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('An error occurred while placing the order.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="checkout-container">
      <div>
        <h2>Delivery Information</h2>
        <div className="delivery-info">
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <div className="location-fields">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          </div>
          <div className="postal-fields">
            <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        </div>
      </div>

      <div>
        <div className="payment-method">
          <h3>Payment Method</h3>
          <div>
            <label className='paymentmethod'>
              <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={() => handlePaymentMethodChange('COD')} />
              COD (Cash on Delivery)
            </label>
            <label className='paymentmethod'>
              <input type="radio" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={() => handlePaymentMethodChange('Stripe')} />
              Stripe (Credit / Debit)
            </label>
          </div>
        </div>

        {loading ? (
          <div className="loading">Placing your order...</div>
        ) : (
          <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Shippingdetail;
