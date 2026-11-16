import { useEffect, useState } from "react";

const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="tmx-container">
        <div className="topbar-inner">
          <a href="#top" className="brand" aria-label="Terpmetrix Home">
            <span>
              TERPMETRIX<span className="cursor-blink">_</span>
            </span>
          </a>

          <div className="location-stamp">BOULDER, CO</div>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#ventures" className="nav-item">
              VENTURES
            </a>
            {/* <a href="#timeline" className="nav-item">
              TIMELINE
            </a> */}
            <a href="#access" className="nav-cta">
              INQUIRE &rarr;
            </a>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid var(--border-line);
          background: rgba(5, 5, 6, 0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .topbar.scrolled {
          background: rgba(5, 5, 6, 0.94);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 60px;
        }

        .brand {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-white);
        }

        .location-stamp {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--text-dim);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-item {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--text-silver);
          transition: color 0.2s ease;
        }

        .nav-item:hover {
          color: var(--text-white);
        }

        .nav-cta {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 8px 14px;
          border: 1px solid var(--border-strong);
          color: var(--text-white);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-cta:hover {
          background: #ffffff;
          color: #050506;
          border-color: #ffffff;
        }

        @media (max-width: 820px) {
          .location-stamp {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .nav-item {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default TopBar;
