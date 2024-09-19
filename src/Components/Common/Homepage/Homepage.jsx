import React, { useState } from 'react'
import './Homepage.css'
import banner from '../../../Assets/Images/banner.png'
import Login from '../../../Helpers/Login'
import { supabase } from '../../../Helpers/SupabaseClient'
import { useEffect } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'; 



const Homepage = () => {

  const[user, setUser] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchUser = async () => {
      const {data:{user}, error} = await supabase.auth.getUser();
      if (user) {
        setUser(user)
      }
      
      setLoading(false);
    }
    fetchUser();
  }, [])

  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#5055b8" size={60} />
        <p>Loading challenges...</p>
      </div>
    );
  }

  return (
    <div className="Homepage">
        <div className="Homepage-content">
            <h1>Master Frontend Skills with Hands-On Projects</h1>
            <p>Take your frontend development skills to the next level with our practical and engaging projects.</p>
            {!user && <Login class_name={"Homepage-button"} name={"Login with Github"} />}
            <br />
            
            <div className="Homepage-banner" >
                <img src={banner} alt="banner-image" />
            </div>

            <hr />
        </div>
    </div>
  )
}

export default Homepage