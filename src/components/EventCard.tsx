import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../types';
import { CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                
        <p className="text-gray-600 line-clamp-2">{event.description}</p>
        
        <button 
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors inline-flex items-center"
        >
          View Volunteers
        </button>
      </div>
    </div>
  );
};

export default EventCard;