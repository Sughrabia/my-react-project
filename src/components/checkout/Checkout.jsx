import React from 'react';
import ShippingForm from './ShippingForm';
import './checkout.css'; 

const Checkout = () => {
  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1>Crate&Barrel</h1>
        <p className="checkout-title">Checkout</p>
        
        < ShippingForm />

      </div>
    </div>
  );
}

export default Checkout;
