import React from 'react'
import './Profile.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Footer from '../../Components/Common/Footer/Footer'
import ProfileContent from '../../Components/Common/ProfileContent/ProfileContent'

const Profile = () => {
  return (
    <div className="Profile">
      <Navbar />
      <div className="Profile-container">
        <ProfileContent />
      </div>
      <Footer />
      
    </div>
  )
}

export default Profile