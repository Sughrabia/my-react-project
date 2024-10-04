import React, { useState } from 'react';
import './Footer.css';
import { Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <h2 className="newsletter-heading">Get Exclusive Offers</h2>
        <p>Subscribe to our newsletter and stay updated on the latest trends and offers.</p>
        <div className="newsletter-input">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Your Email Address"
            className="input-value"
          />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>

      {/* Footer Info Section */}
      <div className="footer-info">
        {/* Schedule and Address */}
        <div className="footer-schedule-contact">
          <h3>Schedule</h3>
          <p>Monday - Sunday</p>
          <h3>Address</h3>
          <p>123 Fashion Avenue, New York, NY 10001</p>
          <h3>Contact</h3>
          <a href="mailto:example@email.com" style={{textDecoration:'none', color:'white'}} target="_blank" rel="noopener noreferrer">
          <p>Email: support@glamgrab.com</p>
          </a>
          
          <p>Phone: +1 234 567 890</p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <h3>Pages</h3>
          <ul>
            <li><Link to='/about-us'>About Us</Link></li>
            <li><Link to='/contact-us'>Contact Us</Link></li>
            <li><Link to='/FAQ'>FAQ</Link></li>
            <li><Link to='/Product'>Products</Link></li>
            <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="social-icon" />
          </a>
          <a
                href="https://wa.me/03047208014" // Replace '1234567890' with the WhatsApp phone number
                target="_blank"
                rel="noopener noreferrer"
            >
                <WhatsApp className="social-icon" />
          </a>      
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="social-icon" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedIn className="social-icon" />
          </a>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
