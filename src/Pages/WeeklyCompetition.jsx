import React from 'react'
import CompetitionDisplay from '../Components/Common/CompetitionDisplay/CompetitionDisplay';
import Navbar from '../Components/Common/Navbar/Navbar';

const WeeklyCompetition = () => {
  return (
    <div className="WeeklyChallenge">
      <Navbar />
      <CompetitionDisplay />
    </div>
  )
}

export default WeeklyCompetition