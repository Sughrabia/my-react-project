import { useContext, useEffect, useState } from "react";
import "./css/shopcategory.css"; 
import { shopContext } from "../Context/ShopContext";

const ShopCategory = (props) => {
  const { all_products, setProducts } = useContext(shopContext);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Fetch products from the backend API
    fetch('http://localhost:5000/product') 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Update the context with the products fetched
        setLoading(false);  // Stop loading
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [setProducts]);

  if (loading) {
    return <p>Loading products...</p>; // Show loading message until data is fetched
  }

  return (
    <div className='Shopcategory'>
      <div className='Banner'>
        <div className='banner-detail'>
          <h1>Flat 50% off</h1>
          <p>12 hours 20 mins</p>
          <button className='explore-more'>Explore More</button>
        </div>
        <div><img src={props.banner} alt="Banner" className='banner-img' /></div>
      </div>
      <p><span>Showing 1-12</span> out of products</p>
      <div className='shopcategory-products'>
        {all_products
          .filter((item) => item.category === props.category) // Filter products by category
          .map((item) => (
            <div key={item._id} className='all_products-item'> {/* Use _id as the key */}
              <img src={item.image} alt={item.name} className='item-img' />
              <div className='all_products-detail'>
                <h2 className='all_products-name'>{item.name}</h2>
                <p className='all_products-price old'>old price ${item.old_price}</p>
                <p className='all_products-price new'>new price ${item.new_price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopCategory;
