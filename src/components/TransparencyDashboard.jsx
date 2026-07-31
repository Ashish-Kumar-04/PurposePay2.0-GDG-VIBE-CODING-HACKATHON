import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Receipt, 
  Heart, 
  Package, 
  ShieldCheck, 
  PieChart as PieIcon, 
  ChevronRight, 
  ExternalLink,
  FileText
} from 'lucide-react';

export const TransparencyDashboard = () => {
  const { 
    donations, 
    totalMoneyDonated, 
    totalItemsDonated, 
    totalTaxSavings,
    setTrackerModalDonation,
    setReceiptModalDonation
  } = useApp();

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <PieIcon className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Impact Analytics</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Transparency Dashboard</h2>
            <p className="text-sm text-slate-400 mt-1">Real-time overview of your giving portfolio, tax benefits, and verified beneficiary milestones.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Money Donated</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">₹{totalMoneyDonated.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">100% Verified via UPI</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Items Donated</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">{totalItemsDonated} Units</p>
            <p className="text-[11px] text-indigo-400 font-medium mt-1">Doorstep Pickup Handled</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">80G Tax Saved</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Receipt className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">₹{totalTaxSavings.toLocaleString()}</p>
            <p className="text-[11px] text-amber-400 font-medium mt-1">50% Exemption Claimable</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Trust Index</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">100%</p>
            <p className="text-[11px] text-purple-400 font-medium mt-1">Proof Photo Verified</p>
          </div>

        </div>

        {/* Donations History Table */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">My Active & Completed Giving History</h3>
            <span className="text-xs text-slate-400">{donations.length} Transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Tx ID / Date</th>
                  <th className="px-6 py-3.5">NGO & Cause</th>
                  <th className="px-6 py-3.5">Amount / Item</th>
                  <th className="px-6 py-3.5">Milestone Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {donations.map(don => (
                  <tr key={don.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-emerald-400 block">{don.id}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(don.date).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <span className="font-bold text-white block">{don.ngoName}</span>
                      <span className="text-[11px] text-slate-400 truncate block">{don.reqTitle}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-extrabold text-white block">
                        {don.type === 'money' ? `₹${don.amount.toLocaleString()}` : `${don.itemsCount} ${don.unitName}`}
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">Tax Saved: ₹{don.taxSavings}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                        Stage {don.currentStage}/4: {don.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setTrackerModalDonation(don)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-bold transition-all"
                      >
                        Track Proof
                      </button>
                      <button
                        onClick={() => setReceiptModalDonation(don)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-all"
                      >
                        80G Receipt
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
