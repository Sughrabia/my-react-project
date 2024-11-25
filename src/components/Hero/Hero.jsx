import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";
import kidsCollection from "../assets/Kids collection.png";
import womenCollection from "../assets/Women Collection.png";
import menCollection from "../assets/Mens collection.png";

const Hero = () => {
  const slides = [
    {
      content: (
        <>
          <h1>Dress Dynamo</h1>
          <button className="btn shop-now">Shop Now</button>
          <button className="btn-cart">Cart</button>
        </>
      ),
    },
    {
      content: (
        <>
          <h2>Kids Collection</h2>
          <img src={kidsCollection} alt="Kids Collection" />
        </>
      ),
    },
    {
      content: (
        <>
          <h2>Women Collection</h2>
          <img src={womenCollection} alt="Women Collection" />
        </>
      ),
    },
    {
      content: (
        <>
          <h2>Men Collection</h2>
          <img src={menCollection} alt="Men Collection" />
        </>
      ),
    },
    {
      content: (
        <>
          <h2>Join Us Today!</h2>
          <p>Sign up to get the latest updates and offers.</p>
          <button className="btn sign-up">Sign Up</button>
        </>
      ),
    },
    {
      content: (
        <>
          <h2>Online Clothing Company</h2>
          <p>
            Email:{" "}
            <a href="mailto:dressdynamo123@gmail.com">
              dressdynamo123@gmail.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="http://www.dressdynamo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.dressdynamo.com
            </a>
          </p>
        </>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();

  const updateSlide = useCallback((index) => {
    setCurrentIndex(index);
    if (slideRef.current) {
      const width = slideRef.current.clientWidth;
      slideRef.current.style.transform = `translateX(${-index * width}px)`;
    }
  }, []);

  const nextSlide = useCallback(() => {
    const index = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateSlide(index);
  }, [currentIndex, slides.length, updateSlide]);

  const prevSlide = useCallback(() => {
    const index = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateSlide(index);
  }, [currentIndex, slides.length, updateSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="hero">
      <div className="banner-container">
        <div className="slides" ref={slideRef}>
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              {slide.content}
            </div>
          ))}
        </div>
        <div className="navigation">
          <button className="nav-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="nav-btn next" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
