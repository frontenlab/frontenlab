import React from 'react'
import './ProfileContent.css'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { supabase } from '../../../Helpers/SupabaseClient';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 
import PuffLoader from 'react-spinners/PuffLoader'; 
import NotAvailable from '../../UI/NotAvailable/NotAvailable';

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const location = useLocation();

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

        // Fetch completed challenges
        const { data: userChallenges, error: challengeError } = await supabase
          .from('user_challenges')
          .select('challenge_id')
          .eq('user_id', session.user.id)
          .eq('status', 'completed');

        if (challengeError) throw new Error(`Fetch user challenges error: ${challengeError.message}`);

        if (userChallenges.length > 0) {
          // Get challenge details
          const { data: challenges, error: challengesError } = await supabase
            .from('challenges')
            .select('*')
            .in('id', userChallenges.map(challenge => challenge.challenge_id));

          if (challengesError) throw new Error(`Fetch challenges error: ${challengesError.message}`);
          setCompletedChallenges(challenges);
        }
      } catch (error) {
        setFetchError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success('Your profile has been successfully updated.');
      location.state.showToast = false;
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#36d7b7" size={60} />
        <p>Loading challenges...</p>
      </div>
    );
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
