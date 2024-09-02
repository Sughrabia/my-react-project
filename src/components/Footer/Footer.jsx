import React, { useState } from 'react'
import "./Footer.css"
import logo from "../assets/logo.avif"
import { Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [Footer, setFooter] = useState("");
  return (
    <div className='Footer'>
      <div className='footer-logo'>
        < img src={logo} alt='img' className='logo'/>
        <p>GlamGrab</p>
      </div>
      <div className='footer-list'>
        <ul>
            <li onClick={()=>{setFooter("company")}}><Link style={{textDecoration:"none", color:"black"}} to='/company'>Company</Link>{Footer==="company"}</li>
            <li onClick={()=>{setFooter("aboutus")}}> <Link style={{textDecoration:"none", color:"black"}} to='/aboutus'>about us</Link>{Footer==="aboutus"} </li>
            <li onClick={()=>{setFooter("contactus")}}> <Link style={{textDecoration:"none", color:"black"}} to='/contactus'>contact us</Link>{Footer==="contactus"}</li>
            <li onClick={()=>{setFooter("office")}}> <Link style={{textDecoration:"none", color:"black"}} to='/office'>office</Link> {Footer==="office"}</li>
            <li onClick={()=>{setFooter("products")}}> <Link style={{textDecoration:"none", color:"black"}} to='/product'>products</Link>{Footer==="product"}</li>
        </ul>
      </div>
      <div className='social-icons'>
        <Facebook/>
        <WhatsApp/>
        <Instagram/>
        <LinkedIn/>

      </div>
    </div>
  )
}

export default Footer
