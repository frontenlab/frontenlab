import React from 'react'
import './Navbar.css'
import frontenlabImage from '../../../Assets/Images/frontenlab.png'
import { NavLink } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import { RiCloseLargeFill } from "react-icons/ri";
import { useState } from 'react';
import Login from '../../../Helpers/Login';
import { useEffect, useRef } from 'react';
import { supabase } from '../../../Helpers/SupabaseClient';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menu, setMenu] = useState(true);
    const [dropdownActive, setDropdownActive] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleMenuClick = () =>{
        setMenu(!menu);
    }

    const handleDropdownClick = () => {
        setDropdownActive(!dropdownActive);
    }

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            console.log("Error Sign Out", error);
        } else {
            setUser(null);
            navigate('/');
        }
    }

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownActive(false);
            }
        }

        if(dropdownActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } 

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[dropdownActive]);

    useEffect(()=> {
        //Fetching current Session
        const fetchUser = async() => {
            setLoading(true);
            const {data : {session} } = await supabase.auth.getSession();

            if(session) {
                setUser(session.user)
            }else {
                setUser(null);
            }
            setLoading(false);
        }

        fetchUser();

        const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [])


  return (

    
    <div className="Navbar">
        <div className="Navbar-logo">
            <div className="Navbar-logo-image">
                <img src={frontenlabImage} alt="fronenlab-logo" />
            </div>
        </div>

        <div className={menu? "Navbar-links": "Navbar-links Navbar-links-active"}>
            <ul>
                <li><NavLink exact to="/" >Home</NavLink></li>
                <li><NavLink to="/challenges" >Challenges</NavLink></li>
                <li><NavLink to="/competitions" >Competitions</NavLink></li>
                <button className="Navbar-button mobile-button" >Login</button>
            </ul>
        </div>

        <div className="Navbar-buttons">

            {   loading ? (<Skeleton circle={true} height={40} width={40} />):
                user ? (
                <div className="login-profile">
                    <li><NavLink to="/my" >Dashboard</NavLink></li>
                    <div className="login-profile-img" >
                        <img src={user.user_metadata.avatar_url} alt="github-profile-img" className="login-profile-image" onClick={handleDropdownClick} />
                    </div>
                </div>
                ): (
                    <Login />
                )
            }
            
            <div className="Navbar-menu">
                {
                    menu?<SlMenu className='menu-icon icon' onClick={handleMenuClick}/>
                    :
                    <RiCloseLargeFill className='close-icon icon' onClick={handleMenuClick} />
                }
                

                
            </div>

            { dropdownActive &&
                <div className="profile-dropdown" ref={dropdownRef}>
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/profile" >Profile</NavLink></li>
                    <li><NavLink to="/settings" >Settings</NavLink></li>
                    <button onClick={handleSignOut} className='profile-dropdown-button'>Sign Out</button>
                </div>
            }
        </div>
    </div>
  )
}

export default Navbar