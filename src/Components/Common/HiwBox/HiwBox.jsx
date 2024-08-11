import React from 'react'
import './HiwBox.css'

const HiwBox = (props) => {
  return (
    <div className="HiwBox">
      <img className='main-img' src={props.img} alt="main-img" />
      <img src={props.no} alt="no-img" className="number" />
      <p className="description">{props.description}</p>
    </div>
  )
}

export default HiwBox