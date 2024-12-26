import React, { useState } from 'react'
import './Navbar.css'
import cartIcon from '../assets/cart.png';
import logo from '../assets/0a4b4043f420749c14b94ed5a1e684c1-removebg-preview (1).png';
import { Link } from 'react-router-dom';



const Navbar = () => {

  const[menu, setMenu] = useState("shop");
  return (
    <div className='Navbar'>
      <div className='nav-logo'>
        < img src={logo} alt='img' className='logo'/>
        <p>Dressdynamo</p>
      </div>
        <ul className='nav-menu '>
            <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Men")}}>  <Link style={{textDecoration:'none'}}  to='/Men'>Men </Link> {menu==="Men"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("Women")}}> <Link style={{textDecoration:'none'}}  to='/Women'>Women</Link> {menu==="Women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kid")}}>  <Link style={{textDecoration:'none'}}  to='/kid'>Kids</Link> {menu==="kid"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
        <Link to="/loginSignup">
          <button>Login </button>
        </Link>
          <Link to='/orderdetails'><img src={cartIcon } alt='img' className='cart'/></Link>
          <div className='nav-cart-count'></div>
        </div>

    </div>
  )
}

export default Navbar
