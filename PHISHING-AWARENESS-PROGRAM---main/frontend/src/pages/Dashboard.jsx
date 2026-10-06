import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Award,
  CheckCircle,
  BookOpen,
  HelpCircle,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDashboardStats, fetchUserProgress } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats().then(res => {
      if (res.success && res.stats) {
        setStats(res.stats);
      }
      setLoading(false);
    });
  }, []);

  if (loading || !stats) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading security awareness dashboard metrics...</p>
      </div>
    );
  }

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Cyber Guardian': return 'bg-emerald-950 text-emerald-400 border-emerald-500/50 glow-emerald';
      case 'Phishing Defender': return 'bg-cyan-950 text-cyan-400 border-cyan-500/50 glow-cyan';
      default: return 'bg-amber-950 text-amber-400 border-amber-500/50';
    }
  };

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Security Awareness Dashboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Training Progress & Security Score
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Track your overall phishing defense readiness, module completion metrics, assessment scores, and security level badge.
        </p>
      </div>

      {/* OVERALL READINESS SCORE CARD */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${getLevelBadgeColor(stats.learning_level)}`}>
              LEVEL: {stats.learning_level}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white">Overall Defense Readiness</h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Calculated based on completed training modules (40%), security checklist habits (30%), and quiz accuracy score (30%).
          </p>

          {/* Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Progress:</span>
              <span className="text-emerald-400 font-extrabold text-base">{stats.overall_progress_percentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                style={{ width: `${stats.overall_progress_percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recommended Module Banner */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Recommended Next Step</span>
          <h3 className="text-lg font-bold text-white">{stats.recommended_next_module}</h3>
          <p className="text-slate-400 text-xs">
            Continue learning to increase your readiness score to 100%.
          </p>
          <Link
            to="/email-simulator"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl transition-all shadow"
          >
            <span>Launch Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Modules */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Modules Completed</span>
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="block text-3xl font-extrabold text-white">
            {stats.completed_modules_count} / {stats.total_modules}
          </span>
          <p className="text-xs text-slate-400">
            {stats.completed_lessons_count} interactive lessons finished
          </p>
        </div>

        {/* Card 2: Quiz Score */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Quiz Accuracy</span>
            <HelpCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="block text-3xl font-extrabold text-cyan-400">
            {stats.quiz_score}%
          </span>
          <p className="text-xs text-slate-400">
            {stats.quiz_attempts} assessment attempt(s)
          </p>
        </div>

        {/* Card 3: Security Tips */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Security Checklist</span>
            <CheckSquare className="w-5 h-5 text-teal-400" />
          </div>
          <span className="block text-3xl font-extrabold text-white">
            {stats.checked_tips_count} / {stats.total_tips}
          </span>
          <p className="text-xs text-slate-400">
            Defensive habits reviewed
          </p>
        </div>

        {/* Card 4: Case Studies */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Case Studies</span>
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <span className="block text-3xl font-extrabold text-amber-400">
            {stats.total_case_studies}
          </span>
          <p className="text-xs text-slate-400">
            Real-world breach analyses
          </p>
        </div>

      </div>

    </div>
  );
}
