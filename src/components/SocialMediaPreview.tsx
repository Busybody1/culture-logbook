
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Globe, MapPin } from 'lucide-react';

interface SocialMediaPreviewProps {
  platform: 'Facebook' | 'Instagram' | 'TikTok';
  title?: string;
  caption: string;
  location?: string;
  images: string[];
  hashtags: string[];
}

const SocialMediaPreview = ({
  platform,
  title,
  caption,
  location,
  images,
  hashtags
}: SocialMediaPreviewProps) => {
  const getPreviewStyle = () => {
    switch (platform) {
      case 'Facebook':
        return 'bg-[#F0F2F5] text-[#1C1E21]';
      case 'Instagram':
        return 'bg-white';
      case 'TikTok':
        return 'bg-black text-white';
      default:
        return '';
    }
  };

  return (
    <Card className={`p-4 ${getPreviewStyle()} mb-4`}>
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{platform} Preview</h3>
        {platform === 'Facebook' && title && (
          <h4 className="font-semibold text-lg mb-2">{title}</h4>
        )}
        
        {location && (
          <div className="flex items-center text-sm mb-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {images.slice(0, platform === 'TikTok' ? 1 : 4).map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>
        
        <p className="text-sm mb-2">{caption}</p>
        
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span 
              key={index}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SocialMediaPreview;
