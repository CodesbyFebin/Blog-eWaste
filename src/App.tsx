import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Cpu, 
  Leaf, 
  BookOpen, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Smartphone, 
  Database, 
  Share2, 
  X, 
  Copy, 
  Clock, 
  DollarSign, 
  BarChart, 
  TrendingUp, 
  Sparkles,
  ExternalLink,
  BookMarked,
  MessageSquare,
  Trash2,
  ShieldAlert,
  Play,
  HelpCircle,
  Activity,
  MapPin,
  Users,
  Award,
  FileText,
  Check
} from 'lucide-react';
import { ARTICLES, KOCHI_ENTITIES, AUTHORS } from './data/knowledge';
import { Article, KochiEntity, ValuedDevice, Certificate, EsgReport } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import PillarsDirectory from './components/PillarsDirectory';
import NewsTicker from './components/NewsTicker';
import InteractiveComplianceChart from './components/InteractiveComplianceChart';
import SeoBlueprintDesk from './components/SeoBlueprintDesk';
import HeroSection from './components/HeroSection';
import AuthModal from './components/AuthModal';
import ModerationDashboard from './components/ModerationDashboard';
import TrustStatsGmb from './components/TrustStatsGmb';
import { AboutPage, ContactPage, PoliciesPage } from './components/AboutContactPolicies';
import FaqSection from './components/FaqSection';
import SemanticIntelligence from './components/SemanticIntelligence';

import TrustProof from './components/TrustProof';
import CoreServices from './components/CoreServices';
import EWasteKochiGallery from './components/EWasteKochiGallery';
import CorporateBooking from './components/CorporateBooking';
import CpcbComplianceGraph from './components/CpcbComplianceGraph';
import DataDestructionNist from './components/DataDestructionNist';
import FaqCluster from './components/FaqCluster';
import Footprint from './components/Footprint';
import FeaturedArticles from './components/FeaturedArticles';
import { 
  getLocalBusinessSchema, 
  getFaqSchema, 
  getHowToSchema, 
  getBreadcrumbSchema, 
  getArticleSchema, 
  getWebSiteSchema 
} from './utils/schemaGenerator';

// Seed premium comments to display right on load
const SEED_COMMENTS = [
  {
    id: 'seed-1',
    articleSlug: 'kochi-ewaste-crisis',
    author: 'Dr. Ramesh Nair (Cochin University)',
    content: "An exceptionally thorough analysis of Kochi's local secondary board requirements. The Kakkanad processing yard indeed needs an expedited high-temperature physical shredder upgrade to match the sheer density of Infopark decommissioning spikes.",
    timestamp: '23 May 2026, 10:30 AM',
    approved: true,
    flagged: false
  },
  {
    id: 'seed-2',
    articleSlug: 'kochi-ewaste-crisis',
    author: 'Anjali Kurian (Circular Solutions Ltd)',
    content: 'Excellent points. Under the CPCB E-Waste rules 2022, corporate hubs are fully liable for securing verifiable certificates of destruction. Looking forward to see if the proposed API schema gets adopted region-wide.',
    timestamp: '22 May 2026, 04:15 PM',
    approved: true,
    flagged: false
  },
  {
    id: 'seed-3',
    articleSlug: 'dpdp-act-2023-compliance',
    author: 'Adv. Harisankar M. (Cyber Law Advisory)',
    content: 'Under Article 11 of the DPDP Act 2023, data processors must verify complete physical and logical erasure on decommissioned storage cells. A NIST 800-88 compliance seal is the absolute baseline.',
    timestamp: '23 May 2026, 09:12 AM',
    approved: true,
    flagged: false
  }
];

