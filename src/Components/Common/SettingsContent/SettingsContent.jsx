import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../../Helpers/SupabaseClient';
import './SettingsContent.css';
import { useNavigate } from 'react-router-dom';
import SettingsSkeleton from '../../../Helpers/SettingsLoadingSkeleton';
import DOMPurify from 'dompurify';

// Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const pattern = /^[a-zA-Z0-9 ]*$/; // Pattern to allow only alphanumeric characters and spaces
const nameMaxLength = 50; 
const bioMaxLength = 150; 
const socialMinLength = 15;
const socialMaxLength = 100;

const SettingsContent = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');

  const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/.*$/i;
  const githubPattern = /^https:\/\/(www\.)?github\.com\/.*$/i;
  const allowedUrlCharacters = /^[a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]*$/;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          const { data, error } = await supabase
            .from('users')
            .select('avatar_url, name, bio, linkedin_url, github_url, username')
            .eq('id', session.user.id)
            .single();

          if (!error) {
            setUserData(data);
            setName(data.name || '');
            setBio(data.bio || '');
            setLinkedinUrl(data.linkedin_url || '');
            setGithubUrl(data.github_url || '');
            setUsername(data.username || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { error } = await supabase
          .from('users')
          .update({
            name: DOMPurify.sanitize(name),  // Sanitize input
            bio: DOMPurify.sanitize(bio),    // Sanitize input
            linkedin_url: DOMPurify.sanitize(linkedinUrl), // Sanitize input
            github_url: DOMPurify.sanitize(githubUrl),     // Sanitize input
          })
          .eq('id', session.user.id);

        if (!error) {
          navigate(`/profile/${username}`, { state: { showToast: true } });
        } else {
          toast.error('There was an issue updating your profile.');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred.');
    }
    console.log("Attempting to update:", { name, bio, linkedinUrl, githubUrl });
  };

  const showToast = debounce((message) => toast.error(message), 1100);

  const handleNameChange = (e) => {
    const value = e.target.value;

    if (!pattern.test(value)) {
      showToast('Name cannot contain special characters.');
      return;
    }

    if (value.length > nameMaxLength) {
      showToast(`Name cannot exceed ${nameMaxLength} characters.`);
      return;
    }

    setName(value);
  };

  const handleBioChange = (e) => {
    const value = e.target.value;

    if (!pattern.test(value)) {
      showToast('Bio cannot contain special characters.');
      return;
    }

    if (value.length > bioMaxLength) {
      showToast(`Bio cannot exceed ${bioMaxLength} characters.`);
      return;
    }

    setBio(value);
  };

  const handleLinkedinChange = (e) => {
    let value = e.target.value;

    if (!allowedUrlCharacters.test(value)) {
      value = value.replace(/[^a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]/g, '');
    }

    setLinkedinUrl(value);
  };

  const handleGithubChange = (e) => {
    let value = e.target.value;

    if (!allowedUrlCharacters.test(value)) {
      value = value.replace(/[^a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]/g, '');
    }

    setGithubUrl(value);
  };

  const handleSettingsUpdateClick = () => {
    handleUpdate();
  };

  if (loading) return <SettingsSkeleton />;

  return (
    <div className="Settings-content">
      <div className="settings-profile">
        <h2>Profile</h2>
        <div className="settings-profile-img">
          <img src={userData?.avatar_url} alt="profile-img" className="avatar" />
        </div>
        <p className='profile-label'>Name</p>
        <input
          type="text"
          placeholder="Name"
          className="profile-name-input"
          value={name}
          onChange={handleNameChange}
        />
        <p>Bio</p>
        <textarea
          placeholder="Bio"
          className="profile-bio-input"
          value={bio}
          onChange={handleBioChange}
        />
      </div>

      <div className="settings-social">
        <h2>Social</h2>
        <p>LinkedIn</p>
        <input
          type="text"
          placeholder="www.linkedin.com/@username"
          className="profile-linkedin"
          value={linkedinUrl}
          onChange={handleLinkedinChange}
        />
        <p>GitHub</p>
        <input
          type="text"
          placeholder="www.github.com/@username"
          className="profile-github"
          value={githubUrl}
          onChange={handleGithubChange}
        />
      </div>

      <div className="settings-button">
        <button onClick={handleSettingsUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default SettingsContent;
