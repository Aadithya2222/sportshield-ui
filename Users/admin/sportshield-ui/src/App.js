import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoScan, setAutoScan] = useState(false);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [compareResult, setCompareResult] = useState(null);

  const API = "https://sportshield-vgy4.onrender.com";

  // 🔍 Scan
  const scanYouTube = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/youtube-scan`);
      const data = await res.json();

      // 🔥 SORT (highest similarity first)
      const sorted = (data.results || []).sort(
        (a, b) => b.similarity - a.similarity
      );

      setResults(sorted);
    } catch {
      alert("Scan failed");
    }
    setLoading(false);
  };

  // ⚡ Auto scan
  useEffect(() => {
    if (!autoScan) return;

    scanYouTube();

    const interval = setInterval(scanYouTube, 30000);
    return () => clearInterval(interval);
  }, [autoScan]);

  // 🎥 Compare
  const compareVideos = async () => {
    if (!file1 || !file2) {
      alert("Upload both videos");
      return;
    }

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const res = await fetch(`${API}/compare`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setCompareResult(data);
    } catch {
      alert("Comparison failed");
    }
  };

  // 🎨 Colors
  const getColor = (status) => {
    if (status.includes("Exact")) return "#ef4444";
    if (status.includes("Modified")) return "#f59e0b";
    return "#22c55e";
  };

  // 📊 Stats
  const total = results.length;
  const flagged = results.filter((r) =>
    r.status.includes("Exact")
  ).length;
  const modified = results.filter((r) =>
    r.status.includes("Modified")
  ).length;

  return (
    <div className="app">
      <h1>🎯 SportShield Dashboard</h1>
      <p>Real-time Unauthorized Media Detection</p>

      {/* CONTROLS */}
      <div className="controls">
        <button onClick={scanYouTube}>🔍 Scan Once</button>
        <button onClick={() => setAutoScan(!autoScan)}>
          {autoScan ? "⛔ Stop Auto Scan" : "⚡ Auto Scan"}
        </button>
      </div>

      {/* STATUS */}
      <p className="status-live">
        {loading ? "🔄 Scanning..." : "🟢 System Active"}
      </p>

      {/* 📊 STATS */}
      <div className="stats">
        <div className="stat">📊 Total: {total}</div>
        <div className="stat red">🚨 Exact: {flagged}</div>
        <div className="stat yellow">⚠ Modified: {modified}</div>
      </div>

      {/* RESULTS */}
      <div className="grid">
        {results.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${item.videoId}`,
                "_blank"
              )
            }
          >
            <img src={item.thumbnail} alt="thumb" />
            <h3>{item.title}</h3>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${item.similarity}%`,
                  background: getColor(item.status),
                }}
              ></div>
            </div>

            <p>Similarity: {item.similarity}%</p>
            <p style={{ color: getColor(item.status) }}>
              {item.status}
            </p>
          </div>
        ))}
      </div>

      {/* UPLOAD */}
      <div className="upload-section">
        <h2>🎥 Compare Your Videos</h2>

        <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
        <input type="file" onChange={(e) => setFile2(e.target.files[0])} />

        <button onClick={compareVideos}>⚡ Compare</button>

        {compareResult && (
          <div className="compare-box">
            <h3>Similarity: {compareResult.similarity}%</h3>
            <p>{compareResult.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;