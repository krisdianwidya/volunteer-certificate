import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Breadcrumbs from '../components/Breadcrumbs';
import VolunteerCard from '../components/VolunteerCard';
import CertificateModal from '../components/CertificateModal';
import YearFilter from '../components/YearFilter';
import SearchBar from '../components/SearchBar';
import { Event, Volunteer } from '../types';
import { Users, Award } from 'lucide-react';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchEventAndVolunteers = async () => {
      try {
        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;
        setEvent(eventData);

        // Fetch volunteers for this event
        const { data: volunteersData, error: volunteersError } = await supabase
          .from('volunteers')
          .select('*')
          .eq('event_id', eventId)
          .order('name');

        if (volunteersError) throw volunteersError;
        setVolunteers(volunteersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventAndVolunteers();
    }
  }, [eventId]);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(volunteers.map(v => v.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [volunteers]);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(volunteer => {
      const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          volunteer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          volunteer.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear = selectedYear === null || volunteer.year === selectedYear;
      
      return matchesSearch && matchesYear;
    });
  }, [volunteers, searchQuery, selectedYear]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!event) return <div className="container mx-auto px-4 py-8">Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: event.name, path: `/event/${event.id}` }
        ]} 
      />
      
      <div className="mb-8">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
            <div className="flex items-center text-amber-300 mb-2">
              <Users size={18} className="mr-2" />
              <span>{filteredVolunteers.length} Volunteers</span>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-700">{event.description}</p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Award size={24} className="text-emerald-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Our Volunteers</h2>
        </div>
        <SearchBar onSearch={setSearchQuery} placeholder="Search volunteers..." />
      </div>
      
      <YearFilter 
        years={years}
        selectedYear={selectedYear}
        onYearSelect={setSelectedYear}
      />
      
      {filteredVolunteers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map(volunteer => (
            <VolunteerCard 
              key={volunteer.id} 
              volunteer={volunteer} 
              onViewCertificate={setSelectedVolunteer}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No volunteers found matching your criteria.</p>
        </div>
      )}
      
      {selectedVolunteer && (
        <CertificateModal 
          volunteer={selectedVolunteer} 
          onClose={() => setSelectedVolunteer(null)} 
        />
      )}
    </div>
  );
};

export default EventDetailsPage;