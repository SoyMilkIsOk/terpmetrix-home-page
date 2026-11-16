import Link from "next/link";
import Layout from "../components/Layout";

const SuccessPage = () => {
  return (
    <Layout pageTitle="TERPMETRIX // Inquiry Received">
      <main className="success-wrap">
        <div className="success-box">
          <div className="badge">[ RECEIVED ]</div>
          <h1>Inquiry logged.</h1>
          <p>
            Thank you for reaching out to Terpmetrix. If there is alignment, we
            will respond directly.
          </p>
          <Link href="/" className="back-link">
            &larr; RETURN TO TERPMETRIX
          </Link>
        </div>
      </main>
      <style jsx>{`
        .success-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .success-box {
          max-width: 480px;
          width: 100%;
          border: 1px solid var(--border-line);
          background: var(--bg-panel);
          padding: 36px;
        }
        .badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          border: 1px solid var(--border-strong);
          padding: 4px 10px;
          margin-bottom: 18px;
          color: var(--text-white);
        }
        h1 {
          font-family: var(--font-display);
          font-size: 28px;
          margin: 0 0 12px;
          color: var(--text-white);
        }
        p {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-silver);
          margin: 0 0 24px;
        }
        .back-link {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          padding: 10px 16px;
          border: 1px solid var(--border-strong);
          color: var(--text-white);
        }
        .back-link:hover {
          background: #ffffff;
          color: #050506;
        }
      `}</style>
    </Layout>
  );
};

export default SuccessPage;
