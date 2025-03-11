
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import WorldMap from '@/components/map/WorldMap';
import { toast } from '@/hooks/use-toast';

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
  
  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('diary_entries')
          .select('id, title, image_url, location, country, date')
          .eq('user_id', user.id)
          .not('country', 'is', null)
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        setEntries(data || []);
        
        // Group entries by country
        const grouped = (data || []).reduce((acc, entry) => {
          if (entry.country) {
            if (!acc[entry.country]) {
              acc[entry.country] = [];
            }
            acc[entry.country].push(entry);
          }
          return acc;
        }, {} as Record<string, Entry[]>);
        
        setGroupedEntries(grouped);
      } catch (error) {
        console.error('Error fetching entries:', error);
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Travels</h1>
          <Button
            onClick={() => navigate('/diary')}
            variant="outline"
          >
            Back to Diary
          </Button>
        </div>

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[60vh] bg-gray-200 rounded-lg"></div>
          </div>
        ) : user ? (
          entries.length > 0 ? (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <WorldMap 
                  countries={Object.keys(groupedEntries)} 
                  entries={groupedEntries} 
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Countries Visited</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(groupedEntries).map(([country, countryEntries]) => (
                    <div key={country} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      <div className="p-4 border-b">
                        <h3 className="text-lg font-medium">{country}</h3>
                        <p className="text-sm text-gray-500">{countryEntries.length} {countryEntries.length === 1 ? 'entry' : 'entries'}</p>
                      </div>
                      <div className="p-4 grid grid-cols-3 gap-2">
                        {countryEntries.slice(0, 3).map(entry => (
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
                        {countryEntries.length > 3 && (
                          <div 
                            className="aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              // Filter diary entries by this country
                              navigate('/diary', { state: { filterCountry: country } });
                            }}
                          >
                            <span className="text-sm font-medium text-gray-500">+{countryEntries.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
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
