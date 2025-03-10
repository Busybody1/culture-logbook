
import React from 'react';

const ExperiencesGrid = () => {
  // Array of placeholder images - these will be replaced later
  const images = [
    'photo-1469474968028-56623f02e42e',
    'photo-1470813740244-df37b8c1edcb',
    'photo-1470071459604-3b5ec3a7fe05',
    'photo-1500375592092-40eb2168fd21',
    'photo-1458668383970-8ddd3927deed',
    'photo-1504893524553-b855bce32c67',
  ].reduce((acc, img) => [...acc, img, img, img], []); // Repeat images to get 18 total

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Some of Our Experiences</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.slice(0, 18).map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&h=400`}
                alt={`Experience ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesGrid;
