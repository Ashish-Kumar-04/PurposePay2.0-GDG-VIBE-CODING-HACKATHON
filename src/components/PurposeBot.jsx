import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, Send, Bot, User, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react';

export const PurposeBot = () => {
  const { 
    isPurposeBotOpen, 
    setIsPurposeBotOpen, 
    requirements, 
    setPaymentModalReq,
    totalTaxSavings
  } = useApp();

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am PurposeBot, your AI Giving & Tax Exemption Assistant. How can I help you support verified causes today?'
    }
  ]);

  const [input, setInput] = useState('');

  if (!isPurposeBotOpen) {
    return (
      <button
        onClick={() => setIsPurposeBotOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all glow-indigo flex items-center space-x-2"
        title="Ask PurposeBot AI Assistant"
      >
        <Sparkles className="w-6 h-6 animate-spin-slow" />
        <span className="font-bold text-xs pr-1">PurposeBot AI</span>
      </button>
    );
  }

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const updatedMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMsgs);
    setInput('');

    // Generate AI response
    setTimeout(() => {
      let botReply = '';
      let recommendedReq = null;

      const lower = query.toLowerCase();
      if (lower.includes('tax') || lower.includes('80g') || lower.includes('deduction')) {
        botReply = `Under Section 80G of the Indian Income Tax Act 1961, 50% of your total donation amount to eligible verified NGOs can be deducted from your taxable income. For example, if you donate ₹5,000, you save ₹2,500 on your taxable income calculations. PurposePay issues instant 80G tax receipts right after your UPI payment!`;
      } else if (lower.includes('1000') || lower.includes('food') || lower.includes('meal') || lower.includes('child')) {
        recommendedReq = requirements.find(r => r.id === 'req-101') || requirements[0];
        botReply = `I recommend supporting "${recommendedReq.title}" by ${recommendedReq.ngoName}. ₹1,000 provides 6+ high-protein meal kits for government school children!`;
      } else if (lower.includes('clothes') || lower.includes('winter') || lower.includes('blanket')) {
        recommendedReq = requirements.find(r => r.id === 'req-102') || requirements[1];
        botReply = `You can donate thermal blankets or schedule a doorstep pickup for winter clothes to Goonj Rahat Drive!`;
      } else {
        botReply = `PurposePay connects you directly to accredited NGOs with 100% photo proof and 80G receipts. Would you like to donate via UPI or book a doorstep item pickup?`;
      }

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: botReply, actionReq: recommendedReq }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 glass-panel rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[500px] animate-fadeIn">
      
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white">PurposeBot AI Assistant</h3>
            <p className="text-[10px] text-emerald-400 font-mono">100% Tax & NGO Advisor</p>
          </div>
        </div>

        <button
          onClick={() => setIsPurposeBotOpen(false)}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              m.sender === 'user'
                ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <p className="leading-relaxed">{m.text}</p>

              {m.actionReq && (
                <button
                  onClick={() => {
                    setIsPurposeBotOpen(false);
                    setPaymentModalReq(m.actionReq);
                  }}
                  className="mt-2.5 w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-[11px] hover:bg-emerald-400 transition-all flex items-center justify-center space-x-1"
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>Donate to this Cause Now</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-[11px]">
        <button
          onClick={() => handleSend("Where can I donate ₹1000?")}
          className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 whitespace-nowrap hover:bg-slate-800"
        >
          Donate ₹1000
        </button>
        <button
          onClick={() => handleSend("How does 80G tax saving work?")}
          className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 whitespace-nowrap hover:bg-slate-800"
        >
          80G Tax Help
        </button>
        <button
          onClick={() => handleSend("Donate winter clothes")}
          className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 whitespace-nowrap hover:bg-slate-800"
        >
          Winter Clothes
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Ask PurposeBot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
