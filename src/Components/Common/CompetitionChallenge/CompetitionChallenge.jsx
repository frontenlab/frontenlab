import React from 'react'
import './CompetitionChallenge.css'
import tabletImg from '../../../Assets/Images/imgDesktop.png'

const CompetitionChallenge = () => {
  return (
    <div className="CompetitionChallenge">
        <div className="competitionChallenge-img">
            <img src={tabletImg} alt="challenge-image" />
        </div>

        <div className="competitionChallenge-content">
            <div className="competitionChallenge-title">First Look Landing Page</div>
            <div className="competitionChallenge-description">FirstLook is a dynamic platform that enhances productivity through interactive challenges. It features a home section, reviews, and a footer for practicing frontend development skills. Complete the challenge by closely matching the provided design.</div>
        </div>
        <button className='competitionChallenge-button'>View</button>


    </div>
  )
}

export default CompetitionChallenge