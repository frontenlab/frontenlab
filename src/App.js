import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Challenges from './Pages/Challenges/Challenges'
import About from './Pages/About/About'
import Dashboard from './Pages/Dashboard/Dashboard'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import Profile from './Pages/Profile/Profile'
import Terms from './Pages/Terms/Terms';
import Privacy from './Pages/Privacy/Privacy';
import Contact from './Pages/Contact/Contact';
import Challenge from './Pages/Challenge';
import ScrollToTop from './Helpers/ScrollToTop';
import DashboardChallenges from './Components/Common/DashboardChallenges/DashboardChallenges';
import Settings from './Components/Common/SettingsPage/Settings';
import Competition from './Pages/Competition/Competition';
import WeeklyCompetition from './Pages/WeeklyCompetition';
import ProtectedRoute from './Helpers/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (

      <BrowserRouter>
      <ScrollToTop /> 
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/challenges/navbar' element={<DashboardChallenges category="navbar" />} ></Route>
          <Route path='/challenges/footer' element={<DashboardChallenges category="footer"/>} ></Route>
          <Route path='/challenges/landingpage' element={<DashboardChallenges category="landing-page"/>} ></Route>
          <Route path='/challenges/hero' element={<DashboardChallenges category="hero"/>} ></Route>
          <Route path='/challenges/features' element={<DashboardChallenges category="features"/>} ></Route>
          <Route path='/challenge' element={<Challenge />}> 
            <Route path=':challengeId' element={<Challenge />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route element = {<ProtectedRoute />}>
            <Route path='/my' element={<Dashboard />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/competitions' element={<Competition />} />
          <Route path='/competitions' element={<WeeklyCompetition />}>
            <Route path=':competitionName' element={<WeeklyCompetition />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
  )
}

export default App
