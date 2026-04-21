import React, { useState, useRef, useEffect } from 'react';
import { InvoiceStatus } from '../types/invoice';
import { Typography } from './ui/Typography';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

interface FilterComponentProps {
  selectedStatuses: InvoiceStatus[];
  onToggleStatus: (status: InvoiceStatus) => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  selectedStatuses,
  onToggleStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 focus:outline-none"
      >
        <Typography 
          variant="heading-s-variant" 
          className="text-[15px] font-bold leading-[15px] tracking-[-0.25px] text-[#0C0E16] dark:text-white"
        >
          <span className="hidden md:inline">Filter by status</span>
          <span className="md:hidden">Filter</span>
        </Typography>
        <svg
          width="11"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute left-[-40px] top-[40px] z-50 w-[192px] rounded-lg bg-white p-6 shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
          style={{ height: '128px' }}
        >
          <div className="flex flex-col gap-4">
            {statuses.map((status) => (
              <label
                key={status}
                className="group flex cursor-pointer items-center gap-3 underline-none"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => onToggleStatus(status)}
                />
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-sm transition-colors border-2',
                    selectedStatuses.includes(status)
                      ? 'bg-[#DFE3FA] border-primary dark:bg-[#1E2139]'
                      : 'border-transparent bg-[#DFE3FA] group-hover:border-primary dark:bg-[#1E2139]'
                  )}
                >
                  {selectedStatuses.includes(status) && (
                    <Check className="h-3 w-3 text-primary stroke-[4]" />
                  )}
                </div>
                <Typography 
                  variant="heading-s-variant" 
                  className={cn(
                    "capitalize transition-colors font-bold",
                    selectedStatuses.includes(status) 
                      ? "text-primary" 
                      : "text-[#0C0E16] dark:text-white"
                  )}
                >
                  {status}
                </Typography>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
