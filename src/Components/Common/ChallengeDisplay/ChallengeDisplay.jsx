import React from 'react'

const ChallengeDisplay = (props) => {

    const {currentChallenge} = props;
  return (
    <div className="ChallengeDisplay">
        <div className="challengeDisplay-box">
            <div className="challengeDisplay-box-img">
                <img src={currentChallenge.img} alt="box-img" />
            </div>

            <div className="challengeDisplay-box-buttons">
                <button className="button1">Desktop</button>
                <button className="button2">Tablet</button>
                <button className="button3">Mobile</button>
            </div>
        </div>
    </div>
  )
}

export default ChallengeDisplay