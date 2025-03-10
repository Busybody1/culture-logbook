import React from 'react';

const ExperiencesGrid = () => {
  // Array of paths to the food images
  const images = [
    '/lovable-uploads/6b523868-089f-427c-bd04-8a4e70fb552a.png',
    '/lovable-uploads/8626e6f7-c80c-4c9d-a419-21f5d7403495.png',
    '/lovable-uploads/71b99daf-22a6-4c53-98ce-55eaa7798bc7.png',
    '/lovable-uploads/02d8d9f6-9b24-4a35-988a-686bb47849de.png',
    '/lovable-uploads/d3a2518b-217d-41a7-aaf6-dfa7639358a7.png',
    '/lovable-uploads/d7ab5ee4-1b30-4256-97a0-b3b282f18429.png',
    '/lovable-uploads/2193510c-3766-4025-a958-a4ebad2dcda0.png',
    '/lovable-uploads/1464b913-2153-4350-94b8-205253915060.png',
    '/lovable-uploads/33572675-d7fa-4d26-a864-f2cf418a674c.png',
    '/lovable-uploads/a1d8ef3f-cfb1-4d94-82c4-60d4663ac467.png',
    '/lovable-uploads/8b9d8ae6-521c-4335-b108-43cef81f0a9d.png',
    '/lovable-uploads/08602336-a632-47b4-a31a-500b67fc0340.png',
    '/lovable-uploads/3509b12c-7a0f-4d54-aa43-ec180b2798e3.png',
    '/lovable-uploads/99f6b3ec-d9e3-4b45-a170-cc5d981565ee.png',
    '/lovable-uploads/5ac4cc39-d40b-4fe9-92a2-093815b29954.png'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* First column - varied sizes */}
          <div className="space-y-2 flex flex-col">
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
          </div>

          {/* Second column - different aspect ratios */}
          <div className="space-y-2 flex flex-col">
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
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
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
          <div className="space-y-2 flex flex-col">
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
                src={images[12]} 
                alt={descriptions[12]} 
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
