import React from 'react';
import './NewChallenges.css';
import useChallenges from '../../../Helpers/fetchChallenges'; // Use the same hook as before
import ChallengeStructure from '../Challenge/ChallengeStructure';
import PuffLoader from 'react-spinners/PuffLoader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const NewChallenges = ({dashboardTitle}) => {
  // Fetch challenges from the hook
  const { challenges, loading, error } = useChallenges();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#5055b8" size={60} />
        <p>Loading new challenges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage heading={"Network Error"} description={"Check your internet connection and try again"} />
    );
  }

  // Limit to first 3 challenges
  const limitedChallenges = challenges.slice(0, 3);

  return (
    <div className="NewChallenge">
      <h1 className={`title ${dashboardTitle ? 'dashboard-title' : 'title'}`}>New Challenges</h1>
      <div className="New-Challenge challenges">
        {limitedChallenges.map((challenge) => (
          <ChallengeStructure 
            key={challenge.id} 
            id={challenge.id} 
            imgDesktop={challenge.template_img} 
            imgTablet={challenge.tablet_img} 
            imgMobile={challenge.mobile_img} 
            title={challenge.title} 
            description={challenge.description} 
          />
        ))}
      </div>
      
      <button onClick={() => {navigate('/challenges'); window.scrollTo(0, 0);}}>Explore more</button>
      <hr />
    </div>
  );
};

export default NewChallenges;
