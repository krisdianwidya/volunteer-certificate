import { supabase } from '../lib/supabase';
import { events as initialEvents } from '../data/events';
import { volunteers as initialVolunteers } from '../data/volunteers';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['events']['Insert'];
type Volunteer = Database['public']['Tables']['volunteers']['Insert'];

async function seedDatabase() {
  try {
    // Clean up existing data
    await supabase.from('volunteers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Prepare events data
    const eventsToInsert: Event[] = initialEvents.map(({ id, ...event }) => ({
      ...event,
    }));

    // Insert events
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .insert(eventsToInsert)
      .select();

    if (eventsError) {
      console.error('Error inserting events:', eventsError);
      throw eventsError;
    }
    
    console.log('✅ Events seeded successfully');

    if (!eventsData) {
      throw new Error('No events data returned after insert');
    }

    // Map old event IDs to new UUIDs
    const eventIdMap = eventsData.reduce((acc, event, index) => {
      acc[initialEvents[index].id] = event.id;
      return acc;
    }, {} as Record<string, string>);

    // Prepare volunteers data
    const volunteersToInsert: Volunteer[] = initialVolunteers.map(({ id, eventId, certificateImage, ...volunteer }) => ({
      ...volunteer,
      event_id: eventIdMap[eventId],
      certificate_image: certificateImage,
    }));

    // Insert volunteers
    const { error: volunteersError } = await supabase
      .from('volunteers')
      .insert(volunteersToInsert);

    if (volunteersError) {
      console.error('Error inserting volunteers:', volunteersError);
      throw volunteersError;
    }
    
    console.log('✅ Volunteers seeded successfully');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();