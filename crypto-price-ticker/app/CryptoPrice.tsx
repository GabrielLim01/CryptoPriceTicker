"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrice = ({ pairs }) => {
  const [askPrice, setAskPrice] = useState(null);
  const [bidPrice, setBidPrice] = useState(null);

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    try {
      const response = await axios.get("https://api.kraken.com/0/public/Ticker?pair=" + pairs.pair);
      setAskPrice(response.data.result[pairs.result].a[0]);
      setBidPrice(response.data.result[pairs.result].b[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="pr-4">Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pr-4">{bidPrice ? `${bidPrice}` : "Loading..."}</td>
            <td>{askPrice ? `${askPrice}` : "Loading..."}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrice;
