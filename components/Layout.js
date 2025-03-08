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
        :root {
          --primary-color: #3a9e42;
          --secondary-color: #245828;
          --accent-color: #3a9e42;
          --dark-color: #1a1a1a;
          --light-color: #f9f9f9;
          --transition-speed: 0.3s;
        }

        html,
        body {
          scroll-behavior: smooth;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          background-color: var(--light-color);
          color: var(--dark-color);
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        a {
          color: var(--primary-color);
          text-decoration: none;
          transition: color 0.3s;
        }

        a:hover {
          color: var(--secondary-color);
        }

        .site-wrapper {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }

        section {
          padding: 80px 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 700;
        }

        .btn-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          transition: all var(--transition-speed);
        }

        .btn-primary:hover {
          background-color: var(--secondary-color);
          border-color: var(--secondary-color);
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .section-heading {
          margin-bottom: 60px;
          position: relative;
          padding-bottom: 15px;
        }

        .section-heading:after {
          content: "";
          position: absolute;
          width: 60px;
          height: 3px;
          background-color: var(--accent-color);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        img {
          max-width: 100%;
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 0;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
