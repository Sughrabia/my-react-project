import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<Shop/>}/>
        <Route path='/Men'  element={<ShopCategory category="Men"/>}/>
        <Route path='/Women'  element={<ShopCategory category="Women"/>}/>
        <Route path='/Kids'  element={<ShopCategory category="kids"/>}/>
        <Route>
          <Route path='/Product' element={<Product/>} />
          <Route path=':ProductID' element={<Product/>}/>
        </Route>
        <Route path='/Cart' element={<Cart/>}/> 
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
