import React from 'react'
import './Features.css'
import feature1 from '../../../Assets/Images/feature1.png'
import feature2 from '../../../Assets/Images/feature2.png'



const Features = () => {
  return (
    <div className="features">

        <h1>Features</h1>
        <div className="features-container">
            <div className="feature-box1 feature-box">

              <div className='feature-img'>
                <img src={feature1} alt="feature1" />
              </div>
              
              
              <div className="feature-box1-description description">
                <h1>Practice with Figma Files</h1>
                <p>Improve your frontend skills by practicing with Figma files. Replicate designs to refine your techniques and gain experience.</p>
              </div>
            </div>

            <div className="feature-box2 feature-box">

              <div className='feature-img'>
                <img src={feature2} alt="feature1" />
              </div>
              
              <div className="feature-box2-description description">
                <h1>Detailed Design Components</h1>
                <p>Explore detailed designs for elements like headers and footers, perfect for focused practice.</p>
              </div>
            </div>

        </div>

        <hr />
    </div>
  )
}

export default Features