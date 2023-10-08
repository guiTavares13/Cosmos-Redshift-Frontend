import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import connectRabbitMq from '../../services/rabbitmq.js'
import api from "../../services/api.js";

import Navbar from '../../components/NavBar/Navbar.js'
import SideBar from "../../components/SideBarNavigator/SideBar.js";
import AttributeSelectedBox from "../../components/Combos/AttributeSelectedBox.js";
import ComponentSelectedBox from "../../components/Combos/ComponentSelectedBox.js";


import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';

export default function Home() {

    const [data, setData] = useState([]);
    const [selectedParameters, setSelectedParameters] = useState(null);
    const [selectedAtributes, setSelectedAtributes] = useState(null);
    const [selectedComponents, setSelectedComponents] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const [id, setPayloadAnalysis] = useState(null);
    const [idQueue, setIdQueue] = useState(null);

    const handleComboboxChange = (selectedValue) => {
        console.log('Valor selecionado:', selectedValue);
    };

    const handleSidebarItemClick = (item) => {
        setSelectedParameters(item);

        // Encontre a entidade correspondente em data e atribua-a ao estado selectedEntity
        const selectedEntity = data.find((entity) => entity.id === item.id);
        setSelectedEntity(selectedEntity);
    };


    const components = [
        "Regressão Linear",
        "Correlação",
        "Visualização 2D"
    ]

    const handleAttributeChange = (selectedAttributes) => {
        console.log(selectedAttributes); // Altere esta linha
        setSelectedAtributes(selectedAttributes);
    };


    const handleObjetChange = (selectedAttributes) => {
        console.log(selectedAttributes); // Altere esta linha
        setSelectedAtributes(selectedAttributes);
    };


    async function getEntities() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const data = await api.get('/api/availableEntities', config)
                .then((response) => response.data)
                .catch((err) => {
                    console.error(err);
                })
            console.log(data);
            setData(data);
        } catch (err) {
            console.error(err)
        }
    }

    async function requestAnalysis() {
        console.log(selectedAtributes)
        console.log(selectedParameters)
        console.log(selectedComponents)

        if (!selectedComponents || !selectedParameters || !selectedAtributes || !selectedEntity) {
            console.error("Valores necessários não foram selecionados.");
            return;
        }

        const payload = {
            "action": "CORRELATION_ANALYSIS",
            "entity": selectedEntity.id,
            "entity_type": selectedEntity.type,
            "fields": selectedAtributes,
        };
        console.log(payload);

        const payloadJson = JSON.stringify(payload);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await api.post('/api/requestAnalysis', payloadJson, config)
                .then((response) => response.data)
                .catch((err) => {
                    console.error(err);
                });
            console.log(response);
            setIdQueue(response)
        } catch (err) {
            console.error(err);
        }

        connectRabbitMq(idQueue);
    }



    useEffect(() => {
        getEntities();
        setSelectedComponents(components)
    }, []);

    useEffect(() => {
        if (idQueue) {
          connectRabbitMq(idQueue);
        }
      }, [idQueue]);

    return (
        <>
            <Navbar />
            <SideBar data={data} onItemClick={handleSidebarItemClick} onChange={handleObjetChange} />
            <div className="container-fluid">
                {/* ... */}
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        <AttributeSelectedBox
                            placeholder={"Selecione os parametros"}
                            items={selectedEntity}
                            onChange={handleAttributeChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <ComponentSelectedBox
                            placeholder={"Selecione o componente"}
                            items={selectedComponents}
                        />
                    </div>
                </div>
                {/* ... */}
            </div>
            <div>
                <button onClick={requestAnalysis}>Analise</button>
            </div>
        </>
    );
}
