
import React, { useState, useEffect } from 'react';

const ExperiencesGrid = () => {
  // Use the provided Discord CDN images
  const images = [
    'https://media.discordapp.net/attachments/1054759503859560518/1349090801182838814/48f50ee2-ac82-485b-8936-87b2ada26e2d.JPG?ex=67d1d637&is=67d084b7&hm=d0d0e068574f8517f174ce6f961637132e72e11cd568b068e7c1834b4ddfabe3&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090801660985374/4f52166d-004e-4e87-a9df-3f0fa2c06697.JPG?ex=67d1d638&is=67d084b8&hm=725cc52ed85a45124612eb8a5bc6a05de69e548994b3b9b4833956f54c827f44&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090802131009547/2fa4c59d-b3fe-4a31-9294-a222e5151e88.JPG?ex=67d1d638&is=67d084b8&hm=08c06785cf74dd2ab87e568d51d33a2b4a16a9c03c51c141e59ecbf11aa6e3db&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090802512564306/c31d996e-3079-4271-9503-0b43f6a12081.JPG?ex=67d1d638&is=67d084b8&hm=0c130d34b244219ed2f28e349294595e118de9a191e713d3c4a509a8f99e98b5&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090803070406749/ff27b210-cfd0-4a9f-ac39-476287d2fbcc.JPG?ex=67d1d638&is=67d084b8&hm=fc054de5ef5fec7fbc19642bd36c12fd75c64a41bafc28015a3676d4aa3d253f&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090844220588155/29f51b57-1cc3-40f0-a3df-bbf6989532bf.JPG?ex=67d1d642&is=67d084c2&hm=e10acfc531c49de13b00fb9b2902b3b54c2328de82c04ef4508316ac2973602a&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090844757594202/423044cb-a664-4de3-9bed-e09309465544.JPG?ex=67d1d642&is=67d084c2&hm=b050bc6671c8d7e876817cac0fbe8c5d0b9b1bc768423b2d5bc5065c363fb14c&=&format=webp&width=747&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090845239935129/819dfe70-b757-48ce-b8ea-06ad2f0ba3b5.JPG?ex=67d1d642&is=67d084c2&hm=c4f43b3220d3d1049b3442933fd237e33d6bd3a1ac61be73e428d0f304e18adf&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090845810491462/f45767e8-41c6-484e-8075-ac462f1131c6.JPG?ex=67d1d642&is=67d084c2&hm=3439ffd588c3bb0b412c05e0ef86a5d3b7cb76cf0aff6fab4f0f5ab283e91f82&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090846267539537/1cce89c1-1e0a-4989-b08e-3417b87aaaf6.JPG?ex=67d1d642&is=67d084c2&hm=196458b041eb8b654ee8816e03fc16ace4f1d9243261925fc3d659816b552c49&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090846766530580/818a2a70-4373-4fbd-aaf5-c6a1c0f8e9fe.JPG?ex=67d1d642&is=67d084c2&hm=dc49363cf5103c6b3a81279c2ddbd51cecb1ac88e673356bf98ff735b436b4df&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090847211393125/388f50f1-1eb6-4c78-9917-7bf82517e49f.JPG?ex=67d1d642&is=67d084c2&hm=c285376905f26f8553f6d57195b5280be163f37952e647d2d7fd4a20bdac888b&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090847643271200/865b44c9-6978-4425-af21-4d843b8b930b.JPG?ex=67d1d642&is=67d084c2&hm=0c16a8e2b6988a669cd88bc5f621000556391a8b9e5db92242c9d2f5d87c164a&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090848133873779/b580d31d-1218-43e1-b183-473165844728.JPG?ex=67d1d643&is=67d084c3&hm=2bb87b5f5c27c6e3eab68212ab2362f1067496d53430e8bba6d0f1ceb58ccd25&=&format=webp&width=995&height=1328',
    'https://media.discordapp.net/attachments/1054759503859560518/1349090848587124928/8d557724-2086-4826-bbb6-41c921c37cec.JPG?ex=67d1d643&is=67d084c3&hm=c1e2c77fa560bebdb18f8cead2cf01b600080023cb08eb4914d54c2358332429&=&format=webp&width=995&height=1328'
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
                className={`overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
                  index === 0 ? 'h-auto' : 
                  index === 1 ? 'h-64' : 
                  index === 2 ? 'h-80' : 
                  index === 3 ? 'h-72' : 'h-48'
                }`}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]} 
                  alt={descriptions[imgIndex]} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgIndex)}
                  onError={() => handleImageError(imgIndex)}
                />
              </div>
            ))}
          </div>

          {/* Second column - different aspect ratios */}
          <div className="space-y-3 flex flex-col">
            {[4, 5, 6, 7, 8].map((imgIndex, index) => (
              <div 
                key={`col2-${index}`} 
                className={`overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
                  index === 0 ? 'h-80' : 
                  index === 1 ? 'h-56' : 
                  index === 2 ? 'h-60' : 
                  index === 3 ? 'h-70' : 'h-64'
                }`}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]} 
                  alt={descriptions[imgIndex]} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgIndex)}
                  onError={() => handleImageError(imgIndex)}
                />
              </div>
            ))}
          </div>

          {/* Third column - mix of heights */}
          <div className="space-y-3 flex flex-col">
            {[9, 10, 11, 13, 14].map((imgIndex, index) => (
              <div 
                key={`col3-${index}`} 
                className={`overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
                  index === 0 ? 'h-72' : 
                  index === 1 ? 'h-56' : 
                  index === 2 ? 'h-64' : 
                  index === 3 ? 'h-80' : 'h-60'
                }`}
              >
                <img 
                  src={loadedStatus[imgIndex] === false ? getFallbackImage(imgIndex) : images[imgIndex]}
                  alt={descriptions[imgIndex]} 
                  className="w-full h-full object-cover"
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
