import { useEffect, useState } from "react";
import { api } from "../api";

const ROWS = [
  { label: "Founded", get: (c) => c.founded },
  { label: "Headquarters", get: (c) => c.headquarters },
  { label: "Funding raised", get: (c) => (c.funding?.totalRaisedUSD ? `$${(c.funding.totalRaisedUSD / 1e6).toFixed(1)}M` : "—") },
  { label: "Valuation", get: (c) => (c.funding?.valuationUSD ? `$${(c.funding.valuationUSD / 1e9).toFixed(2)}B` : "—") },
  { label: "Users (approx)", get: (c) => (c.metrics?.usersApprox ? `${(c.metrics.usersApprox / 1e6).toFixed(1)}M` : "—") },
  { label: "Supported assets", get: (c) => c.metrics?.supportedAssets ?? "—" },
  { label: "Fee structure", get: (c) => c.metrics?.feeStructure ?? "—" },
  { label: "FIU-IND registered", get: (c) => (c.regulatory?.fiuRegistered ? "Yes" : "No") },
  { label: "Disclosed incidents", get: (c) => c.security?.incidents?.length ?? 0 }
];

export default function Compare() {
  const [all, setAll] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    api.companies().then(setAll);
  }, []);

  function toggle(slug) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  }

  useEffect(() => {
    if (selected.length >= 2) {
      api.compare(selected).then(setResult);
    } else {
      setResult([]);
    }
  }, [selected]);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Compare companies</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
        Pick 2 to 4 companies to see them side by side.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {all.map((c) => (
          <button
            key={c.slug}
            onClick={() => toggle(c.slug)}
            className="pill"
            style={{
              cursor: "pointer",
              background: selected.includes(c.slug) ? "var(--accent-teal-dim)" : "transparent",
              color: selected.includes(c.slug) ? "var(--accent-teal)" : "var(--text-secondary)",
              borderColor: selected.includes(c.slug) ? "var(--accent-teal)" : "var(--border-strong)"
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {result.length >= 2 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th style={cellStyle(true)}></th>
                {result.map((c) => (
                  <th key={c.slug} style={cellStyle(true)}>{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td style={{ ...cellStyle(false), color: "var(--text-muted)" }}>{row.label}</td>
                  {result.map((c) => (
                    <td key={c.slug} style={cellStyle(false)}>{row.get(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function cellStyle(isHeader) {
  return {
    textAlign: "left",
    padding: "12px 16px",
    borderBottom: "1px solid var(--border)",
    fontWeight: isHeader ? 600 : 400,
    fontFamily: isHeader ? "var(--font-display)" : "var(--font-body)",
    whiteSpace: "nowrap"
  };
}
