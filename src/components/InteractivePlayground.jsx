import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Briefcase,
  TrendingUp,
  ShoppingBag,
  FileText,
  Copy,
  Check,
  Send,
  RotateCcw,
  Download,
  Flame,
  Zap,
  Wand2,
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  generateCopywriterOutput,
  generateResumeOutput,
  generateSeoOutput,
  generateEcommerceOutput,
  generateDocumentAnalysisOutput
} from '../data/aiToolsData';

export function InteractivePlayground({ initialTool = 'copywriter', userCredits, setUserCredits, onOpenPricing }) {
  const [activeTool, setActiveTool] = useState(initialTool);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState(null);

  // Copywriter State
  const [copyPlatform, setCopyPlatform] = useState('linkedin');
  const [copyDialect, setCopyDialect] = useState('fusha');
  const [copyTopic, setCopyTopic] = useState('منصة ذكاء اصطناعي تتيح لأصحاب المتاجر أتمتة الرد على العملاء ومضاعفة المبيعات');
  const [copyAudience, setCopyAudience] = useState('تجار التجزئة وأصحاب المتاجر الإلكترونية في العالم العربي');
  const [copyOutput, setCopyOutput] = useState(null);

  // Resume State
  const [resumeTitle, setResumeTitle] = useState('مدير تسويق رقمي وأتمتة ذكية (Growth & Automation Manager)');
  const [resumeLevel, setResumeLevel] = useState('متوسط (3-5 سنوات)');
  const [resumeSkills, setResumeSkills] = useState('Meta Ads, Google Ads, SEO, Python Automation, Customer Retention, Analytics');
  const [resumeOutput, setResumeOutput] = useState(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'مرحباً بك! أنا مساعد المبيعات والدعم الذكي لمتجر "إلكترو تك". كيف يمكنني مساعدتك اليوم في اختيار أفضل المنتجات أو متابعة طلبك؟ 🚀',
      time: 'الآن'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // SEO State
  const [seoKeyword, setSeoKeyword] = useState('أفضل أدوات الذكاء الاصطناعي للتجارة الإلكترونية 2026');
  const [seoNiche, setSeoNiche] = useState('التجارة الإلكترونية والدروب شيبينج');
  const [seoOutput, setSeoOutput] = useState(null);

  // Ecommerce State
  const [ecomName, setEcomName] = useState('ماكينة صنع القهوة المختصة الذكية بلمسة واحدة');
  const [ecomCategory, setEcomCategory] = useState('أجهزة المنزل والمطبخ الذكي');
  const [ecomBenefit, setEcomBenefit] = useState('تحكم عبر الهاتف بالواي فاي، طحن حبوب القهوة بدرجات مخصصة، وضغط 19 بار احترافي');
  const [ecomPrice, setEcomPrice] = useState('499 ريال / 129$');
  const [ecomOutput, setEcomOutput] = useState(null);

  // Document Analyzer State
  const [docType, setDocType] = useState('اتفاقية تقديم خدمات تقنية وتطوير برمجيات');
  const [docContent, setDocContent] = useState('يتعهد الطرف الثاني بتسليم التطبيق خلال 60 يوماً. يتم دفع 50% مقدماً و50% عند الاستلام. يتجدد العقد تلقائياً ما لم يتم الإخطار قبل 60 يوماً. الشرط الجزائي عند التأخير هو 20% من إجمالي قيمة العقد.');
  const [docOutput, setDocOutput] = useState(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('تم نسخ النص إلى الحافظة بنجاح! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const deductCredits = (amount = 10) => {
    if (userCredits < amount) {
      showToast('⚠️ لقد نفدت نقاطك التجريبية! يرجى ترقية باقتك لمتابعة الاستخدام.');
      return false;
    }
    setUserCredits((prev) => Math.max(0, prev - amount));
    return true;
  };

  // Handlers
  const handleGenerateCopy = () => {
    if (!deductCredits(10)) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateCopywriterOutput({
        platform: copyPlatform,
        dialect: copyDialect,
        topic: copyTopic,
        targetAudience: copyAudience
      });
      setCopyOutput(res);
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      showToast('✨ تم توليد المحتوى الإعلاني بنجاح! (استهلكت 10 نقاط)');
    }, 700);
  };

  const handleGenerateResume = () => {
    if (!deductCredits(15)) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateResumeOutput({
        jobTitle: resumeTitle,
        experienceLevel: resumeLevel,
        skills: resumeSkills
      });
      setResumeOutput(res);
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      showToast('🎯 تم تحسين السيرة الذاتية وتجهيز أسئلة المقابلة! (15 نقطة)');
    }, 700);
  };

  const handleSendChatMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: 'الآن' }]);
    setChatInput('');

    if (!deductCredits(5)) return;

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('سعر') || lower.includes('بكم') || lower.includes('تكلفة') || lower.includes('خصم')) {
        reply = `يسعدنا استفسارك! 🎁 لدينا حالياً عرض خاص بخصم 25% مع كود "PRO2026". كما نوفر شحن مجاني لجميع الطلبات التي تتجاوز 150 ريال. هل ترغب في إتمام الطلب الآن؟`;
      } else if (lower.includes('شحن') || lower.includes('توصيل') || lower.includes('متى')) {
        reply = `يتم التوصيل خلال 24 إلى 48 ساعة داخل المدن الرئيسية، مع إمكانية التتبع المباشر للشحنة عبر الرسائل القصيرة. 📦`;
      } else if (lower.includes('ضمان') || lower.includes('استرجاع')) {
        reply = `جميع منتجاتنا مشمولة بضمان ذهبي لمدة سنتين كاملتين مع استبدال فوري وسياسة استرجاع خلال 14 يوماً بدون أي تعقيد. ✨`;
      } else {
        reply = `أهلاً بك! لقد فهمت طلبك تماماً بخصوص "${userMsg}". يسعدني تزويدك بكافة التفاصيل وتأكيد رغبتك في حجز المنتج أو تحويلك لمستشار المبيعات مباشرة. ما هو رقم هاتفك أو بريدك للتواصل السريع؟`;
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply, time: 'الآن' }]);
    }, 600);
  };

  const handleGenerateSeo = () => {
    if (!deductCredits(20)) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateSeoOutput({
        mainKeyword: seoKeyword,
        targetNiche: seoNiche
      });
      setSeoOutput(res);
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      showToast('📈 تم توليد خطة ومقال السيو الاحترافي! (20 نقطة)');
    }, 700);
  };

  const handleGenerateEcommerce = () => {
    if (!deductCredits(10)) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateEcommerceOutput({
        productName: ecomName,
        productCategory: ecomCategory,
        targetBenefit: ecomBenefit,
        price: ecomPrice
      });
      setEcomOutput(res);
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      showToast('🛍️ تم إنشاء أوصاف وخطافات البيع للمنتج! (10 نقاط)');
    }, 700);
  };

  const handleGenerateDocument = () => {
    if (!deductCredits(25)) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateDocumentAnalysisOutput({
        docType: docType,
        docContent: docContent
      });
      setDocOutput(res);
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      showToast('⚖️ تم تحليل العقد والمستند وكشف المخاطر! (25 نقطة)');
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-indigo-500/50 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="text-sm font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>بيئة العمل التفاعلية الحية (Live Interactive SaaS Studio)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            استوديو تجربة وتوليد خدمات الذكاء الاصطناعي
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            جرّب بنفسك كيف تعمل الخدمات للمشتركين النهائيين وكيف تولد قيمة استثنائية تجعلهم يدفعون شهرياً.
          </p>
        </div>

        {/* Balance & Top up */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">رصيدك التجريبي الحالي</div>
            <div className="text-base font-extrabold text-emerald-400 font-mono">{userCredits} نقطة ائتمان</div>
          </div>
          <button
            onClick={onOpenPricing}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            شحن باقة
          </button>
        </div>
      </div>

      {/* Tools Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setActiveTool('copywriter')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'copywriter'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>صانع محتوى السوشيال والإعلانات</span>
        </button>

        <button
          onClick={() => setActiveTool('chatbot')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'chatbot'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Bot className="w-4 h-4 text-teal-300" />
          <span>شات بوت خدمة العملاء والمبيعات</span>
        </button>

        <button
          onClick={() => setActiveTool('resume')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'resume'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-300" />
          <span>مطور السير الذاتية والمقابلات (ATS)</span>
        </button>

        <button
          onClick={() => setActiveTool('seo')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'seo'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-pink-300" />
          <span>محرك مقالات السيو وتصدر جوجل</span>
        </button>

        <button
          onClick={() => setActiveTool('ecommerce')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'ecommerce'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-cyan-300" />
          <span>مساعد أوصاف المتاجر الإلكترونية</span>
        </button>

        <button
          onClick={() => setActiveTool('document')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTool === 'document'
              ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-rose-300" />
          <span>محلل وتلخيص العقود والملفات</span>
        </button>
      </div>

      {/* ================= TOOL 1: COPYWRITER ================= */}
      {activeTool === 'copywriter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                إعدادات صياغة المحتوى
              </h3>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold">
                10 نقاط / عملية
              </span>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">منصة النشر:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'linkedin', label: 'لينكد إن (احترافي)' },
                  { id: 'twitter', label: 'تويتر / X (ثرد وخطاف)' },
                  { id: 'facebook_ad', label: 'إعلان فيسبوك (AIDA)' },
                  { id: 'instagram', label: 'إنستغرام (تفاعلي)' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setCopyPlatform(p.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      copyPlatform === p.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dialect Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">اللهجة المستهدفة:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fusha', label: 'فصحى عصرية' },
                  { id: 'saudi', label: 'سعودية / خليجية' },
                  { id: 'egyptian', label: 'مصرية تفاعلية' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setCopyDialect(d.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      copyDialect === d.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">موضوع المنشور أو الخدمة:</label>
              <textarea
                value={copyTopic}
                onChange={(e) => setCopyTopic(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="اكتب عن ماذا تريد التحدث..."
              />
            </div>

            {/* Audience Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الجمهور المستهدف:</label>
              <input
                type="text"
                value={copyAudience}
                onChange={(e) => setCopyAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="مثال: رواد الأعمال والمديرون التنفيذيون"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerateCopy}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>جاري الصياغة بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>توليد المحتوى الإعلاني فوراً</span>
                </>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm font-bold text-white">النتيجة المولدة بالذكاء الاصطناعي</span>
                </div>
                {copyOutput && (
                  <button
                    onClick={() => copyToClipboard(`${copyOutput.hooks[0]}\n\n${copyOutput.mainBody}\n\n${copyOutput.cta}\n\n${copyOutput.hashtags}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
                  </button>
                )}
              </div>

              {copyOutput ? (
                <div className="space-y-5">
                  {/* Hooks options */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-2">⚡ خيارات الخطافات الافتتاحية (Hooks):</span>
                    <ul className="space-y-2">
                      {copyOutput.hooks.map((h, i) => (
                        <li key={i} className="text-sm text-slate-200 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2">
                          <span className="text-indigo-400 font-bold font-mono">#{i + 1}</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main text */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 block mb-2">📝 متن المنشور المخصص:</span>
                    <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                      {copyOutput.mainBody}
                    </p>
                  </div>

                  {/* CTA & Hashtags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 block mb-1">🎯 الدعوة للإجراء (CTA):</span>
                      <p className="text-xs text-slate-300 font-medium">{copyOutput.cta}</p>
                    </div>
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-purple-400 block mb-1">🏷️ الهاشتاقات المقترحة:</span>
                      <p className="text-xs text-purple-300 font-medium font-mono">{copyOutput.hashtags}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <Wand2 className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
                  <p className="text-base font-bold text-slate-300">الاستوديو جاهز للتوليد</p>
                  <p className="text-xs text-slate-500 mt-1">اضغط على زر "توليد المحتوى الإعلاني" لترى السحر يحدث أمامك.</p>
                </div>
              )}
            </div>

            {copyOutput && (
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>اللهجة: <strong className="text-slate-200">{copyOutput.dialectLabel}</strong></span>
                <span>درجة الجاذبية: <strong className="text-emerald-400">{copyOutput.meta.estimatedScore}</strong></span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TOOL 2: CHATBOT SIMULATOR ================= */}
      {activeTool === 'chatbot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                بيانات البوت والتدريب
              </h3>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                5 نقاط / رسالة
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium">اسم المتجر / النشاط:</span>
                <p className="text-white font-bold text-sm mt-0.5">متجر إلكترو تك (ElectroTech Store)</p>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <span className="text-slate-400 font-medium">قاعدة المعرفة المدربة:</span>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  الأسعار، شروط الضمان الذهبي لسنتين، سياسة الشحن خلال 24-48 ساعة، كوبون الخصم الحصري (PRO2026).
                </p>
              </div>
              <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
                <span className="text-slate-400">القنوات المدعومة:</span>
                <span className="text-emerald-400 font-bold">WhatsApp + Web Chat</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-300 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                لماذا تدفع المتاجر 49$ شهرياً لهذا البوت؟
              </div>
              <p className="text-slate-300 leading-relaxed">
                لأنه يرد في أجزاء من الثانية 24 ساعة يومياً، ويمنع العميل من الذهاب لمنافس آخر أثناء انتظار الرد البشري.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">أسئلة مقترحة لاختبار البوت:</span>
              <div className="flex flex-wrap gap-2">
                {['ما هي كودات الخصم المتاحة؟', 'كم يستغرق الشحن والتوصيل؟', 'ما هي شروط الضمان؟'].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setChatInput(q);
                    }}
                    className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 p-2 rounded-xl border border-slate-800 transition-colors text-right cursor-pointer"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl flex flex-col h-[520px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>مساعد مبيعات إلكترو تك</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">متصل ومستعد للرد فورياً ⚡</div>
                </div>
              </div>

              <button
                onClick={() =>
                  setChatMessages([
                    {
                      sender: 'bot',
                      text: 'تمت إعادة ضبط المحادثة. أهلاً بك مجدداً في إلكترو تك! كيف أخدمك؟ 🌟',
                      time: 'الآن'
                    }
                  ])
                }
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 cursor-pointer transition-colors"
                title="إعادة ضبط المحادثة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {msg.sender === 'user' ? 'أنت' : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="اكتب سؤالك للشات بوت واضغط إرسال..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer transition-transform active:scale-95"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOOL 3: RESUME & ATS BUILDER ================= */}
      {activeTool === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                بيانات الوظيفة المستهدفة
              </h3>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 font-bold">
                15 نقطة / تحليل
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">المسمى الوظيفي المستهدف:</label>
              <input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">مستوى الخبرة:</label>
              <select
                value={resumeLevel}
                onChange={(e) => setResumeLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option>مبتدئ / خريج جديد (0-2 سنة)</option>
                <option>متوسط (3-5 سنوات)</option>
                <option>خبير / قيادي (6+ سنوات)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">المهارات والتقنيات الأساسية:</label>
              <textarea
                value={resumeSkills}
                onChange={(e) => setResumeSkills(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleGenerateResume}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>جاري تحليل وفحص الـ ATS...</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5 text-amber-200" />
                  <span>تحسين السيرة الذاتية والمقابلة</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl">
            {resumeOutput ? (
              <div className="space-y-5">
                {/* Score Banner */}
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-400 font-bold">درجة التوافق مع أنظمة الفرز (ATS Score):</div>
                    <div className="text-2xl font-extrabold text-white mt-0.5">{resumeOutput.score}% - ممتاز جداً</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(resumeOutput.optimizedSummary)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-xs font-bold rounded-xl border border-emerald-500/40 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>نسخ الملخص</span>
                  </button>
                </div>

                {/* Professional Summary */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-2">⭐ الملخص المهني المُحسّن:</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{resumeOutput.optimizedSummary}</p>
                </div>

                {/* Metric-driven Bullets */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-2">📊 نقاط إنجاز قابلة للقياس بالأرقام (STAR Method):</span>
                  <ul className="space-y-2">
                    {resumeOutput.bulletPoints.map((b, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interview Prep Questions */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-purple-400 block mb-2">🎯 أهم أسئلة المقابلة المتوقعة وكيف تجيب:</span>
                  <div className="space-y-3">
                    {resumeOutput.interviewPrep.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                        <div className="font-bold text-slate-100 mb-1">❓ {item.question}</div>
                        <div className="text-indigo-300">💡 <strong>نصيحة الإجابة:</strong> {item.tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
                <p className="text-base font-bold text-slate-300">أداة تأهيل السيرة الذاتية جاهزة</p>
                <p className="text-xs text-slate-500 mt-1">اضغط على الزر لتوليد سيرة ذاتية تفوز بالوظائف وأسئلة مقابلة ذكية.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TOOL 4: SEO ARTICLE ENGINE ================= */}
      {activeTool === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                إعدادات السيو والكلمات المفتاحية
              </h3>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30 font-bold">
                20 نقطة / مقال
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الكلمة المفتاحية الرئيسية:</label>
              <input
                type="text"
                value={seoKeyword}
                onChange={(e) => setSeoKeyword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">المجال / التخصص:</label>
              <input
                type="text"
                value={seoNiche}
                onChange={(e) => setSeoNiche(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleGenerateSeo}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>جاري بناء استراتيجية السيو...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5 text-purple-200" />
                  <span>توليد مقال وبنية السيو المتصدرة</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl">
            {seoOutput ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-purple-400 block mb-1">🏷️ العنوان الموصى به (Meta Title):</span>
                  <p className="text-sm font-bold text-white">{seoOutput.metaTitle}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-pink-400 block mb-1">📄 الوصف الجذاب لمحركات البحث (Meta Description):</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{seoOutput.metaDescription}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-2">📑 الهيكل وعناوين الفقرات (H2 & H3 Headings):</span>
                  <div className="space-y-1.5">
                    {seoOutput.headingsOutline.map((h, i) => (
                      <div key={i} className="text-xs text-slate-200 bg-slate-900 p-2 rounded-lg flex items-center gap-2">
                        <span className="text-purple-400 font-mono font-bold">H2</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">✍️ مقدمة المقال الجاذبة:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{seoOutput.introParagraph}</p>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
                <p className="text-base font-bold text-slate-300">محرك السيو جاهز للعمل</p>
                <p className="text-xs text-slate-500 mt-1">اضغط على زر التوليد للحصول على مخطط مقال يتصدر الصفحة الأولى في جوجل.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TOOL 5: ECOMMERCE DESCRIPTIONS ================= */}
      {activeTool === 'ecommerce' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                بيانات المنتج والمواصفات
              </h3>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
                10 نقاط / منتج
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">اسم المنتج:</label>
              <input
                type="text"
                value={ecomName}
                onChange={(e) => setEcomName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الميزة التنافسية أو الفائدة الأساسية:</label>
              <textarea
                value={ecomBenefit}
                onChange={(e) => setEcomBenefit(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">السعر والعرض:</label>
              <input
                type="text"
                value={ecomPrice}
                onChange={(e) => setEcomPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleGenerateEcommerce}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>جاري تحويل المواصفات لقصة بيع...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-cyan-200" />
                  <span>توليد وصف مقنع وعرض حصري</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl">
            {ecomOutput ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 block mb-2">⚡ عناوين مقترحة ترفع نسبة النقر (CTR):</span>
                  <div className="space-y-1.5">
                    {ecomOutput.catchyTitles.map((t, idx) => (
                      <div key={idx} className="text-xs sm:text-sm font-semibold text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-2">📖 قصة البيع العاطفية (Sales Copy):</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">{ecomOutput.salesCopy}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-2">✨ الفوائد المباشرة للعميل:</span>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    {ecomOutput.bulletBenefits.map((b, i) => (
                      <div key={i}>{b}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-amber-400 block mb-1">🔥 حافز الشراء الفوري (Urgency Hook):</span>
                  <p className="text-xs text-amber-200 font-bold">{ecomOutput.offerUrgency}</p>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
                <p className="text-base font-bold text-slate-300">مساعد التجارة الإلكترونية بانتظارك</p>
                <p className="text-xs text-slate-500 mt-1">اضغط على الزر لتحويل المنتجات العادية إلى عروض لا تقاوم للمشترين.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TOOL 6: DOCUMENT ANALYZER ================= */}
      {activeTool === 'document' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-400" />
                فحص العقود والتقارير
              </h3>
              <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-full border border-rose-500/30 font-bold">
                25 نقطة / تحليل
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">نوع المستند:</label>
              <input
                type="text"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">مقتطف العقد أو النص المراد تحليله:</label>
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={handleGenerateDocument}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin" />
                  <span>جاري قراءة وكشف بنود الخطر...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 text-rose-200" />
                  <span>فحص العقد واستخراج المخاطر</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-xl">
            {docOutput ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-rose-400 block mb-1">📋 الملخص التنفيذي السريع:</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{docOutput.executiveSummary}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-2">⚠️ تحليل المخاطر وبنود الحذر:</span>
                  <div className="space-y-2">
                    {docOutput.riskAnalysis.map((r, i) => (
                      <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{r.item}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                            {r.level}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{r.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-2">✅ خطوات العمل والتوصيات التفاوضية:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {docOutput.actionItems.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
                <p className="text-base font-bold text-slate-300">محلل المستندات جاهز</p>
                <p className="text-xs text-slate-500 mt-1">اضغط على زر الفحص لتشريح العقد وحمايتك من الشروط المجحفة.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
