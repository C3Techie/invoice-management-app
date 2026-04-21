import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTriggerClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div className="flex justify-between items-center">
        <label 
          className={cn(
            "font-spartan text-[13px] font-medium leading-[15px] tracking-[-0.1px]",
            error ? "text-[#EC5757]" : "text-[#7E88C3] dark:text-[#DFE3FA]"
          )}
        >
          {label}
        </label>
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={handleTriggerClick}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-[4px] border px-5 font-spartan text-[15px] font-bold transition-all focus:outline-none relative",
          "bg-white text-[#0C0E16] dark:bg-[#1E2139] dark:text-white",
          error ? "border-[#EC5757]" : "border-[#DFE3FA] hover:border-[#7C5DFA] dark:border-[#252945]"
        )}
      >
        <span>{value ? format(new Date(value), 'dd MMM yyyy') : 'Select Date'}</span>
        <Calendar 
          size={16} 
          className="text-[#7E88C3] absolute left-[208px]" 
        />
      </button>

      {/* Hidden Native Input */}
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
      />
    </div>
  );
};
