import React from 'react'
import './Dashboard.css'
import Sidebar from '../../Components/Common/Sidebar/Sidebar'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Footer from '../../Components/Common/Footer/Footer'
import DashboardMain from '../../Components/Common/DashboardMain/DashboardMain'
// import ExploreChallenges from '../../Components/Common/ExploreChallenges/ExploreChallenges'
// import MyContributionGraph from '../../Components/Common/ContributonGraph/MyContributionGraph'
import NewChallenges from '../../Components/Common/NewChallenges/NewChallenges'


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Navbar />
      <div className="dashboard-home">
        <Sidebar />
        <div className="dashboard-content">
          <DashboardMain  />
          <NewChallenges dashboardTitle={"dashboardTitle"}/>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Dashboard