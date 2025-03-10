
import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/90" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text">
            Discover Your Food Story
          </h1>
          <p className="text-xl md:text-2xl text-text/80 mb-8">
            Document your culinary adventures, share your experiences, and connect with fellow food enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
