
import React from 'react';
import EntryRow from './EntryRow';

interface EntriesListProps {
  entries: any[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const EntriesList: React.FC<EntriesListProps> = ({ entries, handleEdit, handleDelete }) => {
  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <EntryRow
          key={entry.id}
          entry={entry}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default EntriesList;
