import React from 'react';
import { Sparkles, Heart, ShieldCheck, Zap, ArrowUpRight, MessageCircle } from 'lucide-react';

export function Footer({ onOpenBlueprint, setActiveTab }) {
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
              <span className="font-extrabold text-xl text-white">OmniSaaS AI Platform</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              المنصة الشاملة لبناء وتوسيع مشاريع البرمجيات كخدمة القائمة على الذكاء الاصطناعي (AI Micro-SaaS) مع تحقيق دخل شهري متكرر وهوامش ربح تتجاوز 85%.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>جاهز للربط مع بوابات الدفع وقواعد بيانات Supabase و OpenAI / Claude.</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">الخدمات والأدوات</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                  صانع محتوى السوشيال ميديا
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                  بوت خدمة العملاء والمبيعات
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                  محسن السير الذاتية (ATS)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                  محرك مقالات السيو وتصدر جوجل
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-indigo-400 transition-colors">
                  مساعد المتاجر الإلكترونية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Blueprint & Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">دليل العمل والربح</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenBlueprint('overview')} className="hover:text-indigo-400 transition-colors">
                  مفهوم الـ AI Micro-SaaS
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('pricing')} className="hover:text-indigo-400 transition-colors">
                  هندسة الباقات والائتمان
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('tech-stack')} className="hover:text-indigo-400 transition-colors">
                  الهندسة البرمجية والأمان
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBlueprint('growth')} className="hover:text-indigo-400 transition-colors">
                  خطة الوصول لأول 100 مشترك
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-indigo-400 transition-colors">
                  حاسبة الأرباح و MRR
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 جميع الحقوق محفوظة - مشروعك الريادي للذكاء الاصطناعي بالاشتراكات.</p>
          <div className="flex items-center gap-2">
            <span>صُنع بشغف لإطلاق مشروعك الناجح 🚀</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
