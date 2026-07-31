import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { setRole, setIsBlockchainOpen } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-base font-extrabold text-white">
                Purpose<span className="text-emerald-400">Pay</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Reimagining standard UPI applications for transparent, goal-oriented charitable giving with real-time photo proofs and 80G receipts.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider mb-3">Donors & Giving</h4>
            <ul className="space-y-2">
              <li><a href="#live-requirements" className="hover:text-emerald-400 transition-colors">Live Item & Fund Wishlists</a></li>
              <li><button onClick={() => setRole('donor')} className="hover:text-emerald-400 transition-colors">Tax Exemption 80G Calculator</button></li>
              <li><button onClick={() => setIsBlockchainOpen(true)} className="hover:text-emerald-400 transition-colors">Blockchain Audit Ledger</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider mb-3">NGOs & Governance</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setRole('ngo')} className="hover:text-indigo-400 transition-colors">NGO Portal & Proof Upload</button></li>
              <li><button onClick={() => setRole('admin')} className="hover:text-amber-400 transition-colors">Admin Verification Desk</button></li>
              <li><a href="#verified-ngos" className="hover:text-emerald-400 transition-colors">FCRA & 80G Accreditation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider mb-3">Security & Compliance</h4>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>NPCI UPI Compliant</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                All donations are settled directly into verified 12A/80G registered NGO bank accounts.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 PurposePay. Built for Purpose-Driven Giving with Transparent UPI Architecture.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Powered by NPCI UPI 2.0 & AI Proof Audits</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
