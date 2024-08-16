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

const Sidebar = () => {



  const [menuIcon, setMenuIcon] = useState(0);

  const handleMenuClick = () => {
    setMenuIcon(prev_val => (prev_val === 0 ? 1 : 0));
  }


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
              <li><NavLink to="/" > <RiHome7Line className='sidebar-icon' /> Home</NavLink></li>
              <li><NavLink to="/challenges" > <PiSteps className='sidebar-icon' />Challenges</NavLink></li>
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