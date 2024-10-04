import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Popular.css'


const NewCollection = ( props) => {
  const [all_products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Fetch products from the backend API
    fetch('http://localhost:5000/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Update the state with the products fetched
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Stop loading on error as well
      });
  }, []); // Remove setProducts from the dependency array

  if (loading) {
    return <p>Loading products...</p>; // Show loading message until data is fetched
  }

  return (
    <div className='new-collection'>
      <div>
        <h1>Popular In Women</h1>
        <hr />
      </div>

      <div className='shopcategory-products'>
        {all_products.length > 0 ? ( // Check if there are products to display
          all_products
          .filter((item) => item.category === props.category)
          .map((item) => (
            <div key={item._id} className='all_products-item'> {/* Use _id as the key */}
              <Link style={{textDecoration:'none'}} to={`/product/${item._id}`}>
              <img src={`http://localhost:5000/${item.image}`} alt={item.name} className='item-img' />
              <div className='all_products-detail'>
                <h2 className='all_products-name'>{item.name}</h2>
                <p className='all_products-price new'>Price: ${item.price}</p>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p> // Handle case where no products are found
        )}
      </div>
    </div>
  );
};

export default NewCollection;
