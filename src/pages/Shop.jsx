import React from 'react'
import Hero from '../components/Hero/Hero';
import Popluar from '../components/Popular/Popluar';
import Offer from '../components/Offer/Offer';
import NewCollection from '../components/NewCollection/NewCollection';


const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popluar category="Popular" />
      <Offer/>
      <NewCollection/>
    </div>
  );
}

export default Shop
