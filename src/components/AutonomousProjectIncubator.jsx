import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  Rocket,
  Code2,
  DollarSign,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  TrendingUp,
  Layers,
  ArrowLeft,
  Flame,
  Globe,
  Compass,
  FileCheck,
  ShieldAlert,
  Download,
  Archive
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AI_EXECUTIVE_AGENTS, incubateProjectIdea } from '../data/autonomousAgentsData';
import { copyToClipboardSafe, downloadTextFileSafe } from '../utils/clipboardAndDownload';
import { saveDeliverableToVault } from '../utils/deliverablesVault';

export function AutonomousProjectIncubator({ userCredits, setUserCredits, onOpenPricing }) {
  const [projectIdea, setProjectIdea] = useState('منصة أتمتة مبيعات ودعم عملاء المتاجر الإلكترونية عبر WhatsApp بالذكاء الاصطناعي مع تحليلات لحظية');
  const [targetRegion, setTargetRegion] = useState('السعودية والخليج ومصر');
  const [budgetTier, setBudgetTier] = useState('500$ - 2,000$ (ميزانية مرنة)');
  const [targetCustomer, setTargetCustomer] = useState('أصحاب المتاجر، الشركات الناشئة، والعيادات ومكاتب العقارات');

  const [isIncubating, setIsIncubating] = useState(false);
  const [incubationProgress, setIncubationProgress] = useState(0);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [incubatedResult, setIncubatedResult] = useState(null);
  const [activeTab, setActiveTab] = useState('strategy'); // 'strategy' | 'tech' | 'marketing' | 'finance' | 'checklist'
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const copyText = (key, text) => {
    copyToClipboardSafe(text, () => {
      setCopiedKey(key);
      showToast('📋 تم نسخ النص بنجاح!');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const downloadFullBlueprint = () => {
    if (!incubatedResult) return;
    const doc = `=== دراسة وهندسة المشروع الكاملة ===\nاسم المشروع: ${incubatedResult.projectName}\nالفكرة: ${projectIdea}\nالسوق المستهدف: ${targetRegion}\nالجمهور: ${targetCustomer}\nالميزانية: ${budgetTier}\nتاريخ الإنجاز: ${incubatedResult.generatedAt}\n\n--- 1. تقرير الاستراتيجية والميزة التنافسية (CSO) ---\n${incubatedResult.strategyReport.csoSummary}\n\nعرض القيمة: ${incubatedResult.strategyReport.valueProposition}\nالحصن التنافسي:\n${incubatedResult.strategyReport.competitiveMoat.join('\n')}\n\n--- 2. البنية البرمجية والكود (CTO) ---\nالهيكلية: ${incubatedResult.techBlueprint.architecture}\nزمن التطوير: ${incubatedResult.techBlueprint.estimatedDevTime}\nجداول البيانات:\n${incubatedResult.techBlueprint.dbTables.join('\n')}\n\nكود البداية:\n${incubatedResult.techBlueprint.starterCode}\n\n--- 3. خطة التسويق والانتشار (CMO) ---\nالخطاف الفيروسي: ${incubatedResult.marketingPlan.viralHook}\nنص الإعلان:\n${incubatedResult.marketingPlan.adCopyPAS}\n\nقنوات الاستحواذ:\n${incubatedResult.marketingPlan.channelsStrategy.join('\n')}\n\n--- 4. النموذج المالي والتدفق النقدي (CFO) ---\nصافي التدفق الشهري: ${incubatedResult.financialModel.netMonthlyCashflow}\nتقييم التخارج: ${incubatedResult.financialModel.exitValuationYear1}\n\n--- 5. خطة العمل التنفيذية (30 يوماً) ---\n${incubatedResult.actionChecklist.map(a => `[${a.day}]: ${a.task}`).join('\n')}`;
    downloadTextFileSafe('full-business-plan.txt', doc);
    showToast('📥 تم تحميل خطة المشروع كاملة!');
  };

  const handleStartIncubation = (e) => {
    e?.preventDefault();
    if (userCredits < 30) {
      alert('⚠️ تحتاج إلى 30 نقطة لتشغيل مجلس إدارة الذكاء الاصطناعي المتعدد. يرجى شحن باقتك.');
      onOpenPricing();
      return;
    }

    setUserCredits((prev) => Math.max(0, prev - 30));
    setIsIncubating(true);
    setIncubationProgress(10);
    setActiveAgentIndex(0);

    // Agent Simulation Steps
    setTimeout(() => {
      setActiveAgentIndex(1);
      setIncubationProgress(35);
    }, 400);

    setTimeout(() => {
      setActiveAgentIndex(2);
      setIncubationProgress(65);
    }, 800);

    setTimeout(() => {
      setActiveAgentIndex(3);
      setIncubationProgress(90);
    }, 1200);

    setTimeout(() => {
      const result = incubateProjectIdea({
        idea: projectIdea,
        country: targetRegion,
        budget: budgetTier,
        targetCustomer: targetCustomer
      });
      setIncubatedResult(result);
      setIncubationProgress(100);

      // Save deliverable directly to Vault!
      saveDeliverableToVault({
        category: 'startup',
        title: `دراسة مشروع: ${result.projectName}`,
        summary: `خطة عمل تنفيذية متكاملة لـ (${projectIdea.slice(0, 50)}...) مع البنية التقنية والنموذج المالي`,
        inputs: { projectIdea, targetRegion, budgetTier, targetCustomer },
        outputs: {
          rawText: `مشروع: ${result.projectName}\nالملخص: ${result.strategyReport.csoSummary}\nالتدفق النقدي: ${result.financialModel.netMonthlyCashflow}\nتقييم التخارج: ${result.financialModel.exitValuationYear1}`
        },
        downloadType: 'txt',
        agentTeam: ['كبير مسؤولي الاستراتيجية CSO', 'كبير مسؤولي التقنية CTO', 'كبير مسؤولي التسويق CMO', 'كبير مسؤولي المالية CFO']
      });

      setIsIncubating(false);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      showToast('🚀 تم تجسيد المشروع وحفظ الخطة الكاملة في مكتبة أعمالك!');
    }, 1600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-4 shadow-inner">
          <Brain className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>القدرات العقلية الشاملة للذكاء الاصطناعي: محرك تجسيد الأماني والمشاريع</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          حوّل أي فكرة مشروع إلى{' '}
          <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            خطة عمل تنفيذية متكاملة
          </span>{' '}
          بضغطة زر
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          يجمع هذا النظام الذكي فريقاً افتراضياً من كبار المسؤولين التنفيذيين (CSO, CTO, CMO, CFO) لتحليل فكرتك، برمجة بنيتها التقنية، بناء خطة إعلاناتها الفيروسية، وحساب أرباحها نحو حريتك المالية.
        </p>
      </div>

      {/* AI Board of Directors Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {AI_EXECUTIVE_AGENTS.slice(0, 4).map((agent, i) => (
          <div
            key={agent.id}
            className={`p-4 rounded-2xl border transition-all duration-300 ${
              isIncubating && activeAgentIndex === i
                ? 'bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-500/50 scale-105 shadow-xl shadow-indigo-500/20'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{agent.avatar}</span>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{agent.name.split(' - ')[0]}</div>
                <div className="text-[10px] text-slate-400">{agent.badge}</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 line-clamp-2">{agent.specialty}</div>
            <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isIncubating && activeAgentIndex === i ? 'يقوم بالمعالجة الآن...' : 'جاهز للتحليل'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-12 backdrop-blur-xl">
        <form onSubmit={handleStartIncubation} className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-indigo-400" />
              <span>بيانات المشروع أو الفكرة التي تريد تحقيقها</span>
            </h3>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-bold border border-indigo-500/30">
              30 نقطة ائتمان / دراسة كاملة
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              ما هي الفكرة أو الخدمة التي تحلم بإطلاقها؟ (اكتب بحرية وبأي أسلوب):
            </label>
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              placeholder="مثال: تطبيق ذكاء اصطناعي يساعد العيادات الطبية على جدولة المواعيد والرد على استفسارات المرضى..."
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold">أفكار مشاريع مربحة مقترحة:</span>
            {[
              'أداة تلخيص العقود وتحديد المخاطر القانونية للشركات الناشئة',
              'منصة أتمتة إعلانات TikTok و Instagram للمطاعم والكافيهات',
              'مساعد إلكتروني لكتابة السير الذاتية وتجاوز اختبارات ATS',
              'بوت مبيعات تلقائي لمتاجر سلة وزد لرفع معدل الشراء'
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setProjectIdea(p)}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              >
                ✨ {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">السوق أو المنطقة المستهدفة:</label>
              <input
                type="text"
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الجمهور المستهدف بالتفصيل:</label>
              <input
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الميزانية التقديرية للبدء:</label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option>أقل من 300$ (إطلاق متناهي الصغر - Lean MVP)</option>
                <option>500$ - 2,000$ (ميزانية انطلاق مرنة قياسية)</option>
                <option>3,000$ - 10,000$ (إطلاق قوي مع حملات مدفوعة)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isIncubating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
          >
            {isIncubating ? (
              <>
                <Brain className="w-6 h-6 animate-spin text-amber-300" />
                <span>جاري انعقاد مجلس إدارة الذكاء الاصطناعي وبناء المشروع ({incubationProgress}%)...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>إطلاق فريق الذكاء الاصطناعي وتجسيد المشروع فوراً 🚀</span>
              </>
            )}
          </button>
        </form>

        {/* Real-time Progress Bar */}
        {isIncubating && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span>المرحلة: {AI_EXECUTIVE_AGENTS[activeAgentIndex]?.name}</span>
              <span className="text-emerald-400 font-mono">{incubationProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${incubationProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Incubation Results Showcase */}
      {incubatedResult && (
        <div className="bg-slate-900/90 rounded-3xl border border-indigo-500/40 shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          {/* Result Banner Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم إنجاز دراسة وهندسة المشروع بالكامل بنجاح</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{incubatedResult.projectName}</h3>
              <p className="text-xs text-slate-300 mt-1">
                تاريخ التوليد: <span className="font-mono text-indigo-300">{incubatedResult.generatedAt}</span> | مؤشر الملائمة للسوق:{' '}
                <strong className="text-emerald-400">{incubatedResult.marketFit}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400">درجة الجاهزية للتنفيذ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{incubatedResult.strategicScore}/100</div>
              </div>

              <button
                onClick={downloadFullBlueprint}
                className="px-3.5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>تحميل كملف .TXT</span>
              </button>

              <button
                onClick={() =>
                  copyText(
                    'full_plan',
                    `دراسة مشروع: ${projectIdea}\n\nالاستراتيجية: ${incubatedResult.strategyReport.csoSummary}\n\nالنموذج المالي: ${incubatedResult.financialModel.netMonthlyCashflow}`
                  )
                }
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                {copiedKey === 'full_plan' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'full_plan' ? 'تم نسخ الخطة' : 'نسخ الخطة كاملة'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
            {[
              { id: 'strategy', label: '1. استراتيجية العمل والميزة التنافسية', icon: Compass },
              { id: 'tech', label: '2. البنية البرمجية والكود الجاهز', icon: Code2 },
              { id: 'marketing', label: '3. خطة الإعلانات والانتشار الفيروسي', icon: Rocket },
              { id: 'finance', label: '4. النموذج المالي وأرباح الـ MRR', icon: DollarSign },
              { id: 'checklist', label: '5. خطة الـ 30 يوماً التنفيذية', icon: FileCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            
            {/* 1. Strategy Tab */}
            {activeTab === 'strategy' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-2">🎯 تقرير كبير مسؤولي الاستراتيجية (CSO):</span>
                  <p className="text-sm text-slate-200 leading-relaxed">{incubatedResult.strategyReport.csoSummary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 block mb-2">✨ عرض القيمة الفريد (Value Proposition):</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{incubatedResult.strategyReport.valueProposition}</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-2">🛡️ الحصن التنافسي (Competitive Moats):</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {incubatedResult.strategyReport.competitiveMoat.map((m, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-500/20 text-xs text-slate-300 space-y-2">
                  <strong className="text-indigo-300 block">📊 تحليل المخاطر والفرص (SWOT Snippet):</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div><span className="text-emerald-400 font-bold">نقاط القوة:</span> {incubatedResult.strategyReport.swot.strengths}</div>
                    <div><span className="text-rose-400 font-bold">المخاطر وحلها:</span> {incubatedResult.strategyReport.swot.risks}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Tech Tab */}
            {activeTab === 'tech' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">الهيكلية البرمجية المقترحة:</span>
                    <p className="text-sm font-bold text-white mt-0.5">{incubatedResult.techBlueprint.architecture}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">الزمن المقدر للـ MVP:</span>
                    <p className="text-sm font-bold text-emerald-400">{incubatedResult.techBlueprint.estimatedDevTime}</p>
                  </div>
                </div>

                {/* Database tables */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-purple-400 block mb-3">🗄️ جداول قاعدة البيانات (Database Schema):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {incubatedResult.techBlueprint.dbTables.map((t, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900 rounded-xl text-xs font-mono text-slate-300 border border-slate-800">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Code */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400">api/execute/route.js (كود الربط المباشر مع الذكاء الاصطناعي)</span>
                    <button
                      onClick={() => copyText('code', incubatedResult.techBlueprint.starterCode)}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ الكود</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                    {incubatedResult.techBlueprint.starterCode}
                  </pre>
                </div>
              </div>
            )}

            {/* 3. Marketing Tab */}
            {activeTab === 'marketing' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-pink-400 block mb-1">🔥 الخطاف الإعلاني الفيروسي (Viral Hook):</span>
                  <p className="text-sm sm:text-base font-bold text-white">{incubatedResult.marketingPlan.viralHook}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-2">📝 نص الإعلان المقنع بصيغة PAS:</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {incubatedResult.marketingPlan.adCopyPAS}
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-3">🚀 قنوات الاستحواذ والتسويق السريع:</span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {incubatedResult.marketingPlan.channelsStrategy.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. Finance Tab */}
            {activeTab === 'finance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-400">باقة البداية ({incubatedResult.financialModel.starterTier.price})</div>
                    <div className="text-lg font-bold text-white mt-1">{incubatedResult.financialModel.starterTier.targetUsers} عميل</div>
                    <div className="text-xs text-blue-400 font-mono mt-0.5">{incubatedResult.financialModel.starterTier.expectedMRR}/شهرياً</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/30 text-center">
                    <div className="text-xs text-indigo-300 font-bold">باقة المحترفين ({incubatedResult.financialModel.proTier.price})</div>
                    <div className="text-lg font-bold text-white mt-1">{incubatedResult.financialModel.proTier.targetUsers} عميل</div>
                    <div className="text-xs text-indigo-400 font-mono mt-0.5">{incubatedResult.financialModel.proTier.expectedMRR}/شهرياً</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-purple-500/30 text-center">
                    <div className="text-xs text-purple-300 font-bold">باقة الشركات ({incubatedResult.financialModel.agencyTier.price})</div>
                    <div className="text-lg font-bold text-white mt-1">{incubatedResult.financialModel.agencyTier.targetUsers} عميل</div>
                    <div className="text-xs text-purple-400 font-mono mt-0.5">{incubatedResult.financialModel.agencyTier.expectedMRR}/شهرياً</div>
                  </div>
                </div>

                {/* Big Profit Box */}
                <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-950 to-slate-950 rounded-2xl border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">صافي التدفق النقدي الشهري المتوقع:</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                      الشهر الثالث فصاعداً
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    {incubatedResult.financialModel.netMonthlyCashflow}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                    <span>قيمة بيع المشروع بعد عام (Exit Valuation):</span>
                    <span className="text-amber-300 font-bold font-mono text-sm">{incubatedResult.financialModel.exitValuationYear1}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Action Checklist Tab */}
            {activeTab === 'checklist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">خطة الـ 30 يوماً من الصفر حتى أول دولار ربح:</span>
                </div>
                <div className="space-y-3">
                  {incubatedResult.actionChecklist.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                      <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-mono font-bold shrink-0">
                        {item.day}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 mt-0.5">{item.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
