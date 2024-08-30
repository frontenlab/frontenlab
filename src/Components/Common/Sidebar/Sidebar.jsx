import React from 'react'
import './Sidebar.css'
import male2 from '../../../Assets/Images/male2.jpg'
import { NavLink, useLocation } from 'react-router-dom';
import { RiHome7Line } from "react-icons/ri";
import { PiSteps } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {

  const [menuIcon, setMenuIcon] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //To use for handleResize function
  const [targetActive, setTargetActive] = useState(1);
  const [activeLink, setActiveLink] = useState('');

  const location = useLocation();

  //For changing the color of the challenge link when it is not active
  useEffect(()=>{
    if(!location.pathname.includes('/challenges')){
      setActiveLink('');
    }
  },[location])

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    localStorage.setItem('activeLink', linkName);
  };

  const handleNonChallengeLinkClick = () => {
    setActiveLink('');
    localStorage.removeItem('activeLink');
  };

  const handleTargetClick = () => {
    setTargetActive(prev_val => (prev_val === 0?1:0));
  }

  const handleMenuClick = () => {
    setMenuIcon(prev_val => (prev_val === 0 ? 1 : 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  // UseEffect function for hiding the sidebar when the screen size reaches 768px

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };



    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(()=> {
    if (isMobile) {
      if (menuIcon === 1) {
        document.body.style.overflow = "auto"; // Allow scrolling
      } else {
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    } else {
      document.body.style.overflow = "auto"; // Always allow scrolling on non-mobile view
    }
  },[menuIcon, isMobile])

  // UseEffect for Active target links

  useEffect(() => {
    const savedLink = localStorage.getItem('activeLink');
    if (savedLink) {
      setActiveLink(savedLink);
    }

    if (!location.pathname.includes('/challenges')) {
      setActiveLink('');
      localStorage.removeItem('activeLink');
    }
  }, [location]);
  
  return (


    <div>
        <div className={menuIcon === 0 ? "Sidebar":"Sidebar-hide" }>
          <div className="sidebar-profile">
              <div className="sidebar-profile-close-icon "><IoMdClose onClick={handleMenuClick} /></div>
              <div className="sidebar-profile-img"><img src={male2} alt="profile-img" /></div>
              <h2 className="sidebar-profile-name">Alan Mickle</h2>
              <h4 className="sidebar-exp">Newbie</h4>
          </div>
          
          <div className='sidebar-line'></div>

          <div className="sidebar-links">
              <li onClick={handleNonChallengeLinkClick}><NavLink to="/my" > <RiHome7Line className='sidebar-icon' />Dashboard</NavLink></li>
              <li className='steps targetChallenge-link' onClick={handleTargetClick}>
                <div>
                  <PiSteps className='sidebar-icon' /> Challenges {targetActive === 0? <IoIosArrowDown className='targetChallengeArrow' /> : <IoIosArrowUp className='targetChallengeArrow'/> }
                </div>
              </li>
                <div className={ `targetChallengeContainer ${targetActive === 1 ? 'targetChallengeContainer-active' : ''}`}>
                  <li className={`steps targetChallenge-link ${activeLink === 'navbar' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('navbar')}><div><NavLink to={"/challenges/navbar"}>Navbar</NavLink></div></li>
                  <li className={`steps targetChallenge-link ${activeLink === 'footer' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('footer')}><div><NavLink to={"/challenges/footer"}>Footer</NavLink></div></li>
                  <li className={`steps targetChallenge-link ${activeLink === 'landingpage' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('landingpage')}><div><NavLink to={"/challenges/landingpage"}>Landing Page</NavLink></div></li>
                  <li className={`steps targetChallenge-link ${activeLink === 'features' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('features')}><div><NavLink to={"/challenges/features"}>Features</NavLink></div></li>
                  <li className={`steps targetChallenge-link ${activeLink === 'hero' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('hero')}><div><NavLink to={"/challenges/hero"}>Hero</NavLink></div></li>
                </div>
                
              <li><NavLink to="/leaderboard" > <MdOutlineLeaderboard className='sidebar-icon' /> Leaderboard</NavLink></li>
              <li onClick={handleNonChallengeLinkClick}><NavLink to="/settings" > <IoSettingsOutline className='sidebar-icon' />Settings</NavLink></li>

          </div>
        </div>

        <div className={menuIcon === 1 ? "sidebar-menu-container": "sidebar-menu-container-hide"}>
          <div className="sidebar-menu-content" >
              <div className="sidebar-icon-container" onClick={handleMenuClick}><SlMenu className='sidebar-menu sidebar-icon'  /></div>
              <li className="sidebar-icon-container" ><NavLink to="/my" ><RiHome7Line className='sidebar-icon sidebar-icon' /></NavLink></li>
              <div className="sidebar-icon-container" onClick={handleMenuClick}><PiSteps className='sidebar-icon sidebar-icon' /></div>
              <li className="sidebar-icon-container" ><NavLink to="/leaderboard"><MdOutlineLeaderboard className='sidebar-icon sidebar-icon' /></NavLink></li> 
              <li className="sidebar-icon-container" ><NavLink to="/settings" ><IoSettingsOutline className='sidebar-icon' /></NavLink></li> 
          </div>
            
        </div>
    </div>
    
  )
}

export default Sidebar