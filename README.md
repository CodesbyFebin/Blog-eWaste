# EWaste Kochi — Compliance, ITAD & Circular Economy Blog

> Kerala's certified e-waste recycling & IT Asset Disposition knowledge hub. KSPCB Authorization No. KL/EW/628.

A full-stack editorial platform for EWaste Kochi, built with React 19, Vite, Tailwind CSS v4, and an Express backend powered by the Gemini API. It covers corporate laptop disposal, NIST 800-88 data destruction, CPCB/DPDP Act compliance, urban mining, and ESG reporting for businesses in Kochi, Kerala.

---

## Features

- **12 long-form compliance articles** covering ITAD, DPDP Act 2023, E-Waste Rules 2022, battery recycling, and urban mining
- **AI-powered summaries & chat** — Gemini 2.0 Flash generates per-article executive summaries and Q&A; live AI sales assistant chatbot
- **Device buyback valuator** — real-time price estimate (brand, model, year, condition) with CO₂ and metal recovery metrics
- **Certificate verifier** — lookup NIST 800-88 Certificates of Destruction by ID
- **ESG report builder** — carbon offset, gold/copper recovery, and circular recycling rate per device batch
- **Compliance knowledge graph** — interactive CPCB/KSPCB entity wiki
- **Full SEO infrastructure** — server-injected JSON-LD (LocalBusiness, FAQPage, HowTo, TechArticle, BreadcrumbList, WebSite), dynamic & static XML sitemaps, `robots.txt`, `llms.txt`
- **Google Discover feed optimisation** — emotion-tagged articles with 1200 px thumbnails
- **Comment system** — banned-word filter, admin approval, voice dictation (Web Speech API)
- **Dark mode** — system preference + manual toggle

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite 6 |
| Charts | Recharts 3 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Backend | Express 4 (Node.js) |
| AI | Google Gemini 2.0 Flash (`@google/genai`) |
| Deployment | Vercel (static Vite build + `vercel.json`) |

---

## Project Structure

```
├── public/                   # Static assets copied to dist/ by Vite
│   ├── sitemap.xml           # Sitemap index
│   ├── robots.txt
│   └── sitemaps/
│       ├── services.xml
│       ├── articles.xml
│       ├── entities.xml
│       ├── glossary.xml
│       └── images.xml
├── src/
│   ├── components/           # React components
│   ├── data/
│   │   ├── knowledge.ts      # Articles, authors, KOCHI_ENTITIES
│   │   └── pillars.ts        # 20 circular economy pillars
│   ├── utils/
│   │   └── schemaGenerator.ts # JSON-LD schema builders
│   ├── types.ts
│   └── App.tsx               # Main SPA router + state
├── server.ts                 # Express API server (dev & production SSR)
├── vercel.json               # Vercel build config
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (for Gemini features)

### Installation

```bash
git clone https://github.com/CodesbyFebin/Blog-eWaste.git
cd Blog-eWaste
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `APP_URL` | Public URL of the deployment (e.g. `https://blog.ewastekochi.com`) |

> If `GEMINI_API_KEY` is not set, all AI features gracefully fall back to static content — the app remains fully functional.

### Run Locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Vite HMR is active for the frontend; the Express server handles API routes.

### Production Build

```bash
npm run build   # vite build + esbuild server bundle
npm start       # serves dist/ with SSR JSON-LD injection
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/news-ticker` | KSPCB/DPDP compliance alerts (Gemini or static fallback) |
| `POST` | `/api/price` | Device buyback valuation |
| `GET` | `/api/llm-summary?slug=` | AI article summary + FAQ |
| `POST` | `/api/verify-certificate` | Certificate of Destruction lookup |
| `POST` | `/api/esg-report` | ESG carbon/metal recovery report |
| `POST` | `/api/chat` | Gemini sales assistant |
| `GET` | `/api/discover-feed` | Google Discover JSON-LD feed |
| `GET` | `/api/related-entities` | KOCHI_ENTITIES wiki data |
| `GET` | `/api/search/semantic?q=` | Semantic article + entity search |
| `GET` | `/exports/chunks.ndjson` | LLM training chunks |
| `GET` | `/sitemap.xml` | Sitemap index |
| `GET` | `/sitemaps/*.xml` | Sub-sitemaps (services, articles, entities, glossary, images) |
| `GET` | `/robots.txt` | Crawler permissions |
| `GET` | `/llms.txt` | LLM agent context |
| `GET` | `/llms-full.txt` | Full LLM agent context with entity wiki |

---

## Deployment

The project deploys to Vercel as a **static Vite build**. `vercel.json` sets:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Static files in `public/` (sitemaps, robots.txt) are served directly by Vercel's CDN. SPA routes are handled by the catch-all rewrite.

> **Note:** The Express `server.ts` API routes are not available on Vercel's static deployment. They run only in the local dev server and self-hosted production environments. AI features degrade gracefully to static fallbacks on Vercel.

---

## License

MIT © 2026 EWaste Kochi — [blog.ewastekochi.com](https://blog.ewastekochi.com)
