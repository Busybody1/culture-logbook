
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, List, Grid3X3, Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_ENTRIES = [
  {
    id: '1',
    title: 'Dinner at La Piazza',
    type: 'restaurant',
    date: new Date('2023-05-15'),
    notes: 'Amazing Italian food with authentic flavors. The pasta was freshly made and the service was excellent.',
    rating: 5,
    tags: ['Italian', 'Fine Dining'],
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '2',
    title: 'Van Gogh Exhibition',
    type: 'museum',
    date: new Date('2023-06-02'),
    notes: 'Incredible collection of Van Gogh\'s work. The immersive experience was breathtaking and educational.',
    rating: 4,
    tags: ['Modern Art', 'Temporary Exhibit'],
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '3',
    title: 'Sushi Delight',
    type: 'restaurant',
    date: new Date('2023-06-20'),
    notes: 'Fresh sushi with interesting combinations. The ambiance was peaceful and the presentation was beautiful.',
    rating: 4,
    tags: ['Japanese', 'Street Food'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: '4',
    title: 'Natural History Museum',
    type: 'museum',
    date: new Date('2023-07-10'),
    notes: 'Fascinating dinosaur exhibits and interactive displays. Great for both kids and adults.',
    rating: 5,
    tags: ['Natural History', 'Family Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1574068624578-d6e7a8497f4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
];

const DiaryEntries = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [filteredEntries, setFilteredEntries] = useState(MOCK_ENTRIES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'restaurant' | 'museum'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    let filtered = [...entries];
    
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(entry => entry.type === selectedType);
    }
    
    if (selectedTag) {
      filtered = filtered.filter(entry => 
        entry.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    setFilteredEntries(filtered);
  }, [searchTerm, selectedType, selectedTag, entries]);

  const getAllTags = () => {
    const tagSet = new Set<string>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const handleShare = (entryId: string) => {
    toast({
      title: "Sharing options opened",
      description: "Choose a platform to share your entry.",
    });
  };

  const handleDelete = async (entryId: string) => {
    try {
      // Check if the entry is from mock data (string IDs like '1', '2', etc.)
      if (!entryId.includes('-')) {
        // For mock data, just filter it out locally
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
        
        toast({
          title: "Entry deleted",
          description: "Your diary entry has been deleted successfully.",
        });
        return;
      }

      // For real database entries (UUID format)
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
      
      toast({
        title: "Entry deleted",
        description: "Your diary entry has been deleted successfully.",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">My Diary Entries</h1>
          <Button 
            onClick={() => navigate('/new-entry')}
            className="bg-[#27AD95] hover:bg-[#27AD95]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={selectedType === 'all' ? 'default' : 'outline'}
                className={selectedType === 'all' ? 'bg-[#27AD95]' : ''}
                onClick={() => setSelectedType('all')}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={selectedType === 'restaurant' ? 'default' : 'outline'}
                className={selectedType === 'restaurant' ? 'bg-[#27AD95]' : ''}
                onClick={() => setSelectedType('restaurant')}
                size="sm"
              >
                Restaurants
              </Button>
              <Button 
                variant={selectedType === 'museum' ? 'default' : 'outline'}
                className={selectedType === 'museum' ? 'bg-[#27AD95]' : ''}
                onClick={() => setSelectedType('museum')}
                size="sm"
              >
                Museums
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                className={viewMode === 'grid' ? 'bg-gray-200' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className={viewMode === 'list' ? 'bg-gray-200' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {selectedTag && (
                <Badge 
                  className="bg-[#27AD95] hover:bg-[#27AD95]/80 cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  {selectedTag} ×
                </Badge>
              )}
              {!selectedTag && getAllTags().map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No entries found. Create your first entry!</p>
            <Button 
              onClick={() => navigate('/new-entry')}
              className="mt-4 bg-[#27AD95] hover:bg-[#27AD95]/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Entry
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map(entry => (
              <div key={entry.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={entry.imageUrl} 
                    alt={entry.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Badge variant={entry.type === 'restaurant' ? 'default' : 'secondary'}>
                      {entry.type === 'restaurant' ? 'Restaurant' : 'Museum'}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{entry.title}</h3>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < entry.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{format(entry.date, 'MMMM d, yyyy')}</p>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">{entry.notes}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map(entry => (
              <div key={entry.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48">
                    <img 
                      src={entry.imageUrl} 
                      alt={entry.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 mr-2">{entry.title}</h3>
                          <Badge variant={entry.type === 'restaurant' ? 'default' : 'secondary'}>
                            {entry.type === 'restaurant' ? 'Restaurant' : 'Museum'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{format(entry.date, 'MMMM d, yyyy')}</p>
                      </div>
                      <div className="flex items-center mb-2 md:mb-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < entry.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{entry.notes}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryEntries;
