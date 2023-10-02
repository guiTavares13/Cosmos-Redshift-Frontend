import React from 'react';
import './Navbar.css';

export default function NavBar() {
    return (
        <nav className="nav">
            <div>
                <p className="icon">Icone</p>
            </div>
            <div className="right-side">
                <p>Bem vindo</p>
                <span className="separator">|</span>
                <p>Notify</p>
            </div>
        </nav>
    );
}
