import React from 'react'
import './LeaderboardContent.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable'

const LeaderboardContent = () => {
  return (
    <div className="Leaderboard">
        <Navbar />
        <div className="leaderboard-container">
            <Sidebar />
            <div className="leaderboard-content">
                <h1>Leaderboards</h1>
                <LeaderboardTable />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default LeaderboardContent