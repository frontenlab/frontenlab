import React from 'react'
import './Contact.css'
import contact from '../../Assets/Images/contact.png'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Footer from '../../Components/Common/Footer/Footer'

const Contact = () => {
  return (
    <div className="Contact">
    <Navbar />
        <div className="contact-container">
            <div className="contact-content">
                <h1>We’re Just a Click Away</h1>
                <div className="contact-email">
                    <p>Email</p>
                    <input type="email" className="email" placeholder='Your email address' />
                </div>
                    
                <div className="contact-inputBox">
                    <p>Message</p>
                    <textarea type="text" placeholder='Write your message' />
                </div>

                <button>Submit</button>

            </div>

            <div className="contact-img">
                <img src={contact} alt="contact-img" />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact