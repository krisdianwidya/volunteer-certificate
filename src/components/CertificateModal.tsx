import React from 'react';
import { Volunteer } from '../types';
import { X, Download } from 'lucide-react';

interface CertificateModalProps {
  volunteer: Volunteer | null;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ volunteer, onClose }) => {
  if (!volunteer) return null;

  // Since we don't have actual certificate images, we'll create a styled certificate
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <div className="border-8 border-double border-amber-500 p-8 bg-gradient-to-r from-amber-50 to-white">
            <div className="text-center">
              <h2 className="text-3xl font-serif text-emerald-800 mb-2">Certificate of Appreciation</h2>
              <p className="text-lg text-gray-600 mb-8">This certificate is presented to</p>
              
              <h3 className="text-4xl font-bold text-amber-600 font-serif mb-4">{volunteer.name}</h3>
              
              <p className="text-lg text-gray-600 mb-4">
                For outstanding contributions as a <span className="font-semibold">{volunteer.role}</span> in 
              </p>
              
              <p className="text-xl font-semibold text-emerald-700 mb-4">{volunteer.description}</p>
              
              <div className="my-8 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center">
                  <Award size={64} className="text-amber-500" />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-12">
                <div className="text-left">
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold">{volunteer.year}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-script text-2xl text-gray-800">Jane Smith</p>
                  <p className="text-gray-600">Event Director</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
              <Download size={18} className="mr-2" />
              Download Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;