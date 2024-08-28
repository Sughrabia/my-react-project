import React from 'react'
import "./Popular.css"
import product from '../assets/product.jpg'; 
import product1 from '../assets/product1.jpg'; 
import product2 from '../assets/product2.jpg'; 
import product3 from '../assets/product3.jpg'; 



const Popluar = () => {

    const productsitems = [
        {
            id: 1,
            name: "Sample Product 1",
            description: "This is the first sample product.",
            price: 19.99,
            image: product,
        },
        {
            id: 2,
            name: "Sample Product 2",
            description: "This is the second sample product.",
            price: 29.99,
            image: product1,
        },
        {
            id: 3,
            name: "Sample Product 3",
            description: "This is the third sample product.",
            price: 39.99,
            image: product2,
        },
        {
            id: 4,
            name: "Sample Product 2",
            description: "This is the fourth sample product.",
            price: 29.99,
            image: product3,
        },
    ];
    

  return (
    <div className='popular-products'>
        <div className='heading'> <h1> POPULAR IN WOMENS</h1><hr/></div>
        <div className='list-products'>
        {productsitems.map((product) => (
            <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
            </div>
        ))}
        </div>
       
    </div>
  );
};

export default Popluar
