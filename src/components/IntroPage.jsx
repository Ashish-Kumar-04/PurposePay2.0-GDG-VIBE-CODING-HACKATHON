import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  User, 
  Building2, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Receipt, 
  Cpu, 
  Package, 
  Lock, 
  Sparkles,
  UserPlus,
  FileText,
  Smartphone,
  MapPin,
  Palette,
  Check,
  X,
  KeyRound,
  LogIn
} from 'lucide-react';

export const IntroPage = () => {
  const { loginAsRole, registerDonor, registerNgo, theme, changeTheme } = useApp();

  // Theme selector state
  const [showThemeModal, setShowThemeModal] = useState(false);

  // Login Modal Window state: null | 'donor' | 'ngo' | 'admin'
  const [loginModalRole, setLoginModalRole] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('1234');

  // Registration Modal state: null | 'donor' | 'ngo'
  const [regModalType, setRegModalType] = useState(null);

  // Donor Reg State
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorUpi, setDonorUpi] = useState('');
  const [donorPan, setDonorPan] = useState('');

  // NGO Reg State
  const [ngoName, setNgoName] = useState('');
  const [ngoTagline, setNgoTagline] = useState('');
  const [ngoRegNo, setNgoRegNo] = useState('');
  const [ngoCategory, setNgoCategory] = useState('Child Nutrition & Education');
  const [ngoAddress, setNgoAddress] = useState('');
  const [ngoUpi, setNgoUpi] = useState('');
  const [ngoDesc, setNgoDesc] = useState('');

  const themeOptions = [
    { id: 'emerald', name: 'Emerald Dark', colorBg: 'bg-emerald-500' },
    { id: 'snow', name: 'Snowy White', colorBg: 'bg-white' },
    { id: 'indigo', name: 'Royal Violet', colorBg: 'bg-purple-500' },
    { id: 'gold', name: 'Cyber Gold', colorBg: 'bg-amber-500' },
    { id: 'cyan', name: 'Ocean Cyan', colorBg: 'bg-cyan-500' }
  ];

  const handleOpenLoginModal = (targetRole) => {
    setLoginModalRole(targetRole);
    if (targetRole === 'ngo') {
      setLoginEmail('admin@akshayapatra.org');
    } else if (targetRole === 'admin') {
      setLoginEmail('auditor@purposepay.gov.in');
    } else {
      setLoginEmail('rahul@okaxis');
    }
  };

  const handleConfirmLogin = (e) => {
    e.preventDefault();
    if (!loginModalRole) return;

    loginAsRole(loginModalRole, {
      email: loginEmail,
      upiId: loginEmail.includes('@') ? loginEmail : `${loginEmail}@purposepay`
    });

    setLoginModalRole(null);
  };

  const handleDonorRegisterSubmit = (e) => {
    e.preventDefault();
    if (!donorName) return;
    registerDonor({
      name: donorName,
      email: donorEmail,
      phone: donorPhone,
      upiId: donorUpi,
      panCard: donorPan
    });
    setRegModalType(null);
  };

  const handleNgoRegisterSubmit = (e) => {
    e.preventDefault();
    if (!ngoName) return;
    registerNgo({
      name: ngoName,
      tagline: ngoTagline,
      regNumber: ngoRegNo,
      category: ngoCategory,
      address: ngoAddress,
      upiId: ngoUpi,
      description: ngoDesc
    });
    setRegModalType(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar Header with Theme Selector */}
      <header className="glass-panel border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[2px] shadow-lg glow-emerald">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Purpose<span className="gradient-text-emerald">Pay</span>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              
              {/* THEME SELECTOR BUTTON ON WELCOME PAGE */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeModal(!showThemeModal)}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                  title="Select Theme Palette"
                >
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Theme Palette</span>
                </button>

                {showThemeModal && (
                  <div className="absolute right-0 mt-2 w-64 glass-panel rounded-3xl border border-slate-700 p-3 shadow-2xl space-y-2 z-50 animate-fadeIn">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-800">
                      Select Theme (5 Palettes)
                    </div>
                    {themeOptions.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          changeTheme(t.id);
                          setShowThemeModal(false);
                        }}
                        className={`w-full p-2 rounded-xl text-xs text-left flex items-center justify-between transition-all ${
                          theme === t.id ? 'bg-slate-900 text-white font-bold' : 'text-slate-400 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-3.5 h-3.5 rounded-full ${t.colorBg} ring-1 ring-slate-700`} />
                          <span>{t.name}</span>
                        </div>
                        {theme === t.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hidden sm:flex">
                <span>NPCI UPI 2.0</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Main Intro Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Reimagining UPI for Transparent & Purpose-Driven Giving</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Bridging the Trust Gap in <br />
            <span className="gradient-text-emerald">Charitable Giving with UPI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Standard UPI apps process money, but leave donors in the dark. PurposePay transforms every donation into a transparent, tracked impact journey with live photo proof and instant 80G tax receipts.
          </p>

        </div>

        {/* Problem vs Solution Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Problem Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-red-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-extrabold text-sm uppercase tracking-wider">
              <XCircle className="w-5 h-5" />
              <span>The Problem with Traditional UPI Giving</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>No Post-Donation Visibility:</strong> Donors have no way to verify how or when their funds are utilized.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Unverified NGOs & Fraud Risk:</strong> Hesitation to donate due to lack of audited compliance disclosures.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Tax Receipt Friction:</strong> Manual delayed receipt issuance making 80G claims cumbersome.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 space-y-4 glow-emerald">
            <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" />
              <span>The PurposePay Solution</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Step-by-Step Proof Tracker:</strong> Photo proof & vendor invoices for every milestone (Received ➔ Allocated ➔ Delivered).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Accredited 80G/12A NGOs:</strong> Dynamic AI Trust Scores and verified regulatory clearances.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Instant 80G Receipts & Ledger:</strong> Automated digital receipts and immutable blockchain audit trail.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* LOGIN OPTIONS SECTION */}
        <div id="login-options" className="pt-8 space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Quick Access</span>
            <h2 className="text-3xl font-extrabold text-white">Select Your Portal to Sign In</h2>
            <p className="text-xs text-slate-400">Click any card below to open the dedicated Login Credentials Window.</p>
          </div>

          {/* 3 Login Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* OPTION 1: DONOR LOGIN */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-7 h-7" />
                </div>
                
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    Option 1
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Donor Portal</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Donate via UPI or book doorstep item pickups. Track progress step-by-step with proof photos and download instant 80G tax receipts.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                  <span className="text-slate-500 block text-[10px]">Demo Persona</span>
                  <p className="font-bold text-white">Rahul Sharma</p>
                  <p className="text-emerald-400 text-[11px]">rahul@okaxis</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenLoginModal('donor')}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Open Donor Login Window</span>
              </button>
            </div>

            {/* OPTION 2: NGO REPRESENTATIVE LOGIN */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold border border-indigo-500/30">
                    Option 2
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">NGO Portal</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Post live money/item requirements, manage incoming contributions, and upload vendor invoices & beneficiary distribution proofs.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                  <span className="text-slate-500 block text-[10px]">Demo Persona</span>
                  <p className="font-bold text-white">Akshaya Patra Representative</p>
                  <p className="text-indigo-400 text-[11px]">admin@akshayapatra.org</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenLoginModal('ngo')}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Open NGO Login Window</span>
              </button>
            </div>

            {/* OPTION 3: ADMIN AUDITOR LOGIN */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                    Option 3
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Admin Audit Desk</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Verify NGO 80G/12A/FCRA accreditation, review dynamic AI Trust Scores, and monitor real-time fraud anomaly flags.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                  <span className="text-slate-500 block text-[10px]">Demo Persona</span>
                  <p className="font-bold text-white">Governance & Compliance Auditor</p>
                  <p className="text-amber-400 text-[11px]">auditor@purposepay.gov.in</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenLoginModal('admin')}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Open Admin Login Window</span>
              </button>
            </div>

          </div>

        </div>

        {/* REGISTRATION CARDS SECTION (CLEAN 2 CARDS) */}
        <div id="register-section" className="pt-12 max-w-5xl mx-auto space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <UserPlus className="w-4 h-4" />
              <span>Create New Account</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">New User & NGO Registration</h2>
            <p className="text-xs text-slate-400">Click a registration card below to open the dedicated Registration Form Window.</p>
          </div>

          {/* 2 Registration Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 1: REGISTER AS DONOR */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Register as a New Donor</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Create your donor profile to give via UPI, book doorstep item pickups, get automated 80G tax deduction receipts under your PAN card, and track real-time milestone proofs.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRegModalType('donor')}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Open Donor Registration Window</span>
              </button>
            </div>

            {/* CARD 2: REGISTER AN NGO */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Register NGO Organization</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Register your accredited 12A/80G NGO to list live item & money requirements, receive direct UPI donations, and upload vendor invoices & beneficiary distribution photos.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRegModalType('ngo')}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Open NGO Registration Window</span>
              </button>
            </div>

          </div>

        </div>

        {/* Feature Grid Highlights */}
        <div className="pt-12 border-t border-slate-900">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-white">Built for Complete Transparency</h3>
            <p className="text-xs text-slate-400 mt-1">Key features powering India's purpose-driven giving platform</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white">Instant 80G Receipts</h4>
              <p className="text-slate-400 leading-snug">50% Income Tax exemption certificate issued automatically upon UPI payment settlement.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-white">Proof Photo Timelines</h4>
              <p className="text-slate-400 leading-snug">Geotagged distribution photos & vendor bills attached to every donation step.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Package className="w-5 h-5 text-purple-400" />
              <h4 className="font-bold text-white">Physical Item Pickups</h4>
              <p className="text-slate-400 leading-snug">Doorstep pickup scheduling for winter blankets, textbooks, medical kits & rations.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-white">Blockchain Ledger</h4>
              <p className="text-slate-400 leading-snug">SHA-256 cryptographic audit trail guaranteeing tamper-proof giving history.</p>
            </div>

          </div>
        </div>

      </main>

      {/* MODAL 1: LOGIN CREDENTIALS WINDOW CARD */}
      {loginModalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-2xl border ${
                  loginModalRole === 'donor' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  loginModalRole === 'ngo' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                  'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {loginModalRole === 'donor' ? <User className="w-6 h-6" /> : loginModalRole === 'ngo' ? <Building2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {loginModalRole === 'donor' ? 'Donor Authentication' : loginModalRole === 'ngo' ? 'NGO Partner Auth' : 'Governance Auditor Auth'}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Sign In to {loginModalRole === 'donor' ? 'Donor Portal' : loginModalRole === 'ngo' ? 'NGO Portal' : 'Admin Audit Desk'}
                  </h3>
                </div>
              </div>

              <button onClick={() => setLoginModalRole(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmLogin} className="space-y-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {loginModalRole === 'donor' ? 'Donor Email / UPI ID' : loginModalRole === 'ngo' ? 'NGO Official Email / VPA' : 'Auditor ID / Email'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">4-Digit Security PIN / Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Demo PIN: Enter any 4 digits (e.g. 1234)</p>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  loginModalRole === 'donor' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950' :
                  loginModalRole === 'ngo' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' :
                  'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In & Open Dedicated Portal</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: DONOR REGISTRATION FORM CARD MODAL */}
      {regModalType === 'donor' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">New Donor Registration</h3>
              </div>
              <button onClick={() => setRegModalType(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDonorRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikramaditya Roy"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 12345"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">UPI VPA</label>
                  <input
                    type="text"
                    placeholder="vikram@okaxis"
                    value={donorUpi}
                    onChange={(e) => setDonorUpi(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">PAN Card (80G)</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center space-x-2 text-[11px]">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Instant 80G tax deduction receipts will be issued under your registered PAN.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Complete Registration & Launch Donor Portal</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 3: NGO REGISTRATION FORM CARD MODAL */}
      {regModalType === 'ngo' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-extrabold text-white">Register Accredited NGO Organization</h3>
              </div>
              <button onClick={() => setRegModalType(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleNgoRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">NGO Organization Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Swasthya Bharat Relief Trust"
                    value={ngoName}
                    onChange={(e) => setNgoName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tagline / Motto</label>
                  <input
                    type="text"
                    placeholder="e.g. Universal Healthcare for All"
                    value={ngoTagline}
                    onChange={(e) => setNgoTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">12A / 80G Reg No *</label>
                  <input
                    type="text"
                    placeholder="AAATS1234RE2026"
                    value={ngoRegNo}
                    onChange={(e) => setNgoRegNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Primary Category</label>
                  <select
                    value={ngoCategory}
                    onChange={(e) => setNgoCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Child Nutrition & Education">Child Nutrition & Education</option>
                    <option value="Disaster Relief & Rural Dignity">Disaster Relief & Rural Dignity</option>
                    <option value="Elderly Care & Medicine">Elderly Care & Medicine</option>
                    <option value="Animal Welfare & Shelter">Animal Welfare & Shelter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Official PurposePay VPA</label>
                  <input
                    type="text"
                    placeholder="swasthya@purposepay"
                    value={ngoUpi}
                    onChange={(e) => setNgoUpi(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Registered Headquarters Address</label>
                <input
                  type="text"
                  placeholder="Sector 14, Gurgaon, Haryana, India"
                  value={ngoAddress}
                  onChange={(e) => setNgoAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Organization Mission Description</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe your NGO's key programs and beneficiary reach..."
                  value={ngoDesc}
                  onChange={(e) => setNgoDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Register NGO Organization & Open Portal</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 PurposePay – Reimagining UPI for Transparent & Purpose-Driven Giving.</p>
      </footer>

    </div>
  );
};
