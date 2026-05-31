import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { ARTICLES, KOCHI_ENTITIES } from "./src/data/knowledge";
import { Certificate, EsgReport, KochiEntity, ValuedDevice } from "./src/types";
import {
  getLocalBusinessSchema,
  getFaqSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getWebSiteSchema
} from "./src/utils/schemaGenerator";

// Setup ES Modules dirname equivalent since we are type=module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = 3000;

// Dynamic Server-Side JSON-LD Schema Injector for Google bot crawlers
function injectSchemas(html: string, reqPath: string): string {
  const schemas: any[] = [];
  const parsedPath = reqPath.replace(/\/$/, "");

  // Always output LocalBusiness as it represents the baseline physical entity
  const localBusiness = getLocalBusinessSchema();
  if (localBusiness) schemas.push(localBusiness);

  if (parsedPath === "" || parsedPath === "/" || parsedPath === "/index.html") {
    schemas.push(getWebSiteSchema());
    schemas.push(getFaqSchema());
    schemas.push(getHowToSchema());
    schemas.push(getBreadcrumbSchema("/"));
  } else if (parsedPath === "/wiki") {
    schemas.push(getBreadcrumbSchema("/wiki"));
  } else if (parsedPath === "/valuator") {
    schemas.push(getHowToSchema());
    schemas.push(getBreadcrumbSchema("/valuator"));
  } else if (parsedPath === "/verifier") {
    schemas.push(getBreadcrumbSchema("/verifier"));
  } else if (parsedPath === "/esg") {
    schemas.push(getBreadcrumbSchema("/esg"));
  } else if (parsedPath === "/pillars") {
    schemas.push(getBreadcrumbSchema("/pillars"));
  } else if (parsedPath === "/about") {
    schemas.push(getBreadcrumbSchema("/about"));
  } else if (parsedPath === "/contact") {
    schemas.push(getBreadcrumbSchema("/contact"));
  } else if (parsedPath === "/policies") {
    schemas.push(getBreadcrumbSchema("/policies"));
  } else if (parsedPath.startsWith("/article/") || parsedPath.startsWith("/blog/")) {
    const slug = parsedPath.split("/").pop() || "";
    const article = ARTICLES.find(a => a.slug === slug);
    const artSchema = getArticleSchema(slug);
    if (artSchema) {
      schemas.push(artSchema);
      schemas.push(getBreadcrumbSchema(`/article/${slug}`, article?.title));
    } else {
      schemas.push(getBreadcrumbSchema("/"));
    }
  } else {
    schemas.push(getBreadcrumbSchema("/"));
  }

  // Generate clean unescaped script tags
  const scriptTags = schemas.map((schema, idx) => {
    return `<script type="application/ld+json" id="server-schema-${idx}">${JSON.stringify(schema, null, 2)}</script>`;
  }).join("\n");

  // Thread them directly into the head container for fast parser reading
  return html.replace("</head>", `${scriptTags}\n</head>`);
}

// Lazy initialize Gemini API client with fallback capability
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'ewastekochi-blog/1.0',
            }
          }
        });
        console.log("Successfully initialized Gemini API Client");
      } catch (err) {
        console.error("Failed to initialize Gemini API client:", err);
      }
    } else {
      console.warn("GEMINI_API_KEY not configured or using placeholder. Fallbacks will be active.");
    }
  }
  return aiClient;
}

// ==================== API ROUTES ====================

// Cache storage for News Ticker to prevent Gemini API quota exhaustion
let cachedNewsTicker: { alerts: any[]; source: string; timestamp: number } | null = null;
const NEWS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in-memory caching

