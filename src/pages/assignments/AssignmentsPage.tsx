import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Plus, CheckCircle, XCircle, Clock, AlertCircle, FileText, MoreHorizontal, Eye, Edit, Trash, Calendar, RefreshCw, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import AssignmentDetailModal from '../../components/assignments/AssignmentDetailModal';
import AssignmentCreationModal from '../../components/assignments/AssignmentCreationModal';
import { motion, AnimatePresence } from 'framer-motion';
type Assignment = {
  id: string;
  title: string;
  type: 'module' | 'learning_path' | 'quiz' | 'certification';
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'failed';
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
    type: 'individual' | 'team' | 'department';
    count?: number;
  };
  assignedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: {
    id: string;
    title: string;
    type: 'module' | 'learning_path' | 'quiz' | 'certification';
    thumbnail?: string;
  };
  progress?: number;
  dueDate: string;
  assignedDate: string;
  completionDate?: string;
};
const AssignmentsPage = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  const [hoveredAssignment, setHoveredAssignment] = useState<string | null>(null);
  // Sample assignments data
  const assignments: Assignment[] = [{
    id: '1',
    title: 'Sales Methodology Training',
    type: 'module',
    description: 'Complete the core sales methodology training module to understand our sales process.',
    status: 'in_progress',
    assignedTo: {
      id: 'u1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      type: 'individual'
    },
    assignedBy: {
      id: 'a1',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: {
      id: 'c1',
      title: 'Sales Methodology Fundamentals',
      type: 'module',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 65,
    dueDate: '2023-07-15',
    assignedDate: '2023-06-28'
  }, {
    id: '2',
    title: 'Product Knowledge Certification',
    type: 'certification',
    description: 'Complete the product knowledge certification to demonstrate expertise in our product offerings.',
    status: 'pending',
    assignedTo: {
      id: 't1',
      name: 'Sales Team Alpha',
      type: 'team',
      count: 8
    },
    assignedBy: {
      id: 'a1',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: {
      id: 'c2',
      title: 'Product Knowledge Certification',
      type: 'certification',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    dueDate: '2023-07-30',
    assignedDate: '2023-06-25'
  }, {
    id: '3',
    title: 'Objection Handling Skills',
    type: 'module',
    description: 'Learn advanced techniques for handling customer objections effectively.',
    status: 'completed',
    assignedTo: {
      id: 'u2',
      name: 'Michael Lee',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      type: 'individual'
    },
    assignedBy: {
      id: 'a2',
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    content: {
      id: 'c3',
      title: 'Objection Handling Techniques',
      type: 'module',
      thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 100,
    dueDate: '2023-06-20',
    assignedDate: '2023-06-10',
    completionDate: '2023-06-18'
  }, {
    id: '4',
    title: 'Quarterly Sales Assessment',
    type: 'quiz',
    description: 'Complete the quarterly sales assessment to evaluate your knowledge and skills.',
    status: 'failed',
    assignedTo: {
      id: 'u3',
      name: 'Robert Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      type: 'individual'
    },
    assignedBy: {
      id: 'a1',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: {
      id: 'c4',
      title: 'Q2 Sales Assessment',
      type: 'quiz',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 80,
    dueDate: '2023-06-30',
    assignedDate: '2023-06-15',
    completionDate: '2023-06-28'
  }, {
    id: '5',
    title: 'Sales Career Path',
    type: 'learning_path',
    description: 'Complete this learning path to advance your sales career and develop essential skills.',
    status: 'in_progress',
    assignedTo: {
      id: 'd1',
      name: 'Sales Department',
      type: 'department',
      count: 24
    },
    assignedBy: {
      id: 'a1',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: {
      id: 'c5',
      title: 'Sales Career Development Path',
      type: 'learning_path',
      thumbnail: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 45,
    dueDate: '2023-09-30',
    assignedDate: '2023-06-01'
  }, {
    id: '6',
    title: 'Discovery Call Training',
    type: 'module',
    description: 'Learn best practices for conducting effective discovery calls with prospects.',
    status: 'overdue',
    assignedTo: {
      id: 'u4',
      name: 'Jennifer Miller',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      type: 'individual'
    },
    assignedBy: {
      id: 'a2',
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    content: {
      id: 'c6',
      title: 'Discovery Call Best Practices',
      type: 'module',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 30,
    dueDate: '2023-06-15',
    assignedDate: '2023-06-01'
  }, {
    id: '7',
    title: 'Negotiation Skills Path',
    type: 'learning_path',
    description: 'Master the art of negotiation with this comprehensive learning path.',
    status: 'in_progress',
    assignedTo: {
      id: 't2',
      name: 'Enterprise Sales Team',
      type: 'team',
      count: 12
    },
    assignedBy: {
      id: 'a1',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: {
      id: 'c7',
      title: 'Advanced Negotiation Techniques',
      type: 'learning_path',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    progress: 50,
    dueDate: '2023-08-15',
    assignedDate: '2023-06-10'
  }, {
    id: '8',
    title: 'Competitive Analysis Training',
    type: 'module',
    description: 'Learn how to effectively analyze and position against competitors.',
    status: 'pending',
    assignedTo: {
      id: 'u5',
      name: 'David Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      type: 'individual'
    },
    assignedBy: {
      id: 'a2',
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    content: {
      id: 'c8',
      title: 'Competitive Analysis Guide',
      type: 'module',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    dueDate: '2023-07-20',
    assignedDate: '2023-06-20'
  }];
  // Filter assignments based on search and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || assignment.description?.toLowerCase().includes(searchTerm.toLowerCase()) || assignment.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesType = filterType === 'all' || assignment.type === filterType;
    const matchesAssignee = filterAssignee === 'all' || filterAssignee === 'individual' && assignment.assignedTo.type === 'individual' || filterAssignee === 'team' && assignment.assignedTo.type === 'team' || filterAssignee === 'department' && assignment.assignedTo.type === 'department';
    return matchesSearch && matchesStatus && matchesType && matchesAssignee;
  });
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="flex items-center text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-xs">Pending</span>
          </div>;
      case 'in_progress':
        return <div className="flex items-center text-blue-600">
            <RefreshCw className="h-3 w-3 mr-1" />
            <span className="text-xs">In Progress</span>
          </div>;
      case 'completed':
        return <div className="flex items-center text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">Completed</span>
          </div>;
      case 'overdue':
        return <div className="flex items-center text-red-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">Overdue</span>
          </div>;
      case 'failed':
        return <div className="flex items-center text-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">Failed</span>
          </div>;
      default:
        return null;
    }
  };
  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'learning_path':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'quiz':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case 'certification':
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  // Handle assignment actions
  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
  };
  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowCreateModal(true);
  };
  const handleDeleteAssignment = (id: string) => {
    toast.success(`Assignment deleted`);
  };
  const handleCreateAssignment = () => {
    setSelectedAssignment(null);
    setShowCreateModal(true);
  };
  const handleSendReminder = (id: string) => {
    toast.success(`Reminder sent`);
  };
  const toggleExpandAssignment = (id: string) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };
  return <DashboardLayout title="Assignments">
      <div className="mb-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium text-gray-800">Assignments</h2>
          <button onClick={handleCreateAssignment} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
            <Plus className="h-4 w-4 mr-2" />
            <span>New Assignment</span>
          </button>
        </div>
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Search assignments..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center px-4 py-2 border rounded-md transition-colors duration-200 ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <Filter className="h-4 w-4 mr-2" />
              <span>Filters</span>
            </button>
          </div>
          <AnimatePresence>
            {showFilters && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.2
          }} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" value={filterType} onChange={e => setFilterType(e.target.value)}>
                      <option value="all">All Types</option>
                      <option value="module">Modules</option>
                      <option value="learning_path">Learning Paths</option>
                      <option value="quiz">Quizzes</option>
                      <option value="certification">Certifications</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assignee
                    </label>
                    <select className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)}>
                      <option value="all">All Assignees</option>
                      <option value="individual">Individuals</option>
                      <option value="team">Teams</option>
                      <option value="department">Departments</option>
                    </select>
                  </div>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
        {/* Assignments List */}
        {filteredAssignments.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all' || filterAssignee !== 'all' ? `No results match your current filters. Try adjusting your search or filters.` : "You haven't created any assignments yet."}
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleCreateAssignment}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Assignment
            </button>
          </div> : <div className="space-y-4">
            {filteredAssignments.map(assignment => <motion.div key={assignment.id} className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 ${hoveredAssignment === assignment.id ? 'border-blue-200' : ''}`} onMouseEnter={() => setHoveredAssignment(assignment.id)} onMouseLeave={() => setHoveredAssignment(null)} layoutId={assignment.id} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.2
        }}>
                <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => toggleExpandAssignment(assignment.id)}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                      {assignment.content.thumbnail ? <img src={assignment.content.thumbnail} alt="" className="w-full h-full object-cover" /> : getContentTypeIcon(assignment.type)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-800">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        {getStatusBadge(assignment.status)}
                        <span className="mx-2 text-gray-300">•</span>
                        <div className="text-xs text-gray-500">
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {assignment.progress !== undefined && <div className="hidden sm:block mr-6">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div className={`h-1.5 rounded-full ${assignment.progress >= 80 ? 'bg-green-500' : assignment.progress >= 40 ? 'bg-blue-500' : 'bg-red-500'}`} style={{
                      width: `${assignment.progress}%`
                    }} />
                          </div>
                          <span className="text-xs text-gray-500">
                            {assignment.progress}%
                          </span>
                        </div>
                      </div>}
                    <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${expandedAssignment === assignment.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedAssignment === assignment.id && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="overflow-hidden border-t border-gray-100">
                      <div className="p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Description
                              </h4>
                              <p className="text-sm text-gray-600">
                                {assignment.description || `Complete this ${assignment.type.replace('_', ' ')} assignment.`}
                              </p>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Assigned To
                              </h4>
                              <div className="flex items-center">
                                {assignment.assignedTo.avatar ? <img src={assignment.assignedTo.avatar} alt="" className="w-6 h-6 rounded-full mr-2" /> : <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>}
                                <span className="text-sm text-gray-600">
                                  {assignment.assignedTo.name}
                                  {assignment.assignedTo.type !== 'individual' && assignment.assignedTo.count && ` (${assignment.assignedTo.count} members)`}
                                </span>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Dates
                              </h4>
                              <div className="text-sm text-gray-600">
                                <div className="flex items-center mb-1">
                                  <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                  <span>
                                    Assigned: {assignment.assignedDate}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                  <span>Due: {assignment.dueDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {assignment.progress !== undefined && <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-1">
                                  Progress
                                </h4>
                                <div className="mb-1 flex justify-between items-center">
                                  <span className="text-sm text-gray-600">
                                    Completion
                                  </span>
                                  <span className="text-sm font-medium">
                                    {assignment.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className={`h-2 rounded-full ${assignment.progress >= 80 ? 'bg-green-500' : assignment.progress >= 40 ? 'bg-blue-500' : 'bg-red-500'}`} style={{
                          width: `${assignment.progress}%`
                        }} />
                                </div>
                              </div>}
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => handleViewAssignment(assignment)} className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200">
                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                Details
                              </button>
                              <button onClick={() => handleEditAssignment(assignment)} className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200">
                                <Edit className="h-3.5 w-3.5 mr-1.5" />
                                Edit
                              </button>
                              <button onClick={() => handleSendReminder(assignment.id)} className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200">
                                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                                Remind
                              </button>
                              <button onClick={() => handleDeleteAssignment(assignment.id)} className="flex items-center px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors duration-200">
                                <Trash className="h-3.5 w-3.5 mr-1.5" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </motion.div>)}
          </div>}
      </div>
      {/* Assignment Detail Modal */}
      {showDetailModal && selectedAssignment && <AssignmentDetailModal assignment={selectedAssignment} onClose={() => setShowDetailModal(false)} onEdit={() => {
      setShowDetailModal(false);
      setShowCreateModal(true);
    }} onSendReminder={() => {
      handleSendReminder(selectedAssignment.id);
      setShowDetailModal(false);
    }} />}
      {/* Assignment Creation/Edit Modal */}
      {showCreateModal && <AssignmentCreationModal assignment={selectedAssignment} onClose={() => setShowCreateModal(false)} onSave={data => {
      toast.success(selectedAssignment ? 'Assignment updated' : 'Assignment created');
      setShowCreateModal(false);
    }} />}
    </DashboardLayout>;
};
export default AssignmentsPage;