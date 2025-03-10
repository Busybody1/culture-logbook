
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useDiaryEntry = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);

  const generateAICaption = async () => {
    setIsGeneratingCaption(true);
    
    try {
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
      return false;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Entry saved successfully!",
        description: "Your diary entry has been saved.",
      });
      
      if (!generatedCaption) {
        await generateAICaption();
      }
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to save entry",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    title, setTitle,
    date, setDate,
    notes, setNotes,
    rating, setRating,
    selectedTags, setSelectedTags,
    imageFiles, setImageFiles,
    imagePreviews, setImagePreviews,
    isRestaurant, setIsRestaurant,
    isGeneratingCaption, 
    generatedCaption,
    generateAICaption,
    handleSaveEntry
  };
};
