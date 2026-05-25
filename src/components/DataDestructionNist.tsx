import React from 'react';
import { ShieldAlert, Cpu, Eye, CheckCircle } from 'lucide-react';

export default function DataDestructionNist() {
  return (
    <section id="data-destruction" className="w-full bg-white py-14 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Shredder close-up photo left */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-[340px] sm:h-[420px] bg-slate-950 rounded-lg overflow-hidden border border-slate-200 shadow-md">
              <img 
                src="/src/assets/images/hard_drive_shredder_1779731144742.png"
                alt="Close-up Detail of the Double-Shaft Solid State Drive Mechanical Shredder Plates"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
                width={800}
                height={600}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 font-serif">
                <span className="text-[#5ce625] font-mono text-[10px] uppercase font-bold tracking-widest block font-bold leading-none">
                  MECHANICAL DISINTEGRATION GEARS
                </span>
                <p className="text-xs text-slate-300 leading-snug">
                  Rotating carbon-alloy shears fragment motherboard units, solid state microcircuits, and drive plates into raw 2mm residues under real-time video surveillance.
                </p>
              </div>
            </div>
          </div>

          {/* Secure details text right */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-bold block">
              PHASED SANITIZATION STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-[1.1]">
              NIST 800-88 Compliant Physical Media Destruction
            </h2>
            <p className="text-sm font-serif text-slate-600 leading-relaxed">
              Standard operating system formatting is legally invalid under corporate data privacy regulations. Our strict media sanitization custody chain wipes, degausses, and mechanically fragments arrays to guarantee zero-leakage security.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex gap-3">
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-2 rounded shrink-0 h-9 w-9 flex items-center justify-center">
                  <ShieldAlert className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-black text-slate-900 leading-snug">
                    Step 1: Raw Wiping & Degaussing
                  </h4>
                  <p className="text-xs text-slate-500 font-serif leading-relaxed mt-1">
                    Every magnetic drive platter is passed through our extreme electromagnetic force degausser, rendering any leftover data completely forensic-proof.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-2 rounded shrink-0 h-9 w-9 flex items-center justify-center">
                  <Cpu className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-black text-slate-900 leading-snug">
                    Step 2: 2mm Physical Shearing
                  </h4>
                  <p className="text-xs text-slate-500 font-serif leading-relaxed mt-1">
                    Flash logic matrices and solid-state chip cells are run through double-shaft shredding plates until they are fractured below standard forensic scale.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-2 rounded shrink-0 h-9 w-9 flex items-center justify-center">
                  <Eye className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-black text-slate-900 leading-snug">
                    Step 3: Signed Cryptographic Certificates
                  </h4>
                  <p className="text-xs text-slate-500 font-serif leading-relaxed mt-1">
                    Clients receive concrete cryptographic tokens tracking every device serial number processed alongside active custody sign-off reports.
                  </p>
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
