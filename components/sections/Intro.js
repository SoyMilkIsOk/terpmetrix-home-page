import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Intro = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="intro-section" ref={sectionRef}>
      {/* Animated background orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Glowing Grid with Gravity Well */}
      <div 
        className="grid-wrapper"
        style={{
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`
        }}
      >
        <div className="grid-bg"></div>
        <div className="mouse-glow"></div>
      </div>
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="intro-content">
              <div className="badge-tag">Cannabis Technology Platform</div>
              <h1>Advancing Cannabis Through Innovation & Technology</h1>
              <p className="lead">
                Terpmetrix builds purpose-driven tools, services, and digital solutions that elevate the cannabis experience, 
                from precision accessories to professional-grade photography and industry-focused web development.
              </p>
              <div className="intro-buttons">
                <Link href="/projects" className="btn btn-primary btn-lg">
                  Explore Our Projects
                </Link>
                <Link href="/contact" className="btn btn-glass btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              className="intro-image"
              style={{
                "--scroll-y": scrollY,
                "--glow-opacity": Math.min(0.7, 0.15 + scrollY * 0.0015),
                "--glow-spread": `${40 + scrollY * 0.2}px`,
              }}
            >
              <Image width={1000} height={500} src="/images/hero.png" alt="Cannabis Technology" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .intro-section {
          padding: 180px 0 120px;
          position: relative;
          overflow: hidden;
          background: var(--dark-bg);
        }
        
        /* Animated gradient orbs */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 400px;
          height: 400px;
          background: var(--primary-glow-strong);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(59, 130, 246, 0.12);
          bottom: -50px;
          left: -80px;
          animation-delay: -3s;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(16, 185, 129, 0.08);
          top: 50%;
          left: 50%;
          animation-delay: -5s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Grid Background with Gravity Well Effect */
        .grid-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(
            circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 0, 0, 1) 0%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 0, 0, 1) 0%,
            transparent 100%
          );
        }

        .mouse-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(16, 185, 129, 0.08) 0%,
            transparent 100%
          );
        }

        
        .badge-tag {
          display: inline-block;
          padding: 6px 16px;
          background: var(--primary-glow);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 50px;
          color: var(--primary);
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-body);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, #ffffff 0%, #10B981 50%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .lead {
          font-size: 1.15rem;
          margin-bottom: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          font-family: var(--font-body);
        }
        
        .intro-buttons {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }
        
        .intro-buttons :global(.btn-primary) {
          padding: 14px 32px;
          font-weight: 600;
          font-family: var(--font-body);
          border-radius: 10px;
          box-shadow: 0 4px 20px var(--primary-glow-strong);
        }

        .intro-buttons :global(.btn-glass) {
          padding: 14px 32px;
          font-weight: 600;
          font-family: var(--font-body);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .intro-buttons :global(.btn-glass:hover) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          color: #fff;
        }
        
        .intro-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--dark-border);
          transform: translateY(calc(var(--scroll-y, 0) * 0.014px));
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 var(--glow-spread, 40px) rgba(16, 185, 129, var(--glow-opacity, 0.15));
          transition: transform 0.2s cubic-bezier(0.1, 0, 0.1, 1), box-shadow 0.2s cubic-bezier(0.1, 0, 0.1, 1);
          will-change: transform, box-shadow;
        }
        
        .intro-image:hover {
          transform: translateY(calc((var(--scroll-y, 0) * 0.014px) - 8px));
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 calc(var(--glow-spread, 40px) + 20px) rgba(16, 185, 129, calc(var(--glow-opacity, 0.15) + 0.2));
        }
        
        @media (max-width: 991px) {
          .intro-section {
            padding: 150px 0 80px;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          .intro-content {
            margin-bottom: 50px;
            text-align: center;
          }

          .badge-tag {
            margin-left: auto;
            margin-right: auto;
          }
          
          .intro-buttons {
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          h1 {
            font-size: 2rem;
          }

          .intro-section {
            padding: 130px 0 60px;
          }
          
          .intro-buttons {
            flex-direction: column;
            align-items: center;
          }

          .intro-buttons :global(.btn) {
            width: auto;
            min-width: 220px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Intro;