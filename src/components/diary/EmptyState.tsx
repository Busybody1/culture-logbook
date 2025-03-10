
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  handleSeedData: () => Promise<void>;
}

const EmptyState: React.FC<EmptyStateProps> = ({ handleSeedData }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 mb-4">No entries found. Create your first entry or add some sample entries!</p>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => navigate('/new-entry')}
          className="bg-[#27AD95] hover:bg-[#27AD95]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Entry
        </Button>
        <Button
          variant="outline"
          onClick={handleSeedData}
        >
          Add Sample Entries
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
