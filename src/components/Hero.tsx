import React from 'react';
import { Button } from './ui/button';
import { Utensils, MessageSquare, Layout } from 'lucide-react';
const Hero = () => {
  return <section className="py-16 px-6 bg-white mt-20">
      {/* Added mt-20 class above to create space for the fixed header */}
      <div className="max-w-7xl mx-auto">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">The Culture Vulture</h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-700">
            Culinary Exploration Made Simple
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Document your culinary adventures, share your experiences, and connect with fellow food enthusiasts.</p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="text-white p-8 rounded-xl bg-[#ff9344] flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3 text-black">Start Documenting Your Culinary Adventures</h3>
            <p className="mb-6 flex-grow text-gray-600">
              Craft compelling food journals from your experiences, bringing your gastronomic narratives to life.
            </p>
            <div>
              <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white">
                Get Started Now
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-xl bg-[#ff9344]/[0.44] flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3">Save Your Precious Moments</h3>
            <p className="text-gray-600 mb-6 flex-grow">Tag, rate, and organize your experiences so you never forget them.</p>
            <div>
              <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white">Try It Now</Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl overflow-hidden relative flex flex-col h-full">
            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold mb-3">Share Your Journey

            </h3>
              <p className="text-gray-600 mb-6">Turn your favorite food and travel memories into shareable stories. With one click, post your adventures on social media!</p>
            </div>
            <div>
              <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white">Join Community</Button>
            </div>
          </div>
        </div>

        {/* Key features section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-3 h-3 rounded-full bg-[#ce19bc]"></div>
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
    </section>;
};
export default Hero;