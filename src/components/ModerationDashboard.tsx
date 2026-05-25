import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Check, 
  X, 
  Trash2, 
  AlertTriangle, 
  Ban, 
  Search, 
  Settings, 
  Lock, 
  MessageCircle,
  Clock,
  Filter,
  CheckCircle2,
  FileCheck2,
  ListRestart
} from 'lucide-react';

interface CommentType {
  id: string;
  articleSlug: string;
  author: string;
  content: string;
  timestamp: string;
  approved: boolean;
  flagged?: boolean;
  reportsCount?: number;
  reportReasons?: string[];
}

interface ModerationDashboardProps {
  comments: CommentType[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onClearReports: (id: string) => void;
  onAddBannedWord: (word: string) => void;
  onRemoveBannedWord: (word: string) => void;
  bannedWords: string[];
  currentUser: { email: string; name: string; isAdmin: boolean } | null;
  onOpenAuth: () => void;
}

export default function ModerationDashboard({
  comments,
  onApprove,
  onReject,
  onDelete,
  onClearReports,
  onAddBannedWord,
  onRemoveBannedWord,
  bannedWords,
  currentUser,
  onOpenAuth
}: ModerationDashboardProps) {
  const [filterType, setFilterType] = useState<'reported' | 'pending' | 'approved' | 'all'>('reported');
  const [searchTerm, setSearchTerm] = useState('');
  const [newBannedWord, setNewBannedWord] = useState('');
  const [auditLog, setAuditLog] = useState<{ action: string; time: string; target: string }[]>([]);

  // Local effect log triggers
  useEffect(() => {
    // Generate a beautiful initial log of recent verification audits
    setAuditLog([
      { action: 'Cleaned general spam terms pattern', time: '10 mins ago', target: 'Auto-Filter' },
      { action: 'Approved technical asset review on Kochi blog', time: '2 hours ago', target: 'Kalyan Mall Yard Audit' },
      { action: 'Flagged suspicious payload in comment submission', time: 'Yesterday', target: 'Sys-Shield' }
    ]);
  }, []);

  const handleBannedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannedWord.trim()) return;
    onAddBannedWord(newBannedWord.trim().toLowerCase());
    setAuditLog(prev => [
      { action: `Added banned term "${newBannedWord.trim()}"`, time: 'Just now', target: 'Global Filter' },
      ...prev
    ]);
    setNewBannedWord('');
  };

  const handleActionClick = (actionName: string, id: string, targetAuthor: string) => {
    setAuditLog(prev => [
      { action: actionName, time: 'Just now', target: `User Comment (${targetAuthor})` },
      ...prev
    ]);
  };

  const filteredComments = comments.filter((comment) => {
    // Search
    const matchesSearch = 
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.articleSlug.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filter type
    if (filterType === 'reported') return (comment.reportsCount && comment.reportsCount > 0);
    if (filterType === 'pending') return !comment.approved && (!comment.reportsCount || comment.reportsCount === 0);
    if (filterType === 'approved') return comment.approved;
    return true; // all
  });

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div className="bg-[#030c05] border border-emerald-950 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12 shadow-xl">
        <div className="h-16 w-16 bg-red-950/40 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-red-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-sans font-black text-white">Administrator Credentials Required</h3>
        <p className="text-sm text-slate-400 mt-2.5 max-w-md mx-auto">
          This system contains authorized CPCB/KSPCB certification approvals, content reports logs, and physical asset database structures.
        </p>

        <div className="mt-8 space-y-4 max-w-xs mx-auto">
          <button
            onClick={onOpenAuth}
            className="w-full bg-[#5ce625] hover:bg-[#4dd31a] text-slate-950 font-sans font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Authenticate Authorized Auditor
          </button>
          
          <div className="bg-slate-900/40 border border-emerald-900/30 rounded-xl p-3 text-left">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider text-center mb-1">
              Sample Admin Session
            </span>
            <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
              <p>Email: <span className="text-[#5ce625]">admin@ewastekochi.com</span></p>
              <p>Password: <span className="text-slate-200">admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#020703] border border-emerald-950/80 rounded-2xl p-6 lg:p-10 text-slate-200 space-y-8 shadow-2xl">
      
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-emerald-950/80 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5ce625] animate-pulse" />
            <span className="text-xs font-mono uppercase text-[#5ce625] tracking-widest font-bold">STATE RECYCLING DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-white">
            Lead Auditor Moderation Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review reported forum messages, approve pending articles, manage banned vocabulary, and track active compliance logs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-xl p-3 text-right">
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Active Auditor</span>
            <span className="block font-sans font-bold text-xs text-white leading-none">{currentUser.name}</span>
            <span className="block text-[10px] text-emerald-400 font-mono mt-1">State Level Privilege</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT - COMMENTS LIST & FILTERS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filters Bar & Tools */}
          <div className="bg-[#040f06] border border-emerald-950 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { type: 'reported', label: 'Reported Comments', count: comments.filter(c => c.reportsCount && c.reportsCount > 0).length },
                { type: 'pending', label: 'Pending Admin Audit', count: comments.filter(c => !c.approved && (!c.reportsCount || c.reportsCount === 0)).length },
                { type: 'approved', label: 'Approved Live', count: comments.filter(c => c.approved).length },
                { type: 'all', label: 'All Listings', count: comments.length }
              ].map((btn) => (
                <button
                  key={btn.type}
                  onClick={() => setFilterType(btn.type as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterType === btn.type
                      ? 'bg-[#5ce625] text-[#041a04] shadow-sm font-bold'
                      : 'bg-emerald-950/30 hover:bg-emerald-900/40 text-slate-300'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`px-1 rounded-full text-[10px] ${
                    filterType === btn.type ? 'bg-[#041a04]/20 text-[#041a04]' : 'bg-slate-850 text-slate-400'
                  }`}>{btn.count}</span>
                </button>
              ))}
            </div>

            {/* Local Search Input */}
            <div className="relative max-w-xs w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search keywords, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#020703] border border-emerald-900/40 rounded-lg py-2 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-[#5ce625] font-sans"
              />
            </div>

          </div>

          {/* List Entries */}
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="bg-[#030c05] border border-dashed border-emerald-950 rounded-xl py-12 text-center text-slate-500 text-xs">
                <p className="font-sans">No records matches the active filter guidelines.</p>
                <p className="text-[11px] text-emerald-500/60 font-mono mt-1">Status: Active Listening System Protocol</p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div 
                  key={comment.id}
                  className={`bg-[#030d06] border rounded-xl p-5 transition-all space-y-3.5 relative ${
                    comment.reportsCount && comment.reportsCount > 0 
                      ? 'border-red-950 bg-red-950/5' 
                      : 'border-emerald-950'
                  }`}
                >
                  {/* Alert Tag on Top Right if Reported */}
                  {comment.reportsCount && comment.reportsCount > 0 ? (
                    <div className="absolute top-4 right-4 flex items-center gap-1 border border-red-900/60 text-red-400 px-2 py-0.5 rounded-md font-mono text-[10px] bg-red-950/30 font-bold uppercase animate-pulse">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{comment.reportsCount} User Flag{comment.reportsCount > 1 ? 's' : ''}</span>
                    </div>
                  ) : !comment.approved ? (
                    <div className="absolute top-4 right-4 flex items-center gap-1 border border-amber-900/60 text-amber-500 px-2 py-0.5 rounded-md font-mono text-[10px] bg-amber-950/30 font-bold uppercase">
                      <Clock className="h-3 w-3" />
                      <span>QUEUE PENDING</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 flex items-center gap-1 border border-emerald-900/60 text-emerald-400 px-2 py-0.5 rounded-md font-mono text-[10px] bg-emerald-950/30 font-bold uppercase">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>LIVE ON PORTAL</span>
                    </div>
                  )}

                  {/* Header Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-900 border border-emerald-900 flex items-center justify-center font-bold text-slate-300 font-sans text-sm">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-white text-sm">{comment.author}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded font-mono uppercase">
                          {comment.articleSlug}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{comment.timestamp}</span>
                    </div>
                  </div>

                  {/* Comment Message Body */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1 bg-black/20 p-3 rounded-lg border border-emerald-950/40">
                    "{comment.content}"
                  </p>

                  {/* Reasons display if reported */}
                  {comment.reportsCount && comment.reportsCount > 0 && comment.reportReasons && (
                    <div className="bg-red-950/10 border border-red-900/20 rounded-lg p-3 text-[11px] space-y-1 text-red-300 font-sans">
                      <span className="font-bold block uppercase tracking-wide text-[10px] font-mono text-red-400">User Report Reasons:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                        {comment.reportReasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Banned Word auto warning flags */}
                  {bannedWords.some(w => comment.content.toLowerCase().includes(w)) && (
                    <div className="bg-amber-950/20 border border-amber-900/30 text-amber-400 px-3 py-2 rounded-lg text-[11px] font-sans flex items-center gap-2">
                      <Ban className="h-3.5 w-3.5 animate-bounce" />
                      <span>System Warning: Contains banned spam vocabulary term: <span className="font-mono bg-amber-950 px-1.5 py-0.5 rounded border border-amber-900/50 font-bold text-white uppercase">{bannedWords.find(w => comment.content.toLowerCase().includes(w))}</span></span>
                    </div>
                  )}

                  {/* Action Handlers */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-950/50">
                    
                    <div className="flex items-center gap-2">
                      {/* Only show Approve if not approved or if has reports */}
                      {(!comment.approved || (comment.reportsCount && comment.reportsCount > 0)) && (
                        <button
                          onClick={() => {
                            onApprove(comment.id);
                            handleActionClick('Approved live clearance status', comment.id, comment.author);
                          }}
                          className="px-3.5 py-2 rounded-lg bg-[#5ce625]/20 text-[#5ce625] hover:bg-[#5ce625] hover:text-slate-950 border border-emerald-500/30 text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5 font-bold" />
                          <span>Approve & Clear reports</span>
                        </button>
                      )}

                      {/* Reject button (soft remove) */}
                      {comment.approved && (
                        <button
                          onClick={() => {
                            onReject(comment.id);
                            handleActionClick('Rejected & hidden from public index', comment.id, comment.author);
                          }}
                          className="px-3 py-2 rounded-lg bg-red-950/20 text-red-400 hover:bg-red-950/50 border border-red-900/30 text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          <span>Reject & Hide</span>
                        </button>
                      )}

                      {/* Clear user flags soft action if exists */}
                      {comment.reportsCount && comment.reportsCount > 0 && (
                        <button
                          onClick={() => {
                            onClearReports(comment.id);
                            handleActionClick('Reset users report tickers to zero', comment.id, comment.author);
                          }}
                          className="px-3 py-2 rounded-lg bg-emerald-950/30 text-[#5ce625] hover:bg-emerald-900/50 border border-emerald-900/30 text-xs font-sans font-semibold transition-all cursor-pointer"
                        >
                          <span>Dismiss Flag</span>
                        </button>
                      )}
                    </div>

                    {/* Hard DELETE */}
                    <button
                      onClick={() => {
                        const safety = window.confirm(`Permanently wipe comment submission from "${comment.author}"? This choice is irreversible.`);
                        if (safety) {
                          onDelete(comment.id);
                          handleActionClick('Deleted comment from database entirely', comment.id, comment.author);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/10 transition-colors flex items-center gap-1.5 text-xs font-sans font-medium hover:border hover:border-red-950 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Perm Delete</span>
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* RIGHT COMPONENT - BANNED VOCAB PRESET & LIVE AUDIT TRAIL */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Dashboard Panel 1: Vocabulary Filter Config */}
          <div className="bg-[#030d05] border border-emerald-950 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#5ce625]" />
              <span>Vocabulary Word Banning</span>
            </h3>
            <p className="text-xs text-slate-400">
              Comments containing keywords added below will raise security flags and trigger warnings automatic.
            </p>

            {/* Config Word Submission */}
            <form onSubmit={handleBannedSubmit} className="flex gap-2">
              <input
                type="text"
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                placeholder="e.g. bitcoin, viagra"
                className="flex-grow bg-[#020703] border border-emerald-900/50 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-[#5ce625] font-sans"
              />
              <button
                type="submit"
                className="bg-[#5ce625] text-slate-950 px-3 py-1.5 rounded-lg text-xs font-sans font-bold hover:bg-[#4dd31a] cursor-pointer"
              >
                Add Banned
              </button>
            </form>

            {/* List Active words with inline delete triggers */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F27D26] font-bold block">
                Active Banned List ({bannedWords.length})
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {bannedWords.map((word) => (
                  <span 
                    key={word} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/40 border border-emerald-950 text-xs font-mono text-slate-300"
                  >
                    <span>{word}</span>
                    <button 
                      onClick={() => {
                        onRemoveBannedWord(word);
                        setAuditLog(prev => [
                          { action: `Removed banned term "${word}"`, time: 'Just now', target: 'Global Filter' },
                          ...prev
                        ]);
                      }}
                      className="text-slate-500 hover:text-red-400 font-bold ml-1 text-[10px] bg-transparent border-0 cursor-pointer p-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Dashboard Panel 2: Real-time Compliance Logs */}
          <div className="bg-[#030d05] border border-emerald-950 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-[#5ce625]" />
              <span>Audit Action Trails</span>
            </h3>
            <p className="text-xs text-slate-400">
              Records actions performed by the active administrator session during the active state flow.
            </p>

            <div className="space-y-3.5 pt-1 border-t border-emerald-950/60 font-sans">
              {auditLog.map((log, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#5ce625] mt-1.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-[11px] font-sans text-slate-100">{log.action}</span>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono mt-0.5">
                      <span>Target: <span className="text-slate-400">{log.target}</span></span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => {
                setAuditLog([
                  { action: 'Audit database system log reset', time: 'Just now', target: 'System Node' }
                ]);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white py-1.5 rounded text-[11px] font-mono border border-slate-800 cursor-pointer"
            >
              Clear Audit Log Screen
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
