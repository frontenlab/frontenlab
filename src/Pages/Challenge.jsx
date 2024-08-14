import React from 'react'
import AllChallengesContent from '../Helpers/AllChallengesContent'
import { useParams } from 'react-router-dom';
import ChallengeDisplay from '../Components/Common/ChallengeDisplay/ChallengeDisplay';
import Navbar from '../Components/Common/Navbar/Navbar';

const Challenge = () => {
    const { challengeId } = useParams();
    const currentChallenge = AllChallengesContent.find((e) => e.title === challengeId)

  return (
    <div className="Challenge">
        <Navbar />
        {currentChallenge ? (
                <ChallengeDisplay currentChallenge={currentChallenge} />
            ) : (
                <p>Challenge not found</p>
            )}
    </div>
  )
}

export default Challenge