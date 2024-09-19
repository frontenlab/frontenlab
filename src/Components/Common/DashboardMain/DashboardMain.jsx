import React, { useState, useEffect } from 'react';
import './DashboardMain.css';
import { IoMdArrowForward } from "react-icons/io";
import { supabase } from '../../../Helpers/SupabaseClient'; 
import { useNavigate } from 'react-router-dom';

const DashboardMain = () => {
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalChallengesCount, setTotalChallengesCount] = useState(0);
  const navigate = useNavigate();

  const handleNavigate = (status) => {
    navigate(`/user-challenges/${status}`);
  };

  useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        // Fetch user session to get the user_id
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          throw new Error("User not logged in");
        }

        // Fetch ongoing challenges for the user
        const { data: ongoingChallenges, error: ongoingError } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'ongoing');

        if (ongoingError) {
          throw new Error(ongoingError.message);
        }

        // Fetch completed challenges for the user
        const { data: completedChallenges, error: completedError } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('user_id', userId)
          .eq('status', 'completed');

        if (completedError) {
          throw new Error(completedError.message);
        }

        // Fetch total number of challenges from the challenges table
        const { data: totalChallenges, error: totalError } = await supabase
          .from('challenges')
          .select('id');

        if (totalError) {
          throw new Error(totalError.message);
        }

        // Step 5: Update the state with the counts
        setOngoingCount(ongoingChallenges.length);
        setCompletedCount(completedChallenges.length);
        setTotalChallengesCount(totalChallenges.length);
        
      } catch (error) {
        console.error("Error fetching challenges data:", error);
      }
    };

    fetchChallengesData();
  }, []); // Empty dependency array to run only once on mount

  

  return (
    <div className="DashboardMain">
        <div className="dashboardMain-box ongoing-box">
            <h3>Ongoing Challenges</h3>
            <h2>{ongoingCount}</h2> {/* Dynamic value for ongoing challenges */}
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon' onClick={() => handleNavigate('ongoing')}/>
            </div>
        </div>

        <div className="dashboardMain-box completed-box">
            <h3>Completed Challenges</h3>
            <h2>{completedCount}</h2> {/* Dynamic value for completed challenges */}
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon' onClick={() => handleNavigate('completed')}/>
            </div>
        </div>

        <div className="dashboardMain-box total-box">
            <h3>Total Challenges</h3>
            <h2>{totalChallengesCount}</h2> {/* Dynamic value for total challenges */}
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon' onClick={() => navigate('/challenges')}/>
            </div>
        </div>
    </div>
  )
}

export default DashboardMain;
