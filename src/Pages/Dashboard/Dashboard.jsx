
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../../Components/Common/Sidebar/Sidebar';
import Navbar from '../../Components/Common/Navbar/Navbar';
import Footer from '../../Components/Common/Footer/Footer';
import DashboardMain from '../../Components/Common/DashboardMain/DashboardMain';
import NewChallenges from '../../Components/Common/NewChallenges/NewChallenges';


const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(true); // State for sidebar toggle
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 590); // State for screen size

  // Effect to update screen size on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 590); // Update state if width is <= 590px
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Dashboard">
      <Navbar />
      <div className="dashboard-home">
        {/* Pass state and setter function to Sidebar */}
        <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />
        
        {/* Apply class conditionally based on sidebarActive and screen size */}
        <div className={`dashboard-content ${(sidebarActive && isMobileView) ? 'hide-content' : ''}`}>
          <DashboardMain />
          <NewChallenges dashboardTitle={"dashboardTitle"} />
        </div>
        <div className='footer-space'></div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
