import React from 'react'
import './NewChallenges.css'
import NewChallenge from '../../../Helpers/NewChallenge'
import Challenge from '../Challenge/Challenge'

const NewChallenges = () => {
  return (
    <div className="NewChallenge">
        <h1 className="title">New Challenges</h1>
        <div className="New-Challenge challenges">
            {NewChallenge.map((challenge, index) => {
                return <Challenge key={challenge.id} id={challenge.id} img={challenge.img} title={challenge.title} description={challenge.description} />
            })}
        </div>
        
        <hr />
    </div>
  )
}

export default NewChallenges