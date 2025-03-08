import Link from 'next/link';
import { useState } from 'react';

const ProjectsTimeline = () => {
  const [activeTab, setActiveTab] = useState(2023);
  
  const timelineData = {
    2022: [
      { 
        id: 1, 
        title: "Company Founding", 
        date: "February 2022", 
        description: "Terpmetrix was founded with a mission to bring advanced technology to the cannabis industry." 
      },
      { 
        id: 2, 
        title: "Seed Funding", 
        date: "May 2022", 
        description: "Successfully secured $1.5M in seed funding to develop our initial prototypes." 
      },
      { 
        id: 3, 
        title: "R&D Team Formation", 
        date: "August 2022", 
        description: "Assembled a team of scientists and engineers to begin product development." 
      }
    ],
    2023: [
      { 
        id: 1, 
        title: "Prototype Development", 
        date: "January 2023", 
        description: "First prototype of our Terpene Analysis Kit completed and tested with select partners." 
      },
      { 
        id: 2, 
        title: "TerpTracker™ Alpha", 
        date: "April 2023", 
        description: "Alpha version of our software platform launched with key cultivation partners." 
      },
      { 
        id: 3, 
        title: "Series A Funding", 
        date: "July 2023", 
        description: "Raised $5M in Series A funding to scale operations and accelerate product development."
      },
      { 
        id: 4, 
        title: "Beta Testing Program", 
        date: "October 2023", 
        description: "Launched beta testing program with 20 licensed cannabis producers across three states." 
      }
    ],
    2024: [
      { 
        id: 1, 
        title: "Product Launch", 
        date: "March 2024", 
        description: "Official launch of Terpene Analysis Kit and TerpTracker™ Software at CannaTech 2024." 
      },
      { 
        id: 2, 
        title: "Consumer App Development", 
        date: "June 2024", 
        description: "Started development of our consumer-facing mobile application." 
      },
      { 
        id: 3, 
        title: "Expansion to Canada", 
        date: "September 2024", 
        description: "Expanded operations to the Canadian market with key distribution partnerships." 
      }
    ],
    2025: [
      { 
        id: 1, 
        title: "Consumer App Launch", 
        date: "January 2025", 
        description: "Launch of our consumer mobile application for iOS and Android." 
      },
      { 
        id: 2, 
        title: "International Expansion", 
        date: "Current", 
        description: "Exploring partnerships in European markets with focus on Germany and Portugal." 
      },
      { 
        id: 3, 
        title: "Next Generation R&D", 
        date: "Ongoing", 
        description: "Research and development for next generation of terpene analysis technology." 
      }
    ]
  };
  
  return (
    <section className="projects-timeline-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="section-heading">Our Journey</h2>
            <p className="section-subheading">
              Tracking our progress from concept to market-leading cannabis technology solutions.
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