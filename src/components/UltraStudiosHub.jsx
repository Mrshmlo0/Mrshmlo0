import React, { useState } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Megaphone,
  FileText,
  ShoppingBag,
  Scale,
  Zap,
  Star,
  CheckCircle2,
  Layers,
  FolderArchive
} from 'lucide-react';
import { UltraVisualStudio } from './UltraVisualStudio';
import { UltraMarketingStudio } from './UltraMarketingStudio';
import { UltraResumeStudio } from './UltraResumeStudio';
import { UltraEcommerceStudio } from './UltraEcommerceStudio';
import { UltraLegalStudio } from './UltraLegalStudio';

const STUDIOS = [
  {
    id: 'visual',
    title: 'استوديو التصميم والصور الإعلانية',
    englishTitle: 'Visual & Ad Design Studio',
    icon: ImageIcon,
    badge: 'تصميم فوري + تحميل PNG',
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500/40',
    activeBg: 'bg-purple-600',
    tag: 'مباشر وتفاعلي 🎨',
    desc: 'توليد وتصميم إعلانات تجارية وبانرات وبوسترات حقيقية مع محرر نصوص وتحميل فوري للصور بدقة فائقة.'
  },
  {
    id: 'marketing',
    title: 'محرر الحملات التسويقية والجدول الشهري',
    englishTitle: 'Campaign & Social Calendar Engine',
    icon: Megaphone,
    badge: '3 نسخ إعلانية + تقويم 30 يوم',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/40',
    activeBg: 'bg-blue-600',
    tag: 'تسويق احترافي 🚀',
    desc: 'صياغة إعلانات بأساليب PAS و AIDA وجدول محتوى شهري 30 يوماً مع معايير الاستهداف الإعلاني.'
  },
  {
    id: 'resume',
    title: 'مسرّع السير الذاتية بتنسيق هارفارد ATS',
    englishTitle: 'Harvard ATS Resume Builder',
    icon: FileText,
    badge: 'تنسيق A4 + طباعة PDF فورية',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500/40',
    activeBg: 'bg-emerald-600',
    tag: 'مطابق 98% ATS 📄',
    desc: 'إنشاء سيرة ذاتية هارفارد بنموذج STAR ورسالة تغطية مطابقة للوظيفة مع طباعة وتصدير PDF فوري بنقرة واحدة.'
  },
  {
    id: 'ecommerce',
    title: 'استوديو مبيعات المتاجر والواتساب',
    englishTitle: 'E-Commerce & WhatsApp Closer',
    icon: ShoppingBag,
    badge: 'صفحة بيع + ردود واتساب + عروض',
    color: 'from-cyan-600 to-blue-600',
    borderColor: 'border-cyan-500/40',
    activeBg: 'bg-cyan-600',
    tag: 'زيادة المبيعات 🛍️',
    desc: 'كتابة قصة البيع المقنعة لصفحة المنتج وسيناريوهات واتساب لإغلاق الصفقات وحزم العروض المجمعة.'
  },
  {
    id: 'legal',
    title: 'المستشار القانوني وتدقيق العقود',
    englishTitle: 'Contract Risk & Redline Auditor',
    icon: Scale,
    badge: 'كشف الثغرات + صياغة بديلة',
    color: 'from-rose-600 to-amber-600',
    borderColor: 'border-rose-500/40',
    activeBg: 'bg-rose-600',
    tag: 'حماية قانونية ⚖️',
    desc: 'تحليل البنود المجحفة ومؤشر المخاطر واقتراح الصياغات القانونية البديلة ورسائل التفاوض الودية.'
  }
];

export function UltraStudiosHub({ userCredits, setUserCredits, onOpenPricing, onOpenVault, defaultStudio = 'visual' }) {
  const [selectedStudio, setSelectedStudio] = useState(defaultStudio);

  const activeStudioObj = STUDIOS.find((s) => s.id === selectedStudio) || STUDIOS[0];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner Hub */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>استوديوهات النخبة الخمسة - أعلى عائد وقيمة حقيقية</span>
          </div>

          {onOpenVault && (
            <button
              onClick={onOpenVault}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white text-xs font-bold border border-indigo-500/30 shadow-lg cursor-pointer transition-colors"
            >
              <FolderArchive className="w-3.5 h-3.5 text-indigo-400" />
              <span>مكتبة مخرجاتي المحفوظة 🗄️</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          أقوى 5 استوديوهات ذكاء اصطناعي تفاعلية
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          أدوات متكاملة تنتج ملفات وصور وتصميمات وتقارير حقيقية للتسليم المباشر دون الحاجة لأي تعديلات يدوية.
        </p>
      </div>

      {/* Switcher Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {STUDIOS.map((st) => {
          const Icon = st.icon;
          const isSelected = selectedStudio === st.id;

          return (
            <button
              key={st.id}
              onClick={() => setSelectedStudio(st.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? `bg-slate-900 ${st.borderColor} shadow-2xl ring-2 ring-indigo-500/50 -translate-y-1`
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${st.color} flex items-center justify-center text-white shadow`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {st.tag}
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 mb-0.5">{st.title}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1 font-mono">{st.englishTitle}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold">
                <span className={isSelected ? 'text-indigo-400' : 'text-slate-500'}>
                  {isSelected ? '● جاري الاستخدام' : 'اختر الأداة'}
                </span>
                <span className="text-amber-400">15 نقطة</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Studio Content Area */}
      <div className="bg-slate-950/60 rounded-3xl border border-slate-800/80 backdrop-blur-xl p-2 sm:p-6 shadow-2xl">
        {selectedStudio === 'visual' && (
          <UltraVisualStudio
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={onOpenPricing}
          />
        )}

        {selectedStudio === 'marketing' && (
          <UltraMarketingStudio
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={onOpenPricing}
          />
        )}

        {selectedStudio === 'resume' && (
          <UltraResumeStudio
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={onOpenPricing}
          />
        )}

        {selectedStudio === 'ecommerce' && (
          <UltraEcommerceStudio
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={onOpenPricing}
          />
        )}

        {selectedStudio === 'legal' && (
          <UltraLegalStudio
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={onOpenPricing}
          />
        )}
      </div>

    </div>
  );
}
