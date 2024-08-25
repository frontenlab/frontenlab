import React from 'react'
import './ChallengeDisplay.css'
import { useState, useEffect } from 'react';
import SubmitOverlay from '../SubmitOverlay/SubmitOverlay';

const ChallengeDisplay = (props) => {

    const [activeBtn, setActiveBtn] = useState("button1");
    const [imgUrl, setImgUrl] = useState(props.currentChallenge.imgDesktop);
    const [overlayActive, setOverlayActive] = useState(false);

    const handleSubmitSolutionClick = () => {
        setOverlayActive(!overlayActive);
    }

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

    useEffect(()=>{
        if(overlayActive) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    },[overlayActive]);

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

        <div className="challengeDisplay-content">
            <div className="challengeDisplay-content-box1 ">
                <div className="challengeDisplay-challengeDescription contentBox">
                    <h1>Description</h1>
                    <p>Craft an easy-level homepage showcasing buttons and images. Design a clean layout that incorporates buttons for navigation or calls to action, along with relevant images to enhance visual appeal.</p>
                    <button>Start</button>
                </div>  

                <div className="challengeDisplay-assets contentBox">
                    <h1>Assets Provided</h1>
                    <ul>
                        <li>Figma file</li>
                        <li>PNG format designs</li>
                        <li>Style guide with color and font details</li>
                        <li>Style guide with color and font details</li>
                        <li>Required Images</li>
                    </ul>
                </div>
            </div>

            <div className="challengeDisplay-content-box2">
                <h1>Submit Solution</h1>
                <p>Craft an easy-level homepage showcasing buttons and images. Design a clean layout that incorporates buttons for navigation or calls to action, along with relevant images to enhance visual appeal.</p>
                <button onClick={handleSubmitSolutionClick}>Submit Solution</button>
            </div>
            {overlayActive && <SubmitOverlay overlayActive={overlayActive} setOverlayActive={setOverlayActive} />}
        </div>

    </div>
  )
}

export default ChallengeDisplay