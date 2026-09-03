import React, { useState } from 'react';
import {
  X,
  Crown,
  Calculator,
  BookOpen,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { RevenueCalculator } from './RevenueCalculator';
import { BLUEPRINT_SECTIONS } from '../data/blueprintData';

export function FounderAdminModal({ isOpen, onClose, onOpenMobileGuide, onOpenBlueprint }) {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'strategy'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border-2 border-indigo-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
              <Crown className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">لوحة تحكم صاحب المشروع (Founder & Business Hub)</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  سرية وخاصة بك 🔒
                </span>
              </div>
              <p className="text-xs text-slate-400">
                هنا تدير أرباحك، تحسب اشتراكات الـ MRR، تراجع دراسة الجدوى، وتصدر تطبيق الهاتف.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>حاسبة الأرباح و MRR</span>
          </button>

          <button
            onClick={onOpenMobileGuide}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>تصدير تطبيق Android & iOS</span>
          </button>

          <button
            onClick={() => onOpenBlueprint('overview')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>دراسة الجدوى الشاملة</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'calculator' && (
            <RevenueCalculator onOpenBlueprint={onOpenBlueprint} />
          )}
        </div>

      </div>
    </div>
  );
}
