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
              <Image src="/images/logo-circle.png" alt="Terpmetrix Logo" />
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
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 15px 0;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.85);
        }

        .header.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 10px 0;
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
          color: var(--dark-color);
          font-weight: 700;
          font-size: 24px;
        }
        .logo span {
          margin-left: 4px;
          letter-spacing: 0.5px;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
        }
        @media (max-width: 768px) {
          .logo span {
            font-size: 16px;
            margin-left: 2px;
            letter-spacing: 0.4px;
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
          }
        }

        .logo img {
          height: 40px;
          margin-right: 10px;
        }

        .navbar {
          transition: transform 0.4s ease;
        }

        .navbar ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar li {
          margin-left: 30px;
        }

        .navbar a {
          color: var(--dark-color);
          text-decoration: none;
          transition: color 0.3s;
          position: relative;
          font-weight: 500;
          font-size: 14px;
          transition: color 0.3s;
          position: relative;
        }

        .navbar Link {
          color: var(--dark-color);
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s;
          position: relative;
        }

        .navbar a:hover,
        .navbar a.active,
        .navbar Link:hover,
        .navbar Link.active {
          color: var(--primary-color);
        }

        .navbar a.active:after,
        .navbar a:hover:after,
        .navbar Link.active:after,
        .navbar Link:hover:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: var(--primary-color);
          bottom: -5px;
          left: 0;
          transform: scaleX(1);
          transition: transform 0.3s;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
          z-index: 1002;
        }

        .hamburger span {
          display: block;
          height: 3px;
          background-color: var(--dark-color);
          border-radius: 3px;
          transition: all 0.3s ease;
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

        @media (max-width: 991px) {
          .hamburger {
            display: flex;
          }

          .navbar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 250px;
            background-color: white;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            padding: 80px 20px 40px;
            transform: translateX(100%);
            overflow-y: auto;
          }

          .navbar.open {
            transform: translateX(0);
          }

          .navbar ul {
            flex-direction: column;
          }

          .navbar li {
            margin: 15px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
