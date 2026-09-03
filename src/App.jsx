import React, { useState } from 'react';
import { Header } from './components/Header';
import { MarketResearchTab } from './components/MarketResearchTab';
import { AgentStudioTab } from './components/AgentStudioTab';
import { AgencyPricingCalculatorTab } from './components/AgencyPricingCalculatorTab';
import { TechArchitectureTab } from './components/TechArchitectureTab';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('research'); // 'research' | 'studio' | 'calculator' | 'blueprint'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'research' && (
          <MarketResearchTab
            onSwitchToStudio={() => setActiveTab('studio')}
            onSwitchToCalculator={() => setActiveTab('calculator')}
          />
        )}

        {activeTab === 'studio' && (
          <AgentStudioTab />
        )}

        {activeTab === 'calculator' && (
          <AgencyPricingCalculatorTab />
        )}

        {activeTab === 'blueprint' && (
          <TechArchitectureTab />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
