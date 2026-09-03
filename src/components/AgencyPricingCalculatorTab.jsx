import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calculator,
  Crown,
  Sparkles,
  Users,
  Briefcase,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function AgencyPricingCalculatorTab() {
  const [subscribersCount, setSubscribersCount] = useState(120);
  const [avgSubPrice, setAvgSubPrice] = useState(79); // $79/mo
  const [agencyProjectsCount, setAgencyProjectsCount] = useState(8);
  const [avgProjectFee, setAvgProjectFee] = useState(650); // $650 per deliverable

  const [copiedPitch, setCopiedPitch] = useState(false);

  // Math calculations
  const saasMonthlyRevenue = subscribersCount * avgSubPrice;
  const agencyMonthlyRevenue = agencyProjectsCount * avgProjectFee;
  const totalMonthlyRevenue = saasMonthlyRevenue + agencyMonthlyRevenue;
  const totalAnnualRevenue = totalMonthlyRevenue * 12;

  // Estimated server and AI API costs (~8% of revenue)
  const estimatedApiCost = Math.round(totalMonthlyRevenue * 0.08);
  const netMonthlyProfit = totalMonthlyRevenue - estimatedApiCost;
  const profitMarginPercent = totalMonthlyRevenue > 0 ? Math.round((netMonthlyProfit / totalMonthlyRevenue) * 100) : 92;

  const pitchScript = `مرحباً [اسم العميل / صاحب المتجر / المدير التنفيذي]،

أعلم أنكم تسعون لزيادة المبيعات وخفض تكاليف التشغيل. نحن نقدم حلول أتمتة وخدمات ذكاء اصطناعي مخصصة ساعدت شركات مماثلة على تحقيق عائد استثماري يزيد عن 300% في أقل من 30 يوماً.

يسعدني أن أرسل لك نموذج عمل أولي مجاني ومخصص لشركتكم دون أي التزام. هل يناسبكم الاطلاع عليه؟

تحياتي،
[اسمك / شريك النمو والحلول الرقمية]`;

  const copyPitch = () => {
    navigator.clipboard.writeText(pitchScript);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-3 w-fit">
          <Calculator className="w-4 h-4" />
          <span>حاسبة الإيرادات والأرباح المتوقعة (MRR & Agency Profit Calculator)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          احسب أرباحك الشهرية من بيع الاشتراكات والخدمات المباشرة
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          تتيح لك هذه الحاسبة التفاعلية معرفة حجم الدخل الشهري المتكرر (MRR) والأرباح الصافية بناءً على عدد المشتركين وعملاء الوكالة المباشرين.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Form (Left) */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>متغيرات نموذج الإيرادات والنمو</span>
          </h3>

          {/* 1. SaaS Subscribers Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>عدد المشتركين في البرنامج (SaaS Subscribers):</span>
              </span>
              <span className="text-cyan-400 font-black font-mono text-base">{subscribersCount} مشترك</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={subscribersCount}
              onChange={(e) => setSubscribersCount(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10 مشتركين</span>
              <span>500 مشترك</span>
              <span>1,000 مشترك</span>
            </div>
          </div>

          {/* 2. Avg Subscription Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300 font-bold">متوسط سعر الاشتراك الشهري:</span>
              <span className="text-indigo-400 font-black font-mono text-base">{avgSubPrice}$ / شهرياً</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'باقة 29$', val: 29 },
                { label: 'باقة 79$ (الموصى بها ⭐)', val: 79 },
                { label: 'باقة 199$', val: 199 }
              ].map((b) => (
                <button
                  key={b.val}
                  type="button"
                  onClick={() => setAvgSubPrice(b.val)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    avgSubPrice === b.val
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Agency Done-For-You Projects Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>مشاريع الوكالة والخدمات المباشرة شهرياً:</span>
              </span>
              <span className="text-amber-400 font-black font-mono text-base">{agencyProjectsCount} عميل</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={agencyProjectsCount}
              onChange={(e) => setAgencyProjectsCount(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 عملاء</span>
              <span>25 عميل</span>
              <span>50 عميل</span>
            </div>
          </div>

          {/* 4. Avg Project Fee */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300 font-bold">متوسط سعر تسليم المشروع الواحد:</span>
              <span className="text-amber-400 font-black font-mono text-base">{avgProjectFee}$</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '350$ (محتوى/إعلانات)', val: 350 },
                { label: '650$ (متجر/صفقات B2B)', val: 650 },
                { label: '1,500$ (عقد/مناقصة كبرى)', val: 1500 }
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setAvgProjectFee(p.val)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    avgProjectFee === p.val
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Profit Cards (Right) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Profit Display Card */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                صافي الربح الشهري المتوقع (Net Monthly Profit):
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                هامش ربح {profitMarginPercent}% ⭐
              </span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                ${netMonthlyProfit.toLocaleString()} <span className="text-lg text-slate-400 font-sans font-normal">/ شهرياً</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                ما يعادل حوالي <strong className="text-amber-300 font-mono">${totalAnnualRevenue.toLocaleString()}</strong> سنوياً (ARR).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">دخل الاشتراكات (SaaS MRR):</span>
                <span className="text-cyan-300 font-bold font-mono text-sm">${saasMonthlyRevenue.toLocaleString()}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">دخل خدمات الوكالة:</span>
                <span className="text-amber-300 font-bold font-mono text-sm">${agencyMonthlyRevenue.toLocaleString()}</span>
              </div>
            </div>

          </div>

          {/* Ready-to-Use Client Pitch Box */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>رسالة إغلاق العملاء الجاهزة للنسخ (Client Pitch Template):</span>
              </span>
              <button
                onClick={copyPitch}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'تم النسخ!' : 'نسخ الرسالة'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
              {pitchScript}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
