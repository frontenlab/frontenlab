import React from 'react'
import './Challenge.css'

const Challenge = (props) => {
  return (
    <div className="challenge">
      <img src={props.img} alt="challenge-img" />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default Challenge