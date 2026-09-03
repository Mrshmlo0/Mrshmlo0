import React, { useState } from 'react';
import {
  ListTodo,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUpDown,
  Tag,
  Layers,
  Check
} from 'lucide-react';

export function FeaturePlannerTab({ projectData, setProjectData }) {
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeaturePriority, setNewFeaturePriority] = useState('high'); // 'critical' | 'high' | 'medium' | 'low'
  const [newFeatureType, setNewFeatureType] = useState('core'); // 'core' | 'future'

  const features = projectData.features || [];

  const handleAddFeature = (e) => {
    e?.preventDefault();
    if (!newFeatureTitle.trim()) return;

    const newFeature = {
      id: `feat_${Date.now()}`,
      title: newFeatureTitle.trim(),
      type: newFeatureType,
      status: 'planned',
      priority: newFeaturePriority
    };

    setProjectData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeature]
    }));

    setNewFeatureTitle('');
  };

  const handleDeleteFeature = (id) => {
    setProjectData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f.id !== id)
    }));
  };

  const toggleFeatureType = (id) => {
    setProjectData((prev) => ({
      ...prev,
      features: prev.features.map((f) =>
        f.id === id ? { ...f, type: f.type === 'core' ? 'future' : 'core' } : f
      )
    }));
  };

  const coreFeatures = features.filter((f) => f.type === 'core');
  const futureFeatures = features.filter((f) => f.type === 'future');

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'critical':
        return <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[10px] font-bold">حرجة جداً 🚨</span>;
      case 'high':
        return <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[10px] font-bold">أولوية عالية 🔥</span>;
      case 'medium':
        return <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[10px] font-bold">أولوية متوسطة ⚖️</span>;
      default:
        return <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">عادية</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3 w-fit">
          <ListTodo className="w-4 h-4" />
          <span>المرحلة الثالثة: نطاق الإصدار الأولي وتحديد الميزات (MVP Scope)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          هندسة متطلبات البرنامج وميزات الإصدار الأول
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          السر في نجاح أي برنامج هو التركيز على حل المشكلة بميزات جوهرية سريعة الإطلاق (MVP)، وتأجيل الميزات الإضافية للإصدارات القادمة.
        </p>
      </div>

      {/* Add New Feature Form Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Plus className="w-5 h-5 text-purple-400" />
          <span>إضافة ميزة أو متطلب جديد للبرنامج</span>
        </h3>

        <form onSubmit={handleAddFeature} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6">
            <label className="block text-xs font-bold text-slate-300 mb-1">اسم الميزة أو الوظيفة المطلوبة:</label>
            <input
              type="text"
              value={newFeatureTitle}
              onChange={(e) => setNewFeatureTitle(e.target.value)}
              placeholder="مثال: تسجيل الدخول عبر Google, محرك تصدير Excel, دعم الثيم المظلم..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-300 mb-1">الأولوية:</label>
            <select
              value={newFeaturePriority}
              onChange={(e) => setNewFeaturePriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="critical">حرجة جداً (لا يعمل البرنامج بدونها)</option>
              <option value="high">أولوية عالية (أساسية في الإصدار الأول)</option>
              <option value="medium">أولوية متوسطة</option>
              <option value="low">أولوية منخفضة / تحسينات إضافية</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-300 mb-1">النطاق الزمني:</label>
            <select
              value={newFeatureType}
              onChange={(e) => setNewFeatureType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="core">ضمن الإصدار الأولي الأساسي (MVP V1.0)</option>
              <option value="future">تأجيل للإصدارات القادمة (Backlog / V2.0)</option>
            </select>
          </div>

          <div className="md:col-span-12 pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة الميزة إلى قائمة متطلبات المشروع</span>
            </button>
          </div>
        </form>
      </div>

      {/* Feature Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core MVP Features Column */}
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-emerald-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <h4 className="font-bold text-sm sm:text-base text-white">ميزات الإصدار الأولي الأساسي (Core MVP)</h4>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">
              {coreFeatures.length} ميزات
            </span>
          </div>

          <div className="space-y-2.5">
            {coreFeatures.length > 0 ? (
              coreFeatures.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white text-xs sm:text-sm block">{f.title}</span>
                      <div className="mt-1 flex items-center gap-2">
                        {getPriorityBadge(f.priority)}
                        <button
                          onClick={() => toggleFeatureType(f.id)}
                          className="text-[10px] text-slate-400 hover:text-indigo-300 underline cursor-pointer"
                        >
                          نقل للإصدار القادم (V2)
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteFeature(f.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-500 text-xs">
                لم تتم إضافة ميزات أساسية بعد. أضف أول ميزة في النموذج أعلاه.
              </div>
            )}
          </div>
        </div>

        {/* Future Backlog Features Column */}
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <h4 className="font-bold text-sm sm:text-base text-white">الميزات المؤجلة للإصدارات القادمة (Backlog)</h4>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-bold">
              {futureFeatures.length} ميزات
            </span>
          </div>

          <div className="space-y-2.5">
            {futureFeatures.length > 0 ? (
              futureFeatures.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                      •
                    </span>
                    <div>
                      <span className="font-bold text-white text-xs sm:text-sm block">{f.title}</span>
                      <div className="mt-1 flex items-center gap-2">
                        {getPriorityBadge(f.priority)}
                        <button
                          onClick={() => toggleFeatureType(f.id)}
                          className="text-[10px] text-slate-400 hover:text-emerald-300 underline cursor-pointer"
                        >
                          نقل للـ MVP الأساسي
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteFeature(f.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-500 text-xs">
                لا توجد ميزات مؤجلة حالياً.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
