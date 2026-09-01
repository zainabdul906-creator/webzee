const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/dashboard — aggregate industry snapshot for the dashboard page
router.get("/", async (req, res) => {
  const companies = await db.getAllCompanies({});
  const regulatoryTimeline = await db.getRegulatoryTimeline();

  const totalUsers = companies.reduce((sum, c) => sum + (c.metrics?.usersApprox || 0), 0);
  const totalFundingUSD = companies.reduce((sum, c) => sum + (c.funding?.totalRaisedUSD || 0), 0);
  const incidentCount = companies.reduce((sum, c) => sum + (c.security?.incidents?.length || 0), 0);

  const marketShare = companies
    .filter((c) => c.metrics?.usersApprox)
    .map((c) => ({ name: c.name, slug: c.slug, users: c.metrics.usersApprox }))
    .sort((a, b) => b.users - a.users);

  const newsFeed = companies
    .flatMap((c) => (c.newsTimeline || []).map((ev) => ({ ...ev, companyName: c.name, companySlug: c.slug })))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 12);

  res.json({
    summary: { companyCount: companies.length, totalUsers, totalFundingUSD, incidentCount },
    marketShare,
    regulatoryTimeline,
    newsFeed
  });
});

module.exports = router;
