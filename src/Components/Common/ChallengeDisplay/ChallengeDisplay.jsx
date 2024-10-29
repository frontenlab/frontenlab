import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ChallengeDisplay.css';
import { supabase } from '../../../Helpers/SupabaseClient';
import Login from '../../../Helpers/Login';
import SubmitForm from '../../../Helpers/SubmitForm';
import AchievementOverlay from '../AchievementOverlay/AchievementOverlay';
import { PuffLoader } from 'react-spinners';


const ChallengeDisplay = (props) => {
    const location = useLocation();
    const [activeBtn, setActiveBtn] = useState("button1");
    
    const challengeName = location.pathname.split('/').pop();

    const [newCurrentChallenge, setNewCurrentChallenge] = useState(null)
    const [currentChallenge, setCurrentChallenge] = useState(location.state?.currentChallenge || null);
    const [imgUrl, setImgUrl] = useState(currentChallenge.imgDesktop || '');
    console.log(challengeName)


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState(null);
    const [startedAt, setStartedAt] = useState(null);
    const [achievementOverlayActive, setAchievementOverlayActive] = useState(false);
    const [liveUrl, setLiveUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(0);
    const [user, setUser] = useState(null);
    const [currentZipFile, setCurrentZipFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    


    useEffect(() => {
        const fetchChallenge = async () => {
            setIsLoading(true); // Start loading

            const { data, error } = await supabase
                .from('challenges')
                .select('*')
                .eq('name', challengeName) // Adjust according to your column name
                .maybeSingle(); // Fetch a single record

            if (error) {
                console.error('Error fetching challenge:', error);
            } else {
                setNewCurrentChallenge(data); // Set the fetched challenge
            }

            setIsLoading(false); // End loading
        };

        if (challengeName) {
            fetchChallenge(); // Fetch the challenge whenever challengeName is available
        }
    }, [challengeName]);

    




    useEffect(() => {
        // Function to fetch user data
        const fetchUser = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
    
            if (session) {
                setUser(session.user);
    
                // Fetch current user data to check the name
                const { data: existingUser, error: fetchError } = await supabase
                    .from('users')
                    .select('username')
                    .eq('id', session.user.id)
                    .maybeSingle();
    
                if (fetchError) {
                    console.error('Error fetching user data:', fetchError);
                } else if (existingUser) {
                    setUsername(existingUser.username);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };
    
        fetchUser();
    
    }, []);

    useEffect(() => {
        checkUserStatus();  // Call the function inside useEffect
    }, [currentChallenge.id]);
    
    const checkUserStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
    
        if (user) {
            // Fetch challenge status
            const { data: challengeData, error } = await supabase
                .from('user_challenges')
                .select('*')
                .eq('user_id', user.id)
                .eq('challenge_id', currentChallenge.id)
                .maybeSingle();
    
            if (challengeData) {
                setStatus(challengeData.status);
                setStartedAt(challengeData.started_at);
                setLiveUrl(challengeData.challenge_live || '');
            } else if (error) {
                console.error("Error fetching status", error);
            }

            const { data: challengeDetails, error: challengeError } = await supabase
                .from('challenges')
                .select('zip_file')
                .eq('id', currentChallenge.id)
                .maybeSingle();

            if (challengeError) {
                console.error("Error fetching challenge details", challengeError);
            } else if (challengeDetails) {
                setCurrentZipFile(challengeDetails.zip_file); // Store zip file path in state
            }
        }
    };
    
    const handleStartClick = async () => {
        if (!isLoggedIn) {
            window.location.href = '/'; // Redirect to login if not logged in
            return;
        }
    
        try {
            const currentStartedAt = startedAt || new Date().toISOString();
    
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('user_challenges')
                .upsert({
                    user_id: user.id,
                    challenge_id: currentChallenge.id,
                    status: 'ongoing',
                    started_at: currentStartedAt,
                    challenge_live: " ",
                }, { onConflict: ['user_id', 'challenge_id'] });
    
            if (error) throw error;
    
            setIsLoading(true);
            
            await downloadZipFile(currentZipFile);
    
            setStatus('ongoing');
            setStartedAt(currentStartedAt);
    
            checkUserStatus();
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to download the ZIP file
    const downloadZipFile = async (filePath) => {
        try {
            const relativePath = filePath.replace('https://vtxigjowfvmjejnmwhxd.supabase.co/storage/v1/object/public/', '');
            
            const { data, error } = await supabase
                .storage
                .from('public') 
                .download(relativePath); 
    
    
            if (error) throw error;
    
            // Create a blob URL and trigger the download
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${currentChallenge.title}.zip`; // Use the challenge title for the file name
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    
    
    

    const handleSubmit = async (data) => {
        setIsSubmitting(true); // Show spinner
    
        setLiveUrl(data.liveUrl);
    
        if (!data.liveUrl) {
            setIsSubmitting(false); // Hide spinner if URLs are empty
            return;
        }
    
        try {
            const currentEndAt = new Date().toISOString();
            const { data: { user }, error: authError } = await supabase.auth.getUser();
    
            if (authError || !user) {
                console.error('User not logged in or failed to get user:', authError);
                setIsSubmitting(false); // Hide spinner
                return;
            }
    
            // Check if the user already submitted the challenge
            const { data: challengeData, error: challengeError } = await supabase
                .from('user_challenges')
                .select('status')
                .eq('user_id', user.id)
                .eq('challenge_id', currentChallenge.id)
                .maybeSingle();
    
            if (challengeError) {
                console.error('Error checking the challenge status:', challengeError);
                return;
            }
    
            // If the challenge is already completed, don't increase submission count again
            const isChallengeAlreadyCompleted = challengeData?.status === 'completed';
    
            // Update the repository and live URLs in `user_challenges` only if it's not already completed
            if (!isChallengeAlreadyCompleted) {
                const { data: repoData, error: repoError } = await supabase
                    .from('user_challenges')
                    .update({ 
                        challenge_live: data.liveUrl,
                        completed_at: currentEndAt,
                        status: "completed",
                        points: 10 // Add 10 points for this challenge
                    })
                    .match({ user_id: user.id, challenge_id: currentChallenge.id });
    
                if (repoError) {
                    console.error('Error updating the repository URL:', repoError);
                    setIsSubmitting(false); // Hide spinner
                    return;
                }
            }
    
            // Fetch all user challenges to calculate total points and submission count
            const { data: allChallenges, error: fetchError } = await supabase
                .from('user_challenges')
                .select('points, status')  // Also select 'status' to filter completed challenges
                .eq('user_id', user.id);
    
            if (fetchError) {
                console.error('Error fetching user challenges:', fetchError);
                return;
            }
    
            // Calculate total points
            const totalPoints = allChallenges.reduce((acc, challenge) => acc + (challenge.points || 0), 0);
    
            // Calculate total submissions, but only count challenges with status "completed"
            const totalSubmissions = allChallenges.filter(challenge => challenge.status === 'completed').length;
    
            // Update the `users` table with the new total points and submission count
            const { error: updateUserError } = await supabase
                .from('users')
                .update({
                    points: totalPoints,
                    submission: totalSubmissions // Update only if the submission is new
                })
                .eq('id', user.id);
    
            if (updateUserError) {
                console.error('Error updating user points and submissions:', updateUserError);
                return;
            }
    
            setStatus('completed');
            setAchievementOverlayActive(true);
        } catch (error) {
            console.error('Error submitting the URLs:', error);
        } finally {
            setIsSubmitting(false); // Hide spinner
        }
    };
    
    
    useEffect(() => {
        if (currentChallenge) {
            setActiveBtn("button1");
            setImgUrl(currentChallenge.imgDesktop);
        }
    }, [currentChallenge]);

    const handleButtonClick = (button) => () => {
        setActiveBtn(button);

        switch (button) {
            case "button1":
                setImgUrl(currentChallenge.imgDesktop);
                break;
            case "button2":
                setImgUrl(currentChallenge.imgTablet);
                break;
            case "button3":
                setImgUrl(currentChallenge.imgMobile);
                break;
            default:
                setImgUrl(currentChallenge.imgDesktop);
        }
    };

    if(isLoading){
        return (
            <div className="spinner-container">
                <PuffLoader color="#5055b8" size={60} />
            </div>
        )
    }
    

    return (
        <div className="ChallengeDisplay">
            {isSubmitting && (
                <div className="spinner-container">
                    <PuffLoader color="#5055b8" />
                </div>
            )}
            <div className="challengeDisplay-box">
                <div className="challengeDisplay-box-img">
                    <img src={imgUrl} alt="box-img" />
                </div>

                <div className="challengeDisplay-box-buttons">
                    <button className={`button1 ${activeBtn === "button1" ? "active-btn" : ""}`} onClick={handleButtonClick("button1")}>Desktop</button>
                    <button className={`button1 ${activeBtn === "button2" ? "active-btn" : ""}`} onClick={handleButtonClick("button2")}>Tablet</button>
                    <button className={`button1 ${activeBtn === "button3" ? "active-btn" : ""}`} onClick={handleButtonClick("button3")}>Mobile</button>
                </div>
            </div>

            <div className="challengeDisplay-content">
                <div className="challengeDisplay-content-box1">
                    <div className="challengeDisplay-challengeDescription contentBox">
                        <h1>Description</h1>
                        <p>{currentChallenge.description}</p>
                        <div className="challengeDisplay-challengeDescription-buttons">
                            {isLoggedIn
                                ? <button className='challengeDescription-start-button' onClick={handleStartClick}>{status === null ? "Start" : "Download Requirements"}</button>
                                : <Login class_name={"challengeDescription-start-button"} name={"Login to start"} />
                            }
                            <button style={{ cursor: 'default' }} className={status !== 'ongoing' ? 'challengeDisplay-status' : 'challengeDisplay-status-active'}>{status === 'ongoing' ? 'Ongoing' : ''}</button>
                            <button style={{ cursor: 'default' }} className={status === 'completed' ? 'challengeDisplay-status-active' : 'challengeDisplay-status'}>{status === 'completed' ? 'Completed' : ''}</button>

                        </div>
                    </div>

                    <div className="challengeDisplay-assets contentBox">
                        <h1>Assets Provided</h1>
                        <ul>
                            <li>Figma file</li>
                            <li>PNG format designs</li>
                            <li>Style guide with color and font details</li>
                            <li>Required Images</li>
                        </ul>
                    </div>
                </div>

                {status === 'ongoing'  && (
                    <div className="challengeDisplay-content-box2">
                        <h1>Submit Solution</h1>
                        <p>Submit your finished work to show your skills. Earn points, get feedback, and move up on the leaderboard as you improve your frontend development!</p>
                        <SubmitForm onSubmit={handleSubmit} currentChallenge={currentChallenge} />
                    </div>
                )}

                {status === 'completed'  && (
                    <div className="challengeDisplay-content-box2">
                        <h1>Refine and Resubmit</h1>
                        <p> Made some changes or improvements? Submit your updated work to showcase your progress and get feedback on your latest effort!</p>
                        <SubmitForm onSubmit={handleSubmit} currentChallenge={currentChallenge} />
                    </div>
                )}

                {achievementOverlayActive && <AchievementOverlay setAchievementOverlayActive={setAchievementOverlayActive} username={username} />}
            </div>
        </div>
    );
};

export default ChallengeDisplay;
