import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Menu,
  X,
  Terminal,
  Home,
  BookOpen,
  Mail,
  KeyRound,
  Globe,
  UserCheck,
  FileText,
  HelpCircle,
  CheckSquare,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Email Simulator', path: '/email-simulator', icon: Mail },
    { name: 'Fake Login', path: '/fake-login', icon: KeyRound },
    { name: 'Website Detector', path: '/website-detector', icon: Globe },
    { name: 'Social Engineering', path: '/social-engineering', icon: UserCheck },
    { name: 'Case Studies', path: '/case-studies', icon: FileText },
    { name: 'Quiz', path: '/quiz', icon: HelpCircle },
    { name: 'Security Tips', path: '/security-tips', icon: CheckSquare },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 rounded-xl bg-slate-900 border border-emerald-500/30 group-hover:border-emerald-500/80 transition-all glow-emerald">
              <ShieldCheck className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5">
                CODSOFT <span className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">Ansh</span>
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-tight">Phishing Awareness Program</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-all ${isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
