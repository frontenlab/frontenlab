import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Challenges from './Pages/Challenges/Challenges'
import About from './Pages/About/About'
import Dashboard from './Pages/Dashboard/Dashboard'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import Profile from './Pages/Profile/Profile'
import Challenge from './Components/Common/Challenge/Challenge'



const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/challenges' element={<Challenges />}> 
          <Route path=':challengeId' element={<Challenge />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/my' element={<Dashboard />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
