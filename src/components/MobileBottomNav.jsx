import React from 'react';
import { Layers, Star, Grid, Brain, Activity, Crown } from 'lucide-react';

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
        onClick={() => setActiveTab('ultra-studios')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'ultra-studios' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Star className="w-5 h-5 fill-amber-400/30" />
        <span className="text-[10px]">الاستوديوهات ⭐</span>
      </button>

      <button
        onClick={() => setActiveTab('services-catalog')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'services-catalog' ? 'text-blue-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">الـ 24 خدمة</span>
      </button>

      <button
        onClick={() => setActiveTab('incubator')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
          activeTab === 'incubator' ? 'text-purple-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Brain className="w-5 h-5 text-purple-300" />
        <span className="text-[10px]">المسرّعة</span>
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
