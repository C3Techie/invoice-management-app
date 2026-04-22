import React, { useState } from 'react';
import { useInvoices } from '../lib/contexts/InvoiceContext';
import { InvoiceStatus } from '../types/invoice';
import { Typography } from './ui/Typography';
import { Button } from './ui/button';
import { FilterComponent } from './FilterComponent';
import { InvoiceCard } from './InvoiceCard';
import { InvoiceForm } from './InvoiceForm';

const InvoiceListPage: React.FC = () => {
  const { invoices } = useInvoices();
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleStatus = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices =
    selectedStatuses.length === 0
      ? invoices
      : invoices.filter((inv) => selectedStatuses.includes(inv.status));

  return (
    <div className="relative w-full max-w-182.5">
      {/* Header - Vertical Title/Count on left, Filter/Button on right */}
      <div className="flex items-center justify-between w-full px-6 md:px-0 mb-8 md:mb-16.25">
        <div className="flex flex-col">
          <Typography
            variant="heading-l"
            className="text-[24px] md:text-[36px] font-bold leading-[100%] tracking-[-1.13px] text-[#0C0E16] dark:text-white"
          >
            Invoices
          </Typography>
          <Typography
            variant="body"
            className="font-medium text-[13px] mt-1 md:mt-2 text-[#888EB0] dark:text-[#DFE3FA]"
          >
            <span className="hidden md:inline">There are {filteredInvoices.length} total invoices</span>
            <span className="md:hidden">{filteredInvoices.length} invoices</span>
          </Typography>
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <FilterComponent
            selectedStatuses={selectedStatuses}
            onToggleStatus={handleToggleStatus}
          />
          <Button variant="newInvoice" onClick={() => setIsFormOpen(true)}>
            New Invoice
          </Button>
        </div>
      </div>

      {/* List / Empty State */}
      <div className="mt-0">
        {filteredInvoices.length === 0 ? (
          <div className="relative h-85.5 w-full">
            {/* Empty State Image - Absolute Offset Logic */}
            <div className="absolute left-0 md:left-61 top-30 flex flex-col items-center text-center max-md:relative max-md:left-0 max-md:top-0 max-md:mt-24">
              <img
                src="/assets/no-invoice.png"
                alt="No invoices"
                className="mb-16 w-60.25 h-auto object-contain"
              />
              <Typography
                variant="heading-m"
                className="mb-6 leading-5.5 tracking-[-0.75px] text-[#0C0E16] dark:text-white"
              >
                There is nothing here
              </Typography>
              <Typography
                variant="body"
                className="max-w-55 text-[13px] leading-3.75 text-[#888EB0] dark:text-[#DFE3FA]"
              >
                Create an invoice by clicking the <br /> <span className="font-bold">New Invoice</span> button and get started
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>

      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default InvoiceListPage;
