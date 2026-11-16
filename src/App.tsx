/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { AboutSection } from './components/AboutSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ChambersSection } from './components/ChambersSection';
import { SurgicalGuidesView } from './components/SurgicalGuidesView';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { BookingModal } from './components/BookingModal';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeView === 'portfolio' && (
          <>
            <HeroSection />
            <SpecialtiesSection />
            <AboutSection />
            <CaseStudiesSection />
            <ChambersSection />
          </>
        )}

        {activeView === 'guides' && <SurgicalGuidesView />}

        {activeView === 'dashboard' && <DashboardLayout />}
      </main>

      <Footer />

      {/* Global Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Global Interactive Modals */}
      <BookingModal />
      <EmailNotificationModal />
      <RoleSwitcherModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
