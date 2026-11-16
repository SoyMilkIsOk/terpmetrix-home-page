import { useState } from "react";

const VENTURES = [
  {
    id: "01",
    name: "TERPSCOOPS",
    category: "PRECISION HARDWARE",
    status: "LIVE",
    summary:
      "Pocket-sized herb scoops built to sit inside standard grinders—available in acrylic, steel, titanium, and solid silver.",
    href: "https://terpscoops.com",
    cta: "TERPSCOOPS.COM",
    classified: false,
  },
  {
    id: "02",
    name: "TERPTIER",
    category: "DISCOVERY & RANKINGS",
    status: "LIVE",
    summary:
      "Community-ranked cultivators and strains scored on flavor, effect, and smoke—with live weekly drop tracking.",
    href: "https://terptier.com",
    cta: "TERPTIER.COM",
    classified: false,
  },
  {
    id: "03",
    name: "TERPFOCUS",
    category: "MACRO PHOTOGRAPHY",
    status: "BOOKING",
    summary:
      "Ultra-macro flower, trichome, and rosin photography for cultivators, hashmakers, and cannabis brands.",
    href: "https://terpfocus.com",
    cta: "TERPFOCUS.COM",
    classified: false,
  },
  {
    id: "04",
    name: "TERPFORGE",
    category: "WEB & BRAND STUDIO",
    status: "OPEN",
    summary:
      "Custom websites, compliant e-commerce, and digital branding built specifically for cannabis operators.",
    href: "https://calendly.com/terps-terpmetrix/quote-call",
    cta: "SCHEDULE CALL",
    classified: false,
  },
  {
    id: "05",
    name: "██████████",
    category: "STEALTH R&D",
    status: "[ CLASSIFIED ]",
    summary: "Confidential R&D. Briefings available upon request.",
    href: "#access",
    cta: "REQUEST BRIEFING",
    classified: true,
  },
];

const VenturesIndex = ({ onRequestBriefing }) => {
  const [activeId, setActiveId] = useState("01");

  return (
    <section id="ventures" className="ventures-section">
      <div className="tmx-container">
        <div className="section-kicker">01 // VENTURES</div>

        <div className="ventures-table">
          {VENTURES.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`venture-row ${isOpen ? "open" : ""} ${
                  item.classified ? "classified" : ""
                }`}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
              >
                <div className="row-main">
                  <span className="col-id">[ {item.id} ]</span>
                  <span className="col-name">{item.name}</span>
                  <span className="col-cat">{item.category}</span>
                  <span className="col-status">{item.status}</span>
                </div>

                {isOpen && (
                  <div className="row-drawer">
                    <p className="drawer-summary">{item.summary}</p>
                    <div className="drawer-action">
                      {item.classified ? (
                        <button
                          type="button"
                          className="row-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRequestBriefing("Investor Briefing");
                          }}
                        >
                          {item.cta} &rarr;
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="row-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.cta} &#8599;
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .ventures-section {
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

        .ventures-table {
          border: 1px solid var(--border-line);
          background: var(--bg-panel);
        }

        .venture-row {
          border-bottom: 1px solid var(--border-line);
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .venture-row:last-child {
          border-bottom: none;
        }

        .venture-row:hover,
        .venture-row.open {
          background: var(--bg-surface);
          border-left-color: #ffffff;
        }

        .row-main {
          display: grid;
          grid-template-columns: 88px 1.15fr 1.15fr 150px;
          align-items: center;
          padding: 18px 20px;
          gap: 12px;
        }

        .col-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-dim);
        }

        .venture-row.open .col-id {
          color: var(--text-white);
        }

        .col-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-white);
        }

        .venture-row.classified .col-name {
          letter-spacing: 0.08em;
          color: var(--text-silver);
        }

        .col-cat {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--text-silver);
        }

        .col-status {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-silver);
          text-align: right;
        }

        .venture-row.classified .col-status {
          color: #ffffff;
          border: 1px solid var(--border-strong);
          padding: 4px 8px;
          justify-self: end;
        }

        .row-drawer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 0 20px 20px 108px;
          animation: fadeSlide 0.2s ease;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .drawer-summary {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.65;
          color: var(--text-silver);
          margin: 0;
          max-width: 660px;
        }

        .row-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 9px 15px;
          border: 1px solid var(--border-strong);
          background: transparent;
          color: var(--text-white);
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .row-btn:hover {
          background: #ffffff;
          color: #050506;
          border-color: #ffffff;
        }

        @media (max-width: 820px) {
          .row-main {
            grid-template-columns: 64px 1fr;
            gap: 6px 12px;
          }

          .col-cat {
            grid-column: 2;
          }

          .col-status {
            grid-column: 2;
            text-align: left;
            justify-self: start;
          }

          .row-drawer {
            flex-direction: column;
            align-items: flex-start;
            padding: 0 20px 20px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default VenturesIndex;
