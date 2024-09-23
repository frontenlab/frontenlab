import React from 'react'
import './ProfileContent.css'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { supabase } from '../../../Helpers/SupabaseClient';
import 'react-loading-skeleton/dist/skeleton.css'; 
import PuffLoader from 'react-spinners/PuffLoader'; 
import NotAvailable from '../../UI/NotAvailable/NotAvailable';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const location = useLocation();
  const { username } = useParams();


  useEffect(()=>{
      if(location.state?.showToast){
          toast.success('Your profile has been successfully updated.');
          location.state.showToast = false;
      }
  }, [location.state])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading state
  
      try {
        if (username) {
          // Fetch data for the user with the given username from the URL
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, avatar_url, username, name, bio, points, submission, github_url, linkedin_url')
            .eq('username', username) // Use the username from the URL
            .maybeSingle();
            
  
          if (userError) throw new Error(`User fetch error: ${userError.message}`);
          if (!user) throw new Error('User not found'); // Handle user not found
  
          setUserData(user); // Set the fetched user data
  
  
          // Fetch completed challenges for the user using their 'id'
          const { data: userChallenges, error: challengeError } = await supabase
            .from('user_challenges')
            .select('challenge_id')
            .eq('user_id', user.id)
            .eq('status', 'completed');
            
  
          if (challengeError) throw new Error(`Fetch user challenges error: ${challengeError.message}`);
  
          if (userChallenges.length > 0) {
            const { data: challenges, error: challengesError } = await supabase
              .from('challenges')
              .select('*')
              .in('id', userChallenges.map(challenge => challenge.challenge_id));
              
  
            if (challengesError) throw new Error(`Fetch challenges error: ${challengesError.message}`);
            setCompletedChallenges(challenges);
          }
        } else {
          throw new Error('No username provided in the URL.');
        }
      } catch (error) {
        // Handle specific user not found error without logging
        if (error.message === 'User not found') {
          setFetchError('User not found. Please check the username.');
        } else {
          setFetchError(error.message);
          console.error('Error fetching data:', error); // Log only other errors
        }
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    fetchData();
  }, [username]); // Only run when the `username` changes
  

  
  // Display content based on user data
  
  
  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#5055b8" size={60} />
        <p>Loading profile...</p>
      </div>
    );
  } 
  // else {
  //   if (!userData) {
  //     return (
  //       <ErrorMessage heading={"Login To Continue"} description={"Please log in to view profile"} />
  //     )
  //   }
  // }

  if (fetchError) {
    return <p>Error: {fetchError}</p>;
  }

  return (
    <div className="Profile-content">
      {fetchError && <p>{fetchError}</p>}
      {userData && (
        <div className="profile-content-left">
          <div className="profile-content-left-box left-box1">
            <div className="profile-content-left-box1-img">
              {userData.avatar_url ? (
                <img src={userData.avatar_url} alt="profile-img" />
              ) : (
                <div className="default-avatar">No Image</div>
              )}
            </div>
            <h2>{userData.name || 'No Name'}</h2>
            <p>@{userData.username || 'No Username'}</p>
            <p>{userData.bio || "Frontend Developer"}</p>
          </div>

          <div className="profile-content-left-box left-box2">
            <div className="profile-details">
              <p>Points</p>
              <p>{userData.points}</p>
            </div>
            <div className="profile-details">
              <p>Submissions</p>
              <p>{userData.submission}</p>
            </div>
            <div className="profile-content-left-box2-social-links">
              {userData.linkedin_url && (
                <div><a href={userData.linkedin_url} target="_blank" rel="noopener noreferrer">Linkedin</a></div>
              )}
              {userData.github_url && (
                <div><a href={userData.github_url} target="_blank" rel="noopener noreferrer">Github</a></div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="profile-content-right">
        <h1>Submissions</h1>
        {completedChallenges.length > 0 ? (
          <div className="submission-challenge">
            {completedChallenges.map((challenge) => (
              <ChallengeStructure
                key={challenge.id}
                id={challenge.id}
                imgDesktop={challenge.template_img}
                title={challenge.title}
                description={challenge.description}
                category={challenge.category}
                difficulty={challenge.difficulty}
              />
            ))}
          </div>
        ) : (
          <NotAvailable 
            description={"You din't yet completed any challenge."}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileContent;
