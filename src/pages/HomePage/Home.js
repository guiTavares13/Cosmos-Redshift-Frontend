import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import connectRabbitMq from '../../services/rabbitmq.js'
import api from "../../services/api.js";

import Navbar from '../../components/NavBar/Navbar.js'
import SideBar from "../../components/SideBarNavigator/SideBar.js";
import SelectedBox from "../../components/Combos/SelectedBox.js";
import DatePickerBox from "../../components/Combos/DatePickerBox.js";

import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';

export default function Home() {

    const data = ["banana", "maça", "pera"];

    const handleComboboxChange = (selectedValue) => {
        console.log('Valor selecionado:', selectedValue);
    };

    async function getEntities() {
        try {
            const id = await api.post('/api/requestAnalysis')
                .then((response) => JSON.stringify(response))
                .catch((err) => {
                    console.error(err);
                })
            console.log(id);
            return id;
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const id = getEntities();
        connectRabbitMq(id);
    }, []);

    return (
        <>
            <Navbar />
            <SideBar />
            <div className="container-fluid">
                <p className="title">Selecione o dado que irá visualizar <FontAwesomeIcon icon={faHand} /></p>
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        <SelectedBox placeholder={"Selecione os parametros"} items={data} />
                    </div>
                    <div className="col-md-3">
                        <SelectedBox placeholder={"Selecione o componente"} />
                    </div>
                    <div className="col-md-3">
                        {/* <DatePickerBox
                            placeholderStart="Data Inicial"
                            placeholderEnd="Data Final"
                        /> */}
                        <SelectedBox placeholder={"Informe o período"} />
                    </div>
                </div>
            </div>
        </>
    )
}
