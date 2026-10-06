import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Mail,
  KeyRound,
  Globe,
  UserCheck,
  CheckCircle,
  Lock,
  TrendingUp,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { fetchModules } from '../services/api';

export default function Home() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules().then(res => {
      if (res.success) {
        setModules(res.modules);
      }
    });
  }, []);

  return (
    <div className="space-y-16 py-4">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">

        {/* Background Cyber Grid Graphic */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6 text-left">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Interactive Cyber Defense Platform v2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Phishing Awareness <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Program
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Phishing is the <span className="text-emerald-400 font-semibold">#1 entry point</span> for cyber attacks globally. Cybercriminals exploit human psychology to steal credentials, breach networks, and siphon millions. Learn to spot the subtle red flags before it's too late.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/learn"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg glow-emerald flex items-center gap-2 group"
            >
              <span>Start Training</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/quiz"
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Take Quiz</span>
            </Link>

            <Link
              to="/email-simulator"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-800 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Spot Red Flags</span>
            </Link>
          </div>

          {/* Key Threat Statistics Banner */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono">
            <div>
              <span className="block text-2xl font-bold text-emerald-400">3.4 Billion</span>
              <span className="text-xs text-slate-400">Phishing emails sent daily</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-cyan-400">90%+</span>
              <span className="text-xs text-slate-400">Data breaches involve phishing</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-2xl font-bold text-teal-300">3.8 Seconds</span>
              <span className="text-xs text-slate-400">Average time to click fake link</span>
            </div>
          </div>

        </div>
      </div>

      {/* WHY PHISHING IS DANGEROUS */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Phishing Education Matters
          </h2>
          <p className="text-slate-400 text-sm">
            Technical firewalls cannot stop an employee from willingly giving away their credentials. Education is the strongest firewall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 w-fit">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Exploits Human Trust</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Attackers impersonate trusted brands, CEOs, coworkers, or banks using psychological tricks like urgency and fear.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 w-fit">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Bypasses Multi-Factor Auth</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Modern phishing toolkits capture real-time 2FA codes and session cookies, bypassing basic SMS verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 w-fit">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Catastrophic Financial Losses</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              From ransomware deployments to wire transfer fraud, single clicks cost organizations millions in damages.
            </p>
          </div>
        </div>
      </div>

      {/* CORE TRAINING MODULES PREVIEW */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive Training Modules
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Explore hands-on simulations and interactive learning paths.
            </p>
          </div>
          <Link to="/learn" className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm flex items-center gap-1">
            <span>View All Modules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link to="/learn" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800/50">Beginner</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Phishing Basics</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Learn basic attack mechanisms, spear phishing, whaling, smishing, vishing, and quishing.
            </p>
          </Link>

          <Link to="/email-simulator" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800/50">Interactive</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Spot the Red Flags</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Interactive email simulator where you click suspicious elements to uncover hidden threats.
            </p>
          </Link>

          <Link to="/fake-login" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800/50">Simulation</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Fake Login Detection</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Safe sandbox demonstrating how fake login pages harvest user passwords and SSL certificates.
            </p>
          </Link>

          <Link to="/website-detector" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800/50">Analysis</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Website Inspector</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Compare legitimate vs fake websites and spot typosquatting domains like paypa1.com.
            </p>
          </Link>

          <Link to="/social-engineering" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800/50">Psychology</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Social Engineering</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Deconstruct urgency, fear, authority impersonation, and curiosity traps.
            </p>
          </Link>

          <Link to="/quiz" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-950 px-2.5 py-1 rounded-full border border-teal-800/50">Assessment</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Interactive Quiz</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Test your knowledge with scenario-based questions and earn your security level badge.
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
}
