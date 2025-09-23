import React, { useState } from 'react';
import { BellIcon, UserIcon, ChevronDownIcon, SearchIcon } from 'lucide-react';
type NavbarProps = {
  title: string;
  user: any;
  onLogout: () => void;
};
const Navbar: React.FC<NavbarProps> = ({
  title,
  user,
  onLogout
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return <header className="bg-white shadow-sm z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2">
            <SearchIcon className="h-5 w-5 text-gray-500" />
            <input type="text" placeholder="Search..." className="ml-2 bg-transparent border-none focus:outline-none text-sm" />
          </div>
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 relative" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            {notificationsOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border">
                <div className="px-4 py-2 border-b">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium">
                      3 team members completed training
                    </p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">New module published</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View all notifications
                  </button>
                </div>
              </div>}
          </div>
          {/* User menu */}
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full object-cover" /> : <UserIcon className="h-5 w-5" />}
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.name || 'User'}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>
            {userMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </button>
              </div>}
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;