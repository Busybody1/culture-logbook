
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
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  
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
        image_url: imagePreviews.length > 0 ? imagePreviews[0] : null,
        location,
        country
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
        updated_at: new Date().toISOString(),
        location,
        country
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
    if (!notes.trim()) {
      toast({
        title: "Input needed",
        description: "Please enter some keywords or a brief description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingCaption(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-with-groq', {
        body: { 
          prompt: `I'm writing about my ${isRestaurant ? 'restaurant' : 'museum'} experience and want to expand on these notes or keywords: "${notes}". 
                  Please create a coherent, engaging description that incorporates these words/phrases.
                  Use simple, natural language and personal perspective (first-person).
                  Focus on sensory details and emotions.
                  Keep it approximately 3-4 sentences.`,
          type: 'experience'
        }
      });

      if (error) throw error;

      const enhancedText = data.generatedText;
      setGeneratedCaption(enhancedText);
      setNotes(enhancedText);
      
      toast({
        title: "AI Enhanced",
        description: "Your notes have been expanded into a coherent description.",
      });
    } catch (error) {
      console.error('Error generating enhanced description:', error);
      toast({
        title: "Error",
        description: "Failed to enhance your notes. Please try again.",
        variant: "destructive",
      });
    } finally {
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
    handleUpdateEntry,
    location, setLocation,
    country, setCountry
  };
};
