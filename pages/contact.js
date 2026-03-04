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
    
    try {
      const formBody = new URLSearchParams();
      Object.keys(formData).forEach(key => {
        formBody.append(key, formData[key]);
      });
      formBody.append('form-name', 'contact');
      
      const response = await fetch('/forms.html', {
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
        <div className="hero-glow"></div>
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
                <p className="lead-text">
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
                
                <div className="social-section">
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
                        className="btn btn-primary btn-lg submit-btn"
                        disabled={formStatus.loading}
                      >
                        {formStatus.loading ? (
                          <span>
                            <i className="fas fa-spinner fa-spin"></i> Sending...
                          </span>
                        ) : (
                          <>Send Message <i className="fas fa-paper-plane"></i></>
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
                      className="btn btn-glass-outline"
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
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }} 
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
          background: var(--dark-surface);
          color: white;
          padding: 160px 0 80px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--dark-border);
        }

        .hero-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .page-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-hero .lead {
          font-size: 1.15rem;
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-family: var(--font-body);
        }
        
        .contact-section {
          background: var(--dark-bg);
          padding-bottom: 80px;
        }
        
        .contact-info h2,
        .contact-form h2 {
          font-size: 1.75rem;
          margin-bottom: 20px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }
        
        .lead-text {
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-family: var(--font-body);
          line-height: 1.7;
        }
        
        .contact-methods {
          margin-top: 36px;
        }
        
        .contact-method {
          display: flex;
          margin-bottom: 24px;
          padding: 12px;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .contact-method:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .contact-method .icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 12px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 18px;
          color: var(--primary);
          font-size: 20px;
          transition: all 0.3s;
        }
        
        .contact-method:hover .icon {
          background: var(--primary);
          color: white;
          transform: scale(1.05);
        }
        
        .contact-method .info h3 {
          font-size: 16px;
          margin-bottom: 4px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }
        
        .contact-method .info p {
          margin-bottom: 0;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
        }
        
        .contact-method .info a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s;
          font-family: var(--font-body);
        }
        
        .contact-method .info a:hover {
          color: var(--primary);
        }
        
        .social-section {
          margin-top: 36px;
        }
        
        .social-section h3 {
          font-size: 16px;
          margin-bottom: 14px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }
        
        .social-icons {
          display: flex;
          gap: 10px;
        }
        
        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--dark-border);
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        .social-icons a:hover {
          background: var(--primary-glow);
          border-color: rgba(16, 185, 129, 0.3);
          color: var(--primary);
          transform: translateY(-3px);
        }
        
        .contact-form-container {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 36px;
        }
        
        .form-group {
          margin-bottom: 22px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
        }
        
        .form-control {
          height: 48px;
          border: 1px solid var(--dark-border);
          border-radius: 8px;
          padding: 10px 16px;
          width: 100%;
          font-size: 15px;
          transition: all 0.3s;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          font-family: var(--font-body);
        }
        
        .form-control:focus {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 0 0 3px var(--primary-glow);
          outline: none;
          background: rgba(255, 255, 255, 0.06);
        }

        .form-control::placeholder {
          color: var(--text-muted);
        }
        
        textarea.form-control {
          height: auto;
          resize: vertical;
        }
        
        .submit-btn {
          width: 100%;
          padding: 14px;
          font-weight: 600;
          font-size: 15px;
          border-radius: 10px;
          font-family: var(--font-body);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn i {
          font-size: 13px;
        }
        
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border-left: 3px solid #EF4444;
          padding: 12px 16px;
          margin-bottom: 24px;
          border-radius: 8px;
        }
        
        .error-message p {
          color: #EF4444;
          margin: 0;
          font-family: var(--font-body);
          font-size: 14px;
        }
        
        .success-message {
          text-align: center;
          padding: 50px 20px;
        }
        
        .success-icon {
          font-size: 70px;
          color: var(--primary);
          margin-bottom: 24px;
        }
        
        .success-message h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          font-family: var(--font-heading);
        }
        
        .success-message p {
          color: var(--text-secondary);
          margin-bottom: 28px;
          font-size: 1rem;
          font-family: var(--font-body);
        }

        .btn-glass-outline {
          padding: 12px 28px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
          border-radius: 10px;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-glass-outline:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .map-section {
          margin-bottom: -7px;
          border-top: 1px solid var(--dark-border);
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
            padding: 28px;
          }
        }
        
        @media (max-width: 768px) {
          .page-hero {
            padding: 130px 0 60px;
          }
          
          .page-hero h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Contact;