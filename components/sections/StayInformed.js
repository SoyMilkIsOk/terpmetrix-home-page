import { useState } from "react";

const StayInformed = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('email', email);
      formBody.append('form-name', 'newsletter');
      
      const response = await fetch('/forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });
      
      if (response.ok) {
        setSubmitted(true);
        setLoading(false);
        setEmail("");
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="stay-informed-section">
      {/* Background glow */}
      <div className="bg-glow"></div>
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="info-content">
              <h2 className="section-heading">Stay in the Loop</h2>
              <p className="lead">
                Get the latest on new products, project launches, and insights from the Terpmetrix team, delivered straight to your inbox.
              </p>

              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Product Drops & Updates</h4>
                    <p>Be the first to hear about new launches and feature releases.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Industry Insights</h4>
                    <p>
                      Curated news and perspectives from across the cannabis technology space.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Events & Community</h4>
                    <p>
                      Invitations to events, pop-ups, and early-access opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div className="newsletter-wrapper">
              <div className="newsletter-form-container">
                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="newsletter-form"
                    data-netlify="true"
                    name="newsletter"
                  >
                    <input type="hidden" name="form-name" value="newsletter" />
                    <div hidden>
                      <input name="bot-field" />
                    </div>
                    <div className="form-header">
                      <div className="form-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <h3>Subscribe to Our Newsletter</h3>
                    </div>
                    <p>
                      No spam, just the latest releases and tips, interesting
                      articles, and exclusive interviews in your inbox.
                    </p>

                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>
                          <i className="fas fa-spinner fa-spin"></i>{" "}
                          Subscribing...
                        </span>
                      ) : (
                        <>Subscribe Now <i className="fas fa-arrow-right"></i></>
                      )}
                    </button>

                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="privacyCheck"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="privacyCheck"
                      >
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
                    <p>
                      You&apos;ve successfully subscribed to our newsletter.
                    </p>
                    <button
                      className="btn btn-glass-outline"
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
          background-color: var(--dark-surface);
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          top: 50%;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translateY(-50%);
        }

        .lead {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: var(--text-secondary);
          font-family: var(--font-body);
          line-height: 1.7;
        }

        .features {
          margin-top: 40px;
        }

        .feature-item {
          display: flex;
          margin-bottom: 24px;
          padding: 12px;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 12px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 18px;
          color: var(--primary);
          font-size: 18px;
          transition: all 0.3s;
        }

        .feature-item:hover .feature-icon {
          background: var(--primary);
          color: white;
          transform: scale(1.05);
        }

        .feature-text h4 {
          font-size: 16px;
          margin-bottom: 6px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .feature-text h4:after {
          display: none;
        }

        .feature-text p {
          color: var(--text-secondary);
          margin-bottom: 0;
          font-size: 14px;
          line-height: 1.6;
          font-family: var(--font-body);
        }

        .newsletter-wrapper {
          position: relative;
          z-index: 2;
        }

        .newsletter-form-container {
          background: var(--dark-surface-2);
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 36px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        .form-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 18px;
        }

        .newsletter-form h3 {
          font-size: 20px;
          margin-bottom: 0;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .newsletter-form p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 14px;
          line-height: 1.6;
          font-family: var(--font-body);
        }

        .form-control {
          height: 52px;
          margin-bottom: 16px;
          border: 1px solid var(--dark-border);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          font-size: 15px;
          padding: 0 16px;
          font-family: var(--font-body);
          transition: all 0.3s;
          width: 100%;
        }

        .form-control:focus {
          background: rgba(255, 255, 255, 0.06);
          outline: none;
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-control::placeholder {
          color: var(--text-muted);
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
          gap: 8px;
        }

        .submit-btn i {
          font-size: 12px;
          transition: transform 0.3s;
        }

        .submit-btn:hover i {
          transform: translateX(4px);
        }

        .form-check-input {
          height: 18px;
          width: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--dark-border);
          border-radius: 4px;
          cursor: pointer;
        }

        .form-check-input:checked {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .form-check-label {
          margin-left: 10px;
          font-size: 13px;
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        .form-check-label a {
          color: var(--primary);
          text-decoration: none;
        }

        .success-message {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 60px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .success-message h3 {
          font-size: 22px;
          margin-bottom: 12px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .success-message p {
          color: var(--text-secondary);
          margin-bottom: 24px;
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
