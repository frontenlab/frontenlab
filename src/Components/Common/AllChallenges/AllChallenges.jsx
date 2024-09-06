import React from 'react'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import AllChallengesContent from '../../../Helpers/AllChallengesContent'
import './AllChallenges.css'
import useChallenges from '../../../Helpers/FetchChallenges'

const AllChallenges = () => {

  const {challenges, loading, error} = useChallenges();

  if(loading) return <p>Loading challenges...</p>
  if(error) return <p>Error : {error}</p>
  return (
    <div className="AllChallenges">
        <div className="AllChallenges-content">
          <h1>Explore Frontend Challenges</h1>
          <p className='allChallenge-description'>Find categorized frontend challenges and projects to sharpen your skills and advance your frontend development expertise.</p>

          <div className="AllChallenges-container">
            {challenges.map((challenge, index) => {
                return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.template_img} imgTablet={challenge.template_img} imgMobile={challenge.template_img} title={challenge.title} description={challenge.description} />
            })}
          </div>
        </div>
    </div>
  )
}

export default AllChallenges