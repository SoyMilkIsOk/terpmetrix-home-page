import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import Image from 'next/image';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <Layout pageTitle="About Us - Terpmetrix">
      <Header />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>About Terpmetrix</h1>
              <p className="lead">
                Our mission is to bring science and technology together to
                elevate the cannabis industry
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-content">
                <h2>Our Story</h2>
                <p>
                Terpmetrix was founded in 2023 on the belief that cannabis deserves 
                better tools. What started as a personal solution - designing the
                Terpscoop to make dosing and handling cannabis more 
                precise - quickly evolved into a brand focused on innovation, 
                functionality, and improving the user experience. Sam, the 
                founder, transitioned from skepticism about cannabis to a 
                deep appreciation for its potential, fueling his drive to 
                create thoughtful, high-quality products.
                </p>
                <p>
                Today, Terpmetrix is dedicated to bridging the gap between 
                tradition and technology in the cannabis space. From ergonomic 
                tools to future-forward solutions, the company is committed to
                enhancing product consistency, usability, and transparency. With 
                an emphasis on smart design and practical innovation, Terpmetrix 
                continues to push the industry forward - one solution at a time.
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-image">
                <Image
                  width={1000}
                  height={500}
                  src="/images/about-story.jpeg"
                  alt="Terpmetrix Story"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-8 text-center">
              <h2 className="section-heading">Our Values</h2>
              <p className="section-subheading">
                These core principles guide everything we do at Terpmetrix.
              </p>
            </div>
          </div>

          <div className="values-grid mt-5">
            {[
              { icon: "fas fa-flask", title: "Scientific Integrity", desc: "We're committed to rigorous science and data accuracy. All our products undergo extensive testing and validation before reaching our customers." },
              { icon: "fas fa-lightbulb", title: "Innovation", desc: "We continuously push the boundaries of what's possible in cannabis technology, investing heavily in research and development." },
              { icon: "fas fa-users", title: "Accessibility", desc: "We believe advanced cannabis science should be accessible to everyone, from large producers to individual consumers." },
              { icon: "fas fa-leaf", title: "Sustainability", desc: "We're committed to environmentally responsible practices in our operations and product development." },
              { icon: "fas fa-shield-alt", title: "Trust & Transparency", desc: "We're open about our methods, data handling, and results, fostering trust with our partners and customers." },
              { icon: "fas fa-handshake", title: "Collaboration", desc: "We work closely with industry partners, researchers, and customers to develop solutions that meet real-world needs." },
            ].map((value, index) => (
              <div
                className="value-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
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

        .about-section {
          background: var(--dark-bg);
          padding-bottom: 40px;
        }

        .about-content h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .about-content p {
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-size: 1rem;
          line-height: 1.8;
          font-family: var(--font-body);
        }

        .about-image {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--dark-border);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .values-section {
          background: var(--dark-surface);
          padding: 80px 0;
        }

        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 1.1rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .value-card {
          background: var(--dark-surface-2);
          border: 1px solid var(--dark-border);
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .value-card:hover {
          transform: translateY(-6px);
          border-color: rgba(16, 185, 129, 0.15);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px var(--primary-glow);
        }

        .value-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          color: var(--primary);
          font-size: 22px;
          transition: all 0.3s;
        }

        .value-card:hover .value-icon {
          background: var(--primary);
          color: white;
          transform: scale(1.05);
        }

        .value-card h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .value-card p {
          color: var(--text-secondary);
          margin-bottom: 0;
          font-size: 14px;
          line-height: 1.7;
          font-family: var(--font-body);
        }

        @media (max-width: 991px) {
          .about-content {
            margin-bottom: 40px;
          }

          .about-content h2 {
            font-size: 2rem;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
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

        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
};

export default About;
