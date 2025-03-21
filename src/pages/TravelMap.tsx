
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import WorldMap from '@/components/map/WorldMap';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapIcon } from 'lucide-react';
import { fixLeafletIcon } from '@/lib/fixLeafletIcon';
import { countryToCode, codeToCountry } from '@/components/map/countryMappings';

// Fix Leaflet icon issues
fixLeafletIcon();

interface Entry {
  id: string;
  title: string;
  image_url: string | null;
  location: string | null;
  country: string | null;
  date: string;
}

const TravelMap = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupedEntries, setGroupedEntries] = useState<Record<string, Entry[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [countriesInDb, setCountriesInDb] = useState<string[]>([]);
  
  // Function to normalize country names to match mapping
  const normalizeCountryName = (countryName: string | null): string | null => {
    if (!countryName) return null;
    
    // Convert to title case for consistent formatting
    const formattedName = countryName.trim();
    
    // Check if the country name exists directly in our mapping
    if (countryToCode[formattedName]) {
      return formattedName;
    }
    
    // Handle specific cases
    const normalizations: Record<string, string> = {
      'UK': 'United Kingdom',
      'U.K.': 'United Kingdom',
      'Great Britain': 'United Kingdom',
      'England': 'United Kingdom',
      'Britain': 'United Kingdom',
      'USA': 'United States',
      'U.S.A.': 'United States',
      'U.S.': 'United States',
      'United States of America': 'United States',
      'America': 'United States',
      'UAE': 'United Arab Emirates',
      'U.A.E.': 'United Arab Emirates',
      'Thai': 'Thailand',
      'Italia': 'Italy'
    };
    
    // Try case-insensitive lookup
    for (const [key, code] of Object.entries(countryToCode)) {
      if (key.toLowerCase() === formattedName.toLowerCase()) {
        console.log(`Normalized country name: "${formattedName}" to "${key}"`);
        return key;
      }
    }
    
    const normalized = normalizations[formattedName] || formattedName;
    console.log(`Country normalization: "${formattedName}" -> "${normalized}"`);
    return normalized;
  };
  
  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Fetching entries for user:", user.id);
        
        // First, let's log all unique countries in the database for this user
        const { data: countriesData, error: countriesError } = await supabase
          .from('diary_entries')
          .select('country')
          .eq('user_id', user.id)
          .not('country', 'is', null);
          
        if (countriesError) {
          console.error('Error fetching countries:', countriesError);
          throw countriesError;
        }
        
        const uniqueCountries = [...new Set(countriesData.map(entry => entry.country).filter(Boolean))];
        console.log("RAW COUNTRIES IN DATABASE:", uniqueCountries);
        setCountriesInDb(uniqueCountries);
        
        // Log which countries have mappings
        uniqueCountries.forEach(country => {
          if (country && countryToCode[country]) {
            console.log(`Country "${country}" has mapping: ${countryToCode[country]}`);
          } else if (country) {
            console.log(`Country "${country}" has NO MAPPING in countryToCode`);
            
            // Try case-insensitive search
            const matchKey = Object.keys(countryToCode).find(
              key => key.toLowerCase() === country.toLowerCase()
            );
            
            if (matchKey) {
              console.log(`...but found case-insensitive match: "${matchKey}" -> ${countryToCode[matchKey]}`);
            }
          }
        });
        
        // Now fetch the actual entries
        const { data, error } = await supabase
          .from('diary_entries')
          .select('id, title, image_url, location, country, date')
          .eq('user_id', user.id)
          .not('country', 'is', null)
          .order('date', { ascending: false });
        
        if (error) {
          console.error('Error fetching entries:', error);
          setError(`Failed to fetch entries: ${error.message}`);
          throw error;
        }
        
        console.log("Fetched entries:", data?.length || 0, "entries");
        
        // Normalize country names in data
        const normalizedData = data?.map(entry => {
          const normalizedCountry = normalizeCountryName(entry.country);
          if (entry.country && normalizedCountry !== entry.country) {
            console.log(`Normalized: "${entry.country}" -> "${normalizedCountry}"`);
          }
          return {
            ...entry,
            country: normalizedCountry
          };
        }) || [];
        
        // Log countries after normalization
        console.log("Countries after normalization:", normalizedData.map(entry => entry.country).filter(Boolean));
        
        setEntries(normalizedData);
        
        // Group entries by country
        const grouped = (normalizedData).reduce((acc, entry) => {
          if (entry.country) {
            if (!acc[entry.country]) {
              acc[entry.country] = [];
            }
            acc[entry.country].push(entry);
          }
          return acc;
        }, {} as Record<string, Entry[]>);
        
        console.log("Countries with entries:", Object.keys(grouped));
        
        // Verify countries against known mappings
        Object.keys(grouped).forEach(country => {
          if (!countryToCode[country]) {
            console.warn(`Warning: No ISO code mapping found for country "${country}"`);
          } else {
            console.log(`Country "${country}" maps to code "${countryToCode[country]}"`);
          }
        });
        
        setGroupedEntries(grouped);
      } catch (error: any) {
        console.error('Error fetching entries:', error);
        setError(error.message || 'Failed to load entries');
        toast({
          title: "Error loading travel data",
          description: "We couldn't load your travel data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  // Debug current state
  useEffect(() => {
    console.log("TravelMap component state:");
    console.log("- Number of entries:", entries.length);
    console.log("- Countries from entries:", Object.keys(groupedEntries));
    console.log("- Countries in database:", countriesInDb);
    console.log("- Data being passed to WorldMap:", {
      countries: Object.keys(groupedEntries),
      entries: groupedEntries
    });
  }, [entries, groupedEntries, countriesInDb]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <MapIcon className="h-6 w-6 text-[#FF9344]" />
            <h1 className="text-2xl font-bold text-gray-900">My Travels</h1>
          </div>
          <Button
            onClick={() => navigate('/diary')}
            variant="outline"
          >
            Back to Diary
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium">Error loading map data</h3>
            <p className="text-sm">{error}</p>
            <Button 
              variant="outline" 
              className="mt-2 text-xs"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[60vh] bg-gray-200 rounded-lg"></div>
          </div>
        ) : user ? (
          entries.length > 0 ? (
            <div className="space-y-8">
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <WorldMap 
                    countries={Object.keys(groupedEntries)} 
                    entries={groupedEntries} 
                  />
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="h-5 w-1 bg-[#FF9344] rounded-full"></span>
                  Countries You've Visited
                </h2>
                
                {/* Removed the debugging section that was showing countries in the database */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(groupedEntries).map(([country, countryEntries]) => (
                    <Card key={country} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{country}</CardTitle>
                        <CardDescription>{countryEntries.length} {countryEntries.length === 1 ? 'entry' : 'entries'}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          {countryEntries.slice(0, 3).map(entry => (
                            <div 
                              key={entry.id} 
                              className="aspect-square rounded-md overflow-hidden cursor-pointer group relative"
                              onClick={() => navigate(`/edit-entry/${entry.id}`)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                              
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
                              
                              <div className="absolute bottom-1 left-1 right-1 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 truncate">
                                {entry.title}
                              </div>
                            </div>
                          ))}
                          {countryEntries.length > 3 && (
                            <div 
                              className="aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() => {
                                // Filter diary entries by this country
                                navigate('/diary', { state: { filterCountry: country } });
                              }}
                            >
                              <span className="text-sm font-medium text-gray-600">+{countryEntries.length - 3} more</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No travel data yet</h2>
              <p className="text-gray-600 mb-6">Add location information to your diary entries to see them on the map.</p>
              <Button
                onClick={() => navigate('/new-entry')}
                className="bg-[#27AD95] hover:bg-[#27AD95]/90"
              >
                Create Entry
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign in to view your travels</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to access your travel map.</p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-[#27AD95] hover:bg-[#27AD95]/90"
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelMap;
