export default function handler(req, res) {
  const assets = [
    // Crypto
    "BTC/USDT",
    "ETH/USDT",
    "SOL/USDT",

    // Forex
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",

    // Commodities
    "XAU/USD",
    "XAG/USD",

    // Indices
    "NASDAQ",
    "SP500",

    // OTC (manual)
    "OTC-EURUSD",
    "OTC-BTC"
  ];

  const signals = assets.map(asset => {
    const r = Math.random();
    return {
      asset,
      signal: r > 0.55 ? "BUY" : "SELL",
      confidence: +(0.6 + Math.random() * 0.35).toFixed(2),
      engine: "vercel-backend",
      timeframe: "1–10 min",
      time: new Date().toISOString()
    };
  });

  res.status(200).json({ signals });
}