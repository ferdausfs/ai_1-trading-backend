import React, { useState, useEffect } from "react";
import TradingCard from "../components/TradingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Settings from "../components/Settings";
import OTCDataReader from "../components/OTCDataReader";
import ResultPopup from "../components/ResultPopup";
import { saveSignalResult, loadSignalHistory } from "../utils/mlEngine";

const Home = () => {
  const [signals, setSignals] = useState([]);
  const [otcData, setOtcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(null);

  const fetchSignals = async (otcSnapshot = []) => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-1-trading-backend.vercel.app/api/signal", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ otc: otcSnapshot }),
});
      });
      const data = await res.json();
      setSignals(data.signals || []);
      if (data.signals.length > 0) setCurrentPopup(data.signals[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResult = (signal, isWin) => {
    saveSignalResult(signal, isWin);
    const nextSignal = signals.find(s => s.asset !== signal.asset);
    setCurrentPopup(nextSignal || null);
  };

  useEffect(() => {
    if (otcData.length > 0) fetchSignals(otcData);
  }, [otcData]);

  return (
    <div className="home-container">
      <h1>Ultimate AI Trading Signals</h1>
      <Settings />
      <OTCDataReader onData={setOtcData} />
      {loading ? <LoadingSpinner /> : (
        <div className="signals-grid">
          {signals.map((signal, idx) => (
            <TradingCard key={idx} data={signal} />
          ))}
        </div>
      )}
      <ResultPopup signal={currentPopup} onSubmit={handleResult} />
    </div>
  );
};

export default Home;