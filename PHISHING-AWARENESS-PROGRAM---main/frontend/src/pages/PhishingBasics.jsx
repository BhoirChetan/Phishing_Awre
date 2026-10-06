import React, { useState } from 'react';
import {
  ShieldAlert,
  Mail,
  Target,
  Crown,
  Smartphone,
  PhoneCall,
  Copy,
  QrCode,
  HelpCircle,
  Zap,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function PhishingBasics() {
  const [selectedType, setSelectedType] = useState('email');

  const phishingTypes = [
    {
      id: 'email',
      title: 'Email Phishing',
      icon: Mail,
      color: 'emerald',
      badge: 'Most Common',
      definition: 'Mass emails sent to thousands of recipients disguised as trustworthy organizations (banks, cloud services, streaming apps).',
      target: 'General public, consumers, broad corporate workforce',
      example: 'A fake Netflix email claiming "Payment Failed - Update Billing Details".',
      prevention: 'Check sender domain, inspect links, never enter credentials via unverified email links.'
    },
    {
      id: 'spear',
      title: 'Spear Phishing',
      icon: Target,
      color: 'cyan',
      badge: 'High Precision',
      definition: 'Customized, targeted attacks focused on a specific individual or company, using researched personal details.',
      target: 'HR personnel, finance officers, specific project managers',
      example: 'An email to an accountant addressing them by name, referencing a real recently signed vendor contract.',
      prevention: 'Be cautious with details shared publicly on social media (LinkedIn); enforce strict out-of-band verification.'
    },
    {
      id: 'whaling',
      title: 'Whaling',
      icon: Crown,
      color: 'amber',
      badge: 'Executive Level',
      definition: 'High-profile spear phishing targeting top executives (CEOs, CFOs, Board Members) to steal high-level credentials or perform massive wire fraud.',
      target: 'C-Suite Executives, VPs, Board Members',
      example: 'Fake urgent legal subpoena or tax audit notice directed specifically at the CEO.',
      prevention: 'Executive executive protection filters, dual-authorization requirements for wires.'
    },
    {
      id: 'smishing',
      title: 'Smishing (SMS)',
      icon: Smartphone,
      color: 'blue',
      badge: 'Mobile Danger',
      definition: 'Phishing delivered via short message service (SMS) text messages, often pretending to be banks or parcel delivery services.',
      target: 'Mobile phone users',
      example: 'SMS claiming "USPS: Package unable to deliver due to address error. Update at link..."',
      prevention: 'Never click shortened links in SMS. Go directly to official apps or websites.'
    },
    {
      id: 'vishing',
      title: 'Vishing (Voice)',
      icon: PhoneCall,
      color: 'purple',
      badge: 'Phone Scam',
      definition: 'Voice phone calls where scammers impersonate tech support, bank fraud departments, or law enforcement to extract information.',
      target: 'Elderly, remote workers, desk phone operators',
      example: 'Robocall claiming your bank account has suspicious $500 charges, asking you to read back your OTP.',
      prevention: 'Hang up and call the number printed on the back of your bank card.'
    },
    {
      id: 'clone',
      title: 'Clone Phishing',
      icon: Copy,
      color: 'rose',
      badge: 'Replicated Email',
      definition: 'Attackers take a real, previously delivered email, copy its contents, and replace the legitimate attachment or link with a malicious one.',
      target: 'Employees involved in ongoing email threads',
      example: 'A resent email saying "Updated version of yesterday\'s invoice attached" with a malicious macro file.',
      prevention: 'Check if the sender email address changed slightly; re-verify attachments.'
    },
    {
      id: 'quishing',
      title: 'Quishing (QR Code)',
      icon: QrCode,
      color: 'teal',
      badge: 'Emerging Threat',
      definition: 'Using malicious QR codes on physical posters, parking meters, or PDF emails to bypass desktop security filters.',
      target: 'Smartphone users scanning QR codes in public or emails',
      example: 'A fake parking meter sticker directing users to a credit card harvesting site.',
      prevention: 'Inspect destination URL previews on mobile scanners before confirming navigation.'
    }
  ];

  const currentTypeObj = phishingTypes.find(t => t.id === selectedType) || phishingTypes[0];

  return (
    <div className="space-y-12 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Educational Module 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Phishing Fundamentals & Attack Vectors
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Understand what phishing is, why attackers use it, and how to differentiate between various specialized phishing tactics.
        </p>
      </div>

      {/* WHAT IS PHISHING & HOW IT WORKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">What is Phishing?</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Phishing is a form of social engineering where attackers impersonate trustworthy entities through email, text, or phone to trick victims into revealing sensitive information, such as login credentials, credit card numbers, or SSNs.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-400 block font-bold">Key Objective:</span>
            <span>Bypass technical firewalls by tricking human operators into opening the door.</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <Zap className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">How Phishing Attacks Work</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 font-mono">1</span>
              <div>
                <strong className="text-white">Pretext Creation:</strong>
                <p className="text-slate-400 text-xs mt-0.5">Attacker crafts a believable lure (e.g. Account Locked, Prize Winner, Urgent Wire).</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 font-mono">2</span>
              <div>
                <strong className="text-white">Message Transmission:</strong>
                <p className="text-slate-400 text-xs mt-0.5">Delivered via spoofed email, SMS, QR code, or direct call.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 font-mono">3</span>
              <div>
                <strong className="text-white">Victim Action & Exploitation:</strong>
                <p className="text-slate-400 text-xs mt-0.5">Victim clicks link, enters credentials on clone site, or runs macro attachment.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* TYPES OF PHISHING INTERACTIVE EXPLORER */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Types of Phishing Attacks</h2>
          <p className="text-slate-400 text-sm mt-1">
            Click on any phishing type below to inspect its mechanism, targets, and safe defense steps.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pb-2">
          {phishingTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950 scale-105 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Card View for Selected Type */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                {React.createElement(currentTypeObj.icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{currentTypeObj.title}</h3>
                <span className="text-xs font-mono text-emerald-400">{currentTypeObj.badge}</span>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
              Vector: <span className="text-white">{currentTypeObj.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Definition</h4>
                <p className="text-slate-200 text-sm mt-1 leading-relaxed">{currentTypeObj.definition}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Common Targets</h4>
                <p className="text-slate-300 text-sm mt-1">{currentTypeObj.target}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Real-World Scenario
                </h4>
                <p className="text-slate-300 text-xs italic mt-1.5">"{currentTypeObj.example}"</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommended Defense
                </h4>
                <p className="text-slate-300 text-xs mt-1.5">{currentTypeObj.prevention}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
