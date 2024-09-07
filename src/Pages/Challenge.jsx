import React from 'react';
import { useParams } from 'react-router-dom';
import ChallengeDisplay from '../Components/Common/ChallengeDisplay/ChallengeDisplay';
import Navbar from '../Components/Common/Navbar/Navbar';
import Footer from '../Components/Common/Footer/Footer';
import useChallenges from '../Helpers/fetchChallenges';
import SkeletonChallenge from '../Components/UI/SkeletonChallenge/SkeletonChallenge';

const Challenge = () => {
    const { challengeId } = useParams();
    const { challenges, loading, error } = useChallenges();
    const formattedChallengeId = challengeId.replace(/-/g, ' ');


    if (loading) {
      return <SkeletonChallenge />;
  }

    if (error) {
        return <p>Error: {error}</p>;
    }


    const currentChallenge = challenges.find((e) => e.title === formattedChallengeId);

    return (
        <div className="Challenge">
            <Navbar />
            {currentChallenge ? (
                <ChallengeDisplay currentChallenge={currentChallenge} />
            ) : (
                <p>Challenge not found</p>
            )}
            <Footer />
        </div>
    );
};

export default Challenge;
