import React, { useState } from 'react';
import {
  Globe,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Zap,
  Search,
  ExternalLink,
  ShieldCheck,
  Info,
  X
} from 'lucide-react';

export default function WebsiteDetector() {
  const [selectedCase, setSelectedCase] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);

  const cases = [
    {
      id: 'case-paypal',
      brand: 'PayPal',
      legitimateDomain: 'https://www.paypal.com/signin',
      phishingDomain: 'http://www.paypa1-security-center.com/login',
      typosquattingType: 'Character Substitution (Letter l -> Number 1)',
      redFlags: [
        {
          id: 'domain',
          element: 'URL Address Bar',
          title: 'Typosquatted Domain',
          description: 'Notice "paypa1" uses the digit "1" instead of the lowercase letter "l". Cybercriminals register thousands of visually similar domains (combosquatting / typosquatting).'
        },
        {
          id: 'badge',
          element: 'Security Seal Image',
          title: 'Fake Security Badges',
          description: 'Static non-functional images of "Norton Secured" or "McAfee Verified" badges designed to trick users into trusting an unverified page.'
        },
        {
          id: 'urgency',
          element: 'Account Lock Warning Banner',
          title: 'Artificial Financial Urgency',
          description: '"Your account will incur a $500 penalty unless verified today!" Real financial institutions do not threaten surprise fines via unverified websites.'
        }
      ]
    },
    {
      id: 'case-microsoft',
      brand: 'Microsoft 365',
      legitimateDomain: 'https://login.microsoftonline.com/',
      phishingDomain: 'http://micros0ft-support-desk-auth.net/verify',
      typosquattingType: 'Homograph & Hyphenation (o -> 0 + hyphenated keywords)',
      redFlags: [
        {
          id: 'domain',
          element: 'URL Address Bar',
          title: 'Zero Substitution & Hyphenation',
          description: '"micros0ft" replaces "o" with zero "0" and appends generic keywords "support-desk-auth.net".'
        },
        {
          id: 'download',
          element: 'Forced Security Patch Download',
          title: 'Unexpected Software Download',
          description: 'Prompting users to download "SecurityFix.exe" directly from an untrusted web page.'
        }
      ]
    }
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5" />
          <span>Interactive Analysis Module 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Fraudulent Website & Typosquatting Detector
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Compare legitimate brand URLs against deceptive lookalike websites. Master typosquatting detection, fake trust seals, and unexpected download traps.
        </p>
      </div>

      {/* Case Switcher */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <span className="text-xs font-mono text-slate-400">Target Brand:</span>
        <div className="flex gap-2">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(idx);
                setSelectedElement(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCase === idx
                  ? 'bg-purple-500 text-slate-950 shadow glow-purple'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
            >
              {c.brand} Case Study
            </button>
          ))}
        </div>
      </div>

      {/* COMPARISON WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Legitimate Site Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5" />
              <span>Legitimate Website Domain</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              VERIFIED
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs text-emerald-300 flex items-center justify-between">
            <span className="truncate">{currentCase.legitimateDomain}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase font-mono">Authentic Indicators:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Canonical primary domain name matching official brand.</li>
              <li>Valid Organization Validated (OV/EV) SSL certificate.</li>
              <li>Official OAuth single-sign-on protocol.</li>
            </ul>
          </div>
        </div>

        {/* Fraudulent Site Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-red-500/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Fraudulent / Typosquatted Domain</span>
            </div>
            <span className="text-[10px] font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
              SUSPICIOUS
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-red-500/50 font-mono text-xs text-red-300 flex items-center justify-between">
            <span className="truncate">{currentCase.phishingDomain}</span>
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-amber-400 text-xs uppercase font-mono">Typosquatting Technique:</h4>
            <p className="text-slate-300">{currentCase.typosquattingType}</p>
          </div>
        </div>

      </div>

      {/* INTERACTIVE RED FLAGS EXPLORER */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-400" />
          <span>Click to Inspect Fraudulent Site Elements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentCase.redFlags.map((rf) => (
            <button
              key={rf.id}
              onClick={() => setSelectedElement(rf)}
              className={`p-4 rounded-xl border text-left transition-all ${selectedElement?.id === rf.id
                  ? 'bg-purple-950/60 border-purple-500 text-white glow-purple'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
            >
              <span className="text-xs font-mono text-purple-400 block mb-1">{rf.element}</span>
              <strong className="text-sm block">{rf.title}</strong>
            </button>
          ))}
        </div>

        {selectedElement && (
          <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/50 space-y-2 animate-fade-in">
            <h4 className="text-sm font-bold text-purple-300">{selectedElement.title} Analysis</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedElement.description}</p>
          </div>
        )}
      </div>

    </div>
  );
}
