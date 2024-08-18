import React from 'react'
import './DashboardChallenges.css'
import Sidebar from '../Sidebar/Sidebar'
import ChallengeStructure from '../Challenge/ChallengeStructure'


const DashboardChallenges = () => {
  return (
    <div className="DashboardChallenges">
        <Sidebar />
        <ChallengeStructure />
    </div>
  )
}

export default DashboardChallenges