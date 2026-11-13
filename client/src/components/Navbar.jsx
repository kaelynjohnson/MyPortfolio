// Navbar.jsx - navigation bar with the custom logo, page links, and sign in / sign out controls
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  // Sign the user out, then go back to the Home page
  const handleSignout = async () => {
    await signout();
    navigate('/');
  };

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
        {user ? (
          <>
            <li className="nav-user">Hi, {user.name} ({user.role})</li>
            <li>
              <button type="button" className="nav-button" onClick={handleSignout}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;