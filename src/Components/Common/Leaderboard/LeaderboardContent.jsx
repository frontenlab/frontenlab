import React, { useState, useEffect } from 'react';
import './LeaderboardContent.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';
import { FaCrown } from "react-icons/fa6";
import { supabase } from '../../../Helpers/SupabaseClient';
import PuffLoader from 'react-spinners/PuffLoader'; 
import NotAvailable from '../../UI/NotAvailable/NotAvailable';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LeaderboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [user, setUser] = useState(null); 
  const [showError, setShowError] = useState(false);

  // Fetch logged-in user details
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user); // Set the user if logged in
        setShowError(false);
      } else {
        setShowError(true);
        setLoading(false); // Stop loading if the user is not logged in
      }
    };

    checkUser();
  }, []);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('name, avatar_url, points, submission')
          .order('points', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching leaderboard data:', error);
        } else {
          setLeaderboardData(data); 
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Only fetch data if the user is logged in
      fetchLeaderboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="spinner-container">
        <PuffLoader color="#5055b8" size={60} />
      </div>
    );
  }

  if (showError) { // Show error message if the user is not logged in
    return (
      <ErrorMessage 
        heading={"Access Denied"} 
        description={"You need to log in to view the leaderboard. Please sign in to see the top performers and track your progress."} 
      />
    );
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
                  <FaCrown className="crown-icon" />
                  <img src={user.avatar_url} alt="profile-img" />
                </div>

                <div className="leaderboard-top-boxes">
                  <div className="leaderboard-top-box top-box1">
                    <p>Submission</p>
                    <p className="leaderboard-bold">{user.submission}</p>
                  </div>

                  <div className="leaderboard-top-box top-box2">
                    <p>Rank</p>
                    <p className="leaderboard-bold">{index + 1}</p>
                  </div>

                  <div className="leaderboard-top-box top-box3">
                    <p>Points</p>
                    <p className="leaderboard-bold">{user.points}</p>
                  </div>
                </div>
              </div>
            ))}

            <LeaderboardTable />
          </div>
        ) : (
          <NotAvailable
            description="No top scorers yet! Be the first to complete challenges and earn your spot on the leaderboard."
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardContent;
