'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Invoice, InvoiceStatus } from '@/types/invoice';
import { SAMPLE_INVOICES } from '@/lib/utils/sampleData';

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
  filterByStatus: (status: InvoiceStatus | 'all') => Invoice[];
  markAsPaid: (id: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const STORAGE_KEY = 'invoices';
const INITIALIZED_KEY = 'invoices-initialized';

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const version = localStorage.getItem('invoices-version');
    const LATEST_VERSION = '2021-sync-v1'; // Update this to force refresh

    if (stored && version === LATEST_VERSION) {
      try {
        setInvoices(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse invoices from localStorage:', error);
      }
    } else {
      // Re-initialize with the new sample data set
      setInvoices(SAMPLE_INVOICES);
      localStorage.setItem('invoices-version', LATEST_VERSION);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INVOICES));
      localStorage.setItem(INITIALIZED_KEY, 'true');
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever invoices change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    }
  }, [invoices, isLoaded]);

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const updateInvoice = (id: string, updatedInvoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? updatedInvoice : inv))
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const getInvoice = (id: string): Invoice | undefined => {
    return invoices.find((inv) => inv.id === id);
  };

  const filterByStatus = (status: InvoiceStatus | 'all'): Invoice[] => {
    if (status === 'all') return invoices;
    return invoices.filter((inv) => inv.status === status);
  };

  const markAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' as InvoiceStatus } : inv))
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoice,
        filterByStatus,
        markAsPaid,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within InvoiceProvider');
  }
  return context;
}
