import React, { useEffect } from "react";
import connectRabbitMq from '../services/rabbitmq.js';
import NavBar from '../components/NavBar/Navbar.js';
import SideBar from "../components/SideBarNavigator/SideBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './home.css';

export default function Home() {

    useEffect(() => {
        connectRabbitMq();
    }, []);

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="container-fluid">
                <h1>Home</h1>
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        Coluna 1
                    </div>
                    <div className="col-md-3">
                        coluna 2
                    </div>
                    <div className="col-md-3">
                        coluna 3
                    </div>
                </div>
            </div>
        </>
    )
}
