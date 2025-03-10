
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from './use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useDiaryEntry = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);
  
  const { user } = useAuth();

  const validateForm = () => {
    if (!title.trim()) {
      toast({
        title: "Title is required",
        description: "Please provide a title for your diary entry.",
        variant: "destructive",
      });
      return false;
    }

    if (!date) {
      toast({
        title: "Date is required",
        description: "Please select a date for your diary entry.",
        variant: "destructive",
      });
      return false;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your diary entry.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSaveEntry = async () => {
    if (!validateForm()) return false;
    
    try {
      const entryData = {
        title,
        date: date?.toISOString(),
        notes,
        rating,
        tags: selectedTags,
        type: isRestaurant ? 'restaurant' : 'museum',
        user_id: user!.id,
        image_url: imagePreviews.length > 0 ? imagePreviews[0] : null
      };

      const { error } = await supabase
        .from('diary_entries')
        .insert([entryData]);

      if (error) throw error;

      toast({
        title: "Entry saved",
        description: "Your diary entry has been saved successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Error",
        description: "Failed to save the entry. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateEntry = async (entryId: string) => {
    if (!validateForm()) return false;
    
    try {
      const entryData = {
        title,
        date: date?.toISOString(),
        notes,
        rating,
        tags: selectedTags,
        type: isRestaurant ? 'restaurant' : 'museum',
        image_url: imagePreviews.length > 0 ? imagePreviews[0] : null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('diary_entries')
        .update(entryData)
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Entry updated",
        description: "Your diary entry has been updated successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating entry:', error);
      toast({
        title: "Error",
        description: "Failed to update the entry. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateAICaption = async () => {
    setIsGeneratingCaption(true);
    
    try {
      // This is a mock function, in a real app you'd call an AI API
      setTimeout(() => {
        const captions = [
          "Exploring the vibrant flavors of authentic cuisine in a cozy atmosphere.",
          "An unforgettable culinary journey through traditional recipes with a modern twist.",
          "Immersed in the rich history and cultural significance of ancient artifacts.",
          "A fascinating exhibition showcasing the evolution of artistic expression across centuries."
        ];
        
        const randomCaption = captions[Math.floor(Math.random() * captions.length)];
        setGeneratedCaption(randomCaption);
        setNotes(prev => prev ? prev : randomCaption);
        
        toast({
          title: "Caption generated",
          description: "AI has generated a caption for your entry.",
        });
        
        setIsGeneratingCaption(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating caption:', error);
      toast({
        title: "Error",
        description: "Failed to generate a caption. Please try again.",
        variant: "destructive",
      });
      setIsGeneratingCaption(false);
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
    handleSaveEntry,
    handleUpdateEntry
  };
};
