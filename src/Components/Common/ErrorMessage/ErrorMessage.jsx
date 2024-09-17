import React from 'react'
import './ErrorMessage.css'


const ErrorMessage = ({heading, description}) => {
  return (
    <div className="ErrorMessage">
        <div className="errorMessage-container">
            <h1>{heading}</h1>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default ErrorMessage