import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
    return (
        <nav className='paypro-navbar'>
            <Link to="/" className="navbar-button">
                <img src="PayPro Logo.png" alt="" />
            </Link>
            <div className="navbar-buttons">
                <Link to="/about" className="navbar-button">
                    <button>About</button>
                </Link>
                <Link to="/services" className="navbar-button">
                    <button>Services</button>
                </Link>
                <Link to="/contact" className="navbar-button">
                    <button>Contact</button>
                </Link>
                <Link to="/signin" className="navbar-button">
                    <button>Login</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
