import React from 'react'
import './Home.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Homepage from '../../Components/Common/Homepage/Homepage'
import Features from '../../Components/Common/Features/Features'

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Homepage />
      <Features />
    </div>
  )
}

export default Home