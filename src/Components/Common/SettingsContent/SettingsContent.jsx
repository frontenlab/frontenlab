import React from 'react'
import './SettingsContent.css'
import male2 from '../../../Assets/Images/male2.jpg'
import { useState } from 'react'


const SettingsContent = () => {

    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [githubErrorMessage, setGithubErrorMessage] = useState('');
    const [linkedinErrorMessage, setLinkedinErrorMessage] = useState('');


    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/.*$/i;
    const githubPattern = /^https:\/\/(www\.)?github\.com\/.*$/i;

    const handleLinkedinChange = (e) => {
        const value = e.target.value;
        setLinkedinUrl(value);

        if (value === '') {
            setLinkedinErrorMessage(''); 
        } else if (linkedinPattern.test(value)) {
            setLinkedinErrorMessage(''); 
        }
    }

    const handleGithubChange = (e) => {
        const value = e.target.value;
        setGithubUrl(value);

        if (value === '') {
            setGithubErrorMessage('');
        } else if (githubPattern.test(value)) {
            setGithubErrorMessage('');
        }
    }

    const handleSettingsUpdateClick = () => {
        let hasError = false;
        
        if(linkedinUrl && !linkedinPattern.test(linkedinUrl)) {
            setLinkedinErrorMessage("Please enter a valid LinkedIn URL.");
            hasError = true;
        }

        if(githubUrl && !githubPattern.test(githubUrl)){
            setGithubErrorMessage("Please enter a valid GitHub URL.");
            hasError = true;
        }


        if(hasError){
            return;
        }

        alert("Profile Updated");
    }

  return (
    <div className="Settings-content">
        <div className="settings-profile">
            <h2>Profile</h2>
            <div className="settings-profile-img">
                <img src={male2} alt="male-img" />
            </div>
            <p>Name</p>
            <input type="text" placeholder='Name' className="profile-name-input" />
            <p>Bio</p>
            <textarea type="text" placeholder='Bio' className="profile-bio" />
        </div>

        <div className="settings-social">
            <h2>Social</h2>
            <p>Linkedin</p>
            <input type="text" placeholder='www.linkedin.com/@username' className="profile-linkedin" value={linkedinUrl} onChange={handleLinkedinChange} /> 
            {linkedinErrorMessage && <div className="error-message">{linkedinErrorMessage}</div>}
            <p>Github</p>
            <input type="text" placeholder='www.github.com/@username' className="profile-github" value={githubUrl} onChange={handleGithubChange} />
            {githubErrorMessage && <div className="error-message">{githubErrorMessage}</div>}

        </div>
        <div className="settings-button">
            <button onClick={handleSettingsUpdateClick}>Update</button>
        </div>
    </div>
  )
}

export default SettingsContent