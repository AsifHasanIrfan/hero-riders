import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './header.css'
import logo from '../../images/logo.png';

const Header = () => {
    const [loggedInUser] = useContext(userContext);
    const {isSignedIn, name} = loggedInUser;
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className="container">
            <Link className="navbar-brand" to="/home"><img src={logo} className="logo" alt="" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/destination">Destination</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
            {isSignedIn ? <p className="user-name">{name}</p> : <Link to="/login" className="login-btn">Login</Link>}
            </div>
        </div>
        </nav>
    );
};

export default Header;