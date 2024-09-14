import React from 'react'
import './AchievementOverlay.css'
import Trophy from '../../../Assets/Images/Trophy.png'
import { IoMdClose } from "react-icons/io";
import { useEffect } from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";

const AchievementOverlay = ({setAchievementOverlayActive}) => {

    useEffect(() => {
      document.body.classList.add('no-scroll');
      return () => {
          document.body.classList.remove('no-scroll');
      };
    }, []);

    const handleAchievementClose = () => {
        setAchievementOverlayActive(false);
    }

    const handleShare = (platform) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Excited to share that I've completed a frontend challenge with FrontenLab! 🚀 Take a look at my work and see what I’ve accomplished!");
    
      let shareUrl = '';
    
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
          break;
        default:
          return;
      }
    
      window.open(shareUrl, '_blank');
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

            <div className="social-share-buttons">
                <button onClick={() => handleShare('linkedin')}><TiSocialLinkedin className='share-icon' /></button>
                <button onClick={() => handleShare('twitter')}><FaXTwitter className='share-icon' /></button>
                <button onClick={() => handleShare('facebook')}><FaFacebookF className='share-icon' /></button>
            </div>
        </div>
        <IoMdClose className='achievement-close-icon' onClick={handleAchievementClose} />
      </div>
    </div>
  )
}

export default AchievementOverlay