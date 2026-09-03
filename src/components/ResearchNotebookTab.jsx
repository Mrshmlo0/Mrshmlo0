import React, { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Download,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  FileCode,
  Lightbulb,
  Share2
} from 'lucide-react';

export function ResearchNotebookTab({ projectData, setProjectData, onExportSRS }) {
  const [copied, setCopied] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const notes = projectData.notes || [];

  const handleAddNote = (e) => {
    e?.preventDefault();
    if (!newNoteContent.trim()) return;

    const noteObj = {
      id: `note_${Date.now()}`,
      title: newNoteTitle.trim() || 'ملاحظة بحثية سريعة',
      content: newNoteContent.trim(),
      date: new Date().toLocaleDateString('ar-EG')
    };

    setProjectData((prev) => ({
      ...prev,
      notes: [noteObj, ...(prev.notes || [])]
    }));

    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteNote = (id) => {
    setProjectData((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id)
    }));
  };

  // Generate live Software Requirements Specification (SRS) text
  const generateSRSContent = () => {
    const stack = projectData.selectedTechStack || {};
    const coreFeats = (projectData.features || []).filter((f) => f.type === 'core');
    const futureFeats = (projectData.features || []).filter((f) => f.type === 'future');

    return `# وثيقة مواصفات وأبحاث البرنامج (Software Requirements Specification - SRS)
مشروع: ${projectData.projectName || 'برنامج جديد'}
تاريخ البحث: ${new Date().toLocaleDateString('ar-EG')}

---

## 1. ملخص البرنامج والأهداف (Executive Summary)
- **اسم البرنامج:** ${projectData.projectName}
- **بيئة التشغيل (Platform):** ${projectData.projectType}
- **الجمهور المستهدف:** ${projectData.targetAudience}
- **الوصف العام:**
${projectData.summary}

---

## 2. المشكلة والحل المقترح (Problem-Solution Matrix)
### المشكلة التي يعاني منها المستخدم (Pain Point):
${projectData.coreProblem}

### الحل الفريد الذي يقدمه البرنامج (Core Value):
${projectData.solutionOverview}

---

## 3. المعمارية التقنية وأطر العمل (Architecture & Tech Stack)
- **الواجهة الأمامية وبيئة العرض (Frontend):** ${stack.platform || 'غير محدد'}
- **الخادم الخلفي والمحرك (Backend):** ${stack.backend || 'غير محدد'}
- **قاعدة البيانات والتخزين (Database):** ${stack.database || 'غير محدد'}
- **نمط التصميم والتنسيق (UI/UX):** Tailwind CSS

---

## 4. قائمة متطلبات وميزات الإصدار الأولي (Core MVP Features)
${coreFeats.length > 0 ? coreFeats.map((f, i) => `${i + 1}. [${f.priority.toUpperCase()}] ${f.title}`).join('\n') : 'لا توجد ميزات مسجلة بعد.'}

### ميزات الإصدارات المستقبلية (Future Backlog / V2):
${futureFeats.length > 0 ? futureFeats.map((f, i) => `${i + 1}. ${f.title}`).join('\n') : 'لا توجد ميزات مؤجلة.'}

---

## 5. ملاحظات وأفكار بحثية إضافية (Research Notes)
${notes.map((n) => `### 📌 ${n.title} (${n.date})\n${n.content}`).join('\n\n')}

---
تم إعداد هذه الوثيقة آلياً عبر مختبر أبحاث وهندسة البرمجيات (Software Research Lab).`;
  };

  const handleCopySRS = () => {
    navigator.clipboard.writeText(generateSRSContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-3 w-fit">
          <BookOpen className="w-4 h-4" />
          <span>المرحلة الرابعة: دفتر الملاحظات ووثيقة مواصفات البرنامج (SRS)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          أبحاثك وملاحظاتك ووثيقة المواصفات الكاملة
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          دوّن ملاحظاتك، أفكار المنافسين، والروابط المهمة. يتم تجميع كافة نتائج أبحاثك تلقائياً في وثيقة مواصفات قياسية جاهزة للمطورين.
        </p>
      </div>

      {/* Grid: Note Creator + Live SRS Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Note Creator & Saved Notes (Left) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Add Note Card */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>إضافة ملاحظة أو فكرة بحثية جديدة</span>
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="عنوان الملاحظة (مثلاً: أفكار تسعير، ميزة منافس، رابط مكتبة)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="اكتب تفاصيل الملاحظة أو النتيجة البحثية..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>حفظ الملاحظة في سجل المشروع</span>
              </button>
            </form>
          </div>

          {/* List of Saved Notes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400">سجل الملاحظات المحفوظة ({notes.length}):</h4>
            {notes.length > 0 ? (
              notes.map((n) => (
                <div key={n.id} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs sm:text-sm">{n.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">{n.date}</span>
                      <button
                        onClick={() => handleDeleteNote(n.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{n.content}</p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">لا توجد ملاحظات مسجلة حالياً.</div>
            )}
          </div>

        </div>

        {/* Live SRS Generated Document (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm sm:text-base text-white">وثيقة المواصفات البرمجية المجمعة (SRS Preview)</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySRS}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>

              <button
                onClick={onExportSRS}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل ملف .MD</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 max-h-[550px] overflow-y-auto scrollbar-thin">
            <pre className="text-xs sm:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {generateSRSContent()}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
