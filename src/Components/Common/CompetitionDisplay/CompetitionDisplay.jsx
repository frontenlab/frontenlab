import React from 'react'
import './CompetitionDisplay.css'
import CompetitionChallenge from '../CompetitionChallenge/CompetitionChallenge'

const CompetitionDisplay = () => {
  return (
    <div className="CompetitionDisplay">
      <div className="competitionDisplay-left">
        <h1>Week 1 Competition</h1>
        <div className="competitionDisplay-left-content">
          <CompetitionChallenge />
        </div>
      </div>

      <div className="competitionDisplay-right">
        <h2>Prizes</h2>
        <ul className="prize-list">
          <li><strong>1st Place:</strong> 500 Points</li>
          <li><strong>2nd Place:</strong> 300 Points</li>
          <li><strong>3rd Place:</strong> 200 Points</li>
          <li><strong>Participation:</strong> 50 Points </li>
        </ul>
      </div>
    </div>
  )
}

export default CompetitionDisplay