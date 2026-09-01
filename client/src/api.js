const BASE = "/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${path}`);
  return res.json();
}

export const api = {
  companies: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/companies${qs ? `?${qs}` : ""}`);
  },
  company: (slug) => get(`/companies/${slug}`),
  compare: (slugs) => get(`/compare?slugs=${slugs.join(",")}`),
  dashboard: () => get(`/dashboard`)
};
