import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../../Helpers/SupabaseClient';
import './SettingsContent.css';
import { useNavigate } from 'react-router-dom';
import SettingsSkeleton from '../../../Helpers/SettingsLoadingSkeleton';

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
  const [githubErrorMessage, setGithubErrorMessage] = useState('');
  const [linkedinErrorMessage, setLinkedinErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

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
            .select('avatar_url, name, bio, linkedin_url, github_url')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
          } else {
            setUserData(data);
            setName(data.name || '');
            setBio(data.bio || '');
            setLinkedinUrl(data.linkedin_url || '');
            setGithubUrl(data.github_url || '');
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
            name,
            bio,
            linkedin_url: linkedinUrl,
            github_url: githubUrl,
          })
          .eq('id', session.user.id);

        if (error) {
          toast.error('There was an issue updating your profile.');
        } else {
          navigate('/profile', { state: { showToast: true } });
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
      value = value.replace(/[^a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]/g, ''); // Replace unwanted characters with ''
    }

    setLinkedinUrl(value);

    if (!value || (linkedinPattern.test(value) && value.length >= socialMinLength && value.length <= socialMaxLength)) {
      setLinkedinErrorMessage('');
    } else {
      setLinkedinErrorMessage('Please enter a valid LinkedIn URL.');
    }
  };

  const handleGithubChange = (e) => {
    let value = e.target.value;

    if (!allowedUrlCharacters.test(value)) {
      value = value.replace(/[^a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]/g, ''); // Replace unwanted characters with ''
    }

    setGithubUrl(value);

    if (!value || (githubPattern.test(value) && value.length >= socialMinLength && value.length <= socialMaxLength)) {
      setGithubErrorMessage('');
    } else {
      setGithubErrorMessage('Please enter a valid GitHub URL.');
    }
  };

  const handleSettingsUpdateClick = () => {
    if (linkedinErrorMessage || githubErrorMessage) {
      return;
    }
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
        {linkedinErrorMessage && <div className="error-message">{linkedinErrorMessage}</div>}
        <p>GitHub</p>
        <input
          type="text"
          placeholder="www.github.com/@username"
          className="profile-github"
          value={githubUrl}
          onChange={handleGithubChange}
        />
        {githubErrorMessage && <div className="error-message">{githubErrorMessage}</div>}
      </div>

      <div className="settings-button">
        <button onClick={handleSettingsUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default SettingsContent;
