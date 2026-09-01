const mongoose = require("mongoose");
const Company = require("./models/Company");
const NewsEvent = require("./models/NewsEvent");
const { companies: seedCompanies, regulatoryTimeline } = require("./data/seed");

let useMongo = false;

// In-memory fallback store, seeded from data/seed.js. Lets `npm run dev`
// work with zero setup. Set MONGODB_URI in .env to use a real database —
// once connected, every function below reads/writes Mongo instead.
const memory = {
  companies: JSON.parse(JSON.stringify(seedCompanies)),
  regulatoryTimeline
};

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("[db] MONGODB_URI not set — running on in-memory seed data.");
    return false;
  }
  try {
    await mongoose.connect(uri);
    useMongo = true;
    console.log("[db] Connected to MongoDB.");
    const count = await Company.countDocuments();
    if (count === 0) {
      console.log("[db] Empty database — seeding companies.");
      await Company.insertMany(seedCompanies);
      const newsDocs = [];
      for (const c of seedCompanies) {
        for (const ev of c.newsTimeline || []) {
          newsDocs.push({ companySlug: c.slug, ...ev });
        }
      }
      await NewsEvent.insertMany(newsDocs);
    }
    return true;
  } catch (err) {
    console.error("[db] MongoDB connection failed, falling back to in-memory data:", err.message);
    useMongo = false;
    return false;
  }
}

async function getAllCompanies({ category, region, q } = {}) {
  if (useMongo) {
    const filter = {};
    if (category) filter.category = category;
    if (region) filter.region = region;
    if (q) filter.$text = { $search: q };
    return Company.find(filter).lean();
  }
  return memory.companies.filter((c) => {
    if (category && c.category !== category) return false;
    if (region && c.region !== region) return false;
    if (q && !`${c.name} ${c.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
}

async function getCompanyBySlug(slug) {
  if (useMongo) return Company.findOne({ slug }).lean();
  return memory.companies.find((c) => c.slug === slug) || null;
}

async function getCompaniesBySlugs(slugs) {
  if (useMongo) return Company.find({ slug: { $in: slugs } }).lean();
  return memory.companies.filter((c) => slugs.includes(c.slug));
}

async function getRegulatoryTimeline() {
  return memory.regulatoryTimeline;
}

function isUsingMongo() {
  return useMongo;
}

module.exports = {
  connect,
  getAllCompanies,
  getCompanyBySlug,
  getCompaniesBySlugs,
  getRegulatoryTimeline,
  isUsingMongo
};
