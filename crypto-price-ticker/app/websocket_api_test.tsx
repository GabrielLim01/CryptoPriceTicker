"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketDemo4 = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://ws.kraken.com/v2");
  // const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>[];
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // Added May 16, 2025, 9:30am
  const [askPrice, setAskPrice] = useState(null);
  const [bidPrice, setBidPrice] = useState(null);
  const [askQuantity, setAskQuantity] = useState(null);
  const [bidQuantity, setBidQuantity] = useState(null);

  const [currentPrice, setCurrentPrice] = useState([]);
  const [prevPrice, setPrevPrice] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [colorIndicators, setColorIndicators] = useState([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));

      // console.log("Data received!");
      // console.log("TYPE OF: " + typeof(lastMessage.data));
      // console.log("DATA: " + lastMessage.data);

      let json = JSON.parse(lastMessage.data);

      if (json.data != null) {
        // console.log(json.data);
        // console.log(json.data[0].ask);
        // console.log(json.data[0].bid);
        if (json.data[0].ask != undefined) {
          setPrevPrice(currentPrice);
          console.log("Prev Price: " + prevPrice);

          setAskPrice(json.data[0].ask);
          setBidPrice(json.data[0].bid);
          setAskQuantity(json.data[0].ask_qty);
          setBidQuantity(json.data[0].bid_qty);

          let newPrice = [
            JSON.stringify(json.data[0].bid),
            JSON.stringify(json.data[0].bid_qty),
            JSON.stringify(json.data[0].ask),
            JSON.stringify(json.data[0].ask_qty),
          ];

          setCurrentPrice(newPrice);
          console.log("Current Price: " + newPrice);

          setPriceHistory((prev) => prev.concat([currentPrice]));
          console.log("Price History: " + priceHistory);

          let colorIndicators = [];

          for (let i = 0; i < prevPrice.length; i++) {
            for (let j = 0; j < currentPrice.length; j++) {
              if (i == j) {
                if (prevPrice[i] > currentPrice[j]) {
                  colorIndicators[i] = "bg-green-300";
                } else if (prevPrice[i] == currentPrice[j]) {
                  colorIndicators[i] = "";
                } else {
                  colorIndicators[i] = "bg-red-300";
                }
              }
            }
          }

          console.log("Current color indicators: " + colorIndicators);
          setColorIndicators((prev) => prev.concat([colorIndicators]));

          // priceHistory.map(x => console.log(x));
        }
      }
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://ws.kraken.com/v2"),
    []
  );

  // wrong string message
  // const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);
  const handleClickSendMessage = useCallback(
    () =>
      sendMessage(
        JSON.stringify({
          method: "subscribe",
          params: { channel: "ticker", symbol: ["BTC/USD"] },
        })
      ),
    []
  );
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
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickChangeSocketUrl}
      >
        Click Me to change Socket Url
      </button>
      <br />
      <br /> */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Bitcoin to USD
      </h1>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Establish WebSocket Connection
      </button>
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
        onClick={}
        disabled={readyState !== ReadyState.CLOSED}
      >
        Close WebSocket Connection
      </button> */}
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
      {/* <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>
            {message ? message.data : null}
            <br />
          </span>
        ))}
      </ul> */}
      {/* <ul>
        {priceHistory.map((x) => (
          <span key={x}>
            {x ? x : null}
            <br />
          </span>
        ))}
      </ul> */}
      <hr />
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="pr-4">Bid</th>
              <th>Bid Quantity</th>
              <th>Ask</th>
              <th>Ask Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-4">
                {bidPrice ? `${bidPrice}` : "Loading..."}
              </td>
              <td>{bidQuantity ? `${bidQuantity}` : "Loading..."}</td>
              <td>{askPrice ? `${askPrice}` : "Loading..."}</td>
              <td>{askQuantity ? `${askQuantity}` : "Loading..."}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          History
        </h1>
        <br />
        <hr />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="pr-4">Bid</th>
              <th>Bid Quantity</th>
              <th>Ask</th>
              <th>Ask Quantity</th>
            </tr>
          </thead>
          <tbody>
            {priceHistory.map((value, index) => {
              const color = colorIndicators[index];

              if (color != undefined) {
                return (
                  <tr key={value}>
                    <td className={`pr-4 ${color[0]}`}>{value[0]}</td>
                    <td className={color[1]}>{value[1]}</td>
                    <td className={color[2]}>{value[2]}</td>
                    <td className={color[3]}>{value[3]}</td>
                  </tr>
                );
              } else {
              return (
                <tr key={value}>
                  <td className={`pr-4`}>{value[0]}</td>
                  <td>{value[1]}</td>
                  <td>{value[2]}</td>
                  <td>{value[3]}</td>
                </tr>
              );
                }
            })}
            
          </tbody>
        </table>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
