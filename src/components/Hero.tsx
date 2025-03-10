
import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Textured background */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRjkzNDQiIGQ9Ik0zNiAzNGMwIDEuMTA0LS44OTYgMi0yIDJzLTItLjg5Ni0yLTJjMC0uNzQtLjQtMS4zOC0xLTEuNzMyVjE4YzAtLjU1Mi40NDgtMSAxLTFzMSAuNDQ4IDEgMXYxNC4yNjhjLjYuMzUyIDEgLjk5MiAxIDEuNzMyeiIvPjxwYXRoIHN0cm9rZT0iI0NFMTlCQyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNDggMzBjMCA5Ljk0MS04LjA1OSAxOC0xOCAxOFMxMiAzOS45NDEgMTIgMzBjMC05Ljk0MSA4LjA1OS0xOCAxOC0xOHMxOCA4LjA1OSAxOCAxOHoiLz48cGF0aCBmaWxsPSIjMjdBRDk1IiBkPSJNMjQgMjJjMC0xLjEwNC44OTYtMiAyLTJzMiAuODk2IDIgMmMwIC43NC40IDEuMzggMSAxLjczMlY0MGMwIC41NTItLjQ0OCAxLTEgMS0uNTUyIDAtMS0uNDQ4LTEtMVYyMy43MzJjLS42LS4zNTItMS0uOTkyLTEtMS43MzJ6Ii8+PC9nPjwvc3ZnPg==')",
          backgroundRepeat: "repeat"
        }}
      />
      
      {/* Cultural accent - travel stamps */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <div className="w-20 h-20 rounded-full border-2 border-text flex items-center justify-center">
          <span className="text-xs font-bold text-text">PARIS</span>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <div className="w-16 h-16 rounded-full border-2 border-header flex items-center justify-center">
          <span className="text-xs font-bold text-header">TOKYO</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8 relative p-4 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-lg"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text animate-fade-in">The Culture Vulture</h1>
              <p className="text-xl md:text-2xl text-text/80 mb-8 font-semibold animate-slide-up" style={{animationDelay: "0.3s"}}>
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
