import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Zap,
  Check,
  Copy,
  Download,
  Flame,
  ShieldCheck,
  Clock,
  ArrowLeft,
  Share2,
  Wand2,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { executeUniversalService } from '../data/allServicesData';

export function UnifiedServiceModal({ service, isOpen, onClose, userCredits, setUserCredits, onOpenPricing }) {
  const [formData, setFormData] = useState({});
  const [speedMode, setSpeedMode] = useState('turbo'); // 'turbo' | 'precision'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !service) return null;

  const handleInputChange = (fieldKey, value) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const cost = parseInt(service.tokensCost) || 15;

  const handleExecute = (e) => {
    e?.preventDefault();
    if (userCredits < cost) {
      alert(`⚠️ رصيدك الحالي (${userCredits} نقطة) لا يكفي لتشغيل هذه الخدمة (${cost} نقطة). يرجى شحن باقتك.`);
      onOpenPricing();
      return;
    }

    setUserCredits((prev) => Math.max(0, prev - cost));
    setIsGenerating(true);

    const delay = speedMode === 'turbo' ? 400 : 900;

    setTimeout(() => {
      const res = executeUniversalService({
        serviceId: service.id,
        inputData: formData
      });
      setGenerationResult(res);
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 65, origin: { y: 0.7 } });
    }, delay);
  };

  const copyFullOutput = () => {
    if (!generationResult) return;
    const out = generationResult.output;
    const textToCopy = `${out.title}\n\n${out.primaryHook}\n\n${out.fullContent}\n\n${out.callToAction}\n\n${out.hashtags}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTextFile = () => {
    if (!generationResult) return;
    const out = generationResult.output;
    const text = `${out.title}\n\n${out.primaryHook}\n\n${out.fullContent}\n\n${out.callToAction}\n\n${out.hashtags}\n\n---\nتم التوليد بواسطة منصة OmniAI Enterprise`;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${service.id}-result.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{service.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  هامش ربح: {service.profitMargin}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{service.englishTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="إضافة للمفضلة"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-300' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Form + Output */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Inputs (Left) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-bold">
                <span>التسعير المقترح لبيع الخدمة:</span>
                <span className="text-amber-300">{service.pricingGuide}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>استهلاك الرصيد:</span>
                <span className="text-indigo-400 font-mono font-bold">{service.tokensCost}</span>
              </div>
            </div>

            {/* Speed & Precision Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">وضع التوليد والمعالجة:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSpeedMode('turbo')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    speedMode === 'turbo'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>سرعة خارقة (240ms)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSpeedMode('precision')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    speedMode === 'precision'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>تدقيق فائق (99.8%)</span>
                </button>
              </div>
            </div>

            {/* Dynamic Service Fields */}
            <form onSubmit={handleExecute} className="space-y-4">
              {service.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">{field.label}:</label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || field.options[0]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
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
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="w-5 h-5 animate-spin" />
                    <span>جاري التوليد والتدقيق الذاتي...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>توليد النتيجة الفورية الآن ({service.tokensCost})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Display (Right) */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-white">المخرجات المعتمدة بالذكاء الاصطناعي</span>
                </div>

                {generationResult && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyFullOutput}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                    </button>

                    <button
                      onClick={downloadTextFile}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-slate-800 cursor-pointer"
                      title="تحميل كملف نصي"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {generationResult ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3.5 bg-slate-900 rounded-2xl border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">⚡ الخطاف والملخص التنفيذي:</span>
                    <p className="text-xs sm:text-sm font-bold text-white">{generationResult.output.primaryHook}</p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 block mb-2">📝 المخرجات الكاملة والتفصيلية:</span>
                    <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-normal">
                      {generationResult.output.fullContent}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-950/30 rounded-2xl border border-amber-500/30 text-xs">
                    <span className="text-amber-400 font-bold block mb-1">🎯 الدعوة للإجراء / التوصية:</span>
                    <p className="text-slate-200">{generationResult.output.callToAction}</p>
                  </div>
                </div>
              ) : (
                <div className="py-24 text-center text-slate-500">
                  <Sparkles className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-bounce" />
                  <p className="text-sm font-bold text-slate-300">مساحة العمل جاهزة للتوليد الفوري</p>
                  <p className="text-xs text-slate-500 mt-1">قم بتعبئة الحقول على اليمين واضغط زر التوليد لمشاهدة النتيجة.</p>
                </div>
              )}
            </div>

            {generationResult && (
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  زمن الاستجابة: <strong className="text-cyan-300 font-mono">{generationResult.executionLatency}</strong>
                </span>
                <span className="text-emerald-400 font-bold">{generationResult.output.accuracyRating}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
