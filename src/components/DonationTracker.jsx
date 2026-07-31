import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  Building2, 
  Image as ImageIcon, 
  Cpu, 
  ChevronRight,
  Download,
  Share2,
  PackageCheck,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export const DonationTracker = () => {
  const { 
    trackerModalDonation, 
    setTrackerModalDonation, 
    setReceiptModalDonation,
    setIsBlockchainOpen,
    donations
  } = useApp();

  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'invoice' | 'ledger'
  const [selectedProofPhoto, setSelectedProofPhoto] = useState(null);

  if (!trackerModalDonation) return null;

  // Empty state if no donations exist
  if (trackerModalDonation === 'empty' || donations.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          
          <button
            onClick={() => setTrackerModalDonation(null)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto glow-emerald">
            <PackageCheck className="w-10 h-10 text-emerald-400 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
              Tracker Active
            </span>
            <h3 className="text-2xl font-black text-white">No Live Donations Tracked Yet</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              You haven't made any purpose-driven contributions yet. Donate via UPI or book a doorstep item pickup to unlock real-time proof photos, vendor bills, and instant 80G tax receipts!
            </p>
          </div>

          <button
            onClick={() => {
              setTrackerModalDonation(null);
              const el = document.getElementById('live-requirements');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Browse Live Requirements & Donate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    );
  }

  const don = trackerModalDonation;

  const stagesList = [
    { num: 1, label: 'Payment Settled' },
    { num: 2, label: 'Funds Allocated' },
    { num: 3, label: 'Vendor Purchase' },
    { num: 4, label: 'Delivered to Beneficiaries' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-400">{don.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">
                  {don.status}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{don.reqTitle}</h3>
            </div>
          </div>

          <button
            onClick={() => setTrackerModalDonation(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Bar */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Beneficiary NGO: </span>
            <span className="font-bold text-white">{don.ngoName}</span>
          </div>
          <div>
            <span className="text-slate-400">Contribution: </span>
            <span className="font-extrabold text-emerald-400">
              {don.type === 'money' ? `₹${don.amount.toLocaleString()}` : `${don.itemsCount} ${don.unitName}`}
            </span>
          </div>
        </div>

        {/* Progress Stepper Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center justify-between relative">
            
            {/* Connecting line */}
            <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-800 -z-0" />
            <div 
              className="absolute left-6 top-4 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
              style={{ width: `${((don.currentStage - 1) / 3) * 100}%` }}
            />

            {stagesList.map(st => {
              const isPassed = st.num <= don.currentStage;
              const isCurrent = st.num === don.currentStage;

              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPassed 
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 shadow-md' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1.5 hidden sm:block ${
                    isCurrent ? 'text-emerald-400 font-bold' : isPassed ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {st.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-6">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'timeline'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Milestone Proof Timeline
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center space-x-1 ${
              activeTab === 'ledger'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Cryptographic Ledger</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'timeline' && (
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {don.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-9">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  </div>

                  <div className="glass-card rounded-2xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">{item.time}</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.note}</p>

                    {/* Proof Photo Attachment */}
                    {item.proofPhoto && (
                      <div className="mt-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Attached Verification Photo</span>
                        <div 
                          onClick={() => setSelectedProofPhoto(item.proofPhoto)}
                          className="relative w-36 h-24 rounded-xl overflow-hidden border border-slate-700 cursor-pointer group"
                        >
                          <img 
                            src={item.proofPhoto} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                          <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded-md">View Proof</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.invoiceNo && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                        <span className="text-slate-400 font-mono">Invoice: {item.invoiceNo}</span>
                        <span className="text-emerald-400 font-bold flex items-center cursor-pointer hover:underline">
                          <FileText className="w-3.5 h-3.5 mr-1" /> View FSSAI Bill
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              ))}
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
                <div>
                  <span className="text-slate-500 block">Transaction Hash (SHA-256)</span>
                  <span className="text-emerald-400 break-all">{don.txHash}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">80G Digital Receipt Certificate</span>
                  <span className="text-white font-bold">{don.receiptNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Consensus Status</span>
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" />
                    Verified by 5/5 PurposePay AI Nodes
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setTrackerModalDonation(null);
                  setIsBlockchainOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Open Full Blockchain Block Explorer</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              setTrackerModalDonation(null);
              setReceiptModalDonation(don);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Download 80G Tax Receipt</span>
          </button>

          <button
            onClick={() => setTrackerModalDonation(null)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
          >
            Close
          </button>
        </div>

        {/* Expanded Image Viewer Sub-Modal */}
        {selectedProofPhoto && (
          <div className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 rounded-2xl p-2 border border-slate-800">
              <button
                onClick={() => setSelectedProofPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedProofPhoto} alt="Proof" className="w-full rounded-xl" />
              <p className="text-xs text-slate-400 text-center py-2">Geotagged & Timestamped Verification Image</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
