
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

const ExperiencesGrid = () => {
  // Use relative paths to images in the public/images/experiences folder
  const images = [
    '/images/experiences/0.jpg',
    '/images/experiences/1.jpg',
    '/images/experiences/2.jpg',
    '/images/experiences/3.jpg',
    '/images/experiences/4.jpg',
    '/images/experiences/5.jpg',
    '/images/experiences/6.jpg',
    '/images/experiences/7.jpg',
    '/images/experiences/8.jpg',
    '/images/experiences/9.jpg',
    '/images/experiences/10.jpg',
    '/images/experiences/11.jpg',
    '/images/experiences/12.jpg',
    '/images/experiences/13.jpg',
    '/images/experiences/14.jpg',
  ];

  // Fallback images in case Discord images don't load
  const fallbackImages = [
    '/lovable-uploads/e4df6ac5-3e36-4954-904c-59a7f252bb35.png',
    '/lovable-uploads/557edcd2-bac8-4d4f-a070-6a2ed372847a.png',
    '/lovable-uploads/56cc297b-dc89-4bd5-9255-dd56465e1c98.png',
    '/lovable-uploads/6f30a6d2-b578-46f3-8c56-5559594ab8e8.png',
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

  // Track which images have loaded and which have failed
  const [loadedStatus, setLoadedStatus] = useState<Record<number, boolean>>({});
  
  // Handle image load success
  const handleImageLoad = (index: number) => {
    setLoadedStatus(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  // Handle image load error
  const handleImageError = (index: number) => {
    setLoadedStatus(prev => ({
      ...prev,
      [index]: false
    }));
  };
  
  // Helper to get a fallback image
  const getFallbackImage = (index: number) => {
    return fallbackImages[index % fallbackImages.length];
  };

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
            {[0, 1, 2, 3, 12].map((imgIndex, index) => (
              <div 
                key={`col1-${index}`} 
                className={cn(
                  "overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow",
                  "relative aspect-[3/4]" // Use a fixed portrait aspect ratio
                )}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]} 
                  alt={descriptions[imgIndex]} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgIndex)}
                  onError={() => handleImageError(imgIndex)}
                />
              </div>
            ))}
          </div>

          {/* Second column - same portrait aspect ratio */}
          <div className="space-y-3 flex flex-col">
            {[4, 5, 6, 7, 8].map((imgIndex, index) => (
              <div 
                key={`col2-${index}`} 
                className={cn(
                  "overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow",
                  "relative aspect-[3/4]" // Use a fixed portrait aspect ratio
                )}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]} 
                  alt={descriptions[imgIndex]} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgIndex)}
                  onError={() => handleImageError(imgIndex)}
                />
              </div>
            ))}
          </div>

          {/* Third column - same portrait aspect ratio */}
          <div className="space-y-3 flex flex-col">
            {[9, 10, 11, 13, 14].map((imgIndex, index) => (
              <div 
                key={`col3-${index}`} 
                className={cn(
                  "overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow",
                  "relative aspect-[3/4]" // Use a fixed portrait aspect ratio
                )}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]} 
                  alt={descriptions[imgIndex]} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgIndex)}
                  onError={() => handleImageError(imgIndex)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesGrid;
