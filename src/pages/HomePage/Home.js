import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { Audio } from 'react-loader-spinner'

// Outras importações...

import api from "../../services/api.js";
import EnumComponent from "../../Common/EnumComponent.js"

import Navbar from '../../components/NavBar/Navbar.js'
import SideBar from "../../components/SideBarNavigator/SideBar.js";
import AttributeSelectedBox from "../../components/Combos/AttributeSelectedBox.js";
import ComponentSelectedBox from "../../components/Combos/ComponentSelectedBox.js";

import ImageCorrelationComponent from "../../components/ImageCorrelation/ImageCorrelationComponent.js";
import ImageGraph2DComponent from "../../components/ImageGraph2D/ImageGraph2DComponent.js";

import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState([]);
    const [selectedParameters, setSelectedParameters] = useState(null);
    const [selectedAtributes, setSelectedAtributes] = useState(null);
    const [selectedComponents, setSelectedComponents] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [queue, setQueue] = useState(null);
    const [imgCorrelation, setImgCorrelation] = useState(null);
    const [imgGraph2D, setImgGraph2D] = useState(null);
    const [imgLinearRegression, setImgLinearRegression] = useState(null);

    const handleComboboxChange = (selectedValue) => {
        console.log('Valor selecionado:', selectedValue);
    };

    const handleSidebarItemClick = (item) => {
        setSelectedParameters(item);

        const selectedEntity = data.find((entity) => entity.id === item.id);
        setSelectedEntity(selectedEntity);
    };


    const components = [
        "Regressão Linear",
        "Correlação",
        "Visualização 2D"
    ]

    const handleAttributeChange = (selectedAttributes) => {
        console.log(selectedAttributes);
        setSelectedAtributes(selectedAttributes);
    };


    const handleObjetChange = (selectedAttributes) => {
        console.log(selectedAttributes);
        setSelectedAtributes(selectedAttributes);
    };


    async function getEntities() {

        const config = {
            headers: {
                'Cosntent-Type': 'application/json',
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
            const response = await api.post('/api/sync/requestAnalysis', payloadJson, config)
                .then((response) => response.data)
                .catch((err) => {
                    console.error(err);
                });
            console.log(response);

            if (response != null) {
                let key;
                switch (payload.action) {
                    case EnumComponent.CORRELATION_ANALYSIS:
                        key = "correlationAnalysis";
                        setImgCorrelation(key);
                        break;
                    case EnumComponent.LINEAR_REGRESSION_ANALYSIS:
                        key = "linearRegressionAnalysis";
                        setImgLinearRegression(key);
                        break;
                    case EnumComponent.TWOD_GRAPHICS:
                        key = "twoDGraphics";
                        setImgGraph2D(key);
                        break;
                    default:
                        console.error("Ação desconhecida!");
                        return;
                }

                const value = JSON.stringify(response);
                await storeData(key, value.img);
            }

        } catch (err) {
            console.error(err);
        }
    }




    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(`Error storing data with key ${key}`)
        }
    }

    useEffect(() => {
        getEntities();
        setSelectedComponents(components)
    }, []);

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
                <div className="row justify-content-center d-flex justify-content-betwen">
                    <div className="col-md-6">
                        <ImageCorrelationComponent />
                    </div>
                    <div className="col-md-6">
                        <ImageCorrelationComponent />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ImageGraph2DComponent/>
                    </div>
                </div>
            </div>

        </>
    );
}