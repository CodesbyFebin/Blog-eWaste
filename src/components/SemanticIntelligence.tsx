import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Battery, 
  MapPin, 
  Network, 
  Trash2, 
  Database, 
  ShieldAlert, 
  TrendingUp, 
  Info, 
  HelpCircle, 
  FileText, 
  Landmark, 
  GraduationCap, 
  Building2, 
  Flame, 
  RefreshCw, 
  BarChart4, 
  Compass, 
  CheckCircle2, 
  Search,
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';
import { ARTICLES, KOCHI_ENTITIES } from '../data/knowledge';

// Types for Semantic Knowledge Base
interface ConnectedEntity {
  id: string;
  name: string;
  category: 'legislation' | 'regulation' | 'service' | 'locality' | 'hazard' | 'material' | 'standard';
  description: string;
  relatedArticles: string[];
  regulations: string[];
  services: string[];
  localAreas: string[];
  hazardCategories: string[];
  materialsSupported: string[];
  faqCluster: { q: string; a: string }[];
}

export default function SemanticIntelligence({ 
  onNavigateToView, 
  onSelectArticle 
}: { 
  onNavigateToView: (view: string) => void;
  onSelectArticle: (slug: string) => void;
}) {
  // Interactive semantic graph state
  const [selectedEntityId, setSelectedEntityId] = useState<string>('dpdp');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'relevance'>('relevance');
  
  // Custom states for Enterprise Blueprints
  const [selectedEnterpriseType, setSelectedEnterpriseType] = useState<string>('banks');

  // Grounding Entity Database for Crawler Knowledge Graph Nodes
  const KNOWLEDGE_GRAPH_DATABASE: Record<string, ConnectedEntity> = {
    'dpdp': {
      id: 'dpdp',
      name: 'DPDP Act 2023 Enforcement',
      category: 'legislation',
      description: 'The Digital Personal Data Protection Act 2023 commands that organizations safely delete and purge all user-related personal databases under right-to-erasure guidelines once their operational intent is completed. Neglecting obsolete storage cells poses massive corporate legal liability, with fines up to ₹250 Crores.',
      relatedArticles: [
        'critical-role-itad-kochi-dpdp',
        'secure-data-destruction-kochi'
      ],
      regulations: [
        'CPCB E-Waste Rules 2022',
        'Section 12 DPDP Right to Erasure',
        'KSPCB Hazardous Waste Directives'
      ],
      services: [
        'Cryptographic Logical Deletion',
        'Certified Solid-Sate Mechanical Shredding'
      ],
      localAreas: [
        'Kakkanad Infopark Zone',
        'SmartCity SEZ Hub',
        'Kalamassery Hardware Grid'
      ],
      hazardCategories: [
        'Digital Compliance Liability',
        'Information Bleed Scenarios',
        'Regulatory Fines'
      ],
      materialsSupported: [
        'SSD Storage Modules',
        'SATA Hard Drives',
        'Server Blade RAM Chips'
      ],
      faqCluster: [
        {
          q: 'Does simply formatting hard drives satisfy the DPDP Act?',
          a: 'No. Formatting leaves files extractable via forensic block readers. NIST 800-88 compliant logical purging or physical crushing to particles sized sub-2mm is required.'
        },
        {
          q: 'Who is liable if local movers leak client databases on obsolete computers?',
          a: 'Your enterprise retains ultimate liability as the Data Fiduciary. Only partnering with an authorized KSPCB recycling coordinator with cryptographic collection manifests shields your board of directors.'
        }
      ]
    },
    'cpcb_epr': {
      id: 'cpcb_epr',
      name: 'CPCB EPR Framework & Form-4',
      category: 'regulation',
      description: 'Central Pollution Control Board Extended Producer Responsibility mandates that bulk hardware players account, track, and process statutory weight margins yearly, reporting clean downstream lifecycle receipts via Form-4 and Form-6 manifests.',
      relatedArticles: [
        'complete-guide-e-waste-rules-kerala',
        'how-to-recycle-corporate-laptop-ewaste'
      ],
      regulations: [
        'CPCB E-Waste Rules 2022',
        'Kerala State Pollution Control Board License KL/EW/628',
        'E-Waste Form-4 Annual Reporting'
      ],
      services: [
        'Statutory Weight Verification & Tracking',
        'Collection Manifest (Form-6) Issuance',
        'EPR Portal Direct Syncing'
      ],
      localAreas: [
        'Ernakulam Corporate Districts',
        'Cochin Special Economic Zone (CSEZ)',
        'Kalamassery Processing Unit'
      ],
      hazardCategories: [
        'KSPCB License Suspension Risks',
        'Unregistered Transporter Fines',
        'Audit Discrepancies'
      ],
      materialsSupported: [
        'Heavy Computing Host Arrays',
        'Networking Fiber Switches',
        'CRT and LCD Displays'
      ],
      faqCluster: [
        {
          q: 'What is the baseline penalty for failing to file yearly Form-4 logs?',
          a: 'Failure to file logs yields heavy environmental compensation fines from state inspectors, along with potential suspension of local municipal trade licenses.'
        },
        {
          q: 'How does EWasteKochi support EPR target accounting?',
          a: 'We calculate exact physical net-weights, categorize them under strict CPCB schedule codes, and issue legal transport Form-6 manifests to automatically declare downstream disposal.'
        }
      ]
    },
    'nist_sanitization': {
      id: 'nist_sanitization',
      name: 'NIST SP 800-88 R1 Standards',
      category: 'standard',
      description: 'National Institute of Standards and Technology (NIST) Special Publication 800-88 Rev 1 defines the holy grail for asset media sanitization, separating procedures into Clear, Purge, and Destroy states based on absolute information confidentiality.',
      relatedArticles: [
        'secure-data-destruction-kochi',
        'critical-role-itad-kochi-dpdp'
      ],
      regulations: [
        'DPDP Act 2023 Sec 12',
        'NAID AAA Quality Safeguards',
        'ISO 27001 Security Controls'
      ],
      services: [
        'On-site Hydraulic Physical Degaussing',
        'Sub-2mm Industrial Hammer-Mill Grinding',
        'Cryptographic Certifications & Tracking ID'
      ],
      localAreas: [
        'Kakkanad Infopark Phase 1 & 2',
        'Ernakulam Bank Hubs',
        'Kalamassery Demolishing Bay'
      ],
      hazardCategories: [
        'Remanence Data Leakage',
        'Magnetic Drive Retrieval',
        'Audit Verification failures'
      ],
      materialsSupported: [
        'NVMe PCIe SSDs',
        'Enterprise SAS Drive Arrays',
        'MicroSD and Flash Cells'
      ],
      faqCluster: [
        {
          q: 'What is the NIST requirement for Solid-State Drives (SSDs)?',
          a: 'SSDs cannot be reliable degaussed due to non-magnetic flash structure. They must undergo specific physical disintegration or chip-level cryptographic micro-overwrites.'
        },
        {
          q: 'Do you provide detailed serial number logs for audits?',
          a: 'Yes, every drive serial number is registered before processing and mapped on the Certificate of Destruction (CoD) issued immediately upon completion.'
        }
      ]
    },
    'lithium_recovery': {
      id: 'lithium_recovery',
      name: 'Lithium-Ion Hydro-Recovery',
      category: 'material',
      description: 'Developing high-temperature and safe hydrometallurgical recycling pipelines to safely separate cobalt, lithium, manganese, and nickel layers from volatile portable device battery cells, eliminating the threat of thermal runaway reactions.',
      relatedArticles: [
        'sustainable-battery-unveiling-kochi',
        'complete-guide-e-waste-rules-kerala'
      ],
      regulations: [
        'Battery Waste Management Rules 2022',
        'CPCB Schedule I Hazardous Streams',
        'Fire Prevention Control Mandates'
      ],
      services: [
        'Nitrogen-Cooled Cold Cell Disassembling',
        'Precious Black Mass Refining',
        'Regional Battery Collection Drops and Bins'
      ],
      localAreas: [
        'Cochin IT Corridors',
        'Kalamassery Primary Chemical Bay',
        'Vyttila Transportation Hub'
      ],
      hazardCategories: [
        'Thermal Runaway Fires',
        'Toxic Acid Water Leeching',
        'Atmospheric Hydrofluoric Off-Gasses'
      ],
      materialsSupported: [
        'Lithium Cobalt Oxide (LCO) Cells',
        'Lithium Iron Phosphate (LFP) Packs',
        'Nickel Manganese Cobalt (NMC) Modules'
      ],
      faqCluster: [
        {
          q: 'Why are discarded corporate laptop batteries major hazards?',
          a: 'Damaged or swamped lithium batteries can suffer short circuits, generating thermal runaways that exceed 600°C and output highly toxic vapor clouds.'
        },
        {
          q: 'How does EWasteKochi transport fragile batteries legally?',
          a: 'We pack cells in insulated, fireproof vermiculite barrels with double terminal insulation before moving them under state-approved hazardous waste transport rules.'
        }
      ]
    },
    'kochi_van': {
      id: 'kochi_van',
      name: 'Kerala Geo-Intelligent Fleet',
      category: 'service',
      description: 'A logistics mesh connecting Kochi Kakkanad technopoles directly to our licensed collection points. Utilizing computerized manifests, certified security locks, and on-site weighing scales for 100% auditable chain of custody.',
      relatedArticles: [
        'how-to-recycle-corporate-laptop-ewaste',
        'complete-guide-e-waste-rules-kerala'
      ],
      regulations: [
        'KSPCB Form-6 Transport Manifests',
        'Certified Transit Security Codes',
        'CPCB Interstate Shipping Permits'
      ],
      services: [
        'Same-day Free Infopark Pickup Runs',
        'Onsite Serial Barcode Scanning',
        'Custom Heavy Rig Hydraulic Lift Services'
      ],
      localAreas: [
        'Kakkanad Technology Cluster',
        'SmartCity Cochin Complex',
        'Kalamassery Industrial Estate'
      ],
      hazardCategories: [
        'Disposal Chain Divergence',
        'Unregulated Scrap Interception',
        'Transit Inventory Discrepancy'
      ],
      materialsSupported: [
        'Multi-ton Corporate Hardware Racks',
        'Laptops and Desktop Batches',
        'High-density Corporate Uninterruptible Backups'
      ],
      faqCluster: [
        {
          q: 'Are logistics free for small tech studios inside Kakkanad?',
          a: 'Yes, collections containing 10 or more core computer units get free logistics and manifest processing in Kochi, Kakkanad, CSEZ, and Kalamassery zones.'
        },
        {
          q: 'Is my data secure inside the collection vehicle?',
          a: 'Our transport vehicles are custom fitted with locked cages and real-time GPS coordinates trackers, ensuring assets travel from your loading dock to our facility without intermediate breaks.'
        }
      ]
    }
  };

  // Filter keys matching search query
  const entityKeys = Object.keys(KNOWLEDGE_GRAPH_DATABASE).filter(key => {
    const item = KNOWLEDGE_GRAPH_DATABASE[key];
    const matchStr = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    return matchStr.includes(searchQuery.toLowerCase());
  });

  const selectedEntity = KNOWLEDGE_GRAPH_DATABASE[selectedEntityId] || KNOWLEDGE_GRAPH_DATABASE['dpdp'];

  // Calculate sorted related research articles
  const sortedRelatedArticles = [...selectedEntity.relatedArticles]
    .map(slug => {
      const matchedArt = ARTICLES.find(a => a.slug === slug);
      return { slug, matchedArt };
    })
    .filter((item): item is { slug: string; matchedArt: typeof ARTICLES[0] } => item.matchedArt !== undefined)
    .sort((a, b) => {
      if (sortBy === 'latest') {
        const dateA = new Date(a.matchedArt.date).getTime() || 0;
        const dateB = new Date(b.matchedArt.date).getTime() || 0;
        return dateB - dateA;
      } else {
        if (!searchQuery) return 0;
        const term = searchQuery.toLowerCase();
        const score = (art: typeof ARTICLES[0]) => {
          let pts = 0;
          if (art.title.toLowerCase().includes(term)) pts += 10;
          if (art.metaDescription.toLowerCase().includes(term)) pts += 5;
          if (art.content.toLowerCase().includes(term)) pts += 2;
          art.entities.forEach(ent => {
            if (ent.toLowerCase().includes(term)) pts += 3;
          });
          return pts;
        };
        return score(b.matchedArt) - score(a.matchedArt);
      }
    });

  // KNOWLEDGE PILLARS DATA 
  const KNOWLEDGE_PILLARS = [
    {
      id: "recycling",
      title: "Circular Recycling",
      desc: "Recover raw metal alloys and circuit commodities with zero-landfill discharge.",
      articles: 34,
      entities: 18,
      guide: "Kalamassery Mechanical Triage Procedures",
      service: "Precious Commodity Splitting",
      icon: Cpu,
      color: "border-blue-200 bg-blue-50/50 text-blue-700"
    },
    {
      id: "compliance",
      title: "CPCB Compliance",
      desc: "Unlocking Extended Producer Responsibility targets and Form-4 State annual logs.",
      articles: 56,
      entities: 24,
      guide: "CPCB Yearly Audit Protocol Handbooks",
      service: "Form-4/6 Manifest Accounting",
      icon: ShieldCheck,
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-700"
    },
    {
      id: "itad",
      title: "Enterprise ITAD",
      desc: "Fully managed corporate assets decommissioning with maximum financial buybacks.",
      articles: 42,
      entities: 15,
      guide: "Corporate Laptop Refresh Guidelines",
      service: "High-yield Hardware Liquidation",
      icon: RefreshCw,
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-700"
    },
    {
      id: "destruction",
      title: "Data Destruction",
      desc: "Satisfying DPDP erasure commands with verified, certifiable clean storage overwriting.",
      articles: 29,
      entities: 12,
      guide: "NIST 800-88 R1 Cleansing Blueprints",
      service: "Mechanical Hard Drive Shredding",
      icon: Database,
      color: "border-rose-200 bg-rose-50/50 text-rose-700"
    },
    {
      id: "battery",
      title: "Battery Recovery",
      desc: "Mitigating toxic runoff and storage runaways from volatile laptop lithium cells.",
      articles: 18,
      entities: 8,
      guide: "Lithium-Ion Fire Prevention Isolation",
      service: "Controlled Inert-Atmosphere Disposal",
      icon: Battery,
      color: "border-amber-200 bg-amber-50/50 text-amber-700"
    },
    {
      id: "esg",
      title: "ESG Integration",
      desc: "Measuring Scope 3 carbon offsets and metal circularity index scores for CSR reporting.",
      articles: 25,
      entities: 14,
      guide: "Circularity Offset Calculation Indexes",
      service: "Cryptographic Environmental Receipts",
      icon: BarChart4,
      color: "border-purple-200 bg-purple-50/50 text-purple-700"
    }
  ];

  // ENTERPRISE BLUEPRINTS DATA
  const ENTERPRISE_BLUEPRINTS: Record<string, {
    title: string;
    target: string;
    icon: any;
    challenge: string;
    protocol: string;
    checklist: string[];
    co2SavedEstim: string;
    supportedMaterials: string[];
  }> = {
    'banks': {
      title: 'Banking & Financial Centers',
      target: 'Sovereign financial records, active credit directories, transaction server nodes',
      icon: Landmark,
      challenge: 'Absolute strict storage remanence security and legal protection from leak liabilities.',
      protocol: 'Strict NIST 800-88 Rev 1 Purge standard logical overwriting, coupled with onsite high-tesla physical degaussing and immediate cryogenic hammer-mill pulverization to 2mm particles.',
      checklist: [
        'Locked on-premise security dumpster arrays with double dual-operator custody signatures',
        'Independent video-logging of hard drive scanning and physical destruction steps',
        'Cryptographic Certificate of Destruction containing individual drive serial logs'
      ],
      co2SavedEstim: '24.8 Kg per retired server module',
      supportedMaterials: ['Magnetic platter storage arrays', 'SAS network nodes', 'Solid-State storage cards']
    },
    'hospitals': {
      title: 'Healthcare & Hospital networks',
      target: 'Patient telemetry registries, bio-monitoring computer consoles, MRI databases',
      icon: HeartIcon, // Custom fallback defined below
      challenge: 'Mitigating potential information leakage of vulnerable patient charts under local rules.',
      protocol: 'Medical device database sanitization and clean mechanical dismantling of heavy diagnostic units containing toxic internal circuits.',
      checklist: [
        'Complete logical isolation of Patient Records databases from client devices before shipping',
        'Segregation of toxic sensor panels containing trace cadmium elements',
        'Formal transfer-of-liability manifests handed to administrative teams on-site'
      ],
      co2SavedEstim: '18.4 Kg per patient monitor unit',
      supportedMaterials: ['Patient monitoring consoles', 'Old laboratory terminals', 'Lead-shielded hardware housing']
    },
    'schools': {
      title: 'Academic Institutions & Schools',
      target: 'Student computer laboratories, old CRT educational setups, administrative hardware',
      icon: GraduationCap,
      challenge: 'Extremely restricted budgets with bulky, low-value plastic hardware scrap piles.',
      protocol: 'Low-cost scheduled regional collection runs combined with triage reuse programs to support underprivileged rural school desks.',
      checklist: [
        'Non-destructive testing and hardware refurbishment programs for functional parts',
        'Clean plastic separation and recycling of outdated keyboard modules',
        'Compliance audits showing legal disposal of heavy mercury-glass monitors'
      ],
      co2SavedEstim: '12.5 Kg per laboratory setup',
      supportedMaterials: ['CRT monitors', 'Academic desk computers', 'Outdated educational boards']
    },
    'startups': {
      title: 'SaaS Startups & Creative Tech Agencies',
      target: 'High-frequency developer laptop fleets, obsolete storage disks, outdated developer hardware',
      icon: Compass,
      challenge: 'Fast hardware deterioration with immediate demand to recover residual buyback values.',
      protocol: 'Pre-collection on-site device evaluations, immediate buyback payouts up to ₹65,000 for qualifying items, and certified NIST-compliant data purging to protect SaaS proprietary codebases.',
      checklist: [
        'Instant valuation audits based on direct spec testing',
        'Full software-based secure wipes of active developer source code structures',
        'Carbon offset metric certificates to showcase local environment support'
      ],
      co2SavedEstim: '38.2 Kg per high-performance developer notebook',
      supportedMaterials: ['Obsolete developer laptop modules', 'Encrypted local flash storage', 'SaaS server towers']
    },
    'itparks': {
      title: 'Enterprise Tech Parks (Kakkanad Infopark, SmartCity)',
      target: 'Multi-tenant high volume corporate setups, cloud data stacks, SEZ office yards',
      icon: Building2,
      challenge: 'High physical accumulation rates requiring fast scheduled collections without disrupting business flow.',
      protocol: 'Form-6 compliant weekly collection service with GPS-locked transport vans, direct environmental KSPCB filings, and coordinated park-wide green collection programs.',
      checklist: [
        'Regular weekly recurring hydraulic transport runs to minimize office storage costs',
        'Form-6 collection manifests generated on-site within minutes',
        'Multi-tenant environmental report models for corporate CSR audits'
      ],
      co2SavedEstim: '1,450 Tons total offset recorded across Infopark SEZ',
      supportedMaterials: ['Datacenter blades', 'Multi-tier switchboards', 'Corporate workspace desktop clusters']
    }
  };

  return (
    <div className="space-y-24 text-left">
      
      {/* SECTION HEADER BLOCK */}
      <div className="border-[#E5E2DA] border-b pb-8">
        <div className="flex items-center gap-2 text-[#F27D26] mb-3">
          <Network className="h-5 w-5 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold">Semantic Engine / Authority Gateway</span>
        </div>
        <h2 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight text-slate-900 leading-none">
          Semantic Intelligence Platform
        </h2>
        <p className="text-sm sm:text-base text-slate-650 font-serif mt-3 max-w-3xl leading-relaxed">
          Tracing raw hardware disposal pathways through legal compliance rules, geographic networks, and technical standards. Fully optimized for enterprise discovery, Google AI Overview verification, and cryptographic audits.
        </p>
      </div>

      {/* 1. AUTHORITY METRICS PANEL */}
      <section id="authority-metrics" className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-6 sm:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-2 rounded">
              VERIFIED KNOWLEDGE BASE AUTHORITY
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
              Cochin Regional E-Waste Authority Metrics
            </h3>
            <p className="text-xs text-slate-500 font-serif max-w-2xl">
              Our open knowledge architecture maps state directives directly onto practical, secure processing workflows, providing unmatched semantic depth for enterprise search engines.
            </p>
          </div>

          {/* High-Contrast Visual Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
            
            <div className="bg-white border border-[#E5E2DA] p-6 rounded-xl hover:border-[#F27D26] transition-all group">
              <div className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] group-hover:text-[#F27D26] transition-colors">
                242+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-2">
                Knowledge Articles
              </div>
              <p className="text-[11px] text-slate-500 font-serif mt-1 leading-relaxed">
                Indexed technical resources mapped to KSPCB and statutory laws.
              </p>
            </div>

            <div className="bg-white border border-[#E5E2DA] p-6 rounded-xl hover:border-[#F27D26] transition-all group">
              <div className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] group-hover:text-[#F27D26] transition-colors">
                156+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-2">
                Glossary Definitions
              </div>
              <p className="text-[11px] text-slate-500 font-serif mt-1 leading-relaxed">
                Legally vetted definitions covering international data erasure.
              </p>
            </div>

            <div className="bg-white border border-[#E5E2DA] p-6 rounded-xl hover:border-[#F27D26] transition-all group">
              <div className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] group-hover:text-[#F27D26] transition-colors">
                7
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-2">
                Semantic Domains
              </div>
              <p className="text-[11px] text-slate-500 font-serif mt-1 leading-relaxed">
                Structured categories covering logistics, safety, and materials.
              </p>
            </div>

            <div className="bg-white border border-[#E5E2DA] p-6 rounded-xl hover:border-[#F27D26] transition-all group">
              <div className="text-3xl sm:text-4xl font-serif font-black text-emerald-600 transition-colors">
                99.8%
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-2">
                Kerala Pickup Net
              </div>
              <p className="text-[11px] text-slate-500 font-serif mt-1 leading-relaxed">
                Active service routes across Kalamassery, Kakkanad and Ernakulam SEZs.
              </p>
            </div>

            <div className="bg-white border border-[#E5E2DA] p-6 rounded-xl hover:border-[#F27D26] transition-all group">
              <div className="text-3xl sm:text-4xl font-serif font-black text-indigo-600 transition-colors">
                AI Graph
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mt-2">
                Optimized Engine
              </div>
              <p className="text-[11px] text-slate-500 font-serif mt-1 leading-relaxed">
                Structured JSON-LD schema generation for LLMs and crawler search.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENTO GRID TRANSFORMATION: SEMANTIC INTELLIGENCE GRID */}
      <section id="semantic-grid" className="space-y-6">
        <div>
          <span className="text-[10px] font-mono text-[#F27D26] font-bold uppercase tracking-widest block">
            BENTO RECONSTRUCTION / ARCHITECTURAL CLUTTER-FREE
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-serif font-black text-slate-900 mt-1">
            Semantic Intelligence Bento Grid
          </h3>
          <p className="text-xs text-slate-500 font-serif max-w-2xl">
            Each structural card functions as an independent node in the State environmental schema, presenting live links to detailed articles and services.
          </p>
        </div>

        {/* 3-Column Bento Grid - Balanced visual hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: CPCB Compliance */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  CPCB Compliance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">56 Articles • 24 Nodes</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                DPDP, EPR & Dismantling Mandates
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Decoding standard obligations for Extended Producer Responsibility targets, state license requirements, and Form-4 compliance.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> Annual Form-4 Disposal Reconciliation Requirements</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Statutory EPR Auditing & CPCB Portal Registration</p>
              </div>
            </div>
            <button 
              onClick={() => {
                onNavigateToView('pillars');
                setSelectedEntityId('cpcb_epr');
              }}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Explore compliance standards <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Card 2: Enterprise ITAD */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Enterprise ITAD
                </span>
                <span className="text-[10px] text-slate-400 font-mono">42 Articles • 15 Nodes</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                Certified IT Asset Disposition
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Structured corporate system decommission procedures, asset lifecycles, and maximum financial buyback returns for working modules.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> Infopark Enterprise Lifecycle Asset Evaluation</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Corporate Workstation Buybacks & Hardware Auditing</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToView('valuator')}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Examine ITAD calculator <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Card 3: Battery Recovery */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-amber-50 text-amber-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Battery Recovery
                </span>
                <span className="text-[10px] text-slate-400 font-mono">18 Articles • 10 Nodes</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                Lithium-Ion Runaway Recycling
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Methods to process vulnerable lithium cells, nickel, and battery materials without dangerous atmospheric release or aquifer toxic leeching.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> High-density Lithium Cell Terminal Insulation Standard</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Hydrometallurgical Raw Mineral Material Reclaiming</p>
              </div>
            </div>
            <button 
              onClick={() => {
                onNavigateToView('pillars');
                setSelectedEntityId('lithium_recovery');
              }}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Analyze battery frameworks <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Card 4: Kerala Collection */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Kerala Network
                </span>
                <span className="text-[10px] text-slate-400 font-mono">30 Articles • 14 Nodes</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                Geo-Intelligent Pickup Mesh
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Logistics hubs catering directly to Ernakulam corporate tech estates, providing immediate CPCB Form-6 transport receipts on-site.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> Coordinated Weekly Kakkanad and SmartCity Route Optimization</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Free Scheduled B2B Secure Intake Vehicles</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToView('contact')}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Schedule collection run <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Card 5: AI Knowledge Graph */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-purple-50 text-purple-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  AI Knowledge Graph
                </span>
                <span className="text-[10px] text-slate-400 font-mono">242+ Articles • 156+ Concepts</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                Entity-Linked Systems
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Engineered for rapid search-crawler ingestion and deep real-time LLM grounding, matching complex regulatory metadata to visual modules.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> Enhancing Schema.org RAG Grounding Performance</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Dynamic Server-Side JSON-LD Crawler Endpoints</p>
              </div>
            </div>
            <button 
              onClick={() => {
                const graphSec = document.getElementById('interactive-ecosystem');
                if (graphSec) graphSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Analyze knowledge graph <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Card 6: Secure Data Destruction */}
          <div className="bg-white border border-[#E5E2DA] hover:border-slate-900 transition-all rounded-xl p-6 flex flex-col justify-between group shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-rose-50 text-rose-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Secure Destruction
                </span>
                <span className="text-[10px] text-slate-400 font-mono">29 Articles • 12 Nodes</span>
              </div>
              <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors">
                NIST SP 800-88 Wiping & Shredding
              </h4>
              <p className="text-xs text-slate-650 font-serif leading-relaxed">
                Technically advanced methods to safely delete or grind flash sectors, ensuring student and corporate files remain completely unrecoverable.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-[11px] space-y-1 font-serif">
                <p className="text-slate-500 italic"><strong className="text-slate-800">Latest Guide:</strong> DPDP Compliant Logical Overwriting Protocols</p>
                <p className="text-slate-500 italic"><strong className="text-slate-800">Related Service:</strong> Certifiable Onsite Magnetic Storage Demolishing</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToView('verifier')}
              className="mt-6 text-xs font-mono font-bold text-slate-900 hover:text-[#F27D26] transition-colors inline-flex items-center gap-1.5"
            >
              Access verification desk <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE KNOWLEDGE ECOSYSTEM (THE GRAPH EXPLORER) */}
      <section id="interactive-ecosystem" className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-6 sm:p-10 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#F27D26]" />
            <span className="text-[10px] font-mono text-[#F27D26] font-bold uppercase tracking-widest bg-[#E5E2DA]/30 px-2 rounded">
              INTERACTIVE RAG EXPLORER
            </span>
          </div>
          <h3 className="text-2xl sm:text-3.5xl font-serif font-black text-slate-900">
            Interactive Knowledge Graph Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-serif max-w-2xl mt-1 leading-relaxed">
            Directly select active entity nodes in our schema directory to trace relationships between regulatory legislation, hazard concerns, physical materials, and local areas.
          </p>
        </div>

        {/* Visual Graph and Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Visual Graph Canvas */}
          <div className="lg:col-span-6 bg-white border border-[#E5E2DA] rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">
                NODE NETWORK SCHEMATIC
              </span>
              
              <div className="relative border border-[#E5E2DA] bg-[#FCFBF8] rounded-xl p-8 h-80 flex flex-col justify-center items-center overflow-hidden">
                {/* SVG connection lines for graphical authority */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#E5E2DA" strokeWidth="1.5" strokeDasharray="4" />
                  <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#E5E2DA" strokeWidth="1.5" strokeDasharray="4" />
                  <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="#F27D26" strokeWidth="2" strokeOpacity="0.4" />
                  <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#E5E2DA" strokeWidth="1.5" strokeDasharray="4" />
                  <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#E5E2DA" strokeWidth="1.5" strokeDasharray="4" />
                </svg>

                {/* Conceptual Nodes with Absolute positioning to represent real coordinates inside canvas */}
                <button 
                  onClick={() => setSelectedEntityId('dpdp')}
                  className={`absolute top-[15%] left-[10%] text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all z-10 ${
                    selectedEntityId === 'dpdp' 
                      ? 'bg-slate-900 text-white border-slate-950 scale-105 shadow-md font-bold' 
                      : 'bg-white text-slate-600 border-[#E5E2DA] hover:border-slate-800'
                  }`}
                >
                  § DPDP Act 2023
                </button>

                <button 
                  onClick={() => setSelectedEntityId('cpcb_epr')}
                  className={`absolute top-[15%] right-[10%] text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all z-10 ${
                    selectedEntityId === 'cpcb_epr' 
                      ? 'bg-slate-900 text-white border-slate-950 scale-105 shadow-md font-bold' 
                      : 'bg-white text-slate-600 border-[#E5E2DA] hover:border-slate-800'
                  }`}
                >
                  ⚙ CPCB EPR
                </button>

                <button 
                  onClick={() => setSelectedEntityId('nist_sanitization')}
                  className={`absolute top-[48%] left-[24%] text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all z-10 ${
                    selectedEntityId === 'nist_sanitization'
                      ? 'bg-slate-900 text-white border-slate-950 scale-105 shadow-md font-bold' 
                      : 'bg-white text-slate-600 border-[#E5E2DA] hover:border-slate-800'
                  }`}
                >
                  ⚡ NIST SP 800-88
                </button>

                <button 
                  onClick={() => setSelectedEntityId('lithium_recovery')}
                  className={`absolute bottom-[15%] left-[10%] text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all z-10 ${
                    selectedEntityId === 'lithium_recovery' 
                      ? 'bg-slate-900 text-white border-slate-950 scale-105 shadow-md font-bold' 
                      : 'bg-white text-slate-600 border-[#E5E2DA] hover:border-slate-800'
                  }`}
                >
                  🔋 Lithium Cells
                </button>

                <button 
                  onClick={() => setSelectedEntityId('kochi_van')}
                  className={`absolute bottom-[15%] right-[10%] text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all z-10 ${
                    selectedEntityId === 'kochi_van' 
                      ? 'bg-slate-900 text-white border-slate-950 scale-105 shadow-md font-bold' 
                      : 'bg-white text-slate-600 border-[#E5E2DA] hover:border-slate-800'
                  }`}
                >
                  🚚 Kerala Fleet
                </button>

                {/* Center Core Grounding Master Node */}
                <div className="z-10 bg-[#FAF9F6] border-2 border-[#F27D26] w-20 h-20 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-sm animate-pulse">
                  <Database className="h-6 w-6 text-[#F27D26] mb-1" />
                  <span className="text-[8px] font-mono uppercase font-bold tracking-tight text-[#1A1A1A]">
                    RAG Core
                  </span>
                </div>
              </div>
            </div>

            {/* Quick search inside semantic databases */}
            <div className="space-y-2 pt-2 border-t border-[#E5E2DA]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Filter Graph Database
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-sans">Sort Guides:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'latest' | 'relevance')}
                    className="bg-white border border-[#E5E2DA] text-[10px] px-1.5 py-0.5 rounded focus:outline-none focus:border-[#F27D26] font-sans font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="relevance">By Relevance</option>
                    <option value="latest">By Latest</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </span>
                <input 
                  type="text" 
                  value={searchQuery}
                  placeholder="Search metadata keys (e.g., SSD, liability, Kakkanad)..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#E5E2DA] text-xs bg-white rounded focus:outline-none focus:border-[#F27D26]"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {Object.keys(KNOWLEDGE_GRAPH_DATABASE).map(key => {
                  const it = KNOWLEDGE_GRAPH_DATABASE[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedEntityId(key)}
                      className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${
                        selectedEntityId === key 
                          ? 'bg-emerald-600 border-emerald-700 text-white' 
                          : 'bg-slate-50 text-slate-600 border-[#E5E2DA] hover:bg-slate-100'
                      }`}
                    >
                      {it.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Connected Entity Schema Metadata Inspector - Shows connected values */}
          <div className="lg:col-span-6 bg-white border border-[#E5E2DA] rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wider">
                    SCHEMA RELATIONSHIP INSPECTOR
                  </span>
                  <h4 className="text-xl font-serif font-black text-[#1A1A1A] mt-0.5">
                    {selectedEntity.name}
                  </h4>
                </div>
                <span className="capitalize text-[10px] font-mono px-2.5 py-0.5 border border-[#E5E2DA] text-slate-600 font-bold bg-slate-50 rounded">
                  {selectedEntity.category}
                </span>
              </div>

              <p className="text-xs text-slate-655 font-serif leading-relaxed">
                {selectedEntity.description}
              </p>

              {/* Dynamic Mapped Semantic Relationships List */}
              <div className="grid grid-cols-2 gap-4 text-xs font-serif">
                
                <div className="space-y-1 bg-slate-50/50 p-3 rounded border border-[#E5E2DA]">
                  <span className="text-[10px] text-indigo-700 font-bold block uppercase font-sans tracking-wide">
                    Linked Regulations
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                    {selectedEntity.regulations.map(reg => <li key={reg}>{reg}</li>)}
                  </ul>
                </div>

                <div className="space-y-1 bg-slate-50/50 p-3 rounded border border-[#E5E2DA]">
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase font-sans tracking-wide">
                    Local Areas Benefiting
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                    {selectedEntity.localAreas.map(loc => <li key={loc}>{loc}</li>)}
                  </ul>
                </div>

                <div className="space-y-1 bg-slate-50/50 p-3 rounded border border-[#E5E2DA]">
                  <span className="text-[10px] text-rose-700 font-bold block uppercase font-sans tracking-wide">
                    Hazard Categories
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                    {selectedEntity.hazardCategories.map(hz => <li key={hz}>{hz}</li>)}
                  </ul>
                </div>

                <div className="space-y-1 bg-slate-50/50 p-3 rounded border border-[#E5E2DA]">
                  <span className="text-[10px] text-amber-700 font-bold block uppercase font-sans tracking-wide">
                    Materials Processed
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                    {selectedEntity.materialsSupported.map(mat => <li key={mat}>{mat}</li>)}
                  </ul>
                </div>

              </div>

              {/* FAQ Cluster */}
              <div className="p-4 border border-[#E5E2DA] bg-[#FCFBF8] rounded-lg space-y-3">
                <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">
                  SEMANTIC FAQ CLUSTER Grounding
                </span>
                {selectedEntity.faqCluster.map((faq, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <p className="font-bold text-[#1A1A1A] flex items-start gap-1 font-sans">
                      <HelpCircle className="h-3.5 w-3.5 text-[#F27D26] shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </p>
                    <p className="text-slate-600 pl-4.5 text-[11px] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Related Research Articles list */}
            <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-slate-400 italic">Connected Lit Guides ({sortedRelatedArticles.length}):</span>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {sortedRelatedArticles.map(({ slug, matchedArt }) => {
                    return (
                      <button
                        key={slug}
                        onClick={() => onSelectArticle(slug)}
                        className="text-[11px] text-[#F27D26] hover:underline font-serif text-left font-bold"
                      >
                        • {matchedArt.title.split(':')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ENTERPRISE BLUEPRINTS DISPOSITION SECTION */}
      <section id="enterprise-blueprints" className="space-y-8">
        <div>
          <span className="text-[10px] font-mono text-[#F27D26] font-bold uppercase tracking-widest block">
            STATUTORY COMPLIANCE BLUEPRINTS BY SECTOR
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-serif font-black text-slate-900 mt-1">
            Enterprise Dispositions Sector Portal
          </h3>
          <p className="text-xs text-slate-500 font-serif max-w-2xl">
            Custom-vetted environmental and physical destruction pipelines optimized for key Cochin commercial domains. Select your sector template to inspect operations.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-[#E5E2DA]">
          {Object.keys(ENTERPRISE_BLUEPRINTS).map(key => {
            const bp = ENTERPRISE_BLUEPRINTS[key];
            const Icon = bp.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedEnterpriseType(key)}
                className={`flex items-center gap-2 px-5 py-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  selectedEnterpriseType === key 
                    ? 'border-[#F27D26] text-[#F27D26] font-bold bg-[#FAF9F6]' 
                    : 'border-transparent text-slate-500 hover:text-slate-950'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{bp.title.split('&')[0].split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Blueprint Card */}
        {(() => {
          const activeBlueprint = ENTERPRISE_BLUEPRINTS[selectedEnterpriseType];
          const ActiveIcon = activeBlueprint.icon;
          return (
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Details 7-columns */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-3 rounded-lg text-[#F27D26]">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif font-black text-[#1A1A1A]">
                      {activeBlueprint.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-serif mt-1 italic">
                      <strong className="text-slate-700">Target Scopes:</strong> {activeBlueprint.target}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" />
                    Core Lifecycle Challenge
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-655 font-serif leading-relaxed pl-5.5">
                    {activeBlueprint.challenge}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-705 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#F27D26] shrink-0" />
                    Authorized Processing Protocol
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-655 font-serif leading-relaxed pl-5.5 bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2DA]">
                    {activeBlueprint.protocol}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="text-[10px] font-mono bg-slate-50 border border-[#E5E2DA] py-1 px-2.5 rounded text-slate-600 font-bold">
                    Carbon Offset Payout: {activeBlueprint.co2SavedEstim}
                  </span>
                  {activeBlueprint.supportedMaterials.map(mat => (
                    <span key={mat} className="text-[10px] font-mono bg-[#E5E2DA]/30 py-1 px-2.5 rounded text-slate-700">
                      ✓ {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Audit Checklist 5-columns */}
              <div className="lg:col-span-5 bg-[#FCFBF8] border border-[#E5E2DA] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="border-b border-[#E5E2DA] pb-3">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">
                      STATUTORY AUDIT MITIGATION LIST
                    </span>
                    <h5 className="text-lg font-serif font-black text-slate-900 mt-1">
                      KSPCB Verification Checklist
                    </h5>
                  </div>
                  <ul className="space-y-4">
                    {activeBlueprint.checklist.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-xs font-serif leading-relaxed">
                        <span className="font-mono text-[10px] bg-[#1A1A1A] text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-5 border-t border-[#E5E2DA]">
                  <button 
                    onClick={() => {
                      const bookWidget = document.getElementById('price-estimator-widget') || document.getElementById('faq-section');
                      if (bookWidget) bookWidget.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-[#1A1A1A] text-white py-3 hover:bg-[#F27D26] text-center rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Initiate Sector Disposal Form
                  </button>
                </div>
              </div>

            </div>
          );
        })()}
      </section>

    </div>
  );
}

// Minimal fallback inline SVG hospital icon to bypass imports issues
function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
         d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}
