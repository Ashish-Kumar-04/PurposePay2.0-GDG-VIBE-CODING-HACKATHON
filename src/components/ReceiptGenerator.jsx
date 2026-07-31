import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Download, ShieldCheck, QrCode, Building2, CheckCircle2 } from 'lucide-react';

export const ReceiptGenerator = () => {
  const { receiptModalDonation, setReceiptModalDonation, user } = useApp();

  if (!receiptModalDonation) return null;

  const don = receiptModalDonation;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">80G Tax Exemption Certificate</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setReceiptModalDonation(null)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RECEIPT PAPER DOCUMENT */}
        <div className="p-8 overflow-y-auto bg-slate-950 text-slate-100 font-sans space-y-6 border m-4 rounded-2xl border-slate-800 print:m-0 print:border-none">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Purpose<span className="text-emerald-400">Pay</span>
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">OFFICIAL RECEIPT</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Section 80G Income Tax Act 1961 Certificate</p>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-slate-400 block">Receipt No:</span>
              <strong className="text-emerald-400">{don.receiptNo}</strong>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">Donor Name</span>
              <strong className="text-white text-sm">{don.donorName || user.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Donor PAN Number</span>
              <strong className="text-slate-200 font-mono">{user.panCard}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Mode</span>
              <strong className="text-emerald-400">UPI ({don.donorUpi})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Date of Transaction</span>
              <strong className="text-slate-200">{new Date(don.date).toLocaleDateString()}</strong>
            </div>
          </div>

          {/* NGO & Amount Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Beneficiary NGO Organization:</span>
              <span className="font-bold text-white">{don.ngoName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">80G Registration No:</span>
              <span className="font-mono text-slate-300">AAATA0001RE20214</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Purpose / Cause Supported:</span>
              <span className="font-medium text-slate-200">{don.reqTitle}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800 text-sm">
              <span className="text-slate-300 font-bold">Total Donated Amount:</span>
              <strong className="text-white">₹{don.amount.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between py-2 text-sm bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              <span className="text-emerald-300 font-bold">Tax Deduction Eligible (50% u/s 80G):</span>
              <strong className="text-emerald-400">₹{don.taxSavings}</strong>
            </div>
          </div>

          {/* Footer Signoff & QR Code */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-slate-900 rounded-lg border border-slate-800 p-2 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-400" />
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                <p className="font-bold text-slate-300">Scan to Verify Authenticity</p>
                <p className="font-mono text-[10px] mt-0.5">Hash: {don.txHash.substring(0, 16)}...</p>
                <p className="text-emerald-400 flex items-center mt-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Digitally Signed
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="w-32 h-10 border-b border-slate-700 flex items-end justify-center">
                <span className="text-xs font-serif italic text-emerald-400">PurposePay Audit</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Authorized Signatory</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
