
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
