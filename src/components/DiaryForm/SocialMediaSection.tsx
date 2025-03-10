
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SocialMediaSelector from '@/components/SocialMediaSelector';
import SocialMediaForm from '@/components/SocialMediaForm';
import SocialMediaPreview from '@/components/SocialMediaPreview';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaData {
  Facebook: {
    title: string;
    caption: string;
    location: string;
    hashtags: string[];
  };
  Instagram: {
    caption: string;
    location: string;
    hashtags: string[];
  };
  TikTok: {
    caption: string;
    location: string;
    hashtags: string[];
  };
}

interface SocialMediaSectionProps {
  title: string;
  notes: string;
  selectedTags: string[];
  imagePreviews: string[];
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  title,
  notes,
  selectedTags,
  imagePreviews
}) => {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState<'Facebook' | 'Instagram' | 'TikTok' | null>(null);
  const [showPostPreview, setShowPostPreview] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData>({
    Facebook: {
      title: '',
      caption: '',
      location: '',
      hashtags: [],
    },
    Instagram: {
      caption: '',
      location: '',
      hashtags: [],
    },
    TikTok: {
      caption: '',
      location: '',
      hashtags: [],
    }
  });

  const handleGeneratePost = () => {
    if (!selectedPlatform) {
      toast({
        title: "Please select a platform",
        description: "Choose Facebook, Instagram, or TikTok to generate a post",
        variant: "destructive",
      });
      return;
    }

    setShowPostPreview(true);
    toast({
      title: "Post Generated!",
      description: `Your ${selectedPlatform} post has been generated`,
    });
  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Share Your Experience</h2>
      </div>

      <SocialMediaSelector
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
      />

      {selectedPlatform && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <SocialMediaForm
              platform={selectedPlatform}
              onUpdate={(data) => {
                setSocialMediaData(prev => ({
                  ...prev,
                  [selectedPlatform]: data
                }));
              }}
              diaryData={{
                title,
                notes,
                tags: selectedTags,
              }}
            />
            
            <Button
              className="mt-4 w-full"
              onClick={handleGeneratePost}
            >
              Generate Post
            </Button>
          </div>
          
          {showPostPreview && (
            <div>
              <SocialMediaPreview
                platform={selectedPlatform}
                title={selectedPlatform === 'Facebook' ? socialMediaData.Facebook.title : undefined}
                caption={socialMediaData[selectedPlatform].caption}
                location={socialMediaData[selectedPlatform].location}
                images={imagePreviews}
                hashtags={socialMediaData[selectedPlatform].hashtags}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialMediaSection;
