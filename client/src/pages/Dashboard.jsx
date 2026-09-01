import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.dashboard().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 26, marginBottom: 24 }}>Industry dashboard</h1>

      <div className="card" style={{ padding: "20px 24px", marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, marginBottom: 16, color: "var(--text-secondary)" }}>
          User base by company (approx.)
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.marketShare} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#9aa4b8", fontSize: 12 }} tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#9aa4b8", fontSize: 12 }} width={90} />
            <Tooltip
              contentStyle={{ background: "#1a2230", border: "1px solid #262f40", borderRadius: 8 }}
              labelStyle={{ color: "#e8ecf1" }}
              formatter={(v) => [`${(v / 1e6).toFixed(1)}M users`, ""]}
            />
            <Bar dataKey="users" fill="#00d9c0" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 15, marginBottom: 14, color: "var(--text-secondary)" }}>Regulatory timeline</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.regulatoryTimeline.map((ev, i) => (
              <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 12, color: "var(--accent-amber)", marginBottom: 4 }}>{ev.date}</div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{ev.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{ev.summary}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 15, marginBottom: 14, color: "var(--text-secondary)" }}>Latest news</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.newsFeed.map((ev, i) => (
              <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                  {ev.date} · {ev.companyName}
                </div>
                <div style={{ fontSize: 14 }}>{ev.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
