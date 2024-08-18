import React from 'react'
import './DashboardMain.css'
import { IoMdArrowForward } from "react-icons/io";

const DashboardMain = () => {
  return (
    <div className="DashboardMain">
        <div className="dashboardMain-box ongoing-box">
            <h3>Ongoing Challenges</h3>
            <h2>8</h2>
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon'/>
            </div>
        </div>

        <div className="dashboardMain-box completed-box">
            <h3>Completed Challenges</h3>
            <h2>2</h2>
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon'/>
            </div>
        </div>

        <div className="dashboardMain-box total-box">
            <h3>Total Challenges</h3>
            <h2>32</h2>
            <div className="dashboardMain-line"></div>
            <div className="dashboardMain-details">
                <p>View details</p>
                <IoMdArrowForward className='dashboardMain-arrow-icon'/>
            </div>
        </div>

        
    </div>
  )
}

export default DashboardMain