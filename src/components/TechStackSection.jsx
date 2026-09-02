import React, { useState } from 'react';
import { Code2, Database, ShieldCheck, CreditCard, Cpu, Terminal, Copy, Check, Lock, Zap } from 'lucide-react';

export function TechStackSection() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copySnippet = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const schemaSnippet = `-- PostgreSQL / Supabase Schema for AI Subscription SaaS

-- 1. Profiles & Credits
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  credits_balance INT DEFAULT 50, -- 50 free trial credits
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscriptions Table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL, -- 'starter', 'pro', 'agency'
  status TEXT NOT NULL,  -- 'active', 'canceled', 'past_due'
  current_period_end TIMESTAMPTZ NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Generation History & Audit Log
CREATE TABLE public.ai_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- 'copywriter', 'chatbot', 'seo', 'resume'
  prompt_tokens INT,
  completion_tokens INT,
  credits_used INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const apiRouteSnippet = `// Next.js / Node.js Protected AI API Route with Credit Deduction
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const { userId, toolType, prompt, creditsNeeded } = await req.json();

  // 1. Verify User Credit Balance
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_balance')
    .eq('id', userId)
    .single();

  if (!profile || profile.credits_balance < creditsNeeded) {
    return Response.json({ error: 'Insufficient credits. Upgrade your plan.' }, { status: 402 });
  }

  // 2. Call AI Model (Cost-Optimized Prompting)
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // 95% cheaper, lightning fast
    messages: [
      { role: 'system', content: 'You are an elite marketing copywriting engine.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
  });

  const output = completion.choices[0].message.content;

  // 3. Deduct Credits & Record Transaction Atomically
  await supabase.rpc('deduct_user_credits', {
    p_user_id: userId,
    p_credits: creditsNeeded,
    p_service: toolType
  });

  return Response.json({ success: true, result: output });
}`;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-4">
          <Code2 className="w-4 h-4 text-purple-400" />
          <span>الهندسة البرمجية والبنية التحتية</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          كيف تبني التطبيق برمجياً وتضمن الأمان والسرعة؟
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          بنية متكاملة مبنية بأحدث المعايير البرمجية لعام 2026 لتتحمل آلاف الطلبات المتزامنة مع حماية كاملة لمفاتيح الـ API وإدارة رصيد المشتركين.
        </p>
      </div>

      {/* Tech Cards Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-3 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">الواجهة الأمامية (Frontend)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Next.js 15 / React 19 + Tailwind CSS + Lucide Icons مع دعم كامل للأجهزة المحمولة واللغة العربية (RTL).
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-3 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">قاعدة البيانات والحسابات</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Supabase (PostgreSQL) مع نظام حماية RLS ومصادقة فورية عبر Google أو البريد الإلكتروني.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-3 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">بوابات الدفع والاشتراكات</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stripe / Lemon Squeezy للاشتراكات الدولية، مع Paymob و Tap و Moyasar لبطاقات مدى والدفع المحلي.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-3 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">مزودو الذكاء الاصطناعي</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            OpenAI (GPT-4o / mini)، Anthropic Claude 3.5، Groq للسرعة الفائقة، و Whisper لتفريغ الصوت.
          </p>
        </div>

      </div>

      {/* Code Snippets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Schema Code Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-300 font-mono">schema.sql (مخطط قاعدة البيانات والائتمان)</span>
            </div>
            <button
              onClick={() => copySnippet('schema', schemaSnippet)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 cursor-pointer transition-colors"
            >
              {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'schema' ? 'تم النسخ' : 'نسخ الكود'}</span>
            </button>
          </div>
          <pre className="p-5 text-xs font-mono text-slate-300 bg-slate-950/90 overflow-x-auto leading-relaxed scrollbar-thin">
            {schemaSnippet}
          </pre>
        </div>

        {/* API Route Snippet Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 font-mono">api/generate/route.js (حماية الرصيد واستدعاء الذكاء)</span>
            </div>
            <button
              onClick={() => copySnippet('api', apiRouteSnippet)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 cursor-pointer transition-colors"
            >
              {copiedKey === 'api' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'api' ? 'تم النسخ' : 'نسخ الكود'}</span>
            </button>
          </div>
          <pre className="p-5 text-xs font-mono text-slate-300 bg-slate-950/90 overflow-x-auto leading-relaxed scrollbar-thin">
            {apiRouteSnippet}
          </pre>
        </div>

      </div>

      {/* Secret Cost Optimization Tips */}
      <div className="mt-12 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-purple-950/60 p-6 sm:p-8 rounded-3xl border border-indigo-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            💡
          </div>
          <h3 className="text-lg font-bold text-white">
            3 أسرار تقنية لخفض تكلفة الـ API إلى أقل من 1$ لكل مشترك شهرياً:
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <strong className="text-indigo-400 block mb-1 text-sm">1. استخدام نماذج الـ Mini:</strong>
            استخدم نموذج مثل GPT-4o-mini أو Claude 3.5 Haiku للعمليات السريعة والبسيطة؛ فهو يقدم 95% من جودة النموذج الكبير وبتكلفة أقل بنسبة 90%.
          </div>
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <strong className="text-emerald-400 block mb-1 text-sm">2. التخزين المؤقت للبرومبت (Prompt Caching):</strong>
            تفعيل ميزة Prompt Caching المتاحة في OpenAI و Anthropic لخفض تكلفة التعليمات المكررة بنسبة 50% إضافية.
          </div>
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <strong className="text-purple-400 block mb-1 text-sm">3. التحكم في طول المخرجات (Max Tokens):</strong>
            حدد دائماً سقف التوكنز في كل رد لمنع النماذج من الإسهاب غير الضروري وتوفير الرصيد للعميل والسيرفر.
          </div>
        </div>
      </div>

    </section>
  );
}
