import React from 'react'
import './Features.css'
import feature1 from '../../../Assets/Images/feature1.png'
import feature2 from '../../../Assets/Images/feature2.png'
import feature3 from '../../../Assets/Images/feature3.png'
import feature4 from '../../../Assets/Images/feature4.png'


const Features = () => {
  return (
    <div className="features">

        <h1>Features</h1>
        <div className="features-container">
            <div className="feature-box1 box">
                <img className='feature' src={feature1} alt="feature1" />
            </div>

            <div className="feature-box2 box">
                <img className='feature' src={feature2} alt="feature2" />
            </div>

            <div className="feature-box3 box">
                <img className='feature' src={feature3} alt="feature3" />
            </div>

            <div className="feature-box4 box">
                <img className='feature' src={feature4} alt="feature4" />
            </div>

        </div>

        <hr />
    </div>
  )
}

export default Features