import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, FilterIcon, PlusIcon, GridIcon, ListIcon, FolderIcon, PlayIcon, FileTextIcon, HelpCircleIcon, ClockIcon, CheckCircleIcon, EyeIcon, EditIcon, TrashIcon, UsersIcon, MoreHorizontalIcon, TagIcon, UserIcon } from 'lucide-react';
import { toast } from 'react-toastify';
type ContentItem = {
  id: string;
  title: string;
  type: 'module' | 'video' | 'document' | 'quiz';
  description: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  dateCreated: string;
  dateUpdated: string;
  duration?: string;
  completionRate?: number;
  assignedCount?: number;
  tags: string[];
  departments?: string[];
  roles?: string[];
  author: {
    name: string;
    avatar?: string;
  };
};
const ContentLibraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  // Sample departments and roles for filtering
  const departments = ['Sales', 'Marketing', 'Customer Success', 'Support'];
  const roles = ['Sales Representative', 'Senior Sales Representative', 'Account Executive', 'Senior Account Executive', 'Sales Manager'];
  // Sample content data
  const contentItems: ContentItem[] = [{
    id: '1',
    title: 'Sales Methodology Fundamentals',
    type: 'module',
    description: 'Learn the core principles of our sales methodology and how to apply them in various scenarios.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-05-15',
    dateUpdated: '2023-06-01',
    duration: '2h 30m',
    completionRate: 78,
    assignedCount: 42,
    tags: ['sales', 'methodology', 'fundamentals'],
    departments: ['Sales'],
    roles: ['Sales Representative', 'Senior Sales Representative'],
    author: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  }, {
    id: '2',
    title: 'Objection Handling Techniques',
    type: 'module',
    description: 'Master the art of handling common customer objections with confidence and precision.',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-04-20',
    dateUpdated: '2023-05-10',
    duration: '1h 45m',
    completionRate: 65,
    assignedCount: 36,
    tags: ['objection handling', 'communication', 'advanced'],
    departments: ['Sales', 'Customer Success'],
    roles: ['Sales Representative', 'Account Executive'],
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  }, {
    id: '3',
    title: 'Product Knowledge - Q2 Updates',
    type: 'module',
    description: 'Get up to speed with the latest product features and updates for Q2.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-06-05',
    dateUpdated: '2023-06-05',
    duration: '1h 15m',
    completionRate: 42,
    assignedCount: 28,
    tags: ['product knowledge', 'updates', 'features'],
    departments: ['Sales', 'Support', 'Customer Success'],
    roles: ['Sales Representative', 'Support Specialist'],
    author: {
      name: 'Michael Lee',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  }, {
    id: '4',
    title: 'Advanced Negotiation Strategies',
    type: 'module',
    description: 'Learn advanced negotiation tactics to close more deals and maximize value.',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'draft',
    dateCreated: '2023-06-10',
    dateUpdated: '2023-06-12',
    duration: '2h 15m',
    tags: ['negotiation', 'advanced', 'closing'],
    departments: ['Sales'],
    roles: ['Senior Sales Representative', 'Account Executive', 'Sales Manager'],
    author: {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }, {
    id: '5',
    title: 'Discovery Call Best Practices',
    type: 'video',
    description: 'Watch expert sales reps conduct effective discovery calls and learn best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-05-05',
    dateUpdated: '2023-05-05',
    duration: '45m',
    completionRate: 88,
    assignedCount: 52,
    tags: ['discovery', 'calls', 'best practices'],
    departments: ['Sales'],
    roles: ['Sales Representative', 'Account Executive'],
    author: {
      name: 'Robert Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  }, {
    id: '6',
    title: 'Competitive Analysis Guide',
    type: 'document',
    description: 'Comprehensive guide to our competitors, their products, and how to position against them.',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-04-10',
    dateUpdated: '2023-05-20',
    duration: '30m',
    completionRate: 72,
    assignedCount: 48,
    tags: ['competitive analysis', 'positioning', 'reference'],
    departments: ['Sales', 'Marketing'],
    roles: ['Sales Representative', 'Marketing Specialist'],
    author: {
      name: 'Jennifer Miller',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    }
  }, {
    id: '7',
    title: 'Product Certification Quiz',
    type: 'quiz',
    description: 'Test your knowledge of our products and earn your certification.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-05-25',
    dateUpdated: '2023-05-25',
    duration: '20m',
    completionRate: 62,
    assignedCount: 45,
    tags: ['quiz', 'certification', 'assessment'],
    departments: ['Sales', 'Support', 'Customer Success'],
    roles: ['Sales Representative', 'Support Specialist', 'Customer Success Manager'],
    author: {
      name: 'David Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  }, {
    id: '8',
    title: 'Customer Success Stories',
    type: 'document',
    description: 'Collection of customer success stories and case studies to use in your sales process.',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'archived',
    dateCreated: '2023-03-15',
    dateUpdated: '2023-03-15',
    duration: '40m',
    completionRate: 45,
    assignedCount: 22,
    tags: ['case studies', 'customer stories', 'reference'],
    departments: ['Sales', 'Marketing'],
    roles: ['Sales Representative', 'Marketing Specialist'],
    author: {
      name: 'Amanda Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  }];
  // Filter content items based on search and filters
  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesDepartment = filterDepartment === 'all' || item.departments && item.departments.includes(filterDepartment);
    const matchesRole = filterRole === 'all' || item.roles && item.roles.includes(filterRole);
    return matchesSearch && matchesStatus && matchesType && matchesDepartment && matchesRole;
  });
  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <FolderIcon className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <PlayIcon className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileTextIcon className="h-5 w-5 text-green-500" />;
      case 'quiz':
        return <HelpCircleIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <FolderIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Published
          </span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Draft
          </span>;
      case 'archived':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            Archived
          </span>;
      default:
        return null;
    }
  };
  // Handle content actions
  const handleEdit = (id: string) => {
    // Navigate to edit page with the module id
    navigate(`${isAdmin ? '/admin' : '/manager'}/content/create?id=${id}`);
    setShowActionMenu(null);
  };
  const handleView = (id: string) => {
    toast.info(`Viewing module: ${id}`);
    setShowActionMenu(null);
  };
  const handleDelete = (id: string) => {
    toast.info(`Deleting module: ${id}`);
    setShowActionMenu(null);
  };
  const handleAssign = (id: string) => {
    toast.info(`Assigning module: ${id}`);
    setShowActionMenu(null);
  };
  const handleDuplicate = (id: string) => {
    toast.info(`Duplicating module: ${id}`);
    setShowActionMenu(null);
  };
  const handleCreateContent = () => {
    navigate(isAdmin ? '/admin/content/create' : '/manager/content/create');
  };
  // Handle card click to edit
  const handleCardClick = (id: string) => {
    handleEdit(id);
  };
  return <DashboardLayout title={isAdmin ? 'Content Library' : 'Modules'}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {isAdmin ? 'Content Library' : 'Modules'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isAdmin ? 'Manage all learning content for your organization' : 'Manage your created modules and learning materials'}
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleCreateContent}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Module
          </button>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-3 md:space-y-0">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search modules..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative inline-block text-left">
              <select className="block w-28 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="relative inline-block text-left">
              <select className="block w-28 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="module">Modules</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
                <option value="quiz">Quizzes</option>
              </select>
            </div>
            <div className="relative inline-block text-left">
              <select className="block w-36 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)}>
                <option value="all">All Departments</option>
                {departments.map(dept => <option key={dept} value={dept}>
                    {dept}
                  </option>)}
              </select>
            </div>
            <div className="relative inline-block text-left">
              <select className="block w-36 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                {roles.map(role => <option key={role} value={role}>
                    {role}
                  </option>)}
              </select>
            </div>
            <div className="flex border border-gray-300 rounded-md">
              <button className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('grid')}>
                <GridIcon className="h-5 w-5" />
              </button>
              <button className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('list')}>
                <ListIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Content Display */}
        {filteredContent.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No modules found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? `No results found for "${searchTerm}". Try adjusting your search or filters.` : "You haven't created any modules yet."}
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleCreateContent}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Module
            </button>
          </div> : viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] hover:shadow-md" onClick={() => handleCardClick(item.id)}>
                <div className="h-48 relative">
                  {item.thumbnail ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {getContentTypeIcon(item.type)}
                    </div>}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-lg font-medium text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {getContentTypeIcon(item.type)}
                    <span className="ml-2 text-sm text-gray-600 capitalize">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map(tag => <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{item.duration || 'N/A'}</span>
                    </div>
                    {item.completionRate !== undefined && <div className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        <span>{item.completionRate}% completion</span>
                      </div>}
                  </div>
                  {(item.departments || item.roles) && <div className="border-t border-gray-100 pt-3 mt-2">
                      {item.departments && <div className="flex items-start mb-1">
                          <FolderIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {item.departments.join(', ')}
                          </span>
                        </div>}
                      {item.roles && <div className="flex items-start">
                          <UserIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {item.roles.length > 2 ? `${item.roles.slice(0, 2).join(', ')} +${item.roles.length - 2}` : item.roles.join(', ')}
                          </span>
                        </div>}
                    </div>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      {item.author.avatar ? <img src={item.author.avatar} alt={item.author.name} className="h-6 w-6 rounded-full mr-2" /> : <div className="h-6 w-6 rounded-full bg-gray-300 mr-2"></div>}
                      <span className="text-xs text-gray-600">
                        {item.author.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button onClick={e => {
                  e.stopPropagation();
                  handleEdit(item.id);
                }} className="p-1 text-gray-500 hover:text-blue-600">
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button onClick={e => {
                    e.stopPropagation();
                    setShowActionMenu(showActionMenu === item.id ? null : item.id);
                  }} className="p-1 text-gray-500 hover:text-blue-600">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </button>
                        {showActionMenu === item.id && <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <button onClick={e => {
                      e.stopPropagation();
                      handleView(item.id);
                    }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <EyeIcon className="mr-3 h-4 w-4 text-gray-500" />
                              View
                            </button>
                            <button onClick={e => {
                      e.stopPropagation();
                      handleEdit(item.id);
                    }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <EditIcon className="mr-3 h-4 w-4 text-gray-500" />
                              Edit
                            </button>
                            <button onClick={e => {
                      e.stopPropagation();
                      handleAssign(item.id);
                    }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <UsersIcon className="mr-3 h-4 w-4 text-gray-500" />
                              Assign
                            </button>
                            <button onClick={e => {
                      e.stopPropagation();
                      handleDuplicate(item.id);
                    }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <FolderIcon className="mr-3 h-4 w-4 text-gray-500" />
                              Duplicate
                            </button>
                            <button onClick={e => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                              <TrashIcon className="mr-3 h-4 w-4 text-red-500" />
                              Delete
                            </button>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments/Roles
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map(item => <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleCardClick(item.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {item.thumbnail ? <img className="h-10 w-10 rounded object-cover" src={item.thumbnail} alt={item.title} /> : <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                              {getContentTypeIcon(item.type)}
                            </div>}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getContentTypeIcon(item.type)}
                        <span className="ml-1 text-sm text-gray-900 capitalize">
                          {item.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.duration || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        {item.departments && <div className="flex items-center">
                            <FolderIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                            <span className="truncate max-w-[150px]">
                              {item.departments.join(', ')}
                            </span>
                          </div>}
                        {item.roles && <div className="flex items-center">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                            <span className="truncate max-w-[150px]">
                              {item.roles.length > 2 ? `${item.roles.slice(0, 2).join(', ')} +${item.roles.length - 2}` : item.roles.join(', ')}
                            </span>
                          </div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.dateUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button onClick={e => {
                    e.stopPropagation();
                    handleView(item.id);
                  }} className="text-gray-500 hover:text-blue-600">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button onClick={e => {
                    e.stopPropagation();
                    handleEdit(item.id);
                  }} className="text-gray-500 hover:text-blue-600">
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <div className="relative">
                          <button onClick={e => {
                      e.stopPropagation();
                      setShowActionMenu(showActionMenu === item.id ? null : item.id);
                    }} className="text-gray-500 hover:text-blue-600">
                            <MoreHorizontalIcon className="h-5 w-5" />
                          </button>
                          {showActionMenu === item.id && <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <button onClick={e => {
                        e.stopPropagation();
                        handleAssign(item.id);
                      }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <UsersIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Assign
                              </button>
                              <button onClick={e => {
                        e.stopPropagation();
                        handleDuplicate(item.id);
                      }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <FolderIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Duplicate
                              </button>
                              <button onClick={e => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                                <TrashIcon className="mr-3 h-4 w-4 text-red-500" />
                                Delete
                              </button>
                            </div>}
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </DashboardLayout>;
};
export default ContentLibraryPage;