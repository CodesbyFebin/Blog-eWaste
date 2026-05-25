import React from 'react';
import { Star, Shield, Award, Calendar, CheckCircle } from 'lucide-react';

export default function TrustProof() {
  return (
    <section id="trust-proof" className="w-full bg-slate-50 border-y border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-8 mb-10">
          <div className="lg:col-span-8 space-y-2 text-left">
            <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-extrabold block">
              STATE & NATIONAL SECURITY CLEARANCE
            </span>
            <h2 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
              State-Level Compliance & Physical Certifications
            </h2>
            <p className="text-sm text-slate-600 font-serif max-w-2xl leading-relaxed">
              We operate under heavy government supervision, certified by the Kerala State Pollution Control Board (KSPCB) and Central Pollution Control Board (CPCB) for clean hardware retrieval and recycling.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3 shrink-0">
            {/* Google Rating Card */}
            <div className="bg-white border border-slate-200 p-4 rounded-md shadow-sm flex items-center gap-3">
              <div className="text-left font-serif">
                <span className="block text-[#1A1A1A] font-black text-lg leading-none">Google Rated</span>
                <span className="text-[10px] text-orange-600 font-mono mt-1.5 block">4.9/5 ★ (2,800+ Verified)</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span className="text-[9px] text-slate-400 font-mono">Real Business Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Certificates wall on left, Verified Officer on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Certificate Wall Gallery Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-md shadow-sm flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 uppercase rounded-sm">
                Facility Audit
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900">
                Official Authorization & Audit Wall
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Every operating permit is officially logged at our main facility. We maintain pristine environmental records across air quality monitors, hazardous chemical storage layouts, and material handling safeguards.
              </p>
            </div>

            {/* Simulated certificate gallery element */}
            <div className="relative h-48 bg-slate-950 mt-6 rounded overflow-hidden group">
              <img 
                src="/src/assets/images/certificate_wall_1779719373775.png"
                alt="Framed Environmental Licenses Hanging on the Main Office Wall"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-500"
                width={800}
                height={400}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[9px]">
                <span>KALAMASSERY REGIONAL AUDIT SHIELD</span>
                <span className="text-[#5ce625]">APPROVED ◆ 2026 ACTIVE STATUS</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-4 text-[9px] font-mono text-slate-500">
              <div className="p-2 border border-slate-100 rounded bg-slate-50/50">
                <span className="block font-bold text-slate-700">ISO 9001:2015</span>
                <span>Quality Systems</span>
              </div>
              <div className="p-2 border border-slate-100 rounded bg-slate-50/50">
                <span className="block font-bold text-slate-700">ISO 14001:2015</span>
                <span>Eco Safeguards</span>
              </div>
              <div className="p-2 border border-slate-100 rounded bg-slate-50/50">
                <span className="block font-bold text-slate-700">ISO 45001:2018</span>
                <span>Workplace Hygiene</span>
              </div>
            </div>
          </div>

          {/* Compliance Officer Certification Details */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-md shadow-sm flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-mono font-bold px-2 py-0.5 uppercase rounded-sm">
                Certified Legal Custody
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900">
                Lead Environmental Officer Sign-Off
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Corporate liability is severe under India's E-Waste Management Rules. All asset collection reports and destruction receipts are individually authorized by our certified officers, eliminating data leakage exposures.
              </p>
            </div>

            {/* Officer Profile Badge Row */}
            <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-md flex items-center gap-4">
              <img 
                src="/src/assets/images/compliance_officer_1779719432941.png"
                alt="Portrait of Certified Environmental Compliance Officer"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border border-slate-300 shadow-sm"
                width={80}
                height={80}
                loading="lazy"
              />
              <div className="font-serif">
                <h4 className="text-sm font-black text-slate-950">Harish Kumar V.</h4>
                <p className="text-[10px] text-emerald-700 font-mono font-bold uppercase tracking-wider mt-0.5">
                  Senior Controller & KSPCB Liaison
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  M.Tech Environmental Eng. ◆ NIT Calicut
                </p>
              </div>
            </div>

            <div className="space-y-2 text-[11px] font-serif text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Issuance of Form-6 manifest documents matching standard state ledgers.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>NIST-compliant hardware sanitization logs matched securely.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
