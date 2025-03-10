import React from 'react';
import { Button } from './ui/button';
import { Utensils, MessageSquare, Layout, Book, Share2, Palette } from 'lucide-react';
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
              <h3 className="text-xl font-bold mb-3">Share Your Journey</h3>
              <p className="text-gray-600 mb-6">Turn your favorite food and travel memories into shareable stories. With one click, post your adventures on social media!</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white">Log Your Memories</Button>
              
            </div>
          </div>
        </div>

        {/* Key features section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-3 h-3 rounded-full bg-[#ce19bc]"></div>
            <span className="font-medium text-gray-700">KEY FEATURES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-xl" style={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 -3px 0 rgba(0, 0, 0, 0.1)'
          }}>
              <div className="text-accent mb-4 flex justify-center">
                <div className="p-3 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Book className="w-8 h-8 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Personal Food Diary</h3>
              <p className="text-slate-950">Save your favorite meals and cultural experiences in one place, so you never forget them.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-xl" style={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 -3px 0 rgba(0, 0, 0, 0.1)'
          }}>
              <div className="text-accent mb-4 flex justify-center">
                <div className="p-3 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Share2 className="w-8 h-8 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Social Media Sharing</h3>
              <p className="text-slate-950">Turn your experiences into posts and share them on Instagram, Facebook, or TikTok with one click.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-xl" style={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 -3px 0 rgba(0, 0, 0, 0.1)'
          }}>
              <div className="text-accent mb-4 flex justify-center">
                <div className="p-3 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Palette className="w-8 h-8 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text"> Customizable Entries</h3>
              <p className="text-text/80">
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
              <div className="text-2xl font-bold">300+</div>
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