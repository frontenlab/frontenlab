import React from 'react'
import './SettingsContent.css'
import male2 from '../../../Assets/Images/male2.jpg'


const SettingsContent = () => {
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
            <input type="text" placeholder='www.linkedin.com/@username' className="profile-linkedin" /> 
            <p>Github</p>
            <input type="text" placeholder='www.github.com/@username' className="profile-github" />
        </div>

        <div className="settings-button">
            <button>Update</button>
        </div>
    </div>
  )
}

export default SettingsContent