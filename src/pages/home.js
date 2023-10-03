import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import connectRabbitMq from '../services/rabbitmq.js'

import Navbar from '../components/NavBar/Navbar.js'
import SideBar from "../components/SideBarNavigator/SideBar.js";
import SelectedBox from "../components/Combos/SelectedBox.js";

import "bootstrap/dist/css/bootstrap.min.css";
import './home.css';

export default function Home() {

    const data = ["banana", "maça", "pera"];
   
    const handleComboboxChange = (selectedValue) => {
      console.log('Valor selecionado:', selectedValue);
    };

    useEffect(() => {
        connectRabbitMq();
    }, []);

    return (
        <>
            <Navbar/>
            <SideBar />
            <div className="container-fluid">
                <p className="title">Selecione o dado que irá visualizar <FontAwesomeIcon icon={faHand}/></p>
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        <SelectedBox placeholder={"Selecione os parametros"} items={data}/>
                    </div>
                    <div className="col-md-3">
                        <SelectedBox placeholder={"Selecione o componente"}/>
                    </div>
                    <div className="col-md-3">
                        <SelectedBox name={"Selecione o periodo"}/>
                    </div>
                </div>
            </div>
        </>
    )
}
