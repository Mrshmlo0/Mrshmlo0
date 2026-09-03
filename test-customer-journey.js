import puppeteer from 'puppeteer';

async function runCustomerSimulation() {
  console.log('🚀 Starting Full Customer Experience Simulation on OmniAI PRO...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // Listen to console logs from page
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('  ⚠️ [Browser Error]:', msg.text());
    }
  });

  // Track dialogs/alerts automatically
  page.on('dialog', async dialog => {
    console.log(`  💬 [Dialog Popup]: "${dialog.message()}"`);
    await dialog.accept();
  });

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASSED: ${message}`);
      testsPassed++;
    } else {
      console.error(`  ❌ FAILED: ${message}`);
      testsFailed++;
    }
  }

  try {
    // 1. Visit Landing Page
    console.log('▶️ [Step 1]: Visiting Landing Page (http://localhost:3000)...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    const pageTitle = await page.title();
    assert(pageTitle.length > 0, `Page loaded with title: "${pageTitle}"`);

    // Verify initial credits
    const initialCredits = await page.$eval('.text-emerald-400.font-mono', el => el.textContent);
    assert(initialCredits === '300', `Initial user credits are 300 points (Actual: ${initialCredits})`);

    // 2. Test Ultra Studios Hub Navigation
    console.log('\n▶️ [Step 2]: Navigating to Ultra Studios Hub (استوديوهات النخبة)...');
    const ultraStudioBtn = await page.waitForSelector('nav button:nth-child(2)');
    await ultraStudioBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // 3. Test Studio 1: Visual & Ad Design Studio
    console.log('\n▶️ [Step 3]: Testing Studio 1 - Visual & Ad Design Studio (استوديو التصميم والصور)...');
    const visualStudioTab = await page.waitForSelector('button:has-text("استوديو التصميم والصور الإعلانية"), button:has-text("تصميم فوري")');
    await visualStudioTab.click();
    await new Promise(r => setTimeout(r, 300));

    // Change ratio to Story (9:16)
    const storyRatioBtn = await page.waitForSelector('button:has-text("9:16 ستوري / تيك توك")');
    await storyRatioBtn.click();

    // Click Generate Design
    const generateDesignBtn = await page.waitForSelector('button:has-text("توليد وتصميم الإعلان المباشر")');
    await generateDesignBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    // Verify Canvas was rendered
    const hasCanvas = await page.$eval('canvas', el => el && el.width > 0 && el.height > 0);
    assert(hasCanvas, 'HTML5 Canvas rendered ad artwork successfully');

    // Verify Download PNG button exists
    const downloadPngBtn = await page.$('button:has-text("تحميل التصميم الفوري كـ PNG")');
    assert(downloadPngBtn !== null, 'PNG 1-click Download button is active and visible');
    if (downloadPngBtn) await downloadPngBtn.click();

    // 4. Test Studio 2: Marketing & Social Calendar Studio
    console.log('\n▶️ [Step 4]: Testing Studio 2 - Marketing & Social Calendar Studio (محرر الحملات التسويقية)...');
    const marketingTabBtn = await page.waitForSelector('button:has-text("محرر الحملات التسويقية والجدول الشهري"), button:has-text("3 نسخ إعلانية")');
    await marketingTabBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const generateMarketingBtn = await page.waitForSelector('button:has-text("توليد الحملة وجدول المحتوى")');
    await generateMarketingBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // Verify Tab switching in Marketing
    const aidaTab = await page.waitForSelector('button:has-text("صيغة AIDA")');
    await aidaTab.click();
    await new Promise(r => setTimeout(r, 200));

    const calendarTab = await page.waitForSelector('button:has-text("جدول المحتوى (30 يوماً)")');
    await calendarTab.click();
    await new Promise(r => setTimeout(r, 200));

    const calendarRows = await page.$$('table tbody tr');
    assert(calendarRows.length > 0, `30-Day Marketing Calendar generated with ${calendarRows.length} sample schedule entries`);

    const downloadMarketingBtn = await page.$('button:has-text("تحميل خطة الحملة والتقويم")');
    assert(downloadMarketingBtn !== null, 'Campaign & Calendar download button is active');
    if (downloadMarketingBtn) await downloadMarketingBtn.click();

    // 5. Test Studio 3: Harvard ATS Resume & Career Accelerator
    console.log('\n▶️ [Step 5]: Testing Studio 3 - Harvard ATS Resume Accelerator (مسرّع السير الذاتية هارفارد)...');
    const resumeTabBtn = await page.waitForSelector('button:has-text("مسرّع السير الذاتية بتنسيق هارفارد ATS"), button:has-text("تنسيق A4")');
    await resumeTabBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const generateResumeBtn = await page.waitForSelector('button:has-text("توليد السيرة الذاتية بنموذج هارفارد")');
    await generateResumeBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    // Verify ATS Score is displayed
    const atsScore = await page.$eval('.text-emerald-400.font-black', el => el.textContent);
    assert(atsScore.includes('98%') || atsScore.includes('ATS'), `ATS Resume Score is verified: "${atsScore}"`);

    // Verify A4 Preview Paper
    const a4Paper = await page.$('.bg-white.text-slate-900.shadow-2xl');
    assert(a4Paper !== null, 'A4 Harvard Document paper preview is rendered beautifully');

    // 6. Test Studio 4: E-Commerce & WhatsApp Closer Studio
    console.log('\n▶️ [Step 6]: Testing Studio 4 - E-Commerce & WhatsApp Closer (استوديو مبيعات المتاجر والواتساب)...');
    const ecomTabBtn = await page.waitForSelector('button:has-text("استوديو مبيعات المتاجر والواتساب"), button:has-text("صفحة بيع")');
    await ecomTabBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const generateEcomBtn = await page.waitForSelector('button:has-text("توليد حزمة المبيعات المتكاملة")');
    await generateEcomBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // Switch to WhatsApp Bot tab
    const waTab = await page.waitForSelector('button:has-text("بوت الواتساب 💬")');
    await waTab.click();
    await new Promise(r => setTimeout(r, 300));

    const waSteps = await page.$$('.font-bold.text-emerald-400');
    assert(waSteps.length >= 4, `WhatsApp closing flow generated with ${waSteps.length} automated steps`);

    // 7. Test Studio 5: Legal Contract Auditor
    console.log('\n▶️ [Step 7]: Testing Studio 5 - Legal Contract Auditor (المستشار القانوني وتدقيق العقود)...');
    const legalTabBtn = await page.waitForSelector('button:has-text("المستشار القانوني وتدقيق العقود"), button:has-text("كشف الثغرات")');
    await legalTabBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const auditContractBtn = await page.waitForSelector('button:has-text("بدء الفحص القانوني الذكي")');
    await auditContractBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    const riskScore = await page.$eval('.text-rose-400.font-black', el => el.textContent);
    assert(riskScore.length > 0, `Legal Risk Score verified: "${riskScore}"`);

    // 8. Test 24 Services Catalog & Modal Execution
    console.log('\n▶️ [Step 8]: Testing 24 Services Catalog & Unified Modal Execution...');
    const catalogNavBtn = await page.waitForSelector('nav button:has-text("الخدمات الـ 24")');
    await catalogNavBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const serviceCards = await page.$$('.group.relative.rounded-3xl.bg-slate-900\\/70');
    assert(serviceCards.length === 24, `24 Pro Services catalog loaded all ${serviceCards.length} service cards`);

    // Open first service modal
    const openServiceBtn = await page.waitForSelector('.group\\/btn');
    await openServiceBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const modalTitle = await page.$eval('.text-lg.sm\\:text-xl.font-black.text-white', el => el.textContent);
    assert(modalTitle.length > 0, `Service Modal opened: "${modalTitle}"`);

    // Click Generate in modal
    const modalGenerateBtn = await page.waitForSelector('button:has-text("تشغيل وتوليد المخرجات الاحترافية")');
    await modalGenerateBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    const generatedOutput = await page.$('.font-mono.whitespace-pre-wrap');
    assert(generatedOutput !== null, 'Service Workstation generated rich formatted output successfully');

    // Close modal
    const closeModalBtn = await page.waitForSelector('button[aria-label="إغلاق"], button:has-text("إغلاق نافذة العمل")');
    await closeModalBtn.click();
    await new Promise(r => setTimeout(r, 300));

    // 9. Test AI Project Incubator
    console.log('\n▶️ [Step 9]: Testing AI Project Incubator (مسرّعة المشاريع)...');
    const incubatorNavBtn = await page.waitForSelector('nav button:has-text("مسرّعة المشاريع")');
    await incubatorNavBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const incubatorBtn = await page.waitForSelector('button:has-text("توليد وتجسيد خطة المشروع المتكاملة")');
    await incubatorBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    const ctoDeliverable = await page.$('button:has-text("المدير التقني CTO")');
    assert(ctoDeliverable !== null, 'Incubator 4 Autonomous Executive Agents generated complete roadmap');

    // 10. Test Pricing Section & Upgrade Flow
    console.log('\n▶️ [Step 10]: Testing Pricing Plan Subscription & Credit Addition...');
    const pricingNavBtn = await page.waitForSelector('button:has-text("الباقات")');
    await pricingNavBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const proPlanBtn = await page.waitForSelector('button:has-text("اختر باقة النمو السريع (Pro)")');
    await proPlanBtn.click();
    await new Promise(r => setTimeout(r, 300));

    // 11. Test Founder Protected Admin Modal (PIN 2026)
    console.log('\n▶️ [Step 11]: Testing Founder Security & PIN-Protected Hub...');
    const ownerBtn = await page.waitForSelector('button:has-text("المالك 👑"), button:has-text("لوحة المالك 👑")');
    await ownerBtn.click();
    await new Promise(r => setTimeout(r, 400));

    // Enter wrong PIN first
    const pinInput = await page.waitForSelector('input[type="password"]');
    await pinInput.type('1111');
    const unlockBtn = await page.waitForSelector('button:has-text("فتح لوحة المالك")');
    await unlockBtn.click();
    await new Promise(r => setTimeout(r, 300));

    // Clear and enter correct PIN 2026
    await pinInput.click({ clickCount: 3 });
    await pinInput.type('2026');
    await unlockBtn.click();
    await new Promise(r => setTimeout(r, 500));

    const founderHubHeader = await page.$('h2:has-text("لوحة التحكم السرية للمؤسس والمالك")');
    assert(founderHubHeader !== null, 'Founder Hub successfully unlocked with security PIN (2026)');

    console.log('\n========================================');
    console.log(`🎉 CUSTOMER SIMULATION RESULTS:`);
    console.log(`   ✅ Total Tests Passed: ${testsPassed}`);
    console.log(`   ❌ Total Tests Failed: ${testsFailed}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Exception occurred during customer simulation:', error);
  } finally {
    await browser.close();
  }
}

runCustomerSimulation();
