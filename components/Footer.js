import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-5">
            <div className="footer-info">
              <Link href="/" className="footer-logo" passHref>
                <Image
                  width={50}
                  height={50}
                  className="logo-circle"
                  src="/images/logo-circle.png"
                  alt="Terpmetrix Logo"
                />
                <span>TERPMETRIX</span>
              </Link>
              <p className="mt-4">
                Building smarter tools and services for the modern cannabis industry, from precision accessories to professional digital solutions.
              </p>
              <div className="social-links mt-4">
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

          <div className="col-lg-2 col-md-6 mb-5">
            <div className="footer-widget">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="https://terpscoops.com">Shop</Link>{" "}</li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <div className="footer-widget">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Boulder, CO</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:inbox@terpmetrix.com">inbox@terpmetrix.com</a>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <a href="tel:+3015250428">(301) 525-4028</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <div className="footer-widget">
              <h4>Newsletter</h4>
              <p>Stay updated with our latest news and announcements</p>
              <form className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn-submit">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Terpmetrix. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #08080D;
          color: var(--text-secondary);
          padding: 80px 0 30px;
          position: relative;
          font-family: var(--font-body);
          border-top: 1px solid var(--dark-border);
        }

        .footer-widget {
          height: 100%;
        }

        .logo-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary);
          padding: 2px;
          transition: transform 0.3s ease;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--font-heading);
          letter-spacing: 1.5px;
        }

        .footer-info span {
          margin-left: 10px;
          line-height: 44px;
          height: 44px;
          font-weight: 700;
        }

        .footer-logo:hover {
          color: var(--primary);
        }

        .footer-logo:hover .logo-circle {
          transform: rotate(10deg);
        }

        .footer-info p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .social-links {
          display: flex;
          gap: 10px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--dark-border);
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s;
          font-size: 15px;
        }

        .social-links a:hover {
          background: var(--primary-glow);
          border-color: rgba(16, 185, 129, 0.3);
          color: var(--primary);
          transform: translateY(-3px);
        }

        h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        h4:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background: var(--gradient-accent);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
          font-weight: 400;
          font-size: 14px;
          font-family: var(--font-body);
        }

        .footer-links a:hover {
          color: var(--primary);
          transform: translateX(6px);
        }

        .contact-item {
          display: flex;
          margin-bottom: 16px;
          align-items: flex-start;
        }

        .contact-item i {
          margin-right: 12px;
          color: var(--primary);
          font-size: 14px;
          padding-top: 3px;
          width: 16px;
          text-align: center;
        }

        .contact-item span,
        .contact-item a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s;
          font-size: 14px;
          line-height: 1.5;
          font-family: var(--font-body);
        }

        .contact-item a:hover {
          color: var(--primary);
        }

        .footer-widget p {
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 1.6;
          font-family: var(--font-body);
        }

        .newsletter-form {
          position: relative;
          margin-top: 16px;
        }

        .input-group {
          position: relative;
          z-index: 0;
        }

        .form-control {
          width: 100%;
          padding: 12px 50px 12px 16px;
          border: 1px solid var(--dark-border);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          font-size: 14px;
          transition: all 0.3s ease;
          z-index: 0;
          font-family: var(--font-body);
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

        .input-group-append {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .btn-submit {
          background: var(--primary);
          border: none;
          height: 34px;
          width: 34px;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          font-size: 13px;
        }

        .btn-submit:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
        }

        .footer-bottom {
          margin-top: 20px;
          padding-top: 24px;
          border-top: 1px solid var(--dark-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .copyright {
          font-size: 13px;
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 13px;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .footer-bottom-links a:hover {
          color: var(--primary);
        }

        @media (max-width: 991px) {
          .footer-widget {
            margin-bottom: 24px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 60px 0 20px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .footer-bottom-links {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .footer-logo span {
            font-size: 18px;
          }

          .social-links {
            justify-content: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
