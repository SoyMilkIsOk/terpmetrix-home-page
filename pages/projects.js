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
        "TerpScoops are the ultimate precision tool for dosing and packing cannabis. Designed for connoisseurs and detail-oriented consumers, it ensures a clean, consistent experience every time. Its ergonomic design and durable acrylic construction make it a must-have accessory for modern cannabis users.",
      features: [
        "Ergonomic and stylish design",
        "Compact size fits in most grinders",
        "Made from durable injection-molded acrylic",
        "Available in eight vibrant colors",
        "Perfectly measures 'one terp' for consistent dosing",
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
        "TerpFocus is a premier cannabis photography service dedicated to capturing the essence of high-quality flower, concentrates, and cannabis culture. Our expert photographers use cutting-edge macro photography techniques to showcase products with stunning detail and clarity.",
      features: [
        "High-resolution macro and lifestyle cannabis photography",
        "Professional lighting and editing for premium visuals",
        "Custom shoots for brands, dispensaries, and processors",
        "Fast turnaround and cloud delivery",
        "Available for product, marketing, and event photography",
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
        "TerpForge is a cannabis-focused web development and digital branding agency, helping dispensaries, brands, and tech startups build high-performance websites. We specialize in e-commerce, SEO optimization, and seamless user experiences tailored to the cannabis industry.",
      features: [
        "Custom-built websites optimized for cannabis businesses",
        "SEO and performance-driven design",
        "E-commerce solutions with compliance in mind",
        "Integrated branding, UI/UX, and conversion optimization",
        "Ongoing support and maintenance plans",
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
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>What We Do</h1>
              <p className="lead">
                Explore our innovative cannabis technology solutions
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
                {/* Image - Will show after title on mobile */}
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

                {/* Content */}
                <div className="col-lg-6">
                  <div className="project-content">
                    <p className="project-description">{project.description}</p>

                    <div className="project-features">
                      <h3>Key Features</h3>
                      <ul>
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="button-container">
                      <a
                        href={project.link}
                        className="custom-project-button btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.link_text}
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Ready to Transform Your Cannabis Operations?</h2>
              <p>
                Contact us today to learn how our technology can help optimize
                your cultivation, processing, and product development.
              </p>
              <Link href="/contact" passHref>
                <button className="btn btn-primary custom-contact-button">
                  <p>Contact Us</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .custom-contact-button {
          padding: 15px 40px;
          font-size: 1.2rem;
          border-radius: 8px;
          font-weight: 800;
          transition: all 0.3s ease;
          text-align: center;
          background-color: var(--primary-color);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .custom-contact-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        /* Remove the padding from the paragraph */
        .custom-contact-button p {
          padding: 0;
          margin-top: 30px;
        }
        .custom-project-button {
          padding: 15px 40px !important;
          font-size: 1.2rem !important;
          border-radius: 8px !important;
          font-weight: 800 !important;
          transition: all 0.3s ease !important;
          min-width: 200px !important;
          text-align: center !important;
          display: inline-block;
          text-decoration: none;
        }

        .custom-project-button:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .btn-primary {
          background-color: var(--primary-color);
          color: white;
        }

        .btn-light {
          background-color: white;
          color: var(--primary-color);
        }
        .page-hero {
          background: linear-gradient(
            135deg,
            var(--primary-color) 0%,
            var(--secondary-color) 100%
          );
          color: white;
          padding: 120px 0 80px;
          margin-bottom: 0px;
        }

        .page-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          padding-top: 60px;
        }

        .page-hero .lead {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .projects-section {
          padding: 60px 0 80px;
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
          margin-bottom: 25px;
        }

        .project-content-wrapper {
          display: flex;
          flex-wrap: wrap;
        }

        .project-content {
          padding: 30px;
        }

        .project-status {
          display: inline-block;
          background-color: var(--accent-color);
          color: var(--light-color);
          font-weight: 600;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 20px;
          margin-bottom: 15px;
        }

        .project-header h2 {
          font-size: 32px;
          margin-bottom: 10px;
          color: var(--dark-color);
        }

        .project-description {
          color: #666;
          margin-bottom: 25px;
        }

        .project-features {
          background-color: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .project-features h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: var(--dark-color);
        }

        .project-features ul {
          padding-left: 25px;
          margin-bottom: 0;
        }

        .project-features li {
          margin-bottom: 10px;
          color: #555;
        }

        .project-features li:last-child {
          margin-bottom: 0;
        }

        .project-image {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.5s ease;
        }

        .project-image:hover {
          transform: translateY(-10px);
        }

        .project-image-wrapper {
          margin-bottom: 25px;
        }

        .cta-section {
          background: linear-gradient(
            135deg,
            var(--primary-color) 0%,
            var(--secondary-color) 100%
          );
          color: white;
          padding: 80px 0;
          overflow: hidden;
          z-index: 0; /* Added z-index */
        }

        .cta-section:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          z-index: 0; /* Added z-index */
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .cta-section p {
          font-size: 1.1rem;
          margin-bottom: 30px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          width: 100%;
        }

        @media (min-width: 992px) {
          .project-content {
            padding: 30px;
          }

          .project-image-wrapper {
            margin-bottom: 0;
          }

          .project-content:before {
            content: "";
            display: block;
          }

          .project-content .project-status {
            display: inline-block;
          }

          .project-content h2 {
            display: block;
          }
        }

        @media (max-width: 991px) {
          .project-header {
            text-align: center;
            margin-bottom: 20px;
          }

          .project-content {
            padding: 20px 0 0;
          }

          .project-content .project-status,
          .project-content h2 {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 100px 0 60px;
            margin-bottom: 20px;
          }

          .page-hero h1 {
            font-size: 2.5rem;
          }

          .project-item {
            margin-bottom: 70px;
          }

          .cta-section {
            padding: 60px 0;
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .project-header h2 {
            font-size: 28px;
          }

          .projects-section {
            padding: 40px 0 60px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Projects;
