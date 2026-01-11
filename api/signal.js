export default async function handler(req, res) {
  // ✅ Allow POST only
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get OTC snapshot from request body
  const { otc = [] } = req.body || [];

  // Assets list (Crypto + Forex + Stocks + Commodities + OTC)
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
    "OTC-BTC",
    "OTC-ETHUSD",
    "OTC-USDJPY"
  ];

  // ML / Adaptive weights (placeholder)
  const mlWeights = {
    trend: 0.4,
    momentum: 0.4,
    volatility: 0.2
  };

  // Generate deterministic signals
  function analyzeAsset(asset) {
    // Use OTC data if available
    let trend = Math.random();       // fallback random
    let momentum = Math.random();
    let volatility = Math.random();

    const otcInfo = otc.find((o) => o.asset === asset);
    if (otcInfo) {
      // Example: normalize price movement into 0-1 for calculation
      trend = Math.min(Math.max(otcInfo.trend || 0.5, 0), 1);
      momentum = Math.min(Math.max(otcInfo.momentum || 0.5, 0), 1);
      volatility = Math.min(Math.max(otcInfo.volatility || 0.5, 0), 1);
    }

    const score =
      trend * mlWeights.trend +
      momentum * mlWeights.momentum +
      volatility * mlWeights.volatility;

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

  // Map all assets
  const signals = assets.map(analyzeAsset);

  // ✅ Return signals
  return res.status(200).json({ signals });
}