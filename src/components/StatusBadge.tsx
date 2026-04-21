import React from 'react';
import { InvoiceStatus } from '../types/invoice';
import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    paid: {
      text: 'text-[#33D69F]',
      bg: 'bg-[#33D69F]/[0.06]',
      dot: 'bg-[#33D69F]',
      label: 'Paid',
    },
    pending: {
      text: 'text-[#FF8F00]',
      bg: 'bg-[#FF8F00]/[0.06]',
      dot: 'bg-[#FF8F00]',
      label: 'Pending',
    },
    draft: {
      text: 'text-[#373B53] dark:text-[#DFE3FA]',
      bg: 'bg-[#373B53]/[0.06] dark:bg-[#DFE3FA]/[0.06]',
      dot: 'bg-[#373B53] dark:bg-[#DFE3FA]',
      label: 'Draft',
    },
  };

  const current = statusConfig[status as keyof typeof statusConfig];

  return (
    <div
      className={cn(
        'flex h-10 w-[104px] items-center justify-center gap-2 rounded-md',
        current.bg,
        current.text
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', current.dot)} />
      <span className="font-spartan text-[15px] font-bold capitalize leading-[15px] tracking-[-0.25px]">
        {current.label}
      </span>
    </div>
  );
};
