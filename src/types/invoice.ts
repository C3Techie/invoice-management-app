export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: InvoiceAddress;
  clientAddress: InvoiceAddress;
  items: InvoiceItem[];
  total: number;
  amountPaid?: number;
}

export interface InvoiceFormData {
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderAddress: InvoiceAddress;
  clientAddress: InvoiceAddress;
  items: InvoiceItem[];
}
