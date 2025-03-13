
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://rwwwndatkitpudsgrftu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3duZGF0a2l0cHVkc2dyZnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjMxOTcsImV4cCI6MjA1NzE5OTE5N30.byBIitQDY0Njyyz4rmsvyte2E4xtZq2fldjjWRMBRPo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
