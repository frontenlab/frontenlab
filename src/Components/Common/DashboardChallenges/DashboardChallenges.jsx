import React from 'react'
import './DashboardChallenges.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const DashboardChallenges = () => {
  return (
    <div className="DashboardChallenges">
        <Navbar />
        <div>
          <Sidebar />
        </div>
        <Footer />
    </div>
  )
}

export default DashboardChallenges