const mongoose = require("mongoose");

// Time-series records so trend charts (volume, fees, users over time) can
// be built without cramming history into the Company document itself.
const MetricSchema = new mongoose.Schema(
  {
    companySlug: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    metricType: {
      type: String,
      enum: ["trading_volume_inr", "user_count", "fee_pct", "market_share_pct"],
      required: true,
      index: true
    },
    value: { type: Number, required: true },
    source: { type: String, default: null }
  },
  { timestamps: true }
);

MetricSchema.index({ companySlug: 1, metricType: 1, date: 1 });

module.exports = mongoose.models.Metric || mongoose.model("Metric", MetricSchema);
