import React from 'react'
import './ProfileContent.css'
import male2 from '../../../Assets/Images/male2.jpg'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import AllChallengesContent from '../../../Helpers/AllChallengesContent'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { supabase } from '../../../Helpers/SupabaseClient';



const ProfileContent = () => {

    const [userData, setUserData] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Get session from Supabase
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
              throw new Error(`Session error: ${sessionError.message}`);
            }
    
            console.log('Session:', session);
    
            if (session) {
              // Fetch user data from 'users' table
              const { data, error } = await supabase
                .from('users')
                .select('avatar_url, username, name, bio, points, submission') // Specify the columns you need
                .eq('id', session.user.id)
                .maybeSingle(); // Fetch a single row
    
    
            if (error) {
                throw new Error(`Fetch error: ${error.message}`);
            }
    
              if (data) {
                setUserData(data);
                setFetchError(null);
              } else {
                setUserData(null);
                setFetchError("User data is empty");
              }
            } else {
              setUserData(null);
              setFetchError("No session found");
            }
          } catch (error) {
            setFetchError(error.message);
            console.error('Error fetching user data:', error);
          }  finally {
            setLoading(false); // Ensure loading is set to false after fetching
          }
        };
    
        fetchUser();
      }, []);
    

    useEffect(()=>{
        if(location.state?.showToast){
            toast.success('Your profile has been successfully updated.');
            location.state.showToast = false;
        }
    }, [location.state])

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
                            <p>{userData.points || "no-points"}</p>
                        </div>

                        <div className="profile-details">
                            <p>Submissions</p>
                            <p>{userData.submission || "no-submission"}</p>
                        </div>
                        <div className="profile-content-left-box2-social-links">
                            <div><a href="www.google.com">Linkedin</a></div>
                            <div><a href="www.google.com">Github</a></div>
                        </div>
                    </div>
            </div>
            )}
        

        <div className="profile-content-right">
            <h1>Submissions</h1>
            <div className="submission-challenge">
                {AllChallengesContent.map((challenge, index)=> {
                    return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.imgDesktop} imgTablet={challenge.imgTablet} imgMobile={challenge.imgMobile} title={challenge.title} description={challenge.description} category={challenge.category} />
                })}
            </div>
        </div>
    </div>
  )
}

export default ProfileContent