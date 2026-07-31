export const INITIAL_NGOS = [
  {
    id: "ngo-1",
    name: "Akshaya Patra Foundation",
    tagline: "Unlimited Food for Education",
    trustScore: 98,
    tier: "Gold Verified",
    regNumber: "12A/80G/AAATA0001RE20214",
    fcraStatus: "Compliant & Active",
    category: "Child Nutrition & Education",
    logo: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 1420,
    totalRaised: 14250000,
    donorsCount: 38400,
    beneficiariesReached: 215000,
    address: "Bengaluru, Karnataka, India",
    establishedYear: 2000,
    upiId: "akshayapatra@purposepay",
    description: "Operates the world's largest non-profit mid-day meal program serving wholesome food to over 2 million government school children every day across India.",
    auditScoreDetails: {
      financialTransparency: 99,
      proofUploadSpeed: 97,
      donorSatisfaction: 98,
      lastAuditedDate: "2026-06-15"
    }
  },
  {
    id: "ngo-2",
    name: "Goonj Rahat Drive",
    tagline: "Clothing & Dignity for Rural Communities",
    trustScore: 96,
    tier: "Gold Verified",
    regNumber: "12A/80G/AAATG0045QE20191",
    fcraStatus: "Compliant & Active",
    category: "Disaster Relief & Rural Dignity",
    logo: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    rating: 4.85,
    reviewsCount: 980,
    totalRaised: 8900000,
    donorsCount: 22100,
    beneficiariesReached: 140000,
    address: "New Delhi, India",
    establishedYear: 1999,
    upiId: "goonj@purposepay",
    description: "Channeling underutilized urban material as a tool to address ignored basic needs and development work in rural India.",
    auditScoreDetails: {
      financialTransparency: 96,
      proofUploadSpeed: 95,
      donorSatisfaction: 97,
      lastAuditedDate: "2026-05-20"
    }
  },
  {
    id: "ngo-3",
    name: "CRY - Child Rights and You",
    tagline: "Ensuring Every Child Happy Childhood",
    trustScore: 95,
    tier: "Verified",
    regNumber: "12A/80G/AAATC0012RE20188",
    fcraStatus: "Compliant & Active",
    category: "Child Rights & Healthcare",
    logo: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 850,
    totalRaised: 6500000,
    donorsCount: 17500,
    beneficiariesReached: 95000,
    address: "Mumbai, Maharashtra, India",
    establishedYear: 1979,
    upiId: "cryindia@purposepay",
    description: "Restoring child rights by addressing root causes of child labor, malnutrition, and lack of schooling across 19 Indian states.",
    auditScoreDetails: {
      financialTransparency: 94,
      proofUploadSpeed: 96,
      donorSatisfaction: 95,
      lastAuditedDate: "2026-07-01"
    }
  },
  {
    id: "ngo-4",
    name: "HelpAge India",
    tagline: "Fighting Isolation & Elderly Healthcare",
    trustScore: 94,
    tier: "Verified",
    regNumber: "12A/80G/AAATH0078FE20176",
    fcraStatus: "Compliant & Active",
    category: "Elderly Care & Medicine",
    logo: "https://images.unsplash.com/photo-1581579438747-1dc8d1e05dd9?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
    rating: 4.75,
    reviewsCount: 620,
    totalRaised: 4200000,
    donorsCount: 11200,
    beneficiariesReached: 68000,
    address: "New Delhi, India",
    establishedYear: 1978,
    upiId: "helpage@purposepay",
    description: "Caring for disadvantaged elderly through mobile healthcare vans, cataract surgeries, elder helplines, and livelihood assistance.",
    auditScoreDetails: {
      financialTransparency: 95,
      proofUploadSpeed: 93,
      donorSatisfaction: 94,
      lastAuditedDate: "2026-06-28"
    }
  }
];

export const INITIAL_REQUIREMENTS = [
  {
    id: "req-101",
    ngoId: "ngo-1",
    ngoName: "Akshaya Patra Foundation",
    title: "500 High-Protein Meal Kits for Rural School Children",
    type: "money",
    category: "Child Nutrition",
    urgency: "critical",
    targetAmount: 75000,
    raisedAmount: 52500,
    unitPrice: 150,
    unitName: "Meal Kit",
    donorsCount: 64,
    deadline: "2026-08-15",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    description: "Funding emergency nutritious mid-day hot lunches (rice, dal, spinach curry, & jaggery milk) for primary school students in Raichur district.",
    proofDocuments: ["FSSAI_Quality_Certificate.pdf", "School_Headmaster_Request_Letter.pdf"]
  },
  {
    id: "req-102",
    ngoId: "ngo-2",
    ngoName: "Goonj Rahat Drive",
    title: "200 Thermal Blankets & Warm Jackets for Winter Relief",
    type: "item",
    category: "Warm Clothes / Items",
    urgency: "high",
    targetAmount: 200,
    raisedAmount: 142,
    unitPrice: 400,
    unitName: "Blanket",
    donorsCount: 38,
    deadline: "2026-08-30",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
    description: "Collecting heavy thermal blankets and jackets for homeless families residing near Northern Railway shelters.",
    proofDocuments: ["Distribution_Site_Inspection.pdf"]
  },
  {
    id: "req-103",
    ngoId: "ngo-3",
    ngoName: "CRY - Child Rights and You",
    title: "100 STEM Science & Math Kits for Tribal Schools",
    type: "money",
    category: "Education",
    urgency: "medium",
    targetAmount: 60000,
    raisedAmount: 28000,
    unitPrice: 600,
    unitName: "STEM Kit",
    donorsCount: 29,
    deadline: "2026-09-10",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    description: "Hands-on science experiments, basic robotics kits, and geometry sets to improve practical learning in government schools.",
    proofDocuments: ["Syllabus_Approval_Notice.pdf"]
  },
  {
    id: "req-104",
    ngoId: "ngo-4",
    ngoName: "HelpAge India",
    title: "50 Wheelchairs & Walking Aids for Elderly Centers",
    type: "item",
    category: "Medical & Mobility",
    urgency: "high",
    targetAmount: 50,
    raisedAmount: 31,
    unitPrice: 3500,
    unitName: "Wheelchair",
    donorsCount: 19,
    deadline: "2026-08-25",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80",
    description: "Providing sturdy lightweight wheelchairs and quad-canes for senior citizens living in destitute old-age care centers.",
    proofDocuments: ["Doctor_Assessment_Report.pdf"]
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: "camp-201",
    title: "Assam & Bihar Flood Relief Emergency Fund",
    organizer: "Goonj & Akshaya Patra Joint Drive",
    target: 2500000,
    raised: 1840000,
    backers: 1240,
    daysLeft: 12,
    urgent: true,
    banner: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    description: "Providing clean drinking water filters, dry ration packets, baby food, and plastic tarpaulins for 5,000 flood-affected families."
  },
  {
    id: "camp-202",
    title: "Digital Lab for 1,000 Girls in Rural Maharashtra",
    organizer: "CRY Child Rights Drive",
    target: 1200000,
    raised: 920000,
    backers: 890,
    daysLeft: 20,
    urgent: false,
    banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    description: "Setting up 5 solar-powered computer labs with educational software to bridge the rural-urban gender digital divide."
  }
];

// Initial donations start empty until a user makes a donation
export const INITIAL_DONATIONS = [];

export const INITIAL_BLOCKCHAIN = [];
