import React, { createContext, useContext, useState } from 'react';

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  value: number;
  probability: number;
  stage: string;
  createdAt: string;
  lastActivity: string;
  priority: "high" | "medium" | "low";
  notes: string;
}

interface DealsContextType {
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'lastActivity'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
}

const DealsContext = createContext<DealsContextType | undefined>(undefined);

const initialDeals: Deal[] = [
  {
    id: "1",
    title: "Q4 Software License Renewal",
    company: "Acme Corporation",
    contact: "John Doe",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    value: 45000,
    probability: 85,
    stage: "negotiation",
    createdAt: "2024-01-15",
    lastActivity: "2024-01-20",
    priority: "high",
    notes: "Ready to close, just finalizing contract terms."
  },
  {
    id: "2",
    title: "Enterprise Integration Project",
    company: "TechStart Inc",
    contact: "Sarah Wilson",
    email: "sarah.wilson@techstart.com", 
    phone: "+1 (555) 234-5678",
    value: 120000,
    probability: 70,
    stage: "proposal",
    createdAt: "2024-01-10",
    lastActivity: "2024-01-19",
    priority: "high",
    notes: "Waiting for technical review from their IT team."
  },
  {
    id: "3",
    title: "Consulting Services Package",
    company: "Innovation Labs",
    contact: "Mike Chen",
    email: "mike.chen@innovationlabs.com",
    phone: "+1 (555) 345-6789",
    value: 75000,
    probability: 60,
    stage: "qualified",
    createdAt: "2024-01-08",
    lastActivity: "2024-01-18",
    priority: "medium",
    notes: "Interested but need to see ROI projections."
  },
  {
    id: "4",
    title: "Cloud Migration Support",
    company: "Global Systems",
    contact: "Lisa Park",
    email: "lisa.park@globalsys.com",
    phone: "+1 (555) 456-7890",
    value: 95000,
    probability: 75,
    stage: "proposal",
    createdAt: "2024-01-05",
    lastActivity: "2024-01-17",
    priority: "high",
    notes: "Budget approved, waiting for final stakeholder sign-off."
  }
];

export const DealsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const addDeal = (newDeal: Omit<Deal, 'id' | 'createdAt' | 'lastActivity'>) => {
    const deal: Deal = {
      ...newDeal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    setDeals(prev => [...prev, deal]);
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(deal => 
      deal.id === id 
        ? { ...deal, ...updates, lastActivity: new Date().toISOString() }
        : deal
    ));
  };

  const deleteDeal = (id: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== id));
  };

  return (
    <DealsContext.Provider value={{ deals, addDeal, updateDeal, deleteDeal }}>
      {children}
    </DealsContext.Provider>
  );
};

export const useDeals = () => {
  const context = useContext(DealsContext);
  if (context === undefined) {
    throw new Error('useDeals must be used within a DealsProvider');
  }
  return context;
};