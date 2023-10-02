import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

export default function SideBar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <div className="navbar bg-light border-bottom">
                <button id="buttonSidebar" onClick={toggleSidebar} className="btn">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <aside id="sidebar" className={sidebarVisible ? 'visible' : ''}>
                {/* Conteúdo do sidebar */}
                <a href="#">Item 1</a>
                <a href="#">Item 2</a>
                <a href="#">Item 3</a>
            </aside>
        </>
    );
}
