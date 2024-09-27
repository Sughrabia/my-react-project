import React from 'react';
import './About.css';
import aboutImage from '../assets/about.jpg'; // Add your image here

const About = () => {
  return (
    <div className="about-container">
      <div className="about-description">
        <h1>About Us</h1>
        <p><b>Welcome to DressDymano – Your Ultimate Fashion Destination</b></p>
        <p>
          At DressDymano, we believe that fashion is more than just clothes; it's an expression of individuality. Since our inception in 2020, we've been committed to offering trendy, sustainable, and affordable fashion choices for men, women, and kids. Whether you want to make a statement with bold prints or prefer something more classic, DressDymano has you covered.
        </p>
        <p>
          Our collection ranges from everyday essentials to occasion wear, ensuring you always have the perfect outfit ready. With a focus on quality, we make sure each piece is crafted with care and attention to detail. We understand the importance of fashion for all, and that's why we cater to a wide variety of sizes and preferences.
        </p>
        <p>
          Join the DressDymano community and discover fashion that speaks to you. Our mission is to provide not just clothes, but confidence, creativity, and self-expression.
        </p>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="About DressDymano" />
      </div>
    </div>
  );
};

export default About;
