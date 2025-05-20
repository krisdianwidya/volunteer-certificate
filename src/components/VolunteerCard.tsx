import React, { useState } from 'react';
import { Volunteer } from '../types';
import { Calendar, Award, ExternalLink } from 'lucide-react';

interface VolunteerCardProps {
  volunteer: Volunteer;
  onViewCertificate: (volunteer: Volunteer) => void;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer, onViewCertificate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{volunteer.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Award size={16} className="mr-2 text-emerald-600" />
          <span>{volunteer.role}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-2 text-emerald-600" />
          <span>{volunteer.year}</span>
        </div>
        
        <p className="text-gray-600 mb-4">{volunteer.description}</p>
        
        <button 
          onClick={() => onViewCertificate(volunteer)}
          className="w-full mt-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors flex items-center justify-center"
        >
          <ExternalLink size={16} className="mr-2" />
          View Certificate
        </button>
      </div>
    </div>
  );
};

export default VolunteerCard;