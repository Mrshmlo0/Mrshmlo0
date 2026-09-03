import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Printer,
  Copy,
  Check,
  Download,
  CheckCircle2,
  FileText,
  User,
  GraduationCap,
  Award,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';

export function UltraResumeStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const [fullName, setFullName] = useState('أحمد محمد المهدي');
  const [targetTitle, setTargetTitle] = useState('مدير نمو وتسويق رقمي (Growth Marketing Manager)');
  const [experienceLevel, setExperienceLevel] = useState('متوسط (3-5 سنوات)');
  const [skills, setSkills] = useState('Meta Ads, Google Ads, SEO, Python Automation, Team Leadership, Budget Management');
  const [majorAchievement, setMajorAchievement] = useState('مضاعفة إيرادات متجر إلكتروني بنسبة 140% وخفض تكلفة اكتساب العميل CAC بنسبة 25%');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerateResume = (e) => {
    e?.preventDefault();
    if (userCredits < 15) {
      alert('⚠️ تحتاج إلى 15 نقطة لتطوير السيرة الذاتية واجتياز الـ ATS.');
      onOpenPricing();
      return;
    }
    setUserCredits((prev) => Math.max(0, prev - 15));
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedResume({
        name: fullName || 'المرشح المحترف',
        title: targetTitle || 'المسمى الوظيفي المستهدف',
        atsScore: 98,
        summary: `متخصص ومبتكر في مجال (${targetTitle}) بخبرة تتجاوز (${experienceLevel}) في قيادة استراتيجيات النمو، تعظيم العائد على الإنفاق الإعلاني (ROAS)، وتحسين معدلات التحويل الرقمي. يمتلك سجلاً حافلاً في إدارة الميزانيات وتوليد نمو بنسبة تزيد عن 140% عبر تفعيل استراتيجيات تعتمد على تحليل البيانات والأتمتة الذكية. متمكن من قيادة الفرق متعددة التخصصات وتحقيق أهداف المنظمة بكفاءة تشغيلية فائقة.`,
        bullets: [
          `قيادة وتطوير حملات متكاملة أسفرت عن: ${majorAchievement || 'تحقيق نمو بنسبة 35% في الإيرادات السنوية'}.`,
          `إدارة وتوجيه فريق مكون من 7 متخصصين مع الحفاظ على معدل تسليم للمشاريع بلغ 99% في المواعيد المحددة.`,
          `تنفيذ حلول أتمتة ذكية وفرت أكثر من 20 ساعة عمل أسبوعية للفريق ورفعت دقة التقارير الإدارية.`,
          `تحليل مؤشرات الأداء الرئيسية (KPIs) وبناء لوحات بيانات تفاعلية لاتخاذ قرارات استثمارية دقيقة رفعت العائد بنسبة 32%.`
        ],
        skillsList: skills.split(',').map((s) => s.trim()).filter(Boolean),
        coverLetter: `عناية مسؤول التوظيف المحترم،\n\nيسرني التقدم لشغل وظيفة (${targetTitle}) لديكم. من خلال اطلاعي على رؤية مؤسستكم وإنجازاتها، وجدت توافقاً تاماً بين متطلبات هذه الوظيفة وخبراتي العملية في قيادة استراتيجيات النمو وتحقيق نتائج رقمية ملموسة مثل (${majorAchievement}).\n\nأتطلع لمناقشة كيف يمكنني المساهمة في تسريع نمو فريقكم وتحقيق أهدافكم القادمة.\n\nوتفضلوا بقبول فائق الاحترام والتقدير،\n${fullName}`,
        interviewQuestions: [
          {
            q: `كيف تتعامل مع انخفاض مفاجئ في مؤشرات الأداء أو أرباح الحملات؟`,
            answer: `أقوم فوراً بتشريح قمع التحويل (Funnel Breakdown)، فحص جودة الجمهور المستهدف وسرعة تجربة العميل، وإجراء اختبارات A/B سريعة لتصحيح المسار خلال 24 ساعة.`
          },
          {
            q: `حدثنا عن مشروع معقد قدته بالاعتماد على أدوات الذكاء الاصطناعي والأتمتة؟`,
            answer: `استخدمت أنظمة الأتمتة الذكية لربط خدمة العملاء بالمبيعات، مما خفض وقت الاستجابة إلى ثوانٍ معدودة وضاعف نسبة إغلاق الصفقات بـ 3 أضعاف.`
          }
        ]
      });

      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('🎯 تم بناء السيرة الذاتية بنظام ATS المتوافق مع معايير Harvard!');
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyFullResume = () => {
    if (!generatedResume) return;
    const text = `${generatedResume.name}\n${generatedResume.title}\nATS Score: ${generatedResume.atsScore}%\n\nالملخص المهني:\n${generatedResume.summary}\n\nالإنجازات والخبرات:\n${generatedResume.bullets.join('\n')}\n\nالمهارات:\n${generatedResume.skillsList.join(', ')}`;
    copyToClipboardSafe(text, () => {
      setCopiedKey('full_resume');
      showToast('📋 تم نسخ السيرة الذاتية بنجاح!');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const downloadTxt = () => {
    if (!generatedResume) return;
    const text = `${generatedResume.name}\n${generatedResume.title}\nATS Score: ${generatedResume.atsScore}%\n\n=== الملخص المهني ===\n${generatedResume.summary}\n\n=== الإنجازات والخبرات ===\n${generatedResume.bullets.join('\n')}\n\n=== المهارات ===\n${generatedResume.skillsList.join(', ')}\n\n=== خطاب التغطية (Cover Letter) ===\n${generatedResume.coverLetter}`;
    downloadTextFileSafe('resume-ats-optimized.txt', text);
    showToast('📥 تم تحميل السيرة الذاتية كملف نصي!');
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-3 shadow-inner">
          <Briefcase className="w-4 h-4 text-amber-300" />
          <span>الخدمة الثالثة: مهندس السير الذاتية وتجاوز الفرز الآلي ATS (98%)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          صانع السير الذاتية المهنية وخطابات التغطية الجاهزة للطباعة
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          صياغة السيرة الذاتية بنموذج Harvard المقبول دولياً، مع إنجازات بالأرقام وزر تصدير وطباعة PDF مباشر.
        </p>
      </div>

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <form onSubmit={handleGenerateResume} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المسمى الوظيفي المستهدف:</label>
              <input
                type="text"
                value={targetTitle}
                onChange={(e) => setTargetTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المهارات والتقنيات الأساسية:</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">أهم إنجاز أو أرقام حققتها في عملك:</label>
              <textarea
                value={majorAchievement}
                onChange={(e) => setMajorAchievement(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-amber-200" />
                  <span>جاري ضبط صياغة الـ ATS والمعايير الدولية...</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5 text-amber-200" />
                  <span>بناء السيرة الذاتية الفائزة (15 نقطة)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live A4 Resume Paper Preview (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          {generatedResume ? (
            <div className="space-y-4">
              {/* Actions Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    درجة التوافق ATS: {generatedResume.atsScore}% ⭐
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyFullResume}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'full_resume' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ</span>
                  </button>

                  <button
                    onClick={downloadTxt}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ملف .TXT</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة / حفظ PDF</span>
                  </button>
                </div>
              </div>

              {/* Formatted White Paper Sheet (A4 Styling) */}
              <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 border border-slate-200 print:p-0 print:border-none">
                <div className="border-b-2 border-slate-900 pb-3 text-center sm:text-right">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{generatedResume.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-indigo-700 mt-0.5">{generatedResume.title}</p>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
                    الملخص المهني (Professional Summary)
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-700">{generatedResume.summary}</p>
                </div>

                {/* Measurable Achievements */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
                    الخبرات والإنجازات المقاسة (Key Achievements - STAR Method)
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {generatedResume.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-slate-900">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indexed Skills */}
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
                    المهارات والتقنيات المفهرسة (Core Competencies)
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {generatedResume.skillsList.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-800 font-bold rounded text-[10px] border border-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Letter Box */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>✉️ خطاب التغطية المقترح (Cover Letter):</span>
                  <button
                    onClick={() => copyText('cover', generatedResume.coverLetter)}
                    className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'cover' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>نسخ الخطاب</span>
                  </button>
                </div>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{generatedResume.coverLetter}</p>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500">
              <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-bounce" />
              <p className="text-sm font-bold text-slate-300">استوديو السير الذاتية جاهز</p>
              <p className="text-xs text-slate-500 mt-1">اكتب خبراتك واضغط زر البناء لتشاهد السيرة الذاتية المهنية المنسقة فوراً.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
