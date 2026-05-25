import { ARTICLES, KOCHI_ENTITIES } from '../data/knowledge';

// 1. LocalBusiness / RecyclingCenter Schema (HQ and Kalamassery Bay)
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RecyclingCenter",
    "@id": "https://blog.ewastekochi.com/#localbusiness",
    "name": "EWasteKochi Authorized Lifecycle Hub",
    "alternateName": "EWaste Kochi",
    "image": [
      "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800"
    ],
    "description": "Kerala State Pollution Control Board (KSPCB) authorized e-waste collection and NIST-compliant secure data destruction coordinator operating in Kakkanad, Ernakulam, and Kalamassery tech zones.",
    "url": "https://blog.ewastekochi.com",
    "telephone": "+91 7500555454",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Expressway Tower C, Adjacent to Infopark Phase-1, Kakkanad",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682030",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "9.9312",
      "longitude": "76.2673"
    },
    "hasMap": "https://maps.google.com/?q=Kakkanad+Kochi+Infopark",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:30"
      }
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Kochi"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kakkanad"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kalamassery"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Ernakulam"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kerala"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Rahul Sharma",
      "jobTitle": "Chief Technical Auditor"
    },
    "legalName": "EWasteKochi Solutions Private Limited",
    "license": "https://blog.ewastekochi.com/policies#kspcb-authorization-KL/EW/628",
    "knowsAbout": [
      "electronic waste recycling",
      "NIST 800-88 data wiping",
      "IT Asset Disposition",
      "CPCB E-Waste Rules compliance",
      "DPDP Act 2023 data purging"
    ]
  };
}

// 2. FAQ Page Schema containing the actual site compliance FAQ
export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is EWasteKochi formally authorized by the Kerala government to recycle electronic waste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely. EWasteKochi operates under Kerala State Pollution Control Board (KSPCB) Authorization No. KL/EW/628. We are a formally registered, fully compliant processing coordinator conforming to the Central Pollution Control Board (CPCB) E-Waste (Management) Rules 2022."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Digital Personal Data Protection (DPDP) Act 2023 impact ITAD in Kochi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The DPDP Act 2023 commands that organizations safely delete and purge all user-related personal databases under right-to-erasure guidelines once their operational intent is completed. Storing obsolete customer files on redundant hard drives or cold server storage poses massive compliance risks, with heavy penalties up to ₹250 Crores. We supply signed NIST 800-88 certified deletion documents to secure your enterprise safety."
        }
      },
      {
        "@type": "Question",
        "name": "What physical and logical data destruction systems do you utilize for enterprise asset sanitization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support absolute sanitization through two core solutions: (1) Logical software erasure satisfying the NIST SP 800-88 R1 Purge standard, performing full sector-by-sector overrides; and (2) Physical destruction at our Kalamassery industrial bay, utilizing mechanical shredders to grind SSD, NVMe, and memory chips down to elements under 2mm."
        }
      },
      {
        "@type": "Question",
        "name": "Are pickup logistics free for companies in Kakkanad Infopark and SmartCity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Corporate asset collections are 100% free of charge within the Kochi Infopark, SmartCity, Kalamassery industrial grid, and all Ernakulam municipal structures for any inventory containing 10 or more corporate laptop units. We issue standard signed CPCB-compliant Collection Manifests on-site."
        }
      },
      {
        "@type": "Question",
        "name": "Do you supply certificates of destruction for KSPCB compliance files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, every batch we process generates a cryptographic Certificate of Destruction containing serial inventories and physical grading details. These documents are logged instantly onto our digital validation gateway and are fully compliant for corporate ESG audits and government environmental inspections."
        }
      }
    ]
  };
}

