import React from 'react';
import { Sparkles, Crown, Grid, Brain, Activity, Layers, ShieldCheck, User, Lock } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, userCredits, currentUser, onOpenPricing, onOpenFounderHub, onOpenAuth }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('landing')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                OmniAI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-300 border border-indigo-500/40">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              المنصة الذكية لإنتاج الخدمات والحلول المتقدمة
            </p>
          </div>
        </div>

        {/* Clean Client Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            الرئيسية
          </button>

          <button
            onClick={() => setActiveTab('services-catalog')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'services-catalog'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-4 h-4 text-cyan-300" />
            الخدمات الـ 24
            <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 rounded font-bold">
              24 أداة
            </span>
          </button>

          <button
            onClick={() => setActiveTab('incubator')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'incubator'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-300 animate-pulse" />
            مسرّعة المشاريع
          </button>

          <button
            onClick={() => setActiveTab('evolution')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'evolution'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4 text-amber-400" />
            التطور الذاتي 🔮
          </button>
        </nav>

        {/* User Credits, Auth, Founder Hub & Pricing CTA */}
        <div className="flex items-center gap-2">
          {/* Credit balance display */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <div className="text-right">
              <div className="text-[9px] text-slate-400">رصيد النقاط</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">{userCredits}</div>
            </div>
          </div>

          {/* User Account / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="p-2 sm:px-3 sm:py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="حساب المشترك"
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">{currentUser?.name ? currentUser.name.split(' ')[0] : 'تسجيل الدخول'}</span>
          </button>

          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">الباقات</span>
          </button>

          {/* Owner/Founder Hub Button (Protected by PIN) */}
          <button
            onClick={onOpenFounderHub}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shadow-lg shadow-amber-600/30 transition-all cursor-pointer transform active:scale-95"
            title="لوحة تحكم خاصة بصاحب المشروع (محمية برمز سري)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline">لوحة المالك 👑</span>
            <span className="sm:hidden">المالك 👑</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="xl:hidden px-4 pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-t border-slate-800/60 pt-2">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          الرئيسية
        </button>
        <button
          onClick={() => setActiveTab('services-catalog')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'services-catalog' ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          الخدمات الـ 24 ✨
        </button>
        <button
          onClick={() => setActiveTab('incubator')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'incubator' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          مسرّعة المشاريع 🚀
        </button>
        <button
          onClick={() => setActiveTab('evolution')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'evolution' ? 'bg-amber-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          التطور الذاتي 🔮
        </button>
      </div>
    </header>
  );
}
