import { useContext } from "react";
import "./css/shopcategory.css"; 
import { shopContext } from "../Context/ShopContext";

const ShopCategory = (props) => {
  const { all_products } = useContext(shopContext);

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
          .filter((item) => item.category === props.category) // Filter products by the category from props
          .map((item) => (
            <div key={item.id} className='all_products-item'>
              <img src={item.image} alt={item.name} className='item-img' />
              <div className='all_products-detail'>
                <h2 className='all_products-name'>{item.name}</h2>
                <p className='all_products-price old'>${item.old_price}</p>
                <p className='all_products-price new'>${item.new_price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopCategory;
