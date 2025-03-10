
import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/90 z-10" />
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: "url('/lovable-uploads/6f30a6d2-b578-46f3-8c56-5559594ab8e8.png')"
      }} />
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="mb-8 relative p-4 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-lg"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text">The Culture Vulture</h1>
              <p className="text-xl md:text-2xl text-text/80 mb-8 font-semibold">
                Document your culinary adventures, share your experiences, and connect with fellow food enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
