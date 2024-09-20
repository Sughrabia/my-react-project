import React from 'react'
import Hero from '../components/Hero/Hero';
import Popluar from '../components/Popular/Popluar';
import Offer from '../components/Offer/Offer';
import NewCollection from '../components/NewCollection/NewCollection';
import Newsletter from '../components/Newsletter/Newsletter';
import Post from '../components/post/Post';

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popluar/>
      <Offer/>
      <NewCollection/>
      <Newsletter/>
      <Post/>
    </div>
  );
}

export default Shop
