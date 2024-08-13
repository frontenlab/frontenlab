import React from 'react'
import AllChallengesContent from '../Helpers/AllChallengesContent'
import { useParams } from 'react-router-dom';
import ChallengeDisplay from '../Components/Common/ChallengeDisplay/ChallengeDisplay';

const Challenge = () => {
    const { challengeId } = useParams();
    const currentChallenge = AllChallengesContent.find((e) => e.id === Number(challengeId))

  return (
    <div className="Challenge">
        {currentChallenge ? (
                <ChallengeDisplay currentChallenge={currentChallenge} />
            ) : (
                <p>Challenge not found</p>
            )}
    </div>
  )
}

export default Challenge