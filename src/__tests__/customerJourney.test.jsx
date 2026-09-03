// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { UltraVisualStudio } from '../components/UltraVisualStudio';
import { UltraMarketingStudio } from '../components/UltraMarketingStudio';
import { UltraResumeStudio } from '../components/UltraResumeStudio';
import { UltraEcommerceStudio } from '../components/UltraEcommerceStudio';
import { UltraLegalStudio } from '../components/UltraLegalStudio';
import { DeliverablesVaultModal } from '../components/DeliverablesVaultModal';
import { saveDeliverableToVault, clearVaultDeliverables, getVaultDeliverables } from '../utils/deliverablesVault';

// Complete mock Canvas API for jsdom
beforeEach(() => {
  if (typeof HTMLCanvasElement !== 'undefined') {
    const mockCtx = {
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: [] })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => []),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      strokeText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      ellipse: vi.fn(),
      roundRect: vi.fn(),
      bezierCurveTo: vi.fn(),
      quadraticCurveTo: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      measureText: vi.fn(() => ({ width: 100 })),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      })),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      }))
    };

    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx);
    HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mock');
  }

  // Mock window.print
  window.print = vi.fn();
  // Mock window.alert
  window.alert = vi.fn();
  // Mock window.scrollTo
  window.scrollTo = vi.fn();
  // Mock clipboard
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockImplementation(() => Promise.resolve())
    }
  });

  clearVaultDeliverables();
});