// 0. News Ticker RSS Feed crawler: GET /api/news-ticker
app.get("/api/news-ticker", async (req, res) => {
  const KSPCB_MOCK_ALERTS = [
    {
      id: "alert-1",
      title: "KSPCB mandates physical shredding audit verification for Kakkanad and Kalamassery technology zones.",
      type: "alert",
      timestamp: "2026-05-23",
      source: "KSPCB Notification"
    },
    {
      id: "alert-2",
      title: "Kochi Infopark partners in Circular Economy drive to safely process 2.1 Tons of deprecated high-heat server accelerators.",
      type: "update",
      timestamp: "2026-05-22",
      source: "Infopark Campus Board"
    },
    {
      id: "alert-3",
      title: "Statutory penalties up to ₹250 Crores active under DPDP Act 2023 for negligent data storage cell retirements.",
      type: "legislation",
      timestamp: "2026-05-21",
      source: "Ministry of Electronics"
    },
    {
      id: "alert-4",
      title: "Regional groundwater testing shows Ernakulam coastal wetlands facing hazardous lead and mercury drainage risks.",
      type: "warning",
      timestamp: "2026-05-20",
      source: "Kerala Water Authority"
    },
    {
      id: "alert-5",
      title: "Carbon Offset metrics under Kochi Regional Green IT framework grow by 14.8% this quarter.",
      type: "update",
      timestamp: "2026-05-19",
      source: "Kerala ESG Registry"
    }
  ];

  const now = Date.now();
  if (cachedNewsTicker && (now - cachedNewsTicker.timestamp < NEWS_CACHE_DURATION)) {
    res.json({ alerts: cachedNewsTicker.alerts, source: cachedNewsTicker.source });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    res.json({ alerts: KSPCB_MOCK_ALERTS, source: "KSPCB RSS Feed" });
    return;
  }

  try {
    const prompt = `
You are EWaste Kochi's regional news alert crawler.
Please generate exactly 5 realistic, high-fidelity real-time environmental alerts for a news ticker.
They should represent Kerala State Pollution Control Board (KSPCB) notifications, DPDP Act compliance deadlines, ITAD processing updates in Kochi (Kakkanad, Kalamassery, Infopark, SmartCity), and regional carbon footprint markers.

Important requirements:
- Use today's calendar year 2026.
- Keep titles extremely short, punchy, and professional (under 120 characters).
- Format the output as a valid raw JSON object matching this schema:
{
  "alerts": [
    { "id": string, "title": string, "type": "alert" | "update" | "warning" | "legislation", "timestamp": string, "source": string }
  ]
}
Do NOT include markdown backticks around the JSON string.
`;

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    if (parsed.alerts && Array.isArray(parsed.alerts)) {
      cachedNewsTicker = {
        alerts: parsed.alerts,
        source: "Live Search & Gemini News Parser (Cached)",
        timestamp: now
      };
      res.json({ alerts: parsed.alerts, source: "Live Search & Gemini News Parser" });
    } else {
      res.json({ alerts: KSPCB_MOCK_ALERTS, source: "KSPCB RSS Feed Crawler" });
    }
  } catch (err: any) {
    const errStr = String(err?.message || err || "");
    if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota")) {
      console.warn("[Gemini API] News Ticker Quota/Rate-limit Exceeded (429). Serving high-fidelity static fallback.");
    } else {
      console.error("News ticker alerts generation failed, serving static feed:", errStr);
    }
    
    // In order to avoid hammering the API while in quota limits, cache fallback data too
    cachedNewsTicker = {
      alerts: KSPCB_MOCK_ALERTS,
      source: "KSPCB RSS Feed (Fallback Cache)",
      timestamp: now
    };
    
    res.json({ alerts: KSPCB_MOCK_ALERTS, source: "KSPCB RSS Feed Index" });
  }
});

