const SIGNAL_HISTORY_KEY = "signalHistory";

// Save result
export function saveSignalResult(signal, isWin) {
  const history = JSON.parse(localStorage.getItem(SIGNAL_HISTORY_KEY) || "[]");
  history.push({ ...signal, win: isWin, timeRecorded: new Date().toISOString() });
  localStorage.setItem(SIGNAL_HISTORY_KEY, JSON.stringify(history));
}

// Load history
export function loadSignalHistory() {
  return JSON.parse(localStorage.getItem(SIGNAL_HISTORY_KEY) || "[]");
}

// Adaptive score adjustment (placeholder)
export function adjustWeights(asset, history) {
  // Example: increase weight if recent wins, decrease if losses
  const recent = history.filter(h => h.asset === asset).slice(-5);
  let trend = 0.4, momentum = 0.4, volatility = 0.2;
  const wins = recent.filter(r => r.win).length;
  if (wins >= 3) trend += 0.05;
  if (recent.length - wins >= 3) momentum -= 0.05;
  return { trend, momentum, volatility };
}