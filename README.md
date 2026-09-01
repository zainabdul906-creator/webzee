# Webzee

A crypto company research, analysis, and comparison platform — focused on
Indian exchanges (Unocoin, WazirX, CoinDCX, ZebPay, CoinSwitch), built to
extend to any industry later.

## Stack

- **Frontend**: React (Vite) + React Router + Recharts
- **Backend**: Node.js + Express
- **Database**: MongoDB via Mongoose — with an in-memory fallback seeded
  from real data so it runs with zero setup

## Run it locally

Two terminals:

```bash
# Terminal 1 — API
cd server
npm install
npm run dev          # http://localhost:5050

# Terminal 2 — frontend
cd client
npm install
npm run dev           # http://localhost:5173
```

That's it — no database required to try it. `server/db.js` seeds itself
from `server/data/seed.js` in memory.

## Connecting a real MongoDB (production)

1. Create a free cluster on MongoDB Atlas.
2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
3. Restart the server — it will auto-connect and seed the empty database
   from `data/seed.js` on first run. To reseed later: `npm run seed`.

## What's built (MVP)

- Homepage — search, industry stat cards, company grid
- Company profile pages (`/company/:slug`) — founders, funding, fees, users,
  regulatory status, security incident history, timeline
- Comparison tool (`/compare`) — pick 2-4 companies, side-by-side table
- Industry dashboard (`/dashboard`) — user-base bar chart, regulatory
  timeline, aggregated news feed
- Search (`/search`) — name/description matching with category filters
  available in the API (`?category=`, `?region=`)

## Data model

- `Company` — profile, funding, metrics, regulatory status, embedded
  security incidents and a news timeline
- `Metric` — time-series records (volume, users, fees over time) for future
  trend charts — schema is ready, not yet populated
- `NewsEvent` — standalone news/incident/funding events per company, for a
  cross-company news feed
- `User` — accounts, bookmarks, saved comparisons, alerts (schema ready,
  no routes yet — phase 2)

## Phase 2 (not built yet)

- User accounts, bookmarking, saved comparisons, news alerts
- Admin dashboard for editing company data without touching code
- Live data feeds (CoinGecko/CoinMarketCap for market data, a news API for
  incidents) instead of manually maintained seed data

## A note on the data

Company profiles here were compiled from public sources (company sites,
Tracxn, TechCrunch, CoinMarketCap, and news coverage) as of August 2026.
Fields like valuation, user counts, and funding totals change often and
some are not publicly disclosed (shown as "Not disclosed"). Before this
goes fully public, add a visible disclaimer and a correction-request path
— you're publishing financial and security claims about real companies.
