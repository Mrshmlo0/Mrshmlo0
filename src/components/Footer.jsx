import React from 'react';
import { Sparkles, Heart, ShieldCheck, Zap, ArrowUpRight, MessageCircle, FolderArchive } from 'lucide-react';

export function Footer({ onOpenBlueprint, setActiveTab, onOpenVault }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white">OmniAI Enterprise Platform</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              منصة إنتاج وتسليم الخدمات الذكية المتقدمة ومخرجات الذكاء الاصطناعي الجاهزة للعملاء مع خزانة سحابية لتخزين وإعادة تنزيل كافة الأعمال المنتجة.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>جاهز للربط مع بوابات الدفع وقواعد بيانات Supabase و OpenAI / Claude.</span>
            </div>
          </div>

          {/* Col 2: Studios & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">الاستوديوهات والخدمات</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('ultra-studios')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  استوديو التصميم والصور الإعلانية
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ultra-studios')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  محرر الحملات وجدول المحتوى 30 يوماً
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ultra-studios')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  مهندس السير الذاتية ATS هارفارد
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ultra-studios')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  محرك مبيعات المتاجر وسيناريوهات الواتساب
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services-catalog')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  دليل الـ 24 أداة وخدمة ذكية
                </button>
              </li>
              {onOpenVault && (
                <li>
                  <button onClick={onOpenVault} className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors cursor-pointer">
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>مكتبة مخرجاتي الذكية 🗄️</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Blueprint & Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">دليل العمل والربح</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenBlueprint('overview')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  مفهوم الـ AI Micro-SaaS
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('pricing')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  هندسة الباقات والائتمان
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('tech-stack')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  الهندسة البرمجية والأمان
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('growth')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  خطة الوصول لأول 100 مشترك
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('incubator')} className="hover:text-indigo-400 transition-colors cursor-pointer">
                  مسرّعة ومجلس إدارة المشاريع 🚀
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 جميع الحقوق محفوظة - منصة إنتاج خدمات الذكاء الاصطناعي الشاملة.</p>
          <div className="flex items-center gap-2">
            <span>صُنع بأعلى معايير الإنتاجية والتنفيذ الفوري 🚀</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
