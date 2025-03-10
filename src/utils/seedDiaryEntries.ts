
import { supabase } from '@/integrations/supabase/client';

const MOCK_ENTRIES = [
  {
    title: 'Dinner at La Piazza',
    type: 'restaurant',
    date: new Date('2023-05-15').toISOString(),
    notes: 'Amazing Italian food with authentic flavors. The pasta was freshly made and the service was excellent.',
    rating: 5,
    tags: ['Italian', 'Fine Dining'],
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: 'Van Gogh Exhibition',
    type: 'museum',
    date: new Date('2023-06-02').toISOString(),
    notes: 'Incredible collection of Van Gogh\'s work. The immersive experience was breathtaking and educational.',
    rating: 4,
    tags: ['Modern Art', 'Temporary Exhibit'],
    image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: 'Sushi Delight',
    type: 'restaurant',
    date: new Date('2023-06-20').toISOString(),
    notes: 'Fresh sushi with interesting combinations. The ambiance was peaceful and the presentation was beautiful.',
    rating: 4,
    tags: ['Japanese', 'Street Food'],
    image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: 'Natural History Museum',
    type: 'museum',
    date: new Date('2023-07-10').toISOString(),
    notes: 'Fascinating dinosaur exhibits and interactive displays. Great for both kids and adults.',
    rating: 5,
    tags: ['Natural History', 'Family Friendly'],
    image_url: 'https://images.unsplash.com/photo-1574068624578-d6e7a8497f4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  }
];

export const seedDiaryEntries = async (userId: string) => {
  try {
    const entries = MOCK_ENTRIES.map(entry => ({
      ...entry,
      user_id: userId
    }));

    const { error } = await supabase
      .from('diary_entries')
      .insert(entries);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error seeding diary entries:', error);
    return false;
  }
};
