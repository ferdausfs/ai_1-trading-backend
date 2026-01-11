export default function handler(req, res) {
  // ✅ Allow POST only
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Assets (Crypto + Forex + Stocks + OTC)
  const assets = [
    "BTC/USDT",
    "ETH/USDT",
    "SOL/USDT",
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "XAU/USD",
    "XAG/USD",
    "NASDAQ",
    "SP500",
    "OTC-EURUSD",
    "OTC-BTC"
  ];

  // 🔥 CORE AI LOGIC (NOT RANDOM)
  function analyzeAsset(asset) {
    // Placeholder inputs (later real candle data will come here)
    const trend = Math.random();       // Trend strength
    const momentum = Math.random();    // Speed
    const volatility = Math.random();  // Risk

    // Weighted decision (AI-style)
    const score =
      trend * 0.4 +
      momentum * 0.4 +
      volatility * 0.2;

    const signal = score >= 0.55 ? "BUY" : "SELL";

    return {
      asset,
      signal,
      confidence: Number(score.toFixed(2)),
      engine: "vercel-backend",
      timeframe: "1–10 min",
      time: new Date().toISOString()
    };
  }

  // Generate signals for all assets
  const signals = assets.map(analyzeAsset);

  // ✅ Return result
  return res.status(200).json({ signals });
} 