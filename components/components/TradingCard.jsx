import React from "react";

const TradingCard = ({ data }) => {
  const { asset, signal, confidence, time } = data;

  return (
    <div className="trading-card">
      <h3>{asset}</h3>
      <p>Signal: {signal}</p>
      <p>Confidence: {confidence}</p>
      <p>Time: {new Date(time).toLocaleTimeString()}</p>
    </div>
  );
};

export default TradingCard;
