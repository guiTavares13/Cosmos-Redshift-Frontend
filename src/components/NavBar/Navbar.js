import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logoPath from "../../assets/logo-white.png";

export default function NavBar() {
    return (
        <nav className="nav">
            <div className="logo">
                <img src={logoPath} alt="Logo" />
            </div>
            <div className="right-side">
                <p className="welcome">Bem vindo</p>
                <span className="separator">|</span>
                <FontAwesomeIcon icon={faBell} />
            </div>
        </nav>
    );
}
