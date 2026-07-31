import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Cpu, CheckCircle2, ShieldCheck, Database, Lock, Hash } from 'lucide-react';

export const BlockchainLedgerModal = () => {
  const { isBlockchainOpen, setIsBlockchainOpen, blockchain } = useApp();

  if (!isBlockchainOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-extrabold text-white">PurposePay Immutable Ledger Explorer</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Proof-of-Impact (PoI) Node
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Cryptographically signed audit blocks for 100% verifiable giving history.</p>
            </div>
          </div>

          <button
            onClick={() => setIsBlockchainOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ledger Blocks List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-mono text-xs">
          {blockchain.map((block) => (
            <div 
              key={block.blockHeight}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Block #{block.blockHeight}</span>
                </div>
                <span className="text-slate-500 text-[11px]">{block.timestamp}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Block Hash:</span>
                  <span className="text-emerald-400 break-all">{block.hash}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Prev Block Hash:</span>
                  <span className="text-slate-400 break-all">{block.prevHash}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-slate-300">
                <span>Donor: <strong className="text-white">{block.donor}</strong></span>
                <span>NGO: <strong className="text-white">{block.ngo}</strong></span>
                <span className="text-emerald-400 font-bold">{block.amount}</span>
                <span className="text-[10px] text-slate-500 font-sans">{block.verifiedBy}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>SHA-256 Cryptographic Integrity Intact</span>
          </div>

          <button
            onClick={() => setIsBlockchainOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
