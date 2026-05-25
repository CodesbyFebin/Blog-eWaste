import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck, Flame, Info } from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  type: 'alert' | 'update' | 'warning' | 'legislation';
  timestamp: string;
  source: string;
}

export default function NewsTicker() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicker() {
      try {
        const res = await fetch('/api/news-ticker');
        const data = await res.json();
        if (data && data.alerts) {
          setAlerts(data.alerts);
        }
      } catch (e) {
        console.error('Failed to load news ticker alerts', e);
      } finally {
        setLoading(false);
      }
    }
    fetchTicker();
  }, []);

  useEffect(() => {
    if (alerts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [alerts]);

  if (loading || alerts.length === 0) {
    return (
      <div className="bg-emerald-950 text-emerald-300 font-mono text-[11px] py-1 px-4 flex justify-between items-center border-b border-emerald-900 leading-none">
        <span>Initializing KSPCB RSS feed tracker...</span>
      </div>
    );
  }

  const activeAlert = alerts[currentIndex];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-3 w-3 text-red-400 shrink-0" />;
      case 'warning':
        return <Flame className="h-3 w-3 text-amber-400 shrink-0" />;
      case 'legislation':
        return <ShieldCheck className="h-3 w-3 text-blue-400 shrink-0" />;
      default:
        return <Info className="h-3 w-3 text-emerald-400 shrink-0" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'alert':
        return <span className="bg-red-900/60 text-red-200 border border-red-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">KSPCB Mandate</span>;
      case 'warning':
        return <span className="bg-amber-900/60 text-amber-200 border border-amber-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Geographic Warning</span>;
      case 'legislation':
        return <span className="bg-blue-900/60 text-blue-200 border border-blue-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Statutory Act</span>;
      default:
        return <span className="bg-emerald-900/60 text-emerald-200 border border-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider font-mono">E-Waste Metric</span>;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-2 px-4 shadow-inner border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left Side Label */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-[#F27D26] shrink-0">
          <TrendingUp className="h-3.5 w-3.5 animate-pulse text-[#F27D26]" />
          <span>KSPCB & Environmental Ticker RSS</span>
        </div>

        {/* Sliding alert block */}
        <div className="flex-1 w-full overflow-hidden flex items-center justify-start gap-4 px-4">
          <div className="flex items-center gap-2.5 max-w-full truncate animate-fade-in py-0.5">
            {getTypeIcon(activeAlert.type)}
            {getTypeBadge(activeAlert.type)}
            <span className="font-sans font-medium hover:text-[#F27D26] transition-colors truncate leading-tight">
              {activeAlert.title}
            </span>
          </div>
        </div>

        {/* Right Info Label */}
        <div className="font-mono text-[9px] text-slate-400 shrink-0 hidden md:flex items-center gap-1.5">
          <span>Source: {activeAlert.source}</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
