import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Star, 
  ExternalLink,
  ShieldCheck as ShieldIcon
} from 'lucide-react';

export const VerifiedNGOs = () => {
  const { ngos, setPaymentModalReq } = useApp();

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Verified Organizations</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Accredited NGO Partners</h2>
            <p className="text-sm text-slate-400 mt-1">Every organization is rigorously audited for 80G tax status, FCRA compliance, and financial disclosure.</p>
          </div>
        </div>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ngos.map(ngo => (
            <div 
              key={ngo.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Top Row: Logo, Title, Trust Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <img 
                      src={ngo.logo} 
                      alt={ngo.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" 
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white leading-tight">{ngo.name}</h3>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          {ngo.tier}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-400 font-medium mt-0.5">{ngo.tagline}</p>
                    </div>
                  </div>

                  {/* Trust Score Radial Meter */}
                  <div className="flex flex-col items-center bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">Trust Score</span>
                    <span className="text-lg font-extrabold text-emerald-400">{ngo.trustScore}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed line-clamp-2">
                  {ngo.description}
                </p>

                {/* Audit & Compliance Stats Pills */}
                <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">80G Registration</span>
                    <span className="font-mono text-slate-200 text-[11px] font-semibold">{ngo.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">FCRA Clearance</span>
                    <span className="text-emerald-400 font-semibold flex items-center text-[11px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> {ngo.fcraStatus}
                    </span>
                  </div>
                </div>

                {/* Metrics Bar */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {ngo.beneficiariesReached.toLocaleString()} Beneficiaries
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {ngo.address}
                  </span>
                  <span className="flex items-center text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                    {ngo.rating} ({ngo.reviewsCount})
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  UPI ID: <span className="text-emerald-400 font-bold">{ngo.upiId}</span>
                </span>

                <button
                  onClick={() => setPaymentModalReq({
                    id: `ngo-direct-${ngo.id}`,
                    ngoId: ngo.id,
                    ngoName: ngo.name,
                    title: `General Donation to ${ngo.name}`,
                    unitPrice: 500,
                    unitName: 'General Fund Contribution'
                  })}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5"
                >
                  <span>Support NGO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
