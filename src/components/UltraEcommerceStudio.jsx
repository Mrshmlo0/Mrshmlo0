import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Copy,
  Check,
  Download,
  MessageCircle,
  TrendingUp,
  Zap,
  Package,
  Layers,
  CheckCircle2,
  Bot,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';
import { saveDeliverableToVault } from '../utils/deliverablesVault';

export function UltraEcommerceStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const [productName, setProductName] = useState('ماكينة صنع القهوة المقطرة الذكية بالواي فاي');
  const [productFeatures, setProductFeatures] = useState('تحكم بالهاتف، طحن حبوب القهوة بدرجات مخصصة، ضغط 19 بار، حفظ الحرارة 4 ساعات');
  const [productPrice, setProductPrice] = useState('299 ريال / 79$ (سعر العرض: 199 ريال)');
  const [targetAudience, setTargetAudience] = useState('عشاق القهوة المختصة، أصحاب العمل عن بعد، والمهتمين بالمنتجات الذكية');
  const [activeTab, setActiveTab] = useState('copy'); // 'copy' | 'whatsapp' | 'bundles' | 'objections'

  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStep, setAgentStep] = useState('');
  const [generatedSuite, setGeneratedSuite] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerate = (e) => {
    e?.preventDefault();
    if (userCredits < 15) {
      alert('⚠️ تحتاج إلى 15 نقطة لتوليد حزمة التجارة الإلكترونية.');
      onOpenPricing();
      return;
    }
    setUserCredits((prev) => Math.max(0, prev - 15));
    setIsGenerating(true);
    setAgentStep('🛍️ وكيل دراسة المنتج والمنافسين: فحص الميزات الفريدة ونقاط القوة...');

    setTimeout(() => {
      setAgentStep('✍️ وكيل التحويل النفسي: صياغة نصوص الإقناع وباقات التسعير المتدرجة...');
    }, 300);

    setTimeout(() => {
      setAgentStep('💬 وكيل محادثات الواتساب: هندسة تدفقات الإغلاق السريع ومعالجة الاعتراضات...');
    }, 600);

    setTimeout(() => {
      const cleanName = productName.trim() || 'المنتج المميز';
      const cleanFeatures = productFeatures.trim() || 'جودة فائقة، أداء سريع، وضمان موثوق';
      const cleanPrice = productPrice.trim() || '199 ريال';
      const cleanAudience = targetAudience.trim() || 'العملاء المستهدفين';

      const suiteObj = {
        title: cleanName,
        targetAudience: cleanAudience,
        salesCopy: {
          headline: `⚡ اكتشف الفخامة والراحة اليومية مع ${cleanName} - تجربة فريدة لا تُنسى!`,
          story: `هل سئمت من الحلول التقليدية وتبحث عن منتج يجمع بين الأداء الاحترافي والتصميم العصري؟\n\nنقدم لك ${cleanName}، الحل المبتكر المصمم خصيصاً لتلبية احتياجات (${cleanAudience}). بفضل المزايا الاستثنائية مثل (${cleanFeatures})، يمكنك الآن التمتع بأقصى درجات الراحة والجودة الفائقة دون أي عناء.\n\nلقد صُمم هذا المنتج ليوفر عليك الوقت والجهد، مع ضمان نتائج مبهرة من الاستخدام الأول.`,
          benefits: [
            `✨ **مزايا تقنية متطورة:** ${cleanFeatures.split('،')[0] || 'كفاءة تشغيلية فائقة وسهولة في الاستخدام'}.`,
            `🎯 **مصمم خصيصاً لاحتياجك:** يمنح (${cleanAudience}) تجربة استخدام سلسة ونتائج فورية.`,
            `⚡ **توفير الوقت والمال:** بديل عملي عالي الجودة يدوم طويلاً ويوفر التكاليف المتكررة.`,
            `🛡️ **ضمان ذهبي شامل:** تجربة خالية من المخاطر مع دعم فني مستمر واستبدال فوري.`
          ],
          urgency: `🔥 **عرض إطلاق استثنائي:** اطلب الآن بسعر حصري **${cleanPrice}** مع شحن سريع مجاني وضمان استرجاع كامل!`
        },
        whatsappFlow: [
          {
            step: '1. رسالة الترحيب والرد الذكي الفوري',
            text: `أهلاً بك يا غالي في متجرنا! 🌟\nسعداء جداً باهتمامك بـ (${cleanName}). هل تود معرفة تفاصيل العرض الحصري المخفض (${cleanPrice}) أم ترغب في المساعدة المباشرة؟`
          },
          {
            step: '2. توضيح المزايا وتأكيد السعر المخفض',
            text: `المنتج متوفر الآن بعرض خاص جداً: ${cleanPrice} فقط!\nيتميز بـ: ${cleanFeatures}.\nيشمل: شحن فوري مجاني + ضمان استبدال ذهبي.\n\nهل ترغب في حجز قطعتك قبل انتهاء كمية العرض؟ ⚡`
          },
          {
            step: '3. إغلاق الطلب وجمع بيانات الشحن',
            text: `ممتاز جداً، اختيار رائع! 📦\nلتأكيد الطلب وإرسال البوليصة فوراً، فضلاً زودنا بـ:\n• الاسم الكريم:\n• رقم الهاتف:\n• المدينة والحي:`
          },
          {
            step: '4. استعادة السلة المتروكة (بعد 2 ساعة)',
            text: `مرحباً بك مجدداً! 💡 لاحظنا أن طلبك لـ (${cleanName}) قيد الانتظار.\nحجزنا لك خصم إضافي خاص بكود (SAVE10) صالح لمدة 3 ساعات فقط! اضغط هنا لإتمام طلبك:`
          }
        ],
        bundles: [
          { tier: 'الباقة الفردية الأساسية', price: cleanPrice, note: 'قطعة واحدة من المنتج + الشحن السريع + الضمان المعتمد' },
          { tier: 'باقة التوفير (الأكثر مبيعاً ⭐)', price: 'وفر 30% مع قطعتين', note: 'قطعتين + ملحقات وهدايا إضافية + شحن مجاني VIP' },
          { tier: 'باقة المجموعات والشركات VIP', price: 'وفر 45% مع 4 قطع', note: 'حزمة كاملة بسعر الجملة + أولوية الدعم والضمان الممتد' }
        ],
        objections: [
          {
            objection: 'السعر يبدو مرتفعاً بعض الشيء',
            rebuttal: `نتفهم ذلك تماماً! مقارنة بالبدائل في السوق، (${cleanName}) يوفر لك الجودة العالية مع (${cleanFeatures}) مما يضمن استمراريته لسنوات وتوفير تكاليف الصيانة والاستبدال المستمر.`
          },
          {
            objection: 'هل هناك ضمان في حال وجود أي عيب مصنعي؟',
            rebuttal: `نعم، نوفر ضماناً ذهبياً شاملاً للاستبدال الفوري بدون أي تعقيدات، ورضاكم هو أولويتنا الأولى دائماً.`
          }
        ]
      };

      setGeneratedSuite(suiteObj);

      // Save deliverable directly to Vault!
      saveDeliverableToVault({
        category: 'ecommerce',
        title: `حزمة مبيعات: ${cleanName}`,
        summary: `صفحة بيع مقنعة + تدفق إغلاق واتساب + باقات تسعير لمنتج (${cleanName}) بسعر (${cleanPrice})`,
        inputs: { productName: cleanName, productFeatures, productPrice, targetAudience },
        outputs: {
          rawText: `=== حزمة مبيعات التجارة الإلكترونية ===\nالمنتج: ${cleanName}\nالسعر: ${cleanPrice}\n\n[العنوان الرئيسي]\n${suiteObj.salesCopy.headline}\n\n[القصة والفوائد]\n${suiteObj.salesCopy.story}\n\n${suiteObj.salesCopy.benefits.join('\n')}\n\n[عروض التسعير]\n${suiteObj.bundles.map(b => `${b.tier}: ${b.price} (${b.note})`).join('\n')}\n\n[تدفق الواتساب]\n${suiteObj.whatsappFlow.map(w => `${w.step}:\n${w.text}\n`).join('\n')}`
        },
        downloadType: 'txt',
        agentTeam: ['وكيل استراتيجية التحويل 🛍️', 'وكيل نصوص البيع المقنعة ✍️', 'وكيل أتمتة مبيعات الواتساب 💬']
      });

      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('🛍️ تم توليد حزمة المبيعات وحفظها في مكتبة أعمالك بنجاح!');
    }, 900);
  };

  const copyText = (key, text) => {
    copyToClipboardSafe(text, () => {
      setCopiedKey(key);
      showToast('📋 تم نسخ النص بنجاح!');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const downloadFullSuite = () => {
    if (!generatedSuite) return;
    const doc = `=== حزمة مبيعات التجارة الإلكترونية المتكاملة ===\nالمنتج: ${generatedSuite.title}\nالجمهور المستهدف: ${generatedSuite.targetAudience}\n\n--- صفحة البيع ---\n${generatedSuite.salesCopy.headline}\n\n${generatedSuite.salesCopy.story}\n\nالفوائد المباشرة:\n${generatedSuite.salesCopy.benefits.join('\n')}\n\n${generatedSuite.salesCopy.urgency}\n\n--- باقات التسعير ---\n${generatedSuite.bundles.map(b => `${b.tier} | ${b.price} | ${b.note}`).join('\n')}\n\n--- سيناريو واتساب المبيعات ---\n${generatedSuite.whatsappFlow.map(w => `${w.step}:\n${w.text}\n`).join('\n')}\n\n--- معالجة الاعتراضات الشائعة ---\n${generatedSuite.objections.map(o => `الاعتراض: ${o.objection}\nالرد المقنع: ${o.rebuttal}\n`).join('\n')}`;
    downloadTextFileSafe('ecommerce-conversion-suite.txt', doc);
    showToast('📥 تم تحميل ملف الحزمة كاملاً!');
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 mb-3 shadow-inner">
          <ShoppingBag className="w-4 h-4 text-cyan-300" />
          <span>الخدمة الرابعة: استوديو زيادة مبيعات المتاجر والواتساب</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          محرك قصة البيع وسيناريوهات واتساب للمتاجر
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          توليد صفحات بيع المنتجات المقنعة + تدفق محادثات واتساب لإغلاق الصفقات + عروض الـ Bundles لزيادة الأرباح.
        </p>
      </div>

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">اسم المنتج بالتحديد:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المواصفات والفوائد التنافسية:</label>
              <textarea
                value={productFeatures}
                onChange={(e) => setProductFeatures(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">الجمهور المستهدف:</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">السعر والعرض الحصري:</label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-cyan-200" />
                  <span>{agentStep || 'جاري كتابة قصة البيع وسيناريو الواتساب...'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-cyan-200" />
                  <span>توليد حزمة المبيعات المتكاملة (15 نقطة)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results View (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          {generatedSuite ? (
            <div className="space-y-4">
              {/* Tabs Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
                  <button
                    onClick={() => setActiveTab('copy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'copy' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    قصة البيع 🛍️
                  </button>
                  <button
                    onClick={() => setActiveTab('whatsapp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'whatsapp' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    بوت الواتساب 💬
                  </button>
                  <button
                    onClick={() => setActiveTab('bundles')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'bundles' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    باقات التسعير 📦
                  </button>
                  <button
                    onClick={() => setActiveTab('objections')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'objections' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ردود الاعتراضات 🛡️
                  </button>
                </div>

                <button
                  onClick={downloadFullSuite}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل كملف نصي</span>
                </button>
              </div>

              {/* Tab 1: Sales Copy */}
              {activeTab === 'copy' && (
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-cyan-500/30 font-bold text-white flex items-center justify-between">
                    <span>{generatedSuite.salesCopy.headline}</span>
                    <button
                      onClick={() => copyText('head', generatedSuite.salesCopy.headline)}
                      className="text-slate-400 hover:text-white ml-2 shrink-0 cursor-pointer"
                    >
                      {copiedKey === 'head' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                    {generatedSuite.salesCopy.story}
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                    <span className="text-cyan-400 font-bold block mb-1">✨ الفوائد المباشرة للمشتري:</span>
                    {generatedSuite.salesCopy.benefits.map((b, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">{b}</div>
                    ))}
                  </div>
                  <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs">
                    {generatedSuite.salesCopy.urgency}
                  </div>
                </div>
              )}

              {/* Tab 2: WhatsApp Flow */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-3">
                  {generatedSuite.whatsappFlow.map((w, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400">{w.step}</span>
                        <button
                          onClick={() => copyText(`wa_${idx}`, w.text)}
                          className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === `wa_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>نسخ</span>
                        </button>
                      </div>
                      <p className="text-slate-200 leading-relaxed bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 whitespace-pre-line">{w.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Bundles */}
              {activeTab === 'bundles' && (
                <div className="space-y-3">
                  {generatedSuite.bundles.map((b, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{b.tier}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{b.note}</div>
                      </div>
                      <span className="text-amber-400 font-black text-base font-mono">{b.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Objection Buster Matrix */}
              {activeTab === 'objections' && (
                <div className="space-y-3">
                  {generatedSuite.objections.map((o, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-bold text-rose-400">
                        <HelpCircle className="w-4 h-4" />
                        <span>الاعتراض: "{o.objection}"</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
                        <span className="text-emerald-400 font-bold block mb-1">💡 الرد المقترح للإغلاق:</span>
                        {o.rebuttal}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500">
              <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-bounce" />
              <p className="text-sm font-bold text-slate-300">مساعد المتاجر جاهز للعمل</p>
              <p className="text-xs text-slate-500 mt-1">اكتب مواصفات منتجك وسعره لتوليد قصة البيع وسيناريوهات واتساب فوراً.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
