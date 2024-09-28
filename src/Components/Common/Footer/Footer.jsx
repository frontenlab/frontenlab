import React from 'react'
import './Footer.css'
import frontenlabImage from '../../../Assets/Images/frontenlab.png'
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const handleLinkClick = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', 
        });
      };
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
                    {/* <li><NavLink to="/about" >About</NavLink></li> */}
                    <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li> 
                    <li><NavLink to="/contact" onClick={handleLinkClick} >Contact</NavLink></li> 
                    <li><NavLink to="/challenges" onClick={handleLinkClick}>Challenges</NavLink></li> 
                    <li><NavLink to="/competitions" onClick={handleLinkClick}>Competitions</NavLink></li> 
                </div>

                <div className="footer-social">
                    <div className="social linkedin">
                        <CiLinkedin className='footer-icon'/>
                        <a href="https://www.linkedin.com/company/frontenlab" target="_blank" rel="noopener noreferrer">Linkedin</a>
                    </div>

                    <div className="social Instagram ">
                        <FaInstagram className='footer-icon' />
                        <a href="https://www.instagram.com/frontenlab/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>

                    <div className="social X">
                        <FaXTwitter className='footer-icon' />
                        <a href="https://x.com/frontenlab" target="_blank" rel="noopener noreferrer">X</a>
                    </div>
                </div>
            </div>
            
        </div>

        <div className="footer-second">
            <div className="footer-second-links">
                <li><NavLink to="/terms" onClick={handleLinkClick} >Terms and Condition</NavLink></li>
                <li><NavLink to="/privacy" onClick={handleLinkClick}>Privacy policy</NavLink></li> 
            </div>

            <div className="footer-second-copyright">
                <p>© {currentYear} Frontenlab</p>
            </div>
        </div>
        

    </div>
  )
}

export default Footer