import React, { useState, useEffect } from 'react';
import './ChallengeStructure.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChallengeStructure = (props) => {
  const [challengeLoading, setChallengeLoading] = useState(true);

  const handleImageLoad = () => {
    setChallengeLoading(false); // Image has finished loading
  };

  // Check if the image is already cached
  useEffect(() => {
    const img = new Image();
    img.src = props.imgDesktop;
    img.onload = handleImageLoad; // Handle if image is cached
  }, [props.imgDesktop]);

  const formattedTitle = props.title.replace(/\s+/g, '-');

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-text difficulty-easy';
      case 'intermediate':
        return 'difficulty-text difficulty-intermediate';
      case 'hard':
        return 'difficulty-text difficulty-hard';
      default:
        return '';
    }
  };
  

  return (
    <div className="challenge">
      <Link to={`/challenge/${formattedTitle}`} state={{ currentChallenge: props }}>
        {challengeLoading ? (
          <Skeleton height={210} width={366} /> // Show skeleton if loading
        ) : (
          <img
            src={props.imgDesktop}
            alt="challenge-img"
            onLoad={handleImageLoad}
            onError={() => setChallengeLoading(false)} // In case image fails to load
            style={{ display: challengeLoading ? 'none' : 'block' }}
          />
        )}
      </Link>
      <h3>{props.title}</h3>
      <div className='challenge-description'>{props.description}</div>
      <div className={`difficulty-text ${getDifficultyClass(props.difficulty)}`}>{props.difficulty.toUpperCase()}</div>
      <Outlet />
    </div>
  );
};

export default ChallengeStructure;
