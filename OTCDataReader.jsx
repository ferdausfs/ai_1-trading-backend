import React, { useEffect } from "react";

const OTCDataReader = ({ onData }) => {
  useEffect(() => {
    // Example: detect price changes from DOM (placeholder)
    // Later replace with real platform DOM/WebSocket logic
    const interval = setInterval(() => {
      const otcSnapshot = [
        { asset: "OTC-EURUSD", trend: Math.random(), momentum: Math.random(), volatility: Math.random() },
        { asset: "OTC-BTC", trend: Math.random(), momentum: Math.random(), volatility: Math.random() },
        { asset: "OTC-ETHUSD", trend: Math.random(), momentum: Math.random(), volatility: Math.random() },
        { asset: "OTC-USDJPY", trend: Math.random(), momentum: Math.random(), volatility: Math.random() },
      ];
      onData(otcSnapshot);
    }, 5000); // Every 5 sec
    return () => clearInterval(interval);
  }, [onData]);

  return <div style={{ display: "none" }} />;
};

export default OTCDataReader;