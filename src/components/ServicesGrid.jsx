import React from 'react';
import { SAAS_NICHES } from '../data/blueprintData';
import { Sparkles, Bot, Briefcase, TrendingUp, ShoppingBag, FileText, ArrowLeft, CheckCircle2, DollarSign, Target, Percent } from 'lucide-react';

const ICONS = {
  Sparkles: Sparkles,
  Bot: Bot,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  ShoppingBag: ShoppingBag,
  FileText: FileText
};

export function ServicesGrid({ onSelectTool, onOpenBlueprint }) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>تحليل الفرص الاستثمارية الأكثر طلباً</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          أقوى 6 مجالات ذكاء اصطناعي يمكنك إطلاقها والتربح منها فوراً
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          تم اختيار هذه الخدمات بناءً على حجم الطلب الحقيقي في السوق، واستعداد الشركات والأفراد لدفع اشتراكات شهرية متكررة مقابل توفير الوقت والتكاليف.
        </p>
      </div>

      {/* Grid of Niches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAAS_NICHES.map((niche) => {
          const IconComponent = ICONS[niche.icon] || Sparkles;

          return (
            <div
              key={niche.id}
              className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 backdrop-blur-md"
            >
              <div>
                {/* Top header with icon and demand badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${niche.gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      طلب: {niche.demand}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      هامش ربح: <span className="text-emerald-400 font-bold">{niche.profitMargin}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {niche.title}
                </h3>
                <div className="text-xs font-semibold text-slate-400 font-mono mb-4">
                  {niche.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {niche.description}
                </p>

                {/* Target Audience & Pricing Pills */}
                <div className="space-y-2.5 mb-6 text-xs bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-indigo-400" /> الجمهور المستهدف:
                    </span>
                    <span className="text-slate-200 font-semibold text-right">{niche.target}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-slate-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" /> التسعير المقترح:
                    </span>
                    <span className="text-amber-300 font-bold">{niche.priceRange}</span>
                  </div>
                </div>

                {/* Feature bullets */}
                <div className="space-y-2 mb-6">
                  {niche.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => onSelectTool(niche.toolId)}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-200 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>جرّب الأداة حياً</span>
                  <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenBlueprint('services')}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                  title="اقرأ التحليل ودراسة الجدوى"
                >
                  الدراسة
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
