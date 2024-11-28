import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import { Link } from 'react-router-dom';

const NewCollection = () => {
  const [all_products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false); // State to toggle between showing 8 or all products

  useEffect(() => {
    // Fetch products from the backend API
    fetch('https://ordermanagementserver1-a6huju4d.b4a.run/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  // Show only the first 8 products or all products based on the `showMore` state
  const productsToDisplay = showMore ? all_products : all_products.slice(0, 8);

  return (
    <div className="new-collection">
      <div>
        <h1>New Collections</h1>
        <hr />
      </div>

      <div className="shopcategory-products">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((item) => {
            // Normalize the image URL
            const normalizedimageUrl = item.imageUrl?.replace(/\\/g, '/') || '';

            return (
              <div key={item._id} className="all_products-item">
                <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
                  {normalizedimageUrl ? (
                    <img
                      src={normalizedimageUrl}
                      alt={item.name}
                      className="c-item-img"
                    />
                  ) : (
                    <p>Image not available</p>
                  )}
                  <div className="all_products-detail">
                    <h2 className="all_products-name">{item.name}</h2>
                    <p className="all_products-price new">Price: ${item.price}</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className="view-more-button-container">
        {all_products.length > 8 && !showMore && (
          <button className="view-more-button" onClick={() => setShowMore(true)}>
            View More
          </button>
        )}
        {showMore && (
          <button className="view-more-button" onClick={() => setShowMore(false)}>
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default NewCollection;
