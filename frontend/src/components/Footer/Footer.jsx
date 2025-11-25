import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1>NiceDate.</h1>
            <p>Reg.Office Mumbai : 204, Kulsum Apartment, oppsite to.L-Ward, Kurla(W), Mumbai-400070.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/AboutUs">About Us</Link></li>
                <li><Link to="/PrivacyPolicy">Privacy policy</Link></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9820739343</li>
                <li>contact@NiceDate.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © NiceDates.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