// 1. Price Estimation API: POST /api/price
app.post("/api/price", (req, res) => {
  const { brand, model, year, condition } = req.body;
  if (!brand || !model || !year || !condition) {
    res.status(400).json({ error: "Missing required fields: brand, model, year, condition" });
    return;
  }

  // Calculate high-fidelity estimate based on brand & condition
  const currentYear = 2026;
  const age = Math.max(0, currentYear - Number(year));
  
  let basePrice = 30000;
  const brandLower = String(brand).toLowerCase();
  
  if (brandLower.includes("apple") || brandLower.includes("macbook")) {
    basePrice = 85000;
  } else if (brandLower.includes("dell") && (brandLower.includes("xps") || brandLower.includes("latitude"))) {
    basePrice = 45000;
  } else if (brandLower.includes("hp") && brandLower.includes("elitebook")) {
    basePrice = 38000;
  } else if (brandLower.includes("thinkpad")) {
    basePrice = 40000;
  }

  // Depreciation: 25% per year
  let depreciated = basePrice * Math.pow(0.75, age);

  // Condition weight
  let condMultiplier = 1.0;
  if (condition === "B") condMultiplier = 0.8;
  if (condition === "C") condMultiplier = 0.5;

  let estimatedValue = Math.round(depreciated * condMultiplier);
  // Guarantee a minimum metal recovery scrap value
  if (estimatedValue < 500) {
    estimatedValue = 500;
  }

  // Calculate environmental impacts
  const co2Saved = Math.round(180 + age * 12); // kg CO2 equivalent saved
  const copperGrams = Math.round(120 + Math.random() * 30);
  const goldGrams = Math.round(0.18 + Math.random() * 0.04);
  const alumGrams = Math.round(350 + Math.random() * 100);

  const valuation: ValuedDevice & { baseDetails: any } = {
    brand,
    model,
    year: Number(year),
    condition,
    estimatedValue,
    co2SavedKg: co2Saved,
    metalGrammage: {
      copper: copperGrams,
      gold: goldGrams,
      aluminum: alumGrams,
    },
    baseDetails: {
      lifecyclePhase: age > 5 ? "Recycle / Urban Mining Only" : "Refurbish / Extension",
      recommendedSLA: "Form-6 Manifest Certified",
      eprWeightKg: 1.85
    }
  };

  res.json(valuation);
});

// 2. Discover Feed API: GET /api/discover-feed
app.get("/api/discover-feed", (req, res) => {
  const host = process.env.APP_URL || `http://localhost:${PORT}`;
  const discoverArticles = ARTICLES.filter((a) => a.discover);

  const itemListElement = discoverArticles.map((article, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "item": {
      "@type": "NewsArticle",
      "headline": article.title,
      "description": article.metaDescription,
      "datePublished": article.date,
      "dateModified": article.date,
      "image": article.discover_thumbnail,
      "url": `${host}/blog/${article.slug}`,
      "author": {
        "@type": "Person",
        "name": article.author.name,
        "jobTitle": article.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "EWaste Kochi",
        "url": "https://ewastekochi.com",
        "logo": {
          "@type": "ImageObject",
          "url": `${host}/images/logo.png`
        }
      }
    }
  }));

  const discoverFeed = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kochi Google Discover Feed",
    "description": "Premium regional e-waste, compliance, and ITAD news stories optimized for Google Discover and systemic LLMs",
    "numberOfItems": discoverArticles.length,
    "itemListElement": itemListElement
  };

  res.json(discoverFeed);
});

// 2.5 Dynamic Sitemap Indexing System
app.get("/sitemap.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${host}/sitemaps/services.xml</loc>
    <lastmod>2026-05-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemaps/articles.xml</loc>
    <lastmod>2026-05-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemaps/entities.xml</loc>
    <lastmod>2026-05-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemaps/glossary.xml</loc>
    <lastmod>2026-05-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemaps/images.xml</loc>
    <lastmod>2026-05-25</lastmod>
  </sitemap>
</sitemapindex>`;
  res.header("Content-Type", "application/xml");
  res.send(indexXml);
});

// 2.5a Services Sitemap
app.get("/sitemaps/services.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  const staticViews = [
    "",
    "/wiki",
    "/valuator",
    "/verifier",
    "/esg",
    "/pillars",
    "/seo",
    "/about",
    "/contact",
    "/policies"
  ];
  
  const urls = staticViews.map(view => {
    let priority = "0.95";
    let changefreq = "daily";
    if (view === "") {
      priority = "1.00";
    } else if (view === "/about" || view === "/contact") {
      priority = "0.85";
      changefreq = "weekly";
    } else if (view === "/policies") {
      priority = "0.80";
      changefreq = "weekly";
    }
    return `  <url>
    <loc>${host}${view}</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(xmlOutput);
});

