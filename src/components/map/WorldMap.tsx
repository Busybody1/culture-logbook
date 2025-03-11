
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Entry {
  id: string;
  title: string;
  image_url: string | null;
  location: string | null;
  country: string | null;
  date: string;
}

interface WorldMapProps {
  countries: string[];
  entries: Record<string, Entry[]>;
}

const WorldMap: React.FC<WorldMapProps> = ({ countries, entries }) => {
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Load and display the world map image
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;
  }, []);

  return (
    <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden border">
      {/* World Map Background */}
      <div ref={mapContainerRef} className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/e4df6ac5-3e36-4954-904c-59a7f252bb35.png" 
          alt="World Map" 
          className="w-full h-full object-contain"
        />
        
        {/* Overlay for country highlights and pins */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This is where we would add country highlights based on geolocation data */}
          {/* Since we don't have exact coordinates, we'll use the simplified UI approach below */}
        </div>
      </div>
      
      {/* Country Selection UI */}
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm max-w-[90%] mx-auto">
          <h3 className="text-lg font-medium mb-3 text-gray-900">Your Travel Map</h3>
          <p className="text-sm text-gray-600 mb-3">
            You've visited {countries.length} {countries.length === 1 ? 'country' : 'countries'}!
          </p>
          
          <div className="flex flex-wrap gap-2 mb-2 max-h-[15vh] overflow-y-auto p-1">
            {countries.map(country => (
              <Badge
                key={country}
                className={`cursor-pointer py-1 px-2 flex items-center gap-1 ${
                  selectedCountry === country 
                    ? 'bg-[#FF9344] hover:bg-[#FF9344]/90' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => {
                  if (selectedCountry === country) {
                    setSelectedCountry(null);
                  } else {
                    setSelectedCountry(country);
                  }
                }}
              >
                <MapPin className="h-3 w-3" />
                <span>{country}</span>
                <span className="text-xs">({entries[country].length})</span>
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Selected Country Details */}
        {selectedCountry && (
          <div className="mt-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4 max-w-[90%] mx-auto">
            <h3 className="text-lg font-medium mb-2">{selectedCountry}</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {entries[selectedCountry].slice(0, 3).map(entry => (
                <div 
                  key={entry.id} 
                  className="relative aspect-square rounded-md overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/edit-entry/${entry.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {entry.image_url ? (
                    <img 
                      src={entry.image_url} 
                      alt={entry.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-1 left-1 right-1 text-white text-xs z-20 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {entry.title}
                  </div>
                </div>
              ))}
              
              {entries[selectedCountry].length > 3 && (
                <div 
                  className="aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => navigate('/diary', { state: { filterCountry: selectedCountry } })}
                >
                  <span className="text-sm font-medium text-gray-700">+{entries[selectedCountry].length - 3} more</span>
                </div>
              )}
            </div>
            
            <button 
              className="text-sm text-[#27AD95] hover:underline w-full text-center"
              onClick={() => navigate('/diary', { state: { filterCountry: selectedCountry } })}
            >
              See all {entries[selectedCountry].length} entries from {selectedCountry}
            </button>
          </div>
        )}
      </div>
      
      {/* Map Pins for Countries - Simplified Version */}
      <div className="absolute inset-0 pointer-events-none">
        {countries.map((country, index) => {
          // This is a simplified approach without real coordinates
          // In a real implementation, you would use actual geolocation data
          const entry = entries[country][0]; // Get first entry for this country
          
          // Generate "random" but consistent positions based on country name
          const hash = country.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const posX = 10 + (hash % 80); // 10-90% width
          const posY = 15 + ((hash * 7) % 70); // 15-85% height
          
          return (
            <div 
              key={country}
              className={`absolute pointer-events-auto cursor-pointer ${selectedCountry === country ? 'z-50' : 'z-10'}`}
              style={{ 
                left: `${posX}%`, 
                top: `${posY}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}
            >
              <div className={`relative ${selectedCountry === country ? 'scale-125' : 'scale-100'} transition-transform`}>
                {/* Pin */}
                <div className="w-6 h-6 bg-[#FF9344] rounded-full flex items-center justify-center shadow-md">
                  {entry.image_url ? (
                    <img 
                      src={entry.image_url} 
                      alt={country}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <MapPin className="h-4 w-4 text-white" />
                  )}
                </div>
                
                {/* Pin Stem */}
                <div 
                  className="absolute left-1/2 top-full h-3 w-1 bg-[#FF9344] -translate-x-1/2 shadow-sm" 
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
                />
                
                {/* Country name on hover */}
                {(hoveredCountry === country || selectedCountry === country) && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs whitespace-nowrap">
                    {country} ({entries[country].length})
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldMap;
