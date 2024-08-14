import React from 'react'
import './ChallengeDisplay.css'
import { useState, useEffect } from 'react';

const ChallengeDisplay = (props) => {

    const [activeBtn, setActiveBtn] = useState("button1");
    const [imgUrl, setImgUrl] = useState(props.currentChallenge.imgDesktop);

    useEffect(()=> {
        setActiveBtn("button1");
        setImgUrl(props.currentChallenge.imgDesktop)
    }, [props.currentChallenge]);

    const handleButtonClick = (button) => () => {
        setActiveBtn(button);

        switch(button) {
            case "button1":
                setImgUrl(props.currentChallenge.imgDesktop);
                break;
            case "button2":
                setImgUrl(props.currentChallenge.imgTablet);
                break;
            case "button3":
                setImgUrl(props.currentChallenge.imgMobile);
                break;
            default:
                setImgUrl(props.currentChallenge.imgDesktop);
        }
    }

  return (
    <div className="ChallengeDisplay">
        <div className="challengeDisplay-box">
            <div className="challengeDisplay-box-img">
                <img src={imgUrl} alt="box-img" />
            </div>

            <div className="challengeDisplay-box-buttons">
                <button className={`button1 ${activeBtn=== "button1"? "active-btn": ""}` } onClick={handleButtonClick("button1")}>Desktop</button>
                <button className={`button1 ${activeBtn=== "button2"? "active-btn": ""}` } onClick={handleButtonClick("button2")}>Tablet</button>
                <button className={`button1 ${activeBtn=== "button3"? "active-btn": ""}` } onClick={handleButtonClick("button3")}>Mobile</button>
            </div>
        </div>
    </div>
  )
}

export default ChallengeDisplay