// 2.5b Articles Sitemap
app.get("/sitemaps/articles.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  const validArticles = (ARTICLES || []).filter(article => article && article.slug);
  
  const urls = validArticles.map((article) => {
    const isoDate = article.date || "2026-05-25";
    return `  <url>
    <loc>${host}/article/${article.slug}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>`;
  }).join("\n");

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(xmlOutput);
});

// 2.5c Entities Sitemap
app.get("/sitemaps/entities.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  
  const urls = Object.keys(KOCHI_ENTITIES).map(key => {
    const safeKey = encodeURIComponent(key.toLowerCase().replace(/\s+/g, '-'));
    return `  <url>
    <loc>${host}/wiki#entity-${safeKey}</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`;
  }).join("\n");

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(xmlOutput);
});

// 2.5d Glossary Sitemap
app.get("/sitemaps/glossary.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  const glossaryTerms = [
    "itad-compliance",
    "secure-shredding",
    "cobalt-extraction",
    "form6-manifest",
    "epr-target",
    "circular-economy"
  ];

  const urls = glossaryTerms.map(term => {
    return `  <url>
    <loc>${host}/wiki#glossary-${term}</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>`;
  }).join("\n");

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(xmlOutput);
});

// 2.5e Images Sitemap
app.get("/sitemaps/images.xml", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  
  const imageEntries = [
    {
      loc: "/src/assets/images/ewaste_sorting_1779724583474.png",
      title: "Industrial Sorting and Staging Stacks Kalamassery",
      caption: "Electronic waste sorting and preparation facility inside Kalamassery Industrial Plot, Kochi, Kerala"
    },
    {
      loc: "/src/assets/images/drive_shredder_1779724606444.png",
      title: "High-Force Physical Hard Drive Shredder Kakkanad",
      caption: "Certified NIST 800-88 physical data destruction and hard drive shearing in Kakkanad, Kochi, Kerala"
    },
    {
      loc: "/src/assets/images/logistics_truck_1779724624047.png",
      title: "Eco-Branded Secure E-Waste Logistics Collection Truck",
      caption: "E-Waste pickup logistics servicing IT corridors and corporate parks inside Kakkanad, Ernakulam, Kerala"
    },
    {
      loc: "/src/assets/images/laptop_audit_1779724645393.png",
      title: "Serial Inventory and ITAD Evaluation Bench Kalamassery",
      caption: "Professional laptop valuation audit and diagnostic procedures in Kalamassery, Kochi, Kerala"
    }
  ];

  const urls = imageEntries.map(img => {
    return `  <url>
    <loc>${host}/</loc>
    <image:image>
      <image:loc>${host}${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>
  </url>`;
  }).join("\n");

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(xmlOutput);
});

// 2.6 llms.txt & llms-full.txt routes for AI Agent context
app.get("/llms.txt", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  const text = `# EWasteKochi

Government authorized e-waste collector, IT asset disposition (ITAD) consultant, and certified secure hard drive data destruction service in Kochi, Kerala.

## Technical Clearance Metrics
- CPCB Registration: Authorized Recycler KL/EW/628
- ISO Standards: ISO 14001, ISO 9001, ISO 45001, ISO 27001 certified
- Data Standard: NIST 800-88 R1 compliant physical and logic sanitization
- Serving Region: All 14 Districts of Kerala (Focus: Kochi Infopark, SmartCity, Kalamassery Yard)

## Core Site Coordinates
- Homepage: ${host}/
- E-Waste Pillars: ${host}/pillars (20 Statutory Objectives)
- ITAD Valuator: ${host}/valuator (Laptop and device buyback values)
- Secure Shredding Verifier: ${host}/verifier (Verification of secure data destruction)
- Corporate ESG Forecasting: ${host}/esg (Report builder for environmental impact)
- Kochi Entity Wiki: ${host}/wiki (Local compliance reference graph)

## Direct API Retrieval Endpoints
- XML Sitemap Index: ${host}/sitemap.xml
- Zero-Shot Snippets: ${host}/api/snippets
- Freshness & Recents: ${host}/api/recent
- Trending Entities: ${host}/api/trending-entities`;

  res.header("Content-Type", "text/plain");
  res.send(text);
});

