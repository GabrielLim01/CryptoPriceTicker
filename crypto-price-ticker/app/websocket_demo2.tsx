'use client';

import React from 'react';
import useWebSocket from 'react-use-websocket';

export default function WebSocketDemo2() {
  // const socketUrl = 'ws://127.0.0.1:8000';
  const [socketUrl, setSocketUrl] = "wss://ws.kraken.com/v2";

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established'),
    onClose: () => console.log('WebSocket connection closed'),
    shouldReconnect: (closeEvent) => true, // Attempt to reconnect on all close events
    reconnectAttempts: 10,
    reconnectInterval: 3000
  });

  // Example of sending a message
  const handleSendMessage = () => {
    sendJsonMessage({ type: 'hello', content: 'Hello Server!' });
  };

  // Process incoming messages
  React.useEffect(() => {
    if (lastJsonMessage) {
      console.log('Received message:', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <div>
    <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSendMessage}>Send Message</button>
      <div>Last message: {lastMessage ? lastMessage.data : null}</div>
      <div>Connection status: {readyState}</div>
    </div>
  );
}