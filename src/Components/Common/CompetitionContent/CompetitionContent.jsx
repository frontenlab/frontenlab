import React from 'react'
import './CompetitionContent.css'
import { IoMdArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'



const CompetitionContent = () => {
  return (
    <div className="CompetitionContent">
        <div className="competitionContent-main">
            <div className="competitionContent-description">
                <h1>Frontenlab's Weekly Competition</h1>
                <p>Bored of completing challenges alone? Join the competition, earn points, and stand a chance to win exciting swags. Compete, code, and claim your spot on the leaderboard!</p>
            </div>
        </div>

        <hr />

        
        <h1 className="competitonContent-heading">Upcoming Competitions</h1>

        <div className="competitionContent-competition-box">
            <div className='competitionContent-competition-box-top'>
                <div className='competition-name'>
                    <div className='competition-no'>1</div>
                    <h3>Week 1 Competition</h3>
                </div>
                <p>Lets build an E-commerce this week.</p>
                <div className="competition-line"></div>
            </div>
            
            
            <div className="competitionContent-competition-box-bottom">
                <p>Starts in sunday 8 a.m</p>
                <Link to={`/competitions/Week1`}><IoMdArrowForward className='competition-arrow-icon'/></Link>
            </div>
        </div> 
        
        
    </div>
    )
}

export default CompetitionContent