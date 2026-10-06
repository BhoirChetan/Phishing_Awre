import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  ShieldCheck,
  Lock,
  RefreshCw,
  AlertCircle,
  Zap,
  Check
} from 'lucide-react';
import { fetchSecurityTips, fetchUserProgress, updateUserProgress } from '../services/api';

export default function SecurityTips() {
  const [tips, setTips] = useState([]);
  const [checkedTips, setCheckedTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [tipsRes, progRes] = await Promise.all([
        fetchSecurityTips(),
        fetchUserProgress()
      ]);

      if (tipsRes.success && tipsRes.tips) {
        setTips(tipsRes.tips);
      }
      if (progRes.success && progRes.progress) {
        setCheckedTips(progRes.progress.checked_tips || []);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleToggleTip = async (tipId) => {
    const isChecked = checkedTips.includes(tipId);
    let updated;
    if (isChecked) {
      updated = checkedTips.filter(id => id !== tipId);
    } else {
      updated = [...checkedTips, tipId];
    }
    setCheckedTips(updated);
    await updateUserProgress({ checked_tips: updated });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading security hygiene tips...</p>
      </div>
    );
  }

  const completedCount = checkedTips.length;
  const totalCount = tips.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Security Hygiene Checklist</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practical Defensive Security Checklist
        </h1>
        <p className="text-slate-400 text-base max-w-3xl">
          Review these 9 fundamental security habits. Mark each rule as reviewed to track your cyber hygiene progress.
        </p>

        {/* Progress Bar */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Hygiene Mastered: <strong className="text-emerald-400">{completedCount} of {totalCount}</strong></span>
            <span className="text-emerald-400 font-bold">{progressPct}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* CHECKLIST ITEMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => {
          const isChecked = checkedTips.includes(tip.tip_id);
          return (
            <div
              key={tip.id || tip.tip_id}
              onClick={() => handleToggleTip(tip.tip_id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${isChecked
                  ? 'bg-emerald-950/30 border-emerald-500/50 glow-emerald'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase font-bold ${tip.importance === 'Critical'
                      ? 'bg-red-950 text-red-400 border-red-800'
                      : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    }`}>
                    {tip.importance} Priority
                  </span>

                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 bg-slate-950 text-transparent'
                    }`}>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                <h3 className={`text-base font-bold transition-colors ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                  {tip.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Category: {tip.category}</span>
                <span className={isChecked ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isChecked ? 'Mastered' : 'Mark Review'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
