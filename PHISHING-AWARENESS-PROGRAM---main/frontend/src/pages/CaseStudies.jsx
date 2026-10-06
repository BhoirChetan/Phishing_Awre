import React, { useState, useEffect } from 'react';
import {
  FileText,
  Building2,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';
import { fetchCaseStudies } from '../services/api';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchCaseStudies().then(res => {
      if (res.success && res.case_studies) {
        setCaseStudies(res.case_studies);
        if (res.case_studies.length > 0) {
          setActiveId(res.case_studies[0].id);
        }
      }
    });
  }, []);

  if (caseStudies.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading real-life cybersecurity case studies...</p>
      </div>
    );
  }

  const activeStudy = caseStudies.find(c => c.id === activeId) || caseStudies[0];

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-World Cyber Intelligence Module 6</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Real-Life Cybersecurity Case Studies
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Analyze real multi-million dollar corporate breaches caused by phishing. Examine victim missteps, technical fallout, and key enterprise lessons.
        </p>
      </div>

      {/* TIMELINE / CARD NAVIGATION BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {caseStudies.map((cs) => {
          const isSelected = cs.id === activeId;
          return (
            <button
              key={cs.id}
              onClick={() => setActiveId(cs.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3 ${isSelected
                  ? 'bg-slate-900 border-emerald-500 text-white shadow-lg glow-emerald'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {cs.year}
                </span>
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
              <strong className="text-sm font-bold text-white line-clamp-2">{cs.title}</strong>
              <span className="text-xs text-slate-400">{cs.organization_type}</span>
            </button>
          );
        })}
      </div>

      {/* DETAILED TIMELINE BREAKDOWN OF SELECTED CASE */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">

        {/* Case Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{activeStudy.organization_type} • {activeStudy.year}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{activeStudy.title}</h2>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            Target Industry: <span className="text-emerald-400 font-bold">{activeStudy.organization_type}</span>
          </div>
        </div>

        {/* 6 Core Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Situation */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              1. The Situation
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{activeStudy.situation}</p>
          </div>

          {/* Attack Method */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              2. Attack Vector & Method
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{activeStudy.attack_method}</p>
          </div>

          {/* Noticed / Missed */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-purple-400" />
              3. What Was Noticed / Missed
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{activeStudy.noticed_missed}</p>
          </div>

          {/* Consequences */}
          <div className="p-5 rounded-xl bg-slate-950 border border-red-500/30 space-y-2">
            <h3 className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              4. Impact & Consequences
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{activeStudy.consequences}</p>
          </div>

          {/* How It Could Be Prevented */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              5. Prevention Strategy
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{activeStudy.prevention}</p>
          </div>

          {/* Key Lesson */}
          <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 space-y-2">
            <h3 className="text-xs font-mono uppercase text-emerald-300 font-bold tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              6. Key Cybersecurity Lesson
            </h3>
            <p className="text-white text-sm font-semibold leading-relaxed">{activeStudy.key_lesson}</p>
          </div>

        </div>

      </div>

    </div>
  );
}
