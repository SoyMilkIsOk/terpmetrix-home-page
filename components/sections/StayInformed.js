import { useState } from 'react';

const StayInformed = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission to Netlify
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setEmail('');
    }, 1500);
  };
  
  return (
    <section className="stay-informed-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="info-content">
              <h2 className="section-heading">Stay Informed</h2>
              <p className="lead">
                Join our newsletter to receive the latest updates on our technology, 
                products, and innovations in the cannabis industry.
              </p>
              
              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Product Announcements</h4>
                    <p>Be the first to know about new products and features.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Research Insights</h4>
                    <p>Get access to our latest findings and industry research.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Event Invitations</h4>
                    <p>Exclusive invitations to webinars and industry events.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div className="newsletter-wrapper">
              <div className="newsletter-image-container">
                <img src="/images/newsletter-img.jpg" alt="Stay Informed" className="newsletter-image" />
              </div>
              <div className="newsletter-form-container">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="newsletter-form" data-netlify="true" name="newsletter">
                    <h3>Subscribe to Our Newsletter</h3>
                    <p>No spam, just the latest releases and tips, interesting articles, and exclusive interviews in your inbox.</p>
                    
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>
                          <i className="fas fa-spinner fa-spin"></i> Subscribing...
                        </span>
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                    
                    <div className="form-check mt-3">
                      <input className="form-check-input" type="checkbox" id="privacyCheck" required />
                      <label className="form-check-label" htmlFor="privacyCheck">
                        I agree to the <a href="/privacy">privacy policy</a>
                      </label>
                    </div>
                  </form>
                ) : (
                  <div className="success-message">
                    <div className="success-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You!</h3>
                    <p>You've successfully subscribed to our newsletter.</p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setSubmitted(false)}
                    >
                      Subscribe Another Email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .stay-informed-section {
          background-color: #f9f9f9;
          position: relative;
          overflow: hidden;
        }
        
        .stay-informed-section:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(58,158,66,0.1) 0%, rgba(58,158,66,0) 70%);
          border-radius: 50%;
          z-index: 1;
        }
        
        .lead {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: #555;
        }
        
        .features {
          margin-top: 40px;
        }
        
        .feature-item {
          display: flex;
          margin-bottom: 25px;
        }
        
        .feature-icon {
          width: 50px;
          height: 50px;
          min-width: 50px;
          border-radius: 50%;
          background-color: rgba(58,158,66,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          color: var(--primary-color);
          font-size: 20px;
          transition: all 0.3s;
        }
        
        .feature-item:hover .feature-icon {
          background-color: var(--primary-color);
          color: white;
          transform: scale(1.1);
        }
        
        .feature-text h4 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        
        .feature-text p {
          color: #666;
          margin-bottom: 0;
        }
        
        .newsletter-wrapper {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .newsletter-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .newsletter-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .newsletter-wrapper:hover .newsletter-image {
          transform: scale(1.1);
        }
        
        .newsletter-form-container {
          background-color: white;
          padding: 30px;
        }
        
        .newsletter-form h3 {
          font-size: 22px;
          margin-bottom: 15px;
        }
        
        .newsletter-form p {
          color: #666;
          margin-bottom: 20px;
        }
        
        .form-control {
          height: 50px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        
        .form-check-label {
          font-size: 14px;
          color: #666;
        }
        
        .form-check-label a {
          color: var(--primary-color);
          text-decoration: none;
        }
        
        .success-message {
          text-align: center;
          padding: 30px 20px;
        }
        
        .success-icon {
          font-size: 60px;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .success-message h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }
        
        .success-message p {
          color: #666;
          margin-bottom: 20px;
        }
        
        @media (max-width: 991px) {
          .info-content {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default StayInformed;