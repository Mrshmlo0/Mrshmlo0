import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  BarChart3,
  Layers,
  Crown
} from 'lucide-react';
import { MARKET_RESEARCH_DATA, HIGH_DEMAND_AGENTS } from '../data/agentEcosystemData';

export function MarketResearchTab({ onSwitchToStudio, onSwitchToCalculator }) {
  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Executive Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 rounded-3xl p-6 sm:p-10 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-4 w-fit">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>دراسة الجدوى وأبحاث السوق العالمية والمحلية 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
          أين تكمن أعلى أرباح الذكاء الاصطناعي؟ وكيف تصنع ثروتك من هذا البرنامج؟
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {MARKET_RESEARCH_DATA.executiveOverview}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onSwitchToStudio}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all transform active:scale-95"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>تجربة الوكلاء الـ 6 مباشرة وتوليد المخرجات 🚀</span>
          </button>

          <button
            onClick={onSwitchToCalculator}
            className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>حاسبة الأرباح وتوقعات الإيرادات (MRR) 💰</span>
          </button>
        </div>
      </div>

      {/* 3 Core Winning Drivers */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-400" />
          <span>لماذا يُعد هذا البرنامج الأكثر طلباً واستعداداً للشراء الفوري؟</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MARKET_RESEARCH_DATA.whyThisBusinessModelWins.map((w, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-2 hover:border-blue-500/40 transition-colors"
            >
              <h4 className="font-bold text-sm sm:text-base text-white text-indigo-300 leading-snug">{w.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">{w.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The 6 High-Demand AI Agents Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>الوكلاء الـ 6 المضمنين في البرنامج وقيمتهم السوقية العالية</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              كل وكيل من هؤلاء يمثل بمفرده منتجاً يمكن بيعه أو تقديمه كخدمة مربحة.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGH_DEMAND_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-2xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{agent.icon}</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-mono">
                    مؤشر الطلب: {agent.marketDemandScore}% 🔥
                  </span>
                </div>

                <h4 className="font-bold text-base text-white mb-0.5">{agent.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono mb-2">{agent.englishTitle}</p>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 mb-3 text-xs">
                  <span className="text-slate-400 font-bold block">سعر الخدمة المتعارف عليه في السوق:</span>
                  <span className="text-emerald-400 font-black font-mono text-sm">{agent.typicalAgencyFee}</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <span className="text-indigo-400 font-bold block mb-1">المخرجات المسلمة للعميل:</span>
                  {agent.deliverables.slice(0, 2).map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-300">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{agent.badge}</span>
                <button
                  onClick={onSwitchToStudio}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>تشغيل الوكيل</span>
                  <ArrowRight className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Subscription Pricing Model */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
            نموذج التسعير المقترح لبيع الاشتراكات (SaaS Pricing Matrix)
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            باقات الاشتراكات الشهرية المقترحة لبرنامجك
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            تم ضبط هذه الأسعار بعناية لتكون في متناول المستقلين والشركات مع تحقيق هوامش ربح تتجاوز 90%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MARKET_RESEARCH_DATA.pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-950/70 to-slate-900 border-indigo-500 shadow-2xl ring-2 ring-indigo-500/40 relative'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] rounded-full shadow-lg">
                    الباقة الأكثر ربحية ومبيعاً ⭐
                  </span>
                )}

                <h4 className="font-bold text-base text-white">{plan.tier}</h4>
                <p className="text-xs text-slate-400 mt-1">{plan.bestFor}</p>

                <div className="my-5 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">{plan.priceMonthly}</span>
                    <span className="text-xs text-slate-400">/ شهرياً</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                    أو {plan.priceYearly} سنوياً (وفر شهرين مجاناً)
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-mono">{plan.credits}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Step Practical Sales Blueprint */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-amber-400" />
          <span>خطة المبيعات والانطلاق: كيف تصل إلى 10,000$ شهرياً خطوة بخطوة؟</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MARKET_RESEARCH_DATA.salesRoadmap.map((road, idx) => (
            <div key={idx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 bg-blue-600/20 text-cyan-300 rounded-lg text-xs font-mono font-bold">
                المرحلة {idx + 1}
              </span>
              <h4 className="font-bold text-sm text-white pt-1">{road.step}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{road.action}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
