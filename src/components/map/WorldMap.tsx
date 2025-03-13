// src/components/map/WorldMap.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

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

// Define the country-to-ISO mapping here
// (Make sure your diary entries' country names exactly match these keys)
const countryToCode: Record<string, string> = {
  'Afghanistan': 'AFG', 'Albania': 'ALB', 'Algeria': 'DZA', 'Angola': 'AGO', 'Argentina': 'ARG',
  'Armenia': 'ARM', 'Australia': 'AUS', 'Austria': 'AUT', 'Azerbaijan': 'AZE', 'Bahamas': 'BHS',
  'Bangladesh': 'BGD', 'Belarus': 'BLR', 'Belgium': 'BEL', 'Belize': 'BLZ', 'Benin': 'BEN',
  'Bhutan': 'BTN', 'Bolivia': 'BOL', 'Bosnia and Herzegovina': 'BIH', 'Botswana': 'BWA', 'Brazil': 'BRA',
  'Brunei': 'BRN', 'Bulgaria': 'BGR', 'Burkina Faso': 'BFA', 'Burundi': 'BDI', 'Cambodia': 'KHM',
  'Cameroon': 'CMR', 'Canada': 'CAN', 'Central African Republic': 'CAF', 'Chad': 'TCD', 'Chile': 'CHL',
  'China': 'CHN', 'Colombia': 'COL', 'Congo': 'COG', 'Costa Rica': 'CRI', 'Croatia': 'HRV',
  'Cuba': 'CUB', 'Cyprus': 'CYP', 'Czech Republic': 'CZE', 'Denmark': 'DNK', 'Djibouti': 'DJI',
  'Dominican Republic': 'DOM', 'DR Congo': 'COD', 'Ecuador': 'ECU', 'Egypt': 'EGY', 'El Salvador': 'SLV',
  'Equatorial Guinea': 'GNQ', 'Eritrea': 'ERI', 'Estonia': 'EST', 'Eswatini': 'SWZ', 'Ethiopia': 'ETH',
  'Fiji': 'FJI', 'Finland': 'FIN', 'France': 'FRA', 'French Guiana': 'GUF', 'Gabon': 'GAB',
  'Gambia': 'GMB', 'Georgia': 'GEO', 'Germany': 'DEU', 'Ghana': 'GHA', 'Greece': 'GRC',
  'Greenland': 'GRL', 'Guatemala': 'GTM', 'Guinea': 'GIN', 'Guinea-Bissau': 'GNB', 'Guyana': 'GUY',
  'Haiti': 'HTI', 'Honduras': 'HND', 'Hungary': 'HUN', 'Iceland': 'ISL', 'India': 'IND',
  'Indonesia': 'IDN', 'Iran': 'IRN', 'Iraq': 'IRQ', 'Ireland': 'IRL', 'Israel': 'ISR',
  'Italy': 'ITA', 'Ivory Coast': 'CIV', 'Jamaica': 'JAM', 'Japan': 'JPN', 'Jordan': 'JOR',
  'Kazakhstan': 'KAZ', 'Kenya': 'KEN', 'Kosovo': 'UNK', 'Kuwait': 'KWT', 'Kyrgyzstan': 'KGZ',
  'Laos': 'LAO', 'Latvia': 'LVA', 'Lebanon': 'LBN', 'Lesotho': 'LSO', 'Liberia': 'LBR',
  'Libya': 'LBY', 'Lithuania': 'LTU', 'Luxembourg': 'LUX', 'Madagascar': 'MDG', 'Malawi': 'MWI',
  'Malaysia': 'MYS', 'Mali': 'MLI', 'Malta': 'MLT', 'Mauritania': 'MRT', 'Mexico': 'MEX',
  'Moldova': 'MDA', 'Mongolia': 'MNG', 'Montenegro': 'MNE', 'Morocco': 'MAR', 'Mozambique': 'MOZ',
  'Myanmar': 'MMR', 'Namibia': 'NAM', 'Nepal': 'NPL', 'Netherlands': 'NLD', 'New Zealand': 'NZL',
  'Nicaragua': 'NIC', 'Niger': 'NER', 'Nigeria': 'NGA', 'North Korea': 'PRK', 'North Macedonia': 'MKD',
  'Norway': 'NOR', 'Oman': 'OMN', 'Pakistan': 'PAK', 'Palestine': 'PSE', 'Panama': 'PAN',
  'Papua New Guinea': 'PNG', 'Paraguay': 'PRY', 'Peru': 'PER', 'Philippines': 'PHL', 'Poland': 'POL',
  'Portugal': 'PRT', 'Puerto Rico': 'PRI', 'Qatar': 'QAT', 'Romania': 'ROU', 'Russia': 'RUS',
  'Rwanda': 'RWA', 'Saudi Arabia': 'SAU', 'Senegal': 'SEN', 'Serbia': 'SRB', 'Sierra Leone': 'SLE',
  'Slovakia': 'SVK', 'Slovenia': 'SVN', 'Somalia': 'SOM', 'South Africa': 'ZAF', 'South Korea': 'KOR',
  'South Sudan': 'SSD', 'Spain': 'ESP', 'Sri Lanka': 'LKA', 'Sudan': 'SDN', 'Suriname': 'SUR',
  'Sweden': 'SWE', 'Switzerland': 'CHE', 'Syria': 'SYR', 'Taiwan': 'TWN', 'Tajikistan': 'TJK',
  'Tanzania': 'TZA', 'Thailand': 'THA', 'Timor-Leste': 'TLS', 'Togo': 'TGO', 'Tunisia': 'TUN',
  'Turkey': 'TUR', 'Turkmenistan': 'TKM', 'Uganda': 'UGA', 'Ukraine': 'UKR', 
  'United Arab Emirates': 'ARE', 'United Kingdom': 'GBR', 'United States of America': 'USA', 'United States': 'USA', 'Uruguay': 'URY',
  'Uzbekistan': 'UZB', 'Venezuela': 'VEN', 'Vietnam': 'VNM', 'Yemen': 'YEM', 'Zambia': 'ZMB',
  'Zimbabwe': 'ZWE'
};

const CustomWorldMap: React.FC<WorldMapProps> = ({ countries, entries }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [visitedCountryCodes, setVisitedCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    // Convert country names from props into 3-letter ISO codes using our dictionary
    const codes = countries
      .map(country => countryToCode[country])
      .filter(Boolean);
    
    console.log("Countries from diary:", countries);
    console.log("Mapped to ISO codes:", codes);
    
    setVisitedCountryCodes(codes);
  }, [countries]);

  const handleCountryClick = (geo: any) => {
    const countryCode = geo.properties.ISO_A3;
    // Find the matching country name from our mapping
    const countryName = Object.keys(countryToCode).find(
      country => countryToCode[country] === countryCode
    );
    
    console.log("Clicked country ISO:", countryCode, "mapped to:", countryName);
    
    if (countryName && entries[countryName]) {
      setSelectedCountry(countryName);
    } else {
      console.log("No diary entries for this country.");
    }
  };

  return (
    <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden border">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 135,       // Lower scale zooms out so the entire world is visible
          center: [0, 15]  // Adjust center if needed
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              console.log("Total geographies loaded:", geographies.length);
              return geographies.map(geo => {
                const countryCode = geo.properties.ISO_A3;
                const isVisited = visitedCountryCodes.includes(countryCode);
                
                if (isVisited) {
                  console.log("Visited country rendered:", countryCode, geo.properties.NAME);
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
