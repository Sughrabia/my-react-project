import React, { useState } from 'react';
import './shippingdetail.css';

const Shippingdetail = ({ onShippingUpdate, paymentMethod, setPaymentMethod }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onShippingUpdate(updatedData); // Pass updated shipping details to parent
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="checkout-container">
      <div>
        <h2>Delivery Information</h2>
        <div className="delivery-info">
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <div className="location-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="postal-fields">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <div className="payment-method">
          <h3>Payment Method</h3>
          <label className="paymentmethod">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={() => handlePaymentMethodChange('COD')}
            />
            COD (Cash on Delivery)
          </label>
          <label className="paymentmethod">
            <input
              type="radio"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={() => handlePaymentMethodChange('Stripe')}
            />
            Stripe (Credit / Debit)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Shippingdetail;
