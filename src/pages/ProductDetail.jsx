import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/productdetail.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${productId}`);
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

  return (
    <div className="product-details">
      <div className="main-image-container">
        <img src={product.image} alt={product.name} className="main-image" />
      </div>
      <div className="product-info">
        <h1 style={{textTransform:'capitalize'}} className="product-title">{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart">ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductDetails;
