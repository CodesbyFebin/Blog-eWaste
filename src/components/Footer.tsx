import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FooterProps {
  setView: (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies') => void;
  setSelectedArticleSlug: (slug: string | null) => void;
}

export default function Footer({ setView, setSelectedArticleSlug }: FooterProps) {
  // Mobile accordion state
  const [openCol, setOpenCol] = useState<string | null>(null);

  const toggleColumn = (colName: string) => {
    if (openCol === colName) {
      setOpenCol(null);
    } else {
      setOpenCol(colName);
    }
  };

  const handleUrlClick = (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies') => {
    setView(view);
    setSelectedArticleSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo' | 'moderate' | 'about' | 'contact' | 'policies') => {
    e.preventDefault();
    handleUrlClick(view);
  };

  return (
    <footer className="bg-[#0c140f] border-t border-emerald-950/80 font-sans tracking-tight text-[#cbdcc2] pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Primary CTAs */}
          <div className="space-y-5 lg:col-span-1">
            <div className="space-y-2">
              <h3 className="font-sans font-black text-xl text-white tracking-tight leading-none">
                EWASTEKOCHI
              </h3>
              <p className="text-[#b9d2a4] text-xs font-mono uppercase tracking-widest font-black">
                Recycle. Secure. Sustain.
              </p>
            </div>

            {/* Logo placeholder visual */}
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#5ce625] to-emerald-600 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-900/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-2.48 0-4.5-2.02-4.5-4.5h2c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5H18c0 2.48-2.02 4.5-4.5 4.5zm2.75-6.5l-1.5-1.5H11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h2l2 2v-5.5z"/>
              </svg>
            </div>

            {/* Trust Badges */}
            <div className="space-y-1.5 text-[10px] text-slate-400 font-mono tracking-tight bg-slate-950/40 p-3 rounded-lg border border-emerald-950/40">
              <p className="text-emerald-400 font-bold">CPCB Authorized | KSPCB KL/EW/628</p>
              <p>ISO 14001 & 27001 | NIST 800-88</p>
            </div>

            {/* Main Hub Details */}
            <div className="space-y-2 text-xs text-slate-350">
              <p className="flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>📍 Main Hub: Kakkanad, Ernakulam, Kochi</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+917500555454" className="hover:text-white transition-colors font-semibold">📞 +91 7500555454</a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:hello@ewastekochi.com" className="hover:text-white transition-colors">hello@ewastekochi.com</a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-1">
              <a 
                href="https://ewastekochi.com/services/pickup" 
                onClick={(e) => handleLinkClick(e, 'home')} 
                className="inline-block bg-[#4caf50] hover:bg-[#3d9241] text-white px-3 py-1.5 rounded-lg text-[11px] font-sans font-bold transition-colors shadow-md"
              >
                Book Pickup
              </a>
              <a 
                href="https://ewastekochi.com/individuals/valuation" 
                onClick={(e) => handleLinkClick(e, 'valuator')} 
                className="inline-block border border-[#7cb342] text-[#c8e6b5] hover:bg-[#2e5a2a] px-3 py-1.5 rounded-lg text-[11px] font-sans font-bold transition-colors"
              >
                Get Quote
              </a>
            </div>
          </div>

          {/* Column 2: Core Service Landing Pages (Interlink Hub) */}
          <div className="border-b border-emerald-950/65 md:border-b-0 pb-4 md:pb-0">
            <button 
              onClick={() => toggleColumn('services')}
              className="w-full flex items-center justify-between text-left md:block cursor-pointer focus:outline-none"
            >
              <h4 className="font-sans font-bold text-sm text-[#c8e6b5] uppercase tracking-widest md:mb-4">
                Core Services
              </h4>
              <span className="md:hidden">
                {openCol === 'services' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
            <ul className={`space-y-3 pt-3 md:pt-0 text-[12px] ${openCol === 'services' ? 'block' : 'hidden md:block'} animate-fadeIn`}>
              <li>
                <a 
                  href="https://ewastekochi.com/services/pickup" 
                  onClick={(e) => handleLinkClick(e, 'home')} 
                  className="hover:text-white transition-colors"
                >
                  E‑Waste Pickup
                </a>
              </li>
              <li>
                <a 
                  href="https://ewastekochi.com/services/data-destruction" 
                  onClick={(e) => handleLinkClick(e, 'verifier')} 
                  className="hover:text-white transition-colors"
                >
                  Secure Data Destruction
                </a>
              </li>
              <li>
                <a 
                  href="https://ewastekochi.com/services/itad" 
                  onClick={(e) => handleLinkClick(e, 'valuator')} 
                  className="hover:text-white transition-colors"
                >
                  IT Asset Disposition (ITAD)
                </a>
              </li>
              <li>
                <a 
                  href="https://ewastekochi.com/services/battery-recycling" 
                  onClick={(e) => handleLinkClick(e, 'pillars')} 
                  className="hover:text-white transition-colors"
                >
                  Battery Recycling
                </a>
              </li>
              <li>
                <a 
                  href="https://ewastekochi.com/services/laptop-disposal" 
                  onClick={(e) => handleLinkClick(e, 'valuator')} 
                  className="hover:text-white transition-colors"
                >
                  Laptop Disposal
                </a>
              </li>
              <li>
                <a 
                  href="https://ewastekochi.com/services/server-recycling" 
                  onClick={(e) => handleLinkClick(e, 'pillars')} 
                  className="hover:text-white transition-colors"
                >
                  Server Decommissioning
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Audience Paths */}
          <div className="border-b border-emerald-950/65 md:border-b-0 pb-4 md:pb-0">
            <button 
              onClick={() => toggleColumn('audiences')}
              className="w-full flex items-center justify-between text-left md:block cursor-pointer focus:outline-none"
            >
              <h4 className="font-sans font-bold text-sm text-[#c8e6b5] uppercase tracking-widest md:mb-4">
                Audience Sectors
              </h4>
              <span className="md:hidden">
                {openCol === 'audiences' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
            <div className={`space-y-4 pt-3 md:pt-0 ${openCol === 'audiences' ? 'block' : 'hidden md:block'} animate-fadeIn`}>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1.5">For Businesses</span>
                <ul className="space-y-2.5 text-[12px]">
                  <li>
                    <a href="https://ewastekochi.com/business/itad" onClick={(e) => handleLinkClick(e, 'valuator')} className="hover:text-white transition-colors">
                      Corporate ITAD Services
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/business/bulk" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-white transition-colors">
                      High‑Volume Pickup Solutions
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/business/esg" onClick={(e) => handleLinkClick(e, 'esg')} className="hover:text-white transition-colors">
                      ESG & Carbon Reporting Tool
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/business/compliance" onClick={(e) => handleLinkClick(e, 'pillars')} className="hover:text-white transition-colors">
                      Compliance & EPR Advisory
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/business/datacenter" onClick={(e) => handleLinkClick(e, 'verifier')} className="hover:text-white transition-colors">
                      Data Center Decommissioning
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1.5">For Individuals</span>
                <ul className="space-y-2.5 text-[12px]">
                  <li>
                    <a href="https://ewastekochi.com/individuals/pickup" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-white transition-colors">
                      Schedule Mobile Pickup
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/individuals/sell" onClick={(e) => handleLinkClick(e, 'valuator')} className="hover:text-white transition-colors">
                      Sell Old Devices Securely
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/individuals/valuation" onClick={(e) => handleLinkClick(e, 'valuator')} className="hover:text-white transition-colors">
                      Instant Scrap Valuation
                    </a>
                  </li>
                  <li>
                    <a href="https://ewastekochi.com/individuals/certificates" onClick={(e) => handleLinkClick(e, 'verifier')} className="hover:text-white transition-colors">
                      Download Certificates
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Knowledge & Support (SEO Power) */}
          <div className="border-b border-emerald-950/65 md:border-b-0 pb-4 md:pb-0">
            <button 
              onClick={() => toggleColumn('knowledge')}
              className="w-full flex items-center justify-between text-left md:block cursor-pointer focus:outline-none"
            >
              <h4 className="font-sans font-bold text-sm text-[#c8e6b5] uppercase tracking-widest md:mb-4">
                Tech & Support
              </h4>
              <span className="md:hidden">
                {openCol === 'knowledge' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
            <ul className={`space-y-3 pt-3 md:pt-0 text-[12px] ${openCol === 'knowledge' ? 'block' : 'hidden md:block'} animate-fadeIn`}>
              <li>
                <a 
                  href="https://ewastekochi.com/pillars" 
                  onClick={(e) => handleLinkClick(e, 'pillars')} 
                  className="hover:text-white transition-colors font-semibold flex items-center gap-1"
                >
                  <span>📚 20 Knowledge Pillars</span>
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/blog" onClick={(e) => handleLinkClick(e, 'wiki')} className="hover:text-white transition-colors">
                  📝 Technical Blog
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/glossary" onClick={(e) => handleLinkClick(e, 'wiki')} className="hover:text-white transition-colors">
                  🔍 Terms Glossary (156+)
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/compliance" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">
                  ⚖️ Compliance Hub
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/ai" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">
                  🤖 AI Device Sorting Tools
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/faq" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">
                  ❓ FAQ Solutions Archive
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/locations" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">
                  🗺️ Regional Hub Network
                </a>
              </li>
              <li>
                <a href="https://ewastekochi.com/contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">
                  📞 Contact Corporate Office
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal, Social & Network */}
          <div className="space-y-5">
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-[#c8e6b5] uppercase tracking-widest">
                Service Footprint
              </h4>
              <p className="text-xs leading-relaxed text-slate-400 font-mono">
                Active Service Areas:<br />
                Kochi | Kerala | Bengaluru | Chennai | Hyderabad | Mumbai | UAE Operations
              </p>
            </div>

            {/* Social Icons (explicitly absolute and nofollow as mandated) */}
            <div className="space-y-2">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">CONNECT WITH US</span>
              <div className="flex items-center gap-2.5">
                <a href="https://linkedin.com" target="_blank" rel="nofollow noopener noreferrer" aria-label="LinkedIn Profile" className="p-2 rounded bg-slate-950/50 hover:bg-emerald-950/40 text-[#cbdcc2] hover:text-white transition-all border border-emerald-950/60">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="nofollow noopener noreferrer" aria-label="Twitter Feed" className="p-2 rounded bg-slate-950/50 hover:bg-emerald-950/40 text-[#cbdcc2] hover:text-white transition-all border border-emerald-950/60">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="nofollow noopener noreferrer" aria-label="Instagram Profile" className="p-2 rounded bg-slate-950/50 hover:bg-emerald-950/40 text-[#cbdcc2] hover:text-white transition-all border border-emerald-950/60">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="nofollow noopener noreferrer" aria-label="YouTube Channel" className="p-2 rounded bg-slate-950/50 hover:bg-emerald-950/40 text-[#cbdcc2] hover:text-white transition-all border border-emerald-950/60">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Legal Block with Absolute dofollow links */}
            <div className="space-y-1.5 pt-1 text-[11px] text-slate-400 font-mono">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Legal Registry</span>
              <div className="flex flex-col gap-1.5">
                <a href="https://ewastekochi.com/privacy" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="https://ewastekochi.com/terms" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">Terms of Service</a>
                <a href="https://ewastekochi.com/cookies" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="https://ewastekochi.com/refunds" onClick={(e) => handleLinkClick(e, 'policies')} className="hover:text-white transition-colors">Refund Policy</a>
                <a href="https://ewastekochi.com/sitemap" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">Sitemap</a>
                <a href="https://ewastekochi.com/accessibility" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Block */}
        <div className="pt-8 border-t border-emerald-950/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 text-center md:text-left">
          <p>© 2026 EWasteKochi Location Network. All rights reserved.</p>
          <p className="flex items-center gap-1 font-sans text-slate-400">
            <span>Made with</span> <span className="text-red-500">❤️</span> <span>in Kerala</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
