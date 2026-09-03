import React from 'react';
import { Layers, Grid, Brain, Activity, Calculator, Crown } from 'lucide-react';

export function MobileBottomNav({ activeTab, setActiveTab, onOpenPricing }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around xl:hidden shadow-2xl">
      <button
        onClick={() => setActiveTab('landing')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'landing' ? 'text-indigo-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px]">الرئيسية</span>
      </button>

      <button
        onClick={() => setActiveTab('services-catalog')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'services-catalog' ? 'text-indigo-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">الخدمات الـ 24</span>
      </button>

      <button
        onClick={() => setActiveTab('incubator')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'incubator' ? 'text-purple-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Brain className="w-5 h-5 text-amber-300" />
        <span className="text-[10px]">المسرّعة</span>
      </button>

      <button
        onClick={() => setActiveTab('evolution')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'evolution' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Activity className="w-5 h-5" />
        <span className="text-[10px]">التطور</span>
      </button>

      <button
        onClick={onOpenPricing}
        className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-amber-300 font-bold"
      >
        <Crown className="w-5 h-5 text-amber-300" />
        <span className="text-[10px]">الباقات</span>
      </button>
    </div>
  );
}
