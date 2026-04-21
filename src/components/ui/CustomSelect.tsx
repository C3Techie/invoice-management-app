import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: any) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      <label className="font-spartan text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">
        {label}
      </label>
      
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-[4px] border px-5 font-spartan text-[15px] font-bold transition-all focus:outline-none",
          "bg-white text-[#0C0E16] dark:bg-[#1E2139] dark:text-white",
          isOpen ? "border-[#7C5DFA]" : "border-[#DFE3FA] hover:border-[#7C5DFA] dark:border-[#252945]"
        )}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown 
          size={16} 
          className={cn("text-[#7C5DFA] transition-transform duration-300", isOpen && "rotate-180")} 
        />
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute top-[85px] left-0 z-20 w-full rounded-lg bg-white shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex h-12 items-center border-b px-6 font-spartan text-[15px] font-bold text-[#0C0E16] dark:text-[#DFE3FA] transition-colors last:border-none hover:text-[#7C5DFA]",
                  "border-[#DFE3FA] dark:border-[#1E2139]",
                  option.value === value && "text-[#7C5DFA]"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