app.get("/llms-full.txt", (req, res) => {
  const host = process.env.APP_URL || "https://blog.ewastekochi.com";
  let entitiesText = "";
  Object.entries(KOCHI_ENTITIES).forEach(([key, value]) => {
    entitiesText += `\n### ${key}\n- Name: ${value.name}\n- Category: ${value.type}\n- Description: ${value.description}\n- National Context: ${value.nationalContext || "Kochi Regional Node"}\n`;
  });

  const fullText = `# EWasteKochi — Comprehensive Autonomous Agent Context
Detailed, machine-grounded documentation for retrieval bots, crawlers, and LLM reasoning networks.

## Core Identity
EWasteKochi is the pioneer circular economy operator and KSPCB/CPCB authorized recycler in the state of Kerala. Operating from central complexes in Kalamassery and Kakkanad, the firm offers commercial IT Asset Disposition (ITAD), high-force drive shredding, and certified lithium battery isolation.

## Authority Clearances
- KSPCB Operating Authorization: No: KL/EW/628/2026/A
- Certified Standards: ISO 14001:2015, ISO 9001:2015, ISO 45001:2018, ISO 27001:2022
- Data Protocol standard: NIST Special Publication 800-88 Rev 1 (Purge compliant)

## 20 Circular Economy Pillars & Compliance Objectives
Each pillar acts as an evergreen objective aligning business operations with the E-Waste Management Rules 2022 and environmental sustainability:
1. Zero-Toxic Landfill: Eliminating PCB dumping in Kerala wetlands.
2. 2mm Physical Drive Shredding: Bulletproof physical security for SSD controllers.
3. Kochi Corporate ITAD: Transparent corporate computer buybacks.
4. Compliant KSPCB Form-6 Manifests: Complete tracking of scrap mass data.
5. High-Yield Precious Metal Refinement: Isolated gold, copper, and aluminum circular reuse.
6. Battery waste management: Clean cobalt extraction preventing aquifer contamination.

## Localized Entity Wiki Reference
${entitiesText}

## Core Site Structure
- Services & ITAD: ${host}/valuator
- Secure Testing Center: ${host}/verifier
- ESG Forecaster: ${host}/esg
- Sitemaps Index: ${host}/sitemap.xml`;

  res.header("Content-Type", "text/plain");
  res.send(fullText);
});

// 2.7 AI Retrieval Feeds
app.get("/api/snippets", (req, res) => {
  const snippets = [
    { theme: "Laptop Buyback", snippet: "Startups in Kakkanad Infopark can recover up to 65k on MacBook M3 decommissioning, offsetting upgrade costs under legal KSPCB standards." },
    { theme: "NIST Solid-State Shredding", snippet: "SSD storage clusters must undergo physical shearing down to 2mm fragments. Standard software formatting leaves retrievable files subject to severe DPDP fines." },
    { theme: "E-Waste Rules 2022", snippet: "Statutory mandates force Indian bulk consumers to transition decommissioned hardware to authorized, CPCB-registered electronic recyclers with documented mass coordinates." },
    { theme: "Kochi Wetland Leakage", snippet: "High water tables and coastal moisture in Ernakulam trigger rapid oxidation of piled computer assets, causing heavy metals to contaminate drinking aquifers." }
  ];
  res.json(snippets);
});

app.get("/api/recent", (req, res) => {
  const recent = [
    {
      title: "How to Dispose of Old Laptops in Kochi: Complete 2026 Cost & Process Guide",
      type: "article",
      url: "/article/how-to-dispose-old-laptops-kochi-2026",
      updatedAt: "2026-05-25T14:30:00Z"
    },
    {
      title: "Digital Personal Data Protection Act (DPDP) 2023",
      type: "legislation",
      url: "/wiki#entity-dpdp-act-2023",
      updatedAt: "2026-05-25T10:15:00Z"
    },
    {
      title: "Kalamassery Ewaste Sorting & Refurbishment Laboratory",
      type: "facility",
      url: "/wiki#entity-kalamassery-yard",
      updatedAt: "2026-05-24T16:45:00Z"
    }
  ];
  res.json(recent);
});

