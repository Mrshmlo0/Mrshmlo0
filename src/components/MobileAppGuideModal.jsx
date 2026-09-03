import React, { useState } from 'react';
import { X, Smartphone, Apple, Check, Copy, Terminal, Download, ShieldCheck, Sparkles } from 'lucide-react';

export function MobileAppGuideModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyCode = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const capacitorCommands = `# 1. تثبيت حزم كاباسيتور لتحويل التطبيق لموبايل
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios

# 2. تهيئة إعدادات التطبيق
npx cap init "OmniAI Pro" "com.omniai.app" --web-dir "dist"

# 3. بناء ملفات الويب وتوليد مشروعي الأندرويد والآيفون
npm run build
npx cap add android
npx cap add ios

# 4. فتح المشروع في Android Studio لتصدير ملف APK المباشر
npx cap open android

# 5. فتح المشروع في Xcode لتصدير تطبيق iPhone (iOS)
npx cap open ios`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">دليل تشغيل وتصدير تطبيق Android و iPhone (iOS)</h3>
              <p className="text-xs text-slate-400">طريقتان سهلتان لتشغيل التطبيق على هواتف العملاء واستلام الاشتراكات</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs sm:text-sm text-slate-200">
          
          {/* Method 1: Instant PWA Install */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>الطريقة الأولى: التثبيت الفوري كتطبيق هاتف (PWA - بدون انتظار موافقة المتاجر)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              التطبيق مجهز بملف <code className="text-indigo-300 bg-slate-900 px-2 py-0.5 rounded font-mono">manifest.json</code> ودعم الشاشات الكاملة (Standalone Mode):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-slate-300" />
                  على هواتف iPhone (iOS):
                </div>
                <p className="text-slate-400">
                  افتح رابط الموقع من متصفح Safari، ثم اضغط على زر المشاركة (Share) واختر <strong>"إضافة إلى الشاشة الرئيسية (Add to Home Screen)"</strong>. سيظهر كأيقونة تطبيق كامل بدون شريط متصفح!
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  على هواتف Android:
                </div>
                <p className="text-slate-400">
                  افتح الموقع من متصفح Chrome، ستظهر للمستخدم رسالة تلقائية بالأسفل: <strong>"تثبيت التطبيق على هاتفك"</strong>. بضغطة زر ينزل على الهاتف كأنه من Google Play.
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: Native APK & IPA export */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <Terminal className="w-5 h-5" />
                <span>الطريقة الثانية: تصدير ملف APK لـ Google Play و iOS لـ App Store عبر Capacitor</span>
              </div>
              <button
                onClick={() => copyCode('cap', capacitorCommands)}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-bold rounded-xl border border-slate-800 cursor-pointer"
              >
                {copiedKey === 'cap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cap' ? 'تم النسخ' : 'نسخ الأوامر'}</span>
              </button>
            </div>

            <p className="text-slate-400">
              يمكنك تشغيل هذه الأوامر في التيرمينال لتوليد تطبيق أصلي (Native App) بالكامل:
            </p>

            <pre className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {capacitorCommands}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}
