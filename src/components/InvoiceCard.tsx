import React from 'react';
import { Invoice } from '../types/invoice';
import { Typography } from './ui/Typography';
import { StatusBadge } from './StatusBadge';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  const formattedDate = format(new Date(invoice.paymentDue), 'dd MMM yyyy');
  
  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(invoice.total);

  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="group relative block h-[72px] w-full max-w-[730px] rounded-[8px] bg-white border border-transparent transition-all hover:border-[#7C5DFA] dark:bg-[#1E2139] max-lg:h-auto max-lg:w-full max-lg:p-6 mb-4 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.10)]"
    >
      {/* Desktop/Tablet Flex Layout */}
      <div className="hidden md:flex h-full w-full items-center px-8">
        {/* ID Section */}
        <div className="flex-[0_0_100px]">
          <Typography variant="heading-s-variant" className="font-bold text-[#0C0E16] dark:text-white">
            <span className="text-[#7E88C3]">#</span>
            {invoice.id}
          </Typography>
        </div>

        {/* Due Date Section */}
        <div className="flex-[0_0_150px]">
          <Typography variant="body" className="font-medium text-[#888EB0] dark:text-[#DFE3FA]">
            Due {formattedDate}
          </Typography>
        </div>

        {/* Client Name Section */}
        <div className="flex-1 truncate pr-4">
          <Typography variant="body" className="font-medium text-[#858BB2] dark:text-white">
            {invoice.clientName}
          </Typography>
        </div>

        {/* Amount Section */}
        <div className="flex-[0_0_110px] text-right pr-10">
          <Typography variant="heading-s" className="font-bold text-[#0C0E16] dark:text-white">
            {formattedTotal}
          </Typography>
        </div>

        {/* Status Section */}
        <div className="flex-[0_0_104px]">
          <StatusBadge status={invoice.status} />
        </div>

        {/* Chevron Section */}
        <div className="ml-5">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4-4 4"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Layout - Fixed 134px Height */}
      <div className="md:hidden flex flex-col justify-between h-[134px] w-full px-6 py-6 border border-transparent rounded-[8px] bg-white dark:bg-[#1E2139] shadow-[0_10px_10px_-10px_rgba(72,84,159,0.10)] transition-all hover:border-[#7C5DFA]">
        <div className="flex items-center justify-between">
          <Typography variant="heading-s-variant" className="font-bold text-[#0C0E16] dark:text-white">
            <span className="text-[#7E88C3]">#</span>
            {invoice.id}
          </Typography>
          <Typography variant="body" className="font-medium text-[#858BB2] dark:text-white">
            {invoice.clientName}
          </Typography>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <Typography variant="body" className="font-medium text-[#888EB0] dark:text-[#DFE3FA]">
              Due {formattedDate}
            </Typography>
            <Typography variant="heading-s" className="font-bold text-[#0C0E16] dark:text-white">
              {formattedTotal}
            </Typography>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>
    </Link>
  );
};
