
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Star, StarOff, Image, X, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MAX_IMAGES = 10;

interface EntryFormProps {
  title: string;
  setTitle: (title: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  notes: string;
  setNotes: (notes: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
  isRestaurant: boolean;
  setIsRestaurant: (isRestaurant: boolean) => void;
  generateAICaption: () => Promise<void>;
  isGeneratingCaption: boolean;
  generatedCaption: string | null;
  handleSaveEntry: () => Promise<void>;
  navigate: (path: string) => void;
}

const PREDEFINED_TAGS = [
  'Italian', 'Street Food', 'Fine Dining', 'Modern Art', 'History Museum', 
  'Science Museum', 'Japanese', 'Mexican', 'Brunch', 'Cocktails', 'Family Friendly',
  'Contemporary Art', 'Natural History', 'Temporary Exhibit'
];

const EntryForm: React.FC<EntryFormProps> = ({
  title, setTitle,
  date, setDate,
  notes, setNotes,
  rating, setRating,
  selectedTags, setSelectedTags,
  imageFiles, setImageFiles,
  imagePreviews, setImagePreviews,
  isRestaurant, setIsRestaurant,
  generateAICaption,
  isGeneratingCaption,
  generatedCaption,
  handleSaveEntry,
  navigate
}) => {
  const { toast } = useToast();
  const [customTag, setCustomTag] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (imageFiles.length + files.length > MAX_IMAGES) {
      toast({
        title: "Too many images",
        description: `You can only upload a maximum of ${MAX_IMAGES} images`,
        variant: "destructive",
      });
      return;
    }
    
    const newFiles = Array.from(files);
    setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customTag.trim()) {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          id="title"
          placeholder={isRestaurant ? "e.g. Dinner at La Piazza" : "e.g. Van Gogh Exhibit at City Museum"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes/Experience
        </label>
        <Textarea
          id="notes"
          placeholder={isRestaurant ? "Describe your dining experience..." : "Share your thoughts about the exhibition..."}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl focus:outline-none"
            >
              {star <= rating ? (
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-6 w-6 text-gray-300" />
              )}
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'No rating'}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="outline" className="px-3 py-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add custom tag..."
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button 
            type="button" 
            onClick={handleAddCustomTag}
            variant="outline"
            size="sm"
            disabled={!customTag.trim()}
          >
            Add
          </Button>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_TAGS.filter(tag => 
              (isRestaurant && ['Italian', 'Street Food', 'Fine Dining', 'Japanese', 'Mexican', 'Brunch', 'Cocktails', 'Family Friendly'].includes(tag)) ||
              (!isRestaurant && ['Modern Art', 'History Museum', 'Science Museum', 'Contemporary Art', 'Natural History', 'Temporary Exhibit', 'Family Friendly'].includes(tag))
            ).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Images ({imagePreviews.length}/{MAX_IMAGES})
          </label>
          <span className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB each
          </span>
        </div>
        
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {imagePreviews.length < MAX_IMAGES && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 aspect-square cursor-pointer hover:bg-gray-50 transition-colors">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        )}
        
        {imagePreviews.length === 0 && (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#27AD95] hover:text-[#27AD95]/80 focus-within:outline-none"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => navigate('/diary')}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSaveEntry}
          className="bg-[#27AD95] hover:bg-[#27AD95]/90"
        >
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default EntryForm;
