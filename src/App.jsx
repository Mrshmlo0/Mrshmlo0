import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AutonomousProjectIncubator } from './components/AutonomousProjectIncubator';
import { SelfEvolutionEngine } from './components/SelfEvolutionEngine';
import { ServicesGrid } from './components/ServicesGrid';
import { InteractivePlayground } from './components/InteractivePlayground';
import { PricingSection } from './components/PricingSection';
import { RevenueCalculator } from './components/RevenueCalculator';
import { TechStackSection } from './components/TechStackSection';
import { BlueprintModal } from './components/BlueprintModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'incubator' | 'evolution' | 'playground' | 'calculator'
  const [userCredits, setUserCredits] = useState(150); // Starting trial credits
  const [selectedTool, setSelectedTool] = useState('copywriter');
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [blueprintSection, setBlueprintSection] = useState('overview');

  const handleOpenBlueprint = (sectionId = 'overview') => {
    setBlueprintSection(sectionId);
    setBlueprintOpen(true);
  };

  const handleSelectToolFromGrid = (toolId) => {
    setSelectedTool(toolId);
    setActiveTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCredits={userCredits}
        onOpenPricing={scrollToPricing}
        onOpenBlueprint={handleOpenBlueprint}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <>
            <Hero
              onExploreIncubator={() => setActiveTab('incubator')}
              onExploreServices={() => setActiveTab('playground')}
              onOpenCalculator={() => setActiveTab('calculator')}
              onOpenBlueprint={handleOpenBlueprint}
            />
            <AutonomousProjectIncubator
              userCredits={userCredits}
              setUserCredits={setUserCredits}
              onOpenPricing={scrollToPricing}
            />
            <SelfEvolutionEngine />
            <ServicesGrid
              onSelectTool={handleSelectToolFromGrid}
              onOpenBlueprint={handleOpenBlueprint}
            />
            <RevenueCalculator
              onOpenBlueprint={handleOpenBlueprint}
            />
            <PricingSection
              onSelectPlan={handleSelectPlan}
              onOpenBlueprint={handleOpenBlueprint}
            />
            <TechStackSection />
          </>
        )}

        {activeTab === 'incubator' && (
          <AutonomousProjectIncubator
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
        )}

        {activeTab === 'evolution' && (
          <SelfEvolutionEngine />
        )}

        {activeTab === 'playground' && (
          <InteractivePlayground
            initialTool={selectedTool}
            userCredits={userCredits}
            setUserCredits={setUserCredits}
            onOpenPricing={scrollToPricing}
          />
        )}

        {activeTab === 'calculator' && (
          <div className="pt-8">
            <RevenueCalculator onOpenBlueprint={handleOpenBlueprint} />
            <PricingSection
              onSelectPlan={handleSelectPlan}
              onOpenBlueprint={handleOpenBlueprint}
            />
          </div>
        )}
      </main>

      {/* Strategic Master Blueprint Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
        initialSection={blueprintSection}
      />

      {/* Footer */}
      <Footer
        onOpenBlueprint={handleOpenBlueprint}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
