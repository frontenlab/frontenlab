import React from 'react'
import './Settings.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'


const Settings = () => {
  return (
    <div className="Settings">
      <Navbar />
      <div className="settings-container">
        <Sidebar />
        <div className="settings-content">
          <h1>Settings</h1>
          
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings