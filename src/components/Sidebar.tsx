import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 z-[70] flex h-full w-[103px] flex-col overflow-hidden bg-[#373B53] lg:rounded-r-[20px] max-lg:h-[80px] max-lg:w-full max-lg:flex-row max-lg:rounded-none">
      {/* Container for Desktop/Mobile logic */}
      <div className="relative flex h-full w-full flex-col max-lg:flex-row max-lg:items-center max-lg:justify-between">
        
        {/* Logo - Stays at top */}
        <Link to="/" className="flex h-[103px] w-[103px] items-center justify-center rounded-r-[20px] bg-primary max-lg:h-[80px] max-lg:w-[80px]">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-[103px] w-[103px] rounded-r-[20px] object-cover max-lg:h-[80px] max-lg:w-[80px]"
          />
        </Link>
        
        {/* Bottom Section - Desktop (Pinned to bottom) */}
        <div className="hidden lg:mt-auto lg:flex lg:flex-col lg:items-center lg:w-full">
          {/* Moon Icon / Theme Toggle */}
          <div className="mb-8 flex items-center justify-center">
            <ThemeToggle />
          </div>
          
          {/* Separator Line */}
          <div className="h-[1px] w-full bg-[#494E6E]" />
          
          {/* Profile Oval */}
          <div className="py-6 flex items-center justify-center">
            <img 
              src="/assets/profile-image.png" 
              alt="Profile" 
              className="h-[40px] w-[40px] rounded-full border-2 border-transparent transition-colors hover:border-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile View Layout (Right side in flex-row) */}
        <div className="lg:hidden flex items-center h-full">
          <div className="px-6 h-full flex items-center justify-center">
            <ThemeToggle />
          </div>
          <div className="h-full w-[1px] bg-[#494E6E]" />
          <div className="px-6 h-full flex items-center justify-center">
            <img 
              src="/assets/profile-image.png" 
              alt="Profile" 
              className="h-[32px] w-[32px] rounded-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
