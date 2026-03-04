import Link from 'next/link';
import { useState } from 'react';

const ProjectsTimeline = () => {
  const [activeTab, setActiveTab] = useState(2024);
  
  const timelineData = {
    2024: [
      { 
        id: 1, 
        title: "Company Founded", 
        date: "2024", 
        description: "Terpmetrix launched with a mission to bring terpene data and analytics to the state of Colorado, aiming to make cannabis compound information more accessible and actionable for consumers and operators alike." 
      },
      { 
        id: 2, 
        title: "TerpScoops Launched", 
        date: "2024", 
        description: "First product released: a precision dosing and packing tool, now available in eight distinct colorways." 
      }
    ],
    2025: [
      { 
        id: 1, 
        title: "TerpFocus Launched", 
        date: "2025", 
        description: "Professional cannabis photography service launched, serving dispensaries, cultivators, and brands." 
      },
      { 
        id: 2, 
        title: "TerpForge Launched", 
        date: "2025", 
        description: "Cannabis-focused web development studio opened for client projects." 
      }
    ],
    2026: [
      { 
        id: 1, 
        title: "TerpTier Launched", 
        date: "2026", 
        description: "Community-driven cannabis discovery platform launched, featuring live producer rankings, weekly drop tracking, and peer-powered strain reviews across multiple states." 
      },
      { 
        id: 2, 
        title: "More Projects Coming Soon", 
        date: "2026", 
        description: "New products and services are in active development. Stay tuned for more announcements as we continue expanding the Terpmetrix ecosystem." 
      }
    ]
  };
  
  return (
    <section className="projects-timeline-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="section-heading">Milestones & Roadmap</h2>
            <p className="section-subheading">
              Key milestones in Terpmetrix&apos;s growth, from founding through product launches and ongoing development.
            </p>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <div className="timeline-tabs" data-aos="fade-up">
              {Object.keys(timelineData).map(year => (
                <button 
                  key={year} 
                  className={`timeline-tab ${activeTab === parseInt(year) ? 'active' : ''}`}
                  onClick={() => setActiveTab(parseInt(year))}
                >
                  {year}
                </button>
              ))}
            </div>
            
            <div className="timeline-content" data-aos="fade-up" data-aos-delay="200">
              {Object.keys(timelineData).map(year => (
                <div 
                  key={year} 
                  className={`timeline-year ${activeTab === parseInt(year) ? 'active' : ''}`}
                >
                  {timelineData[year].map((item, index) => (
                    <div className="timeline-item" key={item.id}>
                      <div className="timeline-dot">
                        <div className="timeline-dot-inner"></div>
                      </div>
                      <div className="timeline-date">{item.date}</div>
                      <div className="timeline-content-box">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center" data-aos="fade-up" data-aos-delay="400">
            <Link href="/projects" className="btn btn-primary btn-lg cta-btn">
              Full Project History
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .projects-timeline-section {
          background-color: var(--dark-bg);
          position: relative;
          overflow: hidden;
        }

        .projects-timeline-section:before {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 1.1rem;
        }
        
        .timeline-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          gap: 8px;
        }
        
        .timeline-tab {
          background: var(--dark-surface-2);
          border: 1px solid var(--dark-border);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 10px 28px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: var(--font-body);
        }
        
        .timeline-tab:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .timeline-tab.active {
          background: var(--primary-glow);
          color: var(--primary);
          border-color: rgba(16, 185, 129, 0.3);
        }
        
        .timeline-content {
          position: relative;
          padding: 30px 0;
        }
        
        .timeline-year {
          display: none;
        }
        
        .timeline-year.active {
          display: block;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .timeline-item {
          position: relative;
          padding-left: 56px;
          margin-bottom: 50px;
        }
        
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        
        .timeline-dot {
          position: absolute;
          left: 0;
          top: 4px;
          width: 24px;
          height: 24px;
          background: var(--primary-glow);
          border-radius: 50%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 3s ease-in-out infinite;
        }

        .timeline-dot-inner {
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--primary-glow-strong); }
          50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        }
        
        .timeline-item:after {
          content: '';
          position: absolute;
          top: 28px;
          left: 11px;
          width: 2px;
          height: calc(100% + 22px);
          background: linear-gradient(180deg, var(--primary) 0%, rgba(59, 130, 246, 0.3) 100%);
          z-index: 1;
          border-radius: 1px;
        }
        
        .timeline-item:last-child:after {
          display: none;
        }
        
        .timeline-date {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--font-body);
        }
        
        .timeline-content-box {
          background: var(--dark-surface);
          border: 1px solid var(--dark-border);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-content-box:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px var(--primary-glow);
        }
        
        .timeline-content-box h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
        }
        
        .timeline-content-box p {
          color: var(--text-secondary);
          margin-bottom: 0;
          font-size: 14px;
          line-height: 1.7;
          font-family: var(--font-body);
        }

        .cta-btn {
          padding: 14px 36px;
          font-weight: 600;
          border-radius: 10px;
          font-family: var(--font-body);
        }
        
        @media (max-width: 768px) {
          .timeline-tab {
            font-size: 14px;
            padding: 8px 20px;
          }

          .timeline-item {
            padding-left: 44px;
          }
        }
        
        @media (max-width: 576px) {
          .timeline-tabs {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsTimeline;