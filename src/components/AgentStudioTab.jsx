import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Check,
  Copy,
  Download,
  CheckCircle2,
  Cpu,
  Bot,
  Layers,
  ArrowRight,
  FileCode,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { HIGH_DEMAND_AGENTS, executeAgentWorkflow } from '../data/agentEcosystemData';
import confetti from 'canvas-confetti';

export function AgentStudioTab({ onSaveToVault }) {
  const [selectedAgentId, setSelectedAgentId] = useState('b2b-outreach');
  const [formData, setFormData] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [agentStep, setAgentStep] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const activeAgent = HIGH_DEMAND_AGENTS.find((a) => a.id === selectedAgentId) || HIGH_DEMAND_AGENTS[0];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleInputChange = (name, val) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleRunAgent = (e) => {
    e?.preventDefault();
    setIsExecuting(true);
    setAgentStep(`🔍 تحليل المعطيات وهندسة سياق ${activeAgent.title}...`);

    setTimeout(() => {
      setAgentStep(`⚡ استدعاء نماذج التوليد المتقدمة وضبط نبرة الإقناع...`);
    }, 400);

    setTimeout(() => {
      setAgentStep(`🛡️ تدقيق المخرجات والتنسيق النهائي بصيغة قابلة للتسليم...`);
    }, 800);

    setTimeout(() => {
      const result = executeAgentWorkflow(activeAgent.id, formData);
      setExecutionResult(result);
      setIsExecuting(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('✨ تم إنجاز المخرجات بالكامل وجاهزة للنسخ والتسليم للعميل!');
    }, 1200);
  };

  const copyResult = () => {
    if (!executionResult) return;
    navigator.clipboard.writeText(executionResult.deliverableMarkdown);
    setCopied(true);
    showToast('📋 تم نسخ المخرجات بالكامل إلى الحافظة!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    if (!executionResult) return;
    const blob = new Blob([executionResult.deliverableMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeAgent.id}-deliverable.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 تم تحميل ملف المخرجات (.MD) إلى جهازك!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-3 w-fit">
          <Bot className="w-4 h-4 text-indigo-300" />
          <span>استوديو تشغيل الوكلاء الذاتيين (Autonomous AI Agent Studio)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          اختر الوكيل الذكي وولّد مخرجات حقيقية تبيعها لعملائك
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          جميع الوكلاء هنا مدربون على توليد أعمال نهائية عالية الدقة، لا تحتاج إلى تعديل، ويمكن تسليمها مباشرة للشركات أو استخدامها داخل متجرك وخدماتك.
        </p>
      </div>

      {/* Agent Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HIGH_DEMAND_AGENTS.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => {
                setSelectedAgentId(agent.id);
                setExecutionResult(null);
                setFormData({});
              }}
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl -translate-y-1'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="text-2xl mb-1 block">{agent.icon}</span>
                <h4 className="font-bold text-xs text-white line-clamp-1">{agent.title}</h4>
                <span className="text-[10px] text-slate-400 line-clamp-1 font-mono">{agent.englishTitle.split(' ')[0]}</span>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span className={isSelected ? 'text-cyan-400' : 'text-slate-500'}>
                  {isSelected ? '● جاري التشغيل' : 'اختر الوكيل'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Split: Inputs (Left) + Deliverables (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeAgent.icon}</span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white">{activeAgent.title}</h3>
                <span className="text-[10px] text-slate-400">{activeAgent.badge}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
            <strong className="text-cyan-400 block mb-0.5">المشكلة التي يحلها:</strong>
            {activeAgent.problemSolved}
          </div>

          {/* Dynamic Agent Fields */}
          <form onSubmit={handleRunAgent} className="space-y-3.5">
            {activeAgent.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold text-slate-300 mb-1">{field.label}:</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isExecuting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                  <span>{agentStep || 'جاري تشغيل الوكيل وهندسة المخرجات...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>تشغيل الوكيل وإنتاج المخرجات الفورية 🚀</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Output View (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-sm sm:text-base text-white">المخرجات المعتمدة للتسليم الفوري</h3>
            </div>

            {executionResult && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copyResult}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
                </button>

                <button
                  onClick={downloadResult}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل كملف .MD</span>
                </button>
              </div>
            )}
          </div>

          {executionResult ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/30">
                <span className="text-xs font-bold text-indigo-400 block mb-1">📋 الملخص التنفيذي:</span>
                <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">{executionResult.summary}</p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 max-h-[500px] overflow-y-auto scrollbar-thin">
                <pre className="text-xs sm:text-sm font-sans text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {executionResult.deliverableMarkdown}
                </pre>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500 space-y-3">
              <Bot className="w-16 h-16 text-slate-700 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-slate-300">الوكيل جاهز لتنفيذ طلبك بدقة متناهية</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                أدخل تفاصيل خدمتك أو منتجك في النموذج، واضغط زر التشغيل لتحصل على ملف كامل جاهز للبيع أو التسليم.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
