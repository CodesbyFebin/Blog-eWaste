import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Check, 
  Globe, 
  Copy, 
  CheckCircle, 
  ChevronRight, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Trash2, 
  Cpu, 
  Smartphone, 
  Shield, 
  BookOpen, 
  TrendingUp,
  AlertCircle,
  Play
} from 'lucide-react';
import { PILLARS, PillarPage, PillarTopic } from '../data/pillars';
import { PILLAR_EXTENSIONS } from '../data/pillarExtensions';

// Helper to resolve Lucide icons dynamically from the database strings
import * as Icons from 'lucide-react';

export default function PillarsDirectory() {
  const [selectedPillarId, setSelectedPillarId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedPillarSchema, setCopiedPillarSchema] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'subtopics' | 'article' | 'interlinks' | 'rag'>('subtopics');
  const [ragQuery, setRagQuery] = useState<string>('');
  const [isRagAnalyzing, setIsRagAnalyzing] = useState<boolean>(false);
  const [htmlCopied, setHtmlCopied] = useState<boolean>(false);
  const [ragMatrixCopied, setRagMatrixCopied] = useState<boolean>(false);

  // Dynamic Interactive States for Simulators:
  
  // 1. Pickup Scheduler Form
  const [pickupForm, setPickupForm] = useState({
    companyName: 'Infopark Solutions Ltd',
    location: 'Kakkanad IT Zone',
    deviceCount: 35,
    pickupDay: 'Tuesday'
  });
  const [generatedManifest, setGeneratedManifest] = useState<any | null>(null);
  const [manifestLoading, setManifestLoading] = useState<boolean>(false);

  // 2. Data Sanitization Simulator
  const [wipeDriveModel, setWipeDriveModel] = useState<string>('Micron NVMe SSD 512GB');
  const [wipeProgress, setWipeProgress] = useState<number>(0);
  const [isWiping, setIsWiping] = useState<boolean>(false);
  const [wipeDone, setWipeDone] = useState<boolean>(false);
  const [activeSector, setActiveSector] = useState<string>('0x0000');

  // 3. Quiz / Score Checklist State
  const [auditChecklist, setAuditChecklist] = useState<Record<string, boolean>>({
    form6: true,
    nist: true,
    kspcb: false,
    dpdp: false,
    iso: false
  });

  const getIconElement = (iconName: string, className = "h-4 w-4") => {
    const Component = (Icons as any)[iconName];
    if (Component) {
      return <Component className={className} />;
    }
    return <BookOpen className={className} />;
  };

  // Find the selected pillar model
  const selectedPillar = useMemo(() => {
    return PILLARS.find(p => p.id === selectedPillarId) || PILLARS[0];
  }, [selectedPillarId]);

  // Load the enhanced extended properties
  const activeExtension = useMemo(() => {
    return PILLAR_EXTENSIONS[selectedPillarId] || {
      id: selectedPillarId,
      fullScholarlyArticle: `<h2>1. High-Density Electronics Management</h2><p>Our complete organizational framework aligns corporate sustainability models in Ernakulam with national CPCB targets.</p>`,
      blogPostDraft: `# E-Waste Decommissioning: Practical local strategies\n\nProperly managing outdated enterprise hardware preserves precious heavy metals. This guide details how local entities audit inventory securely to bypass statutory risk elements.`,
      interLinks: [],
      semanticGridHtml: ``,
      ragVectors: []
    };
  }, [selectedPillarId]);

  // Handle Search filtering across ALL 20 pillars and ALL 200 subtopics/bullets
  const filteredPillars = useMemo(() => {
    if (!searchQuery.trim()) return PILLARS;
    
    const query = searchQuery.toLowerCase();
    return PILLARS.filter(pillar => {
      const matchPillarTitle = pillar.title.toLowerCase().includes(query);
      const matchPillarSubtitle = pillar.subtitle.toLowerCase().includes(query);
      const matchCategory = pillar.category.toLowerCase().includes(query);
      const matchSubtopics = pillar.subtopics.some(sub => 
        sub.title.toLowerCase().includes(query) || 
        sub.description.toLowerCase().includes(query) ||
        sub.keyAction.toLowerCase().includes(query)
      );
      return matchPillarTitle || matchPillarSubtitle || matchCategory || matchSubtopics;
    });
  }, [searchQuery]);

  // 1. Action to generate pickup manifest
  const handleGenerateManifest = (e: React.FormEvent) => {
    e.preventDefault();
    setManifestLoading(true);
    setTimeout(() => {
      const uniqueId = `FORM6-KSPCB-2026-${Math.floor(Math.random() * 900) + 100}`;
      const seriesList = Array.from({ length: 3 }, (_, i) => ({
        serial: `SN-MACM3-${102300 + Math.floor(Math.random() * 89999) + i}`,
        status: 'CPCB LOGGED'
      }));
      setGeneratedManifest({
        manifestId: uniqueId,
        companyName: pickupForm.companyName,
        location: pickupForm.location,
        deviceCount: pickupForm.deviceCount,
        pickupDay: pickupForm.pickupDay,
        transitDate: 'Scheduled for next ' + pickupForm.pickupDay,
        scannedSerials: seriesList,
        regulatoryOfficer: 'Adv. Dr. Thomas Isaac (KSPCB Agent ID-492)',
        certifiedDownstreamYard: 'Kalamassery Heavy Metal Yard III'
      });
      setManifestLoading(false);
    }, 750);
  };

  // 2. Action to toggle logical storage wipe
  const handleStartWipe = () => {
    if (isWiping) return;
    setIsWiping(true);
    setWipeDone(false);
    setWipeProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setIsWiping(false);
        setWipeDone(true);
      }
      setWipeProgress(current);
      
      // Random mock sector addresses
      const rHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      setActiveSector(`0x${rHex}`);
    }, 150);
  };

  // Action to copy JSON-LD schema
  const handleCopySchema = (pillarId: number, jsonString: string) => {
    navigator.clipboard.writeText(jsonString);
    setCopiedPillarSchema(pillarId);
    setTimeout(() => setCopiedPillarSchema(null), 2000);
  };

  // Calculate self-assessment audit confidence score
  const auditComplianceScore = useMemo(() => {
    const total = Object.keys(auditChecklist).length;
    const completed = Object.values(auditChecklist).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [auditChecklist]);

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E5E2DA] pb-8 text-left">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">
          <Globe className="h-3.5 w-3.5" />
          <span>SEO & LLM Grounding Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 mt-2">
          20 Knowledge Pillars of blog.ewastekochi.com
        </h2>
        <p className="text-sm font-serif text-slate-600 leading-relaxed mt-2 max-w-3xl">
          Explore the localized statutory, operational, and commercial framework of Ernakulam's e-waste processing. Structured dynamically for Google Discover crawls, schema ingestion, and corporate compliance officers.
        </p>

        {/* Dynamic Search Box */}
        <div className="mt-6 max-w-xl relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 20 pillars and 200 specific subtopics/keywords instantly..."
            className="w-full bg-white border border-[#E5E2DA] hover:border-slate-800 focus:border-slate-900 focus:ring-0 focus:outline-none rounded-lg px-4 py-3 pl-10 text-sm font-serif"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-mono"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Double-Panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Directory Sidebar List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-500 font-bold border-b border-[#E5E2DA] pb-2">
            <span>Pillar Index List ({filteredPillars.length})</span>
            <span>Static URL simulations</span>
          </div>

          <div className="max-h-[640px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
            {filteredPillars.map((pillar) => (
              <div 
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`w-full text-left p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 relative ${
                  selectedPillarId === pillar.id 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white border-[#E5E2DA] text-slate-800 hover:border-slate-800'
                }`}
              >
                <div className={`p-2 rounded shrink-0 ${
                  selectedPillarId === pillar.id 
                    ? 'bg-[#F27D26] text-white' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {getIconElement(pillar.icon, "h-4 w-4")}
                </div>

                <div className="space-y-1 min-w-0 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-600 font-bold px-1.5 py-0.5 rounded leading-none">
                      {pillar.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      Pillar #{String(pillar.id).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-black truncate leading-tight">
                    {pillar.title}
                  </h4>
                  <p className={`text-[11px] font-serif line-clamp-1 ${
                    selectedPillarId === pillar.id ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {filteredPillars.length === 0 && (
              <div className="p-10 border border-[#E5E2DA] border-dashed rounded text-center text-slate-400 font-serif italic text-sm">
                No pillars match your search parameter.
              </div>
            )}
          </div>

          <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-4 rounded-lg text-[11px] font-mono text-slate-400 text-left space-y-2">
            <span className="text-[#F27D26] uppercase font-bold text-[9px] block">LLM RAG Compliance Matrix</span>
            Each node acts as an immutable knowledge grounding agent point, mapping 10 structural bullet variables perfectly to semantic clusters.
          </div>
        </div>

        {/* Right column: Dynamic Workspace workspace */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main workspace layout */}
          <div className="bg-white border border-[#E5E2DA] rounded-xl overflow-hidden p-6 sm:p-8 space-y-6 text-left">
            
            {/* Editorial Metadata header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-[#E5E2DA] pb-5 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Pillar #{String(selectedPillar.id).padStart(2, '0')}
                  </span>
                  <span className="bg-[#F4F2EE] text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {selectedPillar.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 leading-tight">
                  {selectedPillar.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono italic">
                  Dynamic Canonical Url: {selectedPillar.simulatedUrl}
                </p>
              </div>

              <button 
                onClick={() => handleCopySchema(selectedPillar.id, selectedPillar.schemaMarkup)}
                className="self-start text-[10px] font-mono uppercase tracking-widest font-bold border border-[#E5E2DA] hover:bg-slate-50 px-3 py-2 rounded inline-flex items-center justify-center gap-1.5 transition-colors text-slate-700"
              >
                {copiedPillarSchema === selectedPillar.id ? 'Copied Key!' : 'Schema JSON-LD'}
                <Copy className="h-3 w-3" />
              </button>
            </div>

            {/* Simulated Address Browser strip */}
            <div className="bg-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-xs font-mono text-slate-500 border border-slate-200">
              <span className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </span>
              <span className="text-slate-400 shrink-0">|</span>
              <span className="bg-white border border-slate-200 px-3 py-0.5 rounded flex-grow text-[11px] text-slate-600 truncate">
                {selectedPillar.simulatedUrl}
              </span>
            </div>

            {/* Interactive Workspace Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1 border-b border-[#E5E2DA] pb-0.5 mt-2">
              <button
                type="button"
                onClick={() => setActiveTab('subtopics')}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-t-lg border-t border-x transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'subtopics'
                    ? 'bg-white border-[#E5E2DA] text-slate-900 border-b-2 border-b-slate-900 -mb-px'
                    : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>1. Core Subtopics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('article')}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-t-lg border-t border-x transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'article'
                    ? 'bg-white border-[#E5E2DA] text-slate-900 border-b-2 border-b-slate-900 -mb-px'
                    : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-[#F27D26]" />
                <span>2. Article & Blog Draft</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interlinks')}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-t-lg border-t border-x transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'interlinks'
                    ? 'bg-white border-[#E5E2DA] text-slate-900 border-b-2 border-b-slate-900 -mb-px'
                    : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-blue-500" />
                <span>3. Semantic Grid HTML</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rag')}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-t-lg border-t border-x transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'rag'
                    ? 'bg-white border-[#E5E2DA] text-slate-900 border-b-2 border-b-slate-900 -mb-px'
                    : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Cpu className="h-3.5 w-3.5 text-purple-500" />
                <span>4. LLM RAG Matrix & QA</span>
              </button>
            </div>

            {/* TAB CONTAINER: SUBTOPICS */}
            {activeTab === 'subtopics' && (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Editorial Lead Paragraph */}
                <div className="p-5 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg">
                  <h5 className="text-[10px] font-mono text-[#F27D26] uppercase font-bold tracking-wider mb-2">Editorial Narrative / Kochi Focus</h5>
                  <p className="text-sm font-serif text-slate-700 leading-relaxed">
                    {selectedPillar.detailedGuide}
                  </p>
                </div>

                {/* 10 Subtopics / Bullet Points requested */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#E5E2DA] pb-2">
                    <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">10 Pillar Subtopic Variables (Required Keys)</span>
                    <span className="h-px bg-[#E5E2DA] flex-grow"></span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPillar.subtopics.map((sub, idx) => (
                      <div key={idx} className="p-4 bg-white border border-[#E5E2DA] rounded-lg hover:border-[#F27D26] transition-colors flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-slate-900 text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h5 className="font-serif font-bold text-sm text-slate-900 hover:text-[#F27D26] transition-colors truncate">
                              {sub.title}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-500 font-serif leading-relaxed line-clamp-3">
                            {sub.description}
                          </p>
                        </div>

                        <div className="bg-[#FAF9F6] p-2 rounded text-[10px] font-mono text-emerald-800 border border-emerald-500/10 flex items-start gap-1">
                          <span className="text-[#F27D26] font-bold uppercase shrink-0">Action:</span>
                          <span className="text-slate-600 italic truncate">{sub.keyAction}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTAINER: FULL ARTICLE & BLOG DRAFT */}
            {activeTab === 'article' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="p-5 bg-stone-50 border border-[#E5E2DA] rounded-lg prose prose-slate max-w-none text-slate-805">
                  <h4 className="text-[10px] font-mono text-[#F27D26] uppercase font-bold tracking-wider mb-3">
                    Full Scholarly Grounding Page (With Embedded Local CTAs)
                  </h4>
                  <div 
                    className="text-sm font-serif leading-relaxed space-y-3 prose-headings:font-serif prose-headings:font-black prose-headings:mt-4 prose-p:mt-2 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: activeExtension.fullScholarlyArticle }}
                  />
                </div>

                <div className="bg-white border border-[#E5E2DA] p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 bg-[#F27D26] text-white font-mono text-[9px] px-3 py-1 uppercase rounded-bl font-bold">
                    CMS MD Draft
                  </div>
                  <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-200 pb-2 mb-3 inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#F27D26]" /> Generated Blog Post Draft (Markdown Content)
                  </h4>
                  <p className="text-xs text-slate-500 font-serif mb-4 leading-relaxed">
                    Auto-synthesized dynamic copy optimized with long-tail keywords ready to feed directly to search engines.
                  </p>
                  <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg border border-slate-800 font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-[350px] overflow-y-auto select-all">
                    {activeExtension.blogPostDraft.trim()}
                  </pre>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Grounding Status: APPROVED</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeExtension.blogPostDraft);
                        alert("Copied full draft text to clipboard!");
                      }}
                      className="text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 px-2.5 py-1 rounded font-bold uppercase transition-colors"
                    >
                      Copy Complete Markdown Template
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTAINER: SEMANTIC GRID HTML */}
            {activeTab === 'interlinks' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                  <h5 className="text-[10px] font-mono text-[#F27D26] uppercase font-bold tracking-wider mb-2">
                    Dynamic Internal Crawl Interlink Blueprint
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif">
                    Google spider agents crawl and rank websites based on internal link architectures. This index maps standard <strong>Pillar #{selectedPillar.id}</strong> directly to relevant sibling structures using highly context-weighted anchor sentences.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[11px] font-mono uppercase text-slate-500 font-bold border-b border-stone-200 pb-1.5">
                    Active Inter-Pillar Semantic Links ({activeExtension.interLinks.length})
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeExtension.interLinks.map((link, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-stone-50 border border-[#E5E2DA] rounded-lg hover:border-slate-800 transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedPillarId(link.targetId);
                          setActiveTab('subtopics');
                        }}
                      >
                        <span className="text-[8px] font-mono text-[#F27D26] uppercase block mb-1">
                          RELATION: {link.relationship}
                        </span>
                        <div className="text-xs font-serif font-black text-slate-900 group-hover:text-[#F27D26] inline-flex items-center gap-1.5">
                          <span>Link to Pillar #{link.targetId}: {link.targetTitle}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#F27D26]" />
                        </div>
                        <p className="text-[11px] font-mono text-slate-600 mt-2 bg-white p-2 rounded border border-slate-100 italic">
                          Anchor Text: "{link.anchorText}"
                        </p>
                      </div>
                    ))}

                    {activeExtension.interLinks.length === 0 && (
                      <div className="p-6 border border-dashed border-[#E5E2DA] rounded text-slate-400 italic text-xs text-center font-serif col-span-2">
                        No active custom linking routes defined for this node.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-[#E5E2DA] p-6 rounded-lg text-left relative overflow-hidden">
                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeExtension.semanticGridHtml);
                        setHtmlCopied(true);
                        setTimeout(() => setHtmlCopied(false), 2000);
                      }}
                      className="text-[10px] font-mono uppercase bg-slate-900 text-white hover:bg-[#F27D26] px-3 py-1.5 rounded transition-colors"
                    >
                      {htmlCopied ? "Copied HTML!" : "Copy Semantic Grid HTML"}
                    </button>
                  </div>
                  <h4 className="font-serif font-black text-sm text-slate-900 mb-1">
                    Semantic Grid Anchor HTML Block
                  </h4>
                  <p className="text-xs text-slate-500 font-serif mb-4 leading-relaxed">
                    Insert this clean crawl block directly into your webpage templates to construct premium spider navigation nodes.
                  </p>
                  <pre className="bg-slate-900 text-emerald-400 p-4 rounded border border-slate-800 font-mono text-[10px] overflow-x-auto select-all leading-relaxed whitespace-pre max-h-[180px]">
                    {activeExtension.semanticGridHtml ? activeExtension.semanticGridHtml.trim() : `<!-- Webmaster: Anchor node grid will load on compilation -->`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB CONTAINER: LLM RAG MATRIX */}
            {activeTab === 'rag' && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="p-5 bg-purple-50 border border-purple-200 rounded-lg">
                  <h5 className="text-[10px] font-mono text-purple-800 uppercase font-bold tracking-wider mb-2">
                    LLM RAG Semantic Index & Grounding Matrix
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif">
                    RAG engines require deterministic references. This dashboard simulates prompt injected vector contexts, verifying confidence metrics, exact regulatory clauses, and site geo-coordinates in Kerala.
                  </p>
                </div>

                {/* Semantic Query Box */}
                <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-4">
                  <h5 className="text-xs font-mono text-white uppercase font-bold block">
                    Verify Document Grounding Vector
                  </h5>
                  <p className="text-xs text-slate-400 font-serif">
                    Simulate how a LLM chatbot sources information against this pillar. Click search or select the sample query key:
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      placeholder={activeExtension.ragVectors[0]?.query || "Enter query..."}
                      className="flex-grow bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded px-3 py-2 text-xs font-mono focus:border-[#F27D26]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsRagAnalyzing(true);
                        setTimeout(() => setIsRagAnalyzing(false), 800);
                      }}
                      className="bg-[#F27D26] text-white px-4 py-2 font-mono text-xs font-bold uppercase rounded hover:bg-emerald-500 transition-all cursor-pointer"
                    >
                      Search RAG
                    </button>
                  </div>

                  {/* Sample Query Fast Loader Button */}
                  {activeExtension.ragVectors[0] && (
                    <button
                      type="button"
                      onClick={() => {
                        setRagQuery(activeExtension.ragVectors[0].query);
                        setIsRagAnalyzing(true);
                        setTimeout(() => setIsRagAnalyzing(false), 800);
                      }}
                      className="text-[10px] font-mono text-amber-500 hover:underline block"
                    >
                      Load Sample Query: "{activeExtension.ragVectors[0].query}"
                    </button>
                  )}

                  {isRagAnalyzing ? (
                    <div className="p-5 border border-dashed border-slate-800 text-amber-500 text-xs font-mono text-center animate-pulse rounded">
                      Matching semantic embedding layers...
                    </div>
                  ) : ragQuery ? (
                    <div className="p-4 bg-slate-950 border border-emerald-500/20 text-[11px] font-mono text-slate-300 rounded space-y-2 {">
                      <p className="border-b border-slate-800 pb-1 text-slate-400 font-bold uppercase tracking-wider text-xs">
                        RAG GROUNDING REPORT
                      </p>
                      <p><span className="text-slate-500">Confidence Score:</span> <span className="text-emerald-400">{(0.965 + Math.random() * 0.03).toFixed(4)}</span></p>
                      <p><span className="text-slate-500">Spatial Coordinates:</span> {activeExtension.ragVectors[0]?.coordinates || '10.0543° N, 76.3242° E'}</p>
                      <p><span className="text-slate-500">Reference:</span> {activeExtension.ragVectors[0]?.groundingReference || 'CPCB Rules 2022'}</p>
                      <p><span className="text-slate-500">Compliance Clause:</span> {activeExtension.ragVectors[0]?.regulatoryClause || 'Section 12'}</p>
                      <div className="bg-slate-900 border border-slate-800 p-2.5 text-slate-400 rounded italic mt-2">
                        "{activeExtension.ragVectors[0]?.snippet || 'All systems processed must register unique hardware identities inside official compliance manifest files.'}"
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="bg-white border border-[#E5E2DA] p-6 rounded-lg text-left relative overflow-hidden">
                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(activeExtension.ragVectors, null, 2));
                        setRagMatrixCopied(true);
                        setTimeout(() => setRagMatrixCopied(false), 2000);
                      }}
                      className="text-[10px] font-mono uppercase bg-slate-100 border border-[#E5E2DA] hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded transition-colors"
                    >
                      {ragMatrixCopied ? "Matrix Copied!" : "Copy Matrix JSON"}
                    </button>
                  </div>
                  <h4 className="font-serif font-black text-sm text-slate-900 mb-1">
                    Grounding Matrix JSON Payload
                  </h4>
                  <p className="text-xs text-slate-500 font-serif mb-3 leading-relaxed">
                    This structural dataset feeds metadata injection loops to answer state-registered audits deterministically.
                  </p>
                  <pre className="bg-slate-900 text-emerald-400 p-4 rounded border border-slate-800 font-mono text-[10px] overflow-x-auto select-all leading-relaxed whitespace-pre max-h-[180px]">
                    {JSON.stringify(activeExtension.ragVectors, null, 2)}
                  </pre>
                </div>
              </div>
            )}

          </div>

          {/* DYNAMIC INTERACTIVE SIMULATIONS SEGMENT (SEC) */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-xl overflow-hidden p-6 sm:p-8 space-y-6 text-left">
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <Sparkles className="h-5 w-5 text-[#F27D26]" />
              <div>
                <span className="text-[9px] font-mono uppercase text-amber-500 tracking-wider font-bold">Pillar Interactive Action Widgets</span>
                <h4 className="text-xl font-serif font-black text-white leading-tight">Interactive Localized Simulator</h4>
              </div>
            </div>

            {/* Dynamic Widgets selection based on the Active Pillar context */}
            
            {/* Widget 1: Pickup Scheduler Form - Selected for Logistics / Collection Pillars (ID: 1, 9, 10, 15) */}
            {([1, 9, 10, 15].includes(selectedPillar.id)) && (
              <div className="space-y-5">
                <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-lg text-xs space-y-2">
                  <p className="text-emerald-400 font-bold">✓ Active Simulator: KSPCB Form-6 Bulk Collection Scheduler</p>
                  <p className="text-slate-300 font-serif">Simulate a legal corporate collection route. Enter your metrics and request an instant certified intake manifest to bypass municipal land restrictions.</p>
                </div>

                <form onSubmit={handleGenerateManifest} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-slate-400 block">Enterprise Client Name</label>
                    <input 
                      type="text"
                      value={pickupForm.companyName}
                      onChange={(e) => setPickupForm({...pickupForm, companyName: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-slate-400 block">Kochi Corporate Hub Location</label>
                    <select 
                      value={pickupForm.location}
                      onChange={(e) => setPickupForm({...pickupForm, location: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-[#F27D26]"
                    >
                      <option value="Kakkanad IT Zone">Kakkanad IT Zone (Infopark)</option>
                      <option value="SmartCity SEZ">SmartCity SEZ</option>
                      <option value="Kalamassery Industrial Belt">Kalamassery Industrial Belt</option>
                      <option value="Edappally Terminal Hub">Edappally Terminal Hub</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-slate-400 block">Estimated Inventory Units (Laptops/PCs)</label>
                    <input 
                      type="number"
                      value={pickupForm.deviceCount}
                      onChange={(e) => setPickupForm({...pickupForm, deviceCount: parseInt(e.target.value) || 10})}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-slate-400 block">Target Collection Loop Day</label>
                    <select 
                      value={pickupForm.pickupDay}
                      onChange={(e) => setPickupForm({...pickupForm, pickupDay: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none"
                    >
                      <option value="Tuesday">Tuesday (Weekly Kakkanad run)</option>
                      <option value="Thursday">Thursday (Weekly Kakkanad run)</option>
                      <option value="Saturday">Saturday (Special enterprise booking)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={manifestLoading}
                    className="sm:col-span-2 bg-[#F27D26] hover:bg-emerald-500 hover:text-slate-900 disabled:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest py-3 rounded transition-all cursor-pointer font-mono"
                  >
                    {manifestLoading ? 'Processing manifest on blockchain...' : 'Generate KSPCB Intake Manifest'}
                  </button>
                </form>

                {generatedManifest && (
                  <div className="p-5 bg-slate-950 border border-emerald-500/20 rounded-lg font-mono text-[11px] text-emerald-400 space-y-3 relative animate-fade-in select-all">
                    <div className="absolute top-4 right-4 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold">
                      FORM-6 COMPLIANT
                    </div>
                    
                    <p className="border-b border-slate-800 pb-2 text-slate-400 font-bold uppercase tracking-wider text-xs">
                      CPCB STATUTORY INTAKE CERTIFICATE ({generatedManifest.manifestId})
                    </p>
                    <p><span className="text-slate-500">CLIENT fiduclary:</span> {generatedManifest.companyName}</p>
                    <p><span className="text-slate-500">Transit node:</span> {generatedManifest.location}</p>
                    <p><span className="text-slate-500">Hardware bundle count:</span> {generatedManifest.deviceCount} Systems</p>
                    <p><span className="text-slate-500">Route schedule:</span> {generatedManifest.transitDate}</p>
                    <p><span className="text-slate-500">Authorised destination:</span> {generatedManifest.certifiedDownstreamYard}</p>
                    <p><span className="text-slate-500">KSPCB Custodian assigned:</span> {generatedManifest.regulatoryOfficer}</p>
                    
                    <div className="space-y-1 bg-slate-900 p-3 rounded text-slate-400">
                      <p className="text-[9px] uppercase font-bold text-amber-500">Scanned Hardware serials (blockchain logs):</p>
                      {generatedManifest.scannedSerials.map((s: any, i: number) => (
                        <p key={i} className="text-[10px]">&gt; {s.serial} - status: <span className="text-emerald-400">{s.status}</span></p>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 text-center italic mt-2">Certified under E-Waste (Management) Rules 2016-2022</p>
                  </div>
                )}
              </div>
            )}

            {/* Widget 2: Serial Drive Overwriter - Selected for Security / Data destruction Pillars (ID: 7, 18, 12, 13) */}
            {([7, 18, 12, 13].includes(selectedPillar.id)) && (
              <div className="space-y-5">
                <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-lg text-xs space-y-2">
                  <p className="text-orange-400 font-bold">✓ Active Simulator: NIST 800-88 Logical Storage Sanitizer</p>
                  <p className="text-slate-300 font-serif">Simulate a high-precision military logical file purge. Overwrite mechanical storage tracks with random binaries to guarantee DPDP Act 2023 compliance.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3 font-mono text-xs">
                    <label className="text-slate-400 block">Select target media model:</label>
                    <input 
                      type="text"
                      value={wipeDriveModel}
                      onChange={(e) => setWipeDriveModel(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none"
                    />
                    
                    <button 
                      onClick={handleStartWipe}
                      disabled={isWiping}
                      className="w-full bg-[#F27D26] hover:bg-slate-800 text-white font-bold py-2.5 rounded uppercase tracking-wider text-[11px] transition-all cursor-pointer"
                    >
                      {isWiping ? 'WIPING SECTORS...' : 'Launch Logical Purge'}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Status: {isWiping ? 'Processing...' : wipeDone ? 'ERASED' : 'HOLDING'}</span>
                      <span className="text-[#F27D26]">{wipeProgress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-150" style={{ width: `${wipeProgress}%` }}></div>
                    </div>

                    <div className="text-[10px] leading-tight space-y-1">
                      <p><span className="text-slate-500">Active Block Hex:</span> <span className="text-amber-500">{activeSector}</span></p>
                      <p><span className="text-slate-500">Method applied:</span> NIST 800-88 Purge (3-Pass)</p>
                      <p><span className="text-slate-500">Compliance state:</span> {wipeDone ? 'SECURED / CERTIFIED' : 'PENDING AUDIT'}</p>
                    </div>
                  </div>
                </div>

                {wipeDone && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-mono space-y-2 animate-fade-in select-all">
                    <p className="font-bold border-b border-emerald-500/20 pb-1.5 text-center text-sm uppercase">NIST 800-88 DATA SANITIZATION SEAL</p>
                    <p>This certifies that the storage hardware device <span className="underline">{wipeDriveModel}</span> has successfully completed logical dry-erase sanitization. Unbroken sector analysis checked at Ernakulam Regional Labor base has proved 100% molecular sanitization. Device compliant under Digital Personal Data Protection Act 2023 rules.</p>
                    <p className="text-[10px] mt-1 text-slate-500 text-right">Certificate ID: COD-NIST-{Math.floor(Math.random() * 89999 + 10000)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Widget 3: Compliance Self-Assessment Quiz - Selected for Regulations / General Legislation (ID: 6, 20, 19, 2) */}
            {([6, 20, 19, 2].includes(selectedPillar.id)) && (
              <div className="space-y-5">
                <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-lg text-xs space-y-2">
                  <p className="text-amber-400 font-bold">✓ Active Simulator: Corporate Audit Self-Assessment</p>
                  <p className="text-slate-300 font-serif">Toggle your operational compliance check variables. Calculate active protection confidence metrics against KSPCB regulations and CPCB E-Waste target levels.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-xs font-mono">
                      <span>Form-6 Manifests issued on transfers?</span>
                      <input 
                        type="checkbox"
                        checked={auditChecklist.form6}
                        onChange={(e) => setAuditChecklist({...auditChecklist, form6: e.target.checked})}
                        className="rounded text-[#F27D26] focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-xs font-mono">
                      <span>NIST 800-88 Data Sanitization logged?</span>
                      <input 
                        type="checkbox"
                        checked={auditChecklist.nist}
                        onChange={(e) => setAuditChecklist({...auditChecklist, nist: e.target.checked})}
                        className="rounded text-[#F27D26] focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-xs font-mono">
                      <span>Licensed KSPCB Recycler engaged?</span>
                      <input 
                        type="checkbox"
                        checked={auditChecklist.kspcb}
                        onChange={(e) => setAuditChecklist({...auditChecklist, kspcb: e.target.checked})}
                        className="rounded text-[#F27D26] focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-xs font-mono">
                      <span>DPDP Act compliant erasure audit?</span>
                      <input 
                        type="checkbox"
                        checked={auditChecklist.dpdp}
                        onChange={(e) => setAuditChecklist({...auditChecklist, dpdp: e.target.checked})}
                        className="rounded text-[#F27D26] focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-center font-mono space-y-3">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">State Audit Confidence Rating</p>
                    <div className="text-4xl font-black text-emerald-400">{auditComplianceScore}%</div>
                    <p className="text-[10px] text-slate-500">
                      {auditComplianceScore === 100 
                        ? 'PERFECT STATE COMPLIANCE. CERTIFICATE READY FOR SUBMISSION.'
                        : auditComplianceScore >= 60 
                        ? 'MODERATE COMPLIANCE. SECURE MISSING CERTIFICATIONS SOON.'
                        : 'COMPLIANCE AUDIT AT STATUTORY RISK.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Default fallback: JSON-LD Schema exporter for educational search engine optimization */}
            {(![1, 9, 10, 15, 7, 18, 12, 13, 6, 20, 19, 2].includes(selectedPillar.id)) && (
              <div className="space-y-4">
                <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-lg text-xs space-y-2">
                  <p className="text-blue-400 font-bold">✓ Active Tool: Structured Web Schema Exporter</p>
                  <p className="text-slate-300 font-serif">Expose standard JSON-LD Schema schemas programmatically. Perfect for researchers, crawler scripts, and modern corporate search engines.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-x-auto select-all leading-relaxed whitespace-pre font-medium">
                  {selectedPillar.schemaMarkup}
                </div>

                <div className="text-[10px] text-slate-500 font-serif text-center italic mt-1">
                  Click the "Schema JSON-LD" button at the top to copy this SEO script instantly to clipboard.
                </div>
              </div>
            )}

          </div>

          {/* Bottom editorial section linking pillars back to home */}
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-6 rounded-lg text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h5 className="font-serif font-black text-slate-900 text-base">Satisfied with your localized compliance parameters?</h5>
              <p className="text-xs text-slate-500 font-serif">Calculate your physical scrap buyback rates directly on the active valuation tool.</p>
            </div>
            
            <button 
              onClick={() => {
                const element = document.getElementById('hero-news-grid');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-slate-900 border border-slate-900 hover:bg-[#F27D26] hover:border-[#F27D26] text-white text-xs font-bold uppercase tracking-widest rounded transition-all font-mono inline-flex items-center gap-1 cursor-pointer"
            >
              Analyze News Articles <FileText className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
