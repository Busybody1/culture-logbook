
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { seedDiaryEntries } from '@/utils/seedDiaryEntries';
import { useNavigate } from 'react-router-dom';

export const useDiaryUtils = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'restaurant' | 'museum'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
        toast({
          title: "Error loading entries",
          description: "Failed to load your diary entries. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setEntries(data || []);
      setFilteredEntries(data || []);
    };

    fetchEntries();
  }, [user]);

  useEffect(() => {
    if (!entries.length) return;
    
    let filtered = [...entries];
    
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        entry.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(entry => entry.type === selectedType);
    }
    
    if (selectedTag) {
      filtered = filtered.filter(entry => 
        entry.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    if (selectedCountry) {
      filtered = filtered.filter(entry => 
        entry.country?.toLowerCase() === selectedCountry.toLowerCase()
      );
    }
    
    setFilteredEntries(filtered);
  }, [searchTerm, selectedType, selectedTag, selectedCountry, entries]);

  const getAllTags = () => {
    const tagSet = new Set<string>();
    entries.forEach(entry => {
      entry.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const getAllCountries = () => {
    const countrySet = new Set<string>();
    entries.forEach(entry => {
      if (entry.country) {
        countrySet.add(entry.country);
      }
    });
    return Array.from(countrySet);
  };

  const handleDelete = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
      
      toast({
        title: "Entry deleted",
        description: "Your diary entry has been deleted successfully.",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entryId: string) => {
    navigate(`/edit-entry/${entryId}`);
  };

  const handleSeedData = async () => {
    if (!user) return;
    
    const success = await seedDiaryEntries(user.id);
    
    if (success) {
      toast({
        title: "Sample entries added",
        description: "Sample diary entries have been added to your account.",
      });
      
      // Refresh the entries
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (!error && data) {
        setEntries(data);
        setFilteredEntries(data);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to add sample entries. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    entries,
    filteredEntries,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedTag,
    setSelectedTag,
    selectedCountry,
    setSelectedCountry,
    getAllTags,
    getAllCountries,
    handleDelete,
    handleEdit,
    handleSeedData
  };
};
