import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, 
  MapPin, 
  Star, 
  Navigation, 
  Phone, 
  Clock, 
  Check, 
  ExternalLink,
  Map,
  Layers,
  Search,
  Compass
} from 'lucide-react';

interface TrustStatsGmbProps {
  onBookPickup: () => void;
}

export default function TrustStatsGmb({ onBookPickup }: TrustStatsGmbProps) {
  const [selectedPin, setSelectedPin] = useState<string>('kochi-main');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load map when visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Load 300px before reaching the component
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const locations = [
    {
      id: 'kochi-main',
      name: 'EWasteKochi Kakkanad Hub',
      address: 'Plot 48, CSEZ PO, Kakkanad, Ernakulam, Kerala 682037',
      phone: '+91 7500555454',
      hours: 'Open Today: 9:00 AM – 7:30 PM',
      rating: 4.9,
      reviews: 2840,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15714.249219491763!2d76.3475825!3d10.013531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e104192b1%3A0x67de760df936ef01!2sKakkanad%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1716491910000!5m2!1sen!2sin',
      coordinates: '10.0135° N, 76.3476° E',
      color: '#5ce625', // Emerald
      bgClass: 'bg-emerald-500',
      borderClass: 'border-emerald-500',
      textClass: 'text-emerald-400',
      tag: 'MALABAR HUB'
    },
    {
      id: 'trivandrum-yard',
      name: 'Trivandrum City Collection Yard',
      address: 'Industrial Estate, Pappanamcode, Thiruvananthapuram, Kerala 695018',
      phone: '+91 7500555454',
      hours: 'Open Today: 9:00 AM – 6:00 PM',
      rating: 4.8,
      reviews: 430,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31580.463287019804!2d76.9743621!3d8.4791332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05a53be2cb7bef%3A0xe104fc81aae8d14b!2sPappanamcode%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1716492020000!5m2!1sen!2sin',
      coordinates: '8.4791° N, 76.9744° E',
      color: '#F27D26', // Orange
      bgClass: 'bg-amber-500',
      borderClass: 'border-amber-500',
      textClass: 'text-amber-400',
      tag: 'SOUTH ZONE'
    },
    {
      id: 'kozhikode-hub',
      name: 'Kozhikode Malabar Regional Hub',
      address: 'Byepass Road, Pappinisseri, Kozhikode, Malabar, Kerala 673007',
      phone: '+91 7500555454',
      hours: 'Open Today: 9:00 AM – 7:00 PM',
      rating: 4.9,
      reviews: 860,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31320.12351239564!2d75.7804021!3d11.2587532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593bf453efb3%3A0xc3af751d3b3ee3b2!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1716492130000!5m2!1sen!2sin',
      coordinates: '11.2588° N, 75.7804° E',
      color: '#06b6d4', // Cyan
      bgClass: 'bg-cyan-500',
      borderClass: 'border-cyan-500',
      textClass: 'text-[#06b6d4]',
      tag: 'MALABAR ZONE'
    }
  ];

  const activeLoc = locations.find(l => l.id === selectedPin) || locations[0];

  // Deep-link optimized to fire local GPS navigation maps apps instantly
  const handlePlanVisit = () => {
    const addressEncoded = encodeURIComponent(activeLoc.address);
    // Universal trigger for turn-by-turn route
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressEncoded}&travelmode=driving`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div ref={containerRef} className="w-full space-y-12" id="trust-stats-gmb">
      
      {/* 1. HORIZONTAL STATS BAR (MATCHES REFERENCE IMAGE CHANNELS) */}
      <div className="w-full bg-[#030e06] border border-emerald-900/60 rounded-2xl py-6 px-6 sm:px-10 flex flex-col xl:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* Abstract glowing graphics inside */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        
        {/* Core numbers metrics list */}
        <div className="flex flex-wrap items-center justify-center md:justify-around xl:justify-start gap-y-6 gap-x-12 flex-grow">
          {/* Stat 1 */}
          <div className="text-center xl:text-left min-w-[110px]">
            <span className="block font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none mb-2">
              215+
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 uppercase tracking-widest leading-none">
              Collection Points
            </span>
          </div>

          {/* Stat 2 */}
          <div className="text-center xl:text-left min-w-[110px]">
            <span className="block font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none mb-2">
              32,450+
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 uppercase tracking-widest leading-none">
              Pickups Completed
            </span>
          </div>

          {/* Stat 3 */}
          <div className="text-center xl:text-left min-w-[110px]">
            <span className="block font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none mb-2">
              1,250+
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 uppercase tracking-widest leading-none">
              Tons Processed
            </span>
          </div>

          {/* Stat 4 */}
          <div className="text-center xl:text-left min-w-[110px]">
            <span className="block font-sans font-black text-3xl sm:text-4xl text-[#5ce625] tracking-tight leading-none mb-2">
              98.7%
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 uppercase tracking-widest leading-none">
              Recovery Rate
            </span>
          </div>

          {/* Stat 5 */}
          <div className="text-center xl:text-left min-w-[110px]">
            <span className="block font-sans font-black text-3xl sm:text-4xl text-[#5ce625] tracking-tight leading-none mb-2">
              100%
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 uppercase tracking-widest leading-none">
              Zero Landfill
            </span>
          </div>
        </div>

        {/* Action Buttons right side */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full xl:w-auto justify-center text-xs">
          <button
            onClick={handlePlanVisit}
            className="w-full sm:w-auto text-center inline-flex items-center justify-center bg-emerald-950/40 hover:bg-emerald-900/50 text-[#5ce625] border border-emerald-500/30 text-[11px] font-sans font-bold uppercase tracking-wider py-3 px-5 rounded-lg transition-all cursor-pointer whitespace-nowrap gap-1.5"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Plan My Visit</span>
          </button>
          <button
            onClick={onBookPickup}
            className="w-full sm:w-auto text-center bg-[#5ce625] hover:bg-[#4dd31a] text-slate-950 text-[11px] font-sans font-bold uppercase tracking-wider py-3 px-5 rounded-lg shadow-lg shadow-emerald-500/10 transition-all cursor-pointer whitespace-nowrap"
          >
            Book Collection
          </button>
        </div>

      </div>

      {/* 2. INTERACTIVE GMB GOOGLE MY BUSINESS CARD & MAP SEGMENT */}
      <div className="bg-[#030904] border border-emerald-950 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left column: Authentic GMB Store Profile Details Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-emerald-950 bg-gradient-to-b from-[#030c05] to-transparent text-left">
          
          <div className="space-y-4">
            {/* Store title & Google Review Badge */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#5ce625] uppercase font-bold block">
                  AUTHORIZED PHYSICAL ACCESS YARD
                </span>
                {/* Visual marker badge on header */}
                <span className={`h-2.5 w-2.5 rounded-full inline-block ${activeLoc.bgClass} shadow-md animate-pulse`} />
              </div>
              <h3 className="text-xl font-sans font-black text-white flex items-center gap-2">
                {activeLoc.name}
              </h3>
              
              {/* Google ratings block */}
              <div className="flex items-center gap-2 pt-1">
                <span className="bg-[#EFA31D] text-black text-[11px] font-black font-sans px-1.5 py-0.5 rounded leading-none flex items-center gap-1">
                  Google
                </span>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {activeLoc.rating} ({activeLoc.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Address details list */}
            <div className="space-y-3.5 pt-4 border-t border-emerald-950 text-slate-300 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#F27D26] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Full Address:</span>
                  <p className="text-slate-400 mt-1 leading-relaxed">{activeLoc.address}</p>
                  <span className="text-[10px] font-mono text-slate-500 mt-1.5 block">GPS Coordinates: {activeLoc.coordinates}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Direct Phone:</span>
                  <a href={`tel:${activeLoc.phone.replace(/\s+/g, '')}`} className="text-[#5ce625] font-bold hover:underline block mt-0.5">
                    {activeLoc.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Operating Hours:</span>
                  <span className="text-slate-450 block mt-0.5">{activeLoc.hours}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Sunday Yard Access: Appointment only</p>
                </div>
              </div>
            </div>

            {/* Selector hub switch tags */}
            <div className="pt-4 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold block">
                Select Active Hub Base
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {locations.map((loc) => {
                  let badgeColor = "bg-emerald-500";
                  if (loc.id === "trivandrum-yard") badgeColor = "bg-amber-500";
                  if (loc.id === "kozhikode-hub") badgeColor = "bg-cyan-500";

                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedPin(loc.id)}
                      className={`p-2 rounded-lg border font-semibold font-sans transition-all cursor-pointer relative ${
                        selectedPin === loc.id
                          ? 'border-[#5ce625] bg-emerald-950/40 text-white font-bold'
                          : 'border-emerald-950 text-slate-400 hover:bg-slate-900/30'
                      }`}
                    >
                      {/* Color-coded dot inside tab */}
                      <span className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${badgeColor}`} />
                      <span className="block text-[11px]">{loc.id.split('-')[0].toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Color coded physical legend for user */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-slate-400 text-[10px] space-y-1.5 font-mono">
            <span className="text-[9px] font-bold text-slate-300 block uppercase tracking-wider">Statewide Yard Legend</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Kochi (Central)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Trivandrum (South)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                <span>Kozhikode (North)</span>
              </span>
            </div>
          </div>

          {/* Secondary buttons */}
          <div className="flex gap-2 pt-2 border-t border-emerald-950 w-full text-xs">
            <button
              onClick={handlePlanVisit}
              className="flex-grow text-center bg-emerald-950/60 hover:bg-emerald-900/40 border border-[#5ce625]/20 text-slate-200 py-2.5 rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Navigation className="h-3 w-3 text-[#5ce625]" />
              <span>Plan My Visit</span>
            </button>
            <button
              onClick={onBookPickup}
              className="flex-grow bg-[#5ce625] hover:bg-[#4dd31a] text-slate-950 py-2.5 rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="h-3 w-3" />
              <span>Yard Dropoff</span>
            </button>
          </div>

        </div>

        {/* Right column: Beautiful responsive iframe Google map with dynamic lazy-loading state */}
        <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto min-h-[350px] relative bg-emerald-950/10">
          {mapLoaded ? (
            <iframe
              src={activeLoc.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(110deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={false}
              referrerPolicy="no-referrer"
              title={`${activeLoc.name} Google Map Embed`}
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 font-mono text-xs space-y-2">
              <div className="h-8 w-8 rounded-full border border-emerald-500 border-t-transparent animate-spin" />
              <span>Scrolling near maps load system...</span>
            </div>
          )}

          {/* Floating watermarked map controller tag on top right */}
          <div className="absolute top-4 right-4 bg-[#030d05]/95 border border-emerald-900/60 rounded-lg p-2.5 text-slate-300 shadow-2xl z-10 text-[10px] space-y-1 font-mono text-left max-w-[180px]">
            <div className="flex items-center gap-1 font-bold text-white uppercase text-[9px] text-[#5ce625]">
              <Layers className="h-3 w-3" />
              <span>Statewide Hub Layer</span>
            </div>
            <p className="leading-snug text-slate-400 text-[9px]">
              Active marker zone: <span className={activeLoc.textClass}>{activeLoc.tag}</span>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
