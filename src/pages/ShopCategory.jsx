import React from 'react'
import all_products from '../components/assets/AllProducts'

const ShopCategory = (props) => {
  const filteredProducts = all_products.filter(product => product.category === props.category);
  return (
    <div className='Shopcategory'>
        <img src={props.banner} alt="Banner" style={{ width: '90%', height: '500px' }} />
        <div>
          <p>showing 1-12 out of 36 products</p>
          <div>
            {/* sort by <img src={dropdown_icon} alt="" /> */}
          </div>
        </div>
        <div>
        { filteredProducts.map((all_products)=>(
          <div key={all_products.id} className='all_products-item'>
            <img src={all_products.image} alt={all_products.name} className='item-img'/>
            <div className='all_products-detail'>
              <h2 className='all_products-name'>{all_products.name}</h2>
              <p className='all_products-price'>${all_products.old_price}</p>
              <p className='all_products-price'>${all_products.new_price}</p>
            </div>

          </div>
         
           
        ))}
        </div>
    </div>
  );
};

export default ShopCategory
