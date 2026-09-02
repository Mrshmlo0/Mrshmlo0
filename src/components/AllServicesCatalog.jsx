import React, { useState } from 'react';
import {
  SERVICE_CATEGORIES,
  ALL_PROFITABLE_SERVICES
} from '../data/allServicesData';
import {
  Sparkles,
  Megaphone,
  ShoppingBag,
  Briefcase,
  Building2,
  TrendingUp,
  Video,
  Code2,
  Bot,
  Search,
  ArrowLeft,
  DollarSign,
  Flame,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { UnifiedServiceModal } from './UnifiedServiceModal';

const CATEGORY_ICONS = {
  Sparkles: Sparkles,
  Megaphone: Megaphone,
  ShoppingBag: ShoppingBag,
  Briefcase: Briefcase,
  Building2: Building2,
  TrendingUp: TrendingUp,
  Video: Video,
  Code2: Code2,
  Bot: Bot
};

export function AllServicesCatalog({ userCredits, setUserCredits, onOpenPricing }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeService, setActiveService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter services by category and search
  const filteredServices = ALL_PROFITABLE_SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.categoryId === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      service.title.toLowerCase().includes(query) ||
      service.englishTitle.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleOpenService = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-4 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>مجمع الخدمات الشامل والأعلى ربحية عالمياً وعربياً</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          دليل الـ 24 خدمة ذكاء اصطناعي الجاهزة للربح الفوري
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          جميع الخدمات التي تستطيع نماذج الذكاء الاصطناعي إنتاجها بدقة متناهية وسرعة خارقة، مع هوامش ربح تتراوح بين <strong className="text-emerald-400">85% إلى 95%</strong> جاهزة للدمج والبيع في باقاتك واشتراكاتك.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="mb-10 space-y-5">
        
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أي خدمة (مثال: سيرة ذاتية، بوت واتساب، مقال سيو، إعلانات، كود، عقود)..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pr-12 pl-4 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 shadow-xl transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              مسح
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-none">
          {SERVICE_CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 24 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 backdrop-blur-md"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {service.badge}
                </span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  هامش: {service.profitMargin}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mb-3">{service.englishTitle}</p>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-5">{service.description}</p>

              {/* Pricing & Token Cost Pills */}
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1.5 text-[11px] mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-amber-400" /> سعر بيع الباقة:
                  </span>
                  <span className="text-amber-300 font-bold">{service.pricingGuide}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-1.5">
                  <span className="text-slate-400">استهلاك الرصيد:</span>
                  <span className="text-indigo-400 font-mono font-bold">{service.tokensCost}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleOpenService(service)}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
            >
              <span>تشغيل وتجربة الخدمة حياً</span>
              <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          <p className="text-base font-bold text-slate-300">لم يتم العثور على خدمات مطابقة لبحثك</p>
          <p className="text-xs text-slate-500 mt-1">جرّب البحث بكلمة أخرى أو اختر تصنيفاً مختلفاً.</p>
        </div>
      )}

      {/* Unified Service Workstation Modal */}
      <UnifiedServiceModal
        service={activeService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userCredits={userCredits}
        setUserCredits={setUserCredits}
        onOpenPricing={onOpenPricing}
      />

    </section>
  );
}
