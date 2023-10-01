import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    connectRabbitMq();
  }, []);

  function connectRabbitMq() {
    const client = new Client({
      brokerURL: "ws://192.168.15.7:15674/ws",
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
      const subscription = client.subscribe("/queue/test", function (message) {
        console.log(message);
      })
    }
    client.activate();
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
