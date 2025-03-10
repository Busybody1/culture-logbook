import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Copy, Sparkle } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const { copyToClipboard } = useClipboard();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    onUpdate({
      ...formData,
      [name]: value,
      hashtags: name === 'hashtags' 
        ? value.split(',').map(tag => tag.trim().replace('#', ''))
        : formData.hashtags.split(',').map(tag => tag.trim().replace('#', ''))
    });
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

    let prompt = '';
    switch (field) {
      case 'title':
        prompt = `Create a title for a ${platform} post about: ${diaryData.title}. Context: ${diaryData.notes}`;
        break;
      case 'caption':
        prompt = `Write a ${platform} caption about: ${diaryData.title}. Details: ${diaryData.notes}`;
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

      onUpdate({
        ...formData,
        [field]: generatedText,
        hashtags: field === 'hashtags' 
          ? generatedText.split(',').map(tag => tag.trim().replace('#', ''))
          : formData.hashtags.split(',').map(tag => tag.trim().replace('#', ''))
      });

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
    }
  };

  return (
    <div className="space-y-4">
      {platform === 'Facebook' && (
        <div>
          <Label htmlFor="title">Title</Label>
          <div className="relative">
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a title for your post..."
              className="pr-20"
            />
            <div className="absolute right-2 top-2.5 flex gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(formData.title, 'Title')}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => generateWithAI('title')}
              >
                <Sparkle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="caption">Caption</Label>
        <div className="relative">
          <Textarea
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Write your caption..."
            rows={3}
            className="pr-20"
          />
          <div className="absolute right-2 top-2.5 flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleCopy(formData.caption, 'Caption')}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => generateWithAI('caption')}
            >
              <Sparkle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="pl-8 pr-10"
            placeholder="Add location..."
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2"
            onClick={() => handleCopy(formData.location, 'Location')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <div className="relative">
          <Input
            id="hashtags"
            name="hashtags"
            value={formData.hashtags}
            onChange={handleChange}
            placeholder="Enter hashtags separated by commas..."
            className="pr-20"
          />
          <div className="absolute right-2 top-2.5 flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleCopy(formData.hashtags, 'Hashtags')}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => generateWithAI('hashtags')}
            >
              <Sparkle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;
