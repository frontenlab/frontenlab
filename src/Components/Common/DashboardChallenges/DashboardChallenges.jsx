import React from 'react'
import './DashboardChallenges.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ChallengeStructure from '../Challenge/ChallengeStructure'
import AllChallengesContent from '../../../Helpers/AllChallengesContent'


const DashboardChallenges = ({category}) => {
  const filteredChallenges = AllChallengesContent.filter(challenge => challenge.category === category);
  return (
    <div className="DashboardChallenges">
        <Navbar />
        <div className='dashboardChallenges-container'>
          <Sidebar />
          <div className="dashboardChallenges-challenge-content">
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className="dashboardChallenges-challenge-container">
                {filteredChallenges.map((challenge, index)=> {
                  return <ChallengeStructure key={challenge.id} id={challenge.id} imgDesktop={challenge.imgDesktop} imgTablet={challenge.imgTablet} imgMobile={challenge.imgMobile} title={challenge.title} description={challenge.description} category={challenge.category} />
                })}

              
            </div>
          </div>
          
          
        </div>
        <Footer />
    </div>
  )
}

export default DashboardChallenges