import React from 'react'
import './Home.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Homepage from '../../Components/Common/Homepage/Homepage'
import Features from '../../Components/Common/Features/Features'
import NewChallenge from '../../Components/Common/NewChallenges/NewChallenges'
import Competition from '../../Components/Common/Competition/Competition'
import HIW from '../../Components/Common/HIW/HIW'
import FAQ from '../../Components/Common/FAQ/FAQ'
import Cta from '../../Components/Common/CTA/Cta'
import Footer from '../../Components/Common/Footer/Footer'

const Home = () => {



  return (
    <div className="Home">
      <Navbar />
      <Homepage />
      <Features />
      <NewChallenge />
      <Competition />
      <HIW />
      <FAQ />
      <Cta /> 
      <Footer />
    </div>
  )
}

export default Home