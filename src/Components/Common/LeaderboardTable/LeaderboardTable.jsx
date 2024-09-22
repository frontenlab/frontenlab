import './LeaderboardTable.css'
import React from 'react';
import LeaderboardContent from '../../../Helpers/LeaderboardContent';
import male2 from '../../../Assets/Images/male2.jpg'
import { supabase } from '../../../Helpers/SupabaseClient';
import PuffLoader from 'react-spinners/PuffLoader'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaderboardTable = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(()=> {
        const fetchLeaderboardData = async () => {
            try {
                const {data, error} = await supabase
                    .from('users')
                    .select('name, avatar_url, points, username')
                    .order('points', {ascending:false})
                    .limit(10);

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

    const handleUserNameClick = (userName) => {
        navigate(`/profile/${userName}`);
    }

  return (
    <div className="leaderboard-table">
        <div className="leaderboard-table-heading">
            <p>Rank</p>
            <p>Points</p>
        </div>
        {leaderboardData.length === 0 ? (
            <p>No data available</p>
        ) : (
            
            leaderboardData .filter(user => user.points > 0).map((user, index) => (
            <div key={index} className="leaderboard-table-box">
                <div className="leaderboard-rank">
                <p className="rank">{index + 1}</p>
                <div className="leaderboard-rank-profile">
                    <div className="leaderboard-rank-profile-img">
                    <img
                        src={user.avatar_url || male2} // Use the default image if there's no profile image
                        alt="profile-img"
                    />
                    </div>
                    <div className="leaderboard-rank-profile-name">
                    <div className='userName' onClick={() => handleUserNameClick(user.username)}>{user.name}</div>
                    </div>
                </div>
                </div>
                <div className="leaderboard-points">
                <p>{user.points}</p>
                </div>
            </div>
            ))
        )}
        </div>
    )
}

export default LeaderboardTable