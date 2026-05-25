import React from 'react';
import { MessageSquare, HelpCircle } from 'lucide-react';

export default function FaqCluster() {
  const faqs = [
    {
      q: 'Does standard software formatting satisfy legal compliance under the DPDP Act 2023?',
      a: 'Absolutely not. Hard drive formatting simply clears system indexes but does not overwrite the actual underlying raw transistor cells or magnetic materials. Simple data recovery software can easily retrieve business information. Real compliance requires verified physical shearing or multi-pass digital sanitization (NIST 800-88).'
    },
    {
      q: 'Is EWaste Kochi authorized by state and national environmental agencies?',
      a: 'Yes. We are officially accredited by the Kerala State Pollution Control Board (KSPCB Permit KL/EW/628) and Central Pollution Control Board (CPCB) as a licensed e-waste aggregation and dismantling terminal. All shipments are accompanied by official Form 6 logs.'
    },
    {
      q: 'What local areas in Kerala do your transit trucks service?',
      a: 'Our collection vehicle fleet runs weekly operations covering all major zones: Ernakulam (Infopark Kakkanad, SmartCity, Kalamassery Development Plot, Aluva Eloor corridor), Trivandrum (Technopark), and Kozhikode (Malabar IT Zone).'
    },
    {
      q: 'What occurs to hazardous materials like lithium-ion cell packs?',
      a: 'All incoming lithium-ion batteries are harvested in custom fireproof vaults before transport to specialized vacuum reactors. We operate a zero-pollution recovery chain, segregating toxic materials cleanly from commercial alloy fractions.'
    }
  ];

  return (
    <section id="faq-accordions" className="w-full bg-slate-50 py-14 sm:py-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-left">
        
        <div className="space-y-2 mb-12 text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-bold block">
            PURE CSS STATUTORY ACCORDION
          </span>
          <h2 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
            Frequently Asked Regulatory & Disposal Questions
          </h2>
          <p className="text-sm text-slate-500 font-serif leading-relaxed max-w-2xl mx-auto">
            Zero javascript, fully parsed by search engine spiders for maximum grounding relevance and instant SEO retrieval.
          </p>
        </div>

        {/* CSS-Only Details Summary Blocks */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group bg-white border border-slate-200 rounded-md p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm transition-all"
            >
              <summary className="flex items-center justify-between text-[#1A1A1A] font-serif font-black text-sm sm:text-base list-none focus:outline-none">
                <span className="flex items-center gap-2">
                  <span className="text-[#F27D26] font-mono leading-none">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </span>
                <span className="text-emerald-500 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-serif leading-relaxed space-y-4 animate-fadeIn">
                <p>{faq.a}</p>
                
                {/* Immediate Support WhatsApp Trigger */}
                <div className="pt-2">
                  <a 
                    href="https://wa.me/917500555454?text=I've%20got%20drives%20inquiring%20NIST%20destruction" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-mono font-extrabold py-1.5 px-3 rounded border border-emerald-200 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Speak with Lead compliance Auditor Harish</span>
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
