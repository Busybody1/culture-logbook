
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Star, Trash2, Pencil, ImageOff, MapPin } from 'lucide-react';

interface EntryCardProps {
  entry: any;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        {entry.image_url ? (
          <img 
            src={entry.image_url} 
            alt={entry.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageOff className="h-12 w-12 text-gray-400" />
          </div>
        )}
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
                className={`h-4 w-4 ${i < (entry.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{format(new Date(entry.date), 'MMMM d, yyyy')}</p>
        
        {entry.location && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-3 w-3 mr-1 text-[#FF9344]" />
            <span>{entry.location}</span>
            {entry.country && <span className="ml-1">({entry.country})</span>}
          </div>
        )}
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{entry.notes}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {entry.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEdit(entry.id)}
            className="text-[#FF9344] hover:text-[#FF9344]/90 hover:bg-orange-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
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
  );
};

export default EntryCard;
