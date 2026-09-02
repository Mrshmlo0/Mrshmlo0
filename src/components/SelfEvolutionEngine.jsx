import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Flame,
  Activity,
  Cpu,
  ShieldCheck,
  RefreshCw,
  Terminal,
  TrendingUp,
  Sliders,
  Send,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LIVE_MARKET_TRENDS, SELF_HEALING_LOGS } from '../data/autonomousAgentsData';

export function SelfEvolutionEngine() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState(99.4);
  const [resolvedTickets, setResolvedTickets] = useState(148);
  const [logs, setLogs] = useState(SELF_HEALING_LOGS);

  // Support simulator state
  const [userQuery, setUserQuery] = useState('');
  const [simulatedSolution, setSimulatedSolution] = useState(null);
  const [isSolving, setIsSolving] = useState(false);

  const handleRunSelfEvolution = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setAccuracyScore(99.8);
      const newLog = {
        id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: 'الآن',
        event: 'دورة تعلم وبحث ذاتية جديدة: تم فحص 50,000 استجابة وتحسين معدل الإقناع',
        action: 'تحديث أوزان الصياغة وحقن أحدث الكلمات المفتاحية الرائجة تلقائياً',
        result: 'ارتفاع دقة النظام إلى 99.8% وتحسين سرعة الاستجابة بنسبة 18% 🚀'
      };
      setLogs((prev) => [newLog, ...prev]);
      setIsOptimizing(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }, 1200);
  };

  const handleSolveSupportTicket = (e) => {
    e?.preventDefault();
    if (!userQuery.trim()) return;

    setIsSolving(true);
    setTimeout(() => {
      const q = userQuery.trim();
      let sol = '';
      if (q.includes('دفع') || q.includes('فواتير') || q.includes('بطاقة')) {
        sol = `✅ تم فحص سجل المعاملات عبر بوابة الدفع. تم التحقق من المعاملة وتجديد الاشتراك بنجاح وإعادة شحن الرصيد كاملاً فورياً دون أي تأخير.`;
      } else if (q.includes('خطأ') || q.includes('API') || q.includes('بطء')) {
        sol = `⚡ قام الوكيل الذكي بفحص خوادم الـ API وتحويل الاتصال لخادم احتياطي فائق السرعة، وتم حل المشكلة في 200 ميلي ثانية بنجاح.`;
      } else {
        sol = `🤖 قام وكيل الدعم الذاتي بتحليل استفسارك بخصوص "${q}". تم إعداد الحل التقني وتطبيقه على حسابك فورياً وتحديث قاعدة المعرفة ذاتياً.`;
      }

      setSimulatedSolution(sol);
      setResolvedTickets((prev) => prev + 1);
      setIsSolving(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-4">
          <Activity className="w-4 h-4 text-amber-400" />
          <span>محرك البحث والتطوير والتعلم الذاتي (Autonomous R&D Engine)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          نظام يتطور وينمو ويحل المشكلات تلقائياً 24/7
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          هذا المحرك يمنح تطبيقك ميزة تنافسية لا يستطيع أحد تقليدها: مراقبة تريندات السوق لحظياً، تحسين جودة المخرجات ذاتياً، وحل استفسارات ومشاكل العملاء برمجياً بدون تدخلك!
        </p>
      </div>

      {/* Real-time Health & R&D Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>دقة وجودة المخرجات</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">{accuracyScore}%</div>
          <div className="text-[11px] text-emerald-400 mt-1">تطور ذاتي مستمر (+0.4% اليوم)</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>تذاكر دعم تم حلها آلياً</span>
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">{resolvedTickets} تذكرة</div>
          <div className="text-[11px] text-slate-400 mt-1">معدل رضا العملاء: 99.2%</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>زمن المعالجة الذاتية</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">180 ms</div>
          <div className="text-[11px] text-slate-400 mt-1">سرعة استجابة فائقة للغاية</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>عمليات التعافي الذاتي</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">420 عملية</div>
          <div className="text-[11px] text-emerald-400 mt-1">حماية واستمرارية 99.99%</div>
        </div>
      </div>

      {/* Main Two-Column Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left: Market Trends Real-Time Pulse */}
        <div className="lg:col-span-6 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                رادار اصطياد تريندات السوق والفرص المربحة
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">يقوم بمسح السوق الرقمي واقتراح الميزات الأعلى طلباً</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="space-y-3">
            {LIVE_MARKET_TRENDS.map((trend) => (
              <div
                key={trend.id}
                className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-relaxed">{trend.topic}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 shrink-0 font-mono">
                    {trend.growth}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{trend.opportunity}</p>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400">القطاع: <strong className="text-slate-200">{trend.niche}</strong></span>
                  <span className="text-amber-400 font-bold">{trend.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Autonomous Self-Healing & Support Simulation */}
        <div className="lg:col-span-6 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  محاكي الدعم الذاتي وحل المشكلات آلياً
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">يحل مشاكل العملاء والأخطاء التقنية دون أي تدخل منك</p>
              </div>
              <button
                onClick={handleRunSelfEvolution}
                disabled={isOptimizing}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'جاري التحسين...' : 'تشغيل دورة تطور ذاتي'}</span>
              </button>
            </div>

            {/* Test ticket input */}
            <form onSubmit={handleSolveSupportTicket} className="space-y-3 my-4">
              <label className="block text-xs font-semibold text-slate-300">
                جرّب إدخال أي مشكلة أو استفسار كأنك عميل يواجه مشكلة:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="مثال: خصمتم من بطاقتي ولم تظهر النقاط في حسابي..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isSolving}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>حل المشكلة</span>
                </button>
              </div>
            </form>

            {/* Preset prompt buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'خصمتم الرصيد والاشتراك لم يتفعل',
                'واجهت بطء في توليد مقال السيو',
                'كيف أربط التطبيق بمتجري في سلة؟'
              ].map((txt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setUserQuery(txt)}
                  className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                >
                  💬 {txt}
                </button>
              ))}
            </div>

            {/* Result Box */}
            {simulatedSolution && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>تم الحل التلقائي بواسطة الوكيل الذكي (Self-Resolved):</span>
                  <span className="font-mono">خلال 0.4 ثانية</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{simulatedSolution}</p>
              </div>
            )}
          </div>

          {/* Activity Logs Console */}
          <div className="mt-4 bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-mono text-amber-300">
                <Terminal className="w-3.5 h-3.5" /> سجل التحسينات الذاتية المباشرة
              </span>
              <span>مُحدَّث لحظياً</span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="text-[11px] text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-indigo-400 font-mono">
                    <span>{log.id} - {log.timestamp}</span>
                    <span className="text-emerald-400">تلقائي ✅</span>
                  </div>
                  <div className="text-slate-200">{log.event}</div>
                  <div className="text-slate-400 text-[10px]">{log.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
