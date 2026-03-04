import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <Link href="/" className="logo-link" passHref>
              <Image width={50} height={50} src="/images/logo-circle.png" alt="Terpmetrix Logo" className="logo-circle" style={{marginRight: '10px'}} />
              <span>TERPMETRIX</span>
            </Link>
          </div>

          <div
            className={`hamburger ${isNavOpen ? "active" : ""}`}
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={`navbar ${isNavOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link
                  href="/"
                  className={router.pathname === "/" ? "active" : ""}
                  onClick={closeNav}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={router.pathname === "/projects" ? "active" : ""}
                  onClick={closeNav}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={router.pathname === "/about" ? "active" : ""}
                  onClick={closeNav}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://terpscoops.com"
                  className={router.pathname === "/shop" ? "active" : ""}
                  onClick={closeNav}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={router.pathname === "/contact" ? "active" : ""}
                  onClick={closeNav}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Overlay for mobile nav */}
          {isNavOpen && <div className="nav-overlay" onClick={closeNav}></div>}
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 18px 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: transparent;
        }

        .header.scrolled {
          background-color: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--dark-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          padding: 12px 0;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 24px;
          font-family: var(--font-heading);
          transition: color 0.3s;
        }

        .logo a:hover {
          color: var(--primary);
        }

        .logo span {
          margin-left: 4px;
          letter-spacing: 2px;
          font-size: 18px;
          font-weight: 700;
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
          font-family: var(--font-heading);
        }

        @media (max-width: 768px) {
          .logo span {
            font-size: 15px;
            margin-left: 2px;
            letter-spacing: 1.5px;
          }
        }

        .logo-circle {
          height: 40px;
          margin-right: 10px;
          transition: transform 0.3s ease;
        }

        .logo a:hover .logo-circle {
          transform: rotate(10deg) scale(1.05);
        }

        .navbar {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 8px;
        }

        .navbar li {
          margin-left: 10px;
        }

        .navbar a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          font-family: var(--font-body);
          letter-spacing: 0.02em;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .navbar a:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar a.active {
          color: var(--primary);
          background: var(--primary-glow);
        }

        .navbar a:after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          background: var(--primary);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }

        .navbar a:hover:after,
        .navbar a.active:after {
          width: 60%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 28px;
          height: 20px;
          cursor: pointer;
          z-index: 1002;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background-color: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active span {
          background-color: var(--primary);
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        .nav-overlay {
          display: none;
        }

        @media (max-width: 991px) {
          .hamburger {
            display: flex;
          }

          .nav-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }

          .navbar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 280px;
            background: var(--dark-surface);
            border-left: 1px solid var(--dark-border);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.4);
            padding: 100px 30px 40px;
            transform: translateX(100%);
            overflow-y: auto;
            z-index: 1001;
          }

          .navbar.open {
            transform: translateX(0);
          }

          .navbar ul {
            flex-direction: column;
            gap: 4px;
          }

          .navbar li {
            margin: 0;
          }

          .navbar a {
            display: block;
            padding: 12px 16px;
            font-size: 16px;
            border-radius: 8px;
          }

          .navbar a:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .navbar a.active {
            background: var(--primary-glow);
            border-left: 3px solid var(--primary);
          }

          .navbar a:after {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
