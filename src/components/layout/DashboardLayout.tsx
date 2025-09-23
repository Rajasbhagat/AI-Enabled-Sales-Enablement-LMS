import React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { BellIcon, UserIcon, ChevronDownIcon } from 'lucide-react';
type DashboardLayoutProps = {
  children: React.ReactNode;
  title?: string;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return <div className="flex h-screen bg-gray-100">
      <Sidebar role={isAdmin ? 'ADMIN' : 'SALES_MANAGER'} />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block font-medium">
                    Admin User
                  </span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>;
};
export default DashboardLayout;