import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
const UserManagementPage = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return <div className="flex h-screen bg-gray-100">
      <Sidebar role={isAdmin ? 'ADMIN' : 'SALES_MANAGER'} />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isAdmin ? 'User Management' : 'Team Management'}
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">
              {isAdmin ? 'Manage Users' : 'Manage Team Members'}
            </h2>
            <p className="text-gray-600">
              {isAdmin ? 'This is where you can manage all users in the system.' : 'This is where you can manage your team members.'}
            </p>
          </div>
        </main>
      </div>
    </div>;
};
export default UserManagementPage;