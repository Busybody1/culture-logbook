
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Star, StarOff, Image, X, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const PREDEFINED_TAGS = [
  'Italian', 'Street Food', 'Fine Dining', 'Modern Art', 'History Museum', 
  'Science Museum', 'Japanese', 'Mexican', 'Brunch', 'Cocktails', 'Family Friendly',
  'Contemporary Art', 'Natural History', 'Temporary Exhibit'
];

const NewEntry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
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

  const generateAICaption = async () => {
    setIsGeneratingCaption(true);
    
    try {
      // Simulate AI caption generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tagText = selectedTags.length > 0 ? selectedTags.join(', ') : isRestaurant ? 'restaurant' : 'museum';
      const type = isRestaurant ? 'restaurant' : 'museum';
      const ratingText = rating > 0 ? `${rating} stars` : 'unrated';
      
      let caption = '';
      if (isRestaurant) {
        caption = `Just had an amazing ${ratingText} experience at ${title}! ${
          notes.length > 30 ? notes.substring(0, 30) + '...' : notes
        } #CultureVulture #FoodLover ${selectedTags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}`;
      } else {
        caption = `Exploring the fascinating ${title} today - ${ratingText} experience! ${
          notes.length > 30 ? notes.substring(0, 30) + '...' : notes
        } #CultureVulture #ArtLover ${selectedTags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}`;
      }
      
      setGeneratedCaption(caption);
    } catch (error) {
      toast({
        title: "Failed to generate caption",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleSaveEntry = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your entry",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving to database
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Entry saved successfully!",
        description: "Your diary entry has been saved.",
      });
      
      // Generate caption for sharing
      if (!generatedCaption) {
        await generateAICaption();
      }
      
      // Redirect to diary entries page after successful save
      setTimeout(() => {
        navigate('/diary');
      }, 1500);
    } catch (error) {
      toast({
        title: "Failed to save entry",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const shareToSocial = (platform: string) => {
    if (!generatedCaption) {
      generateAICaption();
      return;
    }
    
    toast({
      title: `Shared to ${platform}!`,
      description: "Your entry has been shared.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Diary Entry</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              className={cn(
                "transition-colors",
                isRestaurant ? "bg-[#27AD95] text-white" : "bg-white text-gray-700"
              )}
              onClick={() => setIsRestaurant(true)}
            >
              Restaurant
            </Button>
            <Button 
              variant="outline"
              className={cn(
                "transition-colors",
                !isRestaurant ? "bg-[#27AD95] text-white" : "bg-white text-gray-700"
              )}
              onClick={() => setIsRestaurant(false)}
            >
              Museum
            </Button>
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
          {/* Title Input */}
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

          {/* Date Picker */}
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

          {/* Notes */}
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

          {/* Rating */}
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

          {/* Tags */}
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#27AD95] hover:text-[#27AD95]/80 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
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

        {/* Social Sharing Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Share Your Experience</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={generateAICaption}
              disabled={isGeneratingCaption}
            >
              {isGeneratingCaption ? "Generating..." : "Generate Caption"}
            </Button>
          </div>
          
          {generatedCaption && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <Textarea
                value={generatedCaption}
                onChange={(e) => setGeneratedCaption(e.target.value)}
                rows={3}
                className="w-full mb-2"
              />
            </div>
          )}
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
              onClick={() => shareToSocial('Facebook')}
            >
              <Share className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-[#E1306C] text-white hover:bg-[#E1306C]/90"
              onClick={() => shareToSocial('Instagram')}
            >
              <Share className="mr-2 h-4 w-4" />
              Instagram
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-[#000000] text-white hover:bg-[#000000]/90"
              onClick={() => shareToSocial('TikTok')}
            >
              <Share className="mr-2 h-4 w-4" />
              TikTok
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
