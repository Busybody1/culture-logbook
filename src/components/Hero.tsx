
import React from 'react';
import { Button } from './ui/button';
import { Utensils, MessageSquare, Layout } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            AI-Powered Food Discovery
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-700">
            Culinary Exploration Made Simple
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Unlock the power of artificial intelligence to discover amazing cuisines
            and create captivating food journeys effortlessly.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-black text-white p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Start Documenting Your Culinary Adventures</h3>
            <p className="text-gray-300 mb-6">
              Craft compelling food journals from your experiences, bringing your gastronomic narratives to life.
            </p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Get Started Now
            </Button>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-100 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Text-to-Recipe Generate</h3>
            <p className="text-gray-600 mb-6">
              Craft delicious recipes from textual descriptions, bringing your food ideas to reality.
            </p>
            <Button variant="outline" className="text-black border-black">
              Try OpenAI Now
            </Button>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl overflow-hidden relative">
            <img
              src="/lovable-uploads/557edcd2-bac8-4d4f-a070-6a2ed372847a.png"
              alt="Person enjoying food"
              className="absolute right-0 top-0 h-full w-2/3 object-cover object-left"
            />
            <div className="relative z-10 w-1/2">
              <h3 className="text-xl font-bold mb-3">Share Your Journey</h3>
              <p className="text-gray-600">
                Connect with fellow food enthusiasts.
              </p>
            </div>
          </div>
        </div>

        {/* Key features section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-gray-700">KEY FEATURES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3">Image-to-recipe Conversion</h3>
              <p className="text-gray-600">
                Seamlessly turn your food photos into dynamic, detailed recipes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Speech Integration</h3>
              <p className="text-gray-600">
                Incorporate your voice as narration to personalize your culinary stories.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Customizable Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates for your food journals.
              </p>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="bg-gray-100 p-6 rounded-xl flex items-center gap-4">
            <div className="bg-white rounded-lg p-3">
              <Utensils className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">300k</div>
              <div className="text-gray-600 text-sm">Satisfied users</div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-xl flex items-center gap-4">
            <div className="bg-white rounded-lg p-3">
              <MessageSquare className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-gray-600 text-sm">Positive reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
