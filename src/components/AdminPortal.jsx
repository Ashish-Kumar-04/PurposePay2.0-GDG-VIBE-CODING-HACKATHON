import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Building2, 
  Users, 
  TrendingUp, 
  FileText,
  Search
} from 'lucide-react';

export const AdminPortal = () => {
  const { ngos, setNgos, donations } = useApp();

  const [aiAuditingNgo, setAiAuditingNgo] = useState(null);

  const toggleNgoStatus = (id) => {
    setNgos(prev => prev.map(n => {
      if (n.id === id) {
        const nextScore = n.trustScore === 98 ? 94 : 98;
        return { ...n, trustScore: nextScore };
      }
      return n;
    }));
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Governance Desk</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">NGO Verification & AI Fraud Prevention Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Audit 80G tax registration certificates, FCRA compliance, and proof upload velocity.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 block">AI Anomaly Status</span>
              <span className="text-xs font-extrabold text-emerald-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 0 Critical Fraud Flags
              </span>
            </div>
          </div>
        </div>

        {/* Verification Matrix Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Registered NGO Accreditation & Trust Score Matrix</h3>
            <span className="text-xs text-slate-400">{ngos.length} Verified Partners</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Organization Details</th>
                  <th className="px-6 py-3.5">80G Reg / FCRA</th>
                  <th className="px-6 py-3.5">AI Calculated Trust Score</th>
                  <th className="px-6 py-3.5">Proof Upload Velocity</th>
                  <th className="px-6 py-3.5 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {ngos.map(ngo => (
                  <tr key={ngo.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={ngo.logo} alt={ngo.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-white block">{ngo.name}</span>
                          <span className="text-[10px] text-slate-400">{ngo.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono">
                      <span className="text-slate-200 block font-semibold">{ngo.regNumber}</span>
                      <span className="text-emerald-400 text-[10px] flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {ngo.fcraStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-emerald-400">{ngo.trustScore}%</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">
                          {ngo.tier}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-slate-300 font-semibold block">97.4% On-Time Proofs</span>
                      <span className="text-[10px] text-slate-500">Avg response: 4.2 hours</span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setAiAuditingNgo(ngo)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-bold transition-all"
                      >
                        Run AI Fraud Check
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Audit Diagnostics Modal */}
        {aiAuditingNgo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
              
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white">AI Trust & Compliance Report</h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target NGO:</span>
                  <span className="font-bold text-white">{aiAuditingNgo.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Financial Transparency Index:</span>
                  <span className="text-emerald-400 font-bold">{aiAuditingNgo.auditScoreDetails.financialTransparency}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Vendor Invoice Match Rate:</span>
                  <span className="text-emerald-400 font-bold">100% Match</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Geotagged Photo Authenticity:</span>
                  <span className="text-emerald-400 font-bold">EXIF Verified</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Overall Anomaly Score:</span>
                  <span className="text-emerald-400 font-bold">0.02 (LOW RISK)</span>
                </div>
              </div>

              <button
                onClick={() => setAiAuditingNgo(null)}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-all"
              >
                Close Audit Report
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
