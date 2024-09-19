import React from 'react'
import './Sidebar.css'
import { NavLink, useLocation } from 'react-router-dom';
import { RiHome7Line } from "react-icons/ri";
import { PiSteps } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { supabase } from '../../../Helpers/SupabaseClient';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 

const Sidebar = () => {

  const [menuIcon, setMenuIcon] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //To use for handleResize function
  const [targetActive, setTargetActive] = useState(1);
  const [activeLink, setActiveLink] = useState('');

  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);


  const location = useLocation();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw new Error(`Session error: ${sessionError.message}`);
        }

        console.log('Session:', session);

        if (session) {
          // Fetch user data from 'users' table
          const { data, error } = await supabase
            .from('users')
            .select('avatar_url, username, name') // Specify the columns you need
            .eq('id', session.user.id)
            .maybeSingle(); // Fetch a single row

          console.log('Fetched data:', data);
          console.log('Fetch error:', error);
          console.log(session.user.id);

          if (error) {
            throw new Error(`Fetch error: ${error.message}`);
          }

          if (data) {
            setUserData(data);
            setFetchError(null);
          } else {
            setUserData(null);
            setFetchError("User data is empty");
          }
        } else {
          setUserData(null);
          setFetchError("No session found");
        }
      } catch (error) {
        setFetchError(error.message);
        console.error('Error fetching user data:', error);
      }  finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchUser();
  }, []);

  //For changing the color of the challenge link when it is not active
  useEffect(()=>{
    if(!location.pathname.includes('/challenges')){
      setActiveLink('');
    }
  },[location])

   // UseEffect function for hiding the sidebar when the screen size reaches 768px

  //  useEffect(()=>{
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
    
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
    
  //   return () => window.removeEventListener('resize', handleResize);
  // },[])

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

  //Handlers

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


  // Conditional rendering within JSX
  if (loading) {
    return (
      <div className='sidebar-skeleton'>
        <Skeleton className='skeleton-circle' circle={true} height={70} width={70} />
        
        <div>
          <h1><Skeleton width={250} /></h1>
          <Skeleton count={3} />
        </div>
      </div>
    );
  }

  // Render nothing or an error message if userData is still null
  if (!userData) {
    return <div>No user data found. Please log in.</div>;
  }

  return (


    <div>
        <div className={menuIcon === 0 ? "Sidebar":"Sidebar-hide" }>
        {fetchError && <p>{fetchError}</p>}
      {userData && (
        <div className="sidebar-profile">
          <div className="sidebar-profile-close-icon "><IoMdClose onClick={handleMenuClick} /></div>
          <div className="sidebar-profile-img">
            {userData.avatar_url ? (
              <img src={userData.avatar_url} alt="profile-img" />
            ) : (
              <div className="default-avatar">No Image</div>
            )}
          </div>
          <h2 className="user-profile-name">{userData.name || 'No Username'}</h2>
          <p className='user-profile-username'>@{userData.username}</p>
        </div>
      )}

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