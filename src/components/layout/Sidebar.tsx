import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, FolderIcon, CheckSquareIcon, BarChartIcon, SettingsIcon, ChevronDownIcon, ChevronRightIcon, GraduationCapIcon, PlusIcon, UserPlusIcon, FileTextIcon } from 'lucide-react';
type SidebarProps = {
  role?: 'ADMIN' | 'SALES_MANAGER';
};
const Sidebar: React.FC<SidebarProps> = ({
  role = 'ADMIN'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const basePrefix = role === 'ADMIN' ? '/admin' : '/manager';
  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const handleAddModule = () => {
    navigate(`${basePrefix}/content/create`);
  };
  const handleAddTeamMember = () => {
    if (role === 'ADMIN') {
      navigate(`${basePrefix}/users`);
    } else {
      navigate(`${basePrefix}/team/members`);
    }
    // The actual modal will be triggered in the respective pages
  };
  const navItems = [{
    name: 'Home',
    icon: <HomeIcon className="h-5 w-5" />,
    path: `${basePrefix}/dashboard`
  }, {
    name: role === 'ADMIN' ? 'Users' : 'Team',
    icon: <UsersIcon className="h-5 w-5" />,
    path: role === 'ADMIN' ? `${basePrefix}/users` : `${basePrefix}/team`,
    subItems: role === 'ADMIN' ? [{
      name: 'All Users',
      path: `${basePrefix}/users`
    }, {
      name: 'Departments',
      path: `${basePrefix}/users/departments`
    }, {
      name: 'Pending Invites',
      path: `${basePrefix}/users/invites`
    }] : [{
      name: 'Team Overview',
      path: `${basePrefix}/team`
    }, {
      name: 'Team Members',
      path: `${basePrefix}/team/members`
    }]
  }, {
    name: 'Content',
    icon: <FolderIcon className="h-5 w-5" />,
    path: `${basePrefix}/content`,
    subItems: [{
      name: role === 'ADMIN' ? 'Content Library' : 'Modules',
      path: `${basePrefix}/content`
    }, {
      name: 'Learning Paths',
      path: `${basePrefix}/content/paths`
    }, ...(role === 'ADMIN' ? [{
      name: 'Universal Content',
      path: `${basePrefix}/content/universal`
    }] : [])]
  }, {
    name: 'Assignments',
    icon: <CheckSquareIcon className="h-5 w-5" />,
    path: `${basePrefix}/assignments`
  }, {
    name: 'Analytics',
    icon: <BarChartIcon className="h-5 w-5" />,
    path: `${basePrefix}/analytics`,
    subItems: role === 'ADMIN' ? [{
      name: 'Overview',
      path: `${basePrefix}/analytics`
    }, {
      name: 'Departments',
      path: `${basePrefix}/analytics/departments`
    }, {
      name: 'Content Performance',
      path: `${basePrefix}/analytics/content`
    }, {
      name: 'User Progress',
      path: `${basePrefix}/analytics/users`
    }] : [{
      name: 'Team Overview',
      path: `${basePrefix}/analytics`
    }, {
      name: 'Individual Performance',
      path: `${basePrefix}/analytics/members`
    }, {
      name: 'Skills Analysis',
      path: `${basePrefix}/analytics/skills`
    }]
  }, {
    name: 'Settings',
    icon: <SettingsIcon className="h-5 w-5" />,
    path: `${basePrefix}/settings`
  }];
  return <aside className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0 hidden md:block flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center">
          <GraduationCapIcon className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-semibold">Sales LMS</span>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {role === 'ADMIN' ? 'Admin Portal' : 'Manager Portal'}
        </div>
      </div>
      <nav className="mt-5 flex-grow">
        <ul className="space-y-1">
          {navItems.map(item => <li key={item.name}>
              {item.subItems ? <div>
                  <button onClick={() => toggleMenu(item.name)} className={`flex items-center justify-between w-full px-4 py-3 text-sm ${isActive(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </div>
                    {expandedMenus[item.name] ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                  </button>
                  {expandedMenus[item.name] && <ul className="pl-10 bg-gray-900">
                      {item.subItems.map(subItem => <li key={subItem.name}>
                          <Link to={subItem.path} className={`block px-4 py-2 text-sm ${location.pathname === subItem.path ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>
                            {subItem.name}
                          </Link>
                        </li>)}
                    </ul>}
                </div> : <Link to={item.path} className={`flex items-center px-4 py-3 text-sm ${isActive(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>}
            </li>)}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleAddModule} className="flex flex-col items-center justify-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
            <FileTextIcon className="h-5 w-5 text-blue-400 mb-1" />
            <span className="text-xs text-gray-200">Add Module</span>
          </button>
          <button onClick={handleAddTeamMember} className="flex flex-col items-center justify-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
            <UserPlusIcon className="h-5 w-5 text-green-400 mb-1" />
            <span className="text-xs text-gray-200">Add Member</span>
          </button>
        </div>
      </div>
    </aside>;
};
export default Sidebar;