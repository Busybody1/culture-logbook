
import React from 'react';
import { Book, Share2, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Book className="w-8 h-8" />,
      title: "Personal Food Diary",
      description: "Keep track of your culinary adventures with our easy-to-use diary tool."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Rate & Review",
      description: "Rate your experiences and add detailed notes to remember every flavor."
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Share Your Journey",
      description: "Share your food stories on social media with just one click."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-accent mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                {feature.title}
              </h3>
              <p className="text-text/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
