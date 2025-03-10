
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EntryTypeSelectorProps {
  isRestaurant: boolean;
  setIsRestaurant: (isRestaurant: boolean) => void;
}

const EntryTypeSelector: React.FC<EntryTypeSelectorProps> = ({ isRestaurant, setIsRestaurant }) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline"
        className={cn(
          "transition-colors",
          isRestaurant ? "bg-[#27AD95] text-white" : "bg-white text-gray-700"
        )}
        onClick={() => setIsRestaurant(true)}
      >
        Restaurant
      </Button>
      <Button 
        variant="outline"
        className={cn(
          "transition-colors",
          !isRestaurant ? "bg-[#27AD95] text-white" : "bg-white text-gray-700"
        )}
        onClick={() => setIsRestaurant(false)}
      >
        Museum
      </Button>
    </div>
  );
};

export default EntryTypeSelector;
