import AsciiCanvas from "./AsciiCanvas";

const HeroSection = ({ onRequestBriefing }) => {
  return (
    <section id="top" className="hero-section">
      <div className="tmx-container">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>PRECISION IN A SPACE BUILT ON GUESSWORK.</h1>

            <p className="hero-lead">
              Hardware, optics, and market intelligence built quietly in
              Colorado since 2023.
            </p>

            <div className="hero-actions">
              <a href="#ventures" className="hero-btn hero-btn-outline">
                VENTURES &darr;
              </a>
              <button
                type="button"
                className="hero-btn hero-btn-filled"
                onClick={() => onRequestBriefing("Investor Briefing")}
              >
                REQUEST BRIEFING &rarr;
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <AsciiCanvas />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 12px 0 24px;
          min-height: 760px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border-line);
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.68fr) minmax(0, 1.32fr);
          gap: 12px;
          align-items: center;
        }

        .hero-copy {
          position: relative;
          z-index: 2;
        }

        .hero-visual {
          position: relative;
          z-index: 1;
        }

        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.15rem, 4.1vw, 3.45rem);
          font-weight: 700;
          line-height: 1.03;
          letter-spacing: -0.03em;
          color: var(--text-white);
          margin: 0 0 20px;
        }

        .hero-lead {
          font-family: var(--font-mono);
          font-size: 14px;
          line-height: 1.75;
          color: var(--text-silver);
          max-width: 400px;
          margin: 0 0 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-btn {
          appearance: none;
          -webkit-appearance: none;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding: 0 22px;
          border: 1px solid #ffffff;
          border-radius: 0;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.1em;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease,
            border-color 0.2s ease;
        }

        .hero-btn-filled {
          background-color: #ffffff;
          color: #050506;
        }

        .hero-btn-filled:hover {
          background-color: #d8dde6;
          border-color: #d8dde6;
          color: #050506;
        }

        .hero-btn-outline {
          background-color: rgba(5, 5, 6, 0.72);
          color: #ffffff;
        }

        .hero-btn-outline:hover {
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding: 0;
            min-height: 580px;
            align-items: stretch;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 0;
            min-height: 580px;
          }

          .hero-visual {
            grid-row: 1;
            grid-column: 1;
            z-index: 1;
            width: 100vw;
            margin-left: calc(50% - 50vw);
            align-self: start;
          }

          .hero-copy {
            grid-row: 1;
            grid-column: 1;
            z-index: 2;
            align-self: end;
            pointer-events: none;
            margin-top: 205px;
            padding: 64px 0 32px;
            background: linear-gradient(
              to top,
              rgba(5, 5, 6, 0.96) 0%,
              rgba(5, 5, 6, 0.88) 54%,
              rgba(5, 5, 6, 0.42) 80%,
              rgba(5, 5, 6, 0) 100%
            );
          }

          .hero-actions {
            pointer-events: auto;
          }

          h1 {
            text-shadow: 0 2px 18px rgba(5, 5, 6, 0.95);
            margin-bottom: 14px;
          }

          .hero-lead {
            color: #d4d8df;
            text-shadow: 0 2px 14px rgba(5, 5, 6, 0.98);
            margin-bottom: 22px;
          }
        }

        @media (max-width: 520px) {
          .hero-section {
            min-height: 560px;
          }

          .hero-grid {
            min-height: 560px;
          }

          .hero-copy {
            margin-top: 200px;
          }

          .hero-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
