const MILESTONES = [
  {
    year: "2023",
    text: "Founded in Boulder, Colorado.",
  },
  {
    year: "2024",
    text: "TerpScoops launches—thousands of precision dosing tools shipped.",
  },
  {
    year: "2025",
    text: "TerpFocus and TerpForge go live.",
  },
  {
    year: "2026",
    text: "TerpTier launches multi-state while core R&D moves private.",
  },
];

const Chronology = () => {
  return (
    <section id="timeline" className="history-section">
      <div className="tmx-container">
        <div className="section-kicker">02 // TIMELINE</div>

        <div className="timeline-list">
          {MILESTONES.map((item) => (
            <div key={item.year} className="timeline-row">
              <span className="year">{item.year}</span>
              <p className="milestone-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .history-section {
          padding: 68px 0;
          border-bottom: 1px solid var(--border-line);
        }

        .section-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--text-dim);
          margin-bottom: 20px;
        }

        .timeline-list {
          border-top: 1px solid var(--border-line);
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 20px;
          align-items: baseline;
          padding: 18px 16px;
          border-bottom: 1px solid var(--border-line);
          transition: background 0.2s ease;
        }

        .timeline-row:hover {
          background: var(--bg-panel);
        }

        .year {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-white);
          letter-spacing: 0.06em;
        }

        .milestone-text {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.65;
          color: var(--text-silver);
          margin: 0;
        }

        .timeline-row:hover .milestone-text {
          color: var(--text-white);
        }

        @media (max-width: 560px) {
          .timeline-row {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 16px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Chronology;
