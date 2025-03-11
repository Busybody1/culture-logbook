
import React from 'react';

const ExperiencesGrid = () => {
  // Use placeholder images from Unsplash
  const images = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588704487282-e7c75a87c00f?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80'
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
