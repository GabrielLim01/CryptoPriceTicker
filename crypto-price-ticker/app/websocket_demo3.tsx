// doesn't work

"use client";

import React from "react";
import useWebSocket from "react-use-websocket";

const WebSocketDemo3 = () => {
  const { sendMessage, lastMessage } = useWebSocket("wss://example.com/ws");

  const handleClick = () => {
    sendMessage("Hello, WebSocket!");
  };

  return (
    <div>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Send Message
      </button>

      <p>Last Message: {lastMessage ? lastMessage.data : "None"}</p>
    </div>
  );
};

export default WebSocketDemo3;
