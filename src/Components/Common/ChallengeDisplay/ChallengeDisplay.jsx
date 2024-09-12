import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ChallengeDisplay.css';
import { supabase } from '../../../Helpers/SupabaseClient';
import Login from '../../../Helpers/Login';
import SubmitForm from '../../../Helpers/SubmitForm';

const ChallengeDisplay = (props) => {
    const location = useLocation();
    const currentChallenge = location.state?.currentChallenge;

    const [activeBtn, setActiveBtn] = useState("button1");
    const [imgUrl, setImgUrl] = useState(currentChallenge.imgDesktop);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState('not-started');
    const [startedAt, setStartedAt] = useState(null);
    // const [repoUrl, setRepoUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');

    useEffect(() => {
        const checkUserStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);

            if (user) {
                const { data, error } = await supabase
                    .from('user_challenges')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('challenge_id', currentChallenge.id)
                    .maybeSingle();

                if (data) {
                    setStatus(data.status);
                    setStartedAt(data.started_at);
                    // setRepoUrl(data.challenge_repo || '');
                    setLiveUrl(data.challenge_live || '');
                } else if (error) {
                    console.error("Error fetching status", error);
                }
            }
        };

        checkUserStatus();
    }, [currentChallenge.id]);

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
                    // challenge_repo: " ",
                    challenge_live: " ",
                }, { onConflict: ['user_id', 'challenge_id'] });

            if (error) throw error;

            setStatus('ongoing');
            setStartedAt(currentStartedAt);
            window.location.reload();
        } catch (error) {
            console.error('Error updating status:', error);
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
                setImgUrl(currentChallenge.tablet_img);
                break;
            case "button3":
                setImgUrl(currentChallenge.mobile_img);
                break;
            default:
                setImgUrl(currentChallenge.imgDesktop);
        }
    };

    const handleSubmit = async (data) => {
        // setRepoUrl(data.repoUrl);
        setLiveUrl(data.liveUrl);

        if (!data.liveUrl) return; // Exit if URLs are empty

        try {

            const currentEndAt =new Date().toISOString();
            console.log("Clicked")
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error('User not logged in or failed to get user:', authError);
                return;
            }

            // Update the repository and live URLs
            const { data: repoData, error: repoError } = await supabase
                .from('user_challenges')
                .update({ 
                    // challenge_repo: data.repoUrl,
                    challenge_live: data.liveUrl,
                    completed_at: currentEndAt,
                    status: "completed",
                })
                .match({ user_id: user.id, challenge_id: currentChallenge.id });

            if (repoError) {
                console.error('Error updating the repository URL:', repoError);
                return;
            }

            setStatus('completed');
            console.log('Repo URL updated successfully:', liveUrl);
        } catch (error) {
            console.error('Error submitting the URLs:', error);
        }
    };

    

    return (
        <div className="ChallengeDisplay">
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
                                ? <button className='challengeDescription-start-button' onClick={handleStartClick}>{status === 'not-started' ? "Start" : "Download Requirements"}</button>
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
            </div>
        </div>
    );
};

export default ChallengeDisplay;
