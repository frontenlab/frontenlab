import React, { useState, useEffect } from 'react';
import './SubmitOverlay.css';
import { supabase } from '../../../Helpers/SupabaseClient';

const SubmitOverlay = ({ overlayActive, setOverlayActive, status, setStatus, currentChallenge }) => {
  const repoUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
  const liveUrlPattern = /^https?:\/\/([\w-]+\.)?github\.io(\/[\w- ./?%&=]*)?$/;

  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoErrorMessage, setRepoErrorMessage] = useState('');
  const [liveErrorMessage, setLiveErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startedAt, setStartedAt] = useState('');

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      console.log("User:", user); // Debugging line

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      setIsLoggedIn(!!user);

      if (user) {
        const { data, error } = await supabase
          .from('user_challenges')
          .select('status, started_at, challenge_repo, challenge_live, completed_at')
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

  const handleChallengeCancel = () => {
    setOverlayActive(!overlayActive);
  };

  const handleLiveUrlChange = (e) => {
    const value = e.target.value;
    setLiveUrl(value);
    setLiveErrorMessage(value === '' ? '' : liveUrlPattern.test(value) ? '' : 'Please enter a valid GitHub live URL.');
  };

  const handleRepoUrlChange = (e) => {
    const value = e.target.value;
    setRepoUrl(value);
    setRepoErrorMessage(value === '' ? '' : repoUrlPattern.test(value) ? '' : 'Please enter a valid GitHub repository URL.');
  };

  const handleChallengeSubmit = async () => {
    console.log('Submit button clicked');
    console.log('Repo URL on submit:', repoUrl);
    console.log('Live URL on submit:', liveUrl);

    let hasError = false;

    if (!repoUrl) {
      setRepoErrorMessage('Repository URL is required.');
      hasError = true;
    } else if (!repoUrlPattern.test(repoUrl)) {
      setRepoErrorMessage('Please enter a valid GitHub repository URL.');
      hasError = true;
    }

    if (!liveUrl) {
      setLiveErrorMessage('Live site URL is required.');
      hasError = true;
    } else if (!liveUrlPattern.test(liveUrl)) {
      setLiveErrorMessage('Please enter a valid GitHub live URL.');
      hasError = true;
    }

    if (hasError) return;

    if (!isLoggedIn) {
      alert('Please log in to submit your solution.');
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        alert('User not logged in.');
        return;
      }

      const currentTime = new Date().toISOString(); // Set the current time for completed_at

      const { error: upsertError } = await supabase
        .from('user_challenges')
        .upsert({
          user_id: user.id,
          challenge_id: currentChallenge.id,
          challenge_repo: repoUrl,
          challenge_live: liveUrl,
          status: 'completed',
          completed_at: currentTime,
        }, { onConflict: ['user_id', 'challenge_id'] });

      if (upsertError) {
        console.error('Error upserting data:', upsertError);
        alert('Error submitting solution: ' + upsertError.message);
        return;
      }

      setStatus('completed');
      alert('Congratulations! Your solution has been submitted successfully.');
      setOverlayActive(false);

    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`SubmitOverlay ${overlayActive ? 'active' : ''}`}>
      <div className="overlay-content">
        <h2>Submit Solution</h2>
        <div className="overlay-repo-url input-box">
          <p>Repository URL</p>
          <input
            type="text"
            className='overlay-input repo-url'
            placeholder='GitHub repository URL'
            onChange={handleRepoUrlChange}
            value={repoUrl}
          />
          {repoErrorMessage && <div className='overlay-input-error'>{repoErrorMessage}</div>}
        </div>

        <div className="github-live-url input-box">
          <p>Live site URL</p>
          <input
            type="text"
            className='overlay-input live-url'
            placeholder='GitHub live site URL'
            onChange={handleLiveUrlChange}
            value={liveUrl}
          />
          {liveErrorMessage && <div className='overlay-input-error'>{liveErrorMessage}</div>}
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
