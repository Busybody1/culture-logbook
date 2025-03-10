
import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/90 z-10" />
      <div className="absolute inset-0 opacity-10 bg-repeat" 
           style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRjkzNDQiIGQ9Ik0zNiAzNGMwIDEuMTA0LS44OTYgMi0yIDJzLTItLjg5Ni0yLTJjMC0uNzQtLjQtMS4zOC0xLTEuNzMyVjE4YzAtLjU1Mi40NDgtMSAxLTFzMSAuNDQ4IDEgMXYxNC4yNjhjLjYuMzUyIDEgLjk5MiAxIDEuNzMyeiIvPjxwYXRoIHN0cm9rZT0iI0NFMTlCQyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNDggMzBjMCA5Ljk0MS04LjA1OSAxOC0xOCAxOFMxMiAzOS45NDEgMTIgMzBjMC05Ljk0MSA4LjA1OS0xOCAxOC0xOHMxOCA4LjA1OSAxOCAxOHoiLz48cGF0aCBmaWxsPSIjMjdBRDk1IiBkPSJNMjQgMjJjMC0xLjEwNC44OTYtMiAyLTJzMiAuODk2IDIgMmMwIC43NC40IDEuMzggMSAxLjczMlY0MGMwIC41NTItLjQ0OCAxLTEgMS0uNTUyIDAtMS0uNDQ4LTEtMVYyMy43MzJjLS42LS4zNTItMS0uOTkyLTEtMS43MzJ6Ii8+PC9nPjwvc3ZnPg==')" }}
      />
      <div className="max-w-7xl mx-auto relative z-20">
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
