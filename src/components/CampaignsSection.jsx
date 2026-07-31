import React from 'react';
import { useApp } from '../context/AppContext';
import { Megaphone, Users, Clock, Flame, ArrowRight, IndianRupee } from 'lucide-react';

export const CampaignsSection = () => {
  const { campaigns, setPaymentModalReq } = useApp();

  return (
    <section className="py-12 bg-slate-950/80 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Megaphone className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Emergency Drives</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Urgent Relief Campaigns</h2>
        <p className="text-sm text-slate-400 mt-1">High-priority disaster response and time-sensitive impact drives requiring immediate aid.</p>

        {/* Campaigns List */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map(camp => {
            const percent = Math.min(100, Math.round((camp.raised / camp.target) * 100));

            return (
              <div 
                key={camp.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Banner Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={camp.banner} 
                      alt={camp.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {camp.urgent && (
                      <div className="absolute top-3 left-3 bg-red-600/90 text-white px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center space-x-1 animate-pulse">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Emergency Active</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-xs font-semibold text-amber-300 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{camp.daysLeft} Days Left</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <span className="text-xs font-semibold text-amber-400">{camp.organizer}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{camp.title}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{camp.description}</p>

                    {/* Progress */}
                    <div className="mt-5 space-y-2">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <span className="text-slate-400">Raised: </span>
                          <span className="font-bold text-white">₹{camp.raised.toLocaleString()}</span>
                          <span className="text-slate-500"> / ₹{camp.target.toLocaleString()}</span>
                        </div>
                        <span className="font-extrabold text-amber-400">{percent}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span className="flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {camp.backers.toLocaleString()} Backers Joined
                        </span>
                        <span className="text-emerald-400 font-semibold">100% Tax Deductible (80G)</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setPaymentModalReq({
                      id: camp.id,
                      ngoId: 'camp-ngo',
                      ngoName: camp.organizer,
                      title: camp.title,
                      unitPrice: 1000,
                      unitName: 'Emergency Relief Package'
                    })}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                  >
                    <IndianRupee className="w-4 h-4" />
                    <span>Contribute to Emergency Relief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
