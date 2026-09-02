import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/blueprintData';
import { Check, Sparkles, Crown, Zap, Shield, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PricingSection({ onSelectPlan, onOpenBlueprint }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const handleChoosePlan = (plan) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onSelectPlan(plan);
  };

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-4">
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>باقات مدروسة لتحقيق أعلى عائد للعميل وأعلى ربح لك</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          هندسة الباقات والاشتراكات الشهرية
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          نموذج اشتراكات قائم على نظام النقاط الذكي (Credits-Based System) يحقق هوامش أرباح تتجاوز 85% مع توفير حماية كاملة ضد استنزاف التكاليف.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            دفع شهري
          </button>

          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>دفع سنوي</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold">
              وفر 20% + شهرين مجاناً
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const billingSuffix = billingCycle === 'annual' ? '/شهر (فاتورة سنوية)' : '/شهرياً';

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900/90 to-slate-900 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/20 lg:-translate-y-3'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/40 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {!plan.isPopular && (
                      <span className="text-xs text-slate-400 mt-0.5 inline-block">{plan.badge}</span>
                    )}
                  </div>
                  {plan.isPopular ? (
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <Crown className="w-5 h-5 text-amber-300" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white font-mono">${price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{billingSuffix}</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>يمنحك {plan.credits.toLocaleString()} نقطة ذكاء اصطناعي شهرياً</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 py-6 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">ما تتضمنه الباقة:</span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe Guarantee & Payment Logos Note */}
      <div className="mt-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">ضمان استرجاع الأموال لمدة 14 يوماً</div>
            <p className="text-xs text-slate-400 mt-0.5">
              يدعم التطبيق الدفع بـ Visa, MasterCard, Apple Pay, Mada, Fawry, و PayPal عبر بوابات مشفرة 100%.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenBlueprint('pricing')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
        >
          شرح هندسة التسعير والأرباح ↗
        </button>
      </div>

    </section>
  );
}
