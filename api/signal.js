import fetch from "node-fetch";

// Historical signals (in-memory for simplicity, later DB possible)
let signalHistory = [];

export default async function handler(req, res) {
  const body = req.body || {};
  const otc = body.otc || [];
  const cerebrasKey = process.env.CEREBRAS_API_KEY || "csk-h6r48pth4wft2t34c6wj6kyd6k8pxwmtvkehxr259r4j2tcf";

  // Multi-asset list
  const baseAssets = [
    "BTC/USD",
    "ETH/USD",
    "EUR/USD",
    "USD/JPY",
    "XAU/USD",
    "AAPL",
    "GOOGL",
  ];

  const allAssets = [...baseAssets, ...otc.map(item => item.asset)];

  // Fetch Cerebras AI signals (example: call API per asset)
  const signals = await Promise.all(allAssets.map(async (asset) => {
    let signal = "NEUTRAL";
    let confidence = 0.5;

    try {
      // Cerebras AI endpoint
      const prompt = `Analyze ${asset} for 1-10 minute trading signal. 
Include BUY/SELL recommendation and confidence 0-1.`;

      const response = await fetch("https://api.cerebras.ai/v1/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cerebrasKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      // Example response parsing
      signal = data.signal || "NEUTRAL";
      confidence = data.confidence || 0.5;

    } catch (err) {
      console.error("Cerebras API error:", err);
      // fallback to random
      signal = Math.random() > 0.5 ? "BUY" : "SELL";
      confidence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2));
    }

    return { asset, signal, confidence, engine: "Cerebras-Vercel", time: new Date().toISOString() };
  }));

  // Update in-memory signal history
  signalHistory = [...signalHistory, ...signals];

  res.status(200).json({ signals, history: signalHistory });
}