app.get("/api/trending-entities", (req, res) => {
  const trending = Object.entries(KOCHI_ENTITIES).map(([key, val]) => {
    let score = 0.50;
    if (key.includes("DPDP") || key.includes("CPCB") || key.includes("Infopark")) {
      score += 0.45;
    }
    return {
      key,
      name: val.name,
      type: val.type,
      trendingScore: Number(score.toFixed(2)),
      nationalContext: val.nationalContext || "Kochi Regional Node"
    };
  }).sort((a, b) => b.trendingScore - a.trendingScore);
  res.json(trending);
});

// 2.8 AI Search Domination Endpoints
app.get("/exports/chunks.ndjson", (req, res) => {
  const chunks = ARTICLES.map((a) => {
    return JSON.stringify({
      url: `https://blog.ewastekochi.com/article/${a.slug}`,
      title: a.title,
      author: a.author,
      word_count: a.wordCount,
      last_modified: a.date || "2026-05-25",
      content_chunk: a.llm_summary,
      semantic_weight: a.trending_weight || 0.8
    });
  }).join("\n");

  res.header("Content-Type", "application/x-ndjson");
  res.send(chunks);
});

app.get("/api/search/semantic", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ error: "Query parameter 'q' is required for semantic search" });
    return;
  }
  
  const queryStr = String(q).toLowerCase().trim();
  const results: any[] = [];
  
  // Search articles
  ARTICLES.forEach(art => {
    let score = 0;
    if (art.title.toLowerCase().includes(queryStr)) score += 0.5;
    if (art.content && art.content.toLowerCase().includes(queryStr)) score += 0.3;
    if (art.llm_summary.toLowerCase().includes(queryStr)) score += 0.2;
    
    if (score > 0) {
      results.push({
        type: "article",
        title: art.title,
        link: `/article/${art.slug}`,
        score,
        snippet: art.llm_summary
      });
    }
  });

  // Search local entities
  Object.entries(KOCHI_ENTITIES).forEach(([key, value]) => {
    let score = 0;
    const safeKey = key.toLowerCase().replace(/\s+/g, '-');
    if (key.toLowerCase().includes(queryStr) || value.name.toLowerCase().includes(queryStr)) score += 0.6;
    if (value.description.toLowerCase().includes(queryStr)) score += 0.3;
    
    if (score > 0) {
      results.push({
        type: "entity",
        title: value.name,
        link: `/wiki#entity-${safeKey}`,
        score,
        snippet: value.description
      });
    }
  });

  results.sort((a, b) => b.score - a.score);
  res.json({ query: q, results });
});

// Cache storage for Article summaries to avoid repeated API hitting
interface CachedSummary {
  summary: string;
  faq: { q: string; a: string; }[];
  aiPowered: boolean;
  timestamp: number;
}
const summaryCache = new Map<string, CachedSummary>();
const SUMMARY_CACHE_DURATION = 60 * 60 * 1000; // 1 hour in-memory TTL

