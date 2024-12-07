import React from 'react'
import './CompetitionStructure.css'
import CompetitionDisplay from '../CompetitionDisplay/CompetitionDisplay'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const CompetitionStructure = () => {
    return (
        <div className="CompetitionStructure">
            <Navbar />
            <CompetitionDisplay />
            <Footer />
        </div>
    )
}

export default CompetitionStructure