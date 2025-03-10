
import React from 'react';
import EntryCard from './EntryCard';

interface EntriesGridProps {
  entries: any[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const EntriesGrid: React.FC<EntriesGridProps> = ({ entries, handleEdit, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map(entry => (
        <EntryCard
          key={entry.id}
          entry={entry}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default EntriesGrid;
