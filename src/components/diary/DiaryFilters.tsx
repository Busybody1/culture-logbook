
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, Grid, List, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';

interface DiaryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: 'all' | 'restaurant' | 'museum';
  setSelectedType: (type: 'all' | 'restaurant' | 'museum') => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  tags: string[];
  countries: string[];
}

const DiaryFilters: React.FC<DiaryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedTag,
  setSelectedTag,
  selectedCountry,
  setSelectedCountry,
  viewMode,
  setViewMode,
  tags,
  countries
}) => {
  const location = useLocation();
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);

  // Check if we have a country filter from the location state
  useEffect(() => {
    if (location.state?.filterCountry) {
      setSelectedCountry(location.state.filterCountry);
      // Clear the state so it doesn't persist on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSelectedCountry]);
  
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('all')}
          className={selectedType === 'all' ? 'bg-[#27AD95] hover:bg-[#27AD95]/90' : ''}
        >
          All Types
        </Button>
        <Button
          variant={selectedType === 'restaurant' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('restaurant')}
          className={selectedType === 'restaurant' ? 'bg-[#27AD95] hover:bg-[#27AD95]/90' : ''}
        >
          Restaurants
        </Button>
        <Button
          variant={selectedType === 'museum' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('museum')}
          className={selectedType === 'museum' ? 'bg-[#27AD95] hover:bg-[#27AD95]/90' : ''}
        >
          Museums
        </Button>
        
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowTagsDropdown(!showTagsDropdown);
              setShowCountriesDropdown(false);
            }}
            className={selectedTag ? 'bg-[#27AD95] text-white hover:bg-[#27AD95]/90' : ''}
          >
            {selectedTag ? `Tag: ${selectedTag}` : 'Filter by Tag'}
            {selectedTag && (
              <X 
                className="ml-1 h-3 w-3" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTag(null);
                }}
              />
            )}
          </Button>
          
          {showTagsDropdown && tags.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto z-10 bg-white rounded-md shadow-lg border">
              <div className="p-2">
                <div className="grid grid-cols-2 gap-1">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer justify-center"
                      onClick={() => {
                        setSelectedTag(tag);
                        setShowTagsDropdown(false);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowCountriesDropdown(!showCountriesDropdown);
              setShowTagsDropdown(false);
            }}
            className={selectedCountry ? 'bg-[#FF9344] text-white hover:bg-[#FF9344]/90' : ''}
          >
            {selectedCountry ? `Country: ${selectedCountry}` : 'Filter by Country'}
            {selectedCountry && (
              <X 
                className="ml-1 h-3 w-3" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCountry(null);
                }}
              />
            )}
          </Button>
          
          {showCountriesDropdown && countries.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto z-10 bg-white rounded-md shadow-lg border">
              <div className="p-2">
                <div className="grid grid-cols-2 gap-1">
                  {countries.map(country => (
                    <Badge
                      key={country}
                      variant="outline"
                      className="cursor-pointer justify-center"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountriesDropdown(false);
                      }}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryFilters;
