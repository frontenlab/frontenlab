import React from 'react'
import './Sidebar.css'
import male2 from '../../../Assets/Images/male2.jpg'
import { NavLink } from 'react-router-dom';
import { RiHome7Line } from "react-icons/ri";
import { PiSteps } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { SlMenu } from "react-icons/sl";

const Sidebar = () => {
  return (

    <div className="Sidebar">
    
    
        <div className="sidebar-profile">
            <div className="sidebar-profile-img"><img src={male2} alt="profile-img" /></div>
            <h2 className="sidebar-profile-name">Alan Mickle</h2>
            <h4 className="sidebar-exp">Newbie</h4>
            
        </div>
        <div className="sidebar-menu-container">
            <div className="sidebar-icon-container"><SlMenu className='sidebar-menu sidebar-icon'/></div>
            <div className="sidebar-icon-container"><RiHome7Line className='sidebar-icon sidebar-icon' /></div>
            <div className="sidebar-icon-container"><PiSteps className='sidebar-icon sidebar-icon' /></div>
            <div className="sidebar-icon-container"><MdOutlineLeaderboard className='sidebar-icon sidebar-icon' /></div> 
        </div>
        <div className='sidebar-line'></div>

        <div className="sidebar-links">
            <li><NavLink to="/" > <RiHome7Line className='sidebar-icon' /> Home</NavLink></li>
            <li><NavLink to="/challenges" > <PiSteps className='sidebar-icon' />Challenges</NavLink></li>
            <li><NavLink to="/leaderboard" > <MdOutlineLeaderboard className='sidebar-icon' /> Leaderboard</NavLink></li>
        </div>
    </div>
  )
}

export default Sidebar