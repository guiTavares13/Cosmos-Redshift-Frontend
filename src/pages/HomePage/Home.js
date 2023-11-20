import React, { useEffect, useState, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHand } from "@fortawesome/free-solid-svg-icons";
// import { Audio } from 'react-loader-spinner'

import api from "../../services/api.js";
import EnumComponent from "../../Common/EnumComponent.js"

import Navbar from '../../components/NavBar/Navbar.js'
import SideBar from "../../components/SideBarNavigator/SideBar.js";
import AttributeSelectedBox from "../../components/Combos/AttributeSelectedBox.js";
import ComponentSelectedBox from "../../components/Combos/ComponentSelectedBox.js";
import NotificationComponent from "../../components/Notifications/NotificationComponent.js";

import ImageCorrelationComponent from "../../components/ImageCorrelation/ImageCorrelationComponent.js";
import ImageGraph2DComponent from "../../components/ImageGraph2D/ImageGraph2DComponent.js";

import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';
import connectRabbitMq from "../../services/rabbitmq.js";

export default function Home() {


    const [notification, setNotification] = useState({
        message: '',
        entity_type: '',
        action: '',
        show: false,
    });
    const [notifications, setNotifications] = useState([]);
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
    const [queues, setQueues] = useState({});
    const [imgData, setImgData] = useState({});

    const [availableComponents, setAvailableComponents] = useState([]);


    const handleComboboxChange = (selectedValues) => {
        clearImagesAndQueue();
        console.log('Valores selecionados:', selectedValues);

        const backendValues = selectedValues.map(value => actionMapping[value]);
        setSelectedComponents(backendValues);
    };

    const clearImagesAndQueue = () => {
        setImgCorrelation(null);
        setImgGraph2D(null);
        setImgLinearRegression(null);
        setQueues({});
    };

    const displayNotification = (messageObj) => {
        const newNotification = { ...messageObj, show: true };
        setNotifications(prevNotifications => [...prevNotifications, newNotification]);

        setTimeout(() => {
            setNotifications(prevNotifications => prevNotifications.filter(n => n !== newNotification));
        }, 5000);
    };



    const handleSidebarItemClick = (item) => {
        clearImagesAndQueue();
        setSelectedParameters(item);

        const selectedEntity = data.find((entity) => entity.id === item.id);
        setSelectedEntity(selectedEntity);
    };

    const actionMapping = {
        "Regressão Linear": "LINEAR_REGRESSION_ANALYSIS",
        "Correlação": "CORRELATION_ANALYSIS",
    };

    const components = [
        "Regressão Linear",
        "Correlação",
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

        if (!selectedComponents || !selectedParameters || !selectedAtributes || !selectedEntity) {
            console.error("Valores necessários não foram selecionados.");
            return;
        }

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
                const response = await api.post('/api/requestAnalysis', payloadJson, config)
                    .then((response) => response.data)
                    .catch((err) => {
                        console.error(err);
                    });
                console.log(response);
                displayNotification({
                    message: "Pedido de análise enviado com sucesso!",
                    entity_type: payload.entity_type,
                    action: payload.action,
                });
                setQueues((prevQueues) => ({ ...prevQueues, [selectedComponent]: response }));

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

    useEffect(() => {
        getEntities();
        setAvailableComponents(components);
    }, []);

    useEffect(() => {
        for (const component in queues) {
            connectRabbitMq(queues[component], (receivedData) =>
                handleComponentMessage(component, receivedData)
            );
        }
    }, [queues]);


    function handleMessageCorrelation(receivedData) {
        setImgData((prevImgData) => ({ ...prevImgData, correlationAnalysis: receivedData.img }));
    }

    function handleMessageLinearRegression(receivedData) {
        setImgData((prevImgData) => ({ ...prevImgData, linearRegressionAnalysis: receivedData.img }));
    }

    function handleMessageTwoDGraphics(receivedData) {
        setImgData((prevImgData) => ({ ...prevImgData, twoDGraphics: receivedData.img }));
    }

    const queueHandlers = {
        [EnumComponent.CORRELATION_ANALYSIS]: handleMessageCorrelation,
        [EnumComponent.LINEAR_REGRESSION_ANALYSIS]: handleMessageLinearRegression,
        [EnumComponent.TWOD_GRAPHICS]: handleMessageTwoDGraphics,
    };


    function handleComponentMessage(selectedComponent, receivedData) {
        console.log("HandleMessageReceived:", receivedData);

        displayNotification({
            message: "O backend terminou a analise",
        });

        let key;
        switch (selectedComponent) {
            case EnumComponent.CORRELATION_ANALYSIS:
                key = "correlationAnalysis";
                break;
            case EnumComponent.LINEAR_REGRESSION_ANALYSIS:
                key = "linearRegressionAnalysis";
                break;
            default:
                console.error("Ação desconhecida!");
                return;
        }

        setImgData((prevImgData) => ({ ...prevImgData, [key]: receivedData.img }));
    }


    return (
        <>
            <Navbar />
            <SideBar data={data} onItemClick={handleSidebarItemClick} onChange={handleObjetChange} selectedEntity={selectedEntity} />
            <div className="container-fluid">
                <div className="row justify-content-center combo-box">
                    <div className="col-md-3">
                        <AttributeSelectedBox
                            placeholder={"Selecione os parametros"}
                            items={selectedEntity}
                            onChange={handleAttributeChange}
                            onMenuClose={requestAnalysis}
                        />
                    </div>
                    <div className="col-md-3">
                        <ComponentSelectedBox
                            placeholder={"Selecione o componente"}
                            items={availableComponents}
                            onChange={handleComboboxChange}
                            onMenuClose={requestAnalysis}
                        />
                    </div>

                </div>
                <div className="row justify-content-center d-flex justify-content-between">
                    <div className="col-md-6 text-center column-wrapper">
                        <ImageCorrelationComponent imgBase64Object={imgData.correlationAnalysis} />
                    </div>
                    <div className="col-md-6 text-center column-wrapper">
                        <ImageCorrelationComponent imgBase64Object={imgData.linearRegressionAnalysis} />
                    </div>
                </div>
            </div>
            <div className="notification-container">
                {notifications.map((n, idx) => (
                    <NotificationComponent
                        key={idx}
                        show={n.show}
                        message={n.message}
                        entity_type={n.entity_type}
                        action={n.action}
                    />
                ))}
            </div>

        </>
    );
}