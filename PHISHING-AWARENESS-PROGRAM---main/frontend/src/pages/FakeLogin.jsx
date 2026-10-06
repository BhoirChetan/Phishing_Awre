import React, { useState } from 'react';
import {
  KeyRound,
  ShieldAlert,
  Lock,
  Globe,
  AlertTriangle,
  CheckCircle,
  Eye,
  X,
  HelpCircle,
  Layers,
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function FakeLogin() {
  const [activeTab, setActiveTab] = useState('phishing'); // 'phishing' or 'legitimate'
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [dummyEmail, setDummyEmail] = useState('');
  const [dummyPassword, setDummyPassword] = useState('');
  const [simulationResult, setSimulatedResult] = useState(null);

  const overlays = [
    {
      id: 'domain',
      title: 'Suspicious Domain Name',
      target: 'http://microsoft-online-security-portal.xyz',
      explanation: 'Official Microsoft login pages are ALWAYS hosted on "login.microsoftonline.com" or "login.live.com". Notice the ".xyz" TLD and compound domain used here to deceive users.',
      isPhishing: true
    },
    {
      id: 'ssl',
      title: 'Unencrypted / Generic SSL Certificate',
      target: 'Not Secure (HTTP)',
      explanation: 'Notice the lack of a proper padlock or "Not Secure" warning in the browser address bar. Attackers often omit HTTPS or use free generic SSL certs.',
      isPhishing: true
    },
    {
      id: 'branding',
      title: 'Outdated & Pixelated Branding',
      target: 'Distorted Microsoft Logo',
      explanation: 'Phishing kits often copy old logo assets or misalign button alignments and font families.',
      isPhishing: true
    },
    {
      id: 'credential_harvesting',
      title: 'Universal Credential Form',
      target: 'Dummy Password Input',
      explanation: 'The fake form sends POST requests to a malicious server script that records credentials without authenticating you.',
      isPhishing: true
    }
  ];

  const handleDummySubmit = (e) => {
    e.preventDefault();
    setSimulatedResult({
      type: activeTab,
      message: activeTab === 'phishing'
        ? '⚠️ SIMULATION WARNING: In a real attack, your email and password would have been harvested and sent to an attacker server!'
        : '✅ LEGITIMATE SITE: Your credentials would be encrypted and authenticated directly with Microsoft official servers.'
    });
  };

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Simulation Module 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Fake Login Page Sandbox & Inspection
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Learn how cybercriminals clone corporate and banking login portals to harvest credentials. Inspect domain anomalies and security certificate flaws safely.
        </p>
      </div>

      {/* Safety Banner Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center gap-3 text-xs text-emerald-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong>Safe Educational Environment:</strong> This page is a local simulation. No real credentials are saved, transmitted, or collected. Use test dummy data only.
        </span>
      </div>

      {/* Toggle View Mode */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">Portal View Mode:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('phishing');
                setSimulatedResult(null);
                setSelectedOverlay(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'phishing'
                  ? 'bg-red-500 text-white shadow glow-red'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Fake / Phishing Portal</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('legitimate');
                setSimulatedResult(null);
                setSelectedOverlay(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'legitimate'
                  ? 'bg-emerald-500 text-slate-950 shadow glow-emerald'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Legitimate Microsoft Portal</span>
            </button>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Click highlighted inspection points to examine domain features
        </span>
      </div>

      {/* SIMULATED BROWSER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Mock Browser Container (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">

          {/* Simulated Browser Address Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>

            {/* Address Bar */}
            <div
              onClick={() => setSelectedOverlay(overlays[0])}
              className={`flex-1 px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center justify-between cursor-pointer transition-all ${activeTab === 'phishing'
                  ? 'bg-red-950/40 border-red-500/50 text-red-300 hover:border-red-400'
                  : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                }`}
            >
              <div className="flex items-center gap-2 truncate">
                {activeTab === 'phishing' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                <span className="truncate">
                  {activeTab === 'phishing'
                    ? 'http://microsoft-online-security-portal.xyz/auth/login'
                    : 'https://login.microsoftonline.com/common/oauth2/authorize'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-400 underline">
                Inspect URL
              </span>
            </div>
          </div>

          {/* Login Interface Body */}
          <div className="p-8 bg-slate-950 flex flex-col items-center justify-center min-h-[380px]">

            <div className="w-full max-w-sm p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">

              {/* Logo Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-2 gap-1 w-6 h-6">
                    <span className="bg-red-500 rounded-sm"></span>
                    <span className="bg-emerald-500 rounded-sm"></span>
                    <span className="bg-blue-500 rounded-sm"></span>
                    <span className="bg-amber-500 rounded-sm"></span>
                  </div>
                  <span className="font-semibold text-white tracking-tight text-lg">Microsoft</span>
                </div>
                {activeTab === 'phishing' && (
                  <span className="text-[10px] font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                    FAKE CLONE
                  </span>
                )}
              </div>

              {/* Login Form */}
              <form onSubmit={handleDummySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email or Phone</label>
                  <input
                    type="email"
                    placeholder="user@organization.com"
                    value={dummyEmail}
                    onChange={(e) => setDummyEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={dummyPassword}
                    onChange={(e) => setDummyPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'phishing'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                >
                  Sign In (Simulation)
                </button>
              </form>

              {/* Simulation Response Output */}
              {simulationResult && (
                <div className={`p-4 rounded-xl text-xs space-y-2 font-mono ${simulationResult.type === 'phishing'
                    ? 'bg-red-950/80 border border-red-500 text-red-200'
                    : 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                  }`}>
                  <p>{simulationResult.message}</p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Inspection Breakdown Sidebar (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>Domain & SSL Analysis</span>
            </h3>

            {selectedOverlay ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
                <h4 className="font-bold text-white text-sm">{selectedOverlay.title}</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{selectedOverlay.explanation}</p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300">
                  Inspected Element: {selectedOverlay.target}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-xs leading-relaxed">
                Click on the address bar above or any inspection point to view key differences between official portals and phishing clones.
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white text-sm font-mono uppercase">Key Takeaways</h4>
            <ul className="space-y-2 list-disc list-inside text-slate-400">
              <li>Always check the domain suffix (e.g., .com vs .xyz or .net).</li>
              <li>Password managers will not autofill passwords on fake domains.</li>
              <li>Official OAuth SSO pages use HTTPS with organization-verified SSL.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
