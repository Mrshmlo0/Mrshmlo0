import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  Copy,
  Check,
  Download,
  Calendar,
  Layers,
  Target,
  Zap,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';

export function UltraMarketingStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const [productName, setProductName] = useState('منصة ذكاء اصطناعي لأتمتة ردود ومبيعات المتاجر على واتساب');
  const [targetAudience, setTargetAudience] = useState('أصحاب المتاجر الإلكترونية (سلة، زد، شوبيفاي) في السعودية والخليج ومصر');
  const [campaignOffer, setCampaignOffer] = useState('تجربة مجانية لمدة 7 أيام + خصم 40% للاشتراك السنوي');
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' | 'calendar' | 'targeting'

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerateCampaign = (e) => {
    e?.preventDefault();
    if (userCredits < 15) {
      alert('⚠️ تحتاج إلى 15 نقطة لتوليد الحملة التسويقية المتكاملة.');
      onOpenPricing();
      return;
    }
    setUserCredits((prev) => Math.max(0, prev - 15));
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedCampaign({
        generatedAt: new Date().toLocaleTimeString('ar-EG'),
        variants: [
          {
            title: "الخيار الأول: نموذج الفضول والألم (PAS Framework)",
            badge: "الأعلى نقراً (High CTR)",
            hook: "🔥 85% من عملاء متجرك يغادرون دون شراء لنفس هذا السبب الصامت...",
            body: `❌ **المشكلة:** تنفق آلاف الريالات على الإعلانات، ولكن عندما يرسل العميل استفساراً على واتساب وينتظر أكثر من دقيقة.. يذهب فوراً لمنافسك!\n\n⚠️ **التهويل:** تكلفة الإعلانات ترتفع يومياً، والرد اليدوي يضيع عليك صفقات مؤكدة كل ساعة.\n\n✅ **الحل:** مع ${productName}، يحصل متجرك على بوت مبيعات ذكي يرد في أجزاء من الثانية، يوصي بالمنتجات، ويغلق الطلبات 24 ساعة يومياً بدون توقف!\n\n⭐ ${campaignOffer}`,
            cta: "👉 اضغط على الرابط الآن وابدأ تجربتك المجانية في أقل من دقيقة!",
            hashtags: "#تجارة_إلكترونية #متاجر_سلة #زد #شوبيفاي #زيادة_المبيعات"
          },
          {
            title: "الخيار الثاني: نموذج الإثبات الاجتماعي والمكسب (AIDA Framework)",
            badge: "الأعلى مبيعاً (High Conversion)",
            hook: "🚀 كيف ضاعف هذا المتجر مبيعاته 3 أضعاف في أول 30 يوماً؟",
            body: `هل تعلم أن الرد الفوري خلال 60 ثانية يرفع نسبة إغلاق الصفقات بنسبة 391%؟\n\nنقدم لك ${productName}، الحل الذي يثق به أكثر من 1,500 تاجر لأتمتة مبيعاتهم بالكامل.\n\n**أهم المزايا الحصرية:**\n• رد ذكي فوري بالأسعار ومواصفات المنتجات بلهجات محلية.\n• حفظ السلات المتروكة وتذكير العميل تلقائياً.\n• ربط سهل بضغطة زر واحدة مع متجرك.\n\n🎁 ${campaignOffer}`,
            cta: "🛒 اشترك الآن واستفد من العرض الحصري قبل نهاية الشهر!",
            hashtags: "#أتمتة_المتاجر #تسويق_ذكي #أرباح #توسع_الأعمال"
          },
          {
            title: "الخيار الثالث: الإعلان السريع المباشر (Short Punchy Hook)",
            badge: "لتيك توك وإنستغرام ريلز",
            hook: "⚡ توقف عن الرد اليدوي وإهدار وقتك في المبيعات!",
            body: `دع الذكاء الاصطناعي يبيع لعملائك على مدار الساعة وأنت نائم.\n\n${productName} يمنحك القوة لخدمة آلاف العملاء في نفس اللحظة بأعلى دقة واحترافية.\n\n🔥 ${campaignOffer}`,
            cta: "👇 اكتب كلمة 'تجربة' في التعليقات وسنرسل لك رابط التفعيل فوراً على الخاص!",
            hashtags: "#ريلز #تيك_توك #بزنس #أتمتة #ريادة_أعمال"
          }
        ],
        calendar: [
          { day: "اليوم 1", platform: "LinkedIn / X", hook: "لماذا تفشل 70% من الحملات الإعلانية في إغلاق الصفقات؟", topic: "مقال تعليمي يشرح أهمية سرعة الرد في التجارة الإلكترونية." },
          { day: "اليوم 3", platform: "Instagram / TikTok", hook: "مقارنة حية: الرد البشري البطيء مقابل روبوت الذكاء الاصطناعي ⚡", topic: "فيديو قصير 30 ثانية يوضح تجربة العميل السريعة." },
          { day: "اليوم 5", platform: "جميع المنصات", hook: "دراسة حالة: متجر عطور رفع مبيعاته 210% بكود خصم آلي!", topic: "قصة نجاح بالأرقام تثبت القيمة للعميل." },
          { day: "اليوم 7", platform: "X / Twitter", hook: "ثرد: 4 أدوات ذكاء اصطناعي يجب أن يمتلكها كل تاجر في 2026", topic: "ثرد مفصل يعرض المنصة كأداة أساسية." },
          { day: "اليوم 10", platform: "Meta Ads", hook: "عرض الأسبوع: احصل على 7 أيام مجاناً وجرب بنفسك!", topic: "حملة إعلانية ممولة لإعادة الاستهداف." }
        ],
        targeting: {
          demographics: "رجال ونساء (22 - 50 سنة) في السعودية، الإمارات، الكويت، مصر.",
          interests: "Shopify, Salla, Zid, Digital Marketing, E-commerce, Retail, Entrepreneurship.",
          exclusions: "المهتمين فقط بالمنتجات المجانية بدون بطاقات دفع.",
          budgetRecommendation: "البدء بـ 20$ - 50$/يوم لاختبار الخيار الأول والثاني معاً (A/B Testing)."
        }
      });

      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('✨ تم توليد خطة الحملة التسويقية المتكاملة بنجاح!');
    }, 600);
  };

  const copyText = (key, text) => {
    copyToClipboardSafe(text, () => {
      setCopiedKey(key);
      showToast('📋 تم نسخ النص بنجاح!');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const downloadFullCampaign = () => {
    if (!generatedCampaign) return;
    let fullDoc = `=== خطة الحملة التسويقية المتكاملة ===\nتاريخ التوليد: ${generatedCampaign.generatedAt}\n\n`;
    generatedCampaign.variants.forEach((v, i) => {
      fullDoc += `--- ${v.title} ---\n${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags}\n\n`;
    });
    fullDoc += `\n=== الجمهور والاستهداف ===\nالديموغرافيا: ${generatedCampaign.targeting.demographics}\nالاهتمامات: ${generatedCampaign.targeting.interests}\nالميزانية: ${generatedCampaign.targeting.budgetRecommendation}\n`;

    downloadTextFileSafe('marketing-campaign-full.txt', fullDoc);
    showToast('📥 تم تحميل ملف الحملة الكامل بنجاح!');
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-3 shadow-inner">
          <Megaphone className="w-4 h-4 text-blue-300" />
          <span>الخدمة الثانية: استوديو الحملات التسويقية المتكاملة</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          محرك صناعة الإعلانات والمحتوى التسويقي المقنع
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          توليد 3 نصوص إعلانات مختلفة الصيغ + جدول محتوى شهري + استراتيجية استهداف الجمهور مع زر تحميل التقرير الشامل.
        </p>
      </div>

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <form onSubmit={handleGenerateCampaign} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم المنتج أو الخدمة المعروضة:</label>
              <textarea
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الجمهور المستهدف ونقاط ألمهم:</label>
              <textarea
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">العرض الحصري أو الخصم (Offer):</label>
              <input
                type="text"
                value={campaignOffer}
                onChange={(e) => setCampaignOffer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                  <span>جاري كتابة وهندسة الحملة التسويقية...</span>
                </>
              ) : (
                <>
                  <Megaphone className="w-5 h-5 text-amber-300" />
                  <span>توليد الحملة الإعلانية المتكاملة (15 نقطة)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Tab View (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          {generatedCampaign ? (
            <div className="space-y-5">
              {/* Top Sub Tabs & Download */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('ads')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'ads' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3 نصوص إعلانية 🔥
                  </button>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'calendar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    جدول المحتوى 📅
                  </button>
                  <button
                    onClick={() => setActiveTab('targeting')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'targeting' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    الاستهداف 🎯
                  </button>
                </div>

                <button
                  onClick={downloadFullCampaign}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل كملف نصي</span>
                </button>
              </div>

              {/* Tab 1: 3 Ad Variants */}
              {activeTab === 'ads' && (
                <div className="space-y-4">
                  {generatedCampaign.variants.map((v, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">{v.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">{v.badge}</span>
                          <button
                            onClick={() => copyText(`ad_${idx}`, `${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags}`)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === `ad_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === `ad_${idx}` ? 'تم النسخ' : 'نسخ'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800">{v.hook}</div>
                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{v.body}</p>
                      <div className="text-xs font-bold text-amber-400">{v.cta}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{v.hashtags}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Content Calendar */}
              {activeTab === 'calendar' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 block mb-1">📅 خطة النشر المقترحة للحسابات:</span>
                  {generatedCampaign.calendar.map((c, i) => (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 font-bold font-mono text-[10px]">{c.day}</span>
                          <span className="text-slate-400 font-semibold">{c.platform}</span>
                        </div>
                        <div className="font-bold text-white mb-0.5">{c.hook}</div>
                        <div className="text-slate-400 text-[11px]">{c.topic}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Targeting Blueprint */}
              {activeTab === 'targeting' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">👥 الديموغرافيا والبلدان:</span>
                    <p className="text-white font-medium">{generatedCampaign.targeting.demographics}</p>
                  </div>
                  <div className="border-t border-slate-800 pt-2">
                    <span className="text-slate-400 font-bold block mb-0.5">🎯 الاهتمامات والكلمات الاستهدافية:</span>
                    <p className="text-indigo-300 font-mono">{generatedCampaign.targeting.interests}</p>
                  </div>
                  <div className="border-t border-slate-800 pt-2">
                    <span className="text-slate-400 font-bold block mb-0.5">💰 الميزانية والاستراتيجية الإعلانية:</span>
                    <p className="text-emerald-400 font-bold">{generatedCampaign.targeting.budgetRecommendation}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500">
              <Megaphone className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-bounce" />
              <p className="text-sm font-bold text-slate-300">استوديو الإعلانات جاهز للتوليد</p>
              <p className="text-xs text-slate-500 mt-1">اكتب بيانات منتجك واضغط زر التوليد للحصول على 3 صيغ إعلانية وجدول المحتوى.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
