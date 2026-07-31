import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Flame, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Package, 
  IndianRupee, 
  ArrowUpRight, 
  Filter, 
  Zap,
  Shirt,
  Truck
} from 'lucide-react';

export const LiveRequirementBoard = () => {
  const { 
    requirements, 
    setPaymentModalReq, 
    setItemModalReq, 
    searchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'money' | 'item'

  const categories = ['All', 'Child Nutrition', 'Warm Clothes / Items', 'Education', 'Medical & Mobility'];

  // Filter requirements
  const filteredReqs = requirements.filter(req => {
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.ngoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || req.category === selectedCategory;

    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'money' && req.type === 'money') || 
      (activeTab === 'item' && req.type === 'item');

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <section id="live-requirements" className="py-12 bg-slate-950/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Flame className="w-4 h-4 animate-bounce" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Wishlist</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Live Requirement Board</h2>
            <p className="text-sm text-slate-400 mt-1">Verified item and fund requirements requested directly by accredited NGOs.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Type Tab Selector */}
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Needs
              </button>
              <button
                onClick={() => setActiveTab('money')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'money' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                UPI Funds
              </button>
              <button
                onClick={() => setActiveTab('item')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'item' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Clothes / Item Pickups
              </button>
            </div>

          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 flex items-center pr-2">
            <Filter className="w-3.5 h-3.5 mr-1" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredReqs.map(req => {
            const percent = Math.min(100, Math.round((req.raisedAmount / req.targetAmount) * 100));

            return (
              <div 
                key={req.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Card Header Image & Badges */}
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={req.image} 
                      alt={req.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* NGO Name Pill */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200">{req.ngoName}</span>
                    </div>

                    {/* Urgency Badge */}
                    <div className="absolute top-3 right-3">
                      {req.urgency === 'critical' && (
                        <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center space-x-1 animate-pulse">
                          <Zap className="w-3 h-3 fill-current" />
                          <span>Critical Need</span>
                        </span>
                      )}
                      {req.urgency === 'high' && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                          High Priority
                        </span>
                      )}
                      {req.urgency === 'medium' && (
                        <span className="px-3 py-1 rounded-full bg-indigo-500/90 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                          Verified Goal
                        </span>
                      )}
                    </div>

                    {/* Requirement Type Tag */}
                    <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-lg border text-xs font-bold backdrop-blur-md ${
                      req.type === 'item' ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300' : 'bg-slate-900/90 border-slate-700 text-emerald-300'
                    }`}>
                      {req.type === 'item' ? `Physical Item Drive: ${req.unitName}` : `₹${req.unitPrice.toLocaleString()} / ${req.unitName}`}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="font-semibold text-indigo-400">{req.category}</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Deadline: {req.deadline}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {req.title}
                    </h3>
                    
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {req.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-5 space-y-2">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <span className="text-slate-400 font-medium">Progress: </span>
                          <span className="font-bold text-white">
                            {req.type === 'money' 
                              ? `₹${req.raisedAmount.toLocaleString()} / ₹${req.targetAmount.toLocaleString()}`
                              : `${req.raisedAmount} / ${req.targetAmount} ${req.unitName}`
                            }
                          </span>
                        </div>
                        <span className="font-extrabold text-emerald-400">{percent}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-700 shadow-sm"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>{req.donorsCount} Donors Supported</span>
                        <span className="flex items-center text-slate-400 hover:text-slate-200 cursor-pointer">
                          <FileText className="w-3 h-3 mr-1 text-slate-400" />
                          {req.proofDocuments.length} Verified Docs
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Buttons (Strict Separation: Item vs Money) */}
                <div className="p-5 pt-0">
                  {req.type === 'item' ? (
                    /* ITEM / CLOTHES DONATION: Single prominent pickup button - NO MONEY PROMPT */
                    <button
                      onClick={() => setItemModalReq(req)}
                      className="btn-book-pickup w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-extrabold text-xs shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-indigo-400/30"
                    >
                      <Shirt className="w-4 h-4 text-white" />
                      <span className="text-white font-black">Donate Clothes / Book Doorstep Pickup</span>
                    </button>
                  ) : (
                    /* MONEY DONATION: UPI Donate button */
                    <button
                      onClick={() => setPaymentModalReq(req)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-md hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                    >
                      <IndianRupee className="w-4 h-4" />
                      <span>Donate Funds via UPI</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
