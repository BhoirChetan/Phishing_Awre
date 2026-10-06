import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Clock,
  AlertTriangle,
  HeartHandshake,
  HelpCircle,
  Gift,
  Headphones,
  Smartphone,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Search,
  Lock
} from 'lucide-react';
import { fetchSocialEngineering } from '../services/api';

export default function SocialEngineering() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchSocialEngineering().then(res => {
      if (res.success && res.social_engineering) {
        setItems(res.social_engineering);
        if (res.social_engineering.length > 0) {
          setSelectedId(res.social_engineering[0].id);
        }
      }
    });
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Clock': return Clock;
      case 'AlertTriangle': return AlertTriangle;
      case 'UserCheck': return UserCheck;
      case 'HeartHandshake': return HeartHandshake;
      case 'HelpCircle': return HelpCircle;
      case 'Gift': return Gift;
      case 'Headphones': return Headphones;
      case 'Smartphone': return Smartphone;
      default: return UserCheck;
    }
  };

  const selectedItem = items.find(i => i.id === selectedId) || items[0];

  if (!selectedItem) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading social engineering techniques...</p>
      </div>
    );
  }

  const IconComponent = getIcon(selectedItem.icon);

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-mono">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Interactive Psychology Module 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Psychological Triggers & Social Engineering Tactics
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Phishing succeeds by manipulating human emotion rather than technical flaws. Explore the 8 key psychological levers used by threat actors.
        </p>
      </div>

      {/* Grid of Technique Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${isSelected
                  ? 'bg-blue-950/80 border-blue-500 text-white shadow-lg glow-blue scale-102'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-900 text-blue-300' : 'bg-slate-950 text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
              </div>
              <strong className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">{item.title}</strong>
            </button>
          );
        })}
      </div>

      {/* DETAILED TACTIC CARD: SCENARIO -> GOAL -> WARNING SIGNS -> RESPONSE */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-950 border border-blue-500/40 text-blue-400">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedItem.title}</h2>
              <span className="text-xs font-mono text-blue-400">{selectedItem.category}</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
            Tactic ID: <span className="text-white">{selectedItem.id}</span>
          </div>
        </div>

        {/* 4-Step Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Scenario */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase text-blue-400 font-bold tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              1. Real-World Scenario
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{selectedItem.scenario}</p>
          </div>

          {/* Attacker Goal */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              2. Attacker's True Goal
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{selectedItem.attacker_goal}</p>
          </div>

          {/* Warning Signs */}
          <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
            <h3 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              3. Key Warning Signs
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(selectedItem.warning_signs || []).map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safe Response */}
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
            <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              4. Safe Defensive Response
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{selectedItem.safe_response}</p>
          </div>

        </div>

      </div>

    </div>
  );
}
