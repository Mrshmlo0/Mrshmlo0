import React from 'react';
import {
  Cpu,
  Compass,
  Layers,
  ListTodo,
  FileCode,
  Download,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

export function Header({ activeTab, setActiveTab, onExportSRS, onResetResearch, projectData }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Project Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-white tracking-tight">
                Software Research Lab
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                مختبر الأبحاث وهندسة البرامج
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              {projectData?.projectName || 'دراسة وتخطيط المعمارية واختيار التقنيات للبرنامج الجديد'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('idea')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'idea'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            1. دراسة الفكرة والسوق
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. اختيار التقنيات والمعمارية
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'features'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            3. خصائص الـ MVP والمتطلبات
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'notebook'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            4. دفتر الملاحظات والتقرير
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportSRS}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
            title="تصدير وثيقة المواصفات البرمجية الكاملة"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تصدير وثيقة البحث (SRS)</span>
            <span className="sm:hidden">تصدير</span>
          </button>

          <button
            onClick={onResetResearch}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-800 transition-colors cursor-pointer"
            title="إعادة تعيين البحث"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Submenu Navigation */}
      <div className="lg:hidden px-4 pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-t border-slate-800/80 pt-2">
        <button
          onClick={() => setActiveTab('idea')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'idea' ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          1. دراسة الفكرة 💡
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'tech' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          2. التقنيات ⚙️
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'features' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          3. الخصائص 📋
        </button>
        <button
          onClick={() => setActiveTab('notebook')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
            activeTab === 'notebook' ? 'bg-emerald-600 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          4. الملاحظات 📝
        </button>
      </div>
    </header>
  );
}
