// LocalStorage manager for Software Research Lab
const RESEARCH_STORAGE_KEY = 'software_project_research_v1';

export function getSavedResearch() {
  try {
    const raw = localStorage.getItem(RESEARCH_STORAGE_KEY);
    if (!raw) return getDefaultResearchData();
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading research data:', err);
    return getDefaultResearchData();
  }
}

export function saveResearchData(data) {
  try {
    localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('software_research_updated', { detail: data }));
    return true;
  } catch (err) {
    console.error('Error saving research data:', err);
    return false;
  }
}

export function clearResearchData() {
  localStorage.removeItem(RESEARCH_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('software_research_updated', { detail: getDefaultResearchData() }));
}

export function getDefaultResearchData() {
  return {
    projectName: 'مشروعي البرمجي الجديد',
    projectType: 'desktop_saas', // 'desktop', 'saas', 'mobile', 'ai_tool', 'hybrid'
    summary: 'برنامج تقني متطور يهدف إلى حل مشاكل محددة وأتمتة العمليات للمستخدمين بأعلى أداء وسلاسة.',
    targetAudience: 'المحترفون، الشركات، والمستخدمون الباحثون عن الكفاءة والإنتاجية',
    coreProblem: 'إهدار الوقت والجهد في المهام اليدوية والاعتماد على أدوات معقدة أو بطيئة.',
    solutionOverview: 'برنامج خفيف وسريع بواجهة سهلة الاستخدام يقدم حلولاً فورية مع تكاملات برمجية ذكية.',
    selectedTechStack: {
      platform: 'Electron / Tauri (سطح المكتب) + React (واجهة المستخدم)',
      backend: 'Node.js / Rust / Python',
      database: 'SQLite / PostgreSQL',
      stateManagement: 'Zustand / Redux Toolkit',
      styling: 'Tailwind CSS'
    },
    features: [
      { id: '1', title: 'لوحة التحكم التفاعلية الرئيسية', type: 'core', status: 'planned', priority: 'high' },
      { id: '2', title: 'محرك المعالجة والأتمتة السريع', type: 'core', status: 'planned', priority: 'critical' },
      { id: '3', title: 'حفظ وتصدير البيانات بعدة صيغ (JSON, PDF, CSV)', type: 'core', status: 'planned', priority: 'medium' },
      { id: '4', title: 'نظام إدارة الإعدادات والمفاتيح البرمجية (API Keys)', type: 'core', status: 'planned', priority: 'high' }
    ],
    notes: [
      {
        id: 'note_1',
        title: 'أفكار حول المعمارية وتجربة المستخدم',
        content: 'التركيز على سرعة الفتح، استهلاك منخفض للذاكرة، ودعم العمل دون اتصال بالإنترنت (Offline-First).',
        date: new Date().toLocaleDateString('ar-EG')
      }
    ]
  };
}
