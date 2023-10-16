// import { Client } from "@stomp/stompjs";

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function connectRabbitMq(idQueue) {
//   console.log(idQueue);
//   const client = new Client({
//     brokerURL: "ws://192.168.15.7:15674/ws",
//     connectHeaders: {
//       login: "guest",
//       passcode: "guest",
//     },
//     debug: function (str) {
//       console.log(str);
//     },
//     reconnectDelay: 1000,
//   });

//   //await sleep(10000);

//   client.onConnect = function (frame) {
//     console.log("Connected");
//     const subscription = client.subscribe(`/queue/${idQueue}`, function (message) {
//       const receivedData = JSON.parse(message.body);
//       console.log("Received message: ", receivedData);
//     });
//   };

//   client.onWebSocketError = function (event) {
//     console.error("WebSocket error:", event);
//   };

//   client.onDisconnect = function (receipt) {
//     console.log("Disconnected");
//   };
  
  
  
//   client.activate();
// }

// export default connectRabbitMq;


const StompJs = require('@stomp/stompjs');
const SockJS = require('sockjs-client');

const queue = '/queue/493d1d59-6bf3-4fbc-985f-ad3fe3877443';

async function connectRabbitMq(idQueue) {

  const client = new StompJs.Client({
    webSocketFactory: () => new SockJS('http://192.168.15.7/ws'),
    connectHeaders: {
      login: 'guest',
      passcode: 'guest'
    },
    debug: function (str) {
      console.log('STOMP: ' + str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  client.onConnect = function (frame) {
    console.log('Connected');
    
    client.subscribe(idQueue, function (message) {
      console.log('Received message: ' + message.body);
    });
  };

  client.activate();

}

export default connectRabbitMq;
