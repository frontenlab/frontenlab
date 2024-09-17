import React from 'react'
import './ComingSoon.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const ComingSoon = () => {
  return (
    <div className="ComingSoon">
        <Navbar />
        <div className="comingSoon-container">
            <h1>Coming Soon</h1>
            <p>Something exciting is on the way! Our next big competition is <span className='colored-text'>coming soon</span>. Stay tuned for updates and get ready to put your skills to the test!</p>
        </div>
        <Footer />
    </div>
  )
}

export default ComingSoon