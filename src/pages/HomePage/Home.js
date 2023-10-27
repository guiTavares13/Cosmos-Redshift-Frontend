import React, { useEffect, useState, useContext, createContext } from "react";
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
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [queue, setQueue] = useState(null);
    const [imgCorrelation, setImgCorrelation] = useState(null);
    const [imgGraph2D, setImgGraph2D] = useState(null);
    const [imgLinearRegression, setImgLinearRegression] = useState(null);

    const handleComboboxChange = (selectedValues) => {
        console.log('Valores selecionados:', selectedValues);
    
        const backendValues = selectedValues.map(value => actionMapping[value]);
        setSelectedComponents(backendValues);
    };
    


    const handleSidebarItemClick = (item) => {
        setSelectedParameters(item);

        const selectedEntity = data.find((entity) => entity.id === item.id);
        setSelectedEntity(selectedEntity);
    };

    const actionMapping = {
        "Regressão Linear": "LINEAR_REGRESSION_ANALYSIS",
        "Correlação": "CORRELATION_ANALYSIS",
        "Visualização 2D": "2D_GRAPHICS",
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
        console.log(selectedAtributes);
        console.log(selectedParameters);
        console.log(selectedComponents);

        if (!selectedComponents || !selectedParameters || !selectedAtributes || !selectedEntity) {
            console.error("Valores necessários não foram selecionados.");
            return;
        }

        // Iterando pelos componentes selecionados e fazendo as chamadas ao backend
        for (const selectedComponent of selectedComponents) {
            const payload = {
                action: selectedComponent,
                entity: selectedEntity.id,
                entity_type: selectedEntity.type,
                fields: selectedAtributes,
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
                    console.log("action " + payload.action);
                    switch (payload.action) {
                        case EnumComponent.CORRELATION_ANALYSIS:
                            key = "correlationAnalysis";
                            console.log("aqui1");
                            console.log("salve" + response.img);
                            setImgCorrelation(response.img);
                            break;
                        case EnumComponent.LINEAR_REGRESSION_ANALYSIS:
                            key = "linearRegressionAnalysis";
                            setImgLinearRegression(response.img);
                            break;
                        case EnumComponent.TWOD_GRAPHICS:
                            key = "twoDGraphics";
                            setImgGraph2D(response.img);
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
    }


    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(`Error storing data with key ${key}`)
        }
    }

    // const imagesLoaded = () => {
    //     const imagesContext = createContext();


    // }

    useEffect(() => {
        getEntities();
        setSelectedComponents(components)
    }, []);

    // useEffect(() => {
    //     imagesLoaded()

    // }, [imgCorrelation || imgGraph2D || imgLinearRegression]);

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
                            onChange={handleComboboxChange}
                        />
                    </div>
                </div>
                {/* ... */}
                <div className="row justify-content-center d-flex justify-content-betwen">
                    <div className="col-md-6">
                        <ImageCorrelationComponent imgBase64Object={imgCorrelation} />
                    </div>
                    <div className="col-md-6">
                        <ImageCorrelationComponent imgBase64Object={imgLinearRegression} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ImageGraph2DComponent imgBase64Object={imgGraph2D} />
                    </div>
                </div>
                <div>
                    <button onClick={requestAnalysis}>Teste</button>
                </div>
            </div>

        </>
    );
}