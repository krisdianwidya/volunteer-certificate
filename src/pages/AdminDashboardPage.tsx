import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminDashboardPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/events"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 mr-4">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Events</h2>
              <p className="text-gray-600">Add, edit, or remove events</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/volunteers"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 mr-4">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Volunteers</h2>
              <p className="text-gray-600">Add, edit, or remove volunteers</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;