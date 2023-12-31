import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";

export default function SideBar({ data, onItemClick, selectedEntity }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  console.log(data);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  function formatSidebarItem(item) {
    console.log(item);
    return `${item.type}`;
  }

  return (
    <>
      <div className="navbar bg-light border-bottom">
        <button id="buttonSidebar" onClick={toggleSidebar} className="btn">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="menu-text">{selectedEntity ? selectedEntity.type : ""}</span>
      </div>
      <aside id="sidebar" className={sidebarVisible ? "visible" : ""}>
        {data &&
          data.map((item, index) => (
            <a
              key={index}
              href="/home"
              onClick={(event) => {
                event.preventDefault();
                onItemClick(item);
                toggleSidebar();
              }}
            >
              {formatSidebarItem(item)}
            </a>
          ))}
      </aside>
    </>
  );
}
