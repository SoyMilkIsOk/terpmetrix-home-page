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
                Pioneering the future of cannabis technology with innovative
                solutions for growers, processors, and consumers.
              </p>
              <div className="social-links mt-4">
                <a
                  href="https://twitter.com/terpmetrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://facebook.com/terpmetrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://instagram.com/terpmetrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://linkedin.com/company/terpmetrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-5">
            <div className="footer-widget">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="https://terpscoops.com">Shop</Link>{" "}
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
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
          background-color: #1a1a1a;
          color: #f5f5f5;
          padding: 80px 0 30px;
          position: relative;
          font-family: var(--font-family);
        }

        .footer-widget {
          height: 100%;
        }

        .logo-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary-color);
          padding: 2px;
          transition: transform 0.3s ease;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-right: 10px;
        }

        .footer-info span {
          margin-left: 8px;
          letter-spacing: 0.5px;
          line-height: 50px; /* Match the height of the logo to center text vertically */
          height: 50px;
          font-weight: 700;
        }

        .footer-logo:hover {
          color: var(--primary-color);
        }

        .footer-logo:hover .logo-circle {
          transform: rotate(10deg);
        }

        .footer-info p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 16px;
        }

        .social-links a:hover {
          background-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 25px;
          position: relative;
          padding-bottom: 12px;
          color: #fff;
        }

        h4:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 35px;
          height: 3px;
          background-color: var(--primary-color);
          border-radius: 3px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
          position: relative;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
          font-weight: 400;
        }

        .footer-links a:hover {
          color: var(--primary-color);
          transform: translateX(8px);
        }

        .contact-item {
          display: flex;
          margin-bottom: 18px;
          align-items: flex-start;
        }

        .contact-item i {
          margin-right: 15px;
          color: var(--primary-color);
          font-size: 16px;
          padding-top: 3px;
        }

        .contact-item span,
        .contact-item a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s;
          font-size: 15px;
          line-height: 1.5;
        }

        .contact-item a:hover {
          color: var(--primary-color);
        }

        .footer-widget p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
          font-size: 15px;
          line-height: 1.6;
        }

        .newsletter-form {
          position: relative;
          margin-top: 20px;
        }

        .input-group {
          position: relative;
          z-index: 0;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: none;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 14px;
          transition: all 0.3s ease;
          z-index: 0;
        }

        .form-control:focus {
          background-color: rgba(255, 255, 255, 0.15);
          outline: none;
          box-shadow: 0 0 0 3px rgba(58, 158, 66, 0.3);
        }

        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .input-group-append {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }

        .btn-submit {
          background-color: var(--primary-color);
          border: none;
          height: 36px;
          width: 36px;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .btn-submit:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
        }

        .footer-bottom {
          margin-top: 20px;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--primary-color);
        }

        @media (max-width: 991px) {
          .footer-widget {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 60px 0 20px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .footer-bottom-links {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .footer-logo span {
            font-size: 20px;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
