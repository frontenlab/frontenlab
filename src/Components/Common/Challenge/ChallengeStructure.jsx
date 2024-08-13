import React from 'react'
import './ChallengeStructure.css'
import { Link } from 'react-router-dom'

const ChallengeStructure = (props) => {
  return (
    <div className="challenge">
      <Link to={`/challenge/${props.id}`}><img src={props.img} alt="challenge-img" /></Link>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default ChallengeStructure