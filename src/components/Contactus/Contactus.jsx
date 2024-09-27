import React from 'react';
import './Contactus.css';

const Contactus = () => {
  return (
    <div className='contactus'>
      <div className='contactus-heading'>
        <h1>Contact Us</h1>
        <p>
          Have any questions? We're here to help! Reach out to us and we'll get
          back to you as soon as possible.
        </p>
      </div>
      
      <div className='contactus-info'>
        <div className='contact-details'>
          <p><strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Email:</strong> support@glamgrab.com</p>
        </div>

        <div className='contactus-form'>
          <h3>Send Message</h3>
          <form>
            <input type='text' placeholder='Full Name' required />
            <input type='email' placeholder='Email' required />
            <textarea placeholder='Type your message...' required />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
