import { Client } from "@stomp/stompjs";

function connectRabbitMq() {
    const client = new Client({
        brokerURL: "ws://192.168.15.10:15674/ws",
        connectHeaders: {
            login: "guest",
            passcode: "guest",
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 1000,
    });

    client.onConnect = function (frame) {
        console.log("Connected");
        const subscription = client.subscribe("/queue/TESTE_1", function (message) {
            const receivedData = JSON.parse(message.body);
            console.log("Received message: ", receivedData);
        })
    }
    client.activate();
}

export default connectRabbitMq;