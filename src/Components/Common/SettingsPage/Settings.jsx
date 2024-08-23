import React from 'react'
import './Settings.css'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import SettingsContent from '../SettingsContent/SettingsContent'

const Settings = () => {
  return (
    <div className="Settings">
      <Navbar />
      <div className="settings-container">
        <Sidebar />
        <div className="settings-content">
          <SettingsContent />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings