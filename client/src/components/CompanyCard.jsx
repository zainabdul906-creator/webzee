import { Link } from "react-router-dom";

function fmtUsers(n) {
  if (!n) return "—";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M users`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K users`;
  return `${n} users`;
}

export default function CompanyCard({ company }) {
  const incidentCount = company.security?.incidents?.length || 0;
  return (
    <Link to={`/company/${company.slug}`} className="card" style={{ display: "block", padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ fontSize: 17 }}>{company.name}</h3>
        <span className="pill">{company.category}</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "8px 0 14px", lineHeight: 1.5, minHeight: 40 }}>
        {company.description?.slice(0, 100)}
        {company.description?.length > 100 ? "…" : ""}
      </p>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)" }}>
        <span>Founded {company.founded}</span>
        <span>{fmtUsers(company.metrics?.usersApprox)}</span>
        {incidentCount > 0 && (
          <span style={{ color: "var(--accent-amber)" }}>
            {incidentCount} incident{incidentCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </Link>
  );
}
