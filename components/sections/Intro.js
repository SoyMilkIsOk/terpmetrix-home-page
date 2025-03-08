import Link from 'next/link';
import Image from 'next/image';

const Intro = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="intro-content">
              <h1>Pioneering the Future of Cannabis Technology</h1>
              <p className="lead">
                At Terpmetrix, we&apos;re revolutionizing the cannabis industry through cutting-edge technology, 
                data analytics, and innovative product development.
              </p>
              <div className="intro-buttons">
                <Link href="/projects" className="btn btn-primary btn-lg">
                  Explore Our Projects
                </Link>
                <Link href="/contact" className="btn btn-outline-dark btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div className="intro-image">
              <Image width={1000} height={500} src="/images/hero-image.jpg" alt="Cannabis Technology" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .intro-section {
          padding: 180px 0 100px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,255,240,0.9) 100%);
        }
        
        .intro-section:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/pattern-bg.svg');
          background-size: cover;
          opacity: 0.05;
          z-index: -1;
        }
        
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 25px;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .lead {
          font-size: 1.25rem;
          margin-bottom: 30px;
          color: #555;
        }
        
        .intro-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn-outline-dark {
          transition: all var(--transition-speed);
        }
        
        .btn-outline-dark:hover {
          background-color: var(--dark-color);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .intro-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          transition: transform 0.5s ease;
        }
        
        .intro-image:hover {
          transform: translateY(-10px);
        }
        
        .intro-image:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom right, rgba(58,158,66,0.2), rgba(248,181,0,0.2));
          pointer-events: none;
        }
        
        @media (max-width: 991px) {
          .intro-section {
            padding: 150px 0 80px;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          .intro-content {
            margin-bottom: 40px;
            text-align: center;
          }
          
          .intro-buttons {
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          h1 {
            font-size: 2rem;
          }
          
          .intro-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Intro;