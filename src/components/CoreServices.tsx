import React from 'react';
import { ShieldCheck, Truck, Recycle, Lock, ArrowRight } from 'lucide-react';

interface CoreServicesProps {
  onNavigateToView: (view: 'home' | 'wiki' | 'valuator' | 'verifier' | 'esg' | 'pillars' | 'seo') => void;
  onScrollToPickupForm: () => void;
}

export default function CoreServices({ onNavigateToView, onScrollToPickupForm }: CoreServicesProps) {
  const services = [
    {
      title: 'Enterprise ITAD & Buyback',
      desc: 'Corporate decommissioned laptop, server, and phone valuation audits. We offset hardware upgrade costs with safe, certified buybacks matching true asset lifecycles.',
      image: '/src/assets/images/laptop_audit_1779724645393.png',
      badge: 'ITAD & VALUATION',
      icon: ShieldCheck,
      action: () => onNavigateToView('valuator')
    },
    {
      title: 'Certified Data Destruction & Shredding',
      desc: 'Absolute security guaranteed. High-force electromagnetic degaussing followed by 2mm physical shearing/shredding of solid-state-chips (SSDs) and magnetic plotters, certified NIST 800-88.',
      image: '/src/assets/images/hard_drive_shredder_1779731144742.png',
      badge: 'NIST 800-88 DATA SHREDDING',
      icon: Lock,
      action: () => onNavigateToView('verifier')
    },
    {
      title: 'Free Logistics & E-Waste Pickup',
      desc: 'Double-operator logistics trucks servicing corporate parks, tech zones, and educational hubs throughout Kochi, Ernakulam, Trivandrum, and Kozhikode weekly.',
      image: '/src/assets/images/logistics_truck_1779724624047.png',
      badge: 'KSPCB LICENSED LOGISTICS',
      icon: Truck,
      action: onScrollToPickupForm
    },
    {
      title: 'Certified Industrial Sorting',
      desc: 'Eco-authorized sorting lines isolating dangerous materials, rare metals, copper and structural aluminum out of high-density circuits securely across Kalamassery.',
      image: '/src/assets/images/conveyor_sorting_1779731123186.png',
      badge: 'AUTHORIZED FACILITY',
      icon: Recycle,
      action: () => onNavigateToView('pillars')
    }
  ];

  return (
    <section id="core-services" className="w-full bg-white py-14 sm:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Title Container */}
        <div className="space-y-2 mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-extrabold block">
            CORE DISPOSITION SERVICE DEK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
            Certified Logistics & Technical Recovery Services
          </h2>
          <p className="text-sm text-slate-500 font-serif leading-relaxed">
            Eliminating e-waste ecological liabilities with highly structured workflows tailored for SaaS providers, hardware manufacturers, and regional businesses.
          </p>
        </div>

        {/* 2x2 Bento Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 bg-white hover:border-[#5ce625] transition-all duration-300 rounded-lg overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img 
                    src={svc.image}
                    alt={svc.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-[1.01] transition-transform duration-500"
                    width={600}
                    height={300}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Badges */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 text-[#5ce625] text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    {svc.badge}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-800">
                        <IconComponent className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <button 
                    onClick={svc.action}
                    className="w-full py-3 px-4 border border-slate-200 text-slate-900 font-sans font-black text-xs uppercase tracking-wider rounded bg-slate-50 group-hover:bg-[#5ce625] group-hover:text-slate-950 group-hover:border-[#5ce625] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Activate Service Portal</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
