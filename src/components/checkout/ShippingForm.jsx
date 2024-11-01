import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../Context/CartContext';
import './checkout.css';



const ShippingForm = ({ onSubmit }) => {

  console.log('Received onSubmit prop:', onSubmit); // Check the value of onSubmit

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    province: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(formData); 
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <div className="shipping-form">
      <h2>Ship To</h2>
      <form onSubmit={handleSubmit}>
        <div className="twofields">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
         
        </div>
        <div className="twofields">
          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Town/City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Province</label>
          <select name="province" value={formData.province} onChange={handleChange} required>
            <option value="">Please Select</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Blochistan">Balochistan</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-next">Next</button>
      </form>
    </div>
  );
};

export default ShippingForm;
