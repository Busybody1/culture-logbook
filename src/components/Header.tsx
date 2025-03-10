
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-header py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-white text-2xl font-bold">
            The Culture Vulture
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="text-[#27AD95] border-[#27AD95] bg-white hover:bg-[#27AD95] hover:text-white transition-colors"
          >
            Log in
          </Button>
          <Button 
            className="bg-[#27AD95] text-white hover:bg-[#27AD95]/90 transition-colors"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
