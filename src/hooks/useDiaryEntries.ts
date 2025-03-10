
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DiaryEntry } from '@/types/database';
import { toast } from '@/hooks/use-toast';

export function useDiaryEntries() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
    } catch (error) {
      toast({
        title: "Error fetching entries",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entry: Omit<DiaryEntry, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;

      setEntries([data, ...entries]);
      
      toast({
        title: "Entry saved successfully",
        description: "Your diary entry has been saved.",
      });
      
      return data;
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('diary-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('diary-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    entries,
    loading,
    createEntry,
    uploadImage,
    refreshEntries: fetchEntries,
  };
}
