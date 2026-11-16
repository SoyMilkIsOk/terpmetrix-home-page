const TerminalFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="tmx-footer">
      <div className="tmx-container">
        <div className="footer-inner">
          <div className="footer-left">
            <span>&copy; {year} TERPMETRIX</span>
            <span className="sep">/</span>
            <span>BOULDER, COLORADO</span>
          </div>

          <div className="footer-links">
            <a
              href="https://terpscoops.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHOP
            </a>
            <a
              href="https://twitter.com/terpmetrix"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://instagram.com/terpmetrix"
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM
            </a>
            <a
              href="https://linkedin.com/company/terpmetrix"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tmx-footer {
          border-top: 1px solid var(--border-line);
          padding: 28px 0 36px;
          background: var(--bg-void);
        }

        .footer-inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links a {
          color: var(--text-silver);
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--text-white);
        }
      `}</style>
    </footer>
  );
};

export default TerminalFooter;

