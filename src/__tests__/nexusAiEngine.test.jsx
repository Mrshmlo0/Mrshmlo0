// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from '../App';
import { MarketResearchTab } from '../components/MarketResearchTab';
import { AgentStudioTab } from '../components/AgentStudioTab';
import { AgencyPricingCalculatorTab } from '../components/AgencyPricingCalculatorTab';
import { TechArchitectureTab } from '../components/TechArchitectureTab';
import { executeAgentWorkflow, HIGH_DEMAND_AGENTS } from '../data/agentEcosystemData';

// Mock canvas-confetti for JSDOM
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

beforeEach(() => {
  // Mock clipboard
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockImplementation(() => Promise.resolve())
    }
  });
});

afterEach(() => {
  cleanup();
});

describe('NexusAI Enterprise - AI Agents & Market Research Suite', () => {

  it('1. Market Research Tab: Renders market insights, winning drivers, and pricing tiers', () => {
    const onStudio = vi.fn();
    const onCalc = vi.fn();

    render(<MarketResearchTab onSwitchToStudio={onStudio} onSwitchToCalculator={onCalc} />);

    expect(screen.getByText(/أين تكمن أعلى أرباح الذكاء الاصطناعي؟/i)).toBeDefined();
    expect(screen.getByText(/استبدال التكاليف التشغيلية الباهظة للشركات/i)).toBeDefined();
    expect(screen.getByText(/باقة المحترفين والشركات \(Pro Agency ⭐\)/i)).toBeDefined();

    // Trigger CTA
    const studioBtn = screen.getByRole('button', { name: /تجربة الوكلاء الـ 6 مباشرة/i });
    fireEvent.click(studioBtn);
    expect(onStudio).toHaveBeenCalled();
  });

  it('2. Agent Studio Tab: Executes B2B Outreach Agent and generates multi-step cold pitch', async () => {
    render(<AgentStudioTab />);

    expect(screen.getAllByText(/وكيل صيد الصفقات والمبيعات B2B/i)[0]).toBeDefined();

    // Fill inputs
    const serviceInput = screen.getByPlaceholderText(/مثال: خدمات تطوير تطبيقات الموبايل/i);
    fireEvent.change(serviceInput, { target: { value: 'حلول الذكاء الاصطناعي للمتاجر' } });

    // Click execute
    const runBtn = screen.getByRole('button', { name: /تشغيل الوكيل وإنتاج المخرجات/i });
    fireEvent.click(runBtn);

    await waitFor(() => {
      expect(screen.getByText(/المخرجات المعتمدة للتسليم الفوري/i)).toBeDefined();
      expect(screen.getByText(/سؤال سريع بخصوص مؤشرات النمو/i)).toBeDefined();
    }, { timeout: 3000 });

    // Copy action
    const copyBtn = screen.getByRole('button', { name: /نسخ النص/i });
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('3. Agent Studio Tab: Switches to E-Commerce & WhatsApp Agent and runs workflow', async () => {
    render(<AgentStudioTab />);

    // Switch to E-Commerce agent ribbon button
    const ecomBtn = screen.getAllByRole('button', { name: /وكيل مضاعفة مبيعات المتاجر/i })[0];
    fireEvent.click(ecomBtn);

    const productInput = screen.getByPlaceholderText(/مثال: مفرش نوم طبي فندقي/i);
    fireEvent.change(productInput, { target: { value: 'ماكينة قهوة ذكية' } });

    const runBtn = screen.getByRole('button', { name: /تشغيل الوكيل وإنتاج المخرجات/i });
    fireEvent.click(runBtn);

    await waitFor(() => {
      expect(screen.getByText(/تدفق رسائل واتساب لاستعادة السلات المتروكة/i)).toBeDefined();
      expect(screen.getByText(/باقة التوفير \(الأكثر طلباً ⭐\)/i)).toBeDefined();
    }, { timeout: 3000 });
  });

  it('4. Agency & MRR Calculator: Calculates net profit margins and copies pitch script', () => {
    render(<AgencyPricingCalculatorTab />);

    expect(screen.getByText(/احسب أرباحك الشهرية من بيع الاشتراكات/i)).toBeDefined();
    expect(screen.getByText(/صافي الربح الشهري المتوقع/i)).toBeDefined();

    // Copy pitch script
    const copyPitchBtn = screen.getByRole('button', { name: /نسخ الرسالة/i });
    fireEvent.click(copyPitchBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('5. Tech Architecture Tab: Renders API architecture and copies endpoint code', () => {
    render(<TechArchitectureTab />);

    expect(screen.getByText(/المعمارية التقنية وطريقة ربط البوابات/i)).toBeDefined();
    expect(screen.getAllByText(/api\/agent\/route\.js/i)[0]).toBeDefined();

    const copyCodeBtn = screen.getByRole('button', { name: /نسخ الكود/i });
    fireEvent.click(copyCodeBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('6. Full App Navigation Flow: Smooth switching between all 4 tabs', () => {
    render(<App />);

    expect(screen.getByText(/NexusAI Hub/i)).toBeDefined();

    // Switch to Studio Tab
    const studioNavBtn = screen.getAllByRole('button', { name: /2\. استوديو الوكلاء الـ 6/i })[0];
    fireEvent.click(studioNavBtn);
    expect(screen.getByText(/اختر الوكيل الذكي وولّد مخرجات حقيقية/i)).toBeDefined();

    // Switch to Calculator Tab
    const calcNavBtn = screen.getAllByRole('button', { name: /3\. حاسبة الأرباح و MRR/i })[0];
    fireEvent.click(calcNavBtn);
    expect(screen.getByText(/متغيرات نموذج الإيرادات والنمو/i)).toBeDefined();

    // Switch to Blueprint Tab
    const bpNavBtn = screen.getAllByRole('button', { name: /4\. المعمارية التقنية والربط/i })[0];
    fireEvent.click(bpNavBtn);
    expect(screen.getByText(/كيف تربط هذا البرنامج ببوابات الدفع/i)).toBeDefined();
  });

});
