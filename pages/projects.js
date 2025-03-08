import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import Image from 'next/image';

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const projects = [
    {
      id: "terpene-analysis",
      title: "Terpene Analysis Kit",
      description:
        "Our portable analysis kit allows growers and processors to quickly test and analyze terpene profiles on-site with laboratory-grade accuracy. The kit uses advanced spectroscopy and machine learning to deliver results in minutes, not days.",
      features: [
        "Portable and rugged design for field use",
        "Results in under 5 minutes",
        "Cloud sync with TerpTracker™ software",
        "95% accuracy compared to lab tests",
        "Rechargeable battery with 8-hour life",
      ],
      image: "/images/product-1-large.jpg",
      status: "Available Now",
    },
    {
      id: "terptracker",
      title: "TerpTracker™ Software",
      description:
        "Cloud-based software solution for tracking, analyzing, and optimizing terpene profiles throughout the cultivation and processing lifecycle. This platform helps growers understand the factors affecting terpene development and make data-driven decisions.",
      features: [
        "Real-time dashboards and analytics",
        "Environmental correlation analysis",
        "Strain profile library and comparison tools",
        "Harvest optimization recommendations",
        "API integration with existing systems",
      ],
      image: "/images/product-2-large.jpg",
      status: "Available Now",
    },
    {
      id: "consumer-app",
      title: "Consumer App",
      description:
        "Our mobile application helps consumers find products with specific terpene profiles matching their desired effects and preferences. The app connects consumers with products that are scientifically matched to their needs.",
      features: [
        "Personalized product recommendations",
        "Effect-based search and filtering",
        "Integrated review system",
        "Product scanner with terpene information",
        "Consumption journal and tracking",
      ],
      image: "/images/product-3-large.jpg",
      status: "Coming Spring 2025",
    },
  ];

  return (
    <Layout pageTitle="Our Projects - Terpmetrix">
      <Header />

      <section className="page-hero">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Our Projects</h1>
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
              <div
                className={`row align-items-center ${
                  index % 2 !== 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="col-lg-6">
                  <div className="project-content">
                    <div className="project-status">{project.status}</div>
                    <h2>{project.title}</h2>
                    <p className="project-description">{project.description}</p>

                    <div className="project-features">
                      <h3>Key Features</h3>
                      <ul>
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/contact" className="btn btn-primary">
                      Request Information
                    </Link>
                  </div>
                </div>

                <div className="col-lg-6">
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
              <Link href="/contact" className="btn btn-light btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
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
          padding-bottom: 80px;
        }

        .project-item {
          margin-bottom: 100px;
          scroll-margin-top: 100px;
        }

        .project-item:last-child {
          margin-bottom: 0;
        }

        .project-content {
          padding: 30px;
        }

        .project-status {
          display: inline-block;
          background-color: var(--accent-color);
          color: var(--dark-color);
          font-weight: 600;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 20px;
          margin-bottom: 15px;
        }

        .project-content h2 {
          font-size: 32px;
          margin-bottom: 20px;
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

        .cta-section {
          background: linear-gradient(
            135deg,
            var(--primary-color) 0%,
            var(--secondary-color) 100%
          );
          color: white;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-section:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
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

        .cta-section .btn {
          position: relative;
        }

        @media (max-width: 991px) {
          .project-content {
            margin-bottom: 40px;
            padding: 0;
          }

          .row.flex-row-reverse .project-content {
            margin-top: 40px;
            margin-bottom: 0;
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
        }
      `}</style>
    </Layout>
  );
};

export default Projects;
