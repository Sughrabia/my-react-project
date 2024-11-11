import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Popular.css'


const NewCollection = ( props) => {
  const [all_products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend API
    fetch('https://glamgrabbackend-dxah8u9g.b4a.run/product')
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

  return (
    <div className='new-collection'>
      <div>
        <h1>Popular In Women</h1>
        <hr />
      </div>

      <div className='shopcategory-products'>
        {all_products.length > 0 ? ( 
          all_products
          .filter((item) => item.category === props.category)
          .map((item) => (
            <div key={item._id} className='all_products-item'> 
              <Link style={{textDecoration:'none'}} to={`/product/${item._id}`}>
              <img src={`https://glamgrabbackend-dxah8u9g.b4a.run/${item.imageUrl.replace(/\\/g, '/')}`} alt={item.name} className='item-img' />
              <div className='all_products-detail'>
                <h2 className='all_products-name'>{item.name}</h2>
                <p className='all_products-price new'>Price: ${item.price}</p>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p> 
        )}
      </div>
    </div>
  );
};

export default NewCollection;
