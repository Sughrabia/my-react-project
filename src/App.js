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
import Women_banner from './components/assets/Women_banner.png';
import Men_banner from './components/assets/Men_banner.png';
import Kids_banner from './components/assets/Kids_banner.png';
import Login from './pages/login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/Men' element={<ShopCategory banner={Men_banner} category="Men" />} />
          <Route path='/Women' element={<ShopCategory banner={Women_banner} category="Women" />} />
          <Route path='/Kid' element={<ShopCategory banner={Kids_banner} category="kid" />} />
          <Route path='/Product/:ProductID' element={<Product />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Loginsignup' element={<LoginSignup />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/Company' element={<Company />} />
          <Route path='/AboutUs' element={<About />} />
          <Route path='/ContactUs' element={<Contactus />} />
          <Route path='/Office' element={<Office />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
