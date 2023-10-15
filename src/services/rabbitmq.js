

import { Client } from "@stomp/stompjs";

// Função sleep para aguardar um período antes de conectar
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectRabbitMq(idQueue) {
  console.log(idQueue);
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

  // Adicione o sleep antes de conectar na fila (exemplo: 5 segundos)
  await sleep(10000);

  client.onConnect = function (frame) {
    console.log("Connected");
    const subscription = client.subscribe(`/queue/${idQueue}`, function (message) {
      const receivedData = JSON.parse(message.body);
      console.log("Received message: ", receivedData);
    });
  };
  
  client.activate();
}

export default connectRabbitMq;
