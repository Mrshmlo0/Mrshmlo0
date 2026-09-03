import React from 'react';
import {
  Compass,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { SOFTWARE_TYPES, RESEARCH_PHASES } from '../data/softwareResearchData';

export function IdeaResearchTab({ projectData, setProjectData }) {
  const handleTypeSelect = (typeId) => {
    setProjectData((prev) => ({ ...prev, projectType: typeId }));
  };

  const handleFieldChange = (field, value) => {
    setProjectData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedTypeObj = SOFTWARE_TYPES.find((t) => t.id === projectData.projectType) || SOFTWARE_TYPES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-3 w-fit">
          <Compass className="w-4 h-4" />
          <span>المرحلة الأولى: أبحاث الفكرة وتحديد نوع البرنامج</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          تحديد هوية البرنامج والمشكلة الجوهرية
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          قبل كتابة سطر برمجي واحد، تساعدك هذه المساحة على صياغة المشكلة بدقة، اختيار المنصة الأنسب لتشغيل البرنامج، ودراسة الجدوى الفنية والسوقية.
        </p>
      </div>

      {/* Project Basic Definition Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>بيانات ووصف البرنامج البرمجي</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم البرنامج أو المشروع المقترح:</label>
            <input
              type="text"
              value={projectData.projectName}
              onChange={(e) => handleFieldChange('projectName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              placeholder="مثال: SmartTask Desktop, AI Automation Engine..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">الجمهور والعميل المستهدف بالتحديد:</label>
            <input
              type="text"
              value={projectData.targetAudience}
              onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder="مثال: المطورون، أصحاب الشركات الصغيرة، صناع المحتوى..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">الملخص العام للبرنامج وما يقدمه:</label>
          <textarea
            rows={2}
            value={projectData.summary}
            onChange={(e) => handleFieldChange('summary', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            placeholder="اشرح باختصار ما هي وظيفة البرنامج الرئيسية..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/20">
            <span className="text-xs font-bold text-rose-400 block mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>المشكلة المؤلمة التي يعاني منها المستخدم (Pain Point):</span>
            </span>
            <textarea
              rows={3}
              value={projectData.coreProblem}
              onChange={(e) => handleFieldChange('coreProblem', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 leading-relaxed"
              placeholder="ما الذي يجعل المستخدم يبحث عن هذا البرنامج؟ ما هي معاناته الحالية؟"
            />
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/20">
            <span className="text-xs font-bold text-emerald-400 block mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>الحل الذي يقدمه برنامجك (The Unique Solution):</span>
            </span>
            <textarea
              rows={3}
              value={projectData.solutionOverview}
              onChange={(e) => handleFieldChange('solutionOverview', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="كيف يعالج برنامجك هذه المشكلة بشكل أسرع أو أرخص أو أكثر ذكاءً؟"
            />
          </div>
        </div>
      </div>

      {/* Program Platform Type Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>اختر بيئة تشغيل البرنامج المناسبة لفكرتك</span>
          </h3>
          <span className="text-xs text-slate-400">قارن بين ميزات وعيوب كل منصة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOFTWARE_TYPES.map((st) => {
            const isSelected = projectData.projectType === st.id;
            return (
              <div
                key={st.id}
                onClick={() => handleTypeSelect(st.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-3xl mb-2">{st.icon}</div>
                  <h4 className="font-bold text-sm text-white mb-1">{st.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{st.bestFor}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className={isSelected ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                    {isSelected ? '✓ المنصة المختارة' : 'تحديد هذه المنصة'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Type Detailed Breakdown */}
        {selectedTypeObj && (
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedTypeObj.icon}</span>
                <h4 className="font-bold text-base text-white">
                  التحليل الفني والتقني لـ: {selectedTypeObj.title}
                </h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">
                الخيارات البرمجية الموصى بها
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Recommended Stacks */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 block mb-1">🛠️ أفضل أطر العمل المقترحة:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedTypeObj.techRecommendations.map((rec, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 space-y-2">
                <span className="font-bold text-emerald-400 block mb-1">✨ نقاط القوة والمزايا:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedTypeObj.pros.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons & Challenges */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 space-y-2">
                <span className="font-bold text-amber-400 block mb-1">⚠️ التحديات التي يجب حسابها:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedTypeObj.cons.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Structured Feasibility Questionnaire */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-cyan-400" />
          <span>الأسئلة الأربعة الحيوية في مرحلة البحث والتخطيط (Research Roadmap)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESEARCH_PHASES.map((phase) => (
            <div key={phase.step} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-300 text-xs font-mono font-bold flex items-center justify-center border border-blue-500/30">
                  {phase.step}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-white">{phase.title}</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-400 pl-2">
                {phase.questions.map((q, qIdx) => (
                  <li key={qIdx} className="flex items-start gap-2 bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
