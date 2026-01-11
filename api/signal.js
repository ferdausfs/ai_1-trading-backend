export default function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // public testing
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  // ✅ Assets (Crypto + Forex + Stocks + OTC)
  const assets = [
    "BTC/USDT", "ETH/USDT", "SOL/USDT",
    "EUR/USD", "GBP/USD", "USD/JPY",
    "XAU/USD", "XAG/USD", "NASDAQ", "SP500",
    "OTC-EURUSD", "OTC-BTC", "OTC-USDJPY"
  ];

  // 🔥 Core Signal Logic (placeholder deterministic)
  function analyzeAsset(asset) {
    const trend = Math.random();       // Trend strength
    const momentum = Math.random();    // Speed
    const volatility = Math.random();  // Risk

    const score = trend*0.4 + momentum*0.4 + volatility*0.2;
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

  const signals = assets.map(analyzeAsset);

  res.status(200).json({ signals });
}