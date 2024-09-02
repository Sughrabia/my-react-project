import React from 'react'
import Hero from '../components/Hero/Hero';
import Popluar from '../components/Popular/Popluar';
import Offer from '../components/Offer/Offer';
import NewCollection from '../components/NewCollection/NewCollection';
import Newsletter from '../components/Newsletter/Newsletter';

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popluar/>
      <Offer/>
      <NewCollection/>
      <Newsletter/>
    </div>
  );
}

export default Shop
