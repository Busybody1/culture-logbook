import React from 'react';
import { Book, Share2, Star } from 'lucide-react';
const Features = () => {
  const features = [{
    icon: <Book className="w-8 h-8" />,
    title: "Personal Food Diary",
    description: "Keep track of your culinary adventures with our easy-to-use diary tool."
  }, {
    icon: <Star className="w-8 h-8" />,
    title: "Rate & Review",
    description: "Rate your experiences and add detailed notes to remember every flavor."
  }, {
    icon: <Share2 className="w-8 h-8" />,
    title: "Share Your Journey",
    description: "Share your food stories on social media with just one click."
  }];
  return <section className="py-20 px-6 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => <div key={index} className="text-center p-8 rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-lg transition-all duration-500 animate-float hover:scale-105 hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-xl" style={{
          animation: `float 6s ease-in-out ${index * 1}s infinite`,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 -3px 0 rgba(0, 0, 0, 0.1)'
        }}>
              <div className="text-accent mb-4 flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  {React.cloneElement(feature.icon, {
                className: "w-8 h-8 text-black"
              })}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                {feature.title}
              </h3>
              <p className="text-text/80">
                {feature.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Features;