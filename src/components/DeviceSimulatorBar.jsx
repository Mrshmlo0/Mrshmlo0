import React from 'react';
import { Smartphone, Monitor, Apple, Download, HelpCircle, Sparkles } from 'lucide-react';

export function DeviceSimulatorBar({ deviceMode, setDeviceMode, onOpenMobileGuide }) {
  return (
    <div className="sticky top-20 z-40 bg-indigo-950/90 border-b border-indigo-500/30 px-4 py-2 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs">
      
      {/* Mode Switcher */}
      <div className="flex items-center gap-2">
        <span className="text-indigo-300 font-bold hidden sm:inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          معاينة التطبيق كـ:
        </span>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>كمبيوتر وويب</span>
          </button>

          <button
            onClick={() => setDeviceMode('iphone')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceMode === 'iphone'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>تطبيق iPhone / iOS</span>
          </button>

          <button
            onClick={() => setDeviceMode('android')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceMode === 'android'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>تطبيق Android / APK</span>
          </button>
        </div>
      </div>

      {/* Mobile App Download & Export Guide */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenMobileGuide}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white font-bold rounded-xl border border-indigo-500/30 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>دليل تحويل التطبيق لـ APK و iOS (خلال 3 دقائق)</span>
        </button>
      </div>

    </div>
  );
}
