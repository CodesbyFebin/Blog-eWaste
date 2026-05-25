import React from 'react';
import { ARTICLES } from '../data/knowledge';
import { Clock, Eye, Sparkles } from 'lucide-react';

interface FeaturedArticlesProps {
  onSelectArticle: (slug: string) => void;
}

export default function FeaturedArticles({ onSelectArticle }: FeaturedArticlesProps) {
  // Take top 3 guides representing standard regulatory depth
  const featured = ARTICLES.slice(0, 3);

  return (
    <section id="featured-articles-section" className="w-full bg-white py-14 sm:py-20 border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-8 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase font-bold block">
              CANONICAL KNOWLEDGE CENTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
              Latest Scholarly & Regulatory Guides
            </h2>
            <p className="text-sm text-slate-500 font-serif max-w-xl leading-relaxed mt-1">
              Authored by senior legal advisors and data security auditors, drilling deep into corporate liabilities, laptop scraparate pricing indices, and national authorizations.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-serif italic shrink-0">
            Published under active editorial oversight
          </span>
        </div>

        {/* 3-Card Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((art, idx) => {
            const readTime = Math.ceil(art.wordCount / 200);
            return (
              <article 
                key={art.slug}
                onClick={() => onSelectArticle(art.slug)}
                className="bg-white border border-slate-200 hover:border-[#F27D26] transition-all duration-300 rounded-lg p-6 sm:p-8 flex flex-col justify-between group cursor-pointer relative shadow-sm"
              >
                {/* Visual Order Watermark */}
                <span className="absolute top-6 right-6 text-4xl font-serif font-black text-slate-100 group-hover:text-[#F27D26]/10 transition-colors pointer-events-none select-none">
                  0{idx + 1}
                </span>

                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[10px] font-mono font-bold text-[#F27D26] uppercase">
                    <span>{art.category.replace('-', ' ')}</span>
                    <span className="text-slate-300">•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 group-hover:text-[#F27D26] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-serif line-clamp-3 leading-relaxed">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider inline-flex items-center gap-1">
                    ⏱️ {readTime} Min Read
                  </span>
                  
                  <span className="text-xs font-mono font-black text-[#F27D26] group-hover:underline inline-flex items-center gap-1.5 uppercase tracking-wider">
                    <span>Read Guide</span>
                    <Eye className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
