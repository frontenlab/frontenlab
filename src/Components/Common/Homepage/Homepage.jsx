import React, { useState } from 'react'
import './Homepage.css'
import banner from '../../../Assets/Images/banner.png'
import Login from '../../../Helpers/Login'
import { supabase } from '../../../Helpers/SupabaseClient'
import { useEffect } from 'react'



const Homepage = () => {

  const[user, setUser] = useState(null);

  useEffect(()=> {
    const fetchUser = async () => {
      const {data:{user}, error} = await supabase.auth.getUser();
      if (user) {
        setUser(user)
      }
      
    }
    fetchUser();
  }, [])



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