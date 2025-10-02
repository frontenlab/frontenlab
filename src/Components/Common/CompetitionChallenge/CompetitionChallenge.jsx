import React from 'react'
import './CompetitionChallenge.css'
import tabletImg from '../../../Assets/Images/imgDesktop.png'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const CompetitionChallenge = () => {
  const navigate = useNavigate();
  const { competitionName } = useParams();

  const handleViewClick = () => {
    navigate(`/competitions/${competitionName}/challengeName`)
  };

  return (
    <div className="CompetitionChallenge">
        <div className="competitionChallenge-img">
            <img src={tabletImg} alt="challenge-image" />
        </div>

        <div className="competitionChallenge-content">
            <div className="competitionChallenge-title">First Look Landing Page</div>
            <div className="competitionChallenge-description">FirstLook is a dynamic platform that enhances productivity through interactive challenges. It features a home section, reviews, and a footer for practicing frontend development skills. Complete the challenge by closely matching the provided design.</div>
        </div>
        <button className="competitionChallenge-button" onClick={handleViewClick}>
          View
        </button>
    </div>
  )
}

export default CompetitionChallenge