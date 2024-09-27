import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import CustomPages from './components/Custompages/CustomPage.jsx';
import PageList from './components/PageList.jsx'
import Settings from './components/Setting.jsx';
import ManageUser from './components/ManageUser.jsx';
import Product from './components/product/Product.jsx';
import CreateProduct from './components/product/CreateProduct.jsx'
import EditProduct from './components/product/EditProduct.jsx'
import CreateCustomPage from './components/Custompages/CreatePage.jsx';

function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/custompages" element={<CustomPages />} />
          <Route path="/create-custompage/:slug" element={<CreateCustomPage/>}/>
          <Route path="/pages" element={<PageList/>}/>
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