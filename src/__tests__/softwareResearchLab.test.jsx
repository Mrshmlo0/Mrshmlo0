// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { useState } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import { IdeaResearchTab } from '../components/IdeaResearchTab';
import { TechStackAdvisorTab } from '../components/TechStackAdvisorTab';
import { FeaturePlannerTab } from '../components/FeaturePlannerTab';
import { ResearchNotebookTab } from '../components/ResearchNotebookTab';
import { getDefaultResearchData } from '../utils/researchStore';

beforeEach(() => {
  localStorage.clear();
  window.alert = vi.fn();
});

afterEach(() => {
  cleanup();
});

describe('Software Research & Architecture Lab - Tests', () => {

  it('1. App loads correctly with Header and Initial Idea Research view', () => {
    render(<App />);

    expect(screen.getByText(/Software Research Lab/i)).toBeDefined();
    expect(screen.getByText(/تحديد هوية البرنامج والمشكلة الجوهرية/i)).toBeDefined();
    expect(screen.getAllByText(/برنامج سطح مكتب/i)[0]).toBeDefined();
  });

  it('2. Idea Research Tab: User can update project details and select platform', () => {
    function Wrapper() {
      const [data, setData] = useState(getDefaultResearchData());
      return (
        <div>
          <span data-testid="current-name">{data.projectName}</span>
          <span data-testid="current-type">{data.projectType}</span>
          <IdeaResearchTab projectData={data} setProjectData={setData} />
        </div>
      );
    }

    render(<Wrapper />);

    // Change project name by placeholder
    const nameInput = screen.getByPlaceholderText(/مثال: SmartTask Desktop, AI Automation Engine\.\.\./i);
    fireEvent.change(nameInput, { target: { value: 'HyperAI Desktop Studio' } });
    expect(screen.getByTestId('current-name').textContent).toBe('HyperAI Desktop Studio');

    // Select Web SaaS type
    const saasCard = screen.getAllByText(/برنامج سحابي/i)[0];
    fireEvent.click(saasCard);
    expect(screen.getByTestId('current-type').textContent).toBe('saas_web');
  });

  it('3. Tech Stack Tab: User can choose Frontend, Backend, and Database technologies', () => {
    function Wrapper() {
      const [data, setData] = useState(getDefaultResearchData());
      return (
        <div>
          <span data-testid="backend-val">{data.selectedTechStack?.backend}</span>
          <span data-testid="db-val">{data.selectedTechStack?.database}</span>
          <TechStackAdvisorTab projectData={data} setProjectData={setData} />
        </div>
      );
    }

    render(<Wrapper />);

    expect(screen.getByText(/اختيار الأدوات والتقنيات البرمجية لبناء البرنامج/i)).toBeDefined();

    // Select Python / FastAPI
    const fastapiBtn = screen.getByText(/Python \/ FastAPI/i);
    fireEvent.click(fastapiBtn);
    expect(screen.getByTestId('backend-val').textContent).toBe('Python / FastAPI');

    // Select PostgreSQL + Supabase
    const pgBtn = screen.getByText(/PostgreSQL \+ Supabase/i);
    fireEvent.click(pgBtn);
    expect(screen.getByTestId('db-val').textContent).toBe('PostgreSQL + Supabase');
  });

  it('4. Feature Planner Tab: User can add new features and prioritize them', () => {
    function Wrapper() {
      const [data, setData] = useState(getDefaultResearchData());
      return <FeaturePlannerTab projectData={data} setProjectData={setData} />;
    }

    render(<Wrapper />);

    expect(screen.getByText(/هندسة متطلبات البرنامج وميزات الإصدار الأول/i)).toBeDefined();

    // Add a feature
    const featureInput = screen.getByPlaceholderText(/مثال: تسجيل الدخول عبر Google/i);
    fireEvent.change(featureInput, { target: { value: 'نظام إدارة الرخص والمفاتيح المشفرة' } });

    const submitBtn = screen.getByRole('button', { name: /إضافة الميزة إلى قائمة متطلبات المشروع/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('نظام إدارة الرخص والمفاتيح المشفرة')).toBeDefined();
  });

  it('5. Research Notebook Tab: User can add notes and preview full SRS document', () => {
    function Wrapper() {
      const [data, setData] = useState(getDefaultResearchData());
      return <ResearchNotebookTab projectData={data} setProjectData={setData} onExportSRS={vi.fn()} />;
    }

    render(<Wrapper />);

    expect(screen.getByText(/أبحاثك وملاحظاتك ووثيقة المواصفات الكاملة/i)).toBeDefined();
    expect(screen.getByText(/وثيقة المواصفات البرمجية المجمعة/i)).toBeDefined();

    // Add note
    const titleInput = screen.getByPlaceholderText(/عنوان الملاحظة/i);
    const contentInput = screen.getByPlaceholderText(/اكتب تفاصيل الملاحظة/i);

    fireEvent.change(titleInput, { target: { value: 'ملاحظة عن تكلفة السيرفرات' } });
    fireEvent.change(contentInput, { target: { value: 'البدء مع خادم VPS بسعر 10$ شهرياً' } });

    const saveNoteBtn = screen.getByRole('button', { name: /حفظ الملاحظة في سجل المشروع/i });
    fireEvent.click(saveNoteBtn);

    expect(screen.getByText('ملاحظة عن تكلفة السيرفرات')).toBeDefined();
  });

});
