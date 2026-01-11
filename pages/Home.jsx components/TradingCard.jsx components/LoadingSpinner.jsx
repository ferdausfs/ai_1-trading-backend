import React, { useState, useEffect } from "react";
import TradingCard from "../components/TradingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Settings from "../components/Settings";

const Home = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch signals from backend
  const fetchSignals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/signal");
      const data = await res.json();
      setSignals(data.signals || []);
    } catch (err) {
      console.error("Error fetching signals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 60000); // fetch every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <h1>Ultimate AI Trading Signals</h1>
      <Settings />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="signals-grid">
          {signals.map((signal, idx) => (
            <TradingCard key={idx} data={signal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
