import React, { useState, useEffect } from 'react';
import {
  X,
  Archive,
  Download,
  Copy,
  Check,
  Trash2,
  Eye,
  FileText,
  Image as ImageIcon,
  Megaphone,
  Briefcase,
  ShoppingBag,
  Scale,
  Brain,
  Sparkles,
  Search,
  ExternalLink,
  Layers
} from 'lucide-react';
import { getVaultDeliverables, deleteVaultDeliverable, clearVaultDeliverables } from '../utils/deliverablesVault';
import { copyToClipboardSafe, downloadTextFileSafe, downloadCanvasImage } from '../utils/clipboardAndDownload';

const CATEGORY_MAP = {
  all: { label: 'جميع المخرجات', icon: Archive },
  visual: { label: 'التصاميم والصور', icon: ImageIcon },
  marketing: { label: 'الحملات التسويقية', icon: Megaphone },
  resume: { label: 'السير الذاتية ATS', icon: Briefcase },
  ecommerce: { label: 'مبيعات المتاجر وواتساب', icon: ShoppingBag },
  legal: { label: 'تدقيق العقود القانونية', icon: Scale },
  incubator: { label: 'المشاريع الكاملة', icon: Brain },
  catalog: { label: 'خدمات الدليل الـ 24', icon: Layers }
};

