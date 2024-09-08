import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ChallengeDisplay.css';
import SubmitOverlay from '../SubmitOverlay/SubmitOverlay';
import { supabase } from '../../../Helpers/SupabaseClient';
import Login from '../../../Helpers/Login';

const ChallengeDisplay = (props) => {
    const location = useLocation();
    const currentChallenge = location.state?.currentChallenge;

    const [activeBtn, setActiveBtn] = useState("button1");
    const [imgUrl, setImgUrl] = useState(props.currentChallenge.imgDesktop);
    const [overlayActive, setOverlayActive] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState('not-started');
    const [startedAt, setStartedAt] = useState(null);

    useEffect(() => {
        const checkUserStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);

            if (user) {
                // Fetch user's status for the challenge from user_challenges
                const { data, error } = await supabase
                    .from('user_challenges')
                    .select('status, started_at')
                    .eq('user_id', user.id)
                    .eq('challenge_id', currentChallenge.id)
                    .maybeSingle();

                if (data) {
                    setStatus(data.status);
                    setStartedAt(data.started_at);
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
            // Initialize started_at only if it hasn't been set
            const currentStartedAt = startedAt || new Date().toISOString();

            // Upsert into the user_challenges table
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('user_challenges')
                .upsert({
                    user_id: user.id,
                    challenge_id: currentChallenge.id,
                    status: 'ongoing',
                    started_at: currentStartedAt,
                }, { onConflict: ['user_id', 'challenge_id'] });

            if (error) throw error;

            // Update local state after successful update
            setStatus('ongoing');
            setStartedAt(currentStartedAt);
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

    const handleSubmitSolutionClick = () => {
        setOverlayActive(!overlayActive);
    };

    const handleButtonClick = (button) => () => {
        setActiveBtn(button);

        switch(button) {
            case "button1":
                setImgUrl(props.currentChallenge.template_img);
                break;
            case "button2":
                setImgUrl(props.currentChallenge.tablet_img);
                break;
            case "button3":
                setImgUrl(props.currentChallenge.mobile_img);
                break;
            default:
                setImgUrl(props.currentChallenge.template_img);
        }
    };

    useEffect(() => {
        if (overlayActive) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [overlayActive]);

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
                                ? <button className='challengeDescription-start-button' onClick={handleStartClick}>{status === 'not-started'? "Start": "Download Requirements"}</button>
                                : <Login class_name={"challengeDescription-start-button"} name={"Login to start"} />
                            }
                            <button className={status !== 'ongoing'?  'challengeDisplay-status': 'challengeDisplay-status-active' }>{status === 'ongoing' ? 'Ongoing' : ''}</button>
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

                {
                    status ==='ongoing' ? 
                    <div className="challengeDisplay-content-box2">
                        <h1>Submit Solution</h1>
                        <p>Submit your finished work to show your skills. Earn points, get feedback, and move up on the leaderboard as you improve your frontend development!</p>
                        <button className='challengeDescription-submit-button' onClick={handleSubmitSolutionClick}>Submit Solution</button>
                    </div>
                    : 
                    null
                }
                
                {overlayActive && <SubmitOverlay overlayActive={overlayActive} setOverlayActive={setOverlayActive} status={status} setStatus = {setStatus} currentChallenge={currentChallenge} />}
            </div>
        </div>
    );
};

export default ChallengeDisplay;
