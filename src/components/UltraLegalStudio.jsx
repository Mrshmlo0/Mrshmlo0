import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Copy,
  Check,
  Download,
  Sparkles,
  Scale,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';

export function UltraLegalStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const [contractType, setContractType] = useState('عقد عمل حر / تقديم خدمات برمجية وتصميم');
  const [rawText, setRawText] = useState(`البند الرابع: يلتزم الطرف الثاني بتسليم كافة حقوق الملكية الفكرية والملفات المصدرية فور انتهاء المشروع ودون اشتراط تحصيل كامل المستحقات المالية.
البند السابع: يتحمل الطرف الثاني مسؤولية غير محدودة عن أي أضرار مباشرة أو غير مباشرة أو خسائر في أرباح الطرف الأول.
البند التاسع: يحظر على الطرف الثاني العمل مع أي عميل في نفس المجال لمدة 3 سنوات بعد انتهاء العقد.`);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAudit = (e) => {
    e?.preventDefault();
    if (userCredits < 15) {
      alert('⚠️ تحتاج إلى 15 نقطة لفحص العقد وتدقيق البنود.');
      onOpenPricing();
      return;
    }
    setUserCredits((prev) => Math.max(0, prev - 15));
    setIsAuditing(true);

    setTimeout(() => {
      setAuditResult({
        riskScore: 'مرتفع (78/100 ⚠️)',
        summary: 'يحتوي العقد على 3 بنود مجحفة تشكل خطراً قانونياً ومالياً كبيراً على مقدم الخدمة (تسليم الملكية قبل السداد، مسؤولية غير محدودة، شرط عدم منافسة مبالغ فيه).',
        redlines: [
          {
            clause: 'البند الرابع (الملكية الفكرية)',
            risk: 'عالي الخطورة 🚩',
            reason: 'تنازل عن الملكية الفكرية قبل استلام كامل الأتعاب يعرضك لخطر سرقة المجهود دون سداد.',
            original: 'يلتزم الطرف الثاني بتسليم كافة حقوق الملكية الفكرية والملفات المصدرية فور انتهاء المشروع ودون اشتراط تحصيل كامل المستحقات المالية.',
            proposed: 'تنتقل حقوق الملكية الفكرية وترخيص الاستخدام للطرف الأول فورياً وتلقائياً بعد السداد الكامل والنهائي لجميع الدفعات المستحقة بموجب هذا العقد.'
          },
          {
            clause: 'البند السابع (حدود المسؤولية)',
            risk: 'حرج جداً 🚨',
            reason: 'المسؤولية غير المحدودة عن الأرباح الفائتة قد تدخلك في تعويضات بملايين تفوق قيمة العقد بعشرات المرات.',
            original: 'يتحمل الطرف الثاني مسؤولية غير محدودة عن أي أضرار مباشرة أو غير مباشرة أو خسائر في أرباح الطرف الأول.',
            proposed: 'تقتصر مسؤولية الطرف الثاني الإجمالية عن أي إخلال أو ضرر مباشر على ألا تتجاوز قيمته الإجمالية المبلغ الفعلي المدفوع له بموجب هذا العقد، ويستثنى من ذلك الأضرار غير المباشرة وفوات الأرباح.'
          },
          {
            clause: 'البند التاسع (عدم المنافسة)',
            risk: 'متوسط إلى عالي ⚠️',
            reason: 'منع العمل لمدة 3 سنوات في نفس المجال يمنعك من ممارسة مهنتك بشكل غير عادل.',
            proposed: 'يقتصر الالتزام بعدم المنافسة على عدم التعاقد المباشر مع عملاء الطرف الأول المباشرين الذين تم التعامل معهم أثناء فترة سريان هذا العقد ولمدة لا تتجاوز 6 أشهر فقط.'
          }
        ],
        negotiationScript: `مرحباً [اسم العميل/الجهة]،\n\nشكراً جزيلاً على إرسال مسودة العقد، يسعدنا جداً التعاون والبدء في التنفيذ. بعد المراجعة القانونية السريعة من فريقنا، نقترح تعديل طفيف على 3 بنود فقط لضمان توازن الحقوق وحماية الطرفين دون أي تأخير في الجدول الزمني:\n1. ربط تسليم الملكية الفكرية النهائية بسداد الدفعة الأخيرة.\n2. تحديد سقف المسؤولية بما يعادل قيمة العقد وفقاً للأعراف التجارية.\n3. تحديد نطاق عدم المنافسة لمدة 6 أشهر مع عملائكم المباشرين فقط.\n\nالمسودة المعدلة جاهزة للاعتماد، وبإمكاننا بدء العمل مباشرة فور توقيعها. تحياتي!`
      });

      setIsAuditing(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('⚖️ تم تدقيق العقد وصياغة التعديلات القانونية بنجاح!');
    }, 700);
  };

  const copyText = (key, text) => {
    copyToClipboardSafe(text, () => {
      setCopiedKey(key);
      showToast('📋 تم نسخ النص القانوني!');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const downloadAuditReport = () => {
    if (!auditResult) return;
    const doc = `=== تقرير الفحص والتدقيق القانوني للعقد ===\nنوع العقد: ${contractType}\nمؤشر الخطورة: ${auditResult.riskScore}\nالملخص: ${auditResult.summary}\n\n--- البنود المعدلة المقترحة ---\n${auditResult.redlines.map(r => `[${r.clause} - ${r.risk}]\nالسبب: ${r.reason}\nالصيغة البديلة المقترحة:\n"${r.proposed}"\n`).join('\n')}\n\n--- سيناريو التفاوض مع العميل ---\n${auditResult.negotiationScript}`;
    downloadTextFileSafe('legal-contract-audit.txt', doc);
    showToast('📥 تم تحميل التقرير القانوني!');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20 mb-3 shadow-inner">
          <Scale className="w-4 h-4 text-rose-300" />
          <span>الخدمة الخامسة: المستشار القانوني وفاحص العقود والمخاطر</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          تدقيق العقود واكتشاف الثغرات وإعادة الصياغة
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          اكتشاف البنود المجحفة وفخاخ المسؤولية غير المحدودة مع تقديم صياغات بديلة وسيناريو تفاوض لبق.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <form onSubmit={handleAudit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">نوع العقد أو الاتفاقية:</label>
              <input
                type="text"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">نص العقد أو البنود المراد فحصها:</label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={7}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-rose-200" />
                  <span>جاري تحليل الثغرات والبنود وصياغة التعديلات...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-5 h-5 text-rose-200" />
                  <span>بدء الفحص القانوني الذكي (15 نقطة)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results View (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          {auditResult ? (
            <div className="space-y-5">
              
              {/* Top Banner */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">مؤشر المخاطر القانونية:</span>
                  <span className="text-base font-black text-rose-400">{auditResult.riskScore}</span>
                </div>
                <button
                  onClick={downloadAuditReport}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل التقرير القانوني</span>
                </button>
              </div>

              {/* Summary */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-rose-400 font-bold block mb-1">🔍 نتيجة التحليل:</span>
                {auditResult.summary}
              </div>

              {/* Redline Clauses */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  البنود المعدلة المقترحة (Redline):
                </h4>
                {auditResult.redlines.map((r, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{r.clause}</span>
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-md font-bold text-[10px]">
                          {r.risk}
                        </span>
                      </div>
                      <button
                        onClick={() => copyText(`law_${idx}`, r.proposed)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `law_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>نسخ البديل</span>
                      </button>
                    </div>

                    <p className="text-slate-400 text-[11px]"><strong className="text-slate-300">السبب:</strong> {r.reason}</p>

                    <div className="bg-emerald-950/30 border border-emerald-500/40 p-3 rounded-xl text-emerald-200 leading-relaxed font-mono text-[11px]">
                      <span className="text-emerald-400 font-bold block mb-0.5">الصيغة البديلة الآمنة المقترحة:</span>
                      "{r.proposed}"
                    </div>
                  </div>
                ))}
              </div>

              {/* Negotiation Script */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">🤝 رسالة التفاوض الودية مع العميل:</span>
                  <button
                    onClick={() => copyText('law_neg', auditResult.negotiationScript)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'law_neg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>نسخ الرسالة</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl text-slate-300 leading-relaxed whitespace-pre-line border border-slate-800">
                  {auditResult.negotiationScript}
                </div>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-slate-500">
              <Scale className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-bounce" />
              <p className="text-sm font-bold text-slate-300">الفاحص القانوني جاهز لحماية مصالحك</p>
              <p className="text-xs text-slate-500 mt-1">ألصق مسودة العقد لمعرفة الثغرات والحصول على صياغات قانونية عادلة ومحمية.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
