import React, { useState, useEffect } from "react";
import TradingCard from "../components/TradingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Settings from "../components/Settings";
import OTCDataReader from "../components/OTCDataReader";

const BACKEND_URL = "https://ai-1-trading-backend.vercel.app/api/signal"; // your Vercel URL

const Home = () => {
  const [signals, setSignals] = useState([]);
  const [otcData, setOtcData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSignals = async (otcSnapshot = []) => {
    setLoading(true);
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otc: otcSnapshot })
      });
      const data = await res.json();
      setSignals(data.signals || []);
    } catch (err) {
      console.error("Error fetching signals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals(otcData); // initial fetch
    const interval = setInterval(() => fetchSignals(otcData), 60000); // 1-min interval
    return () => clearInterval(interval);
  }, [otcData]);

  return (
    <div className="home-container">
      <h1>Ultimate AI Trading Signals</h1>
      <Settings />
      <OTCDataReader onData={setOtcData} />
      {loading ? <LoadingSpinner /> : (
        <div className="signals-grid">
          {signals.map((signal, idx) => <TradingCard key={idx} data={signal} />)}
        </div>
      )}
    </div>
  );
};

export default Home;