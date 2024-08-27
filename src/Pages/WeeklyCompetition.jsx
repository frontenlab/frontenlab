import React from 'react'
import CompetitionDisplay from '../Components/Common/CompetitionDisplay/CompetitionDisplay';
import Navbar from '../Components/Common/Navbar/Navbar';
import Footer from '../Components/Common/Footer/Footer'

const WeeklyCompetition = () => {
  return (
    <div className="WeeklyChallenge">
      <Navbar />
      <CompetitionDisplay />
      <Footer />
    </div>
  )
}

export default WeeklyCompetition