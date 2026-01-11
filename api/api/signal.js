export default async function handler(req, res) {
  // Example multi-asset signals
  const assets = [
    "BTC/USD", "ETH/USD", "XRP/USD", "EUR/USD", "GBP/USD",
    "Gold", "Silver", "S&P500", "DowJones", "USD/JPY"
  ];

  const signals = assets.map(asset => {
    return {
      asset,
      signal: Math.random() > 0.5 ? "BUY" : "SELL",
      confidence: +(Math.random() * 0.5 + 0.5).toFixed(2),
      engine: "vercel-backend",
      time: new Date().toISOString()
    };
  });

  res.status(200).json({ signals });
}
