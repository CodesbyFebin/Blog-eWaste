import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Search, 
  ChevronDown, 
  Globe, 
  Cpu, 
  RefreshCw, 
  Lock, 
  Check,
  Menu,
  X,
  User,
  LogOut,
  ShieldAlert,
  FileText,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies';
  setView: (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies') => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  currentUser: { email: string; name: string; isAdmin: boolean } | null;
  onLogout: () => void;
  onOpenAuthModal: () => void;
}

export default function Header({ 
  currentView, 
  setView, 
  selectedArticleSlug, 
  setSelectedArticleSlug,
  currentUser,
  onLogout,
  onOpenAuthModal
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleNavClick = (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies') => {
    setView(view);
    setSelectedArticleSlug(null);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setUserDropdownOpen(false);
  };

  const handleDropdownToggle = (menuName: string) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  // Quick helper to scroll to booking form
  const handleRequestPickup = () => {
    const calcSection = document.getElementById('price-estimator-widget') || 
                          document.getElementById('comment-desk') || 
                          document.getElementById('app-root');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full relative z-50 flex flex-col" id="header-main-root">
      {/* 1. TOP GREEN CERTIFICATION BAR */}
      <div className="bg-[#030a04] text-slate-300 text-[11px] py-2 px-4 border-b border-emerald-950/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 font-sans font-medium">
          {/* Left Metrics/Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-emerald-400">
            <span className="flex items-center gap-1.5 border-r border-emerald-900/50 pr-4">
              <Check className="h-3 w-3 text-emerald-400" />
              <span>CPCB Authorized Recycler</span>
            </span>
            <span className="flex items-center gap-1.5 border-r border-emerald-900/50 pr-4">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>ISO 14001 & 27001 Certified</span>
            </span>
            <span className="flex items-center gap-1.5 border-r border-emerald-900/50 pr-4">
              <RefreshCw className="h-2.5 w-2.5 text-emerald-400" />
              <span>R2v3 Responsible Standard</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>NIST 800-88 Data Security</span>
            </span>
          </div>

          {/* Right Location & Phone */}
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-[#F27D26]" />
              <span>Serving All Kerala</span>
            </span>
            <span className="text-emerald-950">|</span>
            <a href="tel:+917500555454" className="flex items-center gap-1.5 font-bold hover:text-white transition-colors">
              <Phone className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>+91 7500555454</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR BLOCK */}
      <div className="sticky top-0 z-50 bg-[#020703]/95 text-slate-100 border-b border-emerald-950 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo on Left */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group shrink-0 animate-fade-in"
            >
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-black" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-2.48 0-4.5-2.02-4.5-4.5h2c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5H18c0 2.48-2.02 4.5-4.5 4.5zm2.75-6.5l-1.5-1.5H11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h2l2 2v-5.5z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-sans font-black tracking-tight text-xl text-white">
                    EWasteKochi
                  </span>
                </div>
                <p className="text-[9px] uppercase font-mono text-[#5ce625] tracking-widest leading-none mt-0.5 font-bold">
                  Recycle. Secure. Sustain.
                </p>
              </div>
            </div>

            {/* Central Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 text-xs xl:text-sm font-sans font-semibold rounded-md transition-all cursor-pointer ${
                  currentView === 'home' && !selectedArticleSlug
                    ? 'text-[#5ce625] bg-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Home
              </button>

              {/* Services Dropdown - Refactored Multi-Column Megamenu */}
              <div className="relative" id="header-nav-services">
                <button
                  onClick={() => handleDropdownToggle('services')}
                  aria-label="Toggle Services dropdown"
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                    ['pillars', 'valuator', 'verifier'].includes(currentView)
                      ? 'text-[#5ce625] bg-emerald-950/40 border border-emerald-900/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50 border border-transparent'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {activeDropdown === 'services' && (
                  <div className="absolute top-[110%] left-0 w-[584px] bg-[#030b04] border border-emerald-900/60 rounded-xl shadow-2xl p-4 grid grid-cols-3 gap-5 text-xs z-50 animate-fadeIn">
                    
                    {/* Category Column 1: Recycling */}
                    <div className="space-y-3.5 flex flex-col">
                      <h4 className="font-mono text-[9px] font-black uppercase tracking-widest text-[#5ce625] border-b border-emerald-950/80 pb-1.5">
                        ♻️ Recycling
                      </h4>
                      <div className="space-y-1">
                        <button 
                          onClick={() => { handleNavClick('pillars'); }} 
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">E-Waste Recycling</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Eco-authorized regional retrieval and alloy sorting.</span>
                        </button>
                        <button 
                          onClick={handleRequestPickup}
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">Free Logistics Pickups</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Compliant dual-operator weekly collections.</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Column 2: Asset Management */}
                    <div className="space-y-3.5 flex flex-col">
                      <h4 className="font-mono text-[9px] font-black uppercase tracking-widest text-[#5ce625] border-b border-emerald-950/80 pb-1.5">
                        💼 Asset Management
                      </h4>
                      <div className="space-y-1">
                        <button 
                          onClick={() => { handleNavClick('valuator'); }} 
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">ITAD & Buyback</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Corporate valuation audits and circular hardware buybacks.</span>
                        </button>
                        <button 
                          onClick={() => { handleNavClick('valuator'); }} 
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">Marketplace Valuation</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Instant hardware diagnostic grades and pricing reports.</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Column 3: Data Security */}
                    <div className="space-y-3.5 flex flex-col">
                      <h4 className="font-mono text-[9px] font-black uppercase tracking-widest text-[#5ce625] border-b border-emerald-950/80 pb-1.5">
                        🔒 Data Security
                      </h4>
                      <div className="space-y-1">
                        <button 
                          onClick={() => { handleNavClick('verifier'); }} 
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">Secure Shredding</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Bulletproof physical 2mm solid-state shearing.</span>
                        </button>
                        <button 
                          onClick={() => { handleNavClick('policies'); }} 
                          className="w-full text-left p-2 hover:bg-emerald-950/40 rounded transition-all group flex flex-col cursor-pointer"
                        >
                          <span className="font-sans font-bold text-slate-100 group-hover:text-[#5ce625]">NIST SP 800-88 Rules</span>
                          <span className="text-[10px] text-slate-400 font-serif leading-tight mt-0.5">Legally defensible DPDP and environmental tracking.</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* ITAD & Business Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('itad')}
                  aria-label="Toggle Business solutions dropdown"
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                    currentView === 'esg'
                      ? 'text-[#5ce625] bg-emerald-950/40 border border-emerald-900/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50 border border-transparent'
                  }`}
                >
                  <span>ITAD & Business</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {activeDropdown === 'itad' && (
                  <div className="absolute top-[110%] left-0 w-64 bg-[#030a04] border border-emerald-950 rounded-lg shadow-2xl p-2 space-y-1 text-xs">
                    <button onClick={() => handleNavClick('esg')} className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer block">Corporate ESG Forecasting</button>
                    <button onClick={() => handleNavClick('verifier')} className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer block">Mutilation Certificate Verification</button>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('resources')}
                  aria-label="Toggle Resources dropdown"
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                    ['wiki', 'pillars', 'valuator'].includes(currentView)
                      ? 'text-[#5ce625] bg-emerald-950/40 border border-emerald-900/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50 border border-transparent'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute top-[110%] left-0 w-60 bg-[#030a04] border border-emerald-950 rounded-lg shadow-2xl p-2 space-y-1 text-xs z-50">
                    <button 
                      onClick={() => { handleNavClick('wiki'); }} 
                      className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4 text-emerald-400" />
                      <div>
                        <span className="font-bold block">Kochi Entity Wiki</span>
                        <span className="text-[10px] text-slate-400 font-serif">Authority Knowledge Base</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { handleNavClick('pillars'); }} 
                      className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer flex items-center gap-2"
                    >
                      <Cpu className="h-4 w-4 text-emerald-400" />
                      <div>
                        <span className="font-bold block">20 ESG Pillars</span>
                        <span className="text-[10px] text-slate-400 font-serif">Compliance Objectives</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { handleNavClick('valuator'); }} 
                      className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4 text-emerald-400" />
                      <div>
                        <span className="font-bold block">Marketplace Valuation</span>
                        <span className="text-[10px] text-slate-400 font-serif">Laptop & Device Buyback</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* About Page */}
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-2 text-xs xl:text-sm font-sans font-semibold rounded-md transition-all cursor-pointer ${
                  currentView === 'about'
                    ? 'text-[#5ce625] bg-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                About Us
              </button>

              {/* Contact Page */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-2 text-xs xl:text-sm font-sans font-semibold rounded-md transition-all cursor-pointer ${
                  currentView === 'contact'
                    ? 'text-[#5ce625] bg-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Contact
              </button>

              {/* Policies Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('policies')}
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                    currentView === 'policies'
                      ? 'text-[#5ce625] bg-emerald-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <span>Policies</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {activeDropdown === 'policies' && (
                  <div className="absolute top-[110%] right-0 w-56 bg-[#030a04] border border-emerald-950 rounded-lg shadow-2xl p-2 space-y-1 text-xs">
                    <button 
                      onClick={() => handleNavClick('policies')} 
                      className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Privacy & DPDP Rules</span>
                    </button>
                    <button 
                      onClick={() => handleNavClick('policies')} 
                      className="w-full text-left p-2.5 hover:bg-emerald-900/30 rounded text-slate-200 font-sans cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                      <span>AI Chatbot Policy</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Lead Moderation Dashboard Link - visible only if logged in as Admin */}
              {currentUser?.isAdmin && (
                <button
                  onClick={() => handleNavClick('moderate')}
                  className={`px-3 py-2 text-xs xl:text-sm font-sans font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    currentView === 'moderate'
                      ? 'text-red-400 bg-red-950/30 border border-red-900/40'
                      : 'text-red-350 hover:bg-red-950/20 hover:text-red-100 border border-red-950/50'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Audit Center</span>
                </button>
              )}
            </nav>

            {/* Right Action button, User State, and Hamburg */}
            <div className="flex items-center gap-3">
              
              {/* Dark / Light Mode Switcher */}
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle Theme"
                className="p-2 ml-1 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-slate-300 hover:text-white hover:border-[#5ce625] transition-all cursor-pointer flex items-center justify-center h-9 w-9 shrink-0"
                title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[#5ce625]" />
                ) : (
                  <Moon className="h-4 w-4 text-emerald-400" />
                )}
              </button>

              {/* User Identity */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-xs font-sans text-white hover:border-[#5ce625] transition-all cursor-pointer animate-fadeIn"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#5ce625] text-slate-950 flex items-center justify-center font-bold font-sans text-[11px]">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate hidden md:inline font-semibold">{currentUser.name.split(' ')[0]}</span>
                    {currentUser.isAdmin && (
                      <span className="bg-red-950 text-red-400 border border-red-900/60 rounded px-1.5 py-0.5 text-[8px] font-mono leading-none scale-90 uppercase font-black">
                        Lead
                      </span>
                    )}
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute top-[115%] right-0 w-56 bg-[#030a04] border border-emerald-900/60 rounded-xl shadow-2xl p-2 space-y-1 text-xs text-slate-200 z-[60] animate-fadeIn">
                      <div className="p-2 border-b border-emerald-950 text-slate-400 text-[10px] font-mono">
                        <span className="block text-slate-300 font-bold truncate">{currentUser.email}</span>
                        <span>Clearance Level: {currentUser.isAdmin ? 'Admin' : 'Public'}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleNavClick('moderate');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-emerald-950/50 rounded flex items-center gap-1.5 cursor-pointer block text-slate-200"
                      >
                        <ShieldAlert className="h-3.5 w-3.5 text-[#5ce625]" />
                        <span>Lead Audit Center</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-red-950/40 rounded text-red-400 flex items-center gap-1.5 cursor-pointer block"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Disconnect ID</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center justify-center gap-1.5 bg-emerald-950/50 hover:bg-emerald-900/40 border border-emerald-800/60 text-slate-200 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer"
                >
                  <User className="h-3.5 w-3.5 text-[#5ce625]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile hamburger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-slate-900 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu - polished with clean grouping & touch targets */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#020703]/98 border-t border-emerald-950 shrink-0 px-4 pt-3 pb-6 space-y-4 animate-fadeIn overflow-y-auto max-h-[80vh]">
            <div className="space-y-1">
              <span className="block font-sans font-black text-[#5ce625] text-[10px] tracking-widest uppercase mb-1 px-3">
                Main
              </span>
              <button
                onClick={() => handleNavClick('home')}
                className="block w-full text-left px-3 py-2 font-semibold text-sm hover:bg-emerald-950/30 text-slate-200 rounded min-h-[44px]"
              >
                Home Index
              </button>
            </div>

            <div className="space-y-1">
              <span className="block font-sans font-black text-[#5ce625] text-[10px] tracking-widest uppercase mb-1 px-3">
                Services
              </span>
              <button
                onClick={() => handleNavClick('pillars')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px] flex items-center justify-between"
              >
                <span>♻️ E-waste Recycling</span>
                <span className="text-[10px] text-slate-500">Pillars</span>
              </button>
              <button
                onClick={() => handleNavClick('valuator')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px] flex items-center justify-between"
              >
                <span>💼 ITAD & Laptop Buyback</span>
                <span className="text-[10px] text-slate-500">Valuator</span>
              </button>
              <button
                onClick={() => handleNavClick('verifier')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px] flex items-center justify-between"
              >
                <span>🔒 Secure Shredding & Destruction</span>
                <span className="text-[10px] text-slate-500">Verifier</span>
              </button>
            </div>

            <div className="space-y-1">
              <span className="block font-sans font-black text-[#5ce625] text-[10px] tracking-widest uppercase mb-1 px-3">
                Business & Resources
              </span>
              <button
                onClick={() => handleNavClick('esg')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px]"
              >
                📈 Corporate ESG Tool
              </button>
              <button
                onClick={() => handleNavClick('wiki')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px]"
              >
                📖 Kochi Entity Wiki
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px]"
              >
                👥 About Corporate Hub
              </button>
              <button
                onClick={() => handleNavClick('policies')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px]"
              >
                ⚖️ Privacy & DPDP Policies
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-emerald-950/30 text-slate-300 rounded min-h-[44px]"
              >
                📞 Contact & Address
              </button>
            </div>

            <button
              onClick={handleRequestPickup}
              className="w-full text-center bg-[#5ce625] text-slate-950 font-sans font-black uppercase text-xs py-3 rounded-md mt-4 transition-all min-h-[44px]"
            >
              Book Free Pickup
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
