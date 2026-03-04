import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import Image from "next/image";

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const projects = [
    {
      id: "terpscoops",
      title: "TerpScoops",
      description:
        "TerpScoops are a precision dosing and packing accessory engineered for consistency and ease of use. With thousands of units sold, the ergonomic form factor and durable injection-molded acrylic construction deliver a clean, reliable experience, whether you're loading a bowl, packing a cone, or measuring your preferred dose. Purpose-built for consumers who value quality and intention in their cannabis ritual.",
      features: [
        "Ergonomic design for comfortable, one-handed use",
        "Compact form factor that fits inside most standard grinders",
        "Constructed from durable, injection-molded acrylic",
        "Available in eight distinct colorways",
        "Standardized 'one terp' measure for repeatable dosing",
      ],
      image: "/images/terpscoops-large.jpg",
      status: "Available Now",
      link: "https://terpscoops.com",
      link_text: "Shop Now",
    },
    {
      id: "terpfocus",
      title: "TerpFocus",
      description:
        "TerpFocus is a professional cannabis photography studio specializing in high-resolution macro and lifestyle imagery. We work with dispensaries, cultivators, processors, and brands to produce visual content that communicates product quality, brand identity, and market differentiation, from trichome-level macro detail to full campaign-ready lifestyle shoots.",
      features: [
        "High-resolution macro and lifestyle cannabis photography",
        "Studio-grade lighting, color grading, and post-production",
        "Custom sessions for brands, dispensaries, cultivators, and processors",
        "Rapid turnaround with secure cloud delivery",
        "Product, marketing, campaign, and event photography services",
      ],
      image: "/images/terpfocus-large.jpg",
      status: "Available for Booking",
      link: "https://terpfocus.com",
      link_text: "Visit Website",
    },
    {
      id: "terpforge",
      title: "TerpForge",
      description:
        "TerpForge is a cannabis-industry web development and digital branding studio. We partner with dispensaries, cultivators, ancillary brands, and cannabis tech companies to build conversion-optimized, compliant websites that perform. Our approach combines clean UI/UX design, technical SEO, and deep industry knowledge to drive real business outcomes.",
      features: [
        "Custom-built, responsive websites tailored for cannabis businesses",
        "Technical SEO strategy and performance optimization",
        "E-commerce solutions with regulatory compliance baked in",
        "End-to-end branding, UI/UX design, and conversion rate optimization",
        "Ongoing support, maintenance, and growth retainer packages",
      ],
      image: "/images/terpforge-large.jpg",
      status: "Accepting New Clients",
      link: "https://calendly.com/terps-terpmetrix/quote-call",
      link_text: "Schedule a Call",
    },
  ];

  return (
    <Layout pageTitle="Our Projects - Terpmetrix">
      <Header />

      <section className="page-hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>What We Build</h1>
              <p className="lead">
                Products and services designed for the modern cannabis industry
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          {projects.map((project, index) => (
            <div
              className="project-item"
              key={project.id}
              id={project.id}
              data-aos="fade-up"
            >
              <div className="project-header">
                <div className="project-status">{project.status}</div>
                <h2>{project.title}</h2>
              </div>

              <div
                className={`row project-content-wrapper ${
                  index % 2 !== 0 ? "flex-lg-row-reverse" : ""
                }`}
              >
                <div className="col-lg-6 project-image-wrapper">
                  <div className="project-image">
                    <Image
                      width={1000}
                      height={500}
                      src={project.image}
                      alt={project.title}
                      className="img-fluid"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="project-content">
                    <p className="project-description">{project.description}</p>

                    <div className="project-features">
                      <h3>Key Features</h3>
                      <ul>
                        {project.features.map((feature, i) => (
                          <li key={i}>
                            <i className="fas fa-check"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="button-container">
                      <a
                        href={project.link}
                        className="custom-project-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.link_text} <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Let's Build Something Together</h2>
              <p>
                Whether you need a precision tool, professional photography, or a high-performance website, we're here to help elevate your cannabis brand.
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg cta-btn">
                Contact Us
              </Link>
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

        .projects-section {
          background: var(--dark-bg);
          padding: 80px 0;
        }

        .project-item {
          margin-bottom: 100px;
          scroll-margin-top: 100px;
          position: relative;
        }

        .project-item:last-child {
          margin-bottom: 0;
        }

        .project-header {
          margin-bottom: 28px;
        }

        .project-status {
          display: inline-block;
          background: var(--primary-glow);
          color: var(--primary);
          font-weight: 600;
          font-size: 13px;
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 14px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          font-family: var(--font-body);
          letter-spacing: 0.03em;
        }

        .project-header h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: var(--text-primary);
          font-family: var(--font-heading);
        }

        .project-content {
          padding: 10px 20px;
        }

        .project-description {
          color: var(--text-secondary);
          margin-bottom: 28px;
          line-height: 1.8;
          font-family: var(--font-body);
          font-size: 15px;
        }

        .project-features {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .project-features h3 {
          font-size: 18px;
          margin-bottom: 16px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .project-features ul {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }

        .project-features li {
          margin-bottom: 10px;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .project-features li:last-child {
          margin-bottom: 0;
        }

        .project-features li i {
          color: var(--primary);
          font-size: 12px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .project-image {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--dark-border);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-image:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 30px var(--primary-glow);
        }

        .project-image-wrapper {
          margin-bottom: 24px;
        }

        .button-container {
          display: flex;
          justify-content: flex-start;
          margin-top: 20px;
        }

        .custom-project-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          font-size: 15px;
          border-radius: 10px;
          font-weight: 600;
          background: var(--primary);
          color: #fff;
          text-decoration: none;
          font-family: var(--font-body);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .custom-project-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px var(--primary-glow-strong);
          color: #fff;
        }

        .custom-project-button i {
          font-size: 12px;
          transition: transform 0.3s;
        }

        .custom-project-button:hover i {
          transform: translateX(4px);
        }

        .cta-section {
          background: var(--dark-surface);
          color: white;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--dark-border);
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }

        .cta-section p {
          font-size: 1.05rem;
          margin-bottom: 32px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          color: var(--text-secondary);
          font-family: var(--font-body);
        }

        .cta-btn {
          padding: 14px 36px;
          font-weight: 600;
          border-radius: 10px;
          font-family: var(--font-body);
        }

        @media (min-width: 992px) {
          .project-image-wrapper {
            margin-bottom: 0;
          }

          .project-content {
            padding: 10px 30px;
          }
        }

        @media (max-width: 991px) {
          .project-header {
            text-align: center;
          }

          .project-content {
            padding: 20px 0 0;
          }

          .button-container {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 130px 0 60px;
          }

          .page-hero h1 {
            font-size: 2.25rem;
          }

          .project-item {
            margin-bottom: 70px;
          }

          .cta-section {
            padding: 70px 0;
          }

          .cta-section h2 {
            font-size: 1.75rem;
          }

          .project-header h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Projects;
