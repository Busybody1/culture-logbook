import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FormField from '@/components/SocialMediaForm/FormField';
import { Button } from '@/components/ui/button';

interface SocialMediaFormProps {
  platform: 'Facebook' | 'Instagram' | 'TikTok';
  onUpdate: (data: {
    title?: string;
    caption: string;
    location?: string;
    hashtags: string[];
  }) => void;
  diaryData?: {
    title: string;
    notes: string;
    tags: string[];
  };
}

const SocialMediaForm = ({ platform, onUpdate, diaryData }: SocialMediaFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    location: '',
    hashtags: '',
  });
  const [isGenerating, setIsGenerating] = useState({
    title: false,
    caption: false,
    hashtags: false
  });
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'hashtags') {
      // Convert hashtags string to array, keeping the # if present
      const hashtagsArray = value.split(/[\s,]+/)
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.startsWith('#') ? tag.substring(1) : tag);
      
      onUpdate({
        ...formData,
        hashtags: hashtagsArray,
        caption: formData.caption,
        title: formData.title,
        location: formData.location
      });
    } else {
      const hashtagsArray = formData.hashtags.split(/[\s,]+/)
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.startsWith('#') ? tag.substring(1) : tag);
      
      onUpdate({
        ...formData,
        hashtags: hashtagsArray,
        caption: name === 'caption' ? value : formData.caption,
        title: name === 'title' ? value : formData.title,
        location: name === 'location' ? value : formData.location
      });
    }
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
      });
    }
  };

  const generateWithAI = async (field: 'title' | 'caption' | 'hashtags') => {
    if (!diaryData) return;

    setIsGenerating(prev => ({ ...prev, [field]: true }));

    let prompt = '';
    switch (field) {
      case 'title':
        prompt = `Create a title for a ${platform} post about: ${diaryData.title}. Context: ${diaryData.notes}`;
        break;
      case 'caption':
        prompt = `Write a ${platform} caption about: ${diaryData.title}. Details: ${diaryData.notes}. Do not include any hashtags.`;
        break;
      case 'hashtags':
        prompt = `Generate relevant hashtags for a ${platform} post about: ${diaryData.title}. Context: ${diaryData.notes}`;
        break;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generate-with-groq', {
        body: { prompt, type: field }
      });

      if (error) throw error;

      const generatedText = data.generatedText;
      setFormData(prev => ({
        ...prev,
        [field]: generatedText
      }));

      if (field === 'hashtags') {
        const hashtagsArray = generatedText.split(/[\s,]+/)
          .filter(tag => tag.trim() !== '')
          .map(tag => tag.startsWith('#') ? tag.substring(1) : tag);
        
        onUpdate({
          ...formData,
          hashtags: hashtagsArray,
          title: formData.title,
          caption: formData.caption,
          location: formData.location
        });
      } else {
        const hashtagsArray = formData.hashtags.split(/[\s,]+/)
          .filter(tag => tag.trim() !== '')
          .map(tag => tag.startsWith('#') ? tag.substring(1) : tag);
        
        onUpdate({
          ...formData,
          hashtags: hashtagsArray,
          title: field === 'title' ? generatedText : formData.title,
          caption: field === 'caption' ? generatedText : formData.caption,
          location: formData.location
        });
      }

      toast({
        title: "Generated!",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} generated successfully with AI`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {platform === 'Facebook' && (
        <FormField
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your post..."
          onCopy={() => handleCopy(formData.title, 'Title')}
          onGenerate={() => generateWithAI('title')}
          isGenerating={isGenerating.title}
        />
      )}

      <FormField
        id="caption"
        name="caption"
        label="Caption"
        value={formData.caption}
        onChange={handleChange}
        placeholder="Write your caption..."
        isTextarea={true}
        onCopy={() => handleCopy(formData.caption, 'Caption')}
        onGenerate={() => generateWithAI('caption')}
        isGenerating={isGenerating.caption}
      />

      <FormField
        id="location"
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Add location..."
        icon={<MapPin className="h-4 w-4" />}
        onCopy={() => handleCopy(formData.location, 'Location')}
      />

      <FormField
        id="hashtags"
        name="hashtags"
        label="Hashtags"
        value={formData.hashtags}
        onChange={handleChange}
        placeholder="Enter hashtags separated by spaces..."
        onCopy={() => handleCopy(formData.hashtags, 'Hashtags')}
        onGenerate={() => generateWithAI('hashtags')}
        isGenerating={isGenerating.hashtags}
      />
    </div>
  );
};

export default SocialMediaForm;
