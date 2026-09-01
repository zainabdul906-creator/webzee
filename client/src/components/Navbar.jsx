import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        background: "rgba(10,14,20,0.9)",
        backdropFilter: "blur(8px)",
        zIndex: 10
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 24, height: 64 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "var(--accent-teal)",
              display: "inline-block"
            }}
          />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>
            webzee
          </span>
        </Link>

        <form onSubmit={onSearch} style={{ flex: 1, maxWidth: 480 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a company — Unocoin, WazirX, CoinDCX…"
            style={{
              width: "100%",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "9px 14px",
              color: "var(--text-primary)",
              fontSize: 14,
              outline: "none"
            }}
          />
        </form>

        <nav style={{ display: "flex", gap: 20, fontSize: 14, color: "var(--text-secondary)" }}>
          <Link to="/compare">Compare</Link>
          <Link to="/dashboard">Industry dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
