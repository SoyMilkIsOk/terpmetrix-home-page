import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';

const Products = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <Layout pageTitle="Our Products - Terpmetrix">
      <Header />
      
      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Our Products</h1>
              <p className="lead">Explore our innovative cannabis technology solutions</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="coming-soon-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <div className="coming-soon-content">
                <div className="icon-wrapper">
                  <i className="fas fa-tools"></i>
                </div>
                <h2>Complete Product Information Coming Soon</h2>
                <p>We&apos;re currently updating our product information. In the meantime, you can explore our projects or contact us for specific information.</p>
                <div className="buttons">
                  <Link href="/projects" className="btn btn-primary btn-lg">
                    View Projects
                  </Link>
                  <Link href="/contact" className="btn btn-glass btn-lg">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
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
        
        .coming-soon-section {
          background: var(--dark-bg);
          padding-bottom: 120px;
        }
        
        .coming-soon-content {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 60px;
          text-align: center;
        }
        
        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          font-size: 32px;
          color: var(--primary);
          transition: all 0.3s;
        }

        .coming-soon-content:hover .icon-wrapper {
          background: var(--primary);
          color: #fff;
          transform: scale(1.05);
        }
        
        .coming-soon-content h2 {
          font-size: 2rem;
          margin-bottom: 18px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }
        
        .coming-soon-content p {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 1.05rem;
          font-family: var(--font-body);
          line-height: 1.7;
        }
        
        .buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .buttons :global(.btn-primary) {
          padding: 14px 32px;
          font-weight: 600;
          border-radius: 10px;
          font-family: var(--font-body);
        }

        .buttons :global(.btn-glass) {
          padding: 14px 32px;
          font-weight: 600;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-family: var(--font-body);
          transition: all 0.3s;
          text-decoration: none;
        }

        .buttons :global(.btn-glass:hover) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          color: #fff;
        }
        
        @media (max-width: 768px) {
          .page-hero {
            padding: 130px 0 60px;
          }
          
          .page-hero h1 {
            font-size: 2.25rem;
          }
          
          .coming-soon-content {
            padding: 40px 24px;
          }
          
          .coming-soon-content h2 {
            font-size: 1.5rem;
          }
          
          .buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Products;