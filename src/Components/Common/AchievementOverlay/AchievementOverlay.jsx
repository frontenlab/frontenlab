import React from 'react'
import './AchievementOverlay.css'
import Trophy from '../../../Assets/Images/Trophy.png'
import { IoMdClose } from "react-icons/io";

const AchievementOverlay = ({setAchievementOverlayActive}) => {

    const handleAchievementClose = () => {
        setAchievementOverlayActive(false);
    }

  return (
    <div className='Achievement'>
      <div className="achievement-container">
        <div className='achievement-img'>
           <img src={Trophy} alt="trophy-img" /> 
        </div>
        <div className='achievement-content'>
            <h2>Congratulations!</h2>
            <div className="achievement-description">
                <p>Well done on completing the challenge! 🎉 Your dedication and hard work have paid off. Now, share your accomplishment with your network on social media—let the world see your skills in action and inspire others to take on the challenge too!</p>
            </div>
            <button className="achievement-button">Share</button>
        </div>
        <IoMdClose className='achievement-close-icon' onClick={handleAchievementClose} />
      </div>
    </div>
  )
}

export default AchievementOverlay