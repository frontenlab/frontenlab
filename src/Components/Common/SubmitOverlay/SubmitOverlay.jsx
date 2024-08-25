import React from 'react'
import './SubmitOverlay.css'
import { useState } from 'react';

const SubmitOverlay = ({overlayActive, setOverlayActive}) => {

    const repoUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    const liveUrlPattern = /^https?:\/\/([\w-]+\.)?github\.io(\/[\w- ./?%&=]*)?$/;
    

    const [repoUrl, setRepoUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [repoErrorMessage, setRepoErrorMessage] = useState('');
    const [liveErrorMessage, setLiveErrorMessage] = useState('');

    const handleChallengeCancel = () => {
        setOverlayActive(!overlayActive);
    }

    const handleLiveUrlChange = (e) => {
        const value = e.target.value;
        setLiveUrl(value);
        if(value === ''){
            setLiveErrorMessage('');
        } else if(liveUrlPattern.test(value)){
            setLiveErrorMessage('');
        }
    }


    const handleRepoUrlChange = (e) => {
        const value = e.target.value;
        setRepoUrl(value);
        if(value === ''){
            setRepoErrorMessage('');
        } else if(repoUrlPattern.test(value)){
            setRepoErrorMessage('');
        }
    }

    const handleChallengeSubmit = () => {
        let hasError = false;


        if(!repoUrl) {
            setRepoErrorMessage("Repository URL is required.");
            hasError = true;
        }
        else if(repoUrl && !repoUrlPattern.test(repoUrl)){
            setRepoErrorMessage("Please enter a valid github repository URL.");
            hasError = true;
        }

        if(!liveUrl) {
            setLiveErrorMessage("Live site URL is required.");
            hasError = true;
        }
        else if(liveUrl && !liveUrlPattern.test(liveUrl)){
            setLiveErrorMessage("Please enter a valid github live URL.");
            hasError = true;
        }

        if (hasError) {
            return
        }

        alert("Congratulations!!!")
    }

  return (
    <div className="SubmitOverlay">
        <div className="overlay-content">
            <h2>Submit Solution</h2>
            <div className="overlay-repo-url input-box">
                <p>Repository URL</p>
                <input type="text" className='overlay-input repo-url' placeholder='Github repository url' onChange={handleRepoUrlChange}/>
                {repoErrorMessage && <div className='overlay-input-error'>{repoErrorMessage}</div>}
            </div>

            <div className="github-live-url input-box">
                <p>Live site URL</p>
                <input type="text" className='overlay-input live-url' placeholder='Github Live site url' onChange={handleLiveUrlChange} />
                {liveErrorMessage && <div className='overlay-input-error'>{liveErrorMessage}</div>}
            </div>

            <div className="overlay-buttons">
                <button className="overlay-submit" onClick={handleChallengeSubmit}>Submit</button>
                <button className="overlay-cancel" onClick={handleChallengeCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default SubmitOverlay