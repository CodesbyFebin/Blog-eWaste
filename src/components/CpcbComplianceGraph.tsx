import React, { useState } from 'react';
import { Network, HelpCircle, ArrowRight } from 'lucide-react';

interface NodeItem {
  id: string,
  label: string,
  title: string,
  cx: number,
  cy: number,
  desc: string,
  role: string
}

export default function CpcbComplianceGraph() {
  const [activeNodeId, setActiveNodeId] = useState<string>('kochi');

  const nodes: NodeItem[] = [
    {
      id: 'kochi',
      label: 'Kochi Yard Base',
      title: 'Kalamassery Processing Yard Terminal',
      cx: 170,
      cy: 140,
      desc: 'Central authorized separation zone. Cleans and shreds up to 140 tons of toxic motherboards, displays, and silicon annually.',
      role: 'CORE CENTRAL DEPUTY'
    },
    {
      id: 'dpdp',
      label: 'DPDP Rules',
      title: 'Digital Personal Data Protection Act, 2023 Compliance',
      cx: 50,
      cy: 60,
      desc: 'Mandates permanent raw data block wiping before hardware leaves enterprise lockers. Zero risk of identity leakage.',
      role: 'REGULATORY COMPLIANCE'
    },
    {
      id: 'cpcb',
      label: 'CPCB Guidelines',
      title: 'Central Pollution Control Board Transport Licensing',
      cx: 290,
      cy: 60,
      desc: 'Issues certified Form 6 waste transfer manifests logged safely into the national ecological e-waste portal.',
      role: 'GOVERNMENT LICENSING'
    },
    {
      id: 'nist',
      label: 'NIST Standard',
      title: 'NIST SP 800-88 Decommissioning Protocols',
      cx: 60,
      cy: 220,
      desc: 'Defines the standard for high-pass digital wiping or 2mm physical shear for computer drive platters and flash cells.',
      role: 'SANITY & DESTRUCTION BASELINE'
    },
    {
      id: 'lithium',
      label: 'Lithium Safe',
      title: 'Thermal Insulated Battery Reclamation',
      cx: 280,
      cy: 220,
      desc: 'Isolates and harvests raw cobalt, copper, and highly hazardous active lithium paste with zero air discharge.',
      role: 'HAZARDOUS HANDLING'
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <section id="compliance-graph" className="w-full bg-[#0d1310] text-white py-14 sm:py-20 border-b border-[#12221b]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text Description Row */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#5ce625] uppercase font-black block">
              COREGMATIC ENTITY NETWORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-[1.1] text-white">
              AI Semantic Circularity Grid
            </h2>
            <p className="text-sm text-slate-300 font-serif leading-relaxed">
              We interconnect legal mandates, technical sanitization guidelines, and localized recovery hubs into a unified semantic compliance structure. Hover over nodes to verify connections.
            </p>

            {/* Dynamic Selected Details Card */}
            <div className="p-5 bg-slate-950 border border-emerald-950 rounded-lg space-y-3.5 animate-fadeIn min-h-[160px]">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold bg-slate-900 border border-emerald-900 text-[#5ce625] px-2 py-0.5 rounded uppercase">
                  {activeNode.role}
                </span>
                <span className="text-slate-500 font-serif text-[10px] uppercase">Connection Signal</span>
              </div>
              <h4 className="text-base font-serif font-black text-white">
                {activeNode.title}
              </h4>
              <p className="text-xs text-slate-400 font-serif leading-relaxed">
                {activeNode.desc}
              </p>
            </div>
          </div>

          {/* Connected SVG Network (Hover/Click Interactive) */}
          <div className="lg:col-span-7 flex justify-center relative bg-slate-950/40 p-6 rounded-lg border border-slate-900 overflow-hidden">
            
            {/* Ambient radar circular lines behind SVG */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/10 rounded-full animate-pulse pointer-events-none" />

            <svg viewBox="0 0 340 280" className="w-full max-w-[400px] relative z-10 select-none">
              
              {/* Connector lines to central yard */}
              {nodes.map(n => {
                if (n.id === 'kochi') return null;
                const centerNode = nodes.find(item => item.id === 'kochi')!;
                const isActive = activeNodeId === n.id || activeNodeId === 'kochi';
                return (
                  <line 
                    key={`line-${n.id}`}
                    x1={n.cx}
                    y1={n.cy}
                    x2={centerNode.cx}
                    y2={centerNode.cy}
                    stroke={isActive ? '#5ce625' : '#143122'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? '4,4' : 'none'}
                    className="transition-colors duration-300"
                  />
                );
              })}

              {/* Node Circles */}
              {nodes.map(n => {
                const isCenter = n.id === 'kochi';
                const isHovered = activeNodeId === n.id;
                return (
                  <g 
                    key={n.id}
                    onMouseEnter={() => setActiveNodeId(n.id)}
                    className="cursor-pointer group"
                  >
                    {/* Ring highlight */}
                    <circle 
                      cx={n.cx} 
                      cy={n.cy} 
                      r={isCenter ? 26 : 18} 
                      fill="transparent" 
                      stroke={isHovered ? '#5ce625' : 'transparent'}
                      strokeWidth={1.5}
                      className="transition-colors duration-200"
                    />
                    
                    {/* Core solid circle */}
                    <circle 
                      cx={n.cx} 
                      cy={n.cy} 
                      r={isCenter ? 18 : 12} 
                      fill={isCenter ? '#0d1310' : isHovered ? '#10b981' : '#143122'} 
                      stroke={isCenter ? '#5ce625' : '#12221b'}
                      strokeWidth={2}
                      className="transition-colors duration-200"
                    />

                    {/* Short labels */}
                    <text 
                      x={n.cx} 
                      y={n.cy + (isCenter ? 32 : 24)} 
                      textAnchor="middle" 
                      fill={isHovered ? '#fff' : '#889890'} 
                      fontSize="9" 
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      className="font-mono transition-colors duration-200"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
