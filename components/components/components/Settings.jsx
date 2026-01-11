import React, { useState } from "react";

const Settings = () => {
  const [cerebrasKey, setCerebrasKey] = useState("");
  const [forexKey, setForexKey] = useState("");
  const [cryptoKey, setCryptoKey] = useState("");

  const saveKeys = () => {
    localStorage.setItem("cerebrasKey", cerebrasKey);
    localStorage.setItem("forexKey", forexKey);
    localStorage.setItem("cryptoKey", cryptoKey);
    alert("API keys saved!");
  };

  return (
    <div className="settings">
      <h3>API Keys</h3>
      <input placeholder="Cerebras AI Key" value={cerebrasKey} onChange={(e) => setCerebrasKey(e.target.value)} />
      <input placeholder="Forex API Key" value={forexKey} onChange={(e) => setForexKey(e.target.value)} />
      <input placeholder="Crypto API Key" value={cryptoKey} onChange={(e) => setCryptoKey(e.target.value)} />
      <button onClick={saveKeys}>Save API Keys</button>
    </div>
  );
};

export default Settings;
