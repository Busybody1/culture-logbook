
import React from 'react';

const ExperiencesGrid = () => {
  // Array of real food images
  const images = [
    'public/lovable-uploads/892677d8-0b11-4aee-b574-a6cbb8cab946.png',
    'public/lovable-uploads/95eadac5-cdaa-4dbd-92f3-d283df8670b6.png',
    'public/lovable-uploads/f0ff1966-096f-4971-99ae-35e70ddd70d5.png',
    'public/lovable-uploads/ea061cef-c254-458e-8da3-245a46051fe0.png',
    'public/lovable-uploads/02c95d1b-cefd-4ebc-be1c-3666d95abf0f.png',
    'public/lovable-uploads/a7f60adf-6825-4354-912f-d7dfce083f90.png',
    'public/lovable-uploads/c614be28-8f18-4716-b255-aaa648b4300a.png',
    'public/lovable-uploads/935c5872-0469-4b88-9b9d-cca99ddb3ec8.png',
    'public/lovable-uploads/b1658ed1-5da9-4f6b-971a-a0f40f451d84.png',
    'public/lovable-uploads/a1510407-8d50-4fa6-9949-c96d09e441b3.png',
    'public/lovable-uploads/b8c1f51f-7252-4b30-8de1-d4d72ff985f5.png',
    'public/lovable-uploads/b6f7ede3-c167-430e-9881-ec6d41f531e0.png',
    'public/lovable-uploads/6376c924-1f8a-46f9-9c0d-82e3f1f7397a.png',
    'public/lovable-uploads/a3a7a9ce-5e5b-49f1-84b7-8c6240570117.png',
    'public/lovable-uploads/6c574d24-5a48-46bc-bada-c580ffa34357.png'
  ];
  
  // Food descriptions for accessibility
  const descriptions = [
    'Tender roast beef with potatoes and vegetables in gravy',
    'Pasta dish with herbs and parmesan cheese crisps',
    'Assorted sushi rolls with pickled ginger and wasabi',
    'Gourmet pizzas with fresh toppings and prosciutto salad',
    'Grilled meat with orange sauce on a white plate',
    'Dim sum with green garnish in a bamboo steamer',
    'Oysters on ice with sauce in a green bowl',
    'Japanese bento box with assorted seafood and delicacies',
    'Fine dining beef dish on a black plate with colorful sauces',
    'Grilled fish on orange sauce on a gray plate',
    'Artistic green dessert in reflective gold display',
    'Caviar with pancakes and cream in an elegant setting',
    'Spanish paella with seafood in a traditional pan',
    'Restaurant interior with gourmet appetizer in the foreground',
    'Asian fusion dish with seafood and rice'
  ];

  return (
    <section className="pt-5 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Some of Our Experiences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First column */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[0]} alt={descriptions[0]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[1]} alt={descriptions[1]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[2]} alt={descriptions[2]} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Second column */}
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[3]} alt={descriptions[3]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[4]} alt={descriptions[4]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[5]} alt={descriptions[5]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[6]} alt={descriptions[6]} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Third column */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[7]} alt={descriptions[7]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[8]} alt={descriptions[8]} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
              <img src={images[9]} alt={descriptions[9]} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesGrid;
