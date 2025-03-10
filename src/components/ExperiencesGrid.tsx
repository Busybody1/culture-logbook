
import React from 'react';

const ExperiencesGrid = () => {
  // Array of paths to the food images
  const images = [
    '/e3e1eb70-a39a-4da8-9f31-0043ae850d78.png',
    '/07bd027b-40d5-41a6-85ab-5d9510d5f0c9.png',
    '/81549b6b-7805-42c5-b6a8-fb180643aa01.png',
    '/83f01ee8-a5f1-4ceb-8a3a-c9343c0bb31e.png',
    '/4a7a7acc-e06c-4370-a5e6-eb74218cb130.png',
    '/6584da40-cd9c-4444-82d0-bb782dac51ff.png',
    '/0763f2b1-7ed3-43f7-9398-92b572d534df.png',
    '/9ef0bc5b-d4ac-41ad-a794-d5366808ac10.png',
    '/021bb57f-6547-46f3-b3f8-896bab5421aa.png',
    '/5fe8f820-526b-4490-874b-5b3b5967bc0d.png',
    '/f5784055-2d4b-4de5-a60b-e8a2781f5524.png',
    '/e98b33d0-9a03-4ee4-88ad-07ed8309ed9c.png',
    '/15e4f099-395f-43fd-83a4-866197c75ab8.png',
    '/540569d9-5a79-4466-b4cf-b69d9bf0262e.png',
    '/40cfb3fa-341d-49d1-ac05-12282967ff08.png'
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
