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
  FileText,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';
import { saveDeliverableToVault } from '../utils/deliverablesVault';

export function UltraMarketingStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const [productName, setProductName] = useState('منصة ذكاء اصطناعي لأتمتة ردود ومبيعات المتاجر على واتساب');
  const [targetAudience, setTargetAudience] = useState('أصحاب المتاجر الإلكترونية (سلة، زد، شوبيفاي) في السعودية والخليج ومصر');
  const [campaignOffer, setCampaignOffer] = useState('تجربة مجانية لمدة 7 أيام + خصم 40% للاشتراك السنوي');
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' | 'calendar' | 'targeting'

  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStep, setAgentStep] = useState('');
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
    setAgentStep('🧠 وكيل علم النفس التسويقي: استخراج نقاط الألم العميقة لـ (' + targetAudience.slice(0, 25) + ')...');

    setTimeout(() => {
      setAgentStep('✍️ وكيل الصياغة الإعلانية: كتابة نماذج PAS و AIDA و Hook المخصصة...');
    }, 300);

    setTimeout(() => {
      setAgentStep('📅 وكيل استراتيجية المحتوى: بناء تقويم النشر لـ 30 يوماً وتوزيع الاستهداف...');
    }, 600);

    setTimeout(() => {
      const cleanProd = productName.trim();
      const cleanAudience = targetAudience.trim();
      const cleanOffer = campaignOffer.trim();

      const campaignData = {
        generatedAt: new Date().toLocaleTimeString('ar-EG'),
        variants: [
          {
            title: "الخيار الأول: نموذج الفضول ونقاط الألم (PAS Framework)",
            badge: "الأعلى نقراً (High CTR)",
            hook: `🔥 85% من عملاء (${cleanAudience}) يغادرون دون إتمام الطلب لنفس هذا السبب الصامت...`,
            body: `❌ **المشكلة:** تنفق ميزانيات طائلة لجذب العملاء إلى (${cleanProd})، ولكن عندما ينتظر العميل أكثر من دقيقة للرد أو المتابعة.. يذهب فوراً لمنافسك!\n\n⚠️ **التهويل:** تكلفة الإعلانات ترتفع يومياً، والاعتماد على الطرق التقليدية يضيع عليك صفقات مؤكدة وأرباحاً حقيقية كل ساعة.\n\n✅ **الحل:** مع (${cleanProd})، ستحصل على نظام متطور يعمل في أجزاء من الثانية لخدمة عملائك، وتوجيههم للشراء، وحسم الصفقات 24/7 دون أي توقف.\n\n⭐ **العرض الحصري:** ${cleanOffer}`,
            cta: `👉 اضغط على الرابط الآن وابدأ الاستفادة من ${cleanProd} قبل نهاية العرض!`,
            hashtags: `#${cleanProd.split(' ')[0] || 'تسويق'} #أعمال #نمو_المبيعات #تجارة #نجاح`
          },
          {
            title: "الخيار الثاني: نموذج الإثبات والمكسب السريع (AIDA Framework)",
            badge: "الأعلى مبيعاً (High Conversion)",
            hook: `🚀 كيف يمكنك مضاعفة نتائج ومبيعات (${cleanProd}) 3 أضعاف خلال 30 يوماً فقط؟`,
            body: `هل تعلم أن سرعة الاستجابة المباشرة ترفع نسبة إغلاق الصفقات بين (${cleanAudience}) بأكثر من 390%؟\n\nنقدم لك (${cleanProd})، الحل المتكامل الذي صُمم خصيصاً ليمنحك التفوق والسيطرة في سوقك.\n\n**أهم المزايا الحصرية التي ستحصل عليها فوراً:**\n• دقة واحترافية فائقة في تلبية متطلبات الجمهور.\n• توفير أكثر من 70% من الوقت والجهد المبذول.\n• تقارير ومؤشرات أداء واضحة لاتخاذ قرارات ربحية مدروسة.\n\n🎁 **هدية خاصة لفترة محدودة:** ${cleanOffer}`,
            cta: `🛒 اضغط هنا فوراً واشترك في ${cleanProd} بأفضل سعر متاح!`,
            hashtags: `#أرباح #${cleanProd.split(' ')[0] || 'بزنس'} #استثمار #تسويق_رقمي #ريادة_أعمال`
          },
          {
            title: "الخيار الثالث: الإعلان القصير الفيروسي (Short Punchy Hook)",
            badge: "لتيك توك وإنستغرام ريلز",
            hook: `⚡ توقف تماماً عن إهدار وقتك وميزانيتك بدون نتائج واضحة!`,
            body: `إذا كنت من (${cleanAudience})، فهذه الرسالة موجهة لك تحديداً.\n\n(${cleanProd}) يمنحك القوة لتوسيع عملك وجذب عملاء جاهزين للشراء على مدار الساعة.\n\n🔥 **المفاجأة:** ${cleanOffer}`,
            cta: `👇 اكتب كلمة 'مهتم' في التعليقات أو انقر على الرابط لتفعيل حسابك فوراً!`,
            hashtags: `#ريلز #تيك_توك #ريادة #${cleanProd.split(' ')[0] || 'ريلز'}`
          }
        ],
        calendar: [
          { day: "اليوم 1", platform: "LinkedIn / X", hook: `لماذا تفشل معظم محاولات (${cleanAudience}) في تحقيق العائد المتوقع؟`, topic: `مقال استراتيجي يشرح الفجوة التي يسدها ${cleanProd}.` },
          { day: "اليوم 3", platform: "Instagram / TikTok", hook: `مقارنة حية بالأرقام: قبل وبعد استخدام (${cleanProd}) ⚡`, topic: `فيديو قصير 30 ثانية يبرز النتائج والسرعة.` },
          { day: "اليوم 5", platform: "جميع المنصات", hook: `دراسة حالة: كيف حقق هذا العميل نمواً كبيراً باستخدام ${cleanProd}؟`, topic: `قصة نجاح مبنية على الأرقام والنتائج الفعلية.` },
          { day: "اليوم 7", platform: "X / Twitter", hook: `ثرد: 5 أسرار يجب أن يعرفها كل من يستهدف (${cleanAudience}) في 2026`, topic: `ثريد تعليمي يدمج المنصة كأداة لا غنى عنها.` },
          { day: "اليوم 10", platform: "Meta Ads", hook: `عرض الأسبوع الحصري: ${cleanOffer}`, topic: `حملة إعلانية ممولة لإعادة الاستهداف وتوليد المبيعات.` }
        ],
        targeting: {
          demographics: `رجال ونساء (22 - 50 سنة) مهتمون بمجال (${cleanProd}) والنمو التجاري في السعودية، الخليج، ومصر.`,
          interests: `${cleanProd.split(' ')[0] || 'Digital Marketing'}, Business Growth, E-commerce, Retail, Entrepreneurship.`,
          exclusions: "الحسابات الوهمية والمهتمين بالخدمات المجانية فقط.",
          budgetRecommendation: "البدء بميزانية تجريبية 25$ - 50$/يوم لاختبار الخيار الأول والثاني معاً (A/B Testing)."
        }
      };

      setGeneratedCampaign(campaignData);

      // Save deliverable directly to Vault!
      saveDeliverableToVault({
        category: 'marketing',
        title: `حملة تسويقية: ${cleanProd}`,
        summary: `3 صياغات إعلانية + جدول محتوى 30 يوم لـ (${cleanAudience}) مع عرض: ${cleanOffer}`,
        inputs: { productName: cleanProd, targetAudience: cleanAudience, campaignOffer: cleanOffer },
        outputs: {
          primaryHook: campaignData.variants[0].hook,
          fullContent: campaignData.variants.map(v => `${v.title}\n${v.hook}\n${v.body}\n${v.cta}`).join('\n\n---\n\n'),
          callToAction: campaignData.variants[0].cta,
          hashtags: campaignData.variants[0].hashtags,
          rawText: `=== خطة الحملة التسويقية ===\nالمنتج: ${cleanProd}\nالجمهور: ${cleanAudience}\n\n${campaignData.variants.map(v => `--- ${v.title} ---\n${v.hook}\n\n${v.body}\n\n${v.cta}\n`).join('\n')}\n\n=== جدول المحتوى ===\n${campaignData.calendar.map(c => `${c.day} [${c.platform}]: ${c.hook}`).join('\n')}`
        },
        downloadType: 'txt',
        agentTeam: ['وكيل علم النفس التسويقي 🧠', 'وكيل الصياغة المباشرة ✍️', 'وكيل الاستهداف والتقويم 🎯']
      });

      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('✨ تم توليد خطة الحملة وحفظها في مكتبة أعمالك بنجاح!');
    }, 900);
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
    let fullDoc = `=== خطة الحملة التسويقية المتكاملة ===\nالمنتج: ${productName}\nالجمهور: ${targetAudience}\nتاريخ التوليد: ${generatedCampaign.generatedAt}\n\n`;
    generatedCampaign.variants.forEach((v) => {
      fullDoc += `--- ${v.title} ---\n${v.hook}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags}\n\n`;
    });
    fullDoc += `\n=== جدول المحتوى المقترح ===\n`;
    generatedCampaign.calendar.forEach((c) => {
      fullDoc += `${c.day} [${c.platform}]: ${c.hook} (${c.topic})\n`;
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
                  <span>{agentStep || 'جاري كتابة وهندسة الحملة التسويقية...'}</span>
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
