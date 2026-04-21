import type { Invoice, InvoiceItem } from '@/types/invoice';

export function generateInvoiceId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;
  let result = '#';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function calculateTotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function calculateItemTotal(quantity: number, price: number): number {
  return quantity * price;
}

export function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getPaymentDueDate(createdDate: string, paymentTerms: number): string {
  const date = new Date(createdDate);
  date.setDate(date.getDate() + paymentTerms);
  return date.toISOString().split('T')[0];
}

export function isInvoiceOverdue(paymentDue: string, status: string): boolean {
  if (status !== 'pending') return false;
  const today = new Date();
  const dueDate = new Date(paymentDue);
  return dueDate < today;
}

export function getStatusColor(status: string): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case 'paid':
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        dot: 'bg-green-500',
      };
    case 'pending':
      return {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-700 dark:text-orange-300',
        dot: 'bg-orange-500',
      };
    case 'draft':
      return {
        bg: 'bg-slate-50 dark:bg-slate-900/20',
        text: 'text-slate-700 dark:text-slate-300',
        dot: 'bg-slate-500',
      };
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        text: 'text-gray-700 dark:text-gray-300',
        dot: 'bg-gray-500',
      };
  }
}
