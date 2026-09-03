import React, { useRef, useEffect, useState } from 'react';
import { Download, Copy, Check, Sparkles, Wand2, RefreshCw, Layers, Eye } from 'lucide-react';
import { copyToClipboardSafe, downloadCanvasImage } from '../utils/clipboardAndDownload';

export function RealImageGenerator({ concept, artStyle, onImageReady }) {
  const canvasRef = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState('luxury'); // 'luxury' | 'neon' | 'studio'
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedDalle, setCopiedDalle] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const cleanConcept = concept?.trim() || "زجاجة عطر فاخرة تتلألأ فوق رمال الصحراء الذهبية وقت الغروب";

  const midjourneyPrompt = `/imagine prompt: A high-end luxury commercial advertisement photograph of ${cleanConcept}, cinematic golden hour rim lighting, ultra-detailed reflections, sharp focus on textures, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, 8k resolution, photorealistic, masterpiece --ar 16:9 --v 6.0 --style raw --q 2`;

  const dallePrompt = `A hyper-detailed commercial studio photograph showcasing ${cleanConcept}. Cinematic lighting, dramatic shadows, crystal clear focus, high aesthetic 8k resolution.`;

  // Draw procedural high-res artwork on canvas
  const drawArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (selectedStyle === 'luxury') {
      // Luxury Gold & Obsidian Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0a0a0f');
      bgGrad.addColorStop(0.5, '#1e1b18');
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Gold Dune Hills / Horizon
      const goldGrad = ctx.createLinearGradient(0, height * 0.6, width, height);
      goldGrad.addColorStop(0, '#d4af37');
      goldGrad.addColorStop(0.5, '#aa7c11');
      goldGrad.addColorStop(1, '#2c1e08');

      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      ctx.bezierCurveTo(width * 0.3, height * 0.55, width * 0.7, height * 0.75, width, height * 0.65);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = goldGrad;
      ctx.fill();

      // Glowing Sun / Rim Light
      const sunGrad = ctx.createRadialGradient(width * 0.5, height * 0.35, 10, width * 0.5, height * 0.35, 180);
      sunGrad.addColorStop(0, 'rgba(255, 223, 128, 0.9)');
      sunGrad.addColorStop(0.4, 'rgba(212, 175, 55, 0.4)');
      sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.35, 180, 0, Math.PI * 2);
      ctx.fill();

      // Central Hero Object Silhoutte / Glass Bottle Render
      const bottleX = width * 0.5;
      const bottleY = height * 0.55;
      const bottleW = 120;
      const bottleH = 180;

      // Bottle Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(bottleX, bottleY + bottleH * 0.5 + 10, bottleW * 0.6, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glass Bottle Body
      const glassGrad = ctx.createLinearGradient(bottleX - bottleW/2, bottleY, bottleX + bottleW/2, bottleY + bottleH);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      glassGrad.addColorStop(0.2, 'rgba(212, 175, 55, 0.6)');
      glassGrad.addColorStop(0.8, 'rgba(15, 15, 20, 0.9)');
      glassGrad.addColorStop(1, 'rgba(212, 175, 55, 0.9)');

      ctx.fillStyle = glassGrad;
      ctx.strokeStyle = '#f5e6c8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(bottleX - bottleW/2, bottleY - bottleH/2, bottleW, bottleH, [16, 16, 24, 24]);
      ctx.fill();
      ctx.stroke();

      // Gold Cap
      ctx.fillStyle = '#d4af37';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bottleX - 25, bottleY - bottleH/2 - 40, 50, 40, [8, 8, 4, 4]);
      ctx.fill();
      ctx.stroke();

      // Luxury Label Text
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(bottleX - 45, bottleY - 25, 90, 50);
      ctx.strokeStyle = '#d4af37';
      ctx.strokeRect(bottleX - 45, bottleY - 25, 90, 50);

      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 12px Cairo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OMNIAI ELITE', bottleX, bottleY);
      ctx.font = '9px monospace';
      ctx.fillText('EAU DE PARFUM', bottleX, bottleY + 16);

    } else if (selectedStyle === 'neon') {
      // Cyberpunk Neon Style
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#050515');
      bgGrad.addColorStop(1, '#150520');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Neon Grid Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let y = height * 0.6; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Neon Glow Circle
      const glowGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.45, 200);
      glowGrad.addColorStop(0, 'rgba(255, 0, 128, 0.8)');
      glowGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.4)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.45, 200, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Shield / Product Render
      ctx.fillStyle = 'rgba(10, 10, 30, 0.9)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(width * 0.5 - 70, height * 0.5 - 80, 140, 160, 20);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ff007f';
      ctx.font = 'bold 14px Cairo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CYBER AI 8K', width * 0.5, height * 0.5);

    } else {
      // Clean Commercial Studio 8K Style
      const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.4, 20, width * 0.5, height * 0.5, 300);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(0.7, '#e2e8f0');
      bgGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Studio Reflection Platform
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.72, 140, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sleek Product Pedestal
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(width * 0.5 - 80, height * 0.45, 160, 120, [16, 16, 4, 4]);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px Cairo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STUDIO 8K PRO', width * 0.5, height * 0.52);
    }

    // Watermark overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px Cairo, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('⚡ تم التوليد الفوري بواسطة OmniAI Studio', width - 20, height - 15);

    if (onImageReady) onImageReady(canvas);
  };

  useEffect(() => {
    setIsRendering(true);
    const t = setTimeout(() => {
      drawArtwork();
      setIsRendering(false);
    }, 150);
    return () => clearTimeout(t);
  }, [selectedStyle, concept]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      downloadCanvasImage(canvas, `omniai-${selectedStyle}-artwork.png`);
    }
  };

  const handleCopyMidjourney = () => {
    copyToClipboardSafe(midjourneyPrompt, () => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  const handleCopyDalle = () => {
    copyToClipboardSafe(dallePrompt, () => {
      setCopiedDalle(true);
      setTimeout(() => setCopiedDalle(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Visual Canvas Display Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-2xl bg-slate-950 flex flex-col items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          className="w-full max-h-[320px] object-contain rounded-xl shadow-inner bg-black"
        />

        {/* Style Switcher Overlays */}
        <div className="w-full mt-3 flex items-center justify-between gap-2 px-2 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">النمط البصري:</span>
            {[
              { id: 'luxury', label: '✨ ذهبي فاخر (Luxury)' },
              { id: 'neon', label: '⚡ نيون مستقبلي (Cyber)' },
              { id: 'studio', label: '📸 استوديو تجاري (Studio)' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStyle(s.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  selectedStyle === s.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل الصورة PNG</span>
          </button>
        </div>
      </div>

      {/* Copy Prompts Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 font-mono">Midjourney v6 Prompt</span>
            <button
              type="button"
              onClick={handleCopyMidjourney}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPrompt ? 'تم النسخ!' : 'نسخ'}</span>
            </button>
          </div>
          <p className="text-[10px] font-mono text-slate-300 line-clamp-2 bg-slate-950 p-1.5 rounded">{midjourneyPrompt}</p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-400 font-mono">DALL-E 3 Prompt</span>
            <button
              type="button"
              onClick={handleCopyDalle}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
            >
              {copiedDalle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedDalle ? 'تم النسخ!' : 'نسخ'}</span>
            </button>
          </div>
          <p className="text-[10px] font-mono text-slate-300 line-clamp-2 bg-slate-950 p-1.5 rounded">{dallePrompt}</p>
        </div>
      </div>

    </div>
  );
}
