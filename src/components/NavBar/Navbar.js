import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    return (
        <nav className="nav">
            <div>
                <p className="icon"><FontAwesomeIcon icon={faUser} /></p>
            </div>
            <div className="right-side">
                <p className="welcome">Bem vindo</p>
                <span className="separator">|</span>
                <FontAwesomeIcon icon={faBell} />
            </div>
        </nav>
    );
}
