import React from 'react'
import './Sidebar.css'
import male2 from '../../../Assets/Images/male2.jpg'
import { NavLink } from 'react-router-dom';
import { RiHome7Line } from "react-icons/ri";
import { PiSteps } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [menuIcon, setMenuIcon] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //To use for handleResize function
  const [targetActive, setTargetActive] = useState(1);
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  
  const handleTargetClick = () => {
    setTargetActive(prev_val => (prev_val === 0?1:0));
  }

  const handleMenuClick = () => {
    setMenuIcon(prev_val => (prev_val === 0 ? 1 : 0));
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
              <li ><NavLink to="/my" > <RiHome7Line className='sidebar-icon' />Dashboard</NavLink></li>
              <li className='steps targetChallenge-link' onClick={handleTargetClick}>
                <div>
                  <PiSteps className='sidebar-icon' /> Challenges {targetActive === 0? <IoIosArrowDown className='targetChallengeArrow' /> : <IoIosArrowUp className='targetChallengeArrow'/> }
                </div>
              </li>
                <div className={ `targetChallengeContainer ${targetActive === 1 ? 'targetChallengeContainer-active' : ''}`}>
                  <li className={`steps targetChallenge-link ${activeLink === 'navbar' ? 'targetActive-link' : ''}` } onClick={() => handleLinkClick('navbar')}><div><NavLink to={"/challenges/navbar"}>Navbar</NavLink></div></li>
                  <li className='steps targetChallenge-link'><div>Landing Page</div></li>
                  <li className='steps targetChallenge-link'><div>Features</div></li>
                  <li className='steps targetChallenge-link'><div>Hero</div></li>
                  <li className='steps targetChallenge-link'><div>Footer</div></li>
                </div>
                
              <li><NavLink to="/leaderboard" > <MdOutlineLeaderboard className='sidebar-icon' /> Leaderboard</NavLink></li>
          </div>
        </div>

        <div className={menuIcon === 1 ? "sidebar-menu-container": "sidebar-menu-container-hide"}>
          <div className="sidebar-menu-content" >
              <div className="sidebar-icon-container" onClick={handleMenuClick}><SlMenu className='sidebar-menu sidebar-icon'  /></div>
              <div className="sidebar-icon-container" onClick={handleMenuClick}><RiHome7Line className='sidebar-icon sidebar-icon' /></div>
              <div className="sidebar-icon-container" onClick={handleMenuClick}><PiSteps className='sidebar-icon sidebar-icon' /></div>
              <div className="sidebar-icon-container" onClick={handleMenuClick}><MdOutlineLeaderboard className='sidebar-icon sidebar-icon' /></div> 
          </div>
            
        </div>
    </div>
    
  )
}

export default Sidebar