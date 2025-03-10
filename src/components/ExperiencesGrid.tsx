
import React from 'react';

const ExperiencesGrid = () => {
  // Use the uploaded food images
  const images = [
    '/lovable-uploads/265cdfd2-230b-45af-96a2-ee2a8e46f852.png',
    '/lovable-uploads/528a8a4f-3595-44c7-a1a7-4220be5e7c88.png',
    '/lovable-uploads/e6dc3028-6ea1-4699-b997-095674a5f45d.png',
    '/lovable-uploads/131f6f6c-fb1a-481f-80ee-9a02544043a6.png',
    '/lovable-uploads/bf220a7d-90e3-40bb-81b7-32dff077eaf3.png',
    '/lovable-uploads/ce58f321-ac59-436e-bf8a-da4056d7828d.png',
    '/lovable-uploads/77f40d82-df9e-4353-b6d7-72a10356ca6a.png',
    '/lovable-uploads/7f0fad60-aeee-45ea-abf0-6a9b0deb3e57.png',
    '/lovable-uploads/e65289bd-0ea8-48b5-9fcc-562db97b6ee9.png',
    '/lovable-uploads/2cd13f34-c1c6-44c6-9dcf-8ac8ad6c54bc.png',
    '/lovable-uploads/9a8bea1a-fcaf-4abc-a4f0-46595e98b1e1.png',
    '/lovable-uploads/cf63be06-e879-4964-842b-eb070d6be865.png',
    '/lovable-uploads/de490512-4d67-4ed4-8aec-86ad5a5c2690.png',
    '/lovable-uploads/559f4922-3844-44b7-adf3-67aee1880df8.png',
    '/lovable-uploads/6c740f91-3ac8-4922-9065-bb325e0460bd.png'
  ];

  // Food descriptions for accessibility
  const descriptions = [
    'Premium roast beef with vegetables and potatoes in a rich gravy',
    'Artisanal pasta with fresh herbs and parmesan crisps',
    'Elegant sushi platter with assorted rolls and garnishes',
    'Gourmet Neapolitan pizzas with fresh toppings and prosciutto',
    'Grilled meat with orange reduction sauce',
    'Modern dim sum presentation with decorative garnish',
    'Fresh oysters on ice with citrus accompaniment',
    'Japanese bento box with seasonal delicacies',
    'Fine dining beef presentation with artistic sauces',
    'Grilled mackerel with carrot puree',
    'Contemporary green tea dessert display',
    'Premium caviar service with traditional accompaniments',
    'Traditional Spanish seafood paella',
    'Restaurant ambiance with elegant table setting',
    'Modern Asian fusion seafood dish'
  ];

  return (
    <section className="pt-8 pb-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Culinary Adventures</h2>
          <p className="text-lg text-gray-600">A mosaic of our gastronomic explorations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* First column - varied sizes */}
          <div className="space-y-3 flex flex-col">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src={images[0]} 
                alt={descriptions[0]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img 
                src={images[1]} 
                alt={descriptions[1]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-80">
              <img 
                src={images[2]} 
                alt={descriptions[2]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-72">
              <img 
                src={images[3]} 
                alt={descriptions[3]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-48">
              <img 
                src={images[12]} 
                alt={descriptions[12]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Second column - different aspect ratios */}
          <div className="space-y-3 flex flex-col">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-80">
              <img 
                src={images[4]} 
                alt={descriptions[4]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-56">
              <img 
                src={images[5]} 
                alt={descriptions[5]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-60">
              <img 
                src={images[6]} 
                alt={descriptions[6]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-70">
              <img 
                src={images[7]} 
                alt={descriptions[7]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img 
                src={images[8]} 
                alt={descriptions[8]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Third column - mix of heights */}
          <div className="space-y-3 flex flex-col">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-72">
              <img 
                src={images[9]} 
                alt={descriptions[9]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-56">
              <img 
                src={images[10]} 
                alt={descriptions[10]} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img 
                src={images[11]} 
                alt={descriptions[11]} 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-80">
              <img 
                src={images[13]} 
                alt={descriptions[13]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-60">
              <img 
                src={images[14]} 
                alt={descriptions[14]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesGrid;
