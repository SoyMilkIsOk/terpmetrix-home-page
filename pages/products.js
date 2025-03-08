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
                <div className="icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h2>Complete Product Information Coming Soon</h2>
                <p>We're currently updating our product information. In the meantime, you can explore our projects or contact us for specific information.</p>
                <div className="buttons">
                  <Link href="/projects" className="btn btn-primary btn-lg">
                    View Projects
                  </Link>
                  <Link href="/contact" className="btn btn-outline-dark btn-lg">
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
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 120px 0 80px;
          margin-bottom: 80px;
        }
        
        .page-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
        }
        
        .page-hero .lead {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .coming-soon-section {
          padding-bottom: 120px;
        }
        
        .coming-soon-content {
          background-color: white;
          border-radius: 10px;
          padding: 60px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        .coming-soon-content .icon {
          font-size: 80px;
          color: var(--primary-color);
          margin-bottom: 30px;
        }
        
        .coming-soon-content h2 {
          font-size: 2.2rem;
          margin-bottom: 20px;
          color: var(--dark-color);
        }
        
        .coming-soon-content p {
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }
        
        .buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
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
        
        @media (max-width: 768px) {
          .page-hero {
            padding: 100px 0 60px;
            margin-bottom: 20px;
          }
          
          .page-hero h1 {
            font-size: 2.5rem;
          }
          
          .coming-soon-content {
            padding: 40px 20px;
          }
          
          .coming-soon-content h2 {
            font-size: 1.8rem;
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