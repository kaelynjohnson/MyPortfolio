// Navbar.jsx - navigation bar with the custom logo and a link to each page
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo-link">
        <img src={logo} alt="KJ logo" className="logo" />
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/education">Education</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;