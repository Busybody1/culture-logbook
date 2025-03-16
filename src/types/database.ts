
export interface DiaryEntry {
  id: string;
  user_id: string;
  title: string;
  type: 'restaurant' | 'museum';
  date: Date;
  notes: string;
  rating: number;
  tags: string[];
  image_url?: string;
  created_at: Date;
  location?: string;
  country?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: Date;
}
