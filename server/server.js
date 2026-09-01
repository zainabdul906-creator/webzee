require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const companiesRouter = require("./routes/companies");
const compareRouter = require("./routes/compare");
const dashboardRouter = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/api/companies", companiesRouter);
app.use("/api/compare", compareRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", db: db.isUsingMongo() ? "mongodb" : "in-memory" });
});

db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Webzee API running on http://localhost:${PORT}`);
  });
});
