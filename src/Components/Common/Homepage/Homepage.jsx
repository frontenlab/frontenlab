import React from 'react'
import './Homepage.css'
import banner from '../../../Assets/Images/banner.png'

const Homepage = () => {
  return (
    <div className="Homepage">
        <div className="Homepage-content">
            <h1>Master Frontend Skills with Hands-On Projects</h1>
            <p>Take your frontend development skills to the next level with our practical and engaging projects.</p>
            <button className="Homepage-button">Login with Github</button>
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