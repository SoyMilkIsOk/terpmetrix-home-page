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
    ]
  };
  
  return (
    <section className="projects-timeline-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="section-heading">Milestones & Roadmap</h2>
            <p className="section-subheading">
              Key milestones in Terpmetrix's growth, from founding through product launches and ongoing development.
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
                      <div className="timeline-dot"></div>
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
            <Link href="/projects" className="btn btn-primary btn-lg">
              Full Project History
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .projects-timeline-section {
          background-color: #fff;
          position: relative;
        }
        
        .section-subheading {
          max-width: 700px;
          margin: 0 auto;
          color: #666;
        }
        
        .timeline-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        
        .timeline-tab {
          background: none;
          border: none;
          font-size: 18px;
          font-weight: 600;
          color: #777;
          padding: 10px 20px;
          margin: 0 10px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
        }
        
        .timeline-tab:after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: var(--primary-color);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .timeline-tab.active {
          color: var(--primary-color);
        }
        
        .timeline-tab.active:after,
        .timeline-tab:hover:after {
          transform: scaleX(1);
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
        }
        
        .timeline-item {
          position: relative;
          padding-left: 50px;
          margin-bottom: 50px;
        }
        
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        
        .timeline-dot {
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 20px;
          background-color: var(--primary-color);
          border-radius: 50%;
          z-index: 2;
        }
        
        .timeline-item:after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          width: 2px;
          height: calc(100% + 40px);
          background-color: #e9e9e9;
          z-index: 1;
        }
        
        .timeline-item:last-child:after {
          display: none;
        }
        
        .timeline-date {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 10px;
        }
        
        .timeline-content-box {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        
        .timeline-content-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .timeline-content-box h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: var(--dark-color);
        }
        
        .timeline-content-box p {
          color: #666;
          margin-bottom: 0;
        }
        
        @media (max-width: 768px) {
          .timeline-tab {
            font-size: 16px;
            padding: 8px 15px;
            margin: 0 5px;
          }
        }
        
        @media (max-width: 576px) {
          .timeline-tabs {
            flex-wrap: wrap;
          }
          
          .timeline-tab {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsTimeline;