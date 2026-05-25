import React, { useState } from 'react';
import { Calendar, Truck, Check, HelpCircle } from 'lucide-react';

export default function CorporateBooking() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    weight: 'under-100',
    region: 'Ernakulam'
  });

  const [simulatedReceipt, setSimulatedReceipt] = useState<{
    code: string;
    date: string;
    weightEst: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // Generate random tracking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `EW-KLA-2026-${randomNum}`;

    // Get tomorrow's date for pickup window
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 1);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setSimulatedReceipt({
      code: trackingCode,
      date: formattedDate,
      weightEst: formData.weight === 'under-100' ? 'Under 100 kg' : formData.weight === '100-500' ? '100 kg - 500 kg' : '500+ kg Enterprise'
    });
  };

  return (
    <section id="quick-pickup-form" className="w-full bg-[#fafaf9] py-14 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-extrabold block">
              INSTANT COMPLIANCE BOOKING
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-[1.1]">
              Secure Free Corporate Pickup Scheduler
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-serif leading-relaxed">
              Register corporate IT assets, obsolete desktop terminals, servers, and lithium components for secure transport directly to our Kalamassery processing yard.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex gap-3">
                <span className="h-6 w-6 mt-0.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold shrink-0">✓</span>
                <div className="font-serif">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Double-Operator Teams</h4>
                  <p className="text-[11px] text-slate-500">Every truck deployment features a licensed technical supervisor to catalog and verify equipment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="h-6 w-6 mt-0.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold shrink-0">✓</span>
                <div className="font-serif">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Sealed Dual-Key Safes</h4>
                  <p className="text-[11px] text-slate-500">Drives, laptops, and storage keys are placed in locked fireproof cabinets during regional transit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form/result column */}
          <div className="lg:col-span-7">
            {simulatedReceipt ? (
              <div className="bg-white border-2 border-emerald-500 p-6 sm:p-8 rounded-lg shadow-md text-left space-y-5 animate-fadeIn">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-black text-slate-900">
                      Compliance Manifest Initiated
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block">
                      SEC kspcb-manifest-registered-2026
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-700 bg-slate-50 p-4 rounded border border-slate-200">
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-400">Tracking Code:</span>
                    <strong className="text-slate-950">{simulatedReceipt.code}</strong>
                  </p>
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-400">Client Contact:</span>
                    <span className="text-slate-950 font-bold">{formData.name} ({formData.company || 'Private Agent'})</span>
                  </p>
                  <p className="flex justify-between border-b border-dashed border-slate-200 pb-2">
                    <span className="text-slate-400">Scheduled Transit Window:</span>
                    <span className="text-slate-950 font-bold">{simulatedReceipt.date}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Est. Cargo Net Weight:</span>
                    <span className="text-slate-950 font-bold">{simulatedReceipt.weightEst}</span>
                  </p>
                </div>

                <p className="text-[11px] text-slate-500 font-serif leading-relaxed italic">
                  *Our logistics team will contact you within 2 hours to confirm building coordinates and secure security gates pass permissions.
                </p>

                <button 
                  onClick={() => setSimulatedReceipt(null)}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white font-mono text-xs uppercase tracking-wider rounded font-bold cursor-pointer transition-colors"
                >
                  Schedule Another Collection
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 p-6 sm:p-10 rounded-lg shadow-sm text-left space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul Nair"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-900 font-serif"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Company / Business</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Infopark Startup Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-900 font-serif"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Enterprise Mail address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-900 font-serif"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Primary phone number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 989XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-900 font-serif"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Estimated Weight Inventory</label>
                    <select 
                      value={formData.weight}
                      onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded bg-[#fafafa] font-mono focus:outline-none focus:border-slate-900"
                    >
                      <option value="under-100">Residential Scrap / Below 100 kg</option>
                      <option value="100-500">Corporate Batch / 100 kg - 500 kg</option>
                      <option value="500-plus">Heavy Enterprise / Over 500 kg</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 block">Your Collection District</label>
                    <select 
                      value={formData.region}
                      onChange={(e) => setFormData(p => ({ ...p, region: e.target.value }))}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded bg-[#fafafa] font-mono focus:outline-none focus:border-slate-900"
                    >
                      <option value="Ernakulam">Kochi / Ernakulam Zone</option>
                      <option value="Trivandrum">Trivandrum Zone</option>
                      <option value="Kozhikode">Kozhikode Zone</option>
                      <option value="Other">Other Area in Kerala</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-serif text-slate-500 leading-snug">
                  🛡️ By scheduling, you approve that all assets sent comply under Section 6 guidelines and do not contain biological, chemical or radioactive refuse.
                </div>

                <button 
                  type="submit"
                  className="w-full py-4.5 bg-[#5ce625] hover:bg-[#4acd1a] text-slate-950 font-sans font-black uppercase text-xs tracking-wider rounded-md shadow-md transition-transform active:scale-98 cursor-pointer text-center inline-flex items-center justify-center gap-2"
                >
                  <Truck className="h-4 w-4" />
                  <span>Register Certified Collection Pickup</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
