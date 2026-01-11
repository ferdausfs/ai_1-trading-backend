import React, { useState } from "react";
import TradingCard from "../components/TradingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Settings from "../components/Settings";

const BACKEND_URL = "https://ai-1-trading-backend.vercel.app/api/signal";

const Home = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSignals = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      const data = await res.json();
      setSignals(data.signals || []);
    } catch (err) {
      setError("Failed to fetch signals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Ultimate AI Trading Signals</h1>

      <Settings />

      <button onClick={fetchSignals} className="generate-btn">
        Generate Signals
      </button>

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="signals-grid">
        {signals.map((signal, idx) => (
          <TradingCard key={idx} data={signal} />
        ))}
      </div>
    </div>
  );
};

export default Home;