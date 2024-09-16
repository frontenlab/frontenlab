import React from 'react'
import './LeaderboardContent.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable'
import { FaCrown } from "react-icons/fa6";
import male2 from '../../../Assets/Images/male2.jpg'
import notAvailable from '../../../Assets/Images/not-available.png'
import { supabase } from '../../../Helpers/SupabaseClient';
import PuffLoader from 'react-spinners/PuffLoader'; 
import { useState, useEffect } from 'react';


const LeaderboardContent = () => {

  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(()=> {
    const fetchLeaderboardData = async () => {
        try {
            const {data, error} = await supabase
                .from('users')
                .select('name, avatar_url, points, submission')
                .order('points', {ascending:false})
                .limit(1);

                if (error) {
                    console.error('Error fetching leaderboard data:', error);
                } else {
                    setLeaderboardData(data); 
                }
        } catch(error) {
            console.log("Error fetching data")
        } finally {
            setLoading(false);
        }

      }
        fetchLeaderboardData();
    }, [])

    if(loading){
        return (
            <div className="spinner-container">
                <PuffLoader color="#5055b8" size={60} />
            </div>
        )
    }

  return (
    <div className="Leaderboard">
        <Navbar />
        <div className="leaderboard-container">
            <Sidebar />
            {leaderboardData.filter(user => user.points > 0).length > 0 ? (
      <div className="leaderboard-content">
        <h1>Leaderboards</h1>
        
        {leaderboardData.filter(user => user.points > 0).map((user, index) => (
          <div key={index} className="leaderboard-top">
            <div className="leaderboard-top-img">
              <FaCrown className='crown-icon' />
              <img src={user.avatar_url} alt="profile-img" />
            </div>

            <div className="leaderboard-top-boxes">
              <div className="leaderboard-top-box top-box1">
                <p>Submission</p>
                <p className='leaderboard-bold'>{user.submission}</p>
              </div>

              <div className="leaderboard-top-box top-box2">
                <p>Rank</p>
                <p className='leaderboard-bold'>{index + 1}</p> {/* Adjusting rank based on index */}
              </div>

              <div className="leaderboard-top-box top-box3">
                <p>Points</p>
                <p className='leaderboard-bold'>{user.points}</p>
              </div>
            </div>
          </div>
        ))}

          <LeaderboardTable />
        </div>
        ) : (
          <div className="leaderboard-info">
            <div className="leaderboard-info-img">
              <img src={notAvailable} alt="not-available img" />
            </div>
            <p>No top scorers yet! Be the first to complete challenges and earn your spot on the leaderboard.</p>
          </div>
        )}
        </div>
      <Footer />
    </div>
  )
}

export default LeaderboardContent