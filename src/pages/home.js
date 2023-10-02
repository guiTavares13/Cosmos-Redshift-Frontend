// Home.js

import React, { useEffect } from "react";
import connectRabbitMq from '../services/rabbitmq.js';
import NavBar from '../components/NavBar/Navbar.js';
import SideBar from "../components/SideBarNavigator/SideBar.js";

import "bootstrap/dist/css/bootstrap.min.css";
import './home.css';

export default function Home() {
    // Exemplo de dados para o Combobox (altere conforme necessário)
    const dataOptions = [
      { title: 'Dado 1' },
      { title: 'Dado 2' },
      { title: 'Dado 3' },
    ];

    const handleComboboxChange = (selectedValue) => {
      console.log('Valor selecionado:', selectedValue);
    };

    useEffect(() => {
        connectRabbitMq();
    }, []);

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="container-fluid">
                <h1>Selecione o dado que irá visualizar</h1>
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        
                    
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