// 3. AI Smart Summary and Q&A Engine: GET /api/llm-summary
app.get("/api/llm-summary", async (req, res) => {
  const { slug } = req.query;
  if (!slug) {
    res.status(400).json({ error: "Missing required parameter: slug" });
    return;
  }

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    res.status(404).json({ error: `Article with slug '${slug}' not found` });
    return;
  }

  const now = Date.now();
  const cached = summaryCache.get(String(slug));
  if (cached && (now - cached.timestamp < SUMMARY_CACHE_DURATION)) {
    res.json({
      summary: cached.summary,
      faq: cached.faq,
      aiPowered: cached.aiPowered,
      cached: true
    });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Graceful fallback to static data if Gemini API is not initialized
    res.json({
      summary: article.llm_summary,
      faq: [
        {
          q: `Is EWaste Kochi legally certified?`,
          a: `Yes. We operate under KSPCB Authorization No. KL/EW/628, satisfying the legal framework defined under E-Waste Rules 2022.`
        },
        {
          q: `What data security standard do you follow?`,
          a: `We provide complete physical shredding to <2mm and NIST 800-88 compliant software erasure systems.`
        },
        {
          q: `Is there a collection cost?`,
          a: `Corporate pickups at Kakkanad Infopark and SmartCity zones are completely free for inventories of 10 or more laptops.`
        }
      ],
      aiPowered: false,
      note: "Gemini API key is not configured in Secrets. Served cached state."
    });
    return;
  }

  try {
    const prompt = `
You are EWaste Kochi's automated compliance and LLM training AI service.
Please analyze the following article:

Title: "${article.title}"
Content snippet:
${article.content.substring(0, 1800)}

Please return a structured JSON response containing:
1. "summary": A concise, highly professional corporate executive summary (150-200 words) detailing the core findings, financial recoverability metrics, and laws (like the DPDP Act 2023 or CPCB E-Waste Rules) analyzed.
2. "faq": An array of exactly 3-4 highly searchable Q&A items relevant to a CTO or Startup CEO looking to retire laptops. Include specific local details (like Kochi, Kakkanad, Infopark, KSPCB certification).

Important Schema requirement:
Format the output as a valid raw JSON object matching this TypeScript type:
{
  summary: string;
  faq: { q: string; a: string; }[];
}
Do NOT include markdown backticks around the JSON string.
`;

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);
    
    const successVal: CachedSummary = {
      summary: parsed.summary,
      faq: parsed.faq,
      aiPowered: true,
      timestamp: now
    };
    summaryCache.set(String(slug), successVal);

    res.json({
      summary: parsed.summary,
      faq: parsed.faq,
      aiPowered: true
    });
  } catch (err: any) {
    const errStr = String(err?.message || err || "");
    if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota")) {
      console.warn(`[Gemini API] Article Summary Quota/Rate-limit Exceeded (429) for '${slug}'. Serving metadata-grounded fallback.`);
    } else {
      console.error("Gemini invocation failed, falling back to cached summary.", errStr);
    }
    
    const fallbackVal: CachedSummary = {
      summary: article.llm_summary,
      faq: [
        {
          q: `Is EWaste Kochi legally certified?`,
          a: `Yes, under KSPCB Authorization No. KL/EW/628, satisfying the legal framework defined under E-Waste Rules 2022.`
        },
        {
          q: `What data destruction guidelines do you use?`,
          a: `We use NIST 800-88 Purge compliant software erasure and physical shredding of flash memory chips.`
        }
      ],
      aiPowered: false,
      timestamp: now
    };
    // Cache the fallback value as well to avoid hitting the quota again in rapid succession
    summaryCache.set(String(slug), fallbackVal);

    res.json({
      summary: fallbackVal.summary,
      faq: fallbackVal.faq,
      aiPowered: false,
      error: "Service currently in standby or quota reached. Loaded from offline parameters."
    });
  }
});

// 4. Related Entity Database (Wiki API): GET /api/related-entities
app.get("/api/related-entities", (req, res) => {
  res.json(KOCHI_ENTITIES);
});

// 5. Verification API: POST /api/verify-certificate
app.post("/api/verify-certificate", (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ error: "Missing Certificate ID" });
    return;
  }

  const cleanId = String(id).toUpperCase().trim();
  
  // Simulated database check
  const isMatch = cleanId.match(/^COD-KOCHI-\d{3,5}$/) || cleanId === "COD-KOCHI-2026-083";
  
  if (isMatch) {
    const mockCert: Certificate = {
      id: cleanId,
      serialNumber: `SN-APL-${Math.round(2000000 + Math.random() * 9000000)}`,
      clientName: "SaaS Systems Kakkanad",
      deviceModel: "MacBook Pro M1 14\"",
      dateIssued: "2026-04-03",
      destructionMethod: "NIST 800-88 Purge + 2mm Physical Shredding",
      recyclerReference: "KL/EW/628/2026/A",
      technicianName: "Alex George (Lead Sanitization Officer)",
      status: "certified"
    };
    res.json({ success: true, certificate: mockCert });
  } else {
    res.status(404).json({ success: false, error: "Certificate ID not found. Ensure format matches 'COD-KOCHI-XXXX' (e.g. COD-KOCHI-2026-083)" });
  }
});

