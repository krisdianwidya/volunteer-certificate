import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-4 text-sm text-gray-600">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center hover:text-emerald-600 transition-colors"
      >
        <Home size={16} className="mr-1" />
        <span>Home</span>
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <button 
            onClick={() => navigate(item.path)}
            className={`${
              index === items.length - 1 
                ? 'font-medium text-emerald-700 pointer-events-none' 
                : 'hover:text-emerald-600 transition-colors'
            }`}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;