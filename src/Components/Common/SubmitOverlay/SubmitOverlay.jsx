import React from 'react'
import './SubmitOverlay.css'

const SubmitOverlay = () => {
  return (
    <div className="SubmitOverlay">
        <div className="overlay-content">
            <h2>Submit Solution</h2>
            <div className="overlay-repo-url">
                <p>Repository Url</p>
                <input type="text" className='overlay-input repo-url' placeholder='Github repository url' />
            </div>

            <div className="github-live-url">
                <p>Live site Url</p>
                <input type="text" className='overlay-input live-url' placeholder='Github Live site url' />
            </div>

            <div className="overlay-buttons">
                <button className="overlay-submit">Submit</button>
                <button className="overlay-cancel">Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default SubmitOverlay