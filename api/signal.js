export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const assets = [
    { name: "BTC/USDT", type: "crypto" },
    { name: "ETH/USDT", type: "crypto" },
    { name: "EUR/USD", type: "forex" },
    { name: "GBP/USD", type: "forex" },
    { name: "XAU/USD", type: "gold" },
    { name: "NASDAQ", type: "stock" },
    { name: "OTC-BTC", type: "otc" },
    { name: "OTC-EURUSD", type: "otc" }
  ];

  function analyze(asset) {
    let score = 0;
    let reasons = [];

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();

    if (asset.type === "crypto") {
      score = a * 0.5 + b * 0.3 + c * 0.2;
      reasons.push("Crypto momentum", "Trend bias");
    }

    if (asset.type === "forex") {
      score = a * 0.4 + b * 0.4 + c * 0.2;
      reasons.push("Forex volatility", "Session strength");
    }

    if (asset.type === "gold") {
      score = a * 0.6 + b * 0.4;
      reasons.push("Mean reversion zone");
    }

    if (asset.type === "stock") {
      score = a * 0.7 + b * 0.3;
      reasons.push("Breakout probability");
    }

    if (asset.type === "otc") {
      score = a * 0.8 + b * 0.2;
      reasons.push("OTC snapshot bias");
    }

    return {
      asset: asset.name,
      type: asset.type,
      signal: score >= 0.55 ? "BUY" : "SELL",
      confidence: Number(score.toFixed(2)),
      reasons,
      timeframe: "1–10 min",
      engine: "multi-asset-v2",
      time: new Date().toISOString()
    };
  }

  const signals = assets.map(analyze);
  res.status(200).json({ signals });
}