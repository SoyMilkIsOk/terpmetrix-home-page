import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: false,
    errorMessage: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      ...formStatus,
      loading: true
    });
    
    // Netlify form submission
    try {
      const formBody = new URLSearchParams();
      Object.keys(formData).forEach(key => {
        formBody.append(key, formData[key]);
      });
      formBody.append('form-name', 'contact');
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });
      
      if (response.ok) {
        setFormStatus({
          submitted: true,
          loading: false,
          error: false,
          errorMessage: ''
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus({
        submitted: false,
        loading: false,
        error: true,
        errorMessage: 'There was a problem submitting your form. Please try again later.'
      });
    }
  };
  
  const resetForm = () => {
    setFormStatus({
      submitted: false,
      loading: false,
      error: false,
      errorMessage: ''
    });
  };

  return (
    <Layout pageTitle="Contact Us - Terpmetrix">
      <Header />
      
      <section className="page-hero">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Contact Us</h1>
              <p className="lead">Get in touch with our team to learn more about our products and services</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <p className="lead">
                  Have questions about our products, technology, or how we can help your business? 
                  Reach out to us and our team will be happy to assist you.
                </p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info">
                      <h3>Visit Us</h3>
                      <p>Boulder, CO</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <div className="icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info">
                      <h3>Call Us</h3>
                      <p>
                        <a href="tel:+3015254028">(301) 525-4028</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <div className="icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info">
                      <h3>Email Us</h3>
                      <p>
                        <a href="mailto:inbox@terpmetrix.com">inbox@terpmetrix.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links">
                  <h3>Connect With Us</h3>
                  <div className="social-icons">
                    <a href="https://twitter.com/terpmetrix" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://facebook.com/terpmetrix" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://instagram.com/terpmetrix" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com/company/terpmetrix" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-7" data-aos="fade-left">
              <div className="contact-form-container">
                {!formStatus.submitted ? (
                  <>
                    {/* Hidden Netlify form for bot detection - netlify needs this to identify the form */}
                    {/* Hidden Netlify form for bot detection - netlify needs this to identify the form */}
                    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
                      <input type="text" name="name" />
                      <input type="email" name="email" />
                      <input type="tel" name="phone" />
                      <input type="text" name="company" />
                      <input type="text" name="subject" />
                      <textarea name="message"></textarea>
                      <input name="bot-field" />
                      <input type="hidden" name="form-name" value="contact" />
                    </form>
                    
                    <form 
                      onSubmit={handleSubmit} 
                      className="contact-form" 
                      name="contact" 
                      method="post"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <div hidden>
                        <input name="bot-field" />
                      </div>
                      
                      <h2>Send Us a Message</h2>
                      
                      {formStatus.error && (
                        <div className="error-message">
                          <p>{formStatus.errorMessage}</p>
                        </div>
                      )}
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Name*</label>
                            <input 
                              type="text" 
                              id="name"
                              name="name"
                              className="form-control" 
                              required
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <input 
                              type="email" 
                              id="email"
                              name="email"
                              className="form-control" 
                              required
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                              type="tel" 
                              id="phone"
                              name="phone"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input 
                              type="text" 
                              id="company"
                              name="company"
                              className="form-control"
                              value={formData.company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject">Subject*</label>
                        <input 
                          type="text" 
                          id="subject"
                          name="subject"
                          className="form-control" 
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="message">Message*</label>
                        <textarea 
                          id="message"
                          name="message"
                          className="form-control" 
                          rows="6" 
                          required
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg"
                        disabled={formStatus.loading}
                      >
                        {formStatus.loading ? (
                          <span>
                            <i className="fas fa-spinner fa-spin"></i> Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="success-message">
                    <div className="success-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h2>Thank You!</h2>
                    <p>Your message has been sent successfully. We&apos;ll get back to you as soon as possible.</p>
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={resetForm}
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section" data-aos="fade-up">
        <div className="container-fluid p-0">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97767.33201232801!2d-105.23990249999999!3d40.02566354999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b8d4e278dafd3%3A0xc8393b7ca01b8058!2sBoulder%2C%20CO!5e0!3m2!1sen!2sus!4v1741428187252!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Terpmetrix Location Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <style jsx>{`
        .page-hero {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 120px 0 80px;
          margin-bottom: 0px;
        }
        
        .page-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          padding-top: 60px;
        }
        
        .page-hero .lead {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .contact-section {
          padding-bottom: 80px;
        }
        
        .contact-info h2,
        .contact-form h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--dark-color);
        }
        
        .contact-info .lead {
          color: #666;
          margin-bottom: 30px;
        }
        
        .contact-methods {
          margin-top: 40px;
        }
        
        .contact-method {
          display: flex;
          margin-bottom: 30px;
        }
        
        .contact-method .icon {
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 50%;
          background-color: rgba(58,158,66,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          color: var(--primary-color);
          font-size: 24px;
          transition: all 0.3s;
        }
        
        .contact-method:hover .icon {
          background-color: var(--primary-color);
          color: white;
          transform: scale(1.1);
        }
        
        .contact-method .info h3 {
          font-size: 18px;
          margin-bottom: 5px;
          color: var(--dark-color);
        }
        
        .contact-method .info p {
          margin-bottom: 0;
          color: #666;
        }
        
        .contact-method .info a {
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .contact-method .info a:hover {
          color: var(--primary-color);
        }
        
        .social-links {
          margin-top: 40px;
        }
        
        .social-links h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: var(--dark-color);
        }
        
        .social-icons {
          display: flex;
        }
        
        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #f5f5f5;
          border-radius: 50%;
          margin-right: 15px;
          color: #555;
          text-decoration: none;
          font-size: 18px;
          transition: all 0.3s;
        }
        
        .social-icons a:hover {
          background-color: var(--primary-color);
          color: white;
          transform: translateY(-5px);
        }
        
        .contact-form-container {
          background-color: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }
        
        .form-control {
          height: 50px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          padding: 10px 15px;
          width: 100%;
          font-size: 1rem;
          transition: all 0.3s;
        }
        
        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(58,158,66,0.25);
          outline: none;
        }
        
        textarea.form-control {
          height: auto;
        }
        
        .error-message {
          background-color: #fff8f8;
          border-left: 4px solid #e74c3c;
          padding: 12px 15px;
          margin-bottom: 25px;
          border-radius: 4px;
        }
        
        .error-message p {
          color: #e74c3c;
          margin: 0;
        }
        
        .success-message {
          text-align: center;
          padding: 40px 20px;
        }
        
        .success-icon {
          font-size: 70px;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .success-message h2 {
          font-size: 2rem;
          margin-bottom: 15px;
        }
        
        .success-message p {
          color: #666;
          margin-bottom: 25px;
          font-size: 1.1rem;
        }
        
        .map-section {
          margin-bottom: -7px;
        }
        
        .map-container {
          position: relative;
          height: 450px;
          overflow: hidden;
        }
        
        @media (max-width: 991px) {
          .contact-info {
            margin-bottom: 50px;
          }
          
          .contact-form-container {
            padding: 30px;
          }
        }
        
        @media (max-width: 768px) {
          .page-hero {
            padding: 100px 0 60px;
            margin-bottom: 20px;
          }
          
          .page-hero h1 {
            font-size: 2.5rem;
            padding-top: 40px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Contact;