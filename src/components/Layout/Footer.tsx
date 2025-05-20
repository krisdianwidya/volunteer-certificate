import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Volunteer Recognition Portal</p>
          </div>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>for volunteers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;