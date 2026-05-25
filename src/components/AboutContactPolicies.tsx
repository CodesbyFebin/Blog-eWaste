import React, { useState } from 'react';
import { 
  Shield, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Building, 
  Users, 
  CheckCircle, 
  Download, 
  FileText, 
  RefreshCw, 
  Lock,
  ArrowRight,
  Send,
  LockKeyhole,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { AUTHORS } from '../data/knowledge';

// ==================== 1. ABOUT PAGE COMPONENT ====================
export function AboutPage() {
  const milestones = [
    { year: '2022', title: 'Founding & Charter', desc: 'Established amidst the announcement of India\'s strict new E-Waste Management Rules 2022 to assist the Kakkanad tech sprawl.' },
    { year: '2023', title: 'KSPCB Authorization', desc: 'Granted formal State Board authorization (No. KL/EW/628) as a licensed safe-recycling facility.' },
    { year: '2024', title: 'Enterprise Hub Launch', desc: 'Opened dedicated hardware data-sanitization bays equipped with mechanical shredders in Kalamassery.' },
    { year: '2026', title: 'E-Waste Eco Park Partnership', desc: 'Integrated direct logical pipelines for the pioneering state Eco Park initiative, ensuring zero-landfill results.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      {/* Editorial Header */}
      <div className="border-b border-[#E2E2E2] pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F27D26] font-bold block mb-2">Sustainable Metallurgy & Corporate Trust</span>
        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">Kerala\'s Authorized Electronic Lifecycle Specialist</h2>
        <p className="text-base text-slate-600 font-serif max-w-3xl mt-4 leading-relaxed">
          Operating under Kerala State Pollution Control Board license <strong>KL/EW/628</strong>, EWasteKochi leads the regional transition towards the Circular Economy using NIST 800-88 sanitization guidelines and zero-landfill physical recycling.
        </p>
      </div>

      {/* Grid: Vision & Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#FCFBF8] border border-[#E9E6DC] rounded-2xl p-8 space-y-4">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-800 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-black text-[#1A1A1A] text-lg">Rigorous Data Erasure</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
            Data security is our primary operational baseline. We do not just scrap devices; we physically obliterate storage matrices and execute military-grade multi-pass sector overrides before materials are processed.
          </p>
        </div>

        <div className="bg-[#FCFBF8] border border-[#E9E6DC] rounded-2xl p-8 space-y-4">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-800 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <RefreshCw className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-black text-[#1A1A1A] text-lg">Circular Resource Recovery</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
            Every old enterprise laptop decommissioned recovers on average 120g of high-grade copper, 0.18g of pure gold, and recycled aluminum casing, circumventing intensive raw metal mining.
          </p>
        </div>

        <div className="bg-[#FCFBF8] border border-[#E9E6DC] rounded-2xl p-8 space-y-4">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-800 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <Building className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-black text-[#1A1A1A] text-lg">Eco Park Clean Compliance</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
            As part of our commitment to regional pollution mitigation, we channel residue through state certified E-Waste Eco Park facilities, matching standard environmental targets.
          </p>
        </div>
      </div>

      {/* Trust & Certifications */}
      <div className="bg-white border border-[#E2E2E2] rounded-2xl p-6 sm:p-10 space-y-8">
        <div>
          <h3 className="text-2xl font-serif font-black text-[#1A1A1A]">Regional Certifications & Audits</h3>
          <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">Our processes are checked and re-validated annually by multiple third-party panels.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs">
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
            <strong className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">KSPCB Authorised</strong>
            <span className="text-slate-600">License KL/EW/628 for hazardous processing</span>
          </div>
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
            <strong className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">ISO 14001:2015</strong>
            <span className="text-slate-600">Environmental quality standard certification</span>
          </div>
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
            <strong className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">NIST SP 800-88 R1</strong>
            <span className="text-slate-600">The supreme gold standard for media destruction</span>
          </div>
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
            <strong className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">DPDP Compliant</strong>
            <span className="text-slate-600">Full statutory safety on subscriber data</span>
          </div>
        </div>
      </div>

      {/* Leadership Profiles */}
      <div className="space-y-8">
        <div className="border-b border-[#E2E2E2] pb-3">
          <h3 className="text-2xl font-serif font-black text-[#1A1A1A]">Staff Auditors & Leadership</h3>
          <p className="text-xs sm:text-sm text-slate-500 font-serif">Deep domain experts steering clean technological disposition across Kerala.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(AUTHORS).map((author) => (
            <div key={author.id} className="bg-[#FCFBF8] border border-[#E9E6DC] rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-[#E9E6DC] shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-left">
                <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-emerald-500/10 font-bold">
                  {author.role.split(',')[1] || 'Staff Expert'}
                </span>
                <h4 className="font-serif font-black text-slate-900 text-lg">{author.name}</h4>
                <p className="text-xs font-mono text-slate-400 font-bold">{author.role}</p>
                <p className="text-xs text-slate-600 font-serif leading-relaxed pt-1">{author.bio}</p>
                <a 
                  href={`https://${author.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#F27D26] hover:underline font-bold pt-1"
                >
                  View Verified Audit Bio <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <div className="border-b border-[#E2E2E2] pb-3 text-left">
          <h3 className="text-2xl font-serif font-black text-[#1A1A1A]">Historical Milestones</h3>
          <p className="text-xs sm:text-sm text-slate-500 font-serif">Mapping our journey of building the regional ITAD compliance structure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="bg-white border border-[#E2E2E2] rounded-xl p-5 relative overflow-hidden space-y-3">
              <div className="absolute top-0 right-0 p-4 font-mono font-black text-3xl text-emerald-100/40 select-none">
                {milestone.year}
              </div>
              <span className="font-mono text-xs text-[#F27D26] font-bold block">{milestone.year}</span>
              <h4 className="font-serif font-black text-slate-900 text-sm">{milestone.title}</h4>
              <p className="text-xs text-slate-600 font-serif leading-relaxed pt-1">{milestone.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== 2. CONTACT PAGE COMPONENT ====================
export function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    devicesCount: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate real database submit or post
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', devicesCount: '', message: '' });
    }, 5000);
  };

  const offices = [
    {
      name: 'Kakkanad Corporate HQ',
      address: 'Expressway Tower C, Adjacent to Infopark Phase-1, Kakkanad, Ernakulam, Kerala - 682030',
      phone: '+91 7500555454',
      mail: 'enterprise@ewastekochi.com',
      hours: 'Mon - Sat: 9:00 AM - 6:30 PM'
    },
    {
      name: 'Kalamassery Sanitization Bay',
      address: 'Industrial Plot 12B, HMT Colony Path, Kalamassery, Kochi, Kerala - 683104',
      phone: '+91 7500555454',
      mail: 'logistics@ewastekochi.com',
      hours: 'Mon - Fri: 8:00 AM - 8:00 PM'
    },
    {
      name: 'Trivandrum Logistics Point',
      address: 'Technopark Phase-2 High-Road, Kazhakoottam, Thiruvananthapuram, Kerala - 695581',
      phone: '+91 471 270 0300',
      mail: 'tvm@ewastekochi.com',
      hours: 'Mon - Fri: 9:00 AM - 5:30 PM'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      {/* Title block */}
      <div className="lg:col-span-12 border-b border-[#E2E2E2] pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F27D26] font-bold block mb-2">Instant Pickup Coordination</span>
        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">Initiate Disposal Audit Manifest</h2>
        <p className="text-base text-slate-600 font-serif max-w-3xl mt-4 leading-relaxed">
          Need a reliable certification layout? Submit an inventory manifest below, and our authorized environmental logistics squad will draft a certified quote within 2 operational hours.
        </p>
      </div>

      {/* Left: Contact Form Column */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-[#EBNB] rounded-2xl p-6 sm:p-8 text-left shadow-sm">
          <h3 className="text-xl font-serif font-black text-slate-900 mb-6">Manifest Request Form</h3>
          
          {formSubmitted ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-50 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4"
            >
              <div className="h-12 w-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-black text-emerald-900 text-lg">Inquiry Recorded Successfully</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed max-w-md mx-auto">
                Thank you. Your e-waste manifest allocation request has been routed to our Lead ITAD Specialist. An ISO security auditor will reach out to <strong>{formData.email}</strong> shortly.
              </p>
              <span className="block font-mono text-[10px] text-slate-400 font-bold">Transaction Reference: REQ-{Math.round(100000 + Math.random() * 899999)}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="block text-slate-700 font-medium font-sans">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Anand Krishnan"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="block text-slate-700 font-medium font-sans">Business Email</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. anand@company.com"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-phone" className="block text-slate-700 font-medium font-sans">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 94460 XXXXX"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-company" className="block text-slate-700 font-medium font-sans">Company & Campus</label>
                  <input 
                    type="text" 
                    id="contact-company" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. SaaS Hub, Infopark Kakkanad"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-units" className="block text-slate-700 font-medium font-sans">Approximate Deviceweight / Count</label>
                <input 
                  type="text" 
                  id="contact-units" 
                  name="devicesCount"
                  required
                  value={formData.devicesCount}
                  onChange={handleInputChange}
                  placeholder="e.g. 15 laptops and 5 redundant back-up batteries"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="block text-slate-700 font-medium font-sans">Asset Manifest / Sanitization Directives</label>
                <textarea 
                  id="contact-message" 
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detail any special parameters, e.g. SSD physical crushing, compliance certificate requirements..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-600 transition-all font-sans text-xs resize-y"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-sans font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shadow-emerald-200 uppercase tracking-widest mt-4"
              >
                <Send className="h-4 w-4" />
                <span>Submit Disposal Manifest</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right: Regional Hub locations Column */}
      <div className="lg:col-span-5 space-y-6 text-left">
        <div className="bg-[#FCFBF8] border border-[#E9E6DC] p-6 rounded-2xl space-y-6">
          <h3 className="font-serif font-black text-[#1A1A1A] text-lg">Kerala Location Network</h3>
          <p className="text-xs text-slate-500 font-serif leading-relaxed">
            Our centers are strategically positioned next to major Kerala infrastructure hubs to execute same-day collections and immediate chain-of-custody handoffs.
          </p>

          <div className="space-y-6">
            {offices.map((office, idx) => (
              <div key={idx} className="space-y-2 text-xs border-b border-dashed border-[#E9E6DC] pb-4 last:border-0 last:pb-0">
                <h4 className="font-serif font-black text-slate-900 flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4 text-[#F27D26]" />
                  <span>{office.name}</span>
                </h4>
                <p className="text-slate-600 font-serif pl-5.5 leading-relaxed">{office.address}</p>
                <div className="pl-5.5 space-y-0.5 text-slate-500 font-mono text-[11px] leading-relaxed">
                  <div>📞 Phone: <span className="text-slate-700 font-sans font-bold">{office.phone}</span></div>
                  <div>✉️ Email: <span className="text-[#F27D26] hover:underline cursor-pointer">{office.mail}</span></div>
                  <div>⏱️ Hours: <span>{office.hours}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== 3. POLICIES PAGE COMPONENT ====================
export function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'dpdp' | 'chatbot' | 'refund'>('privacy');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Title */}
      <div className="border-b border-[#E2E2E2] pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F27D26] font-bold block mb-2">Statutory Security & Legal Rules</span>
        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">Corporate Policy Desk</h2>
        <p className="text-base text-slate-600 font-serif max-w-3xl mt-4 leading-relaxed">
          Statutory transparency regarding data processor mandates, circular storage retention, security controls, and digital assistants compliance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E2E2E2] pb-1 bg-white p-1 rounded-xl shadow-xs border">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'privacy'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          Privacy & ITAD Policy
        </button>
        <button
          onClick={() => setActiveTab('dpdp')}
          className={`px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'dpdp'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          DPDP Act Compliance
        </button>
        <button
          onClick={() => setActiveTab('chatbot')}
          className={`px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'chatbot'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          AI Chatbot Policy
        </button>
        <button
          onClick={() => setActiveTab('refund')}
          className={`px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'refund'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          Refund & Valuation Terms
        </button>
      </div>

      {/* Long Form Policy Content */}
      <div className="bg-white border border-[#E2E2E2] rounded-2xl p-6 sm:p-10 text-left font-serif text-sm leading-relaxed text-slate-700 space-y-6">
        {activeTab === 'privacy' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
              <LockKeyhole className="h-6 w-6 text-emerald-700" />
              <span>Privacy & ITAD Security Policy</span>
            </h3>
            <span className="block font-mono text-[10px] text-slate-400 font-bold mb-4">LAST AMENDED: MAY 23, 2026</span>
            
            <p>
              EWasteKochi operates as an authorized data processor under strict Indian IT Security guidelines and the E-Waste Management Rules 2022. This policy details how our logistics team, technicians, and shredders handle retired client media.
            </p>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">1. Scope of Media Ownership and Liabilities</h4>
            <p>
              By commissioning an asset drop-off or scheduling a corporate campus collection manifest, the client certifies that they retain full ownership of the storage media, SSD flash cards, back-up arrays, and motherboards. Upon signing the physical collection receipt, the liability for secure processing transfers to EWasteKochi.
            </p>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">2. Data Sanitization Routines (NIST 800-88 R1 Guidelines)</h4>
            <p>
              To satisfy institutional audits, all personal and proprietary information residing on storage units experiences one of two processes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Logical Erasure (Software Sanitization):</strong> Safe multi-pass zero-pattern block overrides. Unreadable sector mapping confirms a successful erasure trace before casing partition drops. If any block fails overwrite verification, the card undergoes immediate hardware mutilation.</li>
              <li><strong>Physical Destruction (Mechanical Shredding):</strong> Solid state units (NVMe, eMMC, SSD modules) are transferred under guard to our Kalamassery bays and passed through custom heavy machinery, rendering elements into particle shards under 2mm.</li>
            </ul>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">3. Certificate of Destruction Manifests</h4>
            <p>
              Every processed security tier is linked to a uniquely tracked regional digital certificate codex (e.g. <code>COD-KOCHI-XXXX</code>). These documents provide full technician sign-offs, serial inventories, and destruction timestamps.
            </p>
          </motion.div>
        )}

        {activeTab === 'dpdp' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald-700" />
              <span>India DPDP Act 2023 Compliance</span>
            </h3>
            <span className="block font-mono text-[10px] text-slate-400 font-bold mb-4">COMPLIANCE CODE: DPDP-SEC-11-KERALA</span>
            
            <p>
              Under Article 11 (Right to Erasure) of the Digital Personal Data Protection (DPDP) Act 2023, data fiduciaries face severe statutory penalties—up to ₹250 Crores—for failure to trace, secure, and erase digital user profiles from active and retired storage media.
            </p>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">1. Right to Erasure & Complete Obliteration</h4>
            <p>
              Indian entities must execute verifiable deletion of obsolete or decommissioned customer databases when the primary purpose of collection is achieved or consent is retracted. EWasteKochi provides a robust legal safeguard for fiduciaries, ensuring physical and logical obsolescence of enterprise hard components.
            </p>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">2. Audit Traceability and State Inspections</h4>
            <p>
              EWasteKochi\'s verification system allows regulators, compliance panels, and corporate legal panels to query the validation state of any certificate on our public gateway. These records document the dates, methods, and parameters of erasure, conforming to environmental and digital privacy statutes.
            </p>
          </motion.div>
        )}

        {activeTab === 'chatbot' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-emerald-700" />
              <span>AI Chatbot & Generative Search Policy</span>
            </h3>
            <span className="block font-mono text-[10px] text-slate-400 font-bold mb-4">SYSTEM NOTIFICATION PROMPT ID: GENAI-KSPCB-V1</span>
            
            <p>
              EWasteKochi is dedicated to utilizing modern technology to make recycling and ITAD queries seamless. Our interactive interfaces utilize Gemini Large Language Models initialized under backend safeguards to answer pricing, compliance, and procedural questions.
            </p>

            <h4 className="font-serif font-black text-[#1A1A1A] text-base mt-6">1. AI Model Limitations and Dynamic Generation Fallbacks</h4>
            <p>
              Our automated systems provide general answers based on up-to-date regional KSPCB parameters and local guidelines. However, dynamic AI generations may occasionally encounter resource throttling or search quota exhaustion (e.g. rate limit error 429). When a quota limit occurs:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>The system returns an absolute metadata-grounded offline fallback, keeping the client interface uninterrupted.</li>
              <li>Calculators and compliance templates continue to perform 100% correct calculations locally in the browser or on the Express server.</li>
              <li>A safe alert notifies the user that cached data has been served, preventing crash loops.</li>
            </ul>

            <h4 className="font-serif font-black text-[#1A1A1A] text-base mt-6">2. Zero Sensitive Data Logging Policy</h4>
            <p>
              Our chatbot does not store personal user prompts or business API credentials in long-term databases. We respect your security: no inputs containing client passwords, device models coupled with private names, or legal structures are utilized for model training.
            </p>
          </motion.div>
        )}

        {activeTab === 'refund' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
              <Award className="h-6 w-6 text-emerald-700" />
              <span>Refund, Recyclability & Valuation Terms</span>
            </h3>
            <span className="block font-mono text-[10px] text-slate-400 font-bold mb-4">TERMS CODE: ITAD-VALUATION-2026-KL</span>
            
            <p>
              Device evaluations and payout quotes generated by our online Marketplace valuer represent highly accurate regional market indices for working hardware.
            </p>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">1. Valuation Authenticity & Physical Inspection</h4>
            <p>
              The digital price generated online serves as a pre-audit appraisal block. Our on-site technician will inspect the physical unit—verifying chip integrity, motherboard state, screen blemishes, and power efficiency coefficients. Payouts match certified conditions:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Grade A:</strong> Scratch-free chassis, efficient battery life (&gt;80%), functional keyboard, power brick included. Receives 100% of the online valuation.</li>
              <li><strong>Grade B:</strong> Normal wear, faint keyboard blemishes, minor chassis dents/frictional rub. Receives 80% of value.</li>
              <li><strong>Grade C:</strong> Heavy cosmetic scratches, localized screen marks, under-average power reserve. Receives 50% of value.</li>
            </ul>

            <h4 className="font-serif font-black text-slate-900 text-base mt-6">2. Non-Refundability of Physical Dispositions</h4>
            <p>
              Once storage cards pass physical shredders or heavy chemical metal separation machines, <strong>recovery is physically impossible</strong>. No claims for materials retrieval or file recoveries can be processed once the final collection receipt is signed.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
