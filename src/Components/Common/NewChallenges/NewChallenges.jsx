import React from 'react'
import './NewChallenges.css'
import NewChallenge from '../../../Helpers/NewChallenge'
import ChallengeStructure from '../Challenge/ChallengeStructure'

const NewChallenges = () => {
  return (
    <div className="NewChallenge">
        <h1 className="title">New Challenges</h1>
        <div className="New-Challenge challenges">
            {NewChallenge.map((challenge, index) => {
                return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.imgDesktop} imgTablet={challenge.imgTablet} imgMobile={challenge.imgMobile} title={challenge.title} description={challenge.description} />
            })}
        </div>
        
        <button>Explore more</button>
        <hr />
    </div>
  )
}

export default NewChallenges