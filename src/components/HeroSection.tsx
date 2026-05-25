import React from 'react';
import { 
  Truck, 
  ChevronRight,
  ShieldCheck,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface HeroSectionProps {
  onRequestPickup: () => void;
  onNavigateToView: (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo') => void;
}

export default function HeroSection({ onRequestPickup, onNavigateToView }: HeroSectionProps) {
  return (
    <div className="w-full relative h-[480px] sm:h-[580px] bg-slate-950 text-white overflow-hidden border-b border-emerald-950 flex items-center">
      
      {/* Background Image of Kalamassery Facility */}
      <img 
        src="/src/assets/images/kalamassery_yard_1779731101268.png"
        alt="Kalamassery E-Waste Recycling Facility Yard"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover opacity-35 object-center"
        width={1920}
        height={1080}
        loading="eager"
      />
      
      {/* Dark overlay gradient to make deep typography pop */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#020703] via-transparent to-transparent opacity-90" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 text-left">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Top Pill Chip */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-md text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-wider shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ce625] animate-ping" />
            <span>KSPCB AUTHORIZED OPERATIONS ◆ SEC kl/ew/628</span>
          </div>

          {/* Massive Heading */}
          <div className="space-y-3">
            <h1 className="text-3.5xl sm:text-5.5xl lg:text-6.5xl font-serif font-black tracking-tight leading-[1.08] text-white">
              Secure + Certified <br/>
              <span className="text-[#5ce625]">E-Waste Recycling</span> <br className="hidden sm:inline" />
              Across Kerala
            </h1>
          </div>

          {/* Sub-description with beautiful bullet points */}
          <p className="text-sm sm:text-lg text-slate-300 font-serif leading-relaxed max-w-2xl">
            Providing absolute zero-landfill electronic asset disposition, certified NIST 800-88 data destruction, and guaranteed compliance under India's DPDP and E-Waste rules.
          </p>

          {/* Action Buttons Block */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            {/* Button Left - Direct Pickup Schedule */}
            <button
              onClick={onRequestPickup}
              className="group flex items-center justify-center gap-2 bg-[#5ce625] hover:bg-[#4bce1b] text-slate-950 font-sans font-black uppercase text-xs tracking-wider py-4 px-7 rounded-md transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] cursor-pointer"
            >
              <Truck className="h-4 w-4" />
              <span>Book Free Pickup</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Button Right - Live AI Evaluator */}
            <button
              onClick={() => onNavigateToView('valuator')}
              className="group flex items-center justify-center gap-2 bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-500 px-7 py-4 rounded-md transition-all duration-300 hover:bg-slate-900 cursor-pointer"
            >
              <span className="text-xs text-slate-100 font-sans font-black uppercase tracking-wider">Explore Buyback Valuation</span>
              <ArrowUpRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-emerald-950/40 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>NIST 800-88 Compliant Data Deletion</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>100% Secure Chain of Custody</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
