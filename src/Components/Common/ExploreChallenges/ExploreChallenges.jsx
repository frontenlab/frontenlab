import React from 'react'
import './ExploreChallenges.css'
import NewChallenge from '../../../Helpers/NewChallenge'
import ChallengeStructure from '../Challenge/ChallengeStructure'

const ExploreChallenges = () => {
  return (
    <div className="ExploreChallenges">
        <h1 className="title">New Challenges</h1>
        <div className="ExploreChallenges challenges">
            {NewChallenge.map((challenge, index) => {
                return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.imgDesktop} imgTablet={challenge.imgTablet} imgMobile={challenge.imgMobile} title={challenge.title} description={challenge.description} />
            })}
        </div>
        
        <button>Explore more</button>
        <hr />
    </div>
  )
}

export default ExploreChallenges