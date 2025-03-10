
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center space-x-8">
          <a href="#" className="text-text hover:text-accent transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-text hover:text-accent transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-text hover:text-accent transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
        <p className="text-center text-text/60 mt-8">
          © {new Date().getFullYear()} The Culture Vulture. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
