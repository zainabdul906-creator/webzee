import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

export default function CompanyProfile() {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setCompany(null);
    setNotFound(false);
    api.company(slug).catch(() => setNotFound(true)).then((c) => c && setCompany(c));
  }, [slug]);

  if (notFound) {
    return (
      <div className="container" style={{ paddingTop: 64 }}>
        <p>Couldn't find that company. <Link to="/" style={{ color: "var(--accent-teal)" }}>Back to search</Link></p>
      </div>
    );
  }
  if (!company) return null;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64, maxWidth: 860 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 30 }}>{company.name}</h1>
            <span className="pill">{company.category}</span>
            {company.regulatory?.fiuRegistered && (
              <span className="pill" style={{ color: "var(--accent-teal)", borderColor: "var(--accent-teal-dim)" }}>
                FIU-IND registered
              </span>
            )}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
            Founded {company.founded} · {company.headquarters}
          </p>
        </div>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Updated {company.lastUpdated}</span>
      </div>

      <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "20px 0 32px", fontSize: 15 }}>
        {company.description}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
        <InfoCard title="Founders">
          {company.founders?.join(", ") || "—"}
        </InfoCard>
        <InfoCard title="Funding">
          {company.funding?.totalRaisedUSD
            ? `$${(company.funding.totalRaisedUSD / 1e6).toFixed(1)}M raised`
            : "Not disclosed"}
          {company.funding?.valuationUSD && (
            <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>
              Valuation: ${(company.funding.valuationUSD / 1e9).toFixed(2)}B
            </div>
          )}
        </InfoCard>
        <InfoCard title="Users">
          {company.metrics?.usersApprox ? `~${(company.metrics.usersApprox / 1e6).toFixed(1)}M` : "Not disclosed"}
        </InfoCard>
        <InfoCard title="Fee structure">{company.metrics?.feeStructure || "—"}</InfoCard>
        <InfoCard title="Supported assets">{company.metrics?.supportedAssets || "—"}</InfoCard>
        <InfoCard title="Employees">{company.metrics?.employeeCount || "Not disclosed"}</InfoCard>
      </div>

      {company.regulatory?.notes && (
        <InfoCard title="Regulatory notes" full>
          {company.regulatory.notes}
        </InfoCard>
      )}

      <h2 style={{ fontSize: 16, margin: "32px 0 14px" }}>Timeline</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {company.newsTimeline?.map((ev, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: "12px 0",
              borderTop: i > 0 ? "1px solid var(--border)" : "none"
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-muted)", width: 90, flexShrink: 0 }}>{ev.date}</span>
            <span
              className="pill"
              style={{
                height: "fit-content",
                color: ev.type === "incident" ? "var(--accent-red)" : "var(--text-secondary)",
                borderColor: ev.type === "incident" ? "var(--accent-red-dim)" : "var(--border-strong)"
              }}
            >
              {ev.type}
            </span>
            <span style={{ fontSize: 14 }}>{ev.title}</span>
          </div>
        ))}
      </div>

      {company.security?.incidents?.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, margin: "32px 0 14px", color: "var(--accent-red)" }}>Security incidents</h2>
          {company.security.incidents.map((inc, i) => (
            <div key={i} className="card" style={{ padding: 16, marginBottom: 10, borderColor: "var(--accent-red-dim)" }}>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>{inc.date}</div>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>{inc.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{inc.summary}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function InfoCard({ title, children, full }) {
  return (
    <div className="card" style={{ padding: 16, gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
