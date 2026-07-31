import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Receipt, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Package, 
  TrendingUp, 
  QrCode 
} from 'lucide-react';

export const HeroBanner = ({ scrollToRequirements, scrollToTracker }) => {
  const { totalMoneyDonated, totalTaxSavings, setRole } = useApp();

  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">
              India's 1st <span className="text-emerald-400 font-bold">UPI-Powered</span> Transparent Giving Platform
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Never Wonder Where Your <br className="hidden sm:inline" />
            <span className="gradient-text-emerald">Donation Goes</span> Again.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Donate directly to verified NGOs using any UPI app (GPay, PhonePe, Paytm). 
            Track every rupee step-by-step with live photo proof, vendor invoices, and instant 80G tax receipts.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToRequirements}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-extrabold text-base shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 glow-emerald"
          >
            <span>Donate Money / Items</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={scrollToTracker}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-panel text-white font-semibold text-base border border-slate-700 hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all flex items-center justify-center space-x-2"
          >
            <Receipt className="w-5 h-5 text-emerald-400" />
            <span>Track Active Donations</span>
          </button>
        </div>

        {/* UPI Compatibility Logos / Pills */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Pay</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>PhonePe</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Paytm UPI</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>BHIM</span>
          </span>
        </div>

        {/* Live Platform Stats Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">₹1.42 Cr+</p>
              <p className="text-xs text-slate-400 font-medium">Verified Donations</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">₹71.0 L+</p>
              <p className="text-xs text-slate-400 font-medium">80G Tax Saved</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">100%</p>
              <p className="text-xs text-slate-400 font-medium">Milestone Proofs</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">Blockchain</p>
              <p className="text-xs text-slate-400 font-medium">Audited Ledger</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
