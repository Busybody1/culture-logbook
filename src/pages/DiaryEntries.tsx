
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Header from '@/components/Header';
import DiaryFilters from '@/components/diary/DiaryFilters';
import EmptyState from '@/components/diary/EmptyState';
import EntriesGrid from '@/components/diary/EntriesGrid';
import EntriesList from '@/components/diary/EntriesList';
import { useDiaryUtils } from '@/hooks/useDiaryUtils';

const DiaryEntries = () => {
  const navigate = useNavigate();
  const {
    filteredEntries,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedTag,
    setSelectedTag,
    getAllTags,
    handleDelete,
    handleEdit,
    handleSeedData
  } = useDiaryUtils();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">My Diary Entries</h1>
          <Button 
            onClick={() => navigate('/new-entry')}
            className="bg-[#27AD95] hover:bg-[#27AD95]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>

        <DiaryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tags={getAllTags()}
        />

        {filteredEntries.length === 0 ? (
          <EmptyState handleSeedData={handleSeedData} />
        ) : viewMode === 'grid' ? (
          <EntriesGrid 
            entries={filteredEntries} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
          />
        ) : (
          <EntriesList 
            entries={filteredEntries} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
};

export default DiaryEntries;
