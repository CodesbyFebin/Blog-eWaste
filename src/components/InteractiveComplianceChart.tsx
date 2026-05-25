import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { Leaf, Award, BarChart3, TrendingUp } from 'lucide-react';

const REGIONAL_TREND_DATA = [
  { month: 'Jan 2026', diversionKg: 1250, co2OffsetMT: 4.8, corporateClients: 14 },
  { month: 'Feb 2026', diversionKg: 1840, co2OffsetMT: 6.9, corporateClients: 19 },
  { month: 'Mar 2026', diversionKg: 2950, co2OffsetMT: 11.2, corporateClients: 28 },
  { month: 'Apr 2026', diversionKg: 3800, co2OffsetMT: 14.4, corporateClients: 36 },
  { month: 'May 2026', diversionKg: 5200, co2OffsetMT: 19.8, corporateClients: 49 },
  { month: 'Jun 2026 (Proj)', diversionKg: 6400, co2OffsetMT: 24.5, corporateClients: 58 },
];

export default function InteractiveComplianceChart() {
  const [metricType, setMetricType] = useState<'diversion' | 'co2'>('diversion');
  const [chartStyle, setChartStyle] = useState<'area' | 'bar'>('area');

  // Calculate aggregates
  const totalDiversion = REGIONAL_TREND_DATA.reduce((acc, curr) => acc + curr.diversionKg, 0);
  const totalCo2 = REGIONAL_TREND_DATA.reduce((acc, curr) => acc + curr.co2OffsetMT, 0);
  const avgClients = Math.round(REGIONAL_TREND_DATA.reduce((acc, curr) => acc + curr.corporateClients, 0) / REGIONAL_TREND_DATA.length);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 text-white p-3.5 rounded-lg shadow-xl font-sans text-xs space-y-1.5">
          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">{label}</p>
          {metricType === 'diversion' ? (
            <p className="text-emerald-400">
              <span className="font-mono">Diversion:</span> <strong>{payload[0].value.toLocaleString()} kg</strong>
            </p>
          ) : (
            <p className="text-[#F27D26]">
              <span className="font-mono">Carbon Offset:</span> <strong>{payload[0].value} MT CO₂e</strong>
            </p>
          )}
          <p className="text-slate-400 text-[10px] font-mono">
            Active Corporate nodes: {payload[0].payload.corporateClients} ITAD hubs
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#E2E2E2] p-6 sm:p-8 rounded-xl shadow-xs space-y-6">
      
      {/* Header section with toggles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E2E2E2]">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] font-bold inline-flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Live Compliance Data Visualizer
          </span>
          <h4 className="text-xl font-serif font-black text-slate-900 mt-1">Kochi Regional Compliance Metrics</h4>
          <p className="text-xs text-slate-500 font-serif">Interactive audit trend indicators showing monthly ecological diversion statistics from corporate ITAD zones inside Ernakulam.</p>
        </div>

        {/* Switches */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          {/* Metric Selector */}
          <div className="inline-flex bg-slate-100 p-1 rounded-md border border-slate-200">
            <button
              onClick={() => setMetricType('diversion')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded transition-colors cursor-pointer ${
                metricType === 'diversion' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diversion (kg)
            </button>
            <button
              onClick={() => setMetricType('co2')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded transition-colors cursor-pointer ${
                metricType === 'co2' 
                  ? 'bg-[#F27D26] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CO₂ Offset (MT)
            </button>
          </div>

          {/* Chart Style Selector */}
          <div className="inline-flex bg-slate-100 p-1 rounded-md border border-slate-200">
            <button
              onClick={() => setChartStyle('area')}
              className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                chartStyle === 'area' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-400'
              }`}
              title="Area Trend"
            >
              📈
            </button>
            <button
              onClick={() => setChartStyle('bar')}
              className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                chartStyle === 'bar' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-400'
              }`}
              title="Bar Chart"
            >
              📊
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold tracking-wider">Total diverted e-waste</span>
            <p className="text-xl font-serif font-black text-slate-900 mt-0.5">{(totalDiversion / 1000).toFixed(2)} Metric Tons</p>
          </div>
          <Leaf className="h-6 w-6 text-emerald-600 shrink-0" />
        </div>

        <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-amber-800 uppercase font-bold tracking-wider">Carbon Offset Growth</span>
            <p className="text-xl font-serif font-black text-slate-900 mt-0.5">{totalCo2.toFixed(1)} MT CO₂e</p>
          </div>
          <Award className="h-6 w-6 text-amber-600 shrink-0" />
        </div>

        <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-600 uppercase font-bold tracking-wider">Monthly Enterprise Audits</span>
            <p className="text-xl font-serif font-black text-slate-900 mt-0.5">{avgClients} Corporate Hubs</p>
          </div>
          <BarChart3 className="h-6 w-6 text-slate-600 shrink-0" />
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartStyle === 'area' ? (
            <AreaChart data={REGIONAL_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={metricType === 'diversion' ? '#059669' : '#f97316'} 
                    stopOpacity={0.2}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={metricType === 'diversion' ? '#059669' : '#f97316'} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DA" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                stroke="#E5E2DA"
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                stroke="#E5E2DA"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={metricType === 'diversion' ? 'diversionKg' : 'co2OffsetMT'} 
                stroke={metricType === 'diversion' ? '#059669' : '#ea580c'} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorMetric)" 
              />
            </AreaChart>
          ) : (
            <BarChart data={REGIONAL_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DA" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                stroke="#E5E2DA"
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                stroke="#E5E2DA"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
              <Bar 
                name={metricType === 'diversion' ? 'E-Waste Diversion (kg)' : 'CO₂ Offset (MT)'}
                dataKey={metricType === 'diversion' ? 'diversionKg' : 'co2OffsetMT'} 
                fill={metricType === 'diversion' ? '#10b981' : '#f97316'} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart explanation footer notes */}
      <div className="text-center text-[10px] font-mono text-slate-400 uppercase tracking-wide border-t border-[#E2E2E2] pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>Verified by KSPCB License KL/EW/628</span>
        <span className="text-emerald-600 font-bold">100% Verifiable Closed-Loop Logistics</span>
      </div>

    </div>
  );
}
