import React from 'react'
import './Competition.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import CompetitionContent from '../../Components/Common/CompetitionContent/CompetitionContent'
import Footer from '../../Components/Common/Footer/Footer'

const Competition = () => {
  return (
    <div className="Competition">
        <Navbar />
        <CompetitionContent />
        <Footer />
    </div>
  )
}

export default Competition