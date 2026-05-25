import React from 'react';
import { MapPin, Globe, Compass, HardDrive } from 'lucide-react';

export default function Footprint() {
  return (
    <section id="regional-footprint" className="w-full bg-slate-950 text-white py-14 sm:py-20 overflow-hidden border-b border-emerald-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Coords Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#5ce625] uppercase font-bold block">
                GEOGRAPHIC LOGISTICS PORT
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-[1.1]">
                Kalamassery Central processing Hub & Coordinates
              </h2>
              <p className="text-sm text-slate-400 font-serif leading-relaxed">
                Our main aggregation yard is located inside the Kalamassery Development Plot—the logistical center of gravity for circular electronics recovery in Ernakulam.
              </p>
            </div>

            {/* Geographical Passport details */}
            <div className="p-5 bg-slate-900 border border-emerald-950 rounded-md font-mono space-y-3 shadow-md text-xs">
              <div className="flex items-center gap-2 border-b border-emerald-950/50 pb-2 text-[#5ce625]">
                <Compass className="h-4 w-4" />
                <span className="font-bold tracking-widest">FACILITY DATASHEET</span>
              </div>
              <p className="flex justify-between">
                <span className="text-slate-500">KSPCB ID:</span>
                <span className="text-white font-bold">PCB/EKM/CO/639/26</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Registered Coordinates:</span>
                <span className="text-white font-bold">10.0543° N, 76.3242° E</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">HQ Gate Address:</span>
                <span className="text-white text-right font-bold max-w-[200px]">Plot 14A, Kalamassery Dev Plot, Ernakulam, 683104</span>
              </p>
            </div>
          </div>

          {/* Right Gate photo & outline Kerala map container */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
            
            {/* Gate Entrance Photo Card */}
            <div className="sm:col-span-7 bg-slate-900 border border-emerald-950 rounded-lg overflow-hidden flex flex-col justify-between">
              <div className="relative h-44 bg-slate-950">
                <img 
                  src="/src/assets/images/kalamassery_yard_1779731101268.png"
                  alt="Main Gate Entrance of Kalamassery E-Waste Recycling Yard"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75"
                  width={600}
                  height={300}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 bg-[#5ce625] text-slate-950 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase">
                  Terminal 1 Gate Entrance
                </span>
              </div>
              <div className="p-5 text-left space-y-2">
                <h4 className="text-sm font-serif font-black text-white">
                  Kochi Primary Consolidation Site
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal font-serif">
                  Licensed facility layout comprising clean chemical treatment, double-pass degaussing vaults, and physical crushing terminals.
                </p>
              </div>
            </div>

            {/* Hand-Crafted Mini Kerala Outline SVG Card */}
            <div className="sm:col-span-5 bg-slate-900 border border-emerald-950 rounded-lg p-5 flex flex-col justify-between items-center relative">
              
              {/* Decorative compass rose */}
              <div className="absolute top-4 right-4 text-emerald-950 pointer-events-none">
                <Globe className="h-20 w-20 opacity-20" />
              </div>

              <div className="w-full text-left space-y-1">
                <span className="text-[9px] font-mono text-[#5ce625] font-bold block uppercase tracking-wider">coverage scope</span>
                <span className="text-xs font-serif text-white font-bold block">Kerala Logistics Route Map</span>
              </div>

              {/* Slate/green vector sketch of Kerala */}
              <div className="my-3 relative w-full h-40 flex items-center justify-center">
                <svg viewBox="0 0 100 180" className="w-[80px] h-[160px] text-emerald-900 stroke-emerald-500/30 font-bold" fill="none" strokeWidth="1.5">
                  {/* Styled curve reflecting outline of Kerala coastline */}
                  <path d="M20,10 C25,35 32,55 38,80 C44,105 56,125 58,150 C59,160 55,165 62,175" stroke="#5ce625" strokeWidth="2.5" className="transition-all" />
                  
                  {/* Pulsing Coordinates Dots for Kochi, Trivandrum, Kozhikode */}
                  {/* Kozhikode (North) */}
                  <circle cx="28" cy="45" r="4" fill="#5ce625" className="animate-ping" />
                  <circle cx="28" cy="45" r="3" fill="#10b981" />
                  
                  {/* Kochi (Central Yard) */}
                  <circle cx="39" cy="85" r="5" fill="#5ce625" className="animate-ping" />
                  <circle cx="39" cy="85" r="4.5" fill="#5ce625" />
                  
                  {/* Trivandrum (South) */}
                  <circle cx="56" cy="144" r="4" fill="#5ce625" className="animate-ping" />
                  <circle cx="56" cy="144" r="3" fill="#10b981" />
                </svg>

                {/* Floating dynamic marker metadata */}
                <div className="absolute top-5 left-1 font-mono text-[7px] text-[#5ce625]">KOZHIKODE</div>
                <div className="absolute top-[75px] right-2 font-mono text-[8px] text-[#5ce625] font-bold bg-slate-950/80 px-1 rounded">KOCHI (FACILITY)</div>
                <div className="absolute bottom-5 left-1 font-mono text-[7px] text-[#5ce625]">TRIVANDRUM</div>
              </div>

              <div className="w-full font-mono text-[9px] text-emerald-500 border-t border-emerald-950/40 pt-2 text-center">
                100% REGIONAL PICKUP COVERAGE
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
