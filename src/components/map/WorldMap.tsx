
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

// Map ISO3 codes to country ids from the topo JSON
// This mapping is needed because the TopoJSON uses numeric IDs that don't match ISO codes
const ISO_TO_ID_MAP: Record<string, string> = {
  "GBR": "826", // United Kingdom
  "THA": "764", // Thailand
  "ITA": "380", // Italy
  "TUR": "792", // Turkey
  "JPN": "392", // Japan
  // Add more mappings as needed
};

const CustomWorldMap: React.FC<WorldMapProps> = ({ countries, entries }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [visitedCountryCodes, setVisitedCountryCodes] = useState<string[]>([]);
  const [visitedCountryIds, setVisitedCountryIds] = useState<string[]>([]);

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
    
    // Map ISO codes to IDs that match the TopoJSON
    const ids = codes
      .map(code => {
        const id = ISO_TO_ID_MAP[code];
        if (id) {
          console.log(`Mapped ISO code "${code}" to ID "${id}"`);
        } else {
          console.warn(`No ID mapping found for ISO code: ${code}`);
        }
        return id;
      })
      .filter(Boolean);
    
    console.log("Mapped to country IDs in TopoJSON:", ids);
    setVisitedCountryIds(ids);
  }, [countries]);

  const handleCountryClick = (geo: any) => {
    // Get the country ID from the geography
    console.log("Clicked country ID:", geo.id, "All properties:", geo.properties);
    
    // Try to find the ISO code for this country
    const countryId = geo.id;
    let isoCode = null;
    
    // Reverse lookup: Find ISO code from country ID
    for (const [iso, id] of Object.entries(ISO_TO_ID_MAP)) {
      if (id === countryId) {
        isoCode = iso;
        break;
      }
    }
    
    console.log("Country ID:", countryId, "ISO Code (if found):", isoCode);
    
    if (isoCode) {
      const countryName = codeToCountry[isoCode];
      console.log("Country name from ISO code:", countryName);
      
      if (countryName && entries[countryName]) {
        setSelectedCountry(countryName);
      } else {
        console.log("No diary entries for this country.");
      }
    } else {
      console.log("Could not determine ISO code for clicked country.");
      setSelectedCountry(null);
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
              
              // Log a sample geography to understand its structure
              if (geographies.length > 0) {
                const sampleGeo = geographies[0];
                console.log("Sample geography:", {
                  id: sampleGeo.id,
                  properties: sampleGeo.properties,
                  type: sampleGeo.type
                });
              }
              
              // Log all country IDs we're looking for
              console.log("Visited country IDs to highlight:", visitedCountryIds);
              
              // Debug matching - check each visited ID against each geography
              if (visitedCountryIds.length > 0) {
                console.log("Checking for matches between visited IDs and map data...");
                visitedCountryIds.forEach(id => {
                  const matchingGeo = geographies.find(geo => geo.id === id);
                  if (matchingGeo) {
                    console.log(`✓ Found match for ID ${id} (${matchingGeo.properties.name})`);
                  } else {
                    console.log(`✗ No match found for ID ${id}`);
                  }
                });
              }
              
              return geographies.map(geo => {
                // Check if this is a visited country by ID
                const isVisited = visitedCountryIds.includes(geo.id);
                
                // Debug colored countries
                if (isVisited) {
                  console.log(`Highlighting country: ${geo.properties.name} (ID: ${geo.id})`);
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
