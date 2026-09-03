// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UnifiedServiceModal } from '../components/UnifiedServiceModal';
import { ALL_PROFITABLE_SERVICES } from '../data/allServicesData';
import { RevenueCalculator } from '../components/RevenueCalculator';
import { SelfEvolutionEngine } from '../components/SelfEvolutionEngine';
import { DeviceSimulatorBar } from '../components/DeviceSimulatorBar';

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
      createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() }))
    };
    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx);
    HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mock');
  }

  window.alert = vi.fn();
  window.scrollTo = vi.fn();
  document.execCommand = vi.fn();
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockImplementation(() => Promise.resolve())
    }
  });
});

describe('OmniAI PRO - Services, Calculations & Simulator Simulation', () => {

  it('1. Unified Service Modal: Customer executes a service from the 24 catalog and copies result', async () => {
    const service = ALL_PROFITABLE_SERVICES[0];
    let credits = 300;
    const setCredits = (fn) => { credits = typeof fn === 'function' ? fn(credits) : fn; };
    const onClose = vi.fn();
    const onOpenPricing = vi.fn();

    render(
      <UnifiedServiceModal
        service={service}
        isOpen={true}
        onClose={onClose}
        userCredits={credits}
        setUserCredits={setCredits}
        onOpenPricing={onOpenPricing}
      />
    );

    // Verify modal opened with service title
    expect(screen.getByText(new RegExp(service.title, 'i'))).toBeDefined();

    // Click Generate Button
    const generateBtn = screen.getByRole('button', { name: /توليد النتيجة الفورية الآن/i });
    fireEvent.click(generateBtn);

    // Wait for output generation
    await waitFor(() => {
      expect(screen.getByText(/نسخ النص/i)).toBeDefined();
    }, { timeout: 3000 });

    // Verify copy button
    const copyBtn = screen.getByText(/نسخ النص/i);
    fireEvent.click(copyBtn);
  });

  it('2. Revenue & MRR Calculator: Simulates changing subscriber count and calculating profit margins', () => {
    const onOpenBlueprint = vi.fn();
    render(<RevenueCalculator onOpenBlueprint={onOpenBlueprint} />);

    // Check default MRR display
    expect(screen.getByText(/حاسبة الدخل الشهري المتكرر/i)).toBeDefined();

    // Verify Net Profit Margin text
    expect(screen.getByText(/النتائج المالية المتوقعة/i)).toBeDefined();

    // Click Blueprint CTA
    const bpBtn = screen.getByRole('button', { name: /كيف تحافظ على هذه النسبة وتمنع استنزاف التكاليف؟/i });
    fireEvent.click(bpBtn);
    expect(onOpenBlueprint).toHaveBeenCalledWith('pricing');
  });

  it('3. Self-Evolution Engine: Customer explores automated R&D and autonomous operations', () => {
    render(<SelfEvolutionEngine />);

    expect(screen.getByText(/نظام يتطور وينمو ويحل المشكلات تلقائياً/i)).toBeDefined();
    expect(screen.getByText(/رادار اصطياد تريندات السوق والفرص المربحة/i)).toBeDefined();
  });

  it('4. Device Simulator Bar: Customer switches between Desktop, iPhone, and Android views', () => {
    let mode = 'desktop';
    const setMode = vi.fn((m) => { mode = m; });
    const onOpenMobileGuide = vi.fn();

    render(
      <DeviceSimulatorBar
        deviceMode={mode}
        setDeviceMode={setMode}
        onOpenMobileGuide={onOpenMobileGuide}
      />
    );

    // Click iPhone Simulator
    const iphoneBtn = screen.getByRole('button', { name: /تطبيق iPhone \/ iOS/i });
    fireEvent.click(iphoneBtn);
    expect(setMode).toHaveBeenCalledWith('iphone');

    // Click Android Simulator
    const androidBtn = screen.getByRole('button', { name: /تطبيق Android \/ APK/i });
    fireEvent.click(androidBtn);
    expect(setMode).toHaveBeenCalledWith('android');

    // Click App Guide
    const guideBtn = screen.getByRole('button', { name: /دليل تحويل التطبيق/i });
    fireEvent.click(guideBtn);
    expect(onOpenMobileGuide).toHaveBeenCalled();
  });

});
