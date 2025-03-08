import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <Link href="/">TERPMETRIX</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div style={{ transform: menuActive ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
        <div style={{ opacity: menuActive ? 0 : 1 }}></div>
        <div style={{ transform: menuActive ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
      </div>
      <div className={`navbar-menu ${menuActive ? 'active' : ''}`}>
        <Link href="/"><a onClick={() => setMenuActive(false)}>Home</a></Link>
        <Link href="/projects"><a onClick={() => setMenuActive(false)}>Projects</a></Link>
        <Link href="/about"><a onClick={() => setMenuActive(false)}>About</a></Link>
        <a href="https://terpscoops.com" target="_blank" rel="noopener noreferrer">Shop</a>
        <Link href="/contact"><a onClick={() => setMenuActive(false)}>Contact</a></Link>
      </div>
    </nav>
  );
};

export default NavBar;
