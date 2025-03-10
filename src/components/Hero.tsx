
import React from 'react';
const Hero = () => {
  return <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/90 z-10" />
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: "url('/lovable-uploads/d55fde6a-fcec-4325-bad5-e916b6d4e37d.png')"
      }} />
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text">The Culture Vulture</h1>
          <p className="text-xl md:text-2xl text-text/80 mb-8 font-semibold">
            Document your culinary adventures, share your experiences, and connect with fellow food enthusiasts.
          </p>
        </div>
      </div>
    </section>;
};
export default Hero;
