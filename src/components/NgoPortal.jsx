import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Sparkles, 
  Clock, 
  AlertCircle,
  IndianRupee,
  Package,
  X,
  Image as ImageIcon,
  Flame,
  Check,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const NgoPortal = () => {
  const { 
    ngos, 
    requirements, 
    donations, 
    createRequirement, 
    advanceDonationMilestone,
    user 
  } = useApp();

  // Find NGO matching current logged in user or default to first NGO
  const activeNgo = ngos.find(n => n.name.toLowerCase().includes(user.name.split(' ')[0].toLowerCase())) || ngos[0];

  // Requirements belonging to this NGO
  const ngoRequirements = requirements.filter(r => r.ngoId === activeNgo.id || r.ngoName === activeNgo.name);

  // Donations belonging to this NGO
  const ngoDonations = donations.filter(d => d.ngoId === activeNgo.id || d.ngoName === activeNgo.name);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form states for creating requirement
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Child Nutrition');
  const [newType, setNewType] = useState('money'); // 'money' | 'item'
  const [newTarget, setNewTarget] = useState('50000');
  const [newUnitPrice, setNewUnitPrice] = useState('150');
  const [newUnitName, setNewUnitName] = useState('Meal Kits');
  const [newUrgency, setNewUrgency] = useState('high');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80');

  // Milestone advance form modal state
  const [updatingDonation, setUpdatingDonation] = useState(null);
  const [nextStageTitle, setNextStageTitle] = useState('');
  const [nextStageNote, setNextStageNote] = useState('');
  const [proofPhotoUrl, setProofPhotoUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80');
  const [invoiceNo, setInvoiceNo] = useState('INV-AKP-2026-9021');

  // Preset sample proof images
  const sampleProofImages = [
    { label: 'Kitchen Preparation', url: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=400&auto=format&fit=crop&q=80' },
    { label: 'Food Packaging', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80' },
    { label: 'School Delivery', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80' },
    { label: 'Blanket Distribution', url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&auto=format&fit=crop&q=80' }
  ];

  const handleCreateReqSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    createRequirement({
      title: newTitle,
      category: newCategory,
      type: newType,
      targetAmount: parseFloat(newTarget) || 50000,
      unitPrice: parseFloat(newUnitPrice) || 150,
      unitName: newUnitName || 'Units',
      urgency: newUrgency,
      description: newDesc || 'Verified NGO live requirement drive for community support.',
      deadline: '2026-10-15',
      image: newImage,
      ngoId: activeNgo.id,
      ngoName: activeNgo.name
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    
    setSuccessToast('New requirement published successfully to the Live Requirement Board!');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleAdvanceMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!updatingDonation) return;

    const nextStage = Math.min(4, updatingDonation.currentStage + 1);

    advanceDonationMilestone({
      donationId: updatingDonation.id,
      nextStage,
      title: nextStageTitle || (nextStage === 2 ? 'Funds Allocated to Operations' : nextStage === 3 ? 'Vendor Purchase Completed' : 'Delivered to Beneficiaries'),
      note: nextStageNote || 'Proof photo and invoice verified by NGO representative.',
      proofPhotoUrl,
      invoiceNo: nextStage === 3 ? invoiceNo : null
    });

    setUpdatingDonation(null);
    setSuccessToast(`Milestone stage ${nextStage} proof uploaded and verified!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Toast */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* NGO Portal Header */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={activeNgo.logo} 
              alt={activeNgo.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md" 
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white">{activeNgo.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {activeNgo.tier}
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-mono mt-0.5">80G Reg: {activeNgo.regNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 block">Trust & Proof Score</span>
              <span className="text-lg font-black text-emerald-400">{activeNgo.trustScore}% Verified</span>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-500 text-white font-extrabold text-xs shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center space-x-2 glow-indigo"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post New Live Requirement</span>
            </button>
          </div>
        </div>

        {/* Section 1: Active Posted Live Requirements */}
        <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xl font-extrabold text-white">My Active Posted Requirements</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Live money and item wishlists published by {activeNgo.name} on the donor feed.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              {ngoRequirements.length} Active Drive(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ngoRequirements.map(req => {
              const percent = Math.min(100, Math.round((req.raisedAmount / req.targetAmount) * 100));

              return (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3.5">
                  <img src={req.image} alt={req.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">{req.category}</span>
                      <span className="text-[10px] font-bold text-emerald-400">{percent}% Fulfilled</span>
                    </div>

                    <h3 className="text-xs font-bold text-white truncate">{req.title}</h3>

                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>₹{req.unitPrice} / {req.unitName}</span>
                      <span className="text-slate-300 font-bold">{req.donorsCount} Donors</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Incoming Contributions & Proof Upload Desk */}
        <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xl font-extrabold text-white">Donor Contributions & Proof Upload Desk</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Upload vendor invoices and geotagged distribution photos to advance donor milestone timelines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ngoDonations.map(don => (
              <div key={don.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">{don.id}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">
                    Stage {don.currentStage}/4: {don.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{don.reqTitle}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Donor: <strong className="text-slate-200">{don.donorName}</strong> ({don.donorUpi})</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="font-extrabold text-white">
                    {don.type === 'money' ? `₹${don.amount.toLocaleString()}` : `${don.itemsCount} ${don.unitName}`}
                  </span>

                  {don.currentStage < 4 ? (
                    <button
                      onClick={() => {
                        setUpdatingDonation(don);
                        setNextStageTitle('');
                        setNextStageNote('');
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-md hover:scale-[1.02] transition-all flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Proof (Stage {don.currentStage + 1})</span>
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center text-xs">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> All Proofs Complete
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL 1: POST NEW LIVE REQUIREMENT */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-extrabold text-white">Post New Live Requirement</h3>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateReqSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Requirement Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 High-Protein Meal Kits for Primary School Children"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                    >
                      <option value="Child Nutrition">Child Nutrition</option>
                      <option value="Warm Clothes / Items">Warm Clothes / Items</option>
                      <option value="Education">Education</option>
                      <option value="Medical & Mobility">Medical & Mobility</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Donation Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                    >
                      <option value="money">UPI Money Wishlist</option>
                      <option value="item">Doorstep Item Pickup</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Target Total</label>
                    <input
                      type="number"
                      value={newTarget}
                      onChange={(e) => setNewTarget(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Unit Price (₹)</label>
                    <input
                      type="number"
                      value={newUnitPrice}
                      onChange={(e) => setNewUnitPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Unit Name</label>
                    <input
                      type="text"
                      value={newUnitName}
                      onChange={(e) => setNewUnitName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Urgency Priority</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="critical">Critical Emergency Need</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Standard Goal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Detailed Cause Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe how the funds or physical items will be utilized and distributed..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-500 text-white font-extrabold text-xs shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Requirement to Live Feed</span>
                </button>
              </form>

            </div>
          </div>
        )}

        {/* MODAL 2: ADVANCE MILESTONE & PROOF UPLOAD */}
        {updatingDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Upload Proof (Stage {updatingDonation.currentStage + 1})</h3>
                </div>
                <button onClick={() => setUpdatingDonation(null)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdvanceMilestoneSubmit} className="space-y-3.5">
                
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Updating Transaction</span>
                  <span className="font-mono font-bold text-emerald-400">{updatingDonation.id}</span>
                  <p className="text-white font-bold truncate mt-0.5">{updatingDonation.reqTitle}</p>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Milestone Title *</label>
                  <input
                    type="text"
                    placeholder={updatingDonation.currentStage + 1 === 2 ? 'e.g. Raw Material Procurement at Kitchen' : updatingDonation.currentStage + 1 === 3 ? 'e.g. FSSAI Cooking & Vendor Bill' : 'e.g. Distributed to Govt Primary School Students'}
                    value={nextStageTitle}
                    onChange={(e) => setNextStageTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Detailed Verification Note *</label>
                  <textarea
                    rows={2}
                    placeholder="Provide exact details regarding vendor invoices, location, or school headmaster sign-off..."
                    value={nextStageNote}
                    onChange={(e) => setNextStageNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Preset Proof Photo Selection */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Select / Attach Geotagged Proof Image</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {sampleProofImages.map((img, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setProofPhotoUrl(img.url)}
                        className={`p-1.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                          proofPhotoUrl === img.url ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-950'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-[10px] text-slate-300 font-semibold truncate">{img.label}</span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste custom image URL..."
                    value={proofPhotoUrl}
                    onChange={(e) => setProofPhotoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-[11px] focus:outline-none"
                  />
                </div>

                {updatingDonation.currentStage + 1 === 3 && (
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Vendor Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Publish Verified Milestone Proof</span>
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
