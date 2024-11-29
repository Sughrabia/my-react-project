import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://glamgrabbackend-dxah8u9g.b4a.run/product'); // Adjust the URL as necessary
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
   
      <div style={{marginLeft:'100px', marginBottom:'300px'}}>
        <h2 style={{color:'rgb(245, 133, 6)' , fontSize:'40px'}}>Featured Products</h2>
        <div >
          {products.slice(0, 10).map((product) => (
            <div key={product._id}>
              <Link to={`/product/${product._id}`}>
                <p>{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Product;
