import React from 'react'
import './Footer.css'
import frontenlabImage from '../../../Assets/Images/frontenlab.png'
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
  return (
    <div className="Footer">

    <hr />
        <div className='footer-first'>
            <div className="footer-main">
                <div className="footer-logo-image">
                    <img src={frontenlabImage} alt="fronenlab-logo" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/'), 300); }}  />
                </div>

                <h1 className="footer-slogan">Develop your frontend skills with practical projects and support.</h1> 
            </div>

            <div className='footer-secondary'>
                <div className="footer-links">
                    <li><NavLink to="/about" >About</NavLink></li>
                    <li><NavLink to="/contact" >Contact</NavLink></li> 
                    <li><NavLink to="/challenges" >Challenges</NavLink></li> 
                    <li><NavLink to="/leaderboard" >Leaderboard</NavLink></li> 
                </div>

                <div className="footer-social">
                    <div className="social linkedin">
                        <CiLinkedin className='footer-icon'/>
                        <a href="https://linkedin.com">Linkedin</a>
                    </div>

                    <div className="social Instagram ">
                        <FaInstagram className='footer-icon' />
                        <a href="https://instagram.com">Instagram</a>
                    </div>

                    <div className="social X">
                        <FaXTwitter className='footer-icon' />
                        <a href="https://x.com">X</a>
                    </div>
                </div>
            </div>
            
        </div>

        <div className="footer-second">
            <div className="footer-second-links">
                <li><NavLink to="/terms" >Terms and Condition</NavLink></li>
                <li><NavLink to="/privacy" >Privacy policy</NavLink></li> 
            </div>

            <div className="footer-second-copyright">
                <p>© {currentYear} Frontenlab</p>
            </div>
        </div>
        

    </div>
  )
}

export default Footer