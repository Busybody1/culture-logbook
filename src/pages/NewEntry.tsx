
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import Header from '@/components/Header';
import EntryForm from '@/components/DiaryForm/EntryForm';
import EntryTypeSelector from '@/components/DiaryForm/EntryTypeSelector';
import SocialMediaSection from '@/components/DiaryForm/SocialMediaSection';

const NewEntry = () => {
  const navigate = useNavigate();
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
    handleSaveEntry
  } = useDiaryEntry();

  const handleSaveAndNavigate = async () => {
    const success = await handleSaveEntry();
    if (success) {
      setTimeout(() => {
        navigate('/diary');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Diary Entry</h1>
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

export default NewEntry;
