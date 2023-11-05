import { Client } from "@stomp/stompjs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectRabbitMq(idQueue) {
  console.log(idQueue);
  const client = new Client({
    brokerURL: "ws://localhost:15674/ws",
    connectHeaders: {
      login: "guest",
      passcode: "guest",
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 1000,
  });

  await sleep(1000);

  client.onConnect = function (frame) {
    console.log("Connected");
    const subscription = client.subscribe(`/queue/${idQueue}`, function (message) {
      const receivedData = JSON.parse(message.body);
      console.log("Received message: ", receivedData);
    });
  };

  client.onWebSocketError = function (event) {
    console.error("WebSocket error:", event);
  };

  client.onDisconnect = function (receipt) {
    console.log("Disconnected");
  };



  client.activate();
}

export default connectRabbitMq;


// import { Client } from "@stomp/stompjs";

// function connectRabbitMq(idQueue) {
//   const stompClient = new Client({
//     brokerURL: "ws://192.168.15.10:15674/ws",
//     connectHeaders: {
//       login: "guest",
//       passcode: "guest",
//     },
//     debug: function (str) {
//       console.log(str);
//     },
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });

//   stompClient.onConnect = function (frame) {
//     console.log("Connected to RabbitMQ");
//     stompClient.subscribe("/exchange/"+idQueue, function (message) {
//       console.log("Received message:", message.body);
//     });
//   };

//   stompClient.onStompError = function (error) {
//     console.error("Error:", error);
//   };

//   stompClient.activate();
// }

// export default connectRabbitMq;


