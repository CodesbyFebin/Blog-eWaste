import React, { useState } from 'react';
import { Maximize2, X, MapPin, Shield, Activity, Calendar, FileText } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  details: string;
  location: string;
  coordinates: string;
  equipment: string;
  clearance: string;
  image: string;
}

export default function EWasteKochiGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'ewaste_sorting',
      title: 'Industrial Sorting & Staging Stacks',
      description: 'Authorized sorting channels processing bulk electronic components in Kalamassery.',
      details: 'This photo displays our highly organized conveyor lines where trained, certified regional technicians sort circuit boards, processors, and electrical pathways by alloy composition to facilitate clean secondary metallurgy loops under the KSPCB license.',
      location: 'Kalamassery Operations Center, Kochi, Kerala',
      coordinates: '10.0402° N, 76.3168° E',
      equipment: 'Anti-Static ESD Conveyor Array Type-IV',
      clearance: 'KSPCB Order No: PCB/CO/2026/F3',
      image: '/src/assets/images/conveyor_sorting_1779731123186.png'
    },
    {
      id: 'drive_shredder',
      title: 'High-Force Mechanical Data Shredder',
      description: 'Advanced physical hard drive and silicon chip fragmentation chamber.',
      details: 'This photo illustrates our secure Kakkanad shredding facility. It features heavy-duty titanium alloy planetary shearing blades designed to slice solid-state storage (SSDs) and magnetic plotters into microscopic sub-2mm metallic fragments, ensuring absolute NIST 800-88 compliance.',
      location: 'Secure Data Facility, Kakkanad, Kochi, Kerala',
      coordinates: '10.0152° N, 76.3638° E',
      equipment: 'Titanium-Bladed Rotary Shearing Crusher 22kW',
      clearance: 'NIST SP 800-88 R1 Purge Verified',
      image: '/src/assets/images/hard_drive_shredder_1779731144742.png'
    },
    {
      id: 'logistics_truck',
      title: 'Infopark Secure Collections & Transport',
      description: 'Branded electric cargo trucks conducting heavy-duty ITAD corporate pickups.',
      details: 'This snapshot shows our custom-branded electric collection trucks picking up decommissioned inventory from multinational IT cores in Infopark Kakkanad. Vehicles maintain active GPS sensors and locked transit containers for zero chain-of-custody leakage.',
      location: 'Infopark Campus, Kakkanad SEC, Kerala',
      coordinates: '10.0114° N, 76.3615° E',
      equipment: 'Zero-Emission 3.5 T Cargo Van with GPS/RFID Tracking',
      clearance: 'CPCB Registered Fleet Authorization',
      image: '/src/assets/images/logistics_truck_1779724624047.png'
    },
    {
      id: 'laptop_audit',
      title: 'Serial Inventory & ITAD Audit Bench',
      description: 'ESD-shielded workshop compiling detailed buyback reports and serial checks.',
      details: 'This photo shows a corporate buyback audit on decommissioned Apple MacBooks and enterprise laptops. Every unit serial number is captured, and hardware condition grades are logged to generate verifiably transparent corporate buyback invoices.',
      location: 'Kalamassery Audit Laboratory, Kochi, Kerala',
      coordinates: '10.0425° N, 76.3211° E',
      equipment: 'Regulated ESD Anti-Static Workspace Panel & Diagnostic Slate',
      clearance: 'ISO 27001 Data Management Certified',
      image: '/src/assets/images/laptop_audit_1779724645393.png'
    }
  ];

  return (
    <section id="ewastekochi-operations-gallery" className="w-full bg-[#FCFCFB] py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Gallery Title & Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 text-left space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-black block">
              REAL-WORLD PHYSICAL CONTEXT
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-serif font-black text-slate-900 tracking-tight leading-none">
              EWasteKochi Real Operational Gallery
            </h2>
            <p className="text-sm font-serif text-slate-600 max-w-2xl leading-relaxed">
              Step inside our certified processing facilities. These verified operational photographs showcase our real-time regional workflows across Kakkanad and Kalamassery.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-2 text-xs font-mono font-bold text-[#F27D26] bg-[#FAF9F6] border border-[#E5E2DA] p-3 rounded">
            <Shield className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>KSPCB Yard Code: KL/EW/628 ACTIVE</span>
          </div>
        </div>

        {/* Operational Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-white border border-[#E5E2DA] p-4 rounded-lg shadow-xs hover:border-[#F27D26] hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Image Wrap */}
                <div className="relative h-60 w-full overflow-hidden rounded bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Coordinates Badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 text-white rounded px-2.5 py-1 text-[9px] font-mono flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#F27D26] shrink-0" />
                    <span>{item.coordinates}</span>
                  </div>

                  {/* Overlap Click Action */}
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-[#F27D26] text-white p-2 rounded-full shadow transition-all scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Inspect Facility Logs"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Info Text */}
                <div className="space-y-1.5 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-[#F27D26] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[9px] font-mono font-bold bg-[#F4F2EE] px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                      SECURE NODE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Bottom button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#58a032] flex items-center gap-1 font-black">
                  <Activity className="h-3.5 w-3.5" /> VERIFIED SITE ACTIVE
                </span>
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 hover:text-[#F27D26] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inspection Logs &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Real Google Maps Geographic Layer */}
        <div className="bg-white border border-[#E5E2DA] p-6 rounded-lg shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 uppercase rounded-sm">
              🛰️ Coordinate Grounding
            </div>
            <h3 className="text-xl font-serif font-black text-slate-900">
              Visit Our Main Industrial Site
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Our central warehouse facility is located inside kalamassery's industrial sector and Kakkanad's special investment zone. Highly accessible for regional corporate audits.
            </p>
            <div className="space-y-2 text-xs font-serif text-slate-700">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#F27D26] shrink-0 mt-0.5" />
                <span>Near Infopark Highway, Kakkanad, Kochi, Kerala, 682030</span>
              </p>
              <p className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Auditing Hours: Monday – Saturday (9:00 AM – 6:00 PM)</span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 relative h-80 rounded overflow-hidden border border-[#E5E2DA] bg-slate-50">
            {/* Real embedded map provided by user */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125744.63273804834!2d76.2447004890625!3d9.973853345731698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873e1e02e1053%3A0xc6baa7e9228b3049!2sKochi%20Secure%20E-Waste%20%26%20Certified%20ITAD%20-%20Data%20Destruction%20Solutions!5e0!3m2!1sen!2sin!4v1779116858396!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative max-w-4xl w-full bg-white text-slate-900 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-full cursor-pointer transition-all shadow-md"
              title="Close Panel"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image Block */}
            <div className="md:w-1/2 relative bg-slate-950 h-64 md:h-auto">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/80 border border-slate-800 text-[#5ce625] text-[9px] font-mono px-2 py-0.5 rounded uppercase">
                Facility Live Check
              </div>
            </div>

            {/* Info Metrics Block */}
            <div className="md:w-1/2 p-6 sm:p-8 text-left space-y-6 overflow-y-auto max-h-[80vh] md:max-h-none flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#F27D26] uppercase">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  <span>KSPCB REGULATORY STAMP OK</span>
                </div>
                
                <h4 className="text-2xl font-serif font-black text-slate-950 tracking-tight">
                  {selectedItem.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
                  {selectedItem.details}
                </p>

                {/* Audit Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-[11px] font-mono">
                    <span className="block text-slate-400 uppercase leading-none mb-1">Equipment Model</span>
                    <strong className="text-slate-800 block leading-tight">{selectedItem.equipment}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-[11px] font-mono">
                    <span className="block text-slate-400 uppercase leading-none mb-1">Specific Geo-GPS</span>
                    <strong className="text-slate-800 block leading-tight">{selectedItem.location}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-[11px] font-mono sm:col-span-2">
                    <span className="block text-slate-400 uppercase leading-none mb-1">Authorization Clearance Seal</span>
                    <strong className="text-[#3b8e19] block leading-tight">{selectedItem.clearance}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Captured: Q2 2026</span>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="bg-slate-900 text-white font-sans font-black uppercase text-[10px] tracking-wider py-2 px-4 rounded hover:bg-[#F27D26] transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
