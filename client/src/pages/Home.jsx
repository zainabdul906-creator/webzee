import { useEffect, useState } from "react";
import { api } from "../api";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.companies().then(setCompanies);
    api.dashboard().then(setDashboard);
  }, []);

  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 64 }}>
      <div style={{ maxWidth: 640, marginBottom: 48 }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Research any crypto company before you trust it with your money.
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 16, lineHeight: 1.6 }}>
          Founders, funding, fees, regulatory status, and security history — for Indian exchanges
          like Unocoin, WazirX, and CoinDCX, side by side.
        </p>
      </div>

      {dashboard && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 48
          }}
        >
          <Stat label="Companies tracked" value={dashboard.summary.companyCount} />
          <Stat label="Combined users" value={`${(dashboard.summary.totalUsers / 1e6).toFixed(1)}M`} />
          <Stat
            label="Combined funding"
            value={`$${(dashboard.summary.totalFundingUSD / 1e6).toFixed(0)}M`}
          />
          <Stat label="Disclosed incidents" value={dashboard.summary.incidentCount} tone="amber" />
        </div>
      )}

      <h2 style={{ fontSize: 18, marginBottom: 16 }}>Companies</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {companies.map((c) => (
          <CompanyCard key={c.slug} company={c} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{label}</div>
      <div
        style={{
          fontSize: 26,
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: tone === "amber" ? "var(--accent-amber)" : "var(--text-primary)"
        }}
      >
        {value}
      </div>
    </div>
  );
}
