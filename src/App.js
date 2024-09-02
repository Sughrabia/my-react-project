import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import Company from './components/Company/Company';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import Office from './components/Office/Office';
import Women_banner from './components/assets/Women_banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<Shop/>}/>
        <Route path='/Men'  element={<ShopCategory  category="Men"/>}/>
        <Route path='/Women'  element={<ShopCategory banner={Women_banner} category="Women"/>}/>
        <Route path='/Kid'  element={<ShopCategory category="kid"/>}/>
        <Route>
          <Route path='/Product' element={<Product/>} />
          <Route path=':ProductID' element={<Product/>}/>
        </Route>
        <Route path='/Cart' element={<Cart/>}/> 
        <Route path='/login' element={<LoginSignup/>}/>
        
      </Routes>
     
      <Routes>
        <Route path='/company' element={<Company/>}/>
        <Route path='/aboutus' element={<About/>}/>
        <Route path='/contactus' element={<Contactus/>}/>
        <Route path='/office' element={<Office/>}/>
        <Route path='/product' element={<Product/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
