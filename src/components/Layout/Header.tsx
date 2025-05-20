import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Award size={28} className="text-amber-300" />
          <h1 className="text-xl md:text-2xl font-bold">Volunteer Recognition Portal</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="hover:text-amber-300 transition-colors duration-200"
              >
                Events
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;