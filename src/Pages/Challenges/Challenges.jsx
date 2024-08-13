import React from 'react'
import './Challenges.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import AllChallenges from '../../Components/Common/AllChallenges/AllChallenges'
import Footer from '../../Components/Common/Footer/Footer'


const Challenges = () => {
  return (
    <div className="Challenges">
      <Navbar />
      <AllChallenges />
      <Footer />
    </div>
  )
}

export default Challenges