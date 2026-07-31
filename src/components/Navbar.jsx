import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  Building2, 
  User, 
  ShieldAlert, 
  Cpu, 
  Receipt, 
  HeartHandshake, 
  Sparkles,
  LogOut,
  Home,
  ChevronDown,
  Palette,
  Check,
  X,
  LogIn,
  KeyRound
} from 'lucide-react';

export const Navbar = () => {
  const { 
    role, 
    loginAsRole, 
    user, 
    goToIntro,
    theme,
    changeTheme,
    searchQuery, 
    setSearchQuery, 
    notifications, 
    markAllNotificationsRead,
    setIsBlockchainOpen,
    setIsPurposeBotOpen,
    setTrackerModalDonation,
    donations,
    totalTaxSavings,
    totalMoneyDonated
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  // Login Modal Window state for switching portals: null | 'donor' | 'ngo' | 'admin'
  const [switchLoginRole, setSwitchLoginRole] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('1234');

  const unreadCount = notifications.filter(n => !n.read).length;

  const themeOptions = [
    { 
      id: 'emerald', 
      name: 'Emerald Dark', 
      desc: 'Default Emerald Green & Midnight Slate',
      colorBg: 'bg-emerald-500', 
      borderColor: 'border-emerald-500' 
    },
    { 
      id: 'snow', 
      name: 'Snowy White', 
      desc: 'Clean White Light Mode & Emerald Accent',
      colorBg: 'bg-white', 
      borderColor: 'border-slate-300' 
    },
    { 
      id: 'indigo', 
      name: 'Royal Violet', 
      desc: 'Deep Indigo & Violet Glow',
      colorBg: 'bg-purple-500', 
      borderColor: 'border-purple-500' 
    },
    { 
      id: 'gold', 
      name: 'Cyber Gold', 
      desc: 'Onyx & Amber Gold Accent',
      colorBg: 'bg-amber-500', 
      borderColor: 'border-amber-500' 
    },
    { 
      id: 'cyan', 
      name: 'Ocean Cyan', 
      desc: 'Deep Cyan & Ice Sky Blue',
      colorBg: 'bg-cyan-500', 
      borderColor: 'border-cyan-500' 
    }
  ];

  // Handler for Role Switching -> Requires Login Modal
  const handleRoleClick = (targetRole) => {
    if (targetRole === role) return; // Already on this role

    setSwitchLoginRole(targetRole);
    if (targetRole === 'ngo') {
      setLoginEmail('admin@akshayapatra.org');
    } else if (targetRole === 'admin') {
      setLoginEmail('auditor@purposepay.gov.in');
    } else {
      setLoginEmail('rahul@okaxis');
    }
  };

  const handleConfirmRoleSwitch = (e) => {
    e.preventDefault();
    if (!switchLoginRole) return;

    loginAsRole(switchLoginRole, {
      email: loginEmail,
      upiId: loginEmail.includes('@') ? loginEmail : `${loginEmail}@purposepay`
    });

    setSwitchLoginRole(null);
    setShowProfileDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={goToIntro}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-600 to-purple-600 p-[2px] shadow-lg glow-emerald">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Purpose<span className="gradient-text-emerald">Pay</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  UPI 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Reimagining Giving with 100% Transparency</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search verified NGOs, requirements, or tax receipts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Role Navigation & Action Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Back to Home Screen */}
            <button
              onClick={goToIntro}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              title="Return to Home Screen"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">Home</span>
            </button>

            {/* THEME SELECTOR BUTTON */}
            <button
              onClick={() => setShowThemeModal(!showThemeModal)}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              title="Change Theme Palettes"
            >
              <Palette className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Theme</span>
            </button>

            {/* Role Switcher Pill Container */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
              <button
                onClick={() => handleRoleClick('donor')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'donor' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Donor</span>
              </button>

              <button
                onClick={() => handleRoleClick('ngo')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'ngo' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>NGO Portal</span>
              </button>

              <button
                onClick={() => handleRoleClick('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'admin' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Audit</span>
              </button>
            </div>

            {/* Blockchain Audit Explorer Launcher */}
            <button
              onClick={() => setIsBlockchainOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
              title="View Immutable Blockchain Audit Trail"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Ledger</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsPurposeBotOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-950/60 border border-indigo-700/40 rounded-xl text-xs font-semibold text-indigo-300 hover:bg-indigo-900/60 transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="hidden sm:inline">PurposeBot</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowProfileDropdown(false);
                  setShowThemeModal(false);
                  if (!showNotifDropdown) markAllNotificationsRead();
                }}
                className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950 animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Live Impact Updates</span>
                    </div>
                    <span className="text-xs text-slate-400">{notifications.length} total</span>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => {
                            setShowNotifDropdown(false);
                            if (n.donationId) {
                              const found = donations.find(d => d.id === n.donationId);
                              if (found) setTrackerModalDonation(found);
                            }
                          }}
                          className="p-3 bg-slate-900/90 hover:bg-slate-800/90 rounded-xl border border-slate-800 cursor-pointer transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-xs font-semibold text-emerald-400">{n.title}</span>
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE USER PROFILE DROPDOWN MENU */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifDropdown(false);
                  setShowThemeModal(false);
                }}
                className="flex items-center space-x-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
                title="User Profile & Account Settings"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                  {user.name ? user.name.substring(0, 2).toUpperCase() : 'RS'}
                </div>
                <div className="text-left leading-none hidden xl:block">
                  <p className="text-xs font-semibold text-slate-200">{user.name}</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{user.upiId}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-80 glass-panel rounded-3xl shadow-2xl border border-slate-700 p-5 z-50 animate-fadeIn space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-black text-sm text-slate-950">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : 'RS'}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white leading-tight">{user.name}</h4>
                        <p className="text-xs text-emerald-400 font-mono">{user.upiId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Metadata Pills */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registered Email:</span>
                      <span className="text-slate-200 truncate max-w-[140px]">{user.email || 'user@example.com'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PAN Card (80G):</span>
                      <span className="text-slate-200 font-bold">{user.panCard || 'ABCPS1234F'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Role:</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">{role}</span>
                    </div>
                  </div>

                  {/* User Stats Card */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Donated</span>
                      <span className="font-extrabold text-white">₹{totalMoneyDonated.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">80G Tax Saved</span>
                      <span className="font-extrabold text-emerald-400">₹{totalTaxSavings.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Role Switcher Actions */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block px-1">Switch Portal</span>
                    
                    <button
                      onClick={() => handleRoleClick('donor')}
                      className={`w-full p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        role === 'donor' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <User className="w-3.5 h-3.5" />
                        <span>Donor Dashboard</span>
                      </span>
                      {role === 'donor' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <button
                      onClick={() => handleRoleClick('ngo')}
                      className={`w-full p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        role === 'ngo' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>NGO Partner Portal</span>
                      </span>
                      {role === 'ngo' && <ShieldCheck className="w-4 h-4 text-indigo-400" />}
                    </button>

                    <button
                      onClick={() => handleRoleClick('admin')}
                      className={`w-full p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Admin Audit Desk</span>
                      </span>
                      {role === 'admin' && <ShieldCheck className="w-4 h-4 text-amber-400" />}
                    </button>
                  </div>

                  {/* Log Out Action */}
                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        goToIntro();
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 hover:text-red-400 border border-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out & Exit to Home Screen</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* THEME SELECTOR MODAL / DROPDOWN */}
      {showThemeModal && (
        <div className="absolute right-24 top-20 z-50 w-72 glass-panel rounded-3xl border border-slate-700 p-4 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-extrabold text-white">Select Theme Palette</h4>
            </div>
            <span className="text-[10px] text-slate-400">5 Themes</span>
          </div>

          <div className="space-y-2">
            {themeOptions.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  changeTheme(t.id);
                  setShowThemeModal(false);
                }}
                className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  theme === t.id 
                    ? `${t.borderColor} bg-slate-900` 
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-4 h-4 rounded-full ${t.colorBg} ring-2 ring-slate-950`} />
                  <div>
                    <span className="text-xs font-bold text-white block">{t.name}</span>
                    <span className="text-[10px] text-slate-400 block">{t.desc}</span>
                  </div>
                </div>

                {theme === t.id && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LOGIN WINDOW CARD FOR ROLE SWITCHING FROM NAVBAR */}
      {switchLoginRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-2xl border ${
                  switchLoginRole === 'donor' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  switchLoginRole === 'ngo' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                  'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {switchLoginRole === 'donor' ? <User className="w-6 h-6" /> : switchLoginRole === 'ngo' ? <Building2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Portal Authentication Required</span>
                  <h3 className="text-base font-extrabold text-white">
                    Sign In to {switchLoginRole === 'donor' ? 'Donor Portal' : switchLoginRole === 'ngo' ? 'NGO Partner Portal' : 'Admin Audit Desk'}
                  </h3>
                </div>
              </div>

              <button onClick={() => setSwitchLoginRole(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRoleSwitch} className="space-y-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {switchLoginRole === 'donor' ? 'Donor Email / UPI ID' : switchLoginRole === 'ngo' ? 'NGO Official Email / VPA' : 'Auditor ID / Email'}
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
                  switchLoginRole === 'donor' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950' :
                  switchLoginRole === 'ngo' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' :
                  'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Authenticate & Open Portal</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </header>
  );
};
