import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  hideLabelOnDesktop?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  errorMessage,
  hideLabelOnDesktop,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label 
          className={cn(
            "font-spartan text-[13px] font-medium leading-3.75 tracking-[-0.1px]",
            error ? "text-[#EC5757]" : "text-[#7E88C3] dark:text-[#DFE3FA]",
            hideLabelOnDesktop && "md:hidden"
          )}
        >
          {label}
        </label>
        {error && (
          <span className="font-spartan text-[10px] font-semibold text-[#EC5757]">
            {errorMessage || "can't be empty"}
          </span>
        )}
      </div>
      <input
        className={cn(
          "h-12 w-full rounded-lg border px-5 font-spartan text-[15px] font-bold transition-colors focus:outline-none",
          "bg-white text-[#0C0E16] dark:bg-[#1E2139] dark:text-white",
          error 
            ? "border-[#EC5757]" 
            : "border-[#DFE3FA] focus:border-[#9277FF] dark:border-[#252945] dark:focus:border-[#9277FF]",
          className
        )}
        {...props}
      />
    </div>
  );
};
