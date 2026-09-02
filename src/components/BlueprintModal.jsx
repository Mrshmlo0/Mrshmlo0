import React, { useState } from 'react';
import { BLUEPRINT_SECTIONS } from '../data/blueprintData';
import { X, BookOpen, CheckCircle2, ChevronRight, Copy, Check, Download, Sparkles } from 'lucide-react';

export function BlueprintModal({ isOpen, onClose, initialSection = 'overview' }) {
  const [activeSectionId, setActiveSectionId] = useState(initialSection);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSection = BLUEPRINT_SECTIONS.find((s) => s.id === activeSectionId) || BLUEPRINT_SECTIONS[0];

  const handleCopySection = () => {
    navigator.clipboard.writeText(`${currentSection.title}\n\n${currentSection.summary}\n\n${currentSection.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                الدليل الاستراتيجي ودراسة الجدوى الشاملة للـ AI SaaS
              </h2>
              <p className="text-xs text-slate-400">دليلك الكامل لتحويل الذكاء الاصطناعي إلى مشروع اشتراكات شهري متكرر</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySection}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الفصل'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar + Main Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Chapters Sidebar */}
          <div className="w-full md:w-80 bg-slate-950/60 border-b md:border-b-0 md:border-l border-slate-800 p-4 overflow-y-auto space-y-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">فصول الدليل الشامل:</span>
            {BLUEPRINT_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full text-right p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                  activeSectionId === sec.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="truncate">
                  <span>{sec.title}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                  activeSectionId === sec.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {sec.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Reading Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-900/50">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                {currentSection.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {currentSection.title}
              </h3>
              <p className="text-sm text-slate-300 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                {currentSection.summary}
              </p>
            </div>

            {/* Formatted Markdown Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-loose space-y-4">
              {currentSection.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={i} className="text-lg font-bold text-indigo-300 mt-6 mb-2 border-b border-slate-800 pb-2">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h5 key={i} className="text-base font-bold text-emerald-400 mt-4 mb-2">
                      {paragraph.replace('#### ', '')}
                    </h5>
                  );
                }
                if (paragraph.startsWith('* ') || paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                  return (
                    <div key={i} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                      {paragraph.split('\n').map((line, lIdx) => (
                        <div key={lIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>').replace(/^[\*\d\.\s]+/, '') }} />
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <p key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
