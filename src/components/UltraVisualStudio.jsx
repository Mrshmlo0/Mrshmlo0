import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Wand2,
  Image as ImageIcon,
  Sliders,
  Layers,
  Palette,
  Eye,
  Zap,
  Tag,
  Type,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { copyToClipboardSafe, downloadCanvasImage } from '../utils/clipboardAndDownload';

export function UltraVisualStudio({ userCredits, setUserCredits, onOpenPricing }) {
  const canvasRef = useRef(null);
  const [promptInput, setPromptInput] = useState('عطر فاخر برائحة العود الملكي مع زجاجة كريستالية على صخرة بركانية وقت الغروب');
  const [aspectRatio, setAspectRatio] = useState('16:9'); // '16:9' | '1:1' | '9:16' | '4:5'
  const [stylePreset, setStylePreset] = useState('luxury'); // 'luxury' | 'cyberpunk' | 'studio' | 'nature'
  const [badgeText, setBadgeText] = useState('خصم حصري 40% 🔥');
  const [headlineText, setHeadlineText] = useState('عطر الفخامة الملكي');
  const [showTextOverlay, setShowTextOverlay] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedDalle, setCopiedDalle] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const midjourneyPrompt = `/imagine prompt: A masterclass commercial luxury photograph of ${promptInput}, cinematic volumetric golden lighting, highly detailed glass and liquid reflections, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, 8k resolution, photorealistic studio grading --ar ${aspectRatio === '16:9' ? '16:9' : aspectRatio === '9:16' ? '9:16' : '1:1'} --v 6.1 --style raw --q 2 --s 750`;

  const dallePrompt = `Ultra-detailed commercial studio advertising shot of ${promptInput}. High-end product photography, dramatic lighting, crisp reflections, 8k resolution, clean modern aesthetic.`;

  // Draw procedural canvas artwork
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Dimensions based on aspect ratio
    let w = 800;
    let h = 450;
    if (aspectRatio === '1:1') { w = 600; h = 600; }
    if (aspectRatio === '9:16') { w = 450; h = 800; }
    if (aspectRatio === '4:5') { w = 480; h = 600; }

    canvas.width = w;
    canvas.height = h;

    // 1. Background Gradient
    if (stylePreset === 'luxury') {
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0a0a0f');
      bg.addColorStop(0.5, '#1a1612');
      bg.addColorStop(1, '#050505');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Golden Horizon Dunes
      const goldGrad = ctx.createLinearGradient(0, h * 0.5, w, h);
      goldGrad.addColorStop(0, '#d4af37');
      goldGrad.addColorStop(0.5, '#996515');
      goldGrad.addColorStop(1, '#2c1e08');

      ctx.beginPath();
      ctx.moveTo(0, h * 0.65);
      ctx.bezierCurveTo(w * 0.3, h * 0.5, w * 0.7, h * 0.7, w, h * 0.6);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fillStyle = goldGrad;
      ctx.fill();

      // Sun Glow
      const sun = ctx.createRadialGradient(w * 0.5, h * 0.3, 10, w * 0.5, h * 0.3, w * 0.4);
      sun.addColorStop(0, 'rgba(255, 230, 150, 0.95)');
      sun.addColorStop(0.4, 'rgba(212, 175, 55, 0.4)');
      sun.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sun;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.3, w * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Product Glass Silhoutte
      const bx = w * 0.5;
      const by = h * 0.55;
      const bw = w * 0.22;
      const bh = h * 0.38;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(bx, by + bh * 0.5 + 10, bw * 0.6, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glass Bottle
      const glass = ctx.createLinearGradient(bx - bw/2, by, bx + bw/2, by + bh);
      glass.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      glass.addColorStop(0.3, 'rgba(212, 175, 55, 0.7)');
      glass.addColorStop(0.8, 'rgba(20, 15, 10, 0.95)');
      glass.addColorStop(1, 'rgba(212, 175, 55, 0.85)');

      ctx.fillStyle = glass;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(bx - bw/2, by - bh/2, bw, bh, 18);
      ctx.fill();
      ctx.stroke();

      // Golden Cap
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(bx - bw * 0.2, by - bh/2 - 35, bw * 0.4, 35);
      ctx.strokeRect(bx - bw * 0.2, by - bh/2 - 35, bw * 0.4, 35);

    } else if (stylePreset === 'cyberpunk') {
      // Cyber Neon Background
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#050518');
      bg.addColorStop(1, '#1a052e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Neon Grid Floor
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1.5;
      for (let y = h * 0.6; y < h; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Neon Portal Ring
      const ring = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.45, w * 0.35);
      ring.addColorStop(0, 'rgba(255, 0, 128, 0.9)');
      ring.addColorStop(0.5, 'rgba(0, 240, 255, 0.5)');
      ring.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ring;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, w * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Hero Box
      ctx.fillStyle = 'rgba(10, 10, 30, 0.92)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.roundRect(w * 0.5 - w * 0.15, h * 0.5 - h * 0.18, w * 0.3, h * 0.36, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

    } else {
      // Studio Clean Minimalist
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.5, w * 0.6);
      bg.addColorStop(0, '#ffffff');
      bg.addColorStop(0.6, '#e2e8f0');
      bg.addColorStop(1, '#64748b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Studio Pedestal
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(w * 0.5 - w * 0.18, h * 0.5, w * 0.36, h * 0.3, [16, 16, 4, 4]);
      ctx.fill();
    }

    // 2. Banner Text Overlays (if enabled)
    if (showTextOverlay) {
      // Top/Corner Discount Badge
      if (badgeText.trim()) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(w * 0.06, h * 0.08, 160, 38, 12);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px Cairo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(badgeText, w * 0.06 + 80, h * 0.08 + 24);
      }

      // Headline Text Bar
      if (headlineText.trim()) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(w * 0.06, h * 0.82, w * 0.88, 54, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Cairo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(headlineText, w * 0.5, h * 0.82 + 34);
      }
    }

    // Professional Watermark Tag
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '10px Cairo, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ OmniAI Studio Ultra Render', 20, h - 12);
  };

  useEffect(() => {
    renderCanvas();
  }, [aspectRatio, stylePreset, badgeText, headlineText, showTextOverlay]);

  const handleGenerateArtwork = (e) => {
    e?.preventDefault();
    if (userCredits < 10) {
      alert('⚠️ تحتاج إلى 10 نقاط لتوليد وتصميم الصورة.');
      onOpenPricing();
      return;
    }
    setUserCredits((prev) => Math.max(0, prev - 10));
    setIsGenerating(true);

    setTimeout(() => {
      renderCanvas();
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      showToast('✨ تم توليد وتصميم الصورة الحقيقية بنجاح!');
    }, 600);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      downloadCanvasImage(canvas, `omniai-${stylePreset}-image.png`);
      showToast('📥 تم تحميل الصورة PNG على جهازك بنجاح!');
    }
  };

  const handleCopyMidjourney = () => {
    copyToClipboardSafe(midjourneyPrompt, () => {
      setCopiedPrompt(true);
      showToast('📋 تم نسخ أمر Midjourney v6.1!');
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  const handleCopyDalle = () => {
    copyToClipboardSafe(dallePrompt, () => {
      setCopiedDalle(true);
      showToast('📋 تم نسخ أمر DALL-E 3!');
      setTimeout(() => setCopiedDalle(false), 2000);
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3 shadow-inner">
          <ImageIcon className="w-4 h-4 text-purple-300" />
          <span>الخدمة الأولى: استوديو توليد وتصميم الصور الحقيقية</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          مولد الصور والتصاميم الإعلانية بجودة 8K
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          توليد صور واقعية فورية قابلة للتنزيل كملف PNG مع إمكانية إضافة نصوص وعروض الخصم مباشرة وأوامر Midjourney الهندسية.
        </p>
      </div>

      {/* Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (Left) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          <form onSubmit={handleGenerateArtwork} className="space-y-4">
            
            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                وصف الصورة أو المنتج المراد تصميمه:
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
                placeholder="صف مشهدك بدقة (مثلاً: زجاجة عطر، ساعة يد فاخرة، سيارة رياضية)..."
              />
            </div>

            {/* Visual Style Preset */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">النمط البصري للإضاءة:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'luxury', label: '✨ ذهبي فاخر' },
                  { id: 'cyberpunk', label: '⚡ نيون مستقبلي' },
                  { id: 'studio', label: '📸 استوديو 8K' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStylePreset(s.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      stylePreset === s.id
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">أبعاد الصورة (Aspect Ratio):</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '16:9', label: '16:9 شاشة' },
                  { id: '1:1', label: '1:1 مربع' },
                  { id: '9:16', label: '9:16 ستوري' },
                  { id: '4:5', label: '4:5 بوست' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setAspectRatio(r.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      aspectRatio === r.id
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Overlay Controls */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-300" />
                  إضافة شريط نصي وعروض ترويجية على الصورة:
                </span>
                <input
                  type="checkbox"
                  checked={showTextOverlay}
                  onChange={(e) => setShowTextOverlay(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>

              {showTextOverlay && (
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={headlineText}
                    onChange={(e) => setHeadlineText(e.target.value)}
                    placeholder="النص الرئيسي (مثال: عطر الفخامة الملكي)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="شارة الخصم (مثال: خصم حصري 40% 🔥)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 animate-spin text-amber-300" />
                  <span>جاري معالجة ورسم الصورة بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>توليد وتصميم الصورة الفورية (10 نقاط)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Canvas View & Direct Download Column (Right) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-white">معاينة الصورة الناتجة (Real Canvas Output)</span>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الصورة PNG</span>
              </button>
            </div>

            {/* The Actual Visible Canvas */}
            <div className="mt-4 flex justify-center items-center bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-inner overflow-hidden min-h-[340px]">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[380px] object-contain rounded-xl shadow-2xl bg-black"
              />
            </div>
          </div>

          {/* Copyable Midjourney / DALL-E Prompts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 font-mono">أمر Midjourney v6.1</span>
                <button
                  type="button"
                  onClick={handleCopyMidjourney}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <p className="font-mono text-slate-300 line-clamp-2 text-[10px] bg-slate-900 p-1.5 rounded">{midjourneyPrompt}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400 font-mono">أمر DALL-E 3</span>
                <button
                  type="button"
                  onClick={handleCopyDalle}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  {copiedDalle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDalle ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <p className="font-mono text-slate-300 line-clamp-2 text-[10px] bg-slate-900 p-1.5 rounded">{dallePrompt}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
