import React from 'react';
import { useParams } from 'react-router-dom';
import ChallengeDisplay from '../Components/Common/ChallengeDisplay/ChallengeDisplay';
import Navbar from '../Components/Common/Navbar/Navbar';
import Footer from '../Components/Common/Footer/Footer';
import useChallenges from '../Helpers/FetchChallenges';
import SkeletonChallenge from '../Components/UI/SkeletonChallenge/SkeletonChallenge';
import ErrorMessage from '../Components/Common/ErrorMessage/ErrorMessage';
import NotFound from '../Components/Common/NotFound/NotFound';

const Challenge = () => {
    const { challengeId } = useParams();
    const { challenges, loading, error } = useChallenges();
    const formattedChallengeId = challengeId.replace(/-/g, ' ');


    if (loading) {
      return <SkeletonChallenge />;
  }

  if(error) return (
    <ErrorMessage heading={"Network Error"} description={"Check your internet connection and try again"} />
  )


    const currentChallenge = challenges.find((e) => e.title === formattedChallengeId);

    return (
        <div className="Challenge">
            <Navbar />
            {currentChallenge ? (
                <ChallengeDisplay currentChallenge={currentChallenge} />
            ) : (
                <NotFound />
            )}
            <Footer />
        </div>
    );
};

export default Challenge;
