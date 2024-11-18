import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/productdetail.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = () => {
    // Data to be sent to the backend for the cart item
    const cartItem = {
      name: product.name,
      quantity: 1,
      price: product.price,
      imageUrl: product.imageUrl,
    };

    // API call to add product to cart
    fetch('https://glamgrabbackend-dxah8u9g.b4a.run/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
        alert('Product added to cart!');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      });
  };


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://glamgrabbackend-dxah8u9g.b4a.run/product/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error fetching product details: {error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  console.log('Raw Image URL:', product.imageUrl);
  const normalizedimageUrl = product.imageUrl?.replace(/\\/g, '/') || '';
  console.log('Normalized Image URL:', normalizedimageUrl);

  return (
    <div className="product-details">
      <div className="main-image-container">
        {normalizedimageUrl ? (
          <img
            src={normalizedimageUrl}
            alt={product.name}
            className="main-image"
          />
        ) : (
          <p>Image not available</p>
        )}
      </div>
      <div className="product-info">
        <h1 style={{textTransform:'capitalize'}} className="product-title">{product.name}</h1>
        <p className="product-price"><span>Price</span> ${product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart" onClick={addToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductDetails;