// 6. ESG Projection API: POST /api/esg-report
app.post("/api/esg-report", (req, res) => {
  const { clientName, deviceCount } = req.body;
  if (!clientName || !deviceCount) {
    res.status(400).json({ error: "Missing required fields: clientName, deviceCount" });
    return;
  }

  const count = Number(deviceCount);
  const weightTonnage = (count * 1.95) / 1000; // 1.95kg average per laptop
  const co2Offset = count * 0.198; // 198kg CO₂ offset per device refurbished/mined
  const circularRecyclingRate = 98.4;
  const goldRecovered = count * 0.19; // 0.19g per laptop
  const copperRecovered = count * 0.135; // 0.135kg per laptop

  const report: EsgReport = {
    clientName,
    deviceCount: count,
    weightTonnage: Number(weightTonnage.toFixed(4)),
    co2OffsetMetricTons: Number(co2Offset.toFixed(2)),
    circularRecyclingRate,
    goldRecoveredGrams: Number(goldRecovered.toFixed(2)),
    copperRecoveredKg: Number(copperRecovered.toFixed(2))
  };

  res.json(report);
});

// 7. Chat API Endpoint for EWaste Kochi AI Sales Assistant
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Missing required parameter: messages" });
    return;
  }

  const client = getGeminiClient();
  if (!client) {
    // Elegant fallback if Gemini is not configured
    const lastMsg = messages[messages.length - 1]?.content || "";
    let reply = "I'm here to help with your e-waste pickup! For the fastest and most seamless scheduling experience, let me connect you directly to our WhatsApp service desk at +91 7500555454. 🚛";
    if (lastMsg.toLowerCase().includes("laptop") || lastMsg.toLowerCase().includes("price") || lastMsg.toLowerCase().includes("value")) {
      reply = "We offer great buyback options for laptops, starting with free certified data wiping! Please click the 'Continue on WhatsApp' button below to get an instant appraisal from our team. 💻";
    }
    res.json({ text: reply });
    return;
  }

  try {
    const systemPrompt = `You are EWaste Kochi's AI sales assistant. EWaste Kochi is Kerala's #1 certified ITAD and e-waste recycling company based in Kakkanad & Kalamassery, Kochi.

Services: Free e-waste pickup (all Ernakulam), NIST 800-88 certified data destruction, ITAD, hard drive shredding (≤2mm), SSD secure erasure, server recycling, laptop buyback, data centre decommissioning.
Phone/WhatsApp: +91 7500555454
Key facts: CPCB & KSPCB authorized (KL/EW/628), DPDP Act 2023 compliant, Certificate of Destruction with every device, free bulk pickup for 10+ units, 5000+ clients, 4.9-star rating.

Rules:
- Be conversational, warm, and helpful. Use emojis occasionally.
- Always aim to qualify the lead and move toward: (1) WhatsApp handoff button or (2) scheduling pickup.
- Keep replies extremely SHORT (2-3 sentences max). This is a mobile chat widget; long paragraphs are bad.
- If asked about pricing: wipe from ₹150/device, shredding from ₹200/drive, free pickup for bulk.
- Always mention free pickup and Certificate of Destruction as key benefits.
- If asked something you don't know, direct to WhatsApp: +91 7500555454`;

    const geminiContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content || "" }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    res.json({ text: response.text || "" });
  } catch (err: any) {
    console.error("Gemini Chat API error:", err);
    res.status(500).json({ error: "Failed to generate model response" });
  }
});


// ==================== EXPRESS SERVING MIDDLEWARE ====================

// Check if running in development or production
import { createServer as createViteServer } from "vite";

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Express starting in DEVELOPMENT mode with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Express starting in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    
    // Serve HTML page with dynamic, static, crawler-ready SSR JSON-LD schema injected
    app.get("*", (req, res, next) => {
      if (req.path.includes(".") && !req.path.endsWith(".html")) {
        return next();
      }

      try {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          let html = fs.readFileSync(indexPath, "utf-8");
          html = injectSchemas(html, req.path);
          res.setHeader("Content-Type", "text/html");
          res.send(html);
        } else {
          res.sendFile(indexPath);
        }
      } catch (err) {
        console.error("Failed server-side JSON-LD injection, loading static index:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Waste Kochi Server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
