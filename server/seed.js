// Run with `npm run seed` after setting MONGODB_URI in .env.
// Wipes and reloads Company + NewsEvent collections from data/seed.js.
require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("./models/Company");
const NewsEvent = require("./models/NewsEvent");
const { companies } = require("./data/seed");

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("Set MONGODB_URI in .env before seeding.");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected. Clearing existing companies/news...");
  await Company.deleteMany({});
  await NewsEvent.deleteMany({});

  await Company.insertMany(companies);
  const newsDocs = companies.flatMap((c) =>
    (c.newsTimeline || []).map((ev) => ({ companySlug: c.slug, ...ev }))
  );
  await NewsEvent.insertMany(newsDocs);

  console.log(`Seeded ${companies.length} companies and ${newsDocs.length} news events.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