// 3. HowTo Schema detailing How to Recycle E-Waste in Kochi safely
export function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Safely Decommission and Recycle Corporate E-Waste in Kochi",
    "description": "Follow this statutory, certified 3-step pipeline to safely wipe enterprise data under NIST 800-88 guidelines and recycle redundant IT assets with Kerala State Pollution Control Board verification.",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "0"
    },
    "totalTime": "P1D",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calculate Your Hardware Payout Quote",
        "text": "Use the interactive Marketplace Valuation tool on EWasteKochi to input your brand, model, year, and blemish condition to calculate an immediate appraisal and CO2 saving metric.",
        "url": "https://blog.ewastekochi.com/valuator",
        "image": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=400"
      },
      {
        "@type": "HowToStep",
        "name": "Coordinate Free SEZ Pickup Manifest",
        "text": "Submit your inventory logistics manifest. For tech offices located in Kakkanad Infopark, SmartCity, or Kalamassery industrial grid, pickup is 100% free for 10+ laptop modules.",
        "url": "https://blog.ewastekochi.com/contact",
        "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
      },
      {
        "@type": "HowToStep",
        "name": "Retrieve Cryptographic Verification Certificate",
        "text": "Upon processing, log into our validation desk. Enter your unique tracking ID (e.g., COD-KOCHI-XXXX) to retrieve your signed, KSPCB auditing compliant NIST-800-88 erasure certificate.",
        "url": "https://blog.ewastekochi.com/verifier",
        "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400"
      }
    ]
  };
}

// 4. Breadcrumb List Schema mapping internal path entities
export function getBreadcrumbSchema(path: string, articleTitle?: string) {
  const host = "https://blog.ewastekochi.com";
  const items: any[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": host
    }
  ];

  const cleanPath = path.replace(/\/$/, "");

  if (cleanPath === "/wiki") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Compliance Wiki",
      "item": `${host}/wiki`
    });
  } else if (cleanPath === "/valuator") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Disposal Marketplace Valuer",
      "item": `${host}/valuator`
    });
  } else if (cleanPath === "/verifier") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Certificate Verification Gateway",
      "item": `${host}/verifier`
    });
  } else if (cleanPath === "/esg") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Corporate ESG Reporting Platform",
      "item": `${host}/esg`
    });
  } else if (cleanPath === "/pillars") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "CPCB State Guidelines & Handbooks",
      "item": `${host}/pillars`
    });
  } else if (cleanPath === "/about") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "About Licensed Facility",
      "item": `${host}/about`
    });
  } else if (cleanPath === "/contact") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Initiate Collection Van Manifest",
      "item": `${host}/contact`
    });
  } else if (cleanPath === "/policies") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Regulatory Disclosure Policies Desk",
      "item": `${host}/policies`
    });
  } else if (cleanPath.startsWith("/article/") || cleanPath.startsWith("/blog/")) {
    const segments = cleanPath.split('/');
    const slug = segments[segments.length - 1];
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Compliance & Sustainability Insights",
      "item": `${host}`
    });
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": articleTitle || slug.replace(/-/g, ' '),
      "item": `${host}/article/${slug}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
}

// 5. TechArticle Schema representing full blog context and content depth for crawlers
export function getArticleSchema(slug: string) {
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return null;

  const host = "https://blog.ewastekochi.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${host}/article/${article.slug}#techarticle`,
    "headline": article.title,
    "description": article.metaDescription,
    "image": article.discover_thumbnail || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800",
    "datePublished": article.date,
    "dateModified": article.date,
    "wordCount": article.wordCount || 4500,
    "inLanguage": "en-IN",
    "articleSection": "E-Waste Compliance & Recycling Analytics",
    "keywords": article.keywords,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "EWasteKochi",
        "url": host
      },
      "sameAs": [
        "https://linkedin.com/in/" + (article.author.linkedin || article.author.name.toLowerCase().replace(/\s+/g, '-'))
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "EWasteKochi Solutions Private Limited",
      "url": host,
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog.ewastekochi.com/images/logo.png"
      }
    },
    "spatialCoverage": {
      "@type": "Place",
      "name": "Kochi, Kerala, India",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "9.9312",
        "longitude": "76.2673"
      }
    },
    "mentions": (article.entities || []).map(entName => {
      const ent = KOCHI_ENTITIES[entName];
      return {
        "@type": "Thing",
        "name": entName,
        "description": ent ? ent.description : "",
        "url": ent ? `${host}${ent.url}` : undefined
      };
    }),
    "abstract": article.llm_summary || article.metaDescription
  };
}

// 6. WebSite SearchBox Schema
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EWasteKochi Compliance & Recycling Journal",
    "url": "https://blog.ewastekochi.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://blog.ewastekochi.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
