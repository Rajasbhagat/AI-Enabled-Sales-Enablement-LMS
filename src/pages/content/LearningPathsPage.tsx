import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { SearchIcon, FilterIcon, PlusIcon, ChevronRightIcon, UsersIcon, BookOpenIcon, ClockIcon, CheckCircleIcon, EditIcon, TrashIcon, MoreHorizontalIcon, ArrowRightIcon, GripVerticalIcon, XIcon, EyeIcon, SaveIcon, ListIcon } from 'lucide-react';
import { toast } from 'react-toastify';
type LearningPath = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  dateCreated: string;
  dateUpdated: string;
  totalModules: number;
  estimatedDuration: string;
  completionRate?: number;
  assignedCount?: number;
  author: {
    name: string;
    avatar?: string;
  };
};
type Module = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration: string;
  status: 'published' | 'draft';
  type: 'module' | 'video' | 'document' | 'quiz';
};
const LearningPathsPage = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isCreatingPath, setIsCreatingPath] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [pathTitle, setPathTitle] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [availableModules, setAvailableModules] = useState<Module[]>([]);
  const [searchModuleTerm, setSearchModuleTerm] = useState('');
  // Sample learning paths
  const learningPaths: LearningPath[] = [{
    id: '1',
    title: 'Sales Onboarding Program',
    description: 'A comprehensive onboarding path for new sales representatives.',
    thumbnail: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-05-10',
    dateUpdated: '2023-06-15',
    totalModules: 5,
    estimatedDuration: '8h 30m',
    completionRate: 72,
    assignedCount: 28,
    author: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  }, {
    id: '2',
    title: 'Advanced Sales Techniques',
    description: 'Master advanced selling strategies and techniques to close more deals.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-04-20',
    dateUpdated: '2023-05-25',
    totalModules: 4,
    estimatedDuration: '6h 15m',
    completionRate: 58,
    assignedCount: 22,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  }, {
    id: '3',
    title: 'Product Knowledge Certification',
    description: 'Complete training path to become certified on our product offerings.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'published',
    dateCreated: '2023-06-05',
    dateUpdated: '2023-06-05',
    totalModules: 3,
    estimatedDuration: '4h 45m',
    completionRate: 85,
    assignedCount: 45,
    author: {
      name: 'Michael Lee',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  }, {
    id: '4',
    title: 'Objection Handling Mastery',
    description: 'Learn to effectively handle and overcome common sales objections.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'draft',
    dateCreated: '2023-06-18',
    dateUpdated: '2023-06-20',
    totalModules: 2,
    estimatedDuration: '3h 20m',
    author: {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }, {
    id: '5',
    title: 'Consultative Selling',
    description: 'Develop consultative selling skills to better serve customers and increase sales.',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'archived',
    dateCreated: '2023-03-10',
    dateUpdated: '2023-04-15',
    totalModules: 6,
    estimatedDuration: '9h 00m',
    completionRate: 42,
    assignedCount: 15,
    author: {
      name: 'Robert Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  }];
  // Sample available modules for learning paths
  const mockAvailableModules: Module[] = [{
    id: 'm1',
    title: 'Sales Methodology Fundamentals',
    description: 'Learn the core principles of our sales methodology.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '2h 30m',
    status: 'published',
    type: 'module'
  }, {
    id: 'm2',
    title: 'Objection Handling Techniques',
    description: 'Master the art of handling common customer objections.',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '1h 45m',
    status: 'published',
    type: 'module'
  }, {
    id: 'm3',
    title: 'Product Knowledge - Q2 Updates',
    description: 'Get up to speed with the latest product features and updates.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '1h 15m',
    status: 'published',
    type: 'module'
  }, {
    id: 'm4',
    title: 'Discovery Call Best Practices',
    description: 'Learn best practices for effective discovery calls.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '45m',
    status: 'published',
    type: 'video'
  }, {
    id: 'm5',
    title: 'Competitive Analysis Guide',
    description: 'Comprehensive guide to our competitors and positioning.',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '30m',
    status: 'published',
    type: 'document'
  }, {
    id: 'm6',
    title: 'Product Certification Quiz',
    description: 'Test your knowledge of our products.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '20m',
    status: 'published',
    type: 'quiz'
  }];
  // Filter learning paths based on search and filters
  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || path.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  // Filter available modules based on search
  const filteredModules = availableModules.filter(module => module.title.toLowerCase().includes(searchModuleTerm.toLowerCase()) || module.description.toLowerCase().includes(searchModuleTerm.toLowerCase()));
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
  // Handle learning path actions
  const handleEdit = (path: LearningPath) => {
    setSelectedPath(path);
    setPathTitle(path.title);
    setPathDescription(path.description);
    setIsCreatingPath(true);
    // In a real app, you would fetch the modules assigned to this path
    setSelectedModules(mockAvailableModules.slice(0, 3));
    setAvailableModules(mockAvailableModules.filter((_, index) => index >= 3));
    setShowActionMenu(null);
  };
  const handleDelete = (id: string) => {
    toast.info(`Deleting learning path: ${id}`);
    setShowActionMenu(null);
  };
  const handleAssign = (id: string) => {
    toast.info(`Assigning learning path: ${id}`);
    setShowActionMenu(null);
  };
  const handleDuplicate = (id: string) => {
    toast.info(`Duplicating learning path: ${id}`);
    setShowActionMenu(null);
  };
  const handleCreatePath = () => {
    setSelectedPath(null);
    setPathTitle('');
    setPathDescription('');
    setSelectedModules([]);
    setAvailableModules(mockAvailableModules);
    setIsCreatingPath(true);
  };
  const handleSavePath = (status: 'draft' | 'published') => {
    if (!pathTitle.trim()) {
      toast.error('Learning path title is required');
      return;
    }
    if (selectedModules.length === 0) {
      toast.error('Learning path must have at least one module');
      return;
    }
    const pathData = {
      title: pathTitle,
      description: pathDescription,
      modules: selectedModules,
      status
    };
    console.log('Saving learning path:', pathData);
    toast.success(`Learning path ${status === 'published' ? 'published' : 'saved as draft'}`);
    setIsCreatingPath(false);
  };
  // Handle module selection
  const addModuleToPath = (module: Module) => {
    setSelectedModules([...selectedModules, module]);
    setAvailableModules(availableModules.filter(m => m.id !== module.id));
  };
  const removeModuleFromPath = (module: Module) => {
    setSelectedModules(selectedModules.filter(m => m.id !== module.id));
    setAvailableModules([...availableModules, module]);
  };
  const moveModule = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= selectedModules.length) return;
    const newModules = [...selectedModules];
    const [movedModule] = newModules.splice(fromIndex, 1);
    newModules.splice(toIndex, 0, movedModule);
    setSelectedModules(newModules);
  };
  // Get module type icon
  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <BookOpenIcon className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <PlayIcon className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileTextIcon className="h-5 w-5 text-green-500" />;
      case 'quiz':
        return <HelpCircleIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <BookOpenIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  return <DashboardLayout title="Learning Paths">
      <div className="mb-6">
        {!isCreatingPath ? <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Learning Paths</h2>
                <p className="text-gray-600 mt-1">
                  Create and manage structured learning journeys for your team
                </p>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleCreatePath}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Learning Path
              </button>
            </div>
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-3 md:space-y-0">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search learning paths..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex space-x-2">
                <div className="relative inline-block text-left">
                  <select className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
            {/* Learning Paths List */}
            {filteredPaths.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No learning paths found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? `No results found for "${searchTerm}". Try adjusting your search or filters.` : "You haven't created any learning paths yet."}
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleCreatePath}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Learning Path
                </button>
              </div> : <div className="space-y-6">
                {filteredPaths.map(path => <div key={path.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48">
                        {path.thumbnail ? <img src={path.thumbnail} alt={path.title} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <BookOpenIcon className="h-12 w-12 text-gray-400" />
                          </div>}
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-2">
                              {getStatusBadge(path.status)}
                            </div>
                            <h3 className="text-xl font-medium mb-2">
                              {path.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {path.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <BookOpenIcon className="h-5 w-5 mr-1" />
                                <span>{path.totalModules} Modules</span>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 mr-1" />
                                <span>{path.estimatedDuration}</span>
                              </div>
                              {path.assignedCount !== undefined && <div className="flex items-center">
                                  <UsersIcon className="h-5 w-5 mr-1" />
                                  <span>{path.assignedCount} Assigned</span>
                                </div>}
                              {path.completionRate !== undefined && <div className="flex items-center">
                                  <CheckCircleIcon className="h-5 w-5 mr-1" />
                                  <span>{path.completionRate}% Completion</span>
                                </div>}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button onClick={() => handleEdit(path)} className="p-1 text-gray-500 hover:text-blue-600">
                              <EditIcon className="h-5 w-5" />
                            </button>
                            <div className="relative">
                              <button onClick={() => setShowActionMenu(showActionMenu === path.id ? null : path.id)} className="p-1 text-gray-500 hover:text-blue-600">
                                <MoreHorizontalIcon className="h-5 w-5" />
                              </button>
                              {showActionMenu === path.id && <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                                  <button onClick={() => handleEdit(path)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    <EditIcon className="mr-3 h-4 w-4 text-gray-500" />
                                    Edit
                                  </button>
                                  <button onClick={() => handleAssign(path.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    <UsersIcon className="mr-3 h-4 w-4 text-gray-500" />
                                    Assign
                                  </button>
                                  <button onClick={() => handleDuplicate(path.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    <BookOpenIcon className="mr-3 h-4 w-4 text-gray-500" />
                                    Duplicate
                                  </button>
                                  <button onClick={() => handleDelete(path.id)} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                                    <TrashIcon className="mr-3 h-4 w-4 text-red-500" />
                                    Delete
                                  </button>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>
                          Created by {path.author.name} • Updated{' '}
                          {path.dateUpdated}
                        </span>
                      </div>
                      <button className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-800" onClick={() => handleEdit(path)}>
                        View Details
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>)}
              </div>}
          </> :
      // Learning Path Creator/Editor
      <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {selectedPath ? `Edit Learning Path: ${selectedPath.title}` : 'Create New Learning Path'}
              </h2>
              <button onClick={() => setIsCreatingPath(false)} className="text-gray-600 hover:text-gray-900">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="pathTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Learning Path Title*
                  </label>
                  <input type="text" id="pathTitle" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={pathTitle} onChange={e => setPathTitle(e.target.value)} placeholder="Enter learning path title" />
                </div>
                <div>
                  <label htmlFor="pathDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea id="pathDescription" rows={4} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={pathDescription} onChange={e => setPathDescription(e.target.value)} placeholder="Enter learning path description"></textarea>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6 h-fit">
                  <h3 className="text-lg font-medium mb-4">Selected Modules</h3>
                  {selectedModules.length > 0 ? <div className="space-y-3">
                      {selectedModules.map((module, index) => <div key={module.id} className="flex items-center p-3 rounded-md border border-gray-200">
                          <div className="cursor-move mr-2">
                            <GripVerticalIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              {getModuleTypeIcon(module.type)}
                              <p className="ml-2 text-sm font-medium text-gray-900 truncate">
                                {module.title}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {module.duration}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            {index > 0 && <button type="button" onClick={() => moveModule(index, index - 1)} className="text-gray-400 hover:text-gray-500">
                                <ArrowUpIcon className="h-4 w-4" />
                              </button>}
                            {index < selectedModules.length - 1 && <button type="button" onClick={() => moveModule(index, index + 1)} className="text-gray-400 hover:text-gray-500">
                                <ArrowDownIcon className="h-4 w-4" />
                              </button>}
                            <button type="button" onClick={() => removeModuleFromPath(module)} className="text-red-400 hover:text-red-500">
                              <XIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>)}
                    </div> : <div className="text-center py-8 bg-gray-50 rounded-md">
                      <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No modules selected</p>
                      <p className="text-sm text-gray-500">
                        Add modules from the right panel
                      </p>
                    </div>}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {selectedModules.length} modules selected
                      </span>
                      <span className="text-sm text-gray-500">
                        Estimated duration:{' '}
                        {selectedModules.reduce((total, module) => {
                      const duration = module.duration;
                      const hours = parseInt(duration.split('h')[0]) || 0;
                      const minutes = parseInt(duration.split('h ')[1]?.split('m')[0]) || 0;
                      return total + hours * 60 + minutes;
                    }, 0)}{' '}
                        min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Available Modules</h3>
                    <div className="relative w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search modules..." value={searchModuleTerm} onChange={e => setSearchModuleTerm(e.target.value)} />
                    </div>
                  </div>
                  {filteredModules.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredModules.map(module => <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300">
                          <div className="h-32 relative">
                            {module.thumbnail ? <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                {getModuleTypeIcon(module.type)}
                              </div>}
                            <div className="absolute top-2 right-2">
                              {getStatusBadge(module.status)}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center mb-1">
                              {getModuleTypeIcon(module.type)}
                              <span className="ml-2 text-sm text-gray-600 capitalize">
                                {module.type}
                              </span>
                            </div>
                            <h4 className="font-medium mb-1">{module.title}</h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {module.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                <span>{module.duration}</span>
                              </div>
                              <button onClick={() => addModuleToPath(module)} className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <PlusIcon className="h-3 w-3 mr-1" />
                                Add
                              </button>
                            </div>
                          </div>
                        </div>)}
                    </div> : <div className="text-center py-8 bg-gray-50 rounded-md">
                      <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No modules available</p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search or create new modules
                      </p>
                    </div>}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button type="button" onClick={() => setIsCreatingPath(false)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button type="button" onClick={() => handleSavePath('draft')} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save as Draft
              </button>
              <button type="button" onClick={() => handleSavePath('published')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Publish
              </button>
            </div>
          </div>}
      </div>
    </DashboardLayout>;
};
// Additional components
const PlayIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>;
const FileTextIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>;
const HelpCircleIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>;
const ArrowUpIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>;
const ArrowDownIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>;
export default LearningPathsPage;