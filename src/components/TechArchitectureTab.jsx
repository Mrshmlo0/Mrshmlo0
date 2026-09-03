import React, { useState } from 'react';
import {
  Layers,
  Server,
  Database,
  Cpu,
  ShieldCheck,
  CreditCard,
  KeyRound,
  Code2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export function TechArchitectureTab() {
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleApiRoute = `// api/agent/route.js - Next.js / Node.js API Endpoint
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { agentId, userInputs } = await req.json();

    // 1. Verify User Subscription & Credits in Supabase/Database
    // 2. Select Specialized System Prompt based on agentId
    // 3. Execute Structured Output Generation (e.g. GPT-4o / Claude 3.5 Sonnet)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an Elite B2B Specialist producing production-grade deliverables." },
        { role: "user", content: JSON.stringify(userInputs) }
      ],
      temperature: 0.3
    });

    return Response.json({ success: true, deliverable: completion.choices[0].message.content });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleApiRoute);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3 w-fit">
          <Layers className="w-4 h-4" />
          <span>المعمارية التقنية وطريقة ربط البوابات (Technical Architecture & Deployment)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          كيف تربط هذا البرنامج ببوابات الدفع وقواعد البيانات؟
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          الهندسة البرمجية الكاملة لتحويل هذا التطبيق إلى شركة برمجيات حقيقية بالاشتراكات (SaaS) واستقبال المدفوعات من أي دولة في العالم.
        </p>
      </div>

      {/* 4 Pillars of Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">1. بوابات الدفع بالاشتراكات</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            الربط مع <strong>LemonSqueezy</strong> أو <strong>Stripe</strong> أو <strong>Paymob / Tap</strong> للمدفوعات في الخليج ومصر.
          </p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">2. قاعدة البيانات والمستخدمين</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            استخدام <strong>Supabase (PostgreSQL)</strong> لتسجيل حسابات المشتركين، تتبع رصيد النقاط، وحفظ أعمالهم.
          </p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">3. محركات الذكاء الاصطناعي</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ربط الـ API مع <strong>OpenAI GPT-4o</strong> أو <strong>Anthropic Claude 3.5 Sonnet</strong> بأقل تكلفة استهلاك.
          </p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">4. الاستضافة والنشر السحابي</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            نشر بنقرة واحدة على <strong>Vercel</strong> أو <strong>Railway</strong> مع شهادة أمان SSL ونطاق خاص (Custom Domain).
          </p>
        </div>

      </div>

      {/* Code Snippet Box */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span className="font-mono text-xs font-bold text-slate-300">api/agent/route.js (كود استدعاء وتشغيل الوكلاء السحابي)</span>
          </div>

          <button
            onClick={copyCode}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
          </button>
        </div>

        <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto bg-slate-950/80">
          {sampleApiRoute}
        </pre>
      </div>

    </div>
  );
}
