import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Is EWasteKochi formally authorized by the Kerala government?",
    answer: "Yes, absolutely. EWasteKochi operates under Kerala State Pollution Control Board (KSPCB) Authorization No. KL/EW/628. We are a formally registered, fully compliant processing coordinator conforming to the Central Pollution Control Board (CPCB) E-Waste (Management) Rules 2022."
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 impact ITAD in Kochi?",
    answer: "The DPDP Act 2023 commands that organizations safely delete and purge all user-related personal databases under right-to-erasure guidelines once their operational intent is completed. Storing obsolete customer files on redundant hard drives or cold server storage poses massive compliance risks, with heavy penalties up to ₹250 Crores. We supply signed NIST 800-88 certified deletion documents to secure your enterprise safety."
  },
  {
    question: "What physical and logical data destruction systems do you utilize?",
    answer: "We support absolute sanitization through two core solutions: (1) Logical software erasure satisfying the NIST SP 800-88 R1 Purge standard, performing full sector-by-sector overrides; and (2) Physical destruction at our Kalamassery industrial bay, utilizing mechanical shredders to grind SSD, NVMe, and memory chips down to elements under 2mm."
  },
  {
    question: "Are pickup logistics free for companies in Kakkanad Infopark and SmartCity?",
    answer: "Yes. Corporate asset collections are 100% free of charge within the Kochi Infopark, SmartCity, Kalamassery industrial grid, and all Ernakulam municipal structures for any inventory containing 10 or more corporate laptop units. We issue standard signed Collection Manifests on-site."
  },
  {
    question: "Do you supply certificates of destruction for KSPCB compliance files?",
    answer: "Yes, every batch we process generates a cryptographic Certificate of Destruction containing serial inventories and physical grading details. These documents are logged instantly onto our digital validation gateway and are fully compliant for corporate ESG audits and government environmental inspections."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Structured Data FAQ Schema JSON-LD Configuration
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((item, idx) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq-section" className="bg-[#FCFBF8] border border-[#E9E6DC] rounded-3xl p-6 sm:p-10 lg:p-16 my-16 text-left">
      {/* Schema Injection in Head */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-500/10 text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Search Optimised FAQ Index</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-[#1A1A1A] leading-tight">
              Statutory Compliance & Logistics Queries
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
              We help Kerala businesses resolve legal operational queries regarding CPCB recycling routines, physical data sanitization, the DPDP Act 2023, and corporate green ITAD buyback pipelines.
            </p>
          </div>

          <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-[#F27D26] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="text-slate-800 font-bold uppercase tracking-wide block font-sans">Need Custom Regulatory Opinions?</strong>
              <p className="text-slate-500 font-serif leading-relaxed">
                Our staff chief technical auditor can verify specialized compliance rosters for complex data centers.
              </p>
              <button 
                onClick={() => {
                  const picker = document.getElementById('price-estimator-widget') || document.getElementById('contact-name');
                  picker?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-[#F27D26] hover:underline font-mono font-bold mt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                Inquire on Custom Audits &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white border-[#E5E2DA] shadow-xs' 
                    : 'bg-white/50 border-[#E9E6DC] hover:bg-white hover:border-[#E5E2DA]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-black text-slate-900 hover:text-[#F27D26] transition-colors focus:outline-none cursor-pointer text-sm sm:text-base"
                >
                  <span className="pr-4 leading-normal">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#F27D26] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-605 font-serif font-medium leading-relaxed border-t border-dashed border-[#E9E6DC]">
                        <p className="text-slate-600 leading-relaxed font-serif">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
