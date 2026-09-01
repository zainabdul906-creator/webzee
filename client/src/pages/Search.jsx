import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import CompanyCard from "../components/CompanyCard";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (q) api.companies({ q }).then(setResults);
  }, [q]);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>
        Results for "{q}" <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({results.length})</span>
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {results.map((c) => (
          <CompanyCard key={c.slug} company={c} />
        ))}
      </div>
      {results.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>No companies matched. Try a different name.</p>
      )}
    </div>
  );
}
