import React from "react";

const ResultPopup = ({ signal, onSubmit }) => {
  if (!signal) return null;

  return (
    <div className="result-popup">
      <h3>{signal.asset} - {signal.signal}</h3>
      <p>Confidence: {signal.confidence}</p>
      <button onClick={() => onSubmit(signal, true)}>Win ✅</button>
      <button onClick={() => onSubmit(signal, false)}>Loss ❌</button>
    </div>
  );
};

export default ResultPopup;