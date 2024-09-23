import React, { useState, useEffect } from 'react';
import './UserChallenges.css';
import PuffLoader from 'react-spinners/PuffLoader'; 
import ChallengeStructure from '../Challenge/ChallengeStructure';
import { supabase } from '../../../Helpers/SupabaseClient';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NotAvailable from '../../UI/NotAvailable/NotAvailable';

const UserChallenges = () => {
  const { status } = useParams(); // Extract `status` from URL parameters
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw new Error(`Session error: ${sessionError.message}`);
        if (!session) throw new Error('No session found');
    
        // Fetch user data
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('avatar_url, username, name, bio, points, submission, github_url, linkedin_url')
          .eq('id', session.user.id)
          .single();
        
        if (userError) throw new Error(`Fetch user data error: ${userError.message}`);
        setUserData(user);

        // Fetch challenges based on the status from the URL
        const { data: userChallenges, error: challengeError } = await supabase
          .from('user_challenges')
          .select('challenge_id')
          .eq('user_id', session.user.id)
          .eq('status', status); // Use the status from URL
    
        if (challengeError) throw new Error(`Fetch user challenges error: ${challengeError.message}`);
    

        if (userChallenges.length > 0) {
          // Get challenge details
          const { data: challenges, error: challengesError } = await supabase
            .from('challenges')
            .select('*')
            .in('id', userChallenges.map(challenge => challenge.challenge_id));
  
          if (challengesError) throw new Error(`Fetch challenges error: ${challengesError.message}`);
          setChallenges(challenges);
        } else {
          setChallenges([]); // No challenges found
        }
      } catch (error) {
        setFetchError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]); // Add `status` as a dependency to refetch on status change

  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#36d7b7" size={60} />
        <p>Loading challenges...</p>
      </div>
    );
  }

  if (fetchError) return <p>Error: {fetchError}</p>;

  return (
    <div>
      <Navbar />
    
    <div className="user-challenges">
      
      <div className="user-challenges-content">
        <h1 className='user-challenges-title'>
          {status === 'ongoing' ? 'Ongoing Challenges' : 'Completed Challenges'}
        </h1>
        <p className='user-challenges-description'>
          {status === 'ongoing' 
            ? 'Find challenges you are currently working on.' 
            : 'View the challenges you have successfully completed.'}
        </p>
        
        {challenges.length > 0 ? (
          <div className="user-challenges-container">
            {challenges.map((challenge) => (
              <ChallengeStructure 
                key={challenge.id} 
                id={challenge.id} 
                imgDesktop={challenge.template_img} 
                imgTablet={challenge.tablets_img} 
                imgMobile={challenge.mobile_img} 
                title={challenge.title} 
                description={challenge.description} 
                difficulty={challenge.difficulty}
              />
            ))}
          </div>
        ) : (
            <NotAvailable 
                description={"No challenges found at the moment."}
            />
        )}
      </div>

    </div>
    <Footer />
    </div>
  );
}

export default UserChallenges;
