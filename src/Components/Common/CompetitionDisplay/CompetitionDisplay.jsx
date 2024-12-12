import React from 'react';
import './CompetitionDisplay.css';
import CompetitionChallenge from '../CompetitionChallenge/CompetitionChallenge';
import male2 from '../../../Assets/Images/male2.jpg';
import { Outlet, useLocation } from 'react-router-dom';

const CompetitionDisplay = () => {
  const location = useLocation();

  // Check if the current route matches the dynamic `challengeName` route
  const isChallengeRoute = location.pathname.includes('/challengeName');

  if (isChallengeRoute) {
    // Render only the Outlet when the path includes `/challengeName`
    return <Outlet />;
  }

  return (
    <div className="CompetitionDisplay">
      <div className="competitionDisplay-left">
        <h1>Week 1 Competition</h1>
        <div className="competitionDisplay-left-content">
          <CompetitionChallenge />
        </div>
      </div>

      <div className="competitionDisplay-right">
        <div className="competitionDisplay-right-points">
          <h2>Prizes</h2>
          <ul className="prize-list">
            <li><strong>1st Place </strong> 50 Points</li>
            <li><strong>2nd Place </strong> 30 Points</li>
            <li><strong>3rd Place </strong> 20 Points</li>
            <li><strong>Participation </strong> 5 Points </li>
          </ul>
        </div>

        <div className="competitionDisplay-right-swags">
          <h2>Swags</h2>
          <div className="competiitonDisplay-right-swags-container">
            <div className="swag-item swag-item1">
              <img src={male2} alt="swag-img" />
            </div>
            <div className="swag-item swag-item2">
              <img src={male2} alt="swag-img" />
            </div>
            <div className="swag-item swag-item3">
              <img src={male2} alt="swag-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDisplay;
