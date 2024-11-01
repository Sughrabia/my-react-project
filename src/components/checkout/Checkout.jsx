// CheckoutPage.jsx
import React, { useState } from 'react';
import ShippingForm from './ShippingForm';
import Cart from './Cart';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [shippingData, setShippingData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1 for Cart, 2 for ShippingForm
  const navigate = useNavigate();

  // Function to collect shipping data from the ShippingForm component
  const handleShippingData = (data) => {
    setShippingData(data);
    console.log('Shipping data:', data);
    setCurrentStep(1); // Move back to Cart or next step if needed
  };

  // Function to handle the checkout submission
  const handleCheckout = async () => {
    if (!shippingData) {
      alert("Please complete the shipping form.");
      return;
    }

    const orderData = {
      shippingDetails: shippingData,
      cartItems: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20, // Calculate total with shipping
    };

    try {
      const response = await fetch('http://localhost:5000/shipping/order', { // Make sure this URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), // This should be a valid JSON string
      });

      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/orderdetails'); // Redirect after order
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
};
  const handleNextStep = () => {
    setCurrentStep(2); // Move to the next step (ShippingForm)
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <Cart />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h1>Checkout</h1>
          <ShippingForm onSubmit={handleShippingData} />
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
