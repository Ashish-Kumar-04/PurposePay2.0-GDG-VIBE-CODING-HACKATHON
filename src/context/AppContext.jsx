import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_NGOS, 
  INITIAL_REQUIREMENTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_DONATIONS, 
  INITIAL_BLOCKCHAIN 
} from '../data/initialData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: 'emerald' | 'snow' | 'indigo' | 'gold' | 'cyan'
  const [theme, setThemeState] = useState(() => localStorage.getItem('purposepay_theme') || 'emerald');

  const changeTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('purposepay_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PERSISTENT Navigation screen: 'intro' | 'app'
  const [currentScreen, setCurrentScreenState] = useState(() => {
    return localStorage.getItem('purposepay_screen') || 'intro';
  });

  const setCurrentScreen = (screen) => {
    setCurrentScreenState(screen);
    localStorage.setItem('purposepay_screen', screen);
  };

  // PERSISTENT User state & role
  const [role, setRoleState] = useState(() => {
    return localStorage.getItem('purposepay_role') || 'donor';
  });

  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem('purposepay_role', newRole);
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('purposepay_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch(e) {}
    }
    return {
      name: 'Rahul Sharma',
      upiId: 'rahul@okaxis',
      panCard: 'ABCPS1234F',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      balance: 24500
    };
  });

  // Data collections
  const [ngos, setNgos] = useState(INITIAL_NGOS);
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [blockchain, setBlockchain] = useState(INITIAL_BLOCKCHAIN);

  // Modals & Sliders
  const [paymentModalReq, setPaymentModalReq] = useState(null);
  const [itemModalReq, setItemModalReq] = useState(null);
  const [trackerModalDonation, setTrackerModalDonation] = useState(null);
  const [receiptModalDonation, setReceiptModalDonation] = useState(null);
  const [isBlockchainOpen, setIsBlockchainOpen] = useState(false);
  const [isPurposeBotOpen, setIsPurposeBotOpen] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Login handler
  const loginAsRole = (selectedRole, customCredentials = {}) => {
    setRole(selectedRole);

    let newUserObj = { ...user };
    if (selectedRole === 'ngo') {
      newUserObj = {
        name: customCredentials.name || 'Akshaya Patra Admin',
        email: customCredentials.email || 'admin@akshayapatra.org',
        upiId: customCredentials.upiId || 'akshayapatra@purposepay',
        panCard: 'AAATA0001RE20214'
      };
    } else if (selectedRole === 'admin') {
      newUserObj = {
        name: customCredentials.name || 'Govt Auditor Desk',
        email: customCredentials.email || 'auditor@purposepay.gov.in',
        upiId: 'auditor@purposepay',
        panCard: 'GOVT-AUDIT-2026'
      };
    } else {
      newUserObj = {
        name: customCredentials.name || 'Rahul Sharma',
        email: customCredentials.email || 'rahul.sharma@example.com',
        upiId: customCredentials.upiId || 'rahul@okaxis',
        panCard: customCredentials.panCard || 'ABCPS1234F'
      };
    }

    setUser(newUserObj);
    localStorage.setItem('purposepay_user', JSON.stringify(newUserObj));
    setCurrentScreen('app');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  // Register New Donor
  const registerDonor = ({ name, email, phone, upiId, panCard }) => {
    const newDonorUser = {
      name: name || 'New Registered Donor',
      email: email || 'donor@example.com',
      phone: phone || '+91 99999 88888',
      upiId: upiId ? (upiId.includes('@') ? upiId : `${upiId}@purposepay`) : 'newdonor@okaxis',
      panCard: panCard || 'XYZPS9876K',
      balance: 50000
    };

    setUser(newDonorUser);
    localStorage.setItem('purposepay_user', JSON.stringify(newDonorUser));
    setRole('donor');
    setCurrentScreen('app');

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  // Register New NGO
  const registerNgo = ({ name, tagline, regNumber, category, address, upiId, description }) => {
    const ngoId = `ngo-${Date.now()}`;
    const formattedUpi = upiId ? (upiId.includes('@') ? upiId : `${upiId}@purposepay`) : `${(name || 'ngo').toLowerCase().replace(/[^a-z]/g, '')}@purposepay`;
    
    const newNgoObj = {
      id: ngoId,
      name: name || 'Hope & Care Foundation',
      tagline: tagline || 'Empowering Communities Together',
      trustScore: 95,
      tier: 'Gold Verified',
      regNumber: regNumber || '12A/80G/AAATH9999RE2026',
      fcraStatus: 'Compliant & Active',
      category: category || 'Child Nutrition & Education',
      logo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=150&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 12,
      totalRaised: 0,
      donorsCount: 0,
      beneficiariesReached: 1200,
      address: address || 'New Delhi, India',
      establishedYear: 2026,
      upiId: formattedUpi,
      description: description || 'Registered non-profit organization focused on transparent social impact and community development.',
      auditScoreDetails: {
        financialTransparency: 98,
        proofUploadSpeed: 96,
        donorSatisfaction: 99,
        lastAuditedDate: new Date().toISOString().split('T')[0]
      }
    };

    setNgos(prev => [newNgoObj, ...prev]);

    const newInitialReq = {
      id: `req-${Math.floor(100 + Math.random() * 900)}`,
      ngoId: newNgoObj.id,
      ngoName: newNgoObj.name,
      title: `Emergency Support Drive by ${newNgoObj.name}`,
      type: 'money',
      category: newNgoObj.category,
      urgency: 'high',
      targetAmount: 50000,
      raisedAmount: 15000,
      unitPrice: 200,
      unitName: 'Relief Kit',
      donorsCount: 15,
      deadline: '2026-10-30',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
      description: newNgoObj.description,
      proofDocuments: ['Verified_80G_Certificate.pdf', 'Registration_Approval.pdf']
    };

    setRequirements(prev => [newInitialReq, ...prev]);

    const ngoUserObj = {
      name: `${newNgoObj.name} Admin`,
      email: `${(name || 'ngo').toLowerCase().replace(/[^a-z]/g, '')}@org.in`,
      upiId: newNgoObj.upiId,
      panCard: newNgoObj.regNumber
    };

    setUser(ngoUserObj);
    localStorage.setItem('purposepay_user', JSON.stringify(ngoUserObj));
    setRole('ngo');
    setCurrentScreen('app');

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const goToIntro = () => {
    setCurrentScreen('intro');
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Milestone Updated!',
      message: 'Your donation DON-98241 was served to children at Govt Primary School Raichur.',
      time: '10 mins ago',
      read: false,
      donationId: 'DON-98241'
    },
    {
      id: 'notif-2',
      title: 'Tax Exemption Receipt Ready',
      message: 'Your 80G digital receipt REC-2026-80G-98241 is ready to download.',
      time: '2 hours ago',
      read: false,
      donationId: 'DON-98241'
    }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Helper: Process Money Donation
  const processMoneyDonation = ({ req, amount, donorUpi, customName }) => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return false;

    const donId = `DON-${Math.floor(10000 + Math.random() * 90000)}`;
    const recNo = `REC-2026-80G-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newDonation = {
      id: donId,
      donorName: customName || user.name,
      donorUpi: donorUpi || user.upiId,
      ngoId: req.ngoId,
      ngoName: req.ngoName,
      reqId: req.id,
      reqTitle: req.title,
      amount: numericAmount,
      type: 'money',
      itemsCount: Math.ceil(numericAmount / (req.unitPrice || 150)),
      unitName: req.unitName || 'Units',
      date: new Date().toISOString(),
      status: 'Payment Received',
      currentStage: 1,
      txHash: newTxHash,
      receiptNo: recNo,
      taxSavings: Math.round(numericAmount * 0.5),
      timeline: [
        {
          stage: 1,
          title: 'UPI Payment Settled',
          time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          note: `Payment of ₹${numericAmount.toLocaleString()} verified via PurposePay UPI. Instant 80G tax receipt issued.`,
          proofPhoto: null
        }
      ]
    };

    setDonations(prev => [newDonation, ...prev]);

    setRequirements(prev => prev.map(r => {
      if (r.id === req.id) {
        return {
          ...r,
          raisedAmount: r.raisedAmount + numericAmount,
          donorsCount: r.donorsCount + 1
        };
      }
      return r;
    }));

    const lastBlock = blockchain[blockchain.length - 1];
    const newBlock = {
      blockHeight: (lastBlock ? lastBlock.blockHeight : 142090) + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      hash: newTxHash,
      prevHash: lastBlock ? lastBlock.hash : '0x0000000000000000000000000000000000000000',
      donationsCount: 1,
      donor: customName || user.name,
      ngo: req.ngoName,
      amount: `₹${numericAmount.toLocaleString()}`,
      purpose: req.title,
      verifiedBy: 'PurposePay AI Node #' + Math.floor(Math.random() * 5 + 1)
    };
    setBlockchain(prev => [...prev, newBlock]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Donation Confirmed! 🎉',
        message: `Your ₹${numericAmount.toLocaleString()} donation to ${req.ngoName} was successful.`,
        time: 'Just now',
        read: false,
        donationId: donId
      },
      ...prev
    ]);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return newDonation;
  };

  // Helper: Process Item Pickup Booking
  const processItemDonation = ({ req, itemCount, pickupAddress, pickupSlot }) => {
    const donId = `DON-${Math.floor(10000 + Math.random() * 90000)}`;
    const recNo = `REC-2026-80G-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const estimatedVal = itemCount * (req.unitPrice || 400);

    const newDonation = {
      id: donId,
      donorName: user.name,
      donorUpi: user.upiId,
      ngoId: req.ngoId,
      ngoName: req.ngoName,
      reqId: req.id,
      reqTitle: req.title,
      amount: estimatedVal,
      type: 'item',
      itemsCount: parseInt(itemCount),
      unitName: `${req.unitName || 'Items'} (Pickup Scheduled)`,
      date: new Date().toISOString(),
      status: 'Pickup Scheduled',
      currentStage: 1,
      txHash: newTxHash,
      receiptNo: recNo,
      taxSavings: Math.round(estimatedVal * 0.5),
      pickupAddress: pickupAddress || '124, Green Park Extension, New Delhi',
      pickupSlot: pickupSlot || 'Tomorrow, 10:00 AM - 01:00 PM',
      timeline: [
        {
          stage: 1,
          title: 'Doorstep Pickup Booked',
          time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          note: `Slot booked: ${pickupSlot || 'Tomorrow 10 AM - 1 PM'}. Driver assigned for doorstep collection.`,
          proofPhoto: null
        }
      ]
    };

    setDonations(prev => [newDonation, ...prev]);

    setRequirements(prev => prev.map(r => {
      if (r.id === req.id) {
        return {
          ...r,
          raisedAmount: r.raisedAmount + parseInt(itemCount),
          donorsCount: r.donorsCount + 1
        };
      }
      return r;
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Item Pickup Booked! 📦',
        message: `Pickup confirmed for ${itemCount} ${req.unitName} to ${req.ngoName}.`,
        time: 'Just now',
        read: false,
        donationId: donId
      },
      ...prev
    ]);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return newDonation;
  };

  const advanceDonationMilestone = ({ donationId, nextStage, title, note, proofPhotoUrl, invoiceNo }) => {
    setDonations(prev => prev.map(don => {
      if (don.id === donationId) {
        const updatedTimeline = [...don.timeline];
        updatedTimeline.push({
          stage: nextStage,
          title: title || `Stage ${nextStage} Milestone Reached`,
          time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          note: note || 'Proof of utilization verified by NGO.',
          proofPhoto: proofPhotoUrl || null,
          invoiceNo: invoiceNo || null
        });

        let newStatus = 'In Progress';
        if (nextStage === 2) newStatus = 'Funds Allocated to NGO';
        else if (nextStage === 3) newStatus = 'Vendor Purchase & Prep';
        else if (nextStage === 4) newStatus = 'Delivered to Beneficiaries';

        return {
          ...don,
          currentStage: nextStage,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return don;
    }));
  };

  const createRequirement = (newReq) => {
    const created = {
      id: `req-${Math.floor(100 + Math.random() * 900)}`,
      donorsCount: 0,
      raisedAmount: 0,
      ngoId: newReq.ngoId || 'ngo-1',
      ngoName: newReq.ngoName || 'Akshaya Patra Foundation',
      proofDocuments: ['Verification_Document.pdf'],
      ...newReq
    };
    setRequirements(prev => [created, ...prev]);
    return created;
  };

  const totalMoneyDonated = donations.filter(d => d.type === 'money').reduce((acc, d) => acc + d.amount, 0);
  const totalItemsDonated = donations.filter(d => d.type === 'item').reduce((acc, d) => acc + d.itemsCount, 0);
  const totalTaxSavings = donations.reduce((acc, d) => acc + (d.taxSavings || 0), 0);

  return (
    <AppContext.Provider value={{
      theme, changeTheme,
      currentScreen, setCurrentScreen,
      loginAsRole, registerDonor, registerNgo, goToIntro,
      role, setRole,
      user, setUser,
      ngos, setNgos,
      requirements, setRequirements,
      campaigns, setCampaigns,
      donations, setDonations,
      blockchain, setBlockchain,
      paymentModalReq, setPaymentModalReq,
      itemModalReq, setItemModalReq,
      trackerModalDonation, setTrackerModalDonation,
      receiptModalDonation, setReceiptModalDonation,
      isBlockchainOpen, setIsBlockchainOpen,
      isPurposeBotOpen, setIsPurposeBotOpen,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory,
      notifications, markAllNotificationsRead,
      processMoneyDonation,
      processItemDonation,
      advanceDonationMilestone,
      createRequirement,
      totalMoneyDonated,
      totalItemsDonated,
      totalTaxSavings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