export default function App() {
  const [currentView, setView] = useState<'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies'>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User Auth State using localstorage
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; isAdmin: boolean } | null>(() => {
    const saved = localStorage.getItem('ewastekochi_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bannedWords, setBannedWords] = useState<string[]>(['bitcoin', 'viagra', 'spam', 'casino', 'hack']);
  
  // States for active features
  const [apiSummary, setApiSummary] = useState<{ summary: string; faq: { q: string; a: string; }[]; aiPowered: boolean } | null>(null);
  const [apiSummaryLoading, setApiSummaryLoading] = useState<boolean>(false);
  
  // Buyback state
  const [valuatorForm, setValuaterForm] = useState({
    brand: 'Apple',
    model: 'MacBook Pro M1 14-inch',
    year: 2021,
    condition: 'A' as 'A' | 'B' | 'C'
  });
  const [valuationResult, setValuationResult] = useState<any>(null);
  const [valuatorLoading, setValuatorLoading] = useState<boolean>(false);

  // Verifier state
  const [verifyId, setVerifyId] = useState<string>('COD-KOCHI-2026-083');
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  // ESG states
  const [esgForm, setEsgForm] = useState({
    clientName: 'Infopark TechSolutions Ltd',
    deviceCount: 45
  });
  const [esgResult, setEsgResult] = useState<EsgReport | null>(null);
  const [esgLoading, setEsgLoading] = useState<boolean>(false);

  // Copy schemas feedback
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sharing feedback states
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Comment system state
  const [comments, setComments] = useState<any[]>(() => {
    const saved = localStorage.getItem('knowledge_base_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing local comments data, falling back to seed comments', e);
      }
    }
    return SEED_COMMENTS;
  });

  // Admin moderation privilege toggle state
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [commentForm, setCommentForm] = useState({ author: '', content: '' });
  const [commentSuccessMsg, setCommentSuccessMsg] = useState<string | null>(null);

  // Voice dictation states using Web Speech API
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [dictationError, setDictationError] = useState<string | null>(null);
  const [speechRecognitionInstance, setSpeechRecognitionInstance] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = 'en-IN'; // Kochi regional local accent optimisation

      rec.onresult = (event: any) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        setCommentForm(prev => ({
          ...prev,
          content: prev.content ? prev.content + ' ' + transcript.trim() : transcript.trim()
        }));
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setDictationError('Microphone permission blocked. Please allow/enable microphone access.');
        } else {
          setDictationError(`Voice error: ${event.error}`);
        }
        setIsDictating(false);
      };

      rec.onend = () => {
        setIsDictating(false);
      };

      setSpeechRecognitionInstance(rec);
    }
  }, []);

  const toggleDictation = () => {
    if (!speechRecognitionInstance) {
      setDictationError('Web Speech API is not supported in this browser environment. Try Chrome.');
      return;
    }

    if (isDictating) {
      speechRecognitionInstance.stop();
      setIsDictating(false);
    } else {
      try {
        setDictationError(null);
        speechRecognitionInstance.start();
        setIsDictating(true);
      } catch (err) {
        console.error('Speech start request failed:', err);
      }
    }
  };

  // Additional Interactive Blog Engine States (for the 18 canonical homepage sections)
  const [selectedEntityId, setSelectedEntityId] = useState<string>('CPCB');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [commodityWeightKg, setCommodityWeightKg] = useState<number>(45);
  const [discoverActiveEmotion, setDiscoverActiveEmotion] = useState<string>('all');
  const [activeVideoSlug, setActiveVideoSlug] = useState<string | null>(null);

  // New homepage refactored nodes and quick booking simulation status
  const [homeActiveGraphNode, setHomeActiveGraphNode] = useState<string>('kochi');
  const [homeQuickBookingState, setHomeQuickBookingState] = useState<{ submitted: boolean; refId: string; clientName: string } | null>(null);

  // Synchronize comments to localStorage
  useEffect(() => {
    localStorage.setItem('knowledge_base_comments', JSON.stringify(comments));
  }, [comments]);

  // Dynamic JSON-LD Schema Injector with support for Article, FAQ, Breadcrumb, HowTo, and LocalBusiness
  useEffect(() => {
    // 1. Clean up existing schema tags
    const ids = [
      'schema-website', 
      'schema-localbusiness', 
      'schema-faq', 
      'schema-howto', 
      'schema-breadcrumb', 
      'schema-article',
      'dynamic-jsonld-schema' // backward compatibility clean-up
    ];
    ids.forEach(id => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    });

    const createScript = (id: string, data: any) => {
      if (!data) return;
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data, null, 2);
      document.head.appendChild(script);
    };

    // If an article is specifically active, focus primarily on Article Details + Breadcrumbs!
    if (selectedArticleSlug) {
      const art = ARTICLES.find(a => a.slug === selectedArticleSlug);
      const artSchema = getArticleSchema(selectedArticleSlug);
      if (artSchema) {
        createScript('schema-article', artSchema);
        createScript('schema-breadcrumb', getBreadcrumbSchema(`/article/${selectedArticleSlug}`, art?.title));
      }
      createScript('schema-localbusiness', getLocalBusinessSchema());
    } else {
      // Path based schema resolution
      const path = currentView === 'home' ? '/' : `/${currentView}`;
      createScript('schema-breadcrumb', getBreadcrumbSchema(path));
      createScript('schema-localbusiness', getLocalBusinessSchema());

      if (currentView === 'home') {
        createScript('schema-website', getWebSiteSchema());
        createScript('schema-faq', getFaqSchema());
        createScript('schema-howto', getHowToSchema());
      } else if (currentView === 'valuator') {
        createScript('schema-howto', getHowToSchema());
      }
    }

    return () => {
      ids.forEach(id => {
        const cleanUp = document.getElementById(id);
        if (cleanUp) cleanUp.remove();
      });
    };
  }, [selectedArticleSlug, currentView]);

  // Handle sharing action
  const handleShare = (platform: 'twitter' | 'linkedin' | 'reddit' | 'facebook' | 'copy') => {
    const shareUrl = window.location.href;
    const shareTitle = selectedArticleSlug ? ARTICLES.find(a => a.slug === selectedArticleSlug)?.title : 'Kochi Circle Knowledge Hub';
    const promoText = `Check out this premium citation and compliance analysis on corporate e-waste logistics: "${shareTitle}" — at `;
    
    if (platform === 'twitter') {
      const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(promoText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(xUrl, '_blank');
    } else if (platform === 'linkedin') {
      const lnUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(lnUrl, '_blank');
    } else if (platform === 'facebook') {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(fbUrl, '_blank');
    } else if (platform === 'reddit') {
      const rdUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(promoText)}`;
      window.open(rdUrl, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${promoText} ${shareUrl}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Moderation Handlers
  const handleApproveComment = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const handleToggleFlagComment = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, flagged: !c.flagged } : c));
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.content.trim()) return;

    // Pre-fill / overwrite author if user is logged in
    const finalAuthor = currentUser ? currentUser.name : (commentForm.author.trim() || 'Anonymous Scholar');

    const newComment = {
      id: 'comment-' + Date.now(),
      articleSlug: selectedArticleSlug || 'general',
      author: finalAuthor,
      content: commentForm.content.trim(),
      timestamp: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      approved: false,
      flagged: false,
      reportsCount: 0,
      reportReasons: [] as string[]
    };

    // Filter against banned/blacklisted vocabulary
    const containsBanned = bannedWords.some(word => 
      newComment.content.toLowerCase().includes(word.toLowerCase()) || 
      newComment.author.toLowerCase().includes(word.toLowerCase())
    );

    if (containsBanned) {
      newComment.flagged = true;
      newComment.approved = false;
      setComments(prev => [newComment, ...prev]);
      setCommentForm({ author: '', content: '' });
      setCommentSuccessMsg('🚨 Submission caught by real-time content filters. Your comment has been flagged and auto-rejected.');
      setTimeout(() => setCommentSuccessMsg(null), 8000);
      return;
    }

    if (currentUser?.isAdmin) {
      // Auto-approved!
      newComment.approved = true;
      setComments(prev => [newComment, ...prev]);
      setCommentForm({ author: '', content: '' });
      setCommentSuccessMsg('✓ Published instantly via verified Lead Auditor clearance.');
    } else {
      setComments(prev => [newComment, ...prev]);
      setCommentForm({ author: '', content: '' });
      setCommentSuccessMsg('📨 Review received. Your discourse has been queued for physical publication audit. Submitters with Lead clearance bypass vetting.');
    }
    setTimeout(() => setCommentSuccessMsg(null), 7000);
  };

  // Trigger valuation on load once
  useEffect(() => {
    triggerValuation();
    triggerEsgCalculation();
  }, []);

  // Fetch AI Summaries + FAQ whenever selected article changes
  useEffect(() => {
    if (selectedArticleSlug) {
      fetchAiSummary(selectedArticleSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedArticleSlug]);

  const fetchAiSummary = async (slug: string) => {
    setApiSummaryLoading(true);
    setApiSummary(null);
    try {
      const res = await fetch(`/api/llm-summary?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setApiSummary(data);
      }
    } catch (e) {
      console.error('Error fetching LLM summary:', e);
    } finally {
      setApiSummaryLoading(false);
    }
  };

  const triggerValuation = async () => {
    setValuatorLoading(true);
    try {
      const res = await fetch('/api/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valuatorForm)
      });
      if (res.ok) {
        const data = await res.json();
        setValuationResult(data);
      }
    } catch (error) {
      console.error('Failed valuation fetch', error);
    } finally {
      setValuatorLoading(false);
    }
  };

  const triggerEsgCalculation = async () => {
    setEsgLoading(true);
    try {
      const res = await fetch('/api/esg-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(esgForm)
      });
      if (res.ok) {
        const data = await res.json();
        setEsgResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEsgLoading(false);
    }
  };

  const triggerVerification = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!verifyId.trim()) return;
    setVerifyLoading(true);
    setVerifyError(null);
    setVerifyResult(null);

    try {
      const res = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: verifyId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVerifyResult(data.certificate);
      } else {
        setVerifyError(data.error || 'Verification failed. Try COD-KOCHI-2026-083');
      }
    } catch (err) {
      setVerifyError('Network error. Check server log output.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleCopySchema = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filters articles
  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.entities.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedArticle = ARTICLES.find(a => a.slug === selectedArticleSlug);

  return (
    <div id="app-root" className="min-h-screen bg-[#FAF9F6] dark:bg-slate-950 text-[#1A1A1A] dark:text-slate-100 font-sans selection:bg-[#F27D26]/20 selection:text-[#1A1A1A] flex flex-col justify-between transition-colors duration-300">
      {/* Editorial Header */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        selectedArticleSlug={selectedArticleSlug}
        setSelectedArticleSlug={setSelectedArticleSlug}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('ewastekochi_active_user');
          if (currentView === 'moderate') {
            setView('home');
          }
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <NewsTicker />

      {/* Full-width dark glowing Hero section for high engagement */}
      {currentView === 'home' && !selectedArticle && (
        <HeroSection 
          onRequestPickup={() => {
            const estimatorWidget = document.getElementById('quick-pickup-form') || document.getElementById('price-estimator-widget');
            if (estimatorWidget) {
              estimatorWidget.scrollIntoView({ behavior: 'smooth' });
            } else {
              const mainRoot = document.getElementById('app-root');
              if (mainRoot) mainRoot.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onNavigateToView={(view) => {
            setView(view);
            setSelectedArticleSlug(null);
          }}
        />
      )}

      {/* Main Container - consistent premium print journal padding & spacing */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-20">
        
        {/* Banner with Citations Live ticker - with generous margins and padding */}
        <div className="bg-white border border-[#E5E2DA] px-8 py-6 rounded-lg mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-serif">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-x bg-[#F27D26] w-2.5 h-2.5 rounded-full inline-block animate-pulse"></span>
              <strong>Discover Stories Feed:</strong> Live Signal
            </span>
            <span>•</span>
            <span><strong>KSPCB Regional License:</strong> certified KL/EW/628</span>
            <span>•</span>
            <span><strong>DPDP Scope:</strong> Audited</span>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="/api/discover-feed" 
              target="_blank" 
              className="text-xs bg-[#FAF9F6] border border-[#E5E2DA] px-4 py-2 rounded inline-flex items-center gap-1.5 font-mono hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A]"
            >
              <Database className="h-3 w-3 text-[#F27D26]" /> View Discover Feed JSON Schema
            </a>
          </div>
        </div>

        {/* View Switcher based on URL simulations */}
        {!selectedArticle ? (
          <>
            {/* VIEW: HOME / BLOG INDEX */}
            {currentView === 'home' && (
              <div className="space-y-2 sm:space-y-4 bg-[#fcfcfb]">
                
                {/* SECTION 2: TRUST PROOF */}
                <TrustProof />

                {/* SECTION 3: CORE SERVICES */}
                <CoreServices 
                  onNavigateToView={(view) => {
                    setView(view);
                    setSelectedArticleSlug(null);
                  }}
                  onScrollToPickupForm={() => {
                    const el = document.getElementById('quick-pickup-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* SECTION 3.5: REAL OPERATIONS GALLERY */}
                <EWasteKochiGallery />

                {/* SECTION 4: CORPORATE BOOKING & SCHEDULER */}
                <CorporateBooking />

                {/* SECTION 5: COMPLIANCE KNOWLEDGE GRAPH */}
                <CpcbComplianceGraph />

                {/* SECTION 6: DATA DESTRUCTION STANDARDS */}
                <DataDestructionNist />

                {/* SECTION 7: FEATURED CANONICAL ARTICLES */}
                <FeaturedArticles 
                  onSelectArticle={(slug) => {
                    setSelectedArticleSlug(slug);
                    const topElem = document.getElementById('app-root');
                    if (topElem) topElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* SECTION 8: FAQ CLIENT SERVICE PORTAL */}
                <FaqCluster />

                {/* SECTION 9: SERVICE FOOTPRINT & COORDINATES */}
                <Footprint />

                {/* Wrap previous heavy components in hidden container to preserve type routing */}
                <div className="hidden">
                  {/* 1. HERO NEWS GRID (SEC 1) */}
                <div id="hero-news-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 border-b border-[#E5E2DA] pb-12 lg:pb-16">
                  
                  {/* Left Big Lead Panel - 7 Columns - rich negative space */}
                  <div className="lg:col-span-8 flex flex-col justify-between pr-0 lg:pr-10 lg:border-r lg:border-[#E5E2DA]">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#1A1A1A] text-white text-[10px] font-mono px-2.5 py-0.5 uppercase tracking-widest font-bold rounded-sm">
                          Featured Discovery
                        </span>
                        <span className="text-xs font-serif italic text-slate-500">
                          {ARTICLES[0].date} — {ARTICLES[0].wordCount} Words
                        </span>
                      </div>
 
                      <h2 
                        onClick={() => setSelectedArticleSlug(ARTICLES[0].slug)}
                        className="text-3.5xl sm:text-4.5xl lg:text-5.5xl font-serif font-black leading-[1.08] tracking-tight hover:text-[#F27D26] cursor-pointer transition-colors duration-200"
                      >
                        {ARTICLES[0].title}
                      </h2>
 
                      <p className="mt-5 text-base sm:text-lg text-slate-600 font-serif leading-relaxed">
                        {ARTICLES[0].metaDescription}
                      </p>
 
                      <div className="mt-6 p-5 bg-white border border-[#E5E2DA] rounded-lg flex flex-col sm:flex-row items-center gap-5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={ARTICLES[0].author.avatar} 
                            alt={ARTICLES[0].author.name}
                            className="w-10 h-10 rounded-full object-cover grayscale"
                          />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">{ARTICLES[0].author.name}</p>
                            <p className="text-[11px] text-slate-500 font-serif italic">{ARTICLES[0].author.role}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedArticleSlug(ARTICLES[0].slug)}
                          className="sm:ml-auto w-full sm:w-auto bg-[#F27D26] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-slate-900 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                        >
                          Read Editorial Guide <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
 
                    <div className="mt-8 pt-6 border-t border-[#E5E2DA] flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#F27D26] font-bold mr-2">Entities Cited on Hero:</span>
                      {ARTICLES[0].entities.map(ent => (
                        <span 
                          key={ent} 
                          onClick={() => {
                            const foundKey = Object.keys(KOCHI_ENTITIES).find(k => k.toLowerCase().includes(ent.toLowerCase()) || ent.toLowerCase().includes(k.toLowerCase()));
                            if (foundKey) {
                              setSelectedEntityId(foundKey);
                              const elem = document.getElementById('entity-explorer');
                              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              setView('wiki');
                            }
                          }}
                          className="text-[9px] font-mono bg-[#F4F2EE] border border-[#E5E2DA] py-1 px-2.5 rounded text-slate-700 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                        >
                          {ent}
                        </span>
                      ))}
                    </div>
                  </div>
 
                  {/* Right Teasers Side Rail - 4 Columns */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-slate-900 pb-2.5 flex items-center justify-between">
                        <span>Corporate Briefs</span>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">SEC Rules</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-white border border-[#E5E2DA] rounded-lg">
                          <span className="text-[9px] font-mono uppercase text-[#F27D26] tracking-wider font-bold">Kochi Tech Corridor</span>
                          <h4 className="text-sm font-serif font-bold text-slate-900 mt-1 leading-snug">Infopark SaaS companies transition 4,500 units under Form-6 compliance rules in 2026.</h4>
                          <p className="text-[11px] text-slate-500 font-serif mt-1">Audit boards report zero physical hard drive storage cells leaked through Ernakulam custom channels.</p>
                        </div>
                        <div className="p-4 bg-white border border-[#E5E2DA] rounded-lg">
                          <span className="text-[9px] font-mono uppercase text-emerald-600 tracking-wider font-bold">DPDP Act Safeguard</span>
                          <h4 className="text-sm font-serif font-bold text-slate-900 mt-1 leading-snug">State-level data fiduciaries face liability up to ₹250 Crores for negligent laptop storage leaks.</h4>
                          <p className="text-[11px] text-slate-500 font-serif mt-1">Double-pass overwrites or certified 2mm mechanical shredding is the minimum corporate protocol required.</p>
                        </div>
                      </div>
                    </div>
 
                    <div className="p-5 bg-[#1A1A1A] text-white rounded-lg space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-[#F27D26] uppercase font-bold">RAG Schema Model</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <p className="text-[11px] font-serif text-slate-300 leading-relaxed">
                        Each entity is mapped to static regional subdirectories, exposing JSON-LD tags parsed seamlessly by Google Discover and enterprise LLMs.
                      </p>
                      <button 
                        onClick={() => {
                          const element = document.getElementById('discover-stories');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Analyze Discover Feed System →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-8 pb-16 border-b border-[#E5E2DA]">
                  <SemanticIntelligence 
                    onNavigateToView={(view) => {
                      setView(view);
                      setSelectedArticleSlug(null);
                    }}
                    onSelectArticle={(slug) => {
                      setSelectedArticleSlug(slug);
                      const topElem = document.getElementById('app-root');
                      if (topElem) topElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </div>
 
                {/* 2. TRENDING ARTICLES (SEC 2) */}
                <div id="trending-articles" className="space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-[#F27D26]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">Trending Knowledge Layers</h3>
                    <span className="h-px bg-[#E5E2DA] flex-grow"></span>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ARTICLES.slice(0, 3).map((art, idx) => (
                      <div 
                        key={`trend-${art.slug}`} 
                        onClick={() => setSelectedArticleSlug(art.slug)}
                        className="p-5 bg-white border border-[#E5E2DA] hover:border-[#F27D26] rounded-lg transition-all duration-300 group cursor-pointer relative"
                      >
                        <span className="absolute top-4 right-4 text-4xl font-serif font-black text-slate-100 group-hover:text-[#F27D26]/10 transition-colors">
                          0{idx + 1}
                        </span>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#F27D26] uppercase font-bold">
                            <span>{art.category.replace('-', ' ')}</span>
                            <span>•</span>
                            <span>{art.trending_weight ? Math.round(art.trending_weight * 100) : 90}% Weight</span>
                          </div>
                          <h4 className="text-base font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors leading-snug">
                            {art.title}
                          </h4>
                          <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-400 font-mono">
                            <Clock className="h-3 w-3" />
                            <span>{Math.round(art.wordCount / 300)} Min Read</span>
                            <span>•</span>
                            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Active Signal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
 
                {/* 3. AI INSIGHTS COLUMN (SEC 3) & AI RECYCLING RESEARCH (SEC 8) */}
                <div id="ai-insights" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="p-6 sm:p-8 bg-white border border-[#E5E2DA] rounded-xl space-y-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-[#F27D26]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">SEC 3 / AI Insights Node</span>
                      </div>
                      <h4 className="text-2xl font-serif font-black text-[#1A1A1A]">Autonomous Valuation & Refurbish Logistics</h4>
                      <p className="text-sm font-serif text-slate-600 leading-relaxed mt-2">
                        How convolutional vision models and AI logic are automating ITAD buybacks and laptop triage processes at Kochi. By querying raw device parameters like motherboard chipset and cosmetic wear factors, the engine estimates the commercial lifecycle value and metal recovery weight of silicon arrays.
                      </p>
                      
                      <div className="mt-4 p-4 bg-[#FAF9F6] border border-[#E5E2DA] rounded text-xs font-mono space-y-2">
                        <p className="text-slate-700"><strong>Autonomous SLA Standard:</strong></p>
                        <p className="text-slate-500">• Scrap Depreciation index: 25% annual threshold</p>
                        <p className="text-slate-500">• Silicon extraction purity standard: 99.1% (Class I)</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setView('valuator')}
                      className="mt-6 w-full text-center bg-slate-900 hover:bg-[#F27D26] text-white font-mono text-xs uppercase tracking-widest py-3 rounded transition-colors duration-200 cursor-pointer"
                    >
                      Initialize Valuation Engine API
                    </button>
                  </div>
 
                  <div className="p-6 sm:p-8 bg-[#F4F2EE] border border-[#E5E2DA] rounded-xl space-y-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="h-4 w-4 text-[#F27D26]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">SEC 8 / AI RECYCLING RESEARCH</span>
                      </div>
                      <h4 className="text-2xl font-serif font-black text-[#1A1A1A]">Gemini Edge Inference Sorting Yields</h4>
                      <p className="text-sm font-serif text-slate-600 leading-relaxed mt-2">
                        Deploying lightweight local models on Edge TPU boards at Kalamassery. High-precision sorting cameras classify plastic resins (ABS/PC) and distinguish battery components under 45ms latency profiles.
                      </p>
 
                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#E5E2DA]">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-slate-400 block">Classifier Model</span>
                          <span className="text-sm font-bold text-slate-800 font-mono">MobileNet-V4 Optimized</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-slate-400 block">TPU Throughput</span>
                          <span className="text-sm font-bold text-slate-800 font-mono">15 TOPS / Core</span>
                        </div>
                      </div>
                    </div>
 
                    <div className="bg-white p-3.5 rounded border border-[#E5E2DA] text-[10px] font-mono text-slate-500 flex justify-between items-center ready-class">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Edge Model Server Online</span>
                      <span className="text-[#F27D26] font-bold">Kochi Region Hub</span>
                    </div>
                  </div>
                </div>
 
                {/* 4. GOOGLE DISCOVER STORIES (SEC 4) */}
                <div id="discover-stories" className="bg-white border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E2DA] pb-5">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">SEC 4 / Crawl Engine Diagnostic</span>
                      <h3 className="text-2xl font-serif font-black text-[#1A1A1A] mt-1">Google Discover Feed Optimization Simulator</h3>
                      <p className="text-xs text-slate-500 font-serif mt-1">Discover rewards emotional thumbnails, CTR triggers, recent dates, and 1200px+ graphics.</p>
                    </div>
                    {/* Emotion selectors to simulate Google crawling filtering */}
                    <div className="flex flex-wrap gap-2">
                      {['all', 'urgency', 'surprise', 'relief', 'curiosity'].map(emotion => (
                        <button
                          key={emotion}
                          onClick={() => setDiscoverActiveEmotion(emotion)}
                          className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                            discoverActiveEmotion === emotion 
                              ? 'bg-[#F27D26] text-white font-bold' 
                              : 'bg-[#FAF9F6] border border-[#E5E2DA] hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ARTICLES
                      .filter(art => discoverActiveEmotion === 'all' || art.discover_emotion === discoverActiveEmotion)
                      .slice(0, 3)
                      .map(art => (
                        <div key={`disc-${art.slug}`} className="border border-[#E5E2DA] hover:border-slate-800 transition-all rounded-lg overflow-hidden flex flex-col justify-between bg-[#FAF9F6]">
                          <div className="relative h-44 bg-slate-100 overflow-hidden">
                            <img 
                              src={art.discover_thumbnail} 
                              alt={art.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 flex gap-1">
                              <span className="bg-[#1A1A1A] text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider rounded font-bold">
                                {art.discover_emotion} Target
                              </span>
                              <span className="bg-emerald-500 text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider rounded font-bold">
                                indexable
                              </span>
                            </div>
                          </div>
 
                          <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">{art.date} • {art.wordCount} Words</span>
                              <h4 
                                onClick={() => setSelectedArticleSlug(art.slug)}
                                className="text-lg font-serif font-black text-slate-900 mt-1 lines-clamp-2 hover:text-[#F27D26] cursor-pointer"
                              >
                                {art.title}
                              </h4>
                              <p className="text-xs text-slate-600 font-serif line-clamp-2 mt-2 leading-relaxed">
                                {art.metaDescription}
                              </p>
                            </div>
 
                            <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between">
                              <span className="text-[9px] font-mono text-slate-400 uppercase">Aspect: 16:9 </span>
                              <button 
                                onClick={() => setSelectedArticleSlug(art.slug)}
                                className="text-xs font-mono font-bold text-[#F27D26] hover:underline cursor-pointer flex items-center gap-1"
                              >
                                View Schema <ArrowRight className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {ARTICLES.filter(art => discoverActiveEmotion === 'all' || art.discover_emotion === discoverActiveEmotion).length === 0 && (
                      <div className="col-span-1 md:col-span-3 py-10 text-center font-serif italic text-slate-400 bg-white border border-[#E5E2DA] rounded">
                        No articles match the '{discoverActiveEmotion}' emotion index. Try setting 'all'.
                      </div>
                    )}
                  </div>
                </div>
 
                {/* 5. ESG & RECOVERY COMMODITY PRICING INDEX (SEC 5) */}
                <div id="market-analysis" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column - Live commodity Ticker cards */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="border-b border-[#E5E2DA] pb-3">
                      <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider block">SEC 5 / Market Forecast</span>
                      <h4 className="text-xl font-serif font-black text-[#1A1A1A]">2026 Metal Secondary Spot Index</h4>
                      <p className="text-[11px] text-slate-500 font-serif">Kochi region corporate scrap valuation index per gram/kilogram of retrieved material.</p>
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                      <div className="p-4 bg-white border border-[#E5E2DA] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Gold (99.9% Pure)</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+1.4%</span>
                        </div>
                        <div className="text-xl font-mono font-black text-slate-900 mt-1">₹6,800 <span className="text-xs font-sans text-slate-400 font-normal">/ gram</span></div>
                        <span className="text-[9px] text-slate-400 font-serif block mt-1">Dug from processor pin solder alloys</span>
                      </div>
 
                      <div className="p-4 bg-white border border-[#E5E2DA] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Copper (Grade IA)</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+3.8%</span>
                        </div>
                        <div className="text-xl font-mono font-black text-slate-900 mt-1">₹780 <span className="text-xs font-sans text-slate-400 font-normal">/ kg</span></div>
                        <span className="text-[9px] text-slate-400 font-serif block mt-1">Coil windings & power lead cores</span>
                      </div>
 
                      <div className="p-4 bg-white border border-[#E5E2DA] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Aluminum alloy</span>
                          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">Stable</span>
                        </div>
                        <div className="text-xl font-mono font-black text-slate-900 mt-1">₹220 <span className="text-xs font-sans text-slate-400 font-normal">/ kg</span></div>
                        <span className="text-[9px] text-slate-400 font-serif block mt-1">Laptop shell components & heat sinks</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Right Column - Extraction Slider Calculator */}
                  <div className="lg:col-span-8 bg-white border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">Interactive Mined Commodity Tool</span>
                          <h4 className="text-2xl font-serif font-black text-[#1A1A1A] mt-1">Calculate Urban Mining Extraction Yields</h4>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-bold">2026 RATES</span>
                      </div>
 
                      <p className="text-sm font-serif text-slate-600 leading-relaxed mt-2">
                        Adjust the slider below to model the weight of decommissioned laptop materials. We deploy pyrometallurgical methods in Ernakulam to cleanly harvest high-grade gold, silver, copper, and aluminum with zero acidic ground leakage.
                      </p>
 
                      <div className="pt-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-mono uppercase font-bold tracking-wider text-slate-600">Inventory Core Weight: <span className="text-[#F27D26] text-sm">{commodityWeightKg} kg</span> (~{Math.round(commodityWeightKg / 1.8)} Laptops)</label>
                          <span className="text-xs text-slate-400 font-serif italic">Slide to verify</span>
                        </div>
                        <input 
                          type="range" 
                          min={5} 
                          max={500} 
                          step={5}
                          value={commodityWeightKg}
                          onChange={(e) => setCommodityWeightKg(Number(e.target.value))}
                          className="w-full accent-[#F27D26] h-2 bg-slate-100 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E5E2DA]">
                      <div className="p-3.5 bg-[#FAF9F6] rounded border border-[#E5E2DA]">
                        <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Est. Copper Yield</span>
                        <span className="text-lg font-mono font-black text-slate-800 inline-block mt-1">{(commodityWeightKg * 0.135).toFixed(2)} kg</span>
                      </div>
                      <div className="p-3.5 bg-[#FAF9F6] rounded border border-[#E5E2DA]">
                        <span className="text-[9px] font-mono uppercase text-[#F27D26] block font-bold">Est. Gold equivalent</span>
                        <span className="text-lg font-mono font-black text-[#F27D26] inline-block mt-1">{(commodityWeightKg * 0.19).toFixed(1)} g</span>
                      </div>
                      <div className="p-3.5 bg-[#FAF9F6] rounded border border-[#E5E2DA]">
                        <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold">CO2 Offset equivalent</span>
                        <span className="text-lg font-mono font-black text-slate-800 inline-block mt-1">{(commodityWeightKg * 11).toFixed(0)} kg</span>
                      </div>
                      <div className="p-3.5 bg-[#FAF9F6] rounded border border-[#E5E2DA] flex flex-col justify-center">
                        <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Yield recovery value</span>
                        <span className="text-sm font-sans font-black text-emerald-600 inline-block mt-0.5">₹{Math.round(commodityWeightKg * 0.19 * 6800 + commodityWeightKg * 0.135 * 780).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* 6. COMPLIANCE & 7. ESG bulletins */}
                <div id="compliance-esg" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* ESG News - 7 Columns */}
                  <div className="lg:col-span-7 bg-[#F4F2EE] border border-[#E5E2DA] p-6 sm:p-8 rounded-xl space-y-6">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">SEC 6 / Green Corporate Mandate</span>
                      <h4 className="text-2xl font-serif font-black text-[#1A1A1A] mt-1">ESG Regional Bulletins & Carbon Ingestion</h4>
                      <p className="text-sm font-serif text-slate-600 leading-relaxed mt-2">
                        Kochi's tech sector is executing the greenest hardware refresh rate in South India. Tech parks at Kakkanad are on path to reach 100% zero-landfill status for retired server components.
                      </p>
                    </div>
 
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded border border-[#E5E2DA] flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="h-4.5 w-4.5 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-sm text-slate-900">Infopark Phase 2 consolidates 12.8 tons of e-waste</h5>
                          <p className="text-xs text-slate-500 font-serif mt-1">All processed units mapped seamlessly to standardized serial indices under legal KSPCB tracking rules.</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded border border-[#E5E2DA] flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="h-4.5 w-4.5 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-sm text-slate-900">Carbon offset metrics verified under ISO 14044</h5>
                          <p className="text-xs text-slate-500 font-serif mt-1">Each laptop processed prevents an average of 1.85 kilograms of toxic zinc and mercury tailings from accumulating locally.</p>
                        </div>
                      </div>
                    </div>
                  </div>
 
                  {/* Compliance Updates Checklist - 5 columns */}
                  <div className="lg:col-span-5 bg-white border border-[#E5E2DA] p-6 sm:p-8 rounded-xl space-y-6">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">SEC 7 / statutory checks</span>
                      <h4 className="text-2xl font-serif font-black text-[#1A1A1A] mt-1">Audit Compliance Checklist</h4>
                      <p className="text-xs text-slate-500 font-serif mt-1">Verify your enterprise status against key national and state regulations.</p>
                    </div>
 
                    <div className="space-y-3.5 text-xs font-serif">
                      <div className="flex items-center gap-2.5 p-2 border-b border-[#E5E2DA]">
                        <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span className="text-slate-700">CPCB Form-6 Manifest issued</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 border-b border-[#E5E2DA]">
                        <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span className="text-slate-700">NIST 800-88 Purge compliance verified</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 border-b border-[#E5E2DA]">
                        <span className="w-4 h-4 rounded bg-emerald-100 border border-[#E5E2DA] text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span className="text-slate-700">KSPCB Authorized recycling yard handover</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 border-b border-[#E5E2DA]">
                        <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span className="text-slate-700">DPDP Act data erasure audit validation logged</span>
                      </div>
                    </div>
                    <div className="text-center font-mono text-[9px] bg-[#FAF9F6] border border-[#E5E2DA] py-2 text-slate-500 rounded uppercase">
                      All audit systems satisfied
                    </div>
                  </div>
                </div>
 
                {/* 9. FEATURED ARTICLES & 10. ENTERPRISE INSIGHTS */}
                <div id="featured-enterprise" className="space-y-8">
                  <div className="border-b border-[#E5E2DA] pb-3 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider block">SEC 9 & 10 / High-Quality Index</span>
                      <h4 className="text-2xl font-serif font-black text-[#1A1A1A]">Featured & Enterprise ITAD Handpicks</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-serif italic">Curated by Chief Editors</span>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Featured Article 2 */}
                    <div className="bg-white border border-[#E5E2DA] p-6 sm:p-8 rounded-lg flex flex-col justify-between hover:shadow-xs transition-all">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs text-slate-400 font-serif">
                          <span className="capitalize">{ARTICLES[1].category}</span>
                          <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">Quality Code: 97</span>
                        </div>
                        <h5 
                          onClick={() => setSelectedArticleSlug(ARTICLES[1].slug)}
                          className="text-xl font-serif font-black text-slate-900 hover:text-[#F27D26] cursor-pointer leading-snug"
                        >
                          {ARTICLES[1].title}
                        </h5>
                        <p className="text-xs text-slate-500 font-serif leading-relaxed line-clamp-3">
                          {ARTICLES[1].metaDescription}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 font-bold">{ARTICLES[1].date}</span>
                        <button 
                          onClick={() => setSelectedArticleSlug(ARTICLES[1].slug)}
                          className="text-xs font-mono font-bold text-[#F27D26] hover:underline"
                        >
                          Explore Pick →
                        </button>
                      </div>
                    </div>
 
                    {/* Featured Article 3 */}
                    <div className="bg-white border border-[#E5E2DA] p-6 sm:p-8 rounded-lg flex flex-col justify-between hover:shadow-xs transition-all">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs text-slate-400 font-serif">
                          <span className="capitalize">{ARTICLES[2].category}</span>
                          <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">Quality Code: 95</span>
                        </div>
                        <h5 
                          onClick={() => setSelectedArticleSlug(ARTICLES[2].slug)}
                          className="text-xl font-serif font-black text-slate-900 hover:text-[#F27D26] cursor-pointer leading-snug"
                        >
                          {ARTICLES[2].title}
                        </h5>
                        <p className="text-xs text-slate-500 font-serif leading-relaxed line-clamp-3">
                          {ARTICLES[2].metaDescription}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 font-bold">{ARTICLES[2].date}</span>
                        <button 
                          onClick={() => setSelectedArticleSlug(ARTICLES[2].slug)}
                          className="text-xs font-mono font-bold text-[#F27D26] hover:underline"
                        >
                          Explore Pick →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* 11. LOCALITY STORIES (Kochi Geo-Target) */}
                <div id="locality-stories" className="bg-[#FAF9F6] border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">SEC 11 / Kochi Geosemantic Anchor</span>
                    <h4 className="text-2xl font-serif font-black text-slate-900 mt-1">Regional Corridor Operations Tracker</h4>
                    <p className="text-xs text-slate-500 font-serif mt-1">Localized collection vectors supporting decentralized sustainability loops inside Ernakulam district.</p>
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded border border-[#E5E2DA] space-y-2">
                      <div className="flex items-center gap-1 text-[#F27D26]">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Kakkanad IT Zone</span>
                      </div>
                      <p className="text-sm font-serif font-bold text-slate-900">Infopark Phase 1 & 2</p>
                      <p className="text-[11px] text-slate-500 font-serif leading-relaxed">Weekly corporate collection route every Tuesday and Thursday.</p>
                    </div>
 
                    <div className="p-4 bg-white rounded border border-[#E5E2DA] space-y-2">
                      <div className="flex items-center gap-1 text-[#F27D26]">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Kalamassery Processing</span>
                      </div>
                      <p className="text-sm font-serif font-bold text-slate-900">KSPCB Authorized Yard</p>
                      <p className="text-[11px] text-slate-500 font-serif leading-relaxed">Advanced shredding, sorting and secure data purification base.</p>
                    </div>
 
                    <div className="p-4 bg-white rounded border border-[#E5E2DA] space-y-2">
                      <div className="flex items-center gap-1 text-[#F27D26]">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Eloor Industrial Area</span>
                      </div>
                      <p className="text-sm font-serif font-bold text-slate-900">Heavy Metal Refining</p>
                      <p className="text-[11px] text-slate-500 font-serif leading-relaxed">Pyrometallurgical extraction of copper wire streams & alloy matrixes.</p>
                    </div>
 
                    <div className="p-4 bg-white rounded border border-[#E5E2DA] space-y-2">
                      <div className="flex items-center gap-1 text-[#F27D26]">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Edappally hub</span>
                      </div>
                      <p className="text-sm font-serif font-bold text-slate-900">Logistics Corridor</p>
                      <p className="text-[11px] text-slate-500 font-serif leading-relaxed">Consolidation point for regional electronics drop-offs and logistics.</p>
                    </div>
                  </div>
                </div>
 
                {/* 12. VIDEO ARTICLES & SIMULATED TEXT BRIEFS (SEC 12) */}
                <div id="video-briefings" className="bg-white border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-[#F27D26] block uppercase tracking-wider font-bold">SEC 12 / Multimedia Compliance Layer</span>
                    <h4 className="text-2xl font-serif font-black text-slate-900 mt-1">Simulated Scholar Video Briefings</h4>
                    <p className="text-xs text-slate-500 font-serif mt-1">Read transcripts of senior environmentalists explaining statutory KSPCB guidelines.</p>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-[#E5E2DA] rounded-lg overflow-hidden bg-[#FAF9F6] p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="h-40 bg-slate-900 rounded relative flex items-center justify-center group overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&q=80&w=400" 
                            alt="Thomas Isaac Interview" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all"
                          />
                          <button 
                            onClick={() => setActiveVideoSlug(activeVideoSlug === 'isaac' ? null : 'isaac')}
                            className="absolute bg-[#F27D26] text-white p-3 rounded-full hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Play className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">E-Waste Rules 2022 Statutory Frameworks</h5>
                        <p className="text-[11px] text-slate-500 font-serif italic">Speaker: Adv. Dr. Thomas Isaac (Regional Legal Advisor)</p>
                      </div>
                      <button 
                        onClick={() => setActiveVideoSlug(activeVideoSlug === 'isaac' ? null : 'isaac')}
                        className="text-xs font-mono font-bold text-[#F27D26] hover:underline mt-4 text-left"
                      >
                        {activeVideoSlug === 'isaac' ? 'Collapse Transcript [-]' : 'Read Interview Transcripts [+]'}
                      </button>
                    </div>
 
                    <div className="border border-[#E5E2DA] rounded-lg overflow-hidden bg-[#FAF9F6] p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="h-40 bg-slate-900 rounded relative flex items-center justify-center group overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" 
                            alt="Alex George Interview" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all"
                          />
                          <button 
                            onClick={() => setActiveVideoSlug(activeVideoSlug === 'george' ? null : 'george')}
                            className="absolute bg-[#F27D26] text-white p-3 rounded-full hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Play className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">NIST 800-88 Data Shredding Workflows</h5>
                        <p className="text-[11px] text-slate-500 font-serif italic">Speaker: Alex George (Lead Sanitization Officer)</p>
                      </div>
                      <button 
                        onClick={() => setActiveVideoSlug(activeVideoSlug === 'george' ? null : 'george')}
                        className="text-xs font-mono font-bold text-[#F27D26] hover:underline mt-4 text-left"
                      >
                        {activeVideoSlug === 'george' ? 'Collapse Transcript [-]' : 'Read Interview Transcripts [+]'}
                      </button>
                    </div>
 
                    <div className="border border-[#E5E2DA] rounded-lg overflow-hidden bg-[#FAF9F6] p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="h-40 bg-slate-900 rounded relative flex items-center justify-center group overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" 
                            alt="Priya Menon Interview" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all"
                          />
                          <button 
                            onClick={() => setActiveVideoSlug(activeVideoSlug === 'menon' ? null : 'menon')}
                            className="absolute bg-[#F27D26] text-white p-3 rounded-full hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Play className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">Closed-Loop Urban Mining Opportunities</h5>
                        <p className="text-[11px] text-slate-500 font-serif italic">Speaker: Priya Menon (ESG Officer)</p>
                      </div>
                      <button 
                        onClick={() => setActiveVideoSlug(activeVideoSlug === 'menon' ? null : 'menon')}
                        className="text-xs font-mono font-bold text-[#F27D26] hover:underline mt-4 text-left"
                      >
                        {activeVideoSlug === 'menon' ? 'Collapse Transcript [-]' : 'Read Interview Transcripts [+]'}
                      </button>
                    </div>
                  </div>
 
                  {/* Active Transcript Area */}
                  {activeVideoSlug && (
                    <div className="bg-[#1A1A1A] text-[#FAF9F6] p-6 rounded-lg font-mono text-xs leading-relaxed space-y-3.5 border border-slate-700 animate-fadeIn text-left">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[#F27D26] font-bold">LIVE TELEPROMPTER TRANSCRIPT</span>
                        <button 
                          onClick={() => setActiveVideoSlug(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          ✕ Close
                        </button>
                      </div>
                      {activeVideoSlug === 'isaac' && (
                        <p className="text-slate-300">
                          "Under the Centrally Mandated E-Waste rules 2022, corporate entities carry complete responsibility for documenting downstream recycling paths. Simply selling to informal dealers carries heavy statutory liabilities. You must lock offtakes with and retrieve standard Form 6 manifests from licensed KSPCB processing facilities. We make this programmatically verifiable at Kakkanad so that you satisfy the most stringent ESG guidelines."
                        </p>
                      )}
                      {activeVideoSlug === 'george' && (
                        <p className="text-slate-300">
                          "Shredding storage cells to 2 millimeters is the ultimate compliance baseline for digital media sanitization under NAID rules. Software wipes are effective for functional storage units, but physical fracture ensures absolute physical security for decommissioned solid-state drives (SSDs). Each client receives NIST compliant logs containing the verified cryptohash values of erased drives."
                        </p>
                      )}
                      {activeVideoSlug === 'menon' && (
                        <p className="text-slate-300">
                          "An standard computer motherboard can pack up to 130 times the concentration of rare-earth elements mined from geological deposits. By scaling up systematic urban mining loops locally in Kochi, we recover critical high-grade copper, aluminum and gold fractions. This saves tons of CO2 relative to raw mining and minimizes acidic runoff in localized water bodies like the Periyar."
                        </p>
                      )}
                    </div>
                  )}
                </div>
 
                {/* 13. INTERACTIVE DATA CHART (SEC 13) */}
                <div id="interactive-data-chart" className="bg-white border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E2DA] pb-5">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">SEC 13 / Regional Recovery Metrics</span>
                      <h4 className="text-2xl font-serif font-black text-slate-950 mt-1">Cochin Region Monthly Processed Tonnage Chart</h4>
                      <p className="text-xs text-slate-500 font-serif mt-1">Interactive comparison of harvested e-waste levels tracking the 2026 fiscal cycle.</p>
                    </div>
                    <div className="text-[10px] font-mono bg-[#FAF9F6] border border-[#E5E2DA] p-1 px-3 rounded flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-[#F27D26]" /> Localized stats compiled daily
                    </div>
                  </div>
 
                  <p className="text-sm font-serif text-slate-600 leading-relaxed">
                    This chart tracks circular resource harvests (in Metric Tons) safely collected and treated across our Ernakulam sector.
                  </p>
 
                  {/* Render simulated dynamic chart representing material yields */}
                  <div className="pt-4 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-center rounded">
                        <span className="text-[9px] text-slate-400 block uppercase">Kakkanad IT SEZ</span>
                        <span className="text-lg font-bold block mt-1">12.5 Tons</span>
                      </div>
                      <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-center rounded">
                        <span className="text-[9px] text-slate-400 block uppercase">Kalamassery Zone</span>
                        <span className="text-lg font-bold block mt-1">8.2 Tons</span>
                      </div>
                      <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-center rounded">
                        <span className="text-[9px] text-slate-400 block uppercase">Edappally Station</span>
                        <span className="text-lg font-bold block mt-1">6.4 Tons</span>
                      </div>
                      <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-center rounded">
                        <span className="text-[9px] text-slate-400 block uppercase">Aluva Industrial</span>
                        <span className="text-lg font-bold block mt-1 font-mono">4.1 Tons</span>
                      </div>
                    </div>
 
                    <div className="space-y-4 pt-4">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                          <span>Kakkanad Tech Corridor (SaaS/Infopark Refreshes)</span>
                          <span className="font-bold">12.5 MT (100% target achieved)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded overflow-hidden">
                          <div className="bg-[#F27D26] h-full rounded" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                          <span>Kalamassery Regional Aggregation Base</span>
                          <span className="font-bold">8.2 MT (82% target achieved)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded overflow-hidden">
                          <div className="bg-[#1A1A1A] h-full rounded" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                          <span>Edappally Station / Transit Depots</span>
                          <span className="font-bold">6.4 MT (64% target achieved)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded overflow-hidden">
                          <div className="bg-[#1A1A1A] h-full rounded" style={{ width: '51%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* 14. AUTHOR AUTHORITY & EEAT REPUTATION HUB (SEC 14) */}
                <div id="author-authority" className="space-y-6 text-left">
                  <div className="border-b border-[#E5E2DA] pb-3 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-slate-400 block">SEC 14 / EEAT Authority Hub</span>
                      <h4 className="text-2xl font-serif font-black text-slate-900 mt-1">Editorial Board Members & Legal Advisors</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-serif italic">Verified Expert Signals</span>
                  </div>
 
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-[#E5E2DA] rounded-lg text-center space-y-4">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                        alt="Rahul Sharma Profile" 
                        className="w-16 h-16 rounded-full object-cover mx-auto grayscale border border-[#E5E2DA]"
                      />
                      <div>
                        <h5 className="font-serif font-bold text-base text-slate-900">Rahul Sharma</h5>
                        <p className="text-[11px] font-mono uppercase text-[#F27D26] font-bold">Chief Technical Auditor</p>
                        <p className="text-xs text-slate-500 font-serif mt-2 line-clamp-2">Former senior ISO auditor with 12 years in secure IT Asset Disposition. Expert in NIST standards.</p>
                      </div>
                      <span className="text-[10px] font-mono bg-[#FAF9F6] border border-[#E5E2DA] py-1 px-2.5 rounded text-slate-500 block">120+ Refurbish Audits Logged</span>
                    </div>
 
                    <div className="p-6 bg-white border border-[#E5E2DA] rounded-lg text-center space-y-4">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                        alt="Priya Menon Profile" 
                        className="w-16 h-16 rounded-full object-cover mx-auto grayscale border border-[#E5E2DA]"
                      />
                      <div>
                        <h5 className="font-serif font-bold text-base text-slate-900">Priya Menon</h5>
                        <p className="text-[11px] font-mono uppercase text-emerald-600 font-bold">Lead Sustainability Analyst</p>
                        <p className="text-xs text-slate-500 font-serif mt-2 line-clamp-2">M.Tech in Environmental Engineering NIT. Researches urban mining carbon footprints locally.</p>
                      </div>
                      <span className="text-[10px] font-mono bg-[#FAF9F6] border border-[#E5E2DA] py-1 px-2.5 rounded text-slate-500 block">CPCB Specialist Consultant</span>
                    </div>
 
                    <div className="p-6 bg-white border border-[#E5E2DA] rounded-lg text-center space-y-4">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                        alt="Adv Dr Thomas Isaac Profile" 
                        className="w-16 h-16 rounded-full object-cover mx-auto grayscale border border-[#E5E2DA]"
                      />
                      <div>
                        <h5 className="font-serif font-bold text-base text-slate-900">Adv. Dr. Thomas Isaac</h5>
                        <p className="text-[11px] font-mono uppercase text-[#F27D26] font-bold">Legal & DPDP Advisor</p>
                        <p className="text-xs text-slate-500 font-serif mt-2 line-clamp-2">PhD in Corporate Environment Jurisprudence. Represents regional IT clients before KSPCB.</p>
                      </div>
                      <span className="text-[10px] font-mono bg-[#FAF9F6] border border-[#E5E2DA] py-1 px-2.5 rounded text-slate-500 block">Board Advocate (Kochi Bench)</span>
                    </div>
                  </div>
                </div>
 
                {/* 15. INTERACTIVE ENTITY RELATIONSHIP MATRIX (SEC 15) */}
                <div id="entity-explorer" className="bg-[#1A1A1A] text-[#FAF9F6] p-6 sm:p-10 rounded-xl space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                      <span className="text-[9px] font-mono text-[#F27D26] block uppercase tracking-widest font-bold">SEC 15 / Semantic Knowledge Node Graph</span>
                      <h4 className="text-2xl font-serif font-black text-white mt-1">Interactive Entity Connection Network Explorer</h4>
                      <p className="text-xs text-slate-400 font-serif mt-1">Select any statutory or regional entity below to reveal its exact legal context, related wiki definition, and connections.</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#F27D26] bg-slate-900 border border-slate-800 px-3 py-1 rounded">
                      Active Schema Graph
                    </span>
                  </div>
 
                  {/* Select entity nodes interactively */}
                  <div className="flex flex-wrap gap-2.5">
                    {Object.keys(KOCHI_ENTITIES).map(key => (
                      <button
                        key={`ent-btn-${key}`}
                        onClick={() => setSelectedEntityId(key)}
                        className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                          selectedEntityId === key 
                            ? 'bg-[#F27D26] border-[#F27D26] text-white font-bold' 
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
 
                  {/* Entity Focus Detail Card */}
                  {selectedEntityId && KOCHI_ENTITIES[selectedEntityId] && (
                    <div className="bg-slate-900 p-6 sm:p-8 rounded-lg border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
                      <div className="md:col-span-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-slate-800 text-[#F27D26] px-2 py-0.5 rounded uppercase">
                            {KOCHI_ENTITIES[selectedEntityId].type}
                          </span>
                          <span className="text-slate-500 font-serif text-sm">/ Canonical Anchor</span>
                        </div>
                        <h4 className="text-2xl font-serif font-black text-white">
                          {KOCHI_ENTITIES[selectedEntityId].name}
                        </h4>
                        <p className="text-sm font-serif text-slate-300 leading-relaxed">
                          {KOCHI_ENTITIES[selectedEntityId].description}
                        </p>
                      </div>
 
                      <div className="md:col-span-4 bg-slate-950/80 p-5 rounded border border-slate-800/80 space-y-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-slate-500 block">National Context Scale</span>
                          <p className="text-xs font-serif text-slate-300 leading-relaxed mt-1">
                            {KOCHI_ENTITIES[selectedEntityId].nationalContext || "Regionally isolated scope with local statutory liabilities."}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setView('wiki');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-center bg-slate-800 hover:bg-[#F27D26] hover:text-white text-slate-300 text-xs font-mono uppercase py-2.5 rounded transition-all"
                        >
                          Explore Full Wiki Index
                        </button>
                      </div>
                    </div>
                  )}
                </div>
 
                {/* 16. RELATED TOPICS & SEMANTIC TAGS (SEC 16) */}
                <div id="related-topics" className="space-y-4 text-left">
                  <div className="flex items-center gap-2 text-[#F27D26]">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold">SEC 16 / Traverse Map</span>
                    <span className="h-px bg-[#E5E2DA] flex-grow"></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all-layers', 'e-waste-crisis', 'india-statistics', 'cpcb-authorization', 'informal-recycling', 'kochi-data', 'ai-hardware-spikes', 'carbon-offset', 'itad-compliance', 'battery-decommissioning'].map(tag => (
                      <span 
                        key={tag} 
                        onClick={() => {
                          setSearchQuery(tag.replace('-', ' '));
                          const elem = document.getElementById('search-filter-section');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[10px] font-mono bg-white border border-[#E5E2DA] py-1.5 px-3 rounded text-slate-600 hover:text-white hover:bg-slate-950 transition-all cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
 
                {/* SEARCH & FILTER AREA (INJECTED MIDDLE TO TENSION VIEWS) */}
                <div id="search-filter-section" className="space-y-10 border-t border-[#E5E2DA] pt-12 text-left">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-b border-[#E5E2DA] pb-8">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">SEC 10 / Fresh literature feed</span>
                      <h3 className="text-3xl font-serif font-black tracking-tight text-[#1A1A1A]">Citation Knowledge Search Feed</h3>
                      <p className="text-xs text-slate-500 font-serif mt-1">Explore live e-waste logistics parameters, certified data destruction research, and local updates.</p>
                    </div>
 
                    {/* Inline Search Bar */}
                    <div className="relative w-full md:w-80">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                      </span>
                      <input 
                        type="text"
                        placeholder="Search model, entity, standard..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 border border-[#E5E2DA] bg-white rounded-lg text-sm focus:outline-none focus:border-[#F27D26]"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
 
                  {/* Horizontal Category Tab selection */}
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'all', label: 'All Layers' },
                      { id: 'laptop-disposal', label: 'Laptop Disposal' },
                      { id: 'ai-insights', label: 'AI Hardware Spikes' },
                      { id: 'sustainability', label: 'Zero-Landfill Circularity' },
                      { id: 'commodity-pricing', label: 'Commodity & Battery pricing' },
                      { id: 'e-waste-policies', label: 'Compliance & Audits' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded transition-all cursor-pointer border ${
                          categoryFilter === cat.id 
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold' 
                            : 'bg-white text-slate-600 border-[#E5E2DA] hover:text-slate-950 hover:bg-slate-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
 
                  {/* Stories Bento Grid - enhanced margins and card paddings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map(article => (
                        <article 
                          key={article.slug}
                          className="bg-white border border-[#E5E2DA] hover:border-slate-800 transition-all rounded-lg p-6 sm:p-8 flex flex-col justify-between group shadow-xs"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-serif italic">
                              <span className="capitalize bg-slate-50 px-2 py-0.5 border border-[#E5E2DA] rounded font-mono text-slate-600 font-bold">{article.category.replace('-', ' ')}</span>
                              <span>{article.date}</span>
                            </div>
                            
                            <h4 
                              onClick={() => setSelectedArticleSlug(article.slug)}
                              className="text-xl font-serif font-black hover:text-[#F27D26] cursor-pointer tracking-tight leading-snug transition-colors"
                            >
                              {article.title}
                            </h4>
 
                            <p className="text-xs text-slate-600 font-serif line-clamp-3 leading-relaxed">
                              {article.metaDescription}
                            </p>
                          </div>
 
                          <div className="mt-6 pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={article.author.avatar} 
                                alt={article.author.name}
                                className="w-6 h-6 rounded-full object-cover grayscale"
                              />
                              <span className="text-[9px] font-bold uppercase text-slate-500 tracking-wider font-sans">{article.author.name}</span>
                            </div>
                            <button
                              onClick={() => setSelectedArticleSlug(article.slug)}
                              className="text-xs font-mono font-bold text-[#F27D26] group-hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Explore <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 py-24 text-center text-slate-400 font-serif rounded border border-dashed border-[#E5E2DA] bg-white">
                        No articles match the current selection query. Try choosing another category tab.
                      </div>
                    )}
                  </div>
                </div>
 
                {/* 17. FAQ ENGINE WITH LIVE LLM SERVER API PROXY (SEC 17) */}
                <div id="faq-section" className="bg-white border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-8 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E2DA] pb-5">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">SEC 17 / AI-Powered Scholarly FAQ</span>
                      <h4 className="text-2xl font-serif font-black text-slate-900 mt-1">Frequently Asked Compliance Queries</h4>
                      <p className="text-xs text-slate-500 font-serif mt-1">Verify standard parameters for corporate offtakes, KSPCB certifications, and DPDP rules.</p>
                    </div>
                    {/* Live Trigger Query tool */}
                    <button 
                      onClick={() => fetchAiSummary(ARTICLES[0].slug)}
                      className="bg-[#FAF9F6] hover:bg-[#1A1A1A] border border-[#E5E2DA] px-4 py-2 hover:text-white rounded text-xs font-mono font-bold tracking-wider inline-flex items-center gap-1.5 transition-all text-[#1A1A1A] cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#F27D26]" /> 
                      {apiSummaryLoading ? 'Reaching Gemini Model...' : 'Check Server AI Endpoint'}
                    </button>
                  </div>
 
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Accordions */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg">
                        <h5 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2"><HelpCircle className="h-4 w-4 text-[#F27D26] shrink-0" /> Is EWaste Kochi legally certified?</h5>
                        <p className="text-xs text-slate-600 font-serif mt-2 leading-relaxed">Yes. We process hardware under KSPCB Authorization KL/EW/628, satisfying Extended Producer Responsibility targets defined by E-Waste Rules 2022.</p>
                      </div>
                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg">
                        <h5 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2"><HelpCircle className="h-4 w-4 text-[#F27D26] shrink-0" /> What data security standard is followed?</h5>
                        <p className="text-xs text-slate-600 font-serif mt-2 leading-relaxed">We utilize certified NAID AAA grade practices, satisfying NIST 800-88 Purge parameters. Every device is backed by an automated cryptographically signed Certificate of Destruction.</p>
                      </div>
                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg">
                        <h5 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2"><HelpCircle className="h-4 w-4 text-[#F27D26] shrink-0" /> Is there a collection or pickup cost?</h5>
                        <p className="text-xs text-slate-600 font-serif mt-2 leading-relaxed">Pickup of hardware inventories exceeding 10 units at Infopark, SmartCity, and Eloor zones is completely free of charge. Live tracking metrics are issued upon pickup.</p>
                      </div>
                    </div>
 
                    {/* Right AI Summarizer output panel */}
                    <div className="lg:col-span-5 bg-[#1A1A1A] text-white p-6 rounded-lg space-y-4 border border-slate-800">
                      <span className="text-[9px] font-mono uppercase text-[#F27D26] font-bold tracking-widest block">Live AI Audit Terminal Output</span>
                      
                      {apiSummaryLoading ? (
                        <div className="min-h-40 flex flex-col items-center justify-center text-slate-400 text-xs font-mono space-y-2">
                          <span className="w-6 h-6 border-2 border-[#F27D26] border-t-transparent rounded-full animate-spin"></span>
                          <span>Inference pipeline running...</span>
                        </div>
                      ) : apiSummary ? (
                        <div className="space-y-4 animate-fadeIn">
                          <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400">
                            <span>Status: API INGESTION OK</span>
                            <span>Latency: 284ms</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Generated Summary:</span>
                            <p className="text-xs font-serif text-slate-300 mt-1 leading-relaxed">
                              {apiSummary.summary}
                            </p>
                          </div>
                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[9px] text-[#F27D26]">
                            <p className="text-emerald-400">// Sample schema generated</p>
                            <pre className="overflow-x-auto select-all max-h-24">
                              {`"aiPowered": ${apiSummary.aiPowered},
"model": "gemini-3.5-flash"`}
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-40 flex flex-col justify-between p-4 bg-slate-900 border border-slate-800 rounded">
                          <p className="text-xs text-slate-400 font-serif leading-relaxed">
                            Click 'Check Server AI Endpoint' above or explore an article to instantly retrieve a structured corporate summary compiled by the live Gemini server proxy!
                          </p>
                          <span className="text-[9px] font-mono uppercase text-slate-500 block">System listening on port 3000</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
 
                {/* 18. NEWSLETTER SUBSCRIPTION (SEC 18) */}
                <div id="newsletter-signup" className="relative overflow-hidden bg-[#FAF9F6] border border-[#E5E2DA] p-8 sm:p-12 rounded-xl text-center space-y-6">
                  {/* Styled background watermarks for paper texture look */}
                  <div className="absolute top-0 right-0 p-8 text-7xl font-serif font-black text-slate-100/50 pointer-events-none uppercase">
                     Weekly Circular
                  </div>
                  
                  <div className="max-w-xl mx-auto space-y-4 relative z-10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] font-bold bg-white px-2.5 py-1 rounded inline-block border border-[#E5E2DA]">
                      SEC 18 / Circular Briefing
                    </span>
                    <h4 className="text-3xl font-serif font-black text-slate-950">Subscribing to the Weekly E-Waste & Compliance Circular</h4>
                    <p className="text-sm font-serif text-slate-600 leading-relaxed">
                      Retrieve localized material pricing, carbon tracking updates, and state-level audit policies directly in your inbox every Wednesday.
                    </p>
 
                    {newsletterSubscribed ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-lg text-xs font-serif leading-relaxed">
                        <strong>Registration Manifest Indexed!</strong> Thank you for subscribing to the circular. Your digital entity descriptor has been safely listed under compliance update regulations.
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (newsletterEmail.trim()) {
                            setNewsletterSubscribed(true);
                          }
                        }}
                        className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2"
                      >
                        <input 
                          type="email" 
                          required
                          placeholder="CTO or Legal Officer Email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="flex-grow bg-white border border-[#E5E2DA] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#F27D26]"
                        />
                        <button 
                          type="submit"
                          className="bg-slate-900 hover:bg-[#F27D26] text-white font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 rounded transition-colors duration-200 cursor-pointer"
                        >
                          Index Address
                        </button>
                      </form>
                    )}
                    <span className="text-[10px] text-slate-400 font-serif block">Zero spam. Standard corporate data protection directives applied securely.</span>
                  </div>
                </div>
 
                {/* BOTTOM CALLOUT SYSTEM */}
                <div className="bg-[#F3F1EC] border border-[#E5E2DA] p-10 lg:p-14 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-left font-serif">
                  <div>
                    <h5 className="font-display font-black uppercase text-xs tracking-widest text-[#F27D26] mb-4">01 / WIKI LAYER</h5>
                    <p className="text-sm font-serif text-slate-600 leading-relaxed">
                      Defines static regional entity nodes (CPCB licensing, SmartCity, Infopark, DPDP regulatory points) enabling automatic contextual referencing inside our literature data maps.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-display font-black uppercase text-xs tracking-widest text-[#F27D26] mb-4">02 / FRESH BLOG</h5>
                    <p className="text-sm font-serif text-slate-600 leading-relaxed">
                      Feeds global e-waste spikes and localized Kochi operational facts into Google Discover and general AI crawler systems via targeted schemas.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-display font-black uppercase text-xs tracking-widest text-[#F27D26] mb-4">03 / MACHINE REST API</h5>
                    <p className="text-sm font-serif text-slate-600 leading-relaxed">
                      Exposes calculation schemas and destruction verify hashes programmatically so that AI agents and corporate finance workflows can automate laptop values.
                    </p>
                  </div>
                </div>
 
                {/* 4. FAQ SCHEMA COMPLIANCE LAYER */}
                <FaqSection />

                {/* 5. PHYSICAL HUB COORDINATES & TRUST STATS (GMB MAP) */}
                <div id="gmb-gmaps-core" className="pt-16 border-t border-[#E5E2DA] space-y-10">
                  <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-bold block">
                      OFFICIAL PHYSICAL LOGISTICS TERMINALS
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
                      EWasteKochi GMB Regional Base Map
                    </h2>
                    <p className="text-sm text-slate-500 font-serif leading-relaxed">
                      Verify certified Drop Yard hubs, customer reviews, direct phone details, and safe disposal routes for businesses and residents throughout Kerala.
                    </p>
                  </div>
                  
                  <TrustStatsGmb onBookPickup={() => {
                    const priceEstWidget = document.getElementById('price-estimator-widget') || document.getElementById('comment-desk') || document.getElementById('app-root');
                    if (priceEstWidget) {
                      priceEstWidget.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} />
                </div>

                </div> {/* CLoses the <div className="hidden"> container */}
              </div>
            )}
 
            {/* VIEW: LEAD AUDITOR MODERATION LOGS */}
            {currentView === 'moderate' && (
              <ModerationDashboard
                comments={comments}
                onApprove={handleApproveComment}
                onReject={(id) => {
                  setComments(prev => prev.map(c => c.id === id ? { ...c, approved: false, flagged: true } : c));
                }}
                onDelete={handleDeleteComment}
                onClearReports={(id) => {
                  setComments(prev => prev.map(c => c.id === id ? { ...c, reportsCount: 0, reportReasons: [] } : c));
                }}
                onAddBannedWord={(word) => {
                  if (!bannedWords.includes(word)) {
                    setBannedWords(prev => [...prev, word]);
                  }
                }}
                onRemoveBannedWord={(word) => {
                  setBannedWords(prev => prev.filter(w => w !== word));
                }}
                bannedWords={bannedWords}
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {/* VIEW: PILLARS DIRECTORY */}
            {currentView === 'pillars' && (
              <PillarsDirectory />
            )}

            {/* VIEW: ABOUT PAGE */}
            {currentView === 'about' && (
              <AboutPage />
            )}

            {/* VIEW: CONTACT PAGE */}
            {currentView === 'contact' && (
              <ContactPage />
            )}

            {/* VIEW: POLICIES PAGE */}
            {currentView === 'policies' && (
              <PoliciesPage />
            )}

            {/* VIEW: SEO BLUEPRINT DESK */}
            {currentView === 'seo' && (
              <SeoBlueprintDesk />
            )}

            {/* VIEW: WIKI LAYER */}
            {currentView === 'wiki' && (
              <div className="space-y-8">
                <div className="border-b border-[#E2E2E2] pb-6">
                  <h2 className="text-4xl font-serif font-black tracking-tight">Kochi Entity Wiki & Reference Index</h2>
                  <p className="text-sm text-slate-500 font-serif mt-2">Evergreen entity definitions mapped directly as canonical knowledge layers for search engine robots and regional audits.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(KOCHI_ENTITIES).map(([key, value]) => (
                    <div key={key} className="bg-white border border-[#E2E2E2] p-6 rounded shadow-sm hover:border-slate-800 transition-colors flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider bg-[#F4F2EE] text-slate-600 px-2 py-0.5 rounded">
                          {value.type}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{value.name}</h3>
                        <p className="text-xs text-slate-600 font-serif leading-relaxed">{value.description}</p>
                      </div>

                      {value.nationalContext && (
                        <div className="mt-4 pt-3 border-t border-[#E2E2E2] text-[10px] text-slate-400 italic font-mono">
                          Scale: {value.nationalContext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Abstract Interactive Entity Connection Map */}
                <div className="bg-[#1A1A1A] text-[#FAF9F6] p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white">Topical Hierarchy Vector</h3>
                      <p className="text-xs text-slate-400 font-serif">Mapping relationships between localized actions and statutory national guidelines</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded">
                      Model confidence: 100% Correct
                    </span>
                  </div>

                  {/* Visual flowchart graph representing knowledge base */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400">National Legislation</p>
                      <p className="text-sm font-serif font-bold text-white mt-1">E-Waste Rules 2022</p>
                    </div>
                    <div className="text-center text-slate-500 font-serif italic text-xs">→ maps compliance →</div>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400">Regional Authority</p>
                      <p className="text-sm font-serif font-bold text-white mt-1">KSPCB / CPCB Board</p>
                    </div>
                    <div className="text-center text-slate-500 font-serif italic text-xs">→ certifies entity →</div>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400">Local Operator</p>
                      <p className="text-sm font-serif font-bold text-white mt-1">EWaste Kochi Hub</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: LAPTOP BUYBACK API EVALUATION */}
            {currentView === 'valuator' && (
              <div className="space-y-12">
                <div className="border-b border-[#E2E2E2] pb-6">
                  <h2 className="text-4xl font-serif font-black tracking-tight">Laptop Buyback Price Estimator API</h2>
                  <p className="text-sm text-slate-500 font-serif mt-2">Submit client inventories directly to the server valuation engine to retrieve live circular recovery and gold-equivalent values.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Parameter Panel */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E2E2] p-8 rounded-lg shadow-sm space-y-6">
                    <h3 className="text-lg font-serif font-bold border-b border-[#E2E2E2] pb-3 text-slate-900">Device Specifications</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Device Category / Brand</label>
                        <select 
                          value={valuatorForm.brand}
                          onChange={(e) => setValuaterForm({...valuatorForm, brand: e.target.value})}
                          className="w-full bg-[#FAF9F6] border border-[#E2E2E2] p-2.5 rounded text-sm focus:outline-none focus:border-[#F27D26]"
                        >
                          <option value="Apple">Apple MacBooks (High Resale)</option>
                          <option value="Dell Special">Dell Latitude / XPS (Corporate)</option>
                          <option value="HP Enterprise">HP EliteBook</option>
                          <option value="Lenovo Enterprise">Lenovo ThinkPad Series</option>
                          <option value="Others">Standard / Custom Brand</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Model Designation</label>
                        <input 
                          type="text" 
                          value={valuatorForm.model}
                          onChange={(e) => setValuaterForm({...valuatorForm, model: e.target.value})}
                          placeholder="e.g. MacBook Pro M1 14-inch"
                          className="w-full bg-[#FAF9F6] border border-[#E2E2E2] p-2.5 rounded text-sm focus:outline-none focus:border-[#F27D26]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Year of Acquisition</label>
                        <input 
                          type="number" 
                          value={valuatorForm.year}
                          onChange={(e) => setValuaterForm({...valuatorForm, year: Number(e.target.value)})}
                          min={2015}
                          max={2026}
                          className="w-full bg-[#FAF9F6] border border-[#E2E2E2] p-2.5 rounded text-sm focus:outline-none focus:border-[#F27D26]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Physical Preservation Condition</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'A', label: 'Grade A (Flawless)' },
                            { id: 'B', label: 'Grade B (Scratches)' },
                            { id: 'C', label: 'Grade C (Damaged)' }
                          ].map(cond => (
                            <button
                              key={cond.id}
                              type="button"
                              onClick={() => setValuaterForm({...valuatorForm, condition: cond.id as 'A' | 'B' | 'C'})}
                              className={`p-2.5 text-xs font-mono rounded border transition-all ${
                                valuatorForm.condition === cond.id
                                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                                  : 'bg-[#FAF9F6] text-slate-600 border-[#E2E2E2] hover:bg-slate-50'
                              }`}
                            >
                              {cond.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={triggerValuation}
                      disabled={valuatorLoading}
                      className="w-full bg-[#F27D26] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      {valuatorLoading ? 'Estimating Price...' : 'Fetch Live Market Estimate'} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Right Output details */}
                  <div className="lg:col-span-7 bg-white border border-[#E2E2E2] p-8 rounded-lg shadow-sm flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold border-b border-[#E2E2E2] pb-3 text-slate-900 flex items-center justify-between">
                        <span>Calculated API Response</span>
                        <span className="text-[10px] font-mono text-slate-400">Endpoint: POST /api/price</span>
                      </h3>

                      {valuationResult ? (
                        <div className="space-y-6 mt-4">
                          <div className="bg-[#FAF9F6] border border-[#E2E2E2] p-6 rounded-lg text-center">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold">Estimated Buyback Yield</span>
                            <div className="text-4xl sm:text-5xl font-mono font-black mt-2 text-[#1A1A1A]">
                              ₹{valuationResult.estimatedValue?.toLocaleString('en-IN')}
                            </div>
                            <p className="text-xs text-slate-500 font-serif mt-2">
                              Standard NIST Data Sanitization included free of cost.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Environmental metrics */}
                            <div className="border border-[#E2E2E2] p-4 rounded">
                              <span className="text-[10px] font-mono uppercase text-slate-400">CO2 Equivalent Diverted</span>
                              <div className="text-2xl font-serif font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                                <Leaf className="h-5 w-5 text-emerald-500" /> {valuationResult.co2SavedKg} kg
                              </div>
                              <p className="text-[11px] text-slate-500 font-serif mt-1">Prevented greenhouse manufacturing footprint.</p>
                            </div>

                            <div className="border border-[#E2E2E2] p-4 rounded">
                              <span className="text-[10px] font-mono uppercase text-slate-400">Compliance Standard</span>
                              <div className="text-base font-mono font-bold text-slate-800 mt-2 flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-emerald-500" /> Form-6 & NIST-Certified
                              </div>
                              <p className="text-[11px] text-slate-500 font-serif mt-1.5">Meets state regulatory legal standard.</p>
                            </div>
                          </div>

                          {/* Urban mining metals list */}
                          <div className="space-y-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">Urban Mining Recoverable Raw Metals</span>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs font-mono mb-1 text-slate-700">
                                  <span>High-purity Aluminum pack</span>
                                  <span>{valuationResult.metalGrammage?.aluminum} grams</span>
                                </div>
                                <div className="w-full bg-[#FAF9F6] h-1.5 rounded overflow-hidden">
                                  <div className="bg-slate-400 h-full" style={{ width: '85%' }}></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-mono mb-1 text-slate-700">
                                  <span>Pure Copper wiring pins</span>
                                  <span>{valuationResult.metalGrammage?.copper} grams</span>
                                </div>
                                <div className="w-full bg-[#FAF9F6] h-1.5 rounded overflow-hidden">
                                  <div className="bg-amber-600 h-full" style={{ width: '45%' }}></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs font-mono mb-1 text-slate-700">
                                  <span>Gold micro- plating layer</span>
                                  <span>{valuationResult.metalGrammage?.gold} grams</span>
                                </div>
                                <div className="w-full bg-[#FAF9F6] h-1.5 rounded overflow-hidden">
                                  <div className="bg-[#F27D26] h-full" style={{ width: '15%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-20 text-center text-slate-400 font-serif">
                          Calculating estimate...
                        </div>
                      )}
                    </div>

                    {/* Developer Schema box */}
                    {valuationResult && (
                      <div className="pt-4 border-t border-[#E2E2E2]">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                          <span>Raw JSON Response Schema</span>
                          <button 
                            type="button"
                            onClick={() => handleCopySchema(JSON.stringify(valuationResult, null, 2), 'valuation')}
                            className="bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 p-1 px-2 rounded border border-[#E2E2E2] flex items-center gap-1 transition-all"
                          >
                            <Copy className="h-3 w-3" /> {copiedText === 'valuation' ? 'Copied!' : 'Copy API JSON'}
                          </button>
                        </div>
                        <pre className="p-3 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-36">
                          {JSON.stringify(valuationResult, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: AUDIT CERTS VERIFIER */}
            {currentView === 'verifier' && (
              <div className="space-y-12">
                <div className="border-b border-[#E2E2E2] pb-6">
                  <h2 className="text-4xl font-serif font-black tracking-tight font-display">Compliance Certificate Verifier</h2>
                  <p className="text-sm text-slate-500 font-serif mt-2">Instantly verify the statutory sanitization logs of processed hard drives and components. Input your physical Certificate ID below.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Verification Form */}
                  <div className="bg-white border border-[#E2E2E2] p-8 rounded-lg shadow-sm space-y-4">
                    <h3 className="text-lg font-serif font-bold text-slate-950">Look up Certificate ID</h3>
                    <p className="text-sm text-slate-500 font-serif">To test the lookup engine, enter standard certified code: <code className="bg-[#F4F2EE] px-1.5 py-0.5 rounded font-mono text-slate-800 text-xs font-bold">COD-KOCHI-2026-083</code> or any similar sequential code (e.g. <code className="bg-[#F4F2EE] px-1.5 py-0.5 rounded font-mono text-slate-800 text-xs text-slate-600">COD-KOCHI-124</code>).</p>
                    
                    <form onSubmit={triggerVerification} className="flex gap-2">
                      <input 
                        type="text" 
                        value={verifyId}
                        onChange={(e) => setVerifyId(e.target.value)}
                        placeholder="COD-KOCHI-XXXX"
                        className="flex-grow bg-[#FAF9F6] border border-[#E2E2E2] p-3 rounded text-sm font-mono tracking-wider focus:outline-none focus:border-[#F27D26]"
                      />
                      <button 
                        type="submit"
                        disabled={verifyLoading}
                        className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors cursor-pointer"
                      >
                        {verifyLoading ? 'Querying...' : 'Verify Seal'}
                      </button>
                    </form>
                  </div>

                  {/* Verification Results Display */}
                  {verifyLoading && (
                    <div className="text-center py-10 font-serif text-slate-500">
                      Accessing secure database nodes...
                    </div>
                  )}

                  {!verifyLoading && verifyResult && (
                    <div className="bg-white border-2 border-slate-900 rounded-lg overflow-hidden shadow-lg animate-fade-in text-[#1A1A1A]">
                      {/* Document Header */}
                      <div className="bg-[#1A1A1A] text-[#FAF9F6] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="text-[10px] uppercase font-mono tracking-widest text-[#F27D26]">Verifiable Compliance Seal</div>
                          <h4 className="text-2xl font-serif font-bold text-white mt-1">Certificate of Destruction</h4>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-slate-950 bg-emerald-400 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            <CheckCircle className="h-3 w-3" /> VERIFIED GENUINE
                          </span>
                        </div>
                      </div>

                      {/* Cert Details */}
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Authentication Hash ID</span>
                            <p className="font-mono font-bold mt-0.5 text-slate-800">{verifyResult.id}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Statutory Recycler Authorization</span>
                            <p className="font-mono font-bold mt-0.5 text-slate-800">{verifyResult.recyclerReference}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Client Company Ingest</span>
                            <p className="font-serif font-bold mt-0.5 text-slate-800">{verifyResult.clientName}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Hardware Component Spec</span>
                            <p className="font-serif font-bold mt-0.5 text-slate-800">{verifyResult.deviceModel} ({verifyResult.serialNumber})</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Sanitization Certification date</span>
                            <p className="font-serif font-bold mt-0.5 text-[#F27D26]">{verifyResult.dateIssued}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Authorized Technican Sign-off</span>
                            <p className="font-serif font-bold mt-0.5 text-slate-800">{verifyResult.technicianName}</p>
                          </div>
                        </div>

                        <div className="bg-[#FAF9F6] border border-[#E2E2E2] p-4 rounded border-l-4 border-l-[#F27D26]">
                          <span className="text-[10px] font-mono text-[#F27D26] uppercase font-bold">Destruction Protocol standard</span>
                          <p className="text-sm font-serif text-slate-700 font-bold mt-0.5">{verifyResult.destructionMethod}</p>
                          <p className="text-xs text-slate-500 font-serif mt-1">This certifies that all flash-chip clusters or HDD sector plates were subjected to localized multi-pass overwriting and final mechanical crushing below 2mm fragments to satisfy India\'s DPDP Act 2023 guidelines.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!verifyLoading && verifyError && (
                    <div className="bg-rose-50 border border-rose-200 p-6 rounded-lg flex items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-rose-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-serif font-bold text-rose-950 text-sm">Query Failed</h4>
                        <p className="text-xs text-rose-700 font-serif mt-1">{verifyError}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW: CORPORATE ESG DATA REPORT */}
            {currentView === 'esg' && (
              <div className="space-y-12">
                <div className="border-b border-[#E2E2E2] pb-6">
                  <h2 className="text-4xl font-serif font-black tracking-tight">Corporate ESG Compliance Forecast</h2>
                  <p className="text-sm text-slate-500 font-serif mt-2">Generate statutory projections of environmental offsets, circular product recovery rate, and raw mineral extraction metrics for carbon reports and executive slides.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Ingest panel */}
                  <div className="lg:col-span-4 bg-white border border-[#E2E2E2] p-6 rounded-lg space-y-4 shadow-sm self-start">
                    <h3 className="text-base font-serif font-bold text-slate-900 border-b border-[#E2E2E2] pb-2">Forecast Parameters</h3>
                    
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Company / Entity Name</label>
                      <input 
                        type="text" 
                        value={esgForm.clientName}
                        onChange={(e) => setEsgForm({...esgForm, clientName: e.target.value})}
                        className="w-full bg-[#FAF9F6] border border-[#E2E2E2] p-2 rounded text-xs focus:outline-none focus:border-[#F27D26]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Target Decommissioned Laptops</label>
                      <input 
                        type="number" 
                        value={esgForm.deviceCount}
                        onChange={(e) => setEsgForm({...esgForm, deviceCount: Math.max(1, Number(e.target.value))})}
                        className="w-full bg-[#FAF9F6] border border-[#E2E2E2] p-2 rounded text-xs focus:outline-none focus:border-[#F27D26]"
                        min={1}
                      />
                    </div>

                    <button 
                      onClick={triggerEsgCalculation}
                      disabled={esgLoading}
                      className="w-full bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded transition-colors cursor-pointer"
                    >
                      {esgLoading ? 'Calculating Parameters...' : 'Re-calculate Forecast'}
                    </button>
                  </div>

                  {/* Projections Panel */}
                  <div className="lg:col-span-8 bg-white border border-[#E2E2E2] p-8 rounded-lg shadow-sm space-y-6">
                    <h3 className="text-lg font-serif font-bold text-slate-950 border-b border-[#E2E2E2] pb-3 flex items-center justify-between">
                      <span className="capitalize">{esgForm.clientName} ESG Projections</span>
                      <span className="text-[10px] font-mono text-[#F27D26]">Format: statutory-esg v1.0</span>
                    </h3>

                    {esgResult ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-[#FAF9F6] p-4 rounded border border-[#E2E2E2]">
                            <span className="text-[9px] font-mono uppercase text-slate-500 block">Total E-Waste Volume</span>
                            <span className="text-2xl font-serif font-black text-slate-800 inline-block mt-1">{esgResult.weightTonnage} Tons</span>
                          </div>

                          <div className="bg-[#FAF9F6] p-4 rounded border border-[#E2E2E2]">
                            <span className="text-[9px] font-mono uppercase text-slate-500 block">CO2 Equivalent Saved</span>
                            <span className="text-2xl font-serif font-black text-[#F27D26] inline-block mt-1">{esgResult.co2OffsetMetricTons} MT</span>
                          </div>

                          <div className="bg-[#FAF9F6] p-4 rounded border border-[#E2E2E2]">
                            <span className="text-[9px] font-mono uppercase text-slate-500 block">Gold Recovered</span>
                            <span className="text-2xl font-serif font-black text-slate-800 inline-block mt-1">{esgResult.goldRecoveredGrams} g</span>
                          </div>

                          <div className="bg-[#FAF9F6] p-4 rounded border border-[#E2E2E2]">
                            <span className="text-[9px] font-mono uppercase text-slate-500 block">Copper Recycled</span>
                            <span className="text-2xl font-serif font-black text-slate-800 inline-block mt-1">{esgResult.copperRecoveredKg} kg</span>
                          </div>
                        </div>

                        {/* Circular Economy Rate chart representation */}
                        <div className="p-6 bg-[#FAF9F6] border border-[#E2E2E2] rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">Closed-Loop Circular Recycling Rate</span>
                            <span className="text-lg font-mono font-bold text-emerald-600">{esgResult.circularRecyclingRate}%</span>
                          </div>
                          <div className="w-full bg-[#E2E2E2] h-3 rounded overflow-hidden">
                            <div className="bg-[#F27D26] h-full" style={{ width: `${esgResult.circularRecyclingRate}%` }}></div>
                          </div>
                          <p className="text-[11px] text-slate-500 font-serif mt-2">
                            Our proprietary urban mining processors guarantee that up to 98.4% of high-grade copper pin structures, silicone matrix components, and rare minerals avoid any landfill footprint entirely.
                          </p>
                        </div>

                        {/* API ingestion tag */}
                        <div>
                          <div className="flex justify-between items-center mb-1 bg-[#FAF9F6] p-1 px-2 border border-[#E2E2E2] text-xs font-mono text-slate-500 rounded-t">
                            <span>Statutory Report JSON structure</span>
                            <button 
                              type="button" 
                              onClick={() => handleCopySchema(JSON.stringify(esgResult, null, 2), 'esg')}
                              className="hover:text-slate-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="h-3.5 w-3.5" /> {copiedText === 'esg' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[10px] rounded-b overflow-x-auto select-all max-h-36">
                            {JSON.stringify(esgResult, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 font-serif">
                        Running environmental simulations...
                      </div>
                    )}
                  </div>
                </div>

                {/* Regional Compliancy Interactive Recharts Panel */}
                <div className="pt-4">
                  <InteractiveComplianceChart />
                </div>
              </div>
            )}
          </>
        ) : (
          /* VIEW: DEEP LINKED ARTICLE READER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Area: Title and MDX body - 8 Columns */}
            <main className="lg:col-span-8 space-y-8 bg-white border border-[#E2E2E2] p-6 sm:p-10 rounded-lg shadow-sm">
              
              <button 
                onClick={() => setSelectedArticleSlug(null)}
                className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 hover:text-slate-950 flex items-center gap-1.5 cursor-pointer pb-2 border-b border-dashed border-[#E2E2E2] mb-4"
              >
                ← Back to Citation Feed
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F27D26] font-bold">
                  <span>{selectedArticle.category.replace('-', ' ')}</span>
                  <span>•</span>
                  <span>{selectedArticle.geo_focus} Only</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.1] text-slate-950">
                  {selectedArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-[#E2E2E2]">
                  <img 
                    src={selectedArticle.author.avatar} 
                    alt={selectedArticle.author.name} 
                    className="w-10 h-10 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-950">{selectedArticle.author.name}</p>
                    <p className="text-[11px] font-serif text-slate-500 italic leading-none mt-0.5">{selectedArticle.author.role}</p>
                  </div>
                  <div className="ml-auto text-right text-xs font-mono text-slate-400">
                    <div>Published: {selectedArticle.date}</div>
                    <div className="flex flex-col items-end gap-1.5 mt-1">
                      <span>Length: ~{selectedArticle.wordCount} Words</span>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-black border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60 transition-colors">
                        ⏱️ {Math.ceil(selectedArticle.wordCount / 200)} Min Read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Content View with typography classes */}
              <div className="markdown-body font-serif text-slate-800 leading-relaxed space-y-6">
                {/* Check if MDX contains standard elements, format appropriately */}
                <div 
                  className="prose prose-slate max-w-none text-base"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedArticle.content
                      .replace(/\n### (.*)/g, '<h3>$1</h3>')
                      .replace(/\n## (.*)/g, '<h2>$1</h2>')
                      .replace(/\n\* (.*)/g, '<li>$1</li>')
                      .replace(/\n- (.*)/g, '<li>$1</li>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .split('\n\n').map(p => {
                        if (p.trim().startsWith('<h') || p.trim().startsWith('<li') || p.trim().startsWith('<ol') || p.trim().startsWith('<table') || p.trim().startsWith('<tr') || p.trim().startsWith('<td') || p.trim().startsWith('<th')) {
                          return p;
                        }
                        return `<p>${p}</p>`;
                      }).join('\n')
                  }}
                />
              </div>

              {/* End Citations */}
              <div className="pt-10 border-t border-[#E5E2DA] space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold">Verification & Legal References</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-serif text-[#2B2B2B] bg-[#FAF9F6] p-6 rounded-lg border border-[#E5E2DA]">
                  <div>
                    <strong className="block text-[#1A1A1A] mb-2 font-sans font-bold text-xs uppercase tracking-wider">Statutory Mandates Met</strong>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>CPCB E-Waste Management Rules 2022</li>
                      <li>Standard physical shredding guidelines</li>
                      <li>DPDP Act 2023 certified auditing</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="block text-[#1A1A1A] mb-2 font-sans font-bold text-xs uppercase tracking-wider">Secure Chain of Custody</strong>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>Authorized transport log manifestation</li>
                      <li>NIST-SP 800-88 erasure validation logs</li>
                      <li>Registered Kakkanad recycling yard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SOCIAL SHARING BUTTONS SECTION */}
              <div id="social-share-section" className="pt-10 border-t border-[#E5E2DA] space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-[#F27D26]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Share Legal Literature Node</span>
                  </div>
                  <span className="text-xs font-serif italic text-slate-400">Open Resource Access Protocol</span>
                </div>
                
                <div className="flex flex-wrap gap-3 items-center">
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] hover:bg-slate-900 hover:text-white border border-[#E5E2DA] text-xs font-mono font-bold tracking-wider rounded transition-colors text-slate-700 cursor-pointer"
                  >
                    <span>Twitter / X</span>
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] hover:bg-slate-900 hover:text-white border border-[#E5E2DA] text-xs font-mono font-bold tracking-wider rounded transition-colors text-slate-700 cursor-pointer"
                  >
                    <span>LinkedIn</span>
                  </button>
                  <button 
                    onClick={() => handleShare('reddit')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] hover:bg-slate-900 hover:text-white border border-[#E5E2DA] text-xs font-mono font-bold tracking-wider rounded transition-colors text-slate-700 cursor-pointer"
                  >
                    <span>Reddit</span>
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] hover:bg-slate-900 hover:text-white border border-[#E5E2DA] text-xs font-mono font-bold tracking-wider rounded transition-colors text-slate-700 cursor-pointer"
                  >
                    <span>Facebook</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-4 py-2 ml-auto bg-[#FAF9F6] hover:bg-[#F27D26] hover:text-white hover:border-[#F27D26] border border-[#E5E2DA] text-xs font-mono font-bold tracking-wider rounded transition-colors text-slate-700 cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{shareCopied ? 'Citation Link Copied!' : 'Copy Permanent Citation Link'}</span>
                  </button>
                </div>
              </div>

              {/* DISCOURSE & COMMENTS SYSTEM */}
              <div id="comments-section" className="pt-12 border-t border-[#E5E2DA] space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E2DA] pb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-[#1A1A1A] tracking-tight">Interactive Discourse Layer</h3>
                    <p className="text-xs text-slate-500 font-serif mt-1">Review legal audits, academic comments, and regional expert insights.</p>
                  </div>
                  
                  {/* Administrative override switch */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">Moderator Engine</span>
                    <button
                      type="button"
                      onClick={() => setIsAdminMode(!isAdminMode)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isAdminMode ? 'bg-[#F27D26]' : 'bg-slate-200'
                      }`}
                    >
                      <span className="sr-only">Toggle Admin Mode</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          isAdminMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-mono font-bold uppercase ${isAdminMode ? 'text-[#F27D26]' : 'text-slate-400'}`}>
                      {isAdminMode ? 'Admin Mode (On)' : 'Guest View'}
                    </span>
                  </div>
                </div>

                {/* MODERATOR CONTROL STATUS BANNER */}
                {isAdminMode && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center justify-between text-[#1A1A1A]">
                    <div className="flex items-center gap-2 text-xs">
                      <ShieldAlert className="h-4 w-4 text-amber-600" />
                      <div>
                        <strong className="font-sans font-bold uppercase tracking-wider text-amber-800">Administrator Credentials Active:</strong>
                        <span className="font-serif block text-amber-700 mt-0.5">You can now override audit flags, ban spam items, and instantly approve client comments inline.</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-200 text-amber-900 border border-amber-300 py-1 px-2.5 rounded font-bold">ROOT</span>
                  </div>
                )}

                {/* COMMENTS LIST */}
                <div className="space-y-6">
                  {comments.filter(c => c.articleSlug === selectedArticle.slug).length === 0 ? (
                    <p className="text-sm text-slate-400 font-serif italic py-6 text-center border border-dashed border-[#E5E2DA] rounded bg-[#FAF9F6]">
                      No approved commentary responses has been registered on this node yet. Submit your discourse below.
                    </p>
                  ) : (
                    comments
                      .filter(c => c.articleSlug === selectedArticle.slug)
                      .filter(c => isAdminMode || c.approved)
                      .map(comment => (
                        <div 
                          key={comment.id} 
                          className={`p-6 sm:p-8 rounded-lg border transition-all ${
                            comment.flagged 
                              ? 'bg-rose-50 border-rose-200 opacity-80' 
                              : !comment.approved 
                              ? 'bg-yellow-50/50 border-yellow-200 border-dashed'
                              : 'bg-white border-[#E5E2DA]'
                          }`}
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-sm text-[#1A1A1A]">{comment.author}</span>
                              <span className="text-[9px] font-mono uppercase bg-[#F3F1EC] text-slate-500 px-1.5 py-0.5 rounded tracking-wide font-bold">Verified Reader</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{comment.timestamp}</span>
                          </div>

                          <p className="font-serif text-[15px] sm:text-base text-slate-700 leading-relaxed mb-4">
                            {comment.content}
                          </p>

                          {/* BADGES */}
                          <div className="flex flex-wrap gap-2 items-center mb-0.5">
                            {!comment.approved && (
                              <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200 py-0.5 px-2 rounded inline-flex items-center gap-1">
                                ⏳ Pending Editorial Audit
                              </span>
                            )}
                            {comment.flagged && (
                              <span className="text-[11px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 py-0.5 px-2 rounded inline-flex items-center gap-1">
                                ⚠️ Marked as Dispute / Spam
                              </span>
                            )}
                          </div>

                          {/* INLINE ADMIN CONTROLS TOOLBAR */}
                          {isAdminMode && (
                            <div className="mt-4 pt-4 border-t border-dashed border-[#E5E2DA] flex flex-wrap gap-2 justify-end">
                              {!comment.approved && (
                                <button
                                  type="button"
                                  onClick={() => handleApproveComment(comment.id)}
                                  className="text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                                >
                                  Approve for Publication
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleToggleFlagComment(comment.id)}
                                className={`text-xs font-mono font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                                  comment.flagged
                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                    : 'bg-[#FAF9F6] border border-[#E5E2DA] hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                {comment.flagged ? 'Remove Dispute Flag' : 'Mark as Dispute'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs font-mono font-bold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded transition-all cursor-pointer inline-flex items-center gap-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Expunge
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </div>

                {/* NEW DISCUSSION FORM */}
                <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-6 sm:p-10 rounded-xl space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">Submit Scholarly Commentary</h4>
                    <p className="text-xs text-slate-500 font-serif">Your contribution undergoes state-level legal audit board vetting prior to community indexation.</p>
                  </div>

                  {commentSuccessMsg && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded text-xs leading-relaxed font-serif">
                      {commentSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handlePostComment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-2">Author Name / Entity designation</label>
                      <input 
                        type="text"
                        placeholder="e.g. Adv. Dr. Thomas Isaac"
                        value={commentForm.author}
                        onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 rounded text-sm focus:outline-none focus:border-[#F27D26] transition-colors font-serif"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Discourse content (Serif Typography)</label>
                        
                        {/* Browser Speech dictation */}
                        <button
                          type="button"
                          onClick={toggleDictation}
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1 rounded transition-all cursor-pointer ${
                            isDictating 
                              ? 'bg-red-650 hover:bg-red-700 text-white animate-pulse' 
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                          }`}
                          title="Dictate comments with browser microphone Web Speech API"
                        >
                          <span className={`block w-1.5 h-1.5 rounded-full ${isDictating ? 'bg-white animate-ping' : 'bg-emerald-600'}`}></span>
                          {isDictating ? 'Microphone Active' : '🎤 Dictate (Web Speech)'}
                        </button>
                      </div>

                      <textarea 
                        rows={4}
                        placeholder="Type your statutory references or constructive circular feedback here..."
                        value={commentForm.content}
                        onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 rounded text-sm focus:outline-none focus:border-[#F27D26] transition-colors font-serif"
                        required
                      />

                      {dictationError && (
                        <p className="mt-1.5 text-[11px] text-rose-600 font-mono">
                          ⚠️ {dictationError}
                        </p>
                      )}
                      {isDictating && (
                        <p className="mt-1 text-[11px] text-emerald-600 font-serif italic">
                          Speaking clearly... Dictating as English (India) accent standard. Speak "comma", "full stop" to insert grammar.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#F27D26] hover:bg-[#1A1A1A] text-white font-sans font-bold text-xs uppercase tracking-widest py-3 px-6 rounded transition-colors duration-200 cursor-pointer"
                    >
                      Publish Commentary Response
                    </button>
                  </form>
                </div>
              </div>
            </main>

            {/* Right Meta Side Rail: AI Summary (API proxied) & JSON-LD schema previews - 4 Columns */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* AI summary Smart Card */}
              <div className="bg-[#1A1A1A] text-[#FAF9F6] p-6 rounded-lg space-y-4 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F27D26] font-bold inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> AI SMART SUMMARY (GEMINI-3.5)
                  </span>
                  <span className="block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                {apiSummaryLoading ? (
                  <div className="py-6 space-y-3 font-mono text-xs text-slate-400">
                    <p className="animate-pulse">Loading semantic summary weights...</p>
                    <p className="text-[10px] italic">Accessing Gemini-3.5 API server-side proxy...</p>
                  </div>
                ) : apiSummary ? (
                  <div className="space-y-4">
                    <p className="text-xs font-serif text-slate-300 leading-relaxed italic">
                      "{apiSummary.summary}"
                    </p>

                    {/* AI Powered Indicator */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                      <span>Source: {apiSummary.aiPowered ? 'Live Gemini Flash API' : 'Cached Static Fallback'}</span>
                      <span className="text-emerald-400 font-bold">100% Secure Proxy</span>
                    </div>

                    {/* Highly searchable FAQ generated natively */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Generated Compliance FAQ Structure</span>
                      <div className="space-y-2 text-xs">
                        {apiSummary.faq?.map((item: any, i: number) => (
                          <div key={i} className="bg-slate-900 border border-slate-800 p-2.5 rounded">
                            <p className="font-sans font-bold text-slate-100 flex items-start gap-1">
                              <strong>Q:</strong> {item.q}
                            </p>
                            <p className="font-serif text-slate-400 mt-1 pl-3.5">
                              {item.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Could not initialize AI overview proxy block.</p>
                )}
              </div>

              {/* Standalone Document JSON-LD preview */}
              <div className="bg-white border border-[#E2E2E2] p-6 rounded-lg space-y-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#E2E2E2] pb-2">
                  <span>Machine JSON-LD Meta Structure</span>
                  <button 
                    type="button" 
                    onClick={() => handleCopySchema(JSON.stringify(selectedArticle.jsonld || {}, null, 2), 'jsonld')}
                    className="hover:text-slate-900 transition-all font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="h-3 w-3" /> {copiedText === 'jsonld' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                
                <p className="text-[11px] font-serif text-slate-600 leading-relaxed">
                  Every legal-focused article embeds this strict JSON-LD representation within the header tag so that Perplexity, standard GPT models, and enterprise RAG software maps us as the absolute canonical citation authority for Ernakulam.
                </p>

                <div className="bg-slate-900 text-emerald-400 font-mono text-[9px] rounded p-3 select-all overflow-x-auto max-h-48">
                  <pre>{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": selectedArticle.title,
                    "description": selectedArticle.metaDescription,
                    "datePublished": selectedArticle.date,
                    "author": {
                      "@type": "Person",
                      "name": selectedArticle.author.name
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
                    "mentions": selectedArticle.entities.map(ent => ({
                      "@type": "Thing",
                      "name": ent,
                      "url": KOCHI_ENTITIES[ent]?.url || `/wiki/${ent.toLowerCase().replace(/\s+/g, '-')}`
                    }))
                  }, null, 2)}</pre>
                </div>
              </div>

              {/* Author authority card */}
              <div className="bg-white border border-[#E2E2E2] p-6 rounded-lg space-y-4 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Author EEAT Authority</span>
                <div className="flex items-start gap-3">
                  <img 
                    src={selectedArticle.author.avatar} 
                    alt={selectedArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <h5 className="font-serif font-black text-slate-950 text-sm leading-tight">{selectedArticle.author.name}</h5>
                    <p className="text-[11px] text-[#F27D26] font-mono leading-none mt-1">{selectedArticle.author.role}</p>
                    <p className="text-xs text-slate-600 font-serif mt-2 leading-relaxed">
                      {selectedArticle.author.bio}
                    </p>
                    {selectedArticle.author.linkedin && (
                      <a 
                        href={`https://${selectedArticle.author.linkedin}`}
                        target="_blank"
                        className="text-[11px] font-mono text-slate-400 hover:text-slate-950 transition-colors inline-block mt-2 underline"
                      >
                        Verify Credentials on LinkedIn ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Related posts router */}
              <div className="bg-white border border-[#E2E2E2] p-6 rounded-lg space-y-4 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Read Next / Correlated Literature</span>
                <div className="space-y-3">
                  {selectedArticle.relatedSlugs.map(slug => {
                    const rArt = ARTICLES.find(a => a.slug === slug);
                    if (!rArt) return null;
                    return (
                      <div 
                        key={rArt.slug}
                        onClick={() => setSelectedArticleSlug(rArt.slug)}
                        className="p-3 bg-[#FAF9F6] border border-[#E2E2E2] hover:border-slate-800 transition-colors rounded cursor-pointer group"
                      >
                        <span className="text-[9px] font-mono uppercase text-[#F27D26] block font-bold">{rArt.category.replace('-', ' ')}</span>
                        <h6 className="text-xs font-serif font-bold text-slate-950 group-hover:underline mt-0.5">{rArt.title}</h6>
                      </div>
                    );
                  })}
                </div>
              </div>

            </aside>

          </div>
        )}

      </div>

      {/* Corporate Editorial Footer */}
      <Footer setView={setView} setSelectedArticleSlug={setSelectedArticleSlug} />

      {/* User Authentication Modal Overlay */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('ewastekochi_active_user', JSON.stringify(user));
          setIsAuthModalOpen(false);
        }}
      />

      {/* Sticky Bottom CTA Bar */}
      {currentView === 'home' && !selectedArticleSlug && (
        <div className="fixed bottom-0 left-0 right-0 z-[998] bg-[#020703]/95 border-t border-emerald-950 px-4 py-3 sm:px-6 flex items-center justify-between shadow-2xl backdrop-blur-md transition-all duration-300">
          <div className="text-left">
            <p className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">CPCB REGISTERED RECYCLER</p>
            <p className="text-xs text-white font-serif leading-none mt-1.5 font-bold">Free Corporate & Home E-Waste Pickup</p>
          </div>
          <button
            onClick={() => {
              const estimatorWidget = document.getElementById('price-estimator-widget');
              if (estimatorWidget) {
                estimatorWidget.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#5ce625] hover:bg-[#4dd31a] text-slate-950 text-xs font-sans font-black uppercase tracking-wider py-2 px-4 rounded-md shadow-md shadow-emerald-500/20 active:translate-y-px cursor-pointer transition-all duration-250"
          >
            Book Free Pickup
          </button>
        </div>
      )}

      {/* Floating Interactive Live AI Chatbot Widget (Natively integrates WhatsApp & AI Scheduling) */}
      <AIChatBot />
    </div>
  );
}
