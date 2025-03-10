
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { List, Grid3X3, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DiaryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: 'all' | 'restaurant' | 'museum';
  setSelectedType: (type: 'all' | 'restaurant' | 'museum') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  tags: string[];
}

const DiaryFilters: React.FC<DiaryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  viewMode,
  setViewMode,
  selectedTag,
  setSelectedTag,
  tags
}) => {
  return (
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
          {!selectedTag && tags.map(tag => (
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
  );
};

export default DiaryFilters;
