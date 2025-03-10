
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import Header from '@/components/Header';
import EntryForm from '@/components/DiaryForm/EntryForm';
import EntryTypeSelector from '@/components/DiaryForm/EntryTypeSelector';
import SocialMediaSection from '@/components/DiaryForm/SocialMediaSection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const EditEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  const {
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
  } = useDiaryEntry();

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('diary_entries')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Populate the form with the entry data
          setTitle(data.title || '');
          setDate(data.date ? new Date(data.date) : undefined);
          setNotes(data.notes || '');
          setRating(data.rating || 0);
          setSelectedTags(data.tags || []);
          setIsRestaurant(data.type === 'restaurant');
          
          // Handle image preview
          if (data.image_url) {
            setImagePreviews([data.image_url]);
          }
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
        toast({
          title: "Error loading entry",
          description: "We couldn't load the entry details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id, setTitle, setDate, setNotes, setRating, setSelectedTags, setIsRestaurant, setImagePreviews]);

  const handleSaveAndNavigate = async () => {
    if (!id) return;
    
    const success = await handleUpdateEntry(id);
    if (success) {
      setTimeout(() => {
        navigate('/diary');
      }, 1500);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-10 px-4 md:px-6 max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Diary Entry</h1>
          <EntryTypeSelector 
            isRestaurant={isRestaurant} 
            setIsRestaurant={setIsRestaurant} 
          />
        </div>

        <EntryForm
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          notes={notes}
          setNotes={setNotes}
          rating={rating}
          setRating={setRating}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          isRestaurant={isRestaurant}
          setIsRestaurant={setIsRestaurant}
          generateAICaption={generateAICaption}
          isGeneratingCaption={isGeneratingCaption}
          generatedCaption={generatedCaption}
          handleSaveEntry={handleSaveAndNavigate}
          navigate={navigate}
        />

        <SocialMediaSection
          title={title}
          notes={notes}
          selectedTags={selectedTags}
          imagePreviews={imagePreviews}
        />
      </div>
    </div>
  );
};

export default EditEntry;
