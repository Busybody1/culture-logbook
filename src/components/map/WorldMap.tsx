
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

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

  // This is a simplified version - in a real implementation, you would need 
  // to map country names to country codes and use an actual map SVG with proper country codes
  
  return (
    <div className="relative w-full h-[60vh] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <p className="text-lg font-medium mb-2">World Map Visualization</p>
          <p>You've visited {countries.length} {countries.length === 1 ? 'country' : 'countries'}!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {countries.map(country => (
              <div 
                key={country}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors
                  ${selectedCountry === country ? 
                    'bg-[#FF9344] text-white' : 
                    'bg-white border hover:bg-[#FF9344]/10'}`}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => {
                  if (selectedCountry === country) {
                    setSelectedCountry(null);
                  } else {
                    setSelectedCountry(country);
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{country}</span>
                  <span className="ml-1 text-xs">({entries[country].length})</span>
                </div>
              </div>
            ))}
          </div>
          
          {selectedCountry && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2">{selectedCountry}</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {entries[selectedCountry].slice(0, 3).map(entry => (
                  <div 
                    key={entry.id} 
                    className="aspect-square rounded-md overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/edit-entry/${entry.id}`)}
                  >
                    {entry.image_url ? (
                      <img 
                        src={entry.image_url} 
                        alt={entry.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {entries[selectedCountry].length > 3 && (
                <button 
                  className="text-sm text-[#27AD95] hover:underline"
                  onClick={() => navigate('/diary', { state: { filterCountry: selectedCountry } })}
                >
                  See all {entries[selectedCountry].length} entries from {selectedCountry}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
