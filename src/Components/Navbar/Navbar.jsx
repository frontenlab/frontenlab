import React from 'react'
import './Navbar.css'
import frontenlabImage from '../../Assets/Images/frontenlab.png'
import { NavLink } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import { RiCloseLargeFill } from "react-icons/ri";
import { useState } from 'react';

const Navbar = () => {

    const [menu, setMenu] = useState(true);

    const handleMenuClick = () =>{
        setMenu(!menu);
    }

  return (
    <div className="Navbar">

        
        <div className="Navbar-logo">
            <div className="Navbar-menu">
                {
                    menu?<SlMenu className='menu-icon icon' onClick={handleMenuClick}/>
                    :
                    <RiCloseLargeFill className='close-icon icon' onClick={handleMenuClick} />
                }
                
                
            </div>
            <div className="Navbar-logo-image">
                <img src={frontenlabImage} alt="fronenlab-logo" />
            </div>
            
        </div>

        <div className="Navbar-links">
            <ul>
                <li><NavLink exact to="/" >Home</NavLink></li>
                <li><NavLink to="/challenges" >Challenges</NavLink></li>
                <li><NavLink to="/leaderboard" >Leaderboard</NavLink></li>
            </ul>
        </div>

        <div className="Navbar-buttons">
            <button className="Navbar-button">Login</button>
        </div>
    </div>
  )
}

export default Navbar