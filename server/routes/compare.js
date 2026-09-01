const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/compare?slugs=unocoin,wazirx,coindcx
router.get("/", async (req, res) => {
  const slugsParam = req.query.slugs;
  if (!slugsParam) return res.status(400).json({ error: "Provide ?slugs=a,b,c (2-4 company slugs)" });
  const slugs = slugsParam.split(",").map((s) => s.trim()).filter(Boolean);
  if (slugs.length < 2 || slugs.length > 4) {
    return res.status(400).json({ error: "Provide between 2 and 4 company slugs" });
  }
  const companies = await db.getCompaniesBySlugs(slugs);
  res.json(companies);
});

module.exports = router;