export function DeliverablesVaultModal({ isOpen, onClose }) {
  const [deliverables, setDeliverables] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const loadVault = () => {
    setDeliverables(getVaultDeliverables());
  };

  useEffect(() => {
    if (isOpen) {
      loadVault();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = (e) => {
      setDeliverables(e.detail || []);
    };
    window.addEventListener('omniai_vault_updated', handleUpdate);
    return () => window.removeEventListener('omniai_vault_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDelete = (id, e) => {
    e?.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذا المنتج من مكتبتك؟')) {
      const updated = deleteVaultDeliverable(id);
      setDeliverables(updated);
      if (activeItem?.id === id) setActiveItem(null);
      showToast('🗑️ تم حذف المنتج من الأرشيف.');
    }
  };

  const handleClearAll = () => {
    if (confirm('هل أنت متأكد من مسح جميع المنتجات المحفوظة في مكتبتك؟')) {
      clearVaultDeliverables();
      setDeliverables([]);
      setActiveItem(null);
      showToast('🧹 تم تفريغ مكتبة الأعمال بالكامل.');
    }
  };

  const handleCopy = (item, e) => {
    e?.stopPropagation();
    let textToCopy = '';
    if (typeof item.outputs === 'string') {
      textToCopy = item.outputs;
    } else if (item.outputs?.rawText) {
      textToCopy = item.outputs.rawText;
    } else if (item.outputs?.fullContent) {
      textToCopy = `${item.outputs.primaryHook || ''}\n\n${item.outputs.fullContent}\n\n${item.outputs.callToAction || ''}`;
    } else {
      textToCopy = JSON.stringify(item.outputs, null, 2);
    }

    copyToClipboardSafe(textToCopy, () => {
      setCopiedId(item.id);
      showToast('📋 تم نسخ محتوى المنتج بنجاح!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleDownload = (item, e) => {
    e?.stopPropagation();
    if (item.downloadType === 'png' && item.fileData) {
      const link = document.createElement('a');
      link.download = `${item.title.replace(/\s+/g, '_')}.png`;
      link.href = item.fileData;
      link.click();
      showToast('📥 تم تحميل ملف الصورة PNG!');
    } else {
      let doc = '';
      if (typeof item.outputs === 'string') {
        doc = item.outputs;
      } else if (item.outputs?.rawText) {
        doc = item.outputs.rawText;
      } else if (item.outputs?.fullContent) {
        doc = `=== ${item.title} ===\nتاريخ الإنتاج: ${item.formattedDate}\n\n${item.outputs.primaryHook || ''}\n\n${item.outputs.fullContent}\n\n${item.outputs.callToAction || ''}\n\n${item.outputs.hashtags || ''}`;
      } else {
        doc = JSON.stringify(item.outputs, null, 2);
      }
      downloadTextFileSafe(`${item.title.replace(/\s+/g, '_')}.txt`, doc);
      showToast('📥 تم تحميل الملف النصي!');
    }
  };

  // Filtered deliverables
  const filtered = deliverables.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.summary?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">مكتبة مخرجاتي ومنتجاتي الذكية (Deliverables Vault)</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {deliverables.length} منتج محفوظ
                </span>
              </div>
              <p className="text-xs text-slate-400">
                هنا تجد أرشيفاً كاملاً لكافة التصاميم، الحملات، السير الذاتية، العقود، وملفات الـ 24 خدمة للتسليم الفوري.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {deliverables.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="مسح الأرشيف"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">مسح الكل</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(CATEGORY_MAP).map(([key, cat]) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === key;
              const count = key === 'all'
                ? deliverables.length
                : deliverables.filter((d) => d.category === key).length;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-slate-950/80 rounded-full font-mono">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المنتجات المنتجة..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Main Vault Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Deliverables List (Left/Main) */}
          <div className={activeItem ? "lg:col-span-5 space-y-3" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const isSelected = activeItem?.id === item.id;
                const CatIcon = CATEGORY_MAP[item.category]?.icon || Archive;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                          <CatIcon className="w-3 h-3" />
                          <span>{CATEGORY_MAP[item.category]?.label || item.category}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.formattedDate}</span>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-sm text-white line-clamp-1 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {item.summary || (typeof item.outputs === 'string' ? item.outputs : item.outputs?.primaryHook || item.outputs?.headline || 'مخرجات معتمدة بالذكاء الاصطناعي')}
                      </p>

                      {/* Image Thumbnail Preview if Visual */}
                      {item.downloadType === 'png' && item.fileData && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-slate-800 bg-black max-h-32 flex items-center justify-center">
                          <img src={item.fileData} alt={item.title} className="max-h-32 object-contain" />
                        </div>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleCopy(item, e)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="نسخ"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={(e) => handleDownload(item, e)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="تحميل الملف"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setActiveItem(item)}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة تفصيلية</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-slate-500">
                <Archive className="w-16 h-16 text-slate-700 mx-auto mb-3 animate-pulse" />
                <p className="text-base font-bold text-slate-300">مكتبة الأعمال فارغة حالياً</p>
                <p className="text-xs text-slate-500 mt-1">
                  قم بتشغيل وتوليد أي خدمة في الاستوديوهات أو الدليل لتظهر مخرجاتك وملفاتك هنا فورياً للأرشفة والتنزيل.
                </p>
              </div>
            )}
          </div>

          {/* Active Deliverable Full Preview Modal Pane (Right) */}
          {activeItem && (
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                {/* Top Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">معرف المنتج: {activeItem.id}</span>
                    <h3 className="text-base sm:text-lg font-black text-white">{activeItem.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleCopy(activeItem, e)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === activeItem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>نسخ</span>
                    </button>

                    <button
                      onClick={(e) => handleDownload(activeItem, e)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تحميل ({activeItem.downloadType.toUpperCase()})</span>
                    </button>
                  </div>
                </div>

                {/* Agent Team Badge */}
                {activeItem.agentTeam && (
                  <div className="my-3 p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center gap-2 flex-wrap">
                    <span className="text-slate-400 font-bold">فريق الوكلاء المنفذ:</span>
                    {activeItem.agentTeam.map((ag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                        ⚡ {ag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Deliverable Body Display */}
                <div className="max-h-96 overflow-y-auto space-y-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 scrollbar-thin text-xs sm:text-sm">
                  {activeItem.downloadType === 'png' && activeItem.fileData ? (
                    <div className="text-center space-y-3">
                      <img src={activeItem.fileData} alt={activeItem.title} className="max-h-72 mx-auto rounded-xl shadow-2xl object-contain" />
                      <div className="text-xs text-slate-400 p-3 bg-slate-950 rounded-xl font-mono text-right">
                        <strong>أمر Midjourney:</strong> {activeItem.outputs?.midjourneyPrompt || activeItem.summary}
                      </div>
                    </div>
                  ) : typeof activeItem.outputs === 'string' ? (
                    <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">
                      {activeItem.outputs}
                    </pre>
                  ) : activeItem.outputs?.rawText ? (
                    <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">
                      {activeItem.outputs.rawText}
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">
                      {JSON.stringify(activeItem.outputs, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>تاريخ التوليد: {activeItem.formattedDate}</span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  إغلاق المعاينة
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
