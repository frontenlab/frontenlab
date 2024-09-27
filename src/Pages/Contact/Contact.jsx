import React from 'react';
import './Contact.css';
import contact from '../../Assets/Images/contact.png';
import Navbar from '../../Components/Common/Navbar/Navbar';
import Footer from '../../Components/Common/Footer/Footer';

const Contact = () => {


  return (
    <div className="Contact">
      <Navbar />
      <div className="contact-container">
        <div className="contact-content">
          <h1>Need Help? We're Here for You!</h1>
          <p>If you have any questions or need assistance, please don't hesitate to reach out to us at <span className='accent-color'>support@frontenlab.com</span>. We are ready to help you with any queries you may have!</p>
        </div>

        <div className="contact-img">
          <img src={contact} alt="contact-img" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
