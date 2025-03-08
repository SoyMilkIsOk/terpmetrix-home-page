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

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Founder & CEO",
      bio: "Ph.D. in Biochemistry with 15+ years of experience in plant science and cannabis research.",
      image: "/images/team-1.jpg",
    },
    {
      name: "Michael Rodriguez",
      position: "CTO",
      bio: "Former tech lead at a major analytics company with expertise in machine learning and spectroscopy.",
      image: "/images/team-2.jpg",
    },
    {
      name: "Jennifer Chen",
      position: "Head of Product",
      bio: "Background in product development for agricultural technology and user experience design.",
      image: "/images/team-3.jpg",
    },
    {
      name: "David Wilson",
      position: "Lead Scientist",
      bio: "Specializes in terpene analysis and extraction methods with multiple published studies.",
      image: "/images/team-4.jpg",
    },
  ];

  return (
    <Layout pageTitle="About Us - Terpmetrix">
      <Header />

      <section className="page-hero">
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
                  Terpmetrix was founded in 2022 by a team of scientists,
                  engineers, and cannabis enthusiasts who recognized a gap in
                  the industry: while THC and CBD content were being analyzed
                  and optimized, the crucial role of terpenes in the cannabis
                  experience was being overlooked.
                </p>
                <p>
                  Our founder, Dr. Sarah Johnson, spent years researching the
                  chemical compounds in cannabis and their effects. She
                  assembled a diverse team of experts to develop technology that
                  would make terpene analysis accessible, affordable, and
                  actionable for everyone in the cannabis ecosystem.
                </p>
                <p>
                  Today, Terpmetrix is at the forefront of cannabis technology,
                  providing innovative solutions that help growers, processors,
                  retailers, and consumers understand and harness the power of
                  terpenes for better products and experiences.
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-image">
                <Image
                  src="/images/about-story.jpg"
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

          <div className="row mt-5">
            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-flask"></i>
                </div>
                <h3>Scientific Integrity</h3>
                <p>
                  We&apos;re committed to rigorous science and data accuracy. All our
                  products undergo extensive testing and validation before
                  reaching our customers.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Innovation</h3>
                <p>
                  We continuously push the boundaries of what&apos;s possible in
                  cannabis technology, investing heavily in research and
                  development.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Accessibility</h3>
                <p>
                  We believe advanced cannabis science should be accessible to
                  everyone, from large producers to individual consumers.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <h3>Sustainability</h3>
                <p>
                  We&apos;re committed to environmentally responsible practices in
                  our operations and product development.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Trust & Transparency</h3>
                <p>
                  We&apos;re open about our methods, data handling, and results,
                  fostering trust with our partners and customers.
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Collaboration</h3>
                <p>
                  We work closely with industry partners, researchers, and
                  customers to develop solutions that meet real-world needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-8 text-center">
              <h2 className="section-heading">Meet Our Team</h2>
              <p className="section-subheading">
                The passionate experts driving innovation at Terpmetrix.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            {teamMembers.map((member, index) => (
              <div
                className="col-lg-3 col-md-6 mb-4"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="team-card">
                  <div className="team-image">
                    <Image src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.position}</p>
                    <p className="bio">{member.bio}</p>
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="social-link">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-4">
            <div className="col-12 text-center" data-aos="fade-up">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Join Our Team
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
          padding-top: 60px;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .page-hero .lead {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .about-section {
          padding-bottom: 40px;
        }

        .about-content h2 {
          font-size: 2.5rem;
          margin-bottom: 25px;
          color: var(--dark-color);
        }

        .about-content p {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .about-image {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .values-section {
          background-color: #f9f9f9;
          padding: 40px 0;
        }

        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: #666;
        }

        .value-card {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          height: 100%;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .value-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: rgba(58, 158, 66, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--primary-color);
          font-size: 28px;
          transition: all 0.3s;
        }

        .value-card:hover .value-icon {
          background-color: var(--primary-color);
          color: white;
          transform: scale(1.1);
        }

        .value-card h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: var(--dark-color);
        }

        .value-card p {
          color: #666;
          margin-bottom: 0;
        }

        .team-section {
          padding: 40px 0;
        }

        .team-card {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .team-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .team-card:hover .team-image img {
          transform: scale(1.1);
        }

        .team-info {
          padding: 25px;
        }

        .team-info h3 {
          font-size: 20px;
          margin-bottom: 5px;
          color: var(--dark-color);
        }

        .team-info .position {
          color: var(--primary-color);
          font-weight: 600;
          margin-bottom: 15px;
        }

        .team-info .bio {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .social-links {
          display: flex;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: #f5f5f5;
          border-radius: 50%;
          margin-right: 10px;
          color: #555;
          text-decoration: none;
          transition: all 0.3s;
        }

        .social-link:hover {
          background-color: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }

        @media (max-width: 991px) {
          .about-content {
            margin-bottom: 40px;
          }

          .about-content h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 100px 0 60px;
            margin-bottom: 20px;
          }

          .page-hero h1 {
            padding-top: 40px;
            font-size: 2.5rem;
          }

          .values-section,
          .team-section {
            padding: 60px 0;
          }
        }
      `}</style>
    </Layout>
  );
};

export default About;
