import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Users, Server, PieChart, Sparkles, ArrowLeft, ArrowUpRight } from 'lucide-react';

export function RevenueCalculator({ onOpenBlueprint }) {
  const [starterCount, setStarterCount] = useState(60);
  const [proCount, setProCount] = useState(35);
  const [agencyCount, setAgencyCount] = useState(8);

  const [starterPrice, setStarterPrice] = useState(19);
  const [proPrice, setProPrice] = useState(49);
  const [agencyPrice, setAgencyPrice] = useState(149);

  // Estimated API & Hosting Cost per user
  const starterApiCost = 2.0; // ~$2 per 1000 credits
  const proApiCost = 6.0;    // ~$6 per 3500 credits
  const agencyApiCost = 22.0; // ~$22 per 15000 credits
  const hostingCost = 50;    // Fixed base server/database cost ($50/mo)

  // Calculations
  const starterRevenue = starterCount * starterPrice;
  const proRevenue = proCount * proPrice;
  const agencyRevenue = agencyCount * agencyPrice;

  const totalSubscribers = starterCount + proCount + agencyCount;
  const monthlyRevenue = starterRevenue + proRevenue + agencyRevenue;
  const annualRevenue = monthlyRevenue * 12;

  const totalApiCost = (starterCount * starterApiCost) + (proCount * proApiCost) + (agencyCount * agencyApiCost);
  const totalMonthlyCost = totalApiCost + hostingCost;

  const netMonthlyProfit = Math.max(0, monthlyRevenue - totalMonthlyCost);
  const netAnnualProfit = netMonthlyProfit * 12;
  const profitMargin = monthlyRevenue > 0 ? Math.round((netMonthlyProfit / monthlyRevenue) * 100) : 0;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-4">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>محاكاة الأرباح وعائد الاستثمار الواقعي</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          حاسبة الدخل الشهري المتكرر (MRR) وصافي الأرباح
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          حرّك المؤشرات أدناه وشاهد كيف يتحول مشروع الـ AI SaaS الخاص بك إلى ماكينة تدفق نقدي بأعلى هوامش ربح ممكنة.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders / Inputs Panel */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-8 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              تحديد أعداد المشتركين في كل باقة
            </h3>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full font-mono">
              إجمالي العملاء: {totalSubscribers} مشترك
            </span>
          </div>

          {/* Starter Plan Slider */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                مشتركو باقة البداية (${starterPrice}/شهر):
              </span>
              <span className="font-mono font-extrabold text-blue-400 text-lg">{starterCount} عميل</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={starterCount}
              onChange={(e) => setStarterCount(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>0</span>
              <span>الدخل المتولد: <strong className="text-white">${starterRevenue.toLocaleString()}/شهر</strong></span>
              <span>500</span>
            </div>
          </div>

          {/* Pro Plan Slider */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-indigo-500/30">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                مشتركو باقة المحترفين (${proPrice}/شهر) - الأعلى طلباً:
              </span>
              <span className="font-mono font-extrabold text-indigo-400 text-lg">{proCount} عميل</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={proCount}
              onChange={(e) => setProCount(Number(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>0</span>
              <span>الدخل المتولد: <strong className="text-white">${proRevenue.toLocaleString()}/شهر</strong></span>
              <span>300</span>
            </div>
          </div>

          {/* Agency Plan Slider */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                مشتركو باقة الوكالات والشركات (${agencyPrice}/شهر):
              </span>
              <span className="font-mono font-extrabold text-purple-400 text-lg">{agencyCount} عميل</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={agencyCount}
              onChange={(e) => setAgencyCount(Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>0</span>
              <span>الدخل المتولد: <strong className="text-white">${agencyRevenue.toLocaleString()}/شهر</strong></span>
              <span>100</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold block">سيناريوهات نمو جاهزة للاختبار السريع:</span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setStarterCount(25);
                  setProCount(10);
                  setAgencyCount(2);
                }}
                className="py-2 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-colors text-center cursor-pointer"
              >
                🌱 مرحلة الإطلاق (37 عميل)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStarterCount(120);
                  setProCount(60);
                  setAgencyCount(15);
                }}
                className="py-2 px-3 bg-slate-950 hover:bg-slate-800 text-indigo-300 text-xs font-bold rounded-xl border border-indigo-500/30 transition-colors text-center cursor-pointer"
              >
                🚀 مرحلة التوسع (195 عميل)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStarterCount(350);
                  setProCount(180);
                  setAgencyCount(45);
                }}
                className="py-2 px-3 bg-slate-950 hover:bg-slate-800 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/30 transition-colors text-center cursor-pointer"
              >
                👑 مرحلة الهيمنة (575 عميل)
              </button>
            </div>
          </div>
        </div>

        {/* Financial Results Display Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Profit Card */}
          <div className="relative rounded-3xl p-7 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/60 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">النتائج المالية المتوقعة</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                هامش ربح صافي: {profitMargin}%
              </span>
            </div>

            {/* Monthly Net Profit Big Display */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">صافي أرباحك الشهرية (Net Profit):</span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono mt-1 tracking-tight">
                ${Math.round(netMonthlyProfit).toLocaleString()}
                <span className="text-base text-slate-400 font-normal mr-2">/ شهرياً</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                ما يعادل تقريباً: <span className="text-white font-bold">{(Math.round(netMonthlyProfit) * 3.75).toLocaleString()} ريال سعودي</span> / <span className="text-white font-bold">{(Math.round(netMonthlyProfit) * 49).toLocaleString()} جنيه مصري</span>
              </p>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">إجمالي الدخل الشهري المتكرر (MRR):</span>
                <span className="text-white font-bold font-mono text-sm">${monthlyRevenue.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 text-rose-300">
                <span className="text-slate-400 flex items-center gap-1">
                  <Server className="w-3.5 h-3.5 text-rose-400" /> تكلفة الـ API وسيرفرات الاستضافة:
                </span>
                <span className="font-bold font-mono text-sm">-${Math.round(totalMonthlyCost).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-2">
                <span className="text-slate-400">صافي الأرباح السنوية (ARR Profit):</span>
                <span className="text-emerald-400 font-bold font-mono text-base">${Math.round(netAnnualProfit).toLocaleString()} / سنة</span>
              </div>
            </div>

            {/* Valuation / Exit Value */}
            <div className="mt-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-indigo-300 font-bold">
                <span>القيمة السوقية للبيع (SaaS Valuation):</span>
                <span className="text-amber-300 font-mono text-sm font-extrabold">
                  ${Math.round(netAnnualProfit * 4).toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                بناءً على مضاعف بيع 4x لصافي الأرباح السنوية على منصات الاستحواذ العالمية (Acquire.com).
              </p>
            </div>
          </div>

          {/* Quick CTA to Blueprint */}
          <button
            onClick={() => onOpenBlueprint('pricing')}
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>كيف تحافظ على هذه النسبة وتمنع استنزاف التكاليف؟</span>
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
          </button>

        </div>

      </div>

    </section>
  );
}
