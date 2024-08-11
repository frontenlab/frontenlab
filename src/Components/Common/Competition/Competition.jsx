import React from 'react'
import './Competition.css'
import competition from '../../../Assets/Images/competition.png'

const Competition = () => {
  return (
    <div className="Competition">
        <h1 className="title">Learn and Compete</h1>
        <div className="competition-content">
            <div className="competition-content-img">
                <img src={competition} alt="competition-img" />
            </div>

            <div className="competition-content-description">
                <h2>Join Our Weekly Frontend Competition</h2>
                <p>Participate in our weekly frontend web development hackathon and compete for top ranks. Earn exclusive badges and showcase your skills to the community. Sharpen your frontend expertise with new challenges every week!</p>
                <button className="competition-content-button">Join Now</button>
            </div>
        </div>

        <hr />
    </div>
  )
}

export default Competition