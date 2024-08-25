import React from 'react'
import './ChallengeStructure.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

const ChallengeStructure = (props) => {
  return (
    <div className={`challenge ${props.isSmallWidth ? 'small-width' : ''}`}>
      <Link to={`/challenge/${props.title}`}><img src={props.imgDesktop} alt="challenge-img" /></Link>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <Outlet />
    </div>
  )
}

export default ChallengeStructure