import React from 'react'
import './LeaderboardContent.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable'
import { FaCrown } from "react-icons/fa6";
import male2 from '../../../Assets/Images/male2.jpg'


const LeaderboardContent = () => {
  return (
    <div className="Leaderboard">
        <Navbar />
        <div className="leaderboard-container">
            <Sidebar />
            <div className="leaderboard-content">
                <h1>Leaderboards</h1>
                <div className="leaderboard-top">
                  <div className="leaderboard-top-img">
                    <FaCrown className='crown-icon' />
                    <img src={male2} alt="" />
                  </div>

                  <div className="leaderboard-top-boxes">
                    <div className="leaderboard-top-box top-box1">
                      <p>Submission</p>
                      <p className='leaderboard-bold'>12</p>
                    </div>

                    <div className="leaderboard-top-box top-box2">
                      <p>Rank</p>
                      <p className='leaderboard-bold'>1</p>
                    </div>

                    <div className="leaderboard-top-box top-box3">
                      <p>Points</p>
                      <p className='leaderboard-bold'>143</p>
                    </div>
                  </div>
                </div>

                <LeaderboardTable />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default LeaderboardContent