import React from 'react'
import './Dashboard.css'
import Sidebar from '../../Components/Common/Sidebar/Sidebar'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Footer from '../../Components/Common/Footer/Footer'

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Navbar />
      <Sidebar />
      <Footer />
    </div>
  )
}

export default Dashboard