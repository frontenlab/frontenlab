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
                    .select('*')
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

    // new method
    const repoUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    const liveUrlPattern = /^https?:\/\/([\w-]+\.)?github\.io(\/[\w- ./?%&=]*)?$/;
    const [repoUrl, setRepoUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [repoErrorMessage, setRepoErrorMessage] = useState('');
    const [liveErrorMessage, setLiveErrorMessage] = useState('');

    const handleRepoUrlChange = (e) => {
        const value = e.target.value;
        setRepoUrl(value);
    
        // Validate repository URL
        if (!value) {
          setRepoErrorMessage('Repository URL is required.');
        } else if (!repoUrlPattern.test(value)) {
          setRepoErrorMessage('Please enter a valid GitHub repository URL.');
        } else {
          setRepoErrorMessage(''); // Clear error if valid
        }
      };
    
      // Handler for live site URL input
      const handleLiveUrlChange = (e) => {
        const value = e.target.value;
        setLiveUrl(value);
    
        // Validate live site URL
        if (!value) {
          setLiveErrorMessage('Live site URL is required.');
        } else if (!liveUrlPattern.test(value)) {
          setLiveErrorMessage('Please enter a valid GitHub live URL.');
        } else {
          setLiveErrorMessage(''); // Clear error if valid
        }
      };

      const newRepoUrl = repoUrl;
      const newLiveUrl = liveUrl;
      const demo = "hello.com"
    
    //   Form submission handler
      const handleChallengeSubmit = async () => {
        console.log("test button clicked")
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
                    challenge_repo: demo,
                    challenge_live: demo,
                }, { onConflict: ['user_id', 'challenge_id'] });

            if (error) throw error;

            // Update local state after successful update
            setStatus('ongoing');
            setStartedAt(currentStartedAt);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    

        

      //New method





    
    // test click

    // const repo = "https://github.com/Mr-Anas1/Learnerr";
    // const live = "https://mr-anas1.github.io/Learnerr/";

    // const handleTestClick = async () => {
    //     console.log("test button clicked")
    //     if (!isLoggedIn) {
    //         window.location.href = '/'; // Redirect to login if not logged in
    //         return;
    //     }

    //     try {
    //         // Initialize started_at only if it hasn't been set
    //         const currentStartedAt = startedAt || new Date().toISOString();

    //         // Upsert into the user_challenges table
    //         const { data: { user } } = await supabase.auth.getUser();
    //         const { error } = await supabase
    //             .from('user_challenges')
    //             .upsert({
    //                 user_id: user.id,
    //                 challenge_id: currentChallenge.id,
    //                 challenge_repo: "repo",
    //                 challenge_live: live,
    //             }, { onConflict: ['user_id', 'challenge_id'] });

    //         if (error) throw error;

    //         // Update local state after successful update
    //         setStatus('ongoing');
    //         setStartedAt(currentStartedAt);
    //     } catch (error) {
    //         console.error('Error updating status:', error);
    //     }
    // };
    // test click


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
                    challenge_live: " ", 
                    challenge_repo: " ",
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
                        <div className="challengeDisplay-input-links">
                        <div className="challengeDisplay-repo-url-input challengeDisplay-input-box">
                            <p>Repository URL</p>
                            <input
                                type="text"
                                className="overlay-input repo-url"
                                placeholder="GitHub repository URL"
                                value={repoUrl}
                                onChange={handleRepoUrlChange}
                            />
                            {repoErrorMessage && <div className="overlay-input-error">{repoErrorMessage}</div>}
                            </div>

                            <div className="challengeDisplay-live-url-input challengeDisplay-input-box">
                            <p>Live site URL</p>
                            <input
                                type="text"
                                className="overlay-input live-url"
                                placeholder="GitHub live site URL"
                                value={liveUrl}
                                onChange={handleLiveUrlChange}
                            />
                            {liveErrorMessage && <div className="overlay-input-error">{liveErrorMessage}</div>}
                            </div>
                        </div>
                        <button className='challengeDescription-submit-button' onClick={handleChallengeSubmit}>Submit Solution</button>
                        {/* <button className='challengeDescription-submit-button' onClick={handleTestClick}>Submit test</button> */}


                    
                    </div>
                    : 
                    null
                }
                
                

                

            </div>
        </div>
    );
};

export default ChallengeDisplay;