const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/companies?category=Exchange&region=India&q=coin
router.get("/", async (req, res) => {
  const { category, region, q } = req.query;
  const companies = await db.getAllCompanies({ category, region, q });
  res.json(companies);
});

// GET /api/companies/:slug
router.get("/:slug", async (req, res) => {
  const company = await db.getCompanyBySlug(req.params.slug);
  if (!company) return res.status(404).json({ error: "Company not found" });
  res.json(company);
});

module.exports = router;
