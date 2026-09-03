import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Bot,
  Calculator,
  Layers,
  Crown,
  DollarSign
} from 'lucide-react';

export function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('research')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-tight">
                NexusAI Hub
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-500/40">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              منظومة وكلاء الذكاء الاصطناعي الأكثر طلباً في سوق العمل والشركات
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'research'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            1. دراسة السوق والجدوى 📈
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/50'
                : 'text-cyan-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-300" />
            2. استوديو الوكلاء الـ 6 ⚡
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            3. حاسبة الأرباح و MRR 💰
          </button>

          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'blueprint'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            4. المعمارية التقنية والربط 🛠️
          </button>
        </nav>

        {/* Quick Launch CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer transform active:scale-95"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>تجربة الوكلاء الآن</span>
          </button>
        </div>
      </div>

      {/* Mobile Submenu Navigation */}
      <div className="lg:hidden px-4 pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-t border-slate-800/80 pt-2">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'research' ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          1. دراسة السوق 📈
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'studio' ? 'bg-cyan-600 text-white' : 'text-cyan-400 bg-slate-900 border border-cyan-500/30'
          }`}
        >
          2. الوكلاء الـ 6 ⚡
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          3. حاسبة الأرباح 💰
        </button>
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'blueprint' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          4. المعمارية 🛠️
        </button>
      </div>
    </header>
  );
}
