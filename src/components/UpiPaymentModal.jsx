import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  IndianRupee, 
  Lock, 
  QrCode, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Building2, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

export const UpiPaymentModal = () => {
  const { 
    paymentModalReq, 
    setPaymentModalReq,
    setItemModalReq,
    processMoneyDonation, 
    user,
    setReceiptModalDonation,
    setTrackerModalDonation
  } = useApp();

  // Redirect to ItemDonationModal if this is an item requirement
  useEffect(() => {
    if (paymentModalReq && paymentModalReq.type === 'item') {
      setItemModalReq(paymentModalReq);
      setPaymentModalReq(null);
    }
  }, [paymentModalReq, setItemModalReq, setPaymentModalReq]);

  if (!paymentModalReq || paymentModalReq.type === 'item') return null;

  const [step, setStep] = useState('amount'); // 'amount' | 'pin' | 'success'
  const [amount, setAmount] = useState(
    paymentModalReq.unitPrice ? (paymentModalReq.unitPrice * 5).toString() : '1500'
  );
  const [selectedVpa, setSelectedVpa] = useState(user.upiId || 'rahul@okaxis');
  const [customName, setCustomName] = useState(user.name);
  const [upiPin, setUpiPin] = useState(['', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState(null);

  const presetAmounts = [250, 500, 1500, 3000, 5000];

  const handlePinChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...upiPin];
    updated[index] = val;
    setUpiPin(updated);

    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleProceedToPin = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('pin');
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const donation = processMoneyDonation({
        req: paymentModalReq,
        amount,
        donorUpi: selectedVpa,
        customName
      });

      setIsProcessing(false);
      setCompletedDonation(donation);
      setStep('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Reimagined UPI Pay</h3>
              <p className="text-[10px] text-emerald-400 font-mono">Verified VPA: {paymentModalReq.ngoName.toLowerCase().replace(/[^a-z]/g, '')}@purposepay</p>
            </div>
          </div>

          <button
            onClick={() => setPaymentModalReq(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: AMOUNT & VPA SELECTION */}
        {step === 'amount' && (
          <form onSubmit={handleProceedToPin} className="p-6 space-y-5">
            
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Paying Beneficiary</span>
                <p className="text-xs font-bold text-white truncate">{paymentModalReq.ngoName}</p>
                <p className="text-[11px] text-slate-400 truncate">{paymentModalReq.title}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Enter Contribution Amount (INR)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1500"
                  className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-2xl font-black text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {presetAmounts.map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    amount === val.toString()
                      ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  +₹{val}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Select UPI App / VPA</label>
              <select
                value={selectedVpa}
                onChange={(e) => setSelectedVpa(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="rahul@okaxis">Google Pay (rahul@okaxis)</option>
                <option value="rahul@ybl">PhonePe (rahul@ybl)</option>
                <option value="rahul@paytm">Paytm UPI (rahul@paytm)</option>
                <option value="rahul@purposepay">PurposePay Core (@purposepay)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2.5 text-xs text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                You save <strong className="text-white">₹{Math.round((parseFloat(amount) || 0) * 0.5)}</strong> on Income Tax under Section 80G. Instant 80G receipt issued.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-sm hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>Pay ₹{parseFloat(amount || 0).toLocaleString()} via UPI</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* STEP 2: UPI PIN SIMULATION */}
        {step === 'pin' && (
          <div className="p-6 space-y-6 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Authenticating with NPCI UPI Server</p>
              <h4 className="text-xl font-black text-white mt-0.5">Enter 4-Digit UPI PIN</h4>
              <p className="text-xs text-emerald-400 font-mono mt-1">Paying ₹{parseFloat(amount).toLocaleString()} to {paymentModalReq.ngoName}</p>
            </div>

            <div className="flex justify-center space-x-3 my-4">
              {upiPin.map((digit, idx) => (
                <input
                  key={idx}
                  id={`pin-input-${idx}`}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(idx, e.target.value)}
                  className="w-12 h-14 bg-slate-950 border-2 border-slate-700 focus:border-emerald-500 rounded-xl text-center text-2xl font-black text-white focus:outline-none transition-all"
                />
              ))}
            </div>

            <p className="text-[11px] text-slate-500">Demo PIN: Enter any 4 digits (e.g. 1234)</p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => setStep('amount')}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
              >
                Back
              </button>

              <button
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying PIN...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Payment</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: SUCCESS SCREEN */}
        {step === 'success' && completedDonation && (
          <div className="p-6 text-center space-y-5 animate-fadeIn">
            
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 glow-emerald">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                UPI Payment Successful!
              </span>
              <h3 className="text-2xl font-black text-white mt-2">₹{completedDonation.amount.toLocaleString()}</h3>
              <p className="text-xs text-slate-300 mt-1">Paid to <strong className="text-white">{completedDonation.ngoName}</strong></p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="text-slate-200 font-bold">{completedDonation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">80G Receipt No:</span>
                <span className="text-emerald-400 font-bold">{completedDonation.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">80G Tax Savings:</span>
                <span className="text-white font-bold">₹{completedDonation.taxSavings}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setPaymentModalReq(null);
                  setTrackerModalDonation(completedDonation);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
              >
                <span>Track Impact Milestones</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setPaymentModalReq(null);
                  setReceiptModalDonation(completedDonation);
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>View & Download 80G Receipt</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
