import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DeviceSimulatorBar } from './components/DeviceSimulatorBar';
import { Hero } from './components/Hero';
import { UltraStudiosHub } from './components/UltraStudiosHub';
import { AllServicesCatalog } from './components/AllServicesCatalog';
import { AutonomousProjectIncubator } from './components/AutonomousProjectIncubator';
import { SelfEvolutionEngine } from './components/SelfEvolutionEngine';
import { PricingSection } from './components/PricingSection';
import { TechStackSection } from './components/TechStackSection';
import { BlueprintModal } from './components/BlueprintModal';
import { MobileAppGuideModal } from './components/MobileAppGuideModal';
import { FounderAdminModal } from './components/FounderAdminModal';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'ultra-studios' | 'services-catalog' | 'incubator' | 'evolution'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'iphone' | 'android'
  const [userCredits, setUserCredits] = useState(300);
  const [currentUser, setCurrentUser] = useState({
    name: 'المشترك التجريبي',
    email: 'user@omniai.com',
    role: 'customer',
    plan: 'باقة البداية (Starter)',
    isLoggedIn: false
  });

  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [blueprintSection, setBlueprintSection] = useState('overview');
  const [mobileGuideOpen, setMobileGuideOpen] = useState(false);
  const [founderHubOpen, setFounderHubOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');

  const handleOpenBlueprint = (sectionId = 'overview') => {
    setBlueprintSection(sectionId);
    setBlueprintOpen(true);
  };

  const handleSelectPlan = (plan) => {
    setUserCredits((prev) => prev + plan.credits);
    alert(`🎉 تهانينا! تم تفعيل "${plan.name}" بنجاح وإضافة ${plan.credits.toLocaleString()} نقطة إلى رصيدك!`);
  };

  const scrollToPricing = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Require PIN verification if not already logged in as Owner
  const handleFounderHubClick = () => {
    if (currentUser.role === 'owner') {
      setFounderHubOpen(true);
    } else {
      setAuthInitialMode('admin_pin');
      setAuthModalOpen(true);
    }
  };

  const handleOpenUserAuth = () => {
    setAuthInitialMode('login');
    setAuthModalOpen(true);
  };

  const renderMainContent = () => (
    <>
      {activeTab === 'landing' && (
        <>
          <Hero
            onExploreUltraStudios={() => setActiveTab('ultra-studios')}
            onExploreIncubator={() => setActiveTab('incubator')}
            onExploreServices={() => setActiveTab('services-catalog')}
            onOpenCalculator={handleFounderHubClick}
            onOpenBlueprint={handleOpenBlueprint}
          />

          {/* Featured Ultra Studios Live Section */}
          <div className="bg-slate-950/70 border-b border-slate-800/80">
            <UltraStudiosHub
              userCredits={userCredits}
              setUserCredits={setUserCredits}
              onOpenPricing={scrollToPricing}
            />
          </div>

          <AllServicesCatalog
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
          <AutonomousProjectIncubator
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
          <SelfEvolutionEngine />
          <PricingSection
            onSelectPlan={handleSelectPlan}
            onOpenBlueprint={handleOpenBlueprint}
          />
          <TechStackSection />
        </>
      )}

      {activeTab === 'ultra-studios' && (
        <div className="pt-4">
          <UltraStudiosHub
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
        </div>
      )}

      {activeTab === 'services-catalog' && (
        <div className="pt-4">
          <AllServicesCatalog
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
        </div>
      )}

      {activeTab === 'incubator' && (
        <div className="pt-4">
          <AutonomousProjectIncubator
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
        </div>
      )}

      {activeTab === 'evolution' && (
        <div className="pt-4">
          <SelfEvolutionEngine />
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Device Simulator Bar */}
      <DeviceSimulatorBar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onOpenMobileGuide={() => setMobileGuideOpen(true)}
      />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCredits={userCredits}
        currentUser={currentUser}
        onOpenPricing={scrollToPricing}
        onOpenFounderHub={handleFounderHubClick}
        onOpenAuth={handleOpenUserAuth}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16 xl:pb-0">
        {deviceMode === 'desktop' ? (
          renderMainContent()
        ) : (
          /* Phone Frame Mockup View */
          <div className="py-8 px-4 flex justify-center items-center bg-slate-950/80 min-h-[90vh]">
            <div
              className={`relative bg-slate-900 border-[10px] shadow-2xl overflow-hidden transition-all duration-300 ${
                deviceMode === 'iphone'
                  ? 'border-slate-800 rounded-[50px] w-[390px] h-[844px] ring-4 ring-indigo-500/30'
                  : 'border-slate-800 rounded-[40px] w-[412px] h-[890px] ring-4 ring-emerald-500/30'
              }`}
            >
              {/* Phone Notch / Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pt-2 pointer-events-none">
                {deviceMode === 'iphone' ? (
                  <div className="w-28 h-5 bg-black rounded-full mx-auto" />
                ) : (
                  <div className="w-4 h-4 bg-black rounded-full mx-auto" />
                )}
              </div>

              {/* Phone Scrollable Screen Content */}
              <div className="w-full h-full overflow-y-auto pt-6 pb-16 scrollbar-thin">
                {renderMainContent()}
              </div>

              {/* Simulated Mobile Bottom Nav */}
              <MobileBottomNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenPricing={scrollToPricing}
              />
            </div>
          </div>
        )}
      </main>

      {/* Real Mobile Bottom Navigation (for actual mobile devices) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPricing={scrollToPricing}
      />

      {/* User Login & Admin PIN Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onAdminUnlocked={() => setFounderHubOpen(true)}
        initialMode={authInitialMode}
      />

      {/* Founder & Business Secrets Modal */}
      <FounderAdminModal
        isOpen={founderHubOpen}
        onClose={() => setFounderHubOpen(false)}
        onOpenMobileGuide={() => {
          setFounderHubOpen(false);
          setMobileGuideOpen(true);
        }}
        onOpenBlueprint={(sec) => {
          setFounderHubOpen(false);
          handleOpenBlueprint(sec);
        }}
      />

      {/* Strategic Master Blueprint Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
        initialSection={blueprintSection}
      />

      {/* Mobile App Deployment Guide Modal */}
      <MobileAppGuideModal
        isOpen={mobileGuideOpen}
        onClose={() => setMobileGuideOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenBlueprint={handleOpenBlueprint}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
