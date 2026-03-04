import Head from "next/head";
import { useState, useEffect } from "react";

const Layout = ({ children, pageTitle }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Terpmetrix is pioneering the future of cannabis technology with innovative solutions for growers, processors, and consumers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className={`site-wrapper ${mounted ? "fade-in" : ""}`}>
        {children}
      </div>
      <style jsx global>{`
        html,
        body {
          scroll-behavior: smooth;
          font-family: var(--font-body);
          background-color: var(--dark-bg);
          color: var(--text-primary);
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        a {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.3s var(--transition-smooth);
        }

        a:hover {
          color: var(--primary-hover);
        }

        .site-wrapper {
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }

        section {
          padding: 100px 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-primary {
          background-color: var(--primary);
          border-color: var(--primary);
          transition: all var(--transition-speed) var(--transition-smooth);
        }

        .btn-primary:hover {
          background-color: var(--primary-hover);
          border-color: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px var(--primary-glow-strong);
        }

        .section-heading {
          margin-bottom: 60px;
          position: relative;
          padding-bottom: 18px;
          font-family: var(--font-heading);
        }

        .section-heading:after {
          content: "";
          position: absolute;
          width: 60px;
          height: 3px;
          background: var(--gradient-accent);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        img {
          max-width: 100%;
        }

        @media (max-width: 768px) {
          section {
            padding: 70px 0;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
