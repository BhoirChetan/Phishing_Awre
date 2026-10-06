import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-lg text-white">Phishing Awareness Program</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              An interactive cybersecurity training platform empowering individuals and organizations to recognize, analyze, and defend against modern phishing threats and social engineering tactics.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-2 rounded-lg w-fit">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Strictly For Educational Use Only — All Simulations Are Controlled & Safe</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 font-mono">Training Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Phishing Basics</Link></li>
              <li><Link to="/email-simulator" className="hover:text-emerald-400 transition-colors">Email Simulator</Link></li>
              <li><Link to="/fake-login" className="hover:text-emerald-400 transition-colors">Fake Login Demo</Link></li>
              <li><Link to="/website-detector" className="hover:text-emerald-400 transition-colors">Fraudulent Website Detector</Link></li>
              <li><Link to="/social-engineering" className="hover:text-emerald-400 transition-colors">Social Engineering</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Assessment */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 font-mono">Assessment & Progress</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/case-studies" className="hover:text-emerald-400 transition-colors">Real-Life Case Studies</Link></li>
              <li><Link to="/quiz" className="hover:text-emerald-400 transition-colors">Interactive Quiz</Link></li>
              <li><Link to="/security-tips" className="hover:text-emerald-400 transition-colors">Security Checklist</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Awareness Dashboard</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Phishing Awareness Program. Developed for Cybersecurity Awareness & Defensive Education.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy Safe Environment</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
