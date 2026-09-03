import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaResearchTab } from './components/IdeaResearchTab';
import { TechStackAdvisorTab } from './components/TechStackAdvisorTab';
import { FeaturePlannerTab } from './components/FeaturePlannerTab';
import { ResearchNotebookTab } from './components/ResearchNotebookTab';
import { Footer } from './components/Footer';
import { getSavedResearch, saveResearchData, clearResearchData, getDefaultResearchData } from './utils/researchStore';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('idea'); // 'idea' | 'tech' | 'features' | 'notebook'
  const [projectData, setProjectData] = useState(() => getSavedResearch());
  const [toastMsg, setToastMsg] = useState(null);

  // Auto-save whenever projectData changes
  useEffect(() => {
    saveResearchData(projectData);
  }, [projectData]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleResetResearch = () => {
    if (confirm('هل تريد إعادة تعيين الأبحاث والبدء بمشروع فارغ جديد؟')) {
      clearResearchData();
      setProjectData(getDefaultResearchData());
      showToast('🔄 تم مسح بيانات البحث وإعادة التعيين بنجاح!');
    }
  };

  const handleExportSRS = () => {
    const stack = projectData.selectedTechStack || {};
    const coreFeats = (projectData.features || []).filter((f) => f.type === 'core');
    const futureFeats = (projectData.features || []).filter((f) => f.type === 'future');
    const notes = projectData.notes || [];

    const markdownDoc = `# وثيقة مواصفات وأبحاث البرنامج (Software Requirements Specification - SRS)
مشروع: ${projectData.projectName || 'برنامج جديد'}
تاريخ الإعداد: ${new Date().toLocaleDateString('ar-EG')}

---

## 1. ملخص البرنامج والأهداف (Executive Summary)
- **اسم البرنامج:** ${projectData.projectName}
- **المنصة المختارة:** ${projectData.projectType}
- **الجمهور المستهدف:** ${projectData.targetAudience}
- **الوصف العام:**
${projectData.summary}

---

## 2. دراسة المشكلة والحل المقترح (Problem-Solution Fit)
### المشكلة الأساسية:
${projectData.coreProblem}

### الحل الذي يقدمه البرنامج:
${projectData.solutionOverview}

---

## 3. المعمارية التقنية المختارة (Architecture & Tech Stack)
- **الواجهة الأمامية (Frontend):** ${stack.platform || 'غير محدد'}
- **الخادم الخلفي (Backend):** ${stack.backend || 'غير محدد'}
- **قاعدة البيانات (Database):** ${stack.database || 'غير محدد'}

---

## 4. قائمة ميزات الإصدار الأولي (Core MVP Features)
${coreFeats.length > 0 ? coreFeats.map((f, i) => `${i + 1}. [${f.priority.toUpperCase()}] ${f.title}`).join('\n') : 'لا توجد ميزات أساسية مسجلة.'}

### ميزات الإصدارات المستقبلية (Future Backlog / V2.0):
${futureFeats.length > 0 ? futureFeats.map((f, i) => `${i + 1}. ${f.title}`).join('\n') : 'لا توجد ميزات مؤجلة.'}

---

## 5. ملاحظات وأفكار بحثية (Research Notes)
${notes.map((n) => `### 📌 ${n.title} (${n.date})\n${n.content}`).join('\n\n')}

---
تم إعداد وتصدير هذه الوثيقة عبر مختبر أبحاث وهندسة البرمجيات (Software Research Lab).`;

    const blob = new Blob([markdownDoc], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(projectData.projectName || 'software-project').replace(/\s+/g, '_')}_SRS.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 تم تحميل وثيقة المواصفات البرمجية (SRS) بصيغة Markdown!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-blue-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportSRS={handleExportSRS}
        onResetResearch={handleResetResearch}
        projectData={projectData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'idea' && (
          <IdeaResearchTab
            projectData={projectData}
            setProjectData={setProjectData}
          />
        )}

        {activeTab === 'tech' && (
          <TechStackAdvisorTab
            projectData={projectData}
            setProjectData={setProjectData}
          />
        )}

        {activeTab === 'features' && (
          <FeaturePlannerTab
            projectData={projectData}
            setProjectData={setProjectData}
          />
        )}

        {activeTab === 'notebook' && (
          <ResearchNotebookTab
            projectData={projectData}
            setProjectData={setProjectData}
            onExportSRS={handleExportSRS}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
