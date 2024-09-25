import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';
import contact from '../../Assets/Images/contact.png';
import Navbar from '../../Components/Common/Navbar/Navbar';
import Footer from '../../Components/Common/Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_770n1d8';
    const templateId = 'template_27rznor';
    const publicKey = 'dkYzPUX7dZduOvSve';

    const templateParams = {
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Message sent successfully!'); 
        scrollToTop();
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast.error('Failed to send message. Please try again.'); 
        scrollToTop();
      });
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="Contact">
      <Navbar />
      <div className="contact-container">
        <div className="contact-content">
          <h1>We’re Just a Click Away</h1>
          <form onSubmit={handleSubmit}>
            <div className="contact-email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                className="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
                
            <div className="contact-inputBox">
              <p>Message</p>
              <textarea
                name="message"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-img">
          <img src={contact} alt="contact-img" />
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container */}
    </div>
  );
};

export default Contact;
