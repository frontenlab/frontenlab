import React from 'react'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import AllChallengesContent from '../../../Helpers/AllChallengesContent'
import './AllChallenges.css'

const AllChallenges = () => {
  return (
    <div className="AllChallenges">
        <div className="AllChallenges-content">
          <h1>Explore Frontend Challenges</h1>
          <p>Find categorized frontend challenges and projects to sharpen your skills and advance your frontend development expertise.</p>

          <div className="AllChallenges-container">
            {AllChallengesContent.map((challenge, index) => {
                return <ChallengeStructure key={challenge.id} id={challenge.id} img={challenge.img} title={challenge.title} description={challenge.description} />
            })}
          </div>
        </div>
    </div>
  )
}

export default AllChallenges