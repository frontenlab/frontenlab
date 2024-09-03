import React from 'react'
import './ProfileContent.css'
import male2 from '../../../Assets/Images/male2.jpg'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import AllChallengesContent from '../../../Helpers/AllChallengesContent'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const ProfileContent = () => {


    const location = useLocation();


    useEffect(()=>{
        if(location.state?.showToast){
            toast.success('Your profile has been successfully updated.');
            location.state.showToast = false;
        }
    }, [location.state])

  return (
    <div className="Profile-content">
        <div className="profile-content-left">
            <div className="profile-content-left-box left-box1">
                <div className="profile-content-left-box1-img">
                    <img src={male2} alt="profile-img" />
                </div>
                <h2>Alan Mickle</h2>
                <p>@Alan32</p>
                <p>Seamlessly integrate with Figma to access downloadable design files, allowing for hands-on learning through practical replication.</p>
            </div>

            <div className="profile-content-left-box left-box2">
                <div className="profile-details">
                    <p>Points</p>
                    <p>424</p>
                </div>

                <div className="profile-details">
                    <p>Submissions</p>
                    <p>23</p>
                </div>
                <div className="profile-content-left-box2-social-links">
                    <div><a href="www.google.com">Linkedin</a></div>
                    <div><a href="www.google.com">Github</a></div>
                </div>
            </div>
        </div>

        <div className="profile-content-right">
            <h1>Submissions</h1>
            <div className="submission-challenge">
                {AllChallengesContent.map((challenge, index)=> {
                    return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.imgDesktop} imgTablet={challenge.imgTablet} imgMobile={challenge.imgMobile} title={challenge.title} description={challenge.description} category={challenge.category} />
                })}
            </div>
        </div>
    </div>
  )
}

export default ProfileContent