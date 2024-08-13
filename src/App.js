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


const App = () => {
  return (

      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/challenges' element={<Challenges />} /> 
          <Route path='/challenge' element={<Challenge />}> 
            <Route path=':challengeId' element={<Challenge />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/my' element={<Dashboard />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
