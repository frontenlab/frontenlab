import React, { useState } from 'react';
import './SubmitOverlay.css';

const SubmitOverlay = ({ overlayActive, setOverlayActive, handleOverlaySubmit }) => {
  const repoUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
  const liveUrlPattern = /^https?:\/\/([\w-]+\.)?github\.io(\/[\w- ./?%&=]*)?$/;

  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoErrorMessage, setRepoErrorMessage] = useState('');
  const [liveErrorMessage, setLiveErrorMessage] = useState('');


  const handleChallengeCancel = () => {
    setOverlayActive(false); // This should correctly close the overlay
  };

  const handleLiveUrlChange = (e) => {
    const value = e.target.value;
    setLiveUrl(value);
    if (value === '') {
      setLiveErrorMessage('');
    } else if (liveUrlPattern.test(value)) {
      setLiveErrorMessage('');
    }
  };

  const handleRepoUrlChange = (e) => {
    const value = e.target.value;
    setRepoUrl(value);
    if (value === '') {
      setRepoErrorMessage('');
    } else if (repoUrlPattern.test(value)) {
      setRepoErrorMessage('');
    }
  };

  const handleChallengeSubmit = () => {
    let hasError = false;

    if (!repoUrl) {
      setRepoErrorMessage('Repository URL is required.');
      hasError = true;
    } else if (repoUrl && !repoUrlPattern.test(repoUrl)) {
      setRepoErrorMessage('Please enter a valid GitHub repository URL.');
      hasError = true;
    }

    if (!liveUrl) {
      setLiveErrorMessage('Live site URL is required.');
      hasError = true;
    } else if (liveUrl && !liveUrlPattern.test(liveUrl)) {
      setLiveErrorMessage('Please enter a valid GitHub live URL.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setOverlayActive(false); // Close the overlay after successful submission
    handleOverlaySubmit(repoUrl, liveUrl); // Pass data back to parent
  };

  return (
    <div className={`SubmitOverlay ${overlayActive ? 'active' : ''}`}>
      <div className="overlay-content">
        <h2>Submit Solution</h2>
        <div className="overlay-repo-url input-box">
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

        <div className="github-live-url input-box">
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

        <div className="overlay-buttons">
          <button className="overlay-submit" onClick={handleChallengeSubmit}>Submit</button>
          <button className="overlay-cancel" onClick={handleChallengeCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitOverlay;
