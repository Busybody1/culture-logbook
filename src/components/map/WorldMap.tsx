
// src/components/map/WorldMap.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { countryToCode, codeToCountry } from './countryMappings';

// Use a known working TopoJSON file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Interfaces for diary entries and component props
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

const CustomWorldMap: React.FC<WorldMapProps> = ({ countries, entries }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [visitedCountryCodes, setVisitedCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    // Debug to see what countries are being received
    console.log("Countries received by WorldMap component:", countries);
    
    // Create a map of the codes
    const codes = countries
      .map(country => {
        const code = countryToCode[country];
        if (!code) {
          console.warn(`No ISO code found for country: ${country}`);
        } else {
          console.log(`Mapped country "${country}" to code "${code}"`);
        }
        return code;
      })
      .filter(Boolean) as string[];
    
    console.log("Countries from diary:", countries);
    console.log("Mapped to ISO codes:", codes);
    
    setVisitedCountryCodes(codes);
  }, [countries]);

  const handleCountryClick = (geo: any) => {
    // Get the ISO code from the geography properties
    const countryCode = geo.properties.ISO_A3;
    console.log("Clicked country ISO:", countryCode, "Name:", geo.properties.NAME);
    
    // Find the country name from our mapping
    const countryName = codeToCountry[countryCode];
    console.log("Country name from ISO code:", countryName);
    
    if (countryName && entries[countryName]) {
      setSelectedCountry(countryName);
    } else {
      console.log("No diary entries for this country.");
      // Try to find a close match using case-insensitive search
      const possibleMatch = Object.keys(entries).find(
        entryCountry => codeToCountry[countryCode]?.toLowerCase() === entryCountry.toLowerCase()
      );
      
      if (possibleMatch) {
        console.log(`Found possible match: ${possibleMatch}`);
        setSelectedCountry(possibleMatch);
      } else {
        setSelectedCountry(null);
      }
    }
  };

  return (
    <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden border">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 135,
          center: [0, 15]
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              console.log("Total geographies loaded:", geographies.length);
              
              // Debug the first few geographies to understand their structure
              if (geographies.length > 0) {
                const sampleGeo = geographies[0];
                console.log("Geography structure example:", {
                  id: sampleGeo.id,
                  rsmKey: sampleGeo.rsmKey,
                  properties: {
                    NAME: sampleGeo.properties.NAME,
                    ISO_A3: sampleGeo.properties.ISO_A3,
                    name: sampleGeo.properties.name
                  }
                });
              }
              
              // Debug: Check if any visitedCountryCodes match the map data
              const matchingGeos = geographies.filter(geo => {
                const geoCode = geo.properties.ISO_A3;
                if (visitedCountryCodes.includes(geoCode)) {
                  console.log(`Found matching country: ${geo.properties.NAME} (${geoCode})`);
                  return true;
                }
                return false;
              });
              
              console.log(`Found ${matchingGeos.length} matching countries on the map`);
              
              if (matchingGeos.length === 0 && visitedCountryCodes.length > 0) {
                // Log available country codes for debugging
                console.log("Available country codes on the map (first 10):", 
                  geographies.slice(0, 10).map(geo => ({
                    name: geo.properties.NAME,
                    code: geo.properties.ISO_A3
                  }))
                );
                console.log("Visited country codes (first 10):", visitedCountryCodes.slice(0, 10));
              }
              
              return geographies.map(geo => {
                // Get the ISO code from properties
                const countryCode = geo.properties.ISO_A3;
                const isVisited = visitedCountryCodes.includes(countryCode);
                
                // Debug colored countries
                if (isVisited) {
                  console.log(`Highlighting country: ${geo.properties.NAME} (${countryCode})`);
                }
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isVisited ? "#FF9344" : "#e2e8f0"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isVisited ? "#FF7F00" : "#d0d0d0",
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: isVisited ? "#FF7F00" : "#d0d0d0",
                        outline: "none"
                      }
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Selected Country Details */}
      {selectedCountry && entries[selectedCountry] && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4 max-w-[90%] mx-auto">
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
                <span className="text-sm font-medium text-gray-700">
                  +{entries[selectedCountry].length - 3} more
                </span>
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
  );
};

export default CustomWorldMap;
