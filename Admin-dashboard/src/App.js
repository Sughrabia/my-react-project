import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import Settings from './components/Setting.jsx';
import ManageUser from './components/ManageUser.jsx';
import Product from './components/product/Product.jsx';
import CreateProduct from './components/product/CreateProduct.jsx'
import EditProduct from './components/product/EditProduct.jsx'

function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<ManageUser/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct/>} />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;