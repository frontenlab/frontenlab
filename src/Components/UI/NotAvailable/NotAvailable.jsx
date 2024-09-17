import React from 'react'
import notAvailable from '../../../Assets/Images/not-available.png'
import './NotAvailable.css'


const NotAvailable = ({description}) => {
  return (
    <div className="notAvailable-info">
        <div className="notAvailable-info-img">
            <img src={notAvailable} alt="not-available img" />
        </div>
        <p>{description}</p>
    </div>
  )
}

export default NotAvailable