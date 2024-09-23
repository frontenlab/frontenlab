import React from 'react'
import './DashboardChallenges.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import useChallenges from '../../../Helpers/fetchChallenges'
import { PuffLoader } from 'react-spinners'


const DashboardChallenges = ({category}) => {

  const {challenges, loading, error} = useChallenges();
  const filteredChallenges = challenges.filter(challenge => challenge.category === category);

  if(loading){
    return (
        <div className="spinner-container">
            <PuffLoader color="#5055b8" size={60} />
        </div>
    )
}

  if(error) return <p>Error : {error}</p>
  
  return (
    <div className="DashboardChallenges">
        <Navbar />
        <div className='dashboardChallenges-container'>
          <Sidebar />
          <div className="dashboardChallenges-challenge-content">
            <h1>{category.split('-').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')}</h1>
            <div className="dashboardChallenges-challenge-container">
                {filteredChallenges.map((challenge, index)=> {
                  return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.template_img} imgTablet={challenge.tablets_img} imgMobile={challenge.mobile_img} title={challenge.title} description={challenge.description} difficulty={challenge.difficulty} />
                })}

              
            </div>
          </div>
          
          
        </div>
        <Footer />
    </div>
  )
}

export default DashboardChallenges