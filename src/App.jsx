import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { IntroPage } from './components/IntroPage';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LiveRequirementBoard } from './components/LiveRequirementBoard';
import { VerifiedNGOs } from './components/VerifiedNGOs';
import { CampaignsSection } from './components/CampaignsSection';
import { TransparencyDashboard } from './components/TransparencyDashboard';
import { NgoPortal } from './components/NgoPortal';
import { AdminPortal } from './components/AdminPortal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { ItemDonationModal } from './components/ItemDonationModal';
import { DonationTracker } from './components/DonationTracker';
import { ReceiptGenerator } from './components/ReceiptGenerator';
import { BlockchainLedgerModal } from './components/BlockchainLedgerModal';
import { PurposeBot } from './components/PurposeBot';
import { Footer } from './components/Footer';

const MainContent = () => {
  const { currentScreen, role, donations, setTrackerModalDonation } = useApp();

  const scrollToRequirements = () => {
    const el = document.getElementById('live-requirements');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTracker = () => {
    if (donations.length > 0) {
      setTrackerModalDonation(donations[0]);
    } else {
      setTrackerModalDonation('empty');
    }
  };

  if (currentScreen === 'intro') {
    return <IntroPage />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1">
        {role === 'donor' && (
          <>
            <HeroBanner 
              scrollToRequirements={scrollToRequirements}
              scrollToTracker={scrollToTracker}
            />
            <LiveRequirementBoard />
            <CampaignsSection />
            <VerifiedNGOs />
            <TransparencyDashboard />
          </>
        )}

        {role === 'ngo' && <NgoPortal />}

        {role === 'admin' && <AdminPortal />}
      </main>

      <Footer />

      {/* Global Modals */}
      <UpiPaymentModal />
      <ItemDonationModal />
      <DonationTracker />
      <ReceiptGenerator />
      <BlockchainLedgerModal />
      <PurposeBot />
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
