import React from 'react';
import { Sparkles, ArrowLeft, TrendingUp, ShieldCheck, Zap, DollarSign, Bot, Brain, Rocket, Activity } from 'lucide-react';

export function Hero({ onExploreIncubator, onExploreServices, onOpenCalculator, onOpenBlueprint }) {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/25 to-pink-600/15 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top announcement pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 shadow-inner hover:border-indigo-500/80 transition-all cursor-pointer"
          onClick={() => onOpenBlueprint('overview')}
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>الجيل الجديد: منظومة ذكاء اصطناعي ذاتية التطور والتنفيذ للمشاريع</span>
          <span className="text-slate-500">|</span>
          <span className="text-indigo-400 font-bold flex items-center gap-1">
            الوثيقة التأسيسية <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.2] sm:leading-[1.15]">
          حوّل أماني وأفكار المشاريع إلى{' '}
          <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent underline decoration-indigo-500/30 decoration-wavy">
            واقع وأرباح متكررة
          </span>{' '}
          بقدرات الذكاء الاصطناعي الشاملة
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          منظومة متكاملة بمعايير عالمية تضم <span className="text-amber-300 font-bold">مجلس إدارة ذكي متكامل (CSO, CTO, CMO, CFO)</span>، وسرعة فائقة في أجزاء من الثانية، مع <span className="text-emerald-400 font-bold">محرك بحث وتطوير ذاتي</span> ينمو ويحل المشكلات ويدعم العملاء آلياً 24/7.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreIncubator}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-base shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer"
          >
            <Brain className="w-5 h-5 text-amber-300" />
            <span>ابدأ تجسيد فكرة مشروعك الآن (AI Incubator)</span>
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreServices}
            className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-bold text-base transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Zap className="w-5 h-5 text-amber-400" />
            <span>استوديو الأدوات والخدمات الحية</span>
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-bold text-base transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>حاسبة الأرباح و MRR</span>
          </button>
        </div>

        {/* Key Autonomous Metrics Highlights */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
              <Brain className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">مجلس الإدارة الذكي</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">4 وكلاء</div>
            <p className="text-xs text-slate-400 mt-1">استراتيجية، كود، تسويق، مالية</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-1">
              <Activity className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">التطور والبحث الذاتي</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">24/7 آلياً</div>
            <p className="text-xs text-slate-400 mt-1">اصطياد الفرص وحل المشكلات</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">هامش الربح الصافي</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">85% - 92%</div>
            <p className="text-xs text-slate-400 mt-1">عائد اشتراكات شهرية متكررة</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-purple-400 mb-1">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">سرعة الاستجابة</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 300 ms</div>
            <p className="text-xs text-slate-400 mt-1">توليد لحظي بدقة متناهية</p>
          </div>
        </div>

      </div>
    </div>
  );
}
