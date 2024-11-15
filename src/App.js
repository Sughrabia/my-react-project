import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetail';
// import Cart from './components/checkout/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import FAQ from './components/FAQ/FAQ';
import Login from './pages/login';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import NewCollection from './components/NewCollection/NewCollection';
import { CartProvider } from './Context/CartContext';
// import Checkout from './components/checkout/checkout';
import Verification from './pages/verification';

function App() {
  return (
    <div>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/Men' element={<ShopCategory category="Men" />} />
          <Route path='/Women' element={<ShopCategory category="Women" />} />
          <Route path='/Kid' element={<ShopCategory category="kid" />} />
          <Route path='/Product' element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path='/Loginsignup' element={<LoginSignup />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contactus />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/NewCollection' element={<NewCollection/>}/>
          {/* <Route path='/orderdetails'  element={<Checkout/>}/> */}
          <Route path='/verify/:token'  element={<Verification/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      </CartProvider>,
    </div>
  );
}

export default App;
