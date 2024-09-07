import React from 'react'
import './ChallengeStructure.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

const ChallengeStructure = (props) => {

  const formattedTitle = props.title.replace(/\s+/g, '-');

  return (
    <div className={"challenge"}>
      <Link to={`/challenge/${formattedTitle}`} state={{ currentChallenge: props }}><img src={props.imgDesktop} alt="challenge-img" /></Link>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <Outlet />
    </div>
  )
}

export default ChallengeStructure