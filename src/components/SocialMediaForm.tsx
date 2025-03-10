
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface SocialMediaFormProps {
  platform: 'Facebook' | 'Instagram' | 'TikTok';
  onUpdate: (data: {
    title?: string;
    caption: string;
    location?: string;
    hashtags: string[];
  }) => void;
}

const SocialMediaForm = ({ platform, onUpdate }: SocialMediaFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    location: '',
    hashtags: '',
  });

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

  return (
    <div className="space-y-4">
      {platform === 'Facebook' && (
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for your post..."
          />
        </div>
      )}

      <div>
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          placeholder="Write your caption..."
          rows={3}
        />
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
            className="pl-8"
            placeholder="Add location..."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <Input
          id="hashtags"
          name="hashtags"
          value={formData.hashtags}
          onChange={handleChange}
          placeholder="Enter hashtags separated by commas..."
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;
