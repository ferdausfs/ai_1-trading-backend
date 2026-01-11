export default function handler(req, res) {
  if (req.method === 'POST') {
    const { asset, timeframe, indicators } = req.body;

    // Dummy signal logic
    const signal = Math.random() > 0.5 ? "BUY" : "SELL";
    const confidence = (Math.random() * 0.5 + 0.5).toFixed(2);

    res.status(200).json({
      asset,
      timeframe,
      signal,
      confidence: parseFloat(confidence),
      engine: "vercel-backend",
      time: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
