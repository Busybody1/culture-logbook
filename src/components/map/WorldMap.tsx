
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import $ from 'jquery';
import 'jvectormap-next';
import 'jvectormap-next/jquery-jvectormap.css';

// We need to import the map data - we'll create this file next
import '@/lib/jquery-jvectormap-world-mill';

// Define interfaces for our component props and data
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

// Map of country names to ISO country codes (required for jVectorMap)
const countryToCode: Record<string, string> = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Angola': 'AO', 'Argentina': 'AR',
  'Armenia': 'AM', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS',
  'Bangladesh': 'BD', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ',
  'Bhutan': 'BT', 'Bolivia': 'BO', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR',
  'Brunei': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH',
  'Cameroon': 'CM', 'Canada': 'CA', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL',
  'China': 'CN', 'Colombia': 'CO', 'Congo': 'CG', 'Costa Rica': 'CR', 'Croatia': 'HR',
  'Cuba': 'CU', 'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Djibouti': 'DJ',
  'Dominican Republic': 'DO', 'DR Congo': 'CD', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV',
  'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE', 'Eswatini': 'SZ', 'Ethiopia': 'ET',
  'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR', 'French Guiana': 'GF', 'Gabon': 'GA',
  'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH', 'Greece': 'GR',
  'Greenland': 'GL', 'Guatemala': 'GT', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY',
  'Haiti': 'HT', 'Honduras': 'HN', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN',
  'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL',
  'Italy': 'IT', 'Ivory Coast': 'CI', 'Jamaica': 'JM', 'Japan': 'JP', 'Jordan': 'JO',
  'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kosovo': 'XK', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG',
  'Laos': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR',
  'Libya': 'LY', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Madagascar': 'MG', 'Malawi': 'MW',
  'Malaysia': 'MY', 'Mali': 'ML', 'Malta': 'MT', 'Mauritania': 'MR', 'Mexico': 'MX',
  'Moldova': 'MD', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Morocco': 'MA', 'Mozambique': 'MZ',
  'Myanmar': 'MM', 'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Zealand': 'NZ',
  'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'North Korea': 'KP', 'North Macedonia': 'MK',
  'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Palestine': 'PS', 'Panama': 'PA',
  'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL',
  'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Romania': 'RO', 'Russia': 'RU',
  'Rwanda': 'RW', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Sierra Leone': 'SL',
  'Slovakia': 'SK', 'Slovenia': 'SI', 'Somalia': 'SO', 'South Africa': 'ZA', 'South Korea': 'KR',
  'South Sudan': 'SS', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD', 'Suriname': 'SR',
  'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ',
  'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': '???', 'Togo': 'TG', 'Tunisia': 'TN',
  'Turkey': 'TR', 'Turkmenistan': 'TM', 'Uganda': 'UG', 'Ukraine': 'UA', 
  'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States': 'US', 'Uruguay': 'UY',
  'Uzbekistan': 'UZ', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Yemen': 'YE', 'Zambia': 'ZM',
  'Zimbabwe': 'ZW'
};

const WorldMap: React.FC<WorldMapProps> = ({ countries, entries }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Convert country names to ISO codes for jVectorMap
    const visitedCountryCodes = countries
      .map(country => countryToCode[country])
      .filter(Boolean);

    // Create color data object for visited countries
    const colorData = visitedCountryCodes.reduce((acc, code) => {
      acc[code] = '#FF9344';
      return acc;
    }, {} as Record<string, string>);

    // Initialize jVectorMap
    const $map = $(mapRef.current);
    
    // @ts-ignore - jVectorMap extends jQuery but TypeScript doesn't know about it
    $map.vectorMap({
      map: 'world_mill',
      backgroundColor: 'transparent',
      zoomOnScroll: true,
      regionStyle: {
        initial: {
          fill: '#e2e8f0',
          "fill-opacity": 1,
          stroke: 'none',
          "stroke-width": 0,
          "stroke-opacity": 1
        },
        hover: {
          "fill-opacity": 0.8,
          cursor: 'pointer'
        },
        selected: {
          fill: '#FF9344'
        },
        selectedHover: {}
      },
      series: {
        regions: [{
          values: colorData,
          attribute: 'fill'
        }]
      },
      onRegionClick: function(e: Event, code: string) {
        // Find the country name from the code
        const countryName = Object.keys(countryToCode).find(
          name => countryToCode[name] === code
        );
        
        if (countryName && entries[countryName]) {
          setSelectedCountry(countryName);
        }
      }
    });

    // Cleanup
    return () => {
      // @ts-ignore - jVectorMap extends jQuery but TypeScript doesn't know about it
      if ($map.vectorMap) {
        $map.vectorMap('get', 'mapObject').remove();
      }
    };
  }, [countries, entries]);

  return (
    <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden border">
      <div ref={mapRef} className="w-full h-full" />
      
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
  );
};

export default WorldMap;