describe('OmniAI PRO - Full Customer Simulation Suite', () => {

  it('1. Visual & Ad Design Studio: Customer creates an ad, changes ratio, renders canvas, and downloads PNG', async () => {
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onOpenPricing = vi.fn();

    render(
      <UltraVisualStudio
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    // Verify studio loaded
    expect(screen.getByText(/مولد الصور والتصاميم الإعلانية بجودة 8K/i)).toBeDefined();

    // Select Aspect Ratio 9:16 Story
    const storyBtn = screen.getByText(/9:16 ستوري/i);
    fireEvent.click(storyBtn);

    // Edit overlay badge text
    const badgeInput = screen.getByDisplayValue(/خصم حصري 40% 🔥/i);
    fireEvent.change(badgeInput, { target: { value: 'عرض خاص - خصم 50% اليوم فقط' } });

    // Click Generate Design
    const generateBtn = screen.getByRole('button', { name: /توليد وتصميم الصورة الفورية/i });
    fireEvent.click(generateBtn);

    // Wait for canvas rendering
    await waitFor(() => {
      expect(screen.getByText(/تحميل الصورة PNG/i)).toBeDefined();
    }, { timeout: 3000 });

    // Verify credit was deducted
    expect(credits).toBe(290);

    // Simulate PNG download click
    const downloadBtn = screen.getByText(/تحميل الصورة PNG/i);
    fireEvent.click(downloadBtn);
  });

  it('2. Marketing & Social Calendar Studio: Customer generates PAS/AIDA campaigns and 30-day schedule', async () => {
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onOpenPricing = vi.fn();

    render(
      <UltraMarketingStudio
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    // Click Generate
    const generateBtn = screen.getByRole('button', { name: /توليد الحملة الإعلانية المتكاملة/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByText(/3 نصوص إعلانية 🔥/i)).toBeDefined();
    }, { timeout: 3000 });

    expect(screen.getByText(/جدول المحتوى 📅/i)).toBeDefined();
    expect(screen.getByText(/الاستهداف 🎯/i)).toBeDefined();

    // Switch to Calendar tab
    fireEvent.click(screen.getByText(/جدول المحتوى 📅/i));
    expect(screen.getAllByText(/اليوم 1/i)[0]).toBeDefined();

    // Switch to Targeting tab
    fireEvent.click(screen.getByText(/الاستهداف 🎯/i));
    expect(screen.getByText(/الديموغرافيا والبلدان:/i)).toBeDefined();

    // Verify download action
    const downloadBtn = screen.getByText(/تحميل كملف نصي/i);
    fireEvent.click(downloadBtn);
  });

  it('3. Harvard ATS Resume Studio: Customer generates STAR resume, verifies 98% ATS score and triggers print PDF', async () => {
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onOpenPricing = vi.fn();

    render(
      <UltraResumeStudio
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    // Click Generate
    const generateBtn = screen.getByRole('button', { name: /بناء السيرة الذاتية الفائزة/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByText(/درجة التوافق ATS: 98% ⭐/i)).toBeDefined();
    }, { timeout: 3000 });

    // Verify Harvard A4 formatted content
    expect(screen.getByText(/الملخص المهني \(Professional Summary\)/i)).toBeDefined();
    expect(screen.getByText(/الخبرات والإنجازات المقاسة/i)).toBeDefined();

    // Click Print PDF button
    const printBtn = screen.getByText(/طباعة \/ حفظ PDF/i);
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalled();
  });

  it('4. E-Commerce & WhatsApp Closer Studio: Customer generates sales copy, 4-step WhatsApp flow and bundles', async () => {
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onOpenPricing = vi.fn();

    render(
      <UltraEcommerceStudio
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    const generateBtn = screen.getByRole('button', { name: /توليد حزمة المبيعات المتكاملة/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByText(/بوت الواتساب 💬/i)).toBeDefined();
    }, { timeout: 3000 });

    // Switch to WhatsApp Bot tab
    fireEvent.click(screen.getByText(/بوت الواتساب 💬/i));
    expect(screen.getByText(/1\. رسالة الترحيب والرد الذكي الفوري/i)).toBeDefined();
    expect(screen.getByText(/3\. إغلاق الطلب وجمع بيانات الشحن/i)).toBeDefined();

    // Switch to Bundles tab
    fireEvent.click(screen.getByText(/باقات التسعير 📦/i));
    expect(screen.getByText(/باقة التوفير \(الأكثر مبيعاً ⭐\)/i)).toBeDefined();

    // Switch to Objections tab
    fireEvent.click(screen.getByText(/ردود الاعتراضات 🛡️/i));
    expect(screen.getByText(/السعر يبدو مرتفعاً بعض الشيء/i)).toBeDefined();
  });

  it('5. Legal Contract Auditor: Customer audits risky contract, reviews redline amendments and negotiation script', async () => {
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onOpenPricing = vi.fn();

    render(
      <UltraLegalStudio
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    const auditBtn = screen.getByRole('button', { name: /بدء الفحص القانوني الذكي/i });
    fireEvent.click(auditBtn);

    await waitFor(() => {
      expect(screen.getByText(/مرتفع \(78\/100 ⚠️\)/i)).toBeDefined();
      expect(screen.getAllByText(/البند الرابع/i).length).toBeGreaterThan(0);
    }, { timeout: 3000 });

    expect(screen.getByText(/رسالة التفاوض الودية مع العميل:/i)).toBeDefined();
  });

  it('6. Full App Flow: Navigation, Plan Upgrade, and Founder Security PIN verification', async () => {
    render(<App />);

    // Check Landing Hero
    expect(screen.getByText(/منظومة متكاملة بمعايير عالمية/i)).toBeDefined();

    // Switch to Ultra Studios Tab
    const studiosNavBtn = screen.getAllByRole('button', { name: /استوديوهات النخبة/i })[0];
    fireEvent.click(studiosNavBtn);
    expect(screen.getByText(/أقوى 5 استوديوهات ذكاء اصطناعي تفاعلية/i)).toBeDefined();

    // Switch to 24 Services Catalog Tab
    const catalogNavBtn = screen.getAllByRole('button', { name: /الخدمات الـ 24/i })[0];
    fireEvent.click(catalogNavBtn);
    expect(screen.getByText(/دليل الـ 24 خدمة ذكاء اصطناعي المتخصصة/i)).toBeDefined();

    // Switch to Project Incubator Tab
    const incubatorNavBtn = screen.getAllByRole('button', { name: /مسرّعة المشاريع/i })[0];
    fireEvent.click(incubatorNavBtn);
    expect(screen.getByText(/محرك تجسيد الأماني والمشاريع/i)).toBeDefined();

    // Click Founder Hub Button (Should open PIN prompt modal with secure placeholder)
    const founderHubBtn = screen.getAllByRole('button', { name: /المالك 👑/i })[0];
    fireEvent.click(founderHubBtn);

    // Verify PIN input modal appears with secure placeholder
    const pinInput = screen.getByPlaceholderText(/أدخل الرمز السري\.\.\./i);
    expect(pinInput).toBeDefined();

    // Enter correct PIN (2026)
    fireEvent.change(pinInput, { target: { value: '2026' } });
    const unlockBtn = screen.getByRole('button', { name: /فتح لوحة الإدارة والأرباح 👑/i });
    fireEvent.click(unlockBtn);

    // Founder Hub should now be unlocked!
    await waitFor(() => {
      expect(screen.getByText(/لوحة تحكم صاحب المشروع/i)).toBeDefined();
    });
  });

  it('7. Deliverables Vault: Customer opens vault, filters categories, and reviews stored deliverables', async () => {
    // Save sample deliverables to vault
    saveDeliverableToVault({
      category: 'marketing',
      title: 'إعلان حملة العطور الملكية',
      summary: 'نص إعلاني جذاب بأسلوب المشكلة والحل',
      inputs: { product: 'عطر العود الملكي' },
      outputs: { rawText: 'نص الإعلان الكامل والمخرجات' },
      downloadType: 'txt',
      agentTeam: ['وكيل التسويق 🚀']
    });

    saveDeliverableToVault({
      category: 'resume',
      title: 'سيرة ذاتية هارفارد - مهندس برمجيات',
      summary: 'سيرة ذاتية بنموذج STAR متوافقة 98% ATS',
      inputs: { name: 'سارة خالد' },
      outputs: { rawText: 'الملخص المهني والخبرات' },
      downloadType: 'pdf',
      agentTeam: ['وكيل ATS 📄']
    });

    const deliverables = getVaultDeliverables();
    expect(deliverables.length).toBe(2);

    render(
      <DeliverablesVaultModal
        isOpen={true}
        onClose={vi.fn()}
      />
    );

    // Check Vault title
    expect(screen.getByText(/مكتبة مخرجاتي ومنتجاتي الذكية/i)).toBeDefined();

    // Check saved item titles
    expect(screen.getByText(/إعلان حملة العطور الملكية/i)).toBeDefined();
    expect(screen.getByText(/سيرة ذاتية هارفارد - مهندس برمجيات/i)).toBeDefined();

    // Filter by Resume category button
    const resumeFilterBtn = screen.getAllByRole('button', { name: /السير الذاتية ATS/i })[0];
    fireEvent.click(resumeFilterBtn);

    expect(screen.getByText(/سيرة ذاتية هارفارد - مهندس برمجيات/i)).toBeDefined();
  });

});
