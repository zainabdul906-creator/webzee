const mongoose = require("mongoose");

// A Company is any business Webzee tracks. `category` and `region` are
// free-ish strings rather than a locked enum so the schema can extend past
// crypto (e.g. SaaS, fintech) without a migration later.
const FundingSchema = new mongoose.Schema(
  {
    totalRaisedUSD: { type: Number, default: null },
    lastRound: {
      type: { type: String, default: null },
      amountUSD: { type: Number, default: null },
      date: { type: String, default: null }
    },
    investors: [{ type: String }],
    valuationUSD: { type: Number, default: null }
  },
  { _id: false }
);

const MetricsSchema = new mongoose.Schema(
  {
    usersApprox: { type: Number, default: null },
    employeeCount: { type: Number, default: null },
    supportedAssets: { type: Number, default: null },
    feeStructure: { type: String, default: null },
    monthlyVolumeINRApprox: { type: Number, default: null }
  },
  { _id: false }
);

const SecurityIncidentSchema = new mongoose.Schema(
  {
    date: String,
    title: String,
    summary: String
  },
  { _id: false }
);

const NewsEventRefSchema = new mongoose.Schema(
  {
    date: String,
    type: {
      type: String,
      enum: ["founding", "funding", "acquisition", "incident", "regulatory", "product", "milestone", "relaunch"]
    },
    title: String
  },
  { _id: false }
);

const CompanySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ["Exchange", "Wallet", "Custody", "DeFi Platform", "Blockchain Infra", "Other"],
      default: "Exchange",
      index: true
    },
    region: { type: String, default: "India", index: true },
    founded: Number,
    founders: [{ type: String }],
    headquarters: String,
    description: String,
    funding: FundingSchema,
    metrics: MetricsSchema,
    regulatory: {
      fiuRegistered: { type: Boolean, default: false },
      notes: String
    },
    security: {
      incidents: [SecurityIncidentSchema]
    },
    newsTimeline: [NewsEventRefSchema],
    lastUpdated: { type: String }
  },
  { timestamps: true }
);

CompanySchema.index({ name: "text", description: "text" });

module.exports = mongoose.models.Company || mongoose.model("Company", CompanySchema);
