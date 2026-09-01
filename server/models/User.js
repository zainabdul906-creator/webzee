const mongoose = require("mongoose");

// Phase 2 — not wired to any route yet. Kept here so the data model is
// ready when accounts/bookmarks/alerts get built.
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    bookmarkedCompanies: [{ type: String }], // company slugs
    savedComparisons: [
      {
        name: String,
        companySlugs: [String],
        createdAt: { type: Date, default: Date.now }
      }
    ],
    newsAlerts: [
      {
        companySlug: String,
        eventTypes: [String] // e.g. ["incident", "regulatory"]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
