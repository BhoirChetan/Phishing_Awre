import React, { useState, useEffect } from 'react';
import {
  Mail,
  AlertTriangle,
  CheckCircle,
  Eye,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  Info,
  RefreshCw,
  Search,
  ExternalLink,
  Lock,
  User
} from 'lucide-react';
import { fetchPhishingExamples } from '../services/api';

export default function EmailSimulator() {
  const [emails, setEmails] = useState([]);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(0);
  const [foundFlags, setFoundFlags] = useState([]);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [showAllFlags, setShowAllFlags] = useState(false);

  useEffect(() => {
    fetchPhishingExamples('email').then(res => {
      if (res.success && res.examples && res.examples.length > 0) {
        setEmails(res.examples);
      }
    });
  }, []);

  const currentEmail = emails[selectedEmailIndex] || null;

  const handleFlagClick = (flag) => {
    if (!foundFlags.includes(flag.id)) {
      setFoundFlags([...foundFlags, flag.id]);
    }
    setActiveFeedback(flag);
  };

  const handleReset = () => {
    setFoundFlags([]);
    setActiveFeedback(null);
    setShowAllFlags(false);
  };

  if (!currentEmail) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading email phishing simulator scenarios...</p>
      </div>
    );
  }

  const redFlags = currentEmail.red_flags || [];
  const totalFlags = redFlags.length;
  const isCompleted = foundFlags.length === totalFlags;

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive Simulator Module 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Spot the Red Flags — Email Analysis Simulator
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Examine realistic suspicious emails. Click on red flags in the sender line, urgency statements, or links to reveal malicious indicators.
        </p>
      </div>

      {/* Simulator Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Select Scenario:</span>
          <div className="flex gap-2">
            {emails.map((email, idx) => (
              <button
                key={email.id}
                onClick={() => {
                  setSelectedEmailIndex(idx);
                  handleReset();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedEmailIndex === idx
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
              >
                Scenario {idx + 1}: {email.category || 'Email'}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">Red Flags Discovered:</span>
            <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
              {foundFlags.length} / {totalFlags}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Simulator"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SIMULATOR WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Email Client GUI (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">

          {/* Email Header Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="font-mono text-xs text-slate-400">Secure Mail Client v4.1</span>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800/50">
              UNVERIFIED EXTERNAL SENDER
            </span>
          </div>

          {/* Email Sender Header Metadata */}
          <div className="p-6 border-b border-slate-800/80 bg-slate-900/90 space-y-3 text-sm font-sans">

            {/* Sender Flag Spot */}
            <div className="flex items-start gap-2">
              <span className="text-slate-400 font-mono text-xs w-16 pt-1">From:</span>
              <div
                onClick={() => {
                  const flag = redFlags.find(f => f.id === 'rf-1' || f.text.includes(currentEmail.sender));
                  if (flag) handleFlagClick(flag);
                }}
                className={`p-2 rounded-lg border transition-all cursor-pointer flex-1 flex items-center justify-between ${foundFlags.includes('rf-1')
                    ? 'bg-red-950/60 border-red-500/60 text-red-200 glow-red'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-amber-500/50'
                  }`}
              >
                <div>
                  <strong className="text-white">{currentEmail.sender_name}</strong>{' '}
                  <span className="text-slate-400 font-mono text-xs">&lt;{currentEmail.sender}&gt;</span>
                </div>
                <span className="text-xs text-amber-400 font-mono hover:underline flex items-center gap-1">
                  <Search className="w-3 h-3" /> Inspect Address
                </span>
              </div>
            </div>

            {/* Subject Flag Spot */}
            <div className="flex items-start gap-2">
              <span className="text-slate-400 font-mono text-xs w-16 pt-1">Subject:</span>
              <div
                onClick={() => {
                  const flag = redFlags.find(f => f.id === 'rf-2' || f.text.toLowerCase().includes('urgent'));
                  if (flag) handleFlagClick(flag);
                }}
                className={`p-2 rounded-lg border transition-all cursor-pointer flex-1 flex items-center justify-between ${foundFlags.includes('rf-2')
                    ? 'bg-red-950/60 border-red-500/60 text-red-200 glow-red'
                    : 'bg-slate-950/60 border-slate-800 text-white hover:border-amber-500/50'
                  }`}
              >
                <span className="font-semibold">{currentEmail.subject}</span>
                <span className="text-xs text-amber-400 font-mono hover:underline flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Check Urgency
                </span>
              </div>
            </div>

          </div>

          {/* Email Body Workspace */}
          <div className="p-6 bg-slate-950 text-slate-200 text-sm leading-relaxed space-y-6 font-sans whitespace-pre-line min-h-[300px]">
            {currentEmail.body}

            {/* Interactive Link Box inside Email Body */}
            <div className="pt-4 border-t border-slate-900">
              <p className="text-slate-400 text-xs mb-2 font-mono">Suspicious Link Inspection:</p>
              <div
                onClick={() => {
                  const flag = redFlags.find(f => f.id === 'rf-3' || f.text.includes('http'));
                  if (flag) handleFlagClick(flag);
                }}
                className={`p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer flex flex-wrap items-center justify-between gap-2 ${foundFlags.includes('rf-3')
                    ? 'bg-red-950/80 border-red-500 text-red-300 glow-red'
                    : 'bg-slate-900 border-slate-800 text-cyan-400 hover:border-amber-500/50'
                  }`}
              >
                <span className="truncate max-w-md">http://auth-login-pass-verify.com/login?usr=emp</span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Search className="w-3.5 h-3.5" /> Hover / Click Link Red Flag
                </span>
              </div>
            </div>
          </div>

          {/* Email Footer Banner */}
          <div className="bg-slate-900 p-4 border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
            Click on sender, subject, or links above to inspect cybersecurity red flags.
          </div>

        </div>

        {/* Feedback & Flag Explanations Sidebar (1 Col) */}
        <div className="space-y-6">

          {/* Active Selection Feedback Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" />
              <span>Inspection Analysis</span>
            </h3>

            {activeFeedback ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-red-500/40 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{activeFeedback.label || 'Red Flag Detected'}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {activeFeedback.explanation}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                  Target string: <span className="text-red-300 font-sans">{activeFeedback.text}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 text-center text-slate-400 text-xs space-y-2">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Click any suspicious area in the email on the left to reveal why it is dangerous.</p>
              </div>
            )}
          </div>

          {/* Found Flags List */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center justify-between">
              <span>Red Flag Checklist</span>
              <span className="text-xs text-slate-400 font-normal">{foundFlags.length} / {totalFlags}</span>
            </h3>

            <div className="space-y-2">
              {redFlags.map((flag, idx) => {
                const isFound = foundFlags.includes(flag.id);
                return (
                  <div
                    key={flag.id || idx}
                    onClick={() => handleFlagClick(flag)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${isFound
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                  >
                    {isFound ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono shrink-0">
                        {idx + 1}
                      </span>
                    )}
                    <span className={isFound ? 'font-semibold text-white' : ''}>
                      {flag.label || flag.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {isCompleted && (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 text-center space-y-2 glow-emerald">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-white font-bold text-sm">All Red Flags Found!</h4>
                <p className="text-emerald-300 text-xs">
                  Great job analyzing this email. You have identified all security threats in this scenario.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
