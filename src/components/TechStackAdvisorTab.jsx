import React, { useState } from 'react';
import {
  Layers,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  HardDrive,
  Cloud,
  Check
} from 'lucide-react';
import { TECH_STACK_OPTIONS } from '../data/softwareResearchData';

export function TechStackAdvisorTab({ projectData, setProjectData }) {
  const currentStack = projectData.selectedTechStack || {};

  const handleSelectStack = (category, value) => {
    setProjectData((prev) => ({
      ...prev,
      selectedTechStack: {
        ...prev.selectedTechStack,
        [category]: value
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-3 w-fit">
          <Layers className="w-4 h-4" />
          <span>المرحلة الثانية: استراتيجية المعمارية وهندسة التقنيات (Tech Stack Architecture)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          اختيار الأدوات والتقنيات البرمجية لبناء البرنامج
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          حدد خيارات الواجهة الأمامية، الخادم الخلفي، وقواعد البيانات. قارن بين ميزات كل تقنية لتوفير الوقت والتكلفة وضمان سرعة التطوير.
        </p>
      </div>

      {/* Selected Architecture Blueprint Overview */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>معمارية البرنامج الحالية المختارة (Current Architecture Setup)</span>
          </h3>
          <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold">
            جاهزة للتطوير ⚡
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold block">1. الواجهة الأمامية (Frontend / Client):</span>
            <p className="text-sm font-bold text-cyan-300">{currentStack.platform || 'React + Vite'}</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold block">2. الخادم والمحرك الخلفي (Backend Engine):</span>
            <p className="text-sm font-bold text-indigo-300">{currentStack.backend || 'FastAPI / Node.js'}</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold block">3. طبقة حفظ البيانات (Database Layer):</span>
            <p className="text-sm font-bold text-emerald-300">{currentStack.database || 'PostgreSQL / SQLite'}</p>
          </div>
        </div>
      </div>

      {/* 1. Frontend Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-white">الواجهة الأمامية وبيئة العرض (Frontend Frameworks)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK_OPTIONS.frontend.map((f, idx) => {
            const isSelected = currentStack.platform?.includes(f.name.split(' ')[0]);
            return (
              <div
                key={idx}
                onClick={() => handleSelectStack('platform', f.name)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{f.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold mb-2">
                    {f.tag}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Backend Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-base text-white">الخادم الخلفي ومحرك العمليات (Backend Runtime / Language)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK_OPTIONS.backend.map((b, idx) => {
            const isSelected = currentStack.backend?.includes(b.name.split(' ')[0]);
            return (
              <div
                key={idx}
                onClick={() => handleSelectStack('backend', b.name)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{b.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold mb-2">
                    {b.tag}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Database Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base text-white">قاعدة البيانات والتخزين (Database & Storage Engine)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK_OPTIONS.database.map((d, idx) => {
            const isSelected = currentStack.database?.includes(d.name.split(' ')[0]);
            return (
              <div
                key={idx}
                onClick={() => handleSelectStack('database', d.name)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{d.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold mb-2">
                    {d.tag}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
