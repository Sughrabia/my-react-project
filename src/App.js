import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetail';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import FAQ from './components/FAQ/FAQ';
import Women_banner from './components/assets/Women_banner.png';
import Men_banner from './components/assets/Men_banner.png';
import Kids_banner from './components/assets/Kids_banner.png';
import Login from './pages/login';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import NewCollection from './components/NewCollection/NewCollection';

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
          <Route path='/Product' element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Loginsignup' element={<LoginSignup />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contactus />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/NewCollection' element={<NewCollection/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
