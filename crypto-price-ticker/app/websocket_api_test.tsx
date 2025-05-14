"use client";

import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketDemo4 = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://ws.kraken.com/v2");
  // const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>[];
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://ws.kraken.com/v2"),
    []
  );

  // wrong string message
  // const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);
  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({"method":"subscribe","params":{"channel":"ticker","symbol":["BTC/USD"]}})),[]);
  //{"method":"subscribe","params":{"channel":"ticker","symbol":["BTC/USD"]}}
  // Can't pass array of objects into a WebSocket message?

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickChangeSocketUrl}
      >
        Click Me to change Socket Url
      </button>
      <br />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <br />
      <span>
        <br />
        The WebSocket is currently {connectionStatus}
        <br />
        <br />
      </span>
      {lastMessage ? (
        <span>
          Last message: {lastMessage.data}
          <br />
          <br />
        </span>
      ) : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>
            {message ? message.data : null}
            <br />
          </span>
        ))}
      </ul>
    </div>
  );
};
