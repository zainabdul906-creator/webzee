// Webzee seed data — researched from public sources (company sites, Tracxn,
// TechCrunch, CoinMarketCap, news coverage) as of Aug 2026.
// Figures like valuation/users/volume shift often — each record carries
// `lastUpdated` so the UI can show freshness and flag stale entries.

const companies = [
  {
    slug: "unocoin",
    name: "Unocoin",
    category: "Exchange",
    region: "India",
    founded: 2013,
    founders: ["Sathvik Vishwanath", "Harish B V", "Sunny Ray", "Abhinand Kaseti"],
    headquarters: "Tumkur, Karnataka, India",
    description:
      "India's first crypto exchange, launched in 2013. Runs a BTC/INR trading platform plus a systematic buying plan, crypto lending, an OTC desk, and a point-of-sale app for merchants.",
    funding: {
      totalRaisedUSD: 8800000,
      lastRound: { type: "Series A", amountUSD: 3000000, date: "2020-10-08" },
      investors: ["Blume Ventures", "Mumbai Angels", "Draper Associates", "Blockchain Fond"],
      valuationUSD: null
    },
    metrics: {
      usersApprox: 1300000,
      employeeCount: 67,
      supportedAssets: 120,
      feeStructure: "0.5% flat buy/sell; maker-taker 0%/0.6% on exchange; +18% IGST on fees",
      monthlyVolumeINRApprox: null
    },
    regulatory: {
      fiuRegistered: true,
      notes: "One of the longest-continuously-operating Indian exchanges through the 2018 banking-ban years and 2022 tax changes."
    },
    security: {
      incidents: [
        {
          date: "2017-11",
          title: "Wallet hack",
          summary: "0.25 BTC transferred out of a portion of user accounts; Unocoin reimbursed affected users."
        }
      ]
    },
    newsTimeline: [
      { date: "2013", type: "founding", title: "Unocoin launches as India's first bitcoin exchange" },
      { date: "2014-08-11", type: "funding", title: "Angel round closed" },
      { date: "2020-10-08", type: "funding", title: "Series A round, ~$3M" },
      { date: "2017-11", type: "incident", title: "Wallet hack, 0.25 BTC stolen, users reimbursed" },
      { date: "2024", type: "product", title: "Lightning Network integration with Voltage for cheaper BTC settlement" }
    ],
    lastUpdated: "2026-08-31"
  },
  {
    slug: "wazirx",
    name: "WazirX",
    category: "Exchange",
    region: "India",
    founded: 2018,
    founders: ["Nischal Shetty", "Sameer Mhatre"],
    headquarters: "Mumbai, Maharashtra, India (Binance-affiliated)",
    description:
      "One of India's largest crypto exchanges by historical user count, acquired by Binance in 2019. Suffered a major security breach in July 2024 attributed to the Lazarus Group, which triggered a restructuring and recovery process for affected users.",
    funding: {
      totalRaisedUSD: null,
      lastRound: { type: "Acquisition by Binance", amountUSD: null, date: "2019-11" },
      investors: ["Binance"],
      valuationUSD: null
    },
    metrics: {
      usersApprox: 16000000,
      employeeCount: null,
      supportedAssets: 200,
      feeStructure: "0.2% spot trading fee (pre-hack baseline)",
      monthlyVolumeINRApprox: null
    },
    regulatory: {
      fiuRegistered: true,
      notes: "Registered with India's FIU-IND in 2024 after earlier compliance scrutiny."
    },
    security: {
      incidents: [
        {
          date: "2024-07-18",
          title: "~$235M exploit",
          summary: "Multisig wallet compromise attributed to the Lazarus Group; one of the largest crypto exchange hacks of 2024, leading to a court-supervised restructuring scheme for user fund recovery."
        }
      ]
    },
    newsTimeline: [
      { date: "2018", type: "founding", title: "WazirX founded" },
      { date: "2019-11", type: "acquisition", title: "Acquired by Binance" },
      { date: "2024-07-18", type: "incident", title: "~$235M wallet exploit, Lazarus Group attribution" },
      { date: "2024", type: "regulatory", title: "Restructuring scheme filed to recover and redistribute user funds" }
    ],
    lastUpdated: "2026-08-31"
  },
  {
    slug: "coindcx",
    name: "CoinDCX",
    category: "Exchange",
    region: "India",
    founded: 2018,
    founders: ["Sumit Gupta", "Neeraj Khandelwal"],
    headquarters: "Mumbai, Maharashtra, India",
    description:
      "India's first crypto unicorn (2021). Offers spot, margin and futures trading, staking, lending and Web3 products, with liquidity aggregation across global exchanges.",
    funding: {
      totalRaisedUSD: 247000000,
      lastRound: { type: "Series D / Corporate Minority", amountUSD: null, date: "2025-10-15" },
      investors: ["Coinbase", "Bain Capital Ventures", "Polychain", "Pantera Capital", "Steadview Capital"],
      valuationUSD: 2450000000
    },
    metrics: {
      usersApprox: 20000000,
      employeeCount: 900,
      supportedAssets: 500,
      feeStructure: "0.1% maker/taker on spot (varies by tier); zero-fee promos for API/futures users",
      monthlyVolumeINRApprox: null
    },
    regulatory: {
      fiuRegistered: true,
      notes: "ISO 27001:2022 certified; publishes proof-of-reserve audits."
    },
    security: {
      incidents: []
    },
    newsTimeline: [
      { date: "2018-03", type: "founding", title: "CoinDCX founded by IIT-Bombay alumni" },
      { date: "2021-08", type: "milestone", title: "Becomes India's first crypto unicorn" },
      { date: "2022-04-18", type: "funding", title: "Series D, $135M, valuation crosses $2.1B" },
      { date: "2025-10-15", type: "funding", title: "Coinbase increases stake, valuation reaches $2.45B" }
    ],
    lastUpdated: "2026-08-31"
  },
  {
    slug: "zebpay",
    name: "ZebPay",
    category: "Exchange",
    region: "India",
    founded: 2014,
    founders: ["Mahin Gupta", "Saurabh Agrawal", "Sandeep Goenka"],
    headquarters: "Ahmedabad, India (corporate entity in Singapore)",
    description:
      "One of India's oldest crypto exchanges, paused Indian operations in 2018 during the RBI banking restrictions and relaunched domestically in 2020. Supports 300+ assets with an emphasis on ease of use for newer traders.",
    funding: {
      totalRaisedUSD: 1120000,
      lastRound: { type: "Seed", amountUSD: null, date: "2022-07-12" },
      investors: ["Shardeum-linked seed investors"],
      valuationUSD: null
    },
    metrics: {
      usersApprox: null,
      employeeCount: 197,
      supportedAssets: 300,
      feeStructure: "Maker-taker model, tiered by 30-day volume",
      monthlyVolumeINRApprox: null
    },
    regulatory: {
      fiuRegistered: true,
      notes: "Relaunched India operations in 2020 after the 2018-2020 banking ban period; has processed $10B+ in cumulative fiat volume historically."
    },
    security: {
      incidents: []
    },
    newsTimeline: [
      { date: "2014", type: "founding", title: "ZebPay founded" },
      { date: "2018", type: "regulatory", title: "Suspends INR trading during RBI banking restrictions" },
      { date: "2020", type: "relaunch", title: "Relaunches for Indian users post banking-ban clarity" }
    ],
    lastUpdated: "2026-08-31"
  },
  {
    slug: "coinswitch",
    name: "CoinSwitch",
    category: "Exchange",
    region: "India",
    founded: 2017,
    founders: ["Ashish Singhal", "Govind Soni", "Vimal Sagar Tiwari"],
    headquarters: "Bengaluru, Karnataka, India",
    description:
      "Started as a crypto exchange aggregator (CoinSwitch Kuber) before becoming a full trading platform. Offers a rupee-denominated crypto index, systematic investment plans, and API trading; backed by a16z and Coinbase Ventures.",
    funding: {
      totalRaisedUSD: 300000000,
      lastRound: { type: "Series C", amountUSD: 260000000, date: "2021-10-06" },
      investors: ["a16z", "Coinbase Ventures", "Tiger Global", "Peak XV Partners", "Ribbit Capital", "Paradigm"],
      valuationUSD: 1910000000
    },
    metrics: {
      usersApprox: 25000000,
      employeeCount: 289,
      supportedAssets: 400,
      feeStructure: "0.1%-0.7% depending on product; aggregator model historically offered best-price routing",
      monthlyVolumeINRApprox: null
    },
    regulatory: {
      fiuRegistered: true,
      notes: "FIU-IND registered; revenue reported at ₹73.8 Cr in FY24, down from ₹88.5 Cr in FY23 amid the post-TDS volume slump."
    },
    security: {
      incidents: []
    },
    newsTimeline: [
      { date: "2017", type: "founding", title: "CoinSwitch founded as an exchange-aggregator" },
      { date: "2021-10-06", type: "funding", title: "Series C, $260M, valuation crosses $1.9B (unicorn)" },
      { date: "2022-04", type: "regulatory", title: "30% crypto tax + 1% TDS regime takes effect, volumes fall industry-wide" },
      { date: "2024", type: "product", title: "Launches SmartInvest" }
    ],
    lastUpdated: "2026-08-31"
  }
];

const regulatoryTimeline = [
  { date: "2018-04", title: "RBI banking ban", summary: "RBI directs banks to stop servicing crypto exchanges; exchanges shift to P2P models or pause INR rails." },
  { date: "2020-03-04", title: "Supreme Court overturns RBI ban", summary: "Banking access to crypto exchanges restored." },
  { date: "2022-02-01", title: "30% crypto tax announced", summary: "Union Budget introduces a flat 30% tax on crypto gains, no loss offset." },
  { date: "2022-07-01", title: "1% TDS takes effect", summary: "1% tax deducted at source on crypto transactions above threshold; trading volumes on Indian exchanges drop sharply." },
  { date: "2023-03", title: "Crypto brought under PMLA", summary: "Virtual digital asset service providers brought under India's anti-money-laundering law, requiring FIU-IND registration." },
  { date: "2024", title: "FIU registration enforcement", summary: "FIU-IND blocks access to several non-compliant offshore exchanges; domestic exchanges accelerate compliance filings." }
];

module.exports = { companies, regulatoryTimeline };
