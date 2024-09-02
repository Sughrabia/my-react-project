import React from 'react'
import "./NewCollection.css"
import collec from "../assets/collec.jpg"
import collec1 from "../assets/collec1.jpg"
import collec2 from "../assets/collec2.jpg"
import collec3 from "../assets/collec3.jpg"
import collec4 from "../assets/collec4.jpg"
import collec5 from "../assets/collec5.jpg"
import collec6 from "../assets/collec6.jpg"
import collec7 from "../assets/collec7.jpg"


const NewCollection = () => {
  const collection=[
    {
      id:1,
      name:" sample collection 1",
      description: "this is first sample collection",
      price: 20,
      image:collec,
    },
    {
      id:2,
      name:"sample collection 2",
      description: "this is second sample collection",
      price: 20,
      image: collec1,
    },
    {
      id:3,
      name:"sample collection 3",
      description: "this is third sample collection",
      price: 20,
      image: collec2,
    },
    {
      id:4,
      name:"sample collection 4",
      description: "this is fourth sample collection",
      price: 20,
      image: collec3,
    },
    {
      id:5,
      name:"sample collection 5",
      description: "this is fifth sample collection",
      price: 20,
      image: collec4,
    },
    {
      id:6,
      name:"sample collection 6",
      description: "this is sixth sample collection",
      price: 20,
      image: collec5,
    },
    {
      id:7,
      name:"sample collection 7",
      description: "this is seventh sample collection",
      price: 20,
      image: collec6,
    },
    {
      id:8,
      name:"sample collection 8",
      description: "this is eighth sample collection",
      price: 20,
      image: collec7,
    },
    
  ];
  return (
    <div className='new-collection'>
      <div><h1>new collections</h1><hr/></div>
      <div className='collection-list'>
        {collection.map((collection)=>(
          <div key={collection.id} className='collection-item'>
            <img src={collection.image} alt={collection.name} className='item-img'/>
            <div className='collection-detail'>
              <h2 className='collection-name'>{collection.name}</h2>
              <p className='collection-description'>{collection.description}</p>
              <p className='collection-price'>${collection.price.toFixed(2)}</p>
            </div>

          </div>
         
           
        ))}
            

      </div>
      
    </div>
  );
};

export default NewCollection
