const mongoose = require("mongoose");

// Standalone news/incident/funding events, linked back to a company by
// slug. Kept separate from Company so the industry-wide news feed can
// query across all companies in one collection scan.
const NewsEventSchema = new mongoose.Schema(
  {
    companySlug: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["founding", "funding", "acquisition", "incident", "regulatory", "product", "milestone", "relaunch"],
      required: true,
      index: true
    },
    title: { type: String, required: true },
    summary: { type: String, default: null },
    sourceUrl: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.models.NewsEvent || mongoose.model("NewsEvent", NewsEventSchema);
