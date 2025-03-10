import React from 'react';
const ExperiencesGrid = () => {
  // Array of placeholder images
  const images = ['photo-1469474968028-56623f02e42e', 'photo-1470813740244-df37b8c1edcb', 'photo-1470071459604-3b5ec3a7fe05', 'photo-1500375592092-40eb2168fd21', 'photo-1458668383970-8ddd3927deed', 'photo-1504893524553-b855bce32c67'];
  return <section className="pt-7 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Some of Our Experiences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First column */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={`https://images.unsplash.com/${images[0]}?auto=format&fit=crop&w=600&h=600`} alt="Experience 1" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={`https://images.unsplash.com/${images[1]}?auto=format&fit=crop&w=600&h=750`} alt="Experience 2" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Second column - larger center image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 h-full">
              
            </div>
          </div>

          {/* Third column */}
          <div className="space-y-4">
            <div className="aspect-[1/1] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={`https://images.unsplash.com/${images[3]}?auto=format&fit=crop&w=600&h=600`} alt="Experience 4" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={`https://images.unsplash.com/${images[4]}?auto=format&fit=crop&w=600&h=450`} alt="Experience 5" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[1/1] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={`https://images.unsplash.com/${images[5]}?auto=format&fit=crop&w=600&h=600`} alt="Experience 6" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ExperiencesGrid;