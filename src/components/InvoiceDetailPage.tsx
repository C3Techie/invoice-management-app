import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInvoices } from '../lib/contexts/InvoiceContext';
import { Typography } from './ui/Typography';
import { StatusBadge } from './StatusBadge';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { InvoiceForm } from './InvoiceForm';

const InvoiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInvoice, deleteInvoice, markAsPaid } = useInvoices();
  const invoice = getInvoice(id || '');

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!invoice) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Typography variant="heading-m">Invoice not found</Typography>
      </div>
    );
  }

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/');
  };

  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(invoice.total);

  return (
    <div className="mx-auto flex w-full max-w-[730px] flex-col pb-32 pt-8 md:pt-12">
      {/* Go Back Link */}
      <Link
        to="/"
        className="group mb-8 flex items-center gap-6 font-spartan text-[15px] font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
        <span className="group-hover:text-[#7E88C3] transition-colors">Go back</span>
      </Link>

      {/* Top Bar / Header */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-6 shadow-sm dark:bg-[#1E2139] md:px-8">
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-4">
          <Typography variant="body" className="text-[#858BB2] dark:text-[#DFE3FA]">
            Status
          </Typography>
          <StatusBadge status={invoice.status} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="edit" onClick={() => setIsEditOpen(true)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </Button>
          {invoice.status !== 'paid' && (
            <Button variant="default" onClick={() => markAsPaid(invoice.id)}>
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-[#1E2139] md:p-12">
        {/* Info Section */}
        <div className="mb-8 flex flex-col justify-between md:mb-12 md:flex-row md:items-start">
          <div className="mb-8 flex flex-col md:mb-0">
            <Typography variant="heading-s-variant" className="mb-2 text-[16px] md:text-[20px]">
              <span className="text-[#888EB0]">#</span>
              {invoice.id}
            </Typography>
            <Typography variant="body" className="text-[#7E88C3] dark:text-[#DFE3FA]">
              {invoice.description}
            </Typography>
          </div>
          <div className="flex flex-col text-left font-spartan text-[11px] leading-[18px] tracking-[-0.23px] text-[#7E88C3] dark:text-[#DFE3FA] md:text-right">
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>

        {/* Billing Section */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-4">
          {/* Dates */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <Typography variant="body" className="mb-3 block text-[#7E88C3] dark:text-[#DFE3FA]">
                Invoice Date
              </Typography>
              <Typography variant="heading-s" className="text-[15px]">
                {format(new Date(invoice.createdAt), 'dd MMM yyyy')}
              </Typography>
            </div>
            <div>
              <Typography variant="body" className="mb-3 block text-[#7E88C3] dark:text-[#DFE3FA]">
                Payment Due
              </Typography>
              <Typography variant="heading-s" className="text-[15px]">
                {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
              </Typography>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <Typography variant="body" className="mb-3 block text-[#7E88C3] dark:text-[#DFE3FA]">
              Bill To
            </Typography>
            <Typography variant="heading-s" className="mb-2 text-[15px]">
              {invoice.clientName}
            </Typography>
            <div className="flex flex-col font-spartan text-[11px] leading-[18px] tracking-[-0.23px] text-[#7E88C3] dark:text-[#DFE3FA]">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </div>
          </div>

          {/* Sent To */}
          <div className="col-span-2 md:col-span-1">
            <Typography variant="body" className="mb-3 block text-[#7E88C3] dark:text-[#DFE3FA]">
              Sent to
            </Typography>
            <Typography variant="heading-s" className="text-[15px] break-all">
              {invoice.clientEmail}
            </Typography>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-hidden rounded-t-lg bg-[#F9FAFE] p-6 dark:bg-[#252945] md:p-8">
          {/* Desktop Table Header */}
          <div className="mb-8 hidden grid-cols-4 md:grid">
            <Typography variant="body-variant" className="col-span-2 text-[#7E88C3] dark:text-[#DFE3FA]">Item Name</Typography>
            <Typography variant="body-variant" className="text-center text-[#7E88C3] dark:text-[#DFE3FA]">QTY.</Typography>
            <Typography variant="body-variant" className="text-right text-[#7E88C3] dark:text-[#DFE3FA]">Price</Typography>
            <Typography variant="body-variant" className="text-right text-[#7E88C3] dark:text-[#DFE3FA]">Total</Typography>
          </div>

          {/* Item Rows */}
          <div className="flex flex-col gap-6 md:gap-8">
            {invoice.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between md:grid md:grid-cols-4">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Typography variant="heading-s-variant" className="text-[12px] md:text-[15px]">{item.name}</Typography>
                  <Typography variant="body" className="text-[#7E88C3] dark:text-[#888EB0] md:hidden">
                    {item.quantity} x {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(item.price)}
                  </Typography>
                </div>
                <Typography variant="heading-s-variant" className="hidden text-center text-[#7E88C3] dark:text-[#DFE3FA] md:block">{item.quantity}</Typography>
                <Typography variant="heading-s-variant" className="hidden text-right text-[#7E88C3] dark:text-[#DFE3FA] md:block">
                  {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(item.price)}
                </Typography>
                <Typography variant="heading-s-variant" className="text-right text-[#0C0E16] dark:text-white">
                  {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(item.total)}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Container */}
        <div className="flex items-center justify-between rounded-b-lg bg-[#373B53] p-6 text-white dark:bg-[#0C0E16] md:px-8">
          <Typography variant="body" className="text-white">Amount Due</Typography>
          <Typography variant="heading-m" className="text-white md:text-[24px]">
            {formattedTotal}
          </Typography>
        </div>
      </div>

      <InvoiceForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} invoiceToEdit={invoice} />
      
      {/* Mobile Footer Actions (Sticky) */}
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-white p-6 shadow-[0_-10px_20px_rgba(72,84,159,0.1)] dark:bg-[#1E2139] md:hidden">
        <Button variant="edit" onClick={() => setIsEditOpen(true)}>Edit</Button>
        <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
        {invoice.status !== 'paid' && (
          <Button variant="default" onClick={() => markAsPaid(invoice.id)}>Mark as Paid</Button>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-[480px] rounded-lg bg-white p-8 dark:bg-[#1E2139] md:p-12">
            <Typography variant="heading-m" className="mb-4 text-[#0C0E16] dark:text-white">
              Confirm Deletion
            </Typography>
            <Typography variant="body" className="mb-8 leading-[22px] text-[#888EB0] dark:text-[#DFE3FA]">
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be
              undone.
            </Typography>
            <div className="flex justify-end gap-2">
              <Button variant="edit" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailPage;
