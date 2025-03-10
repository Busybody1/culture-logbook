
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-header py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/56cc297b-dc89-4bd5-9255-dd56465e1c98.png" 
              alt="The Culture Vulture" 
              className="h-12 hover:scale-105 transition-transform duration-300 border-5 border-white rounded-full shadow-md"
            />
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
