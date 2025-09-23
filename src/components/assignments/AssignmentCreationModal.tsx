import React, { useEffect, useState } from 'react';
import { XIcon, BookOpenIcon, FileTextIcon, CheckCircleIcon, UserIcon, UsersIcon, CalendarIcon, SearchIcon, PlusIcon } from 'lucide-react';
import { toast } from 'react-toastify';
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
type AssignmentCreationModalProps = {
  assignment?: Assignment | null;
  onClose: () => void;
  onSave: (data: any) => void;
};
type ContentItem = {
  id: string;
  title: string;
  type: 'module' | 'learning_path' | 'quiz' | 'certification';
  thumbnail?: string;
  description?: string;
};
type Assignee = {
  id: string;
  name: string;
  avatar?: string;
  type: 'individual' | 'team' | 'department';
  count?: number;
};
const AssignmentCreationModal: React.FC<AssignmentCreationModalProps> = ({
  assignment,
  onClose,
  onSave
}) => {
  const isEditing = !!assignment;
  // Form state
  const [title, setTitle] = useState(assignment?.title || '');
  const [description, setDescription] = useState(assignment?.description || '');
  const [dueDate, setDueDate] = useState(assignment?.dueDate || '');
  const [selectedContentId, setSelectedContentId] = useState(assignment?.content.id || '');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(assignment?.assignedTo.id || '');
  const [selectedAssigneeType, setSelectedAssigneeType] = useState<'individual' | 'team' | 'department'>(assignment?.assignedTo.type || 'individual');
  const [sendNotification, setSendNotification] = useState(true);
  // Search and filter state
  const [contentSearchTerm, setContentSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState('');
  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  // Sample content data
  const contentItems: ContentItem[] = [{
    id: 'c1',
    title: 'Sales Methodology Fundamentals',
    type: 'module',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Learn the core principles of our sales methodology and how to apply them.'
  }, {
    id: 'c2',
    title: 'Product Knowledge Certification',
    type: 'certification',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Complete the product knowledge certification to demonstrate expertise.'
  }, {
    id: 'c3',
    title: 'Objection Handling Techniques',
    type: 'module',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Master the art of handling common customer objections with confidence.'
  }, {
    id: 'c4',
    title: 'Q2 Sales Assessment',
    type: 'quiz',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Evaluate your knowledge and skills with this quarterly assessment.'
  }, {
    id: 'c5',
    title: 'Sales Career Development Path',
    type: 'learning_path',
    thumbnail: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive learning path for sales career development.'
  }, {
    id: 'c6',
    title: 'Discovery Call Best Practices',
    type: 'module',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Learn best practices for conducting effective discovery calls.'
  }, {
    id: 'c7',
    title: 'Advanced Negotiation Techniques',
    type: 'learning_path',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Master the art of negotiation with this comprehensive learning path.'
  }, {
    id: 'c8',
    title: 'Competitive Analysis Guide',
    type: 'module',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Learn how to effectively analyze and position against competitors.'
  }];
  // Sample assignees data
  const assignees: Assignee[] = [{
    id: 'u1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: 'individual'
  }, {
    id: 'u2',
    name: 'Michael Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    type: 'individual'
  }, {
    id: 'u3',
    name: 'Robert Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    type: 'individual'
  }, {
    id: 'u4',
    name: 'Jennifer Miller',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    type: 'individual'
  }, {
    id: 'u5',
    name: 'David Chen',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    type: 'individual'
  }, {
    id: 't1',
    name: 'Sales Team Alpha',
    type: 'team',
    count: 8
  }, {
    id: 't2',
    name: 'Enterprise Sales Team',
    type: 'team',
    count: 12
  }, {
    id: 't3',
    name: 'SMB Sales Team',
    type: 'team',
    count: 15
  }, {
    id: 'd1',
    name: 'Sales Department',
    type: 'department',
    count: 45
  }, {
    id: 'd2',
    name: 'Customer Success',
    type: 'department',
    count: 18
  }];
  // Filter content based on search and type
  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(contentSearchTerm.toLowerCase()) || item.description?.toLowerCase().includes(contentSearchTerm.toLowerCase()) || false;
    const matchesType = contentTypeFilter === 'all' || item.type === contentTypeFilter;
    return matchesSearch && matchesType;
  });
  // Filter assignees based on search and type
  const filteredAssignees = assignees.filter(assignee => {
    const matchesSearch = assignee.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase());
    const matchesType = selectedAssigneeType === 'all' || assignee.type === selectedAssigneeType;
    return matchesSearch && matchesType;
  });
  // Get selected content and assignee
  const selectedContent = contentItems.find(item => item.id === selectedContentId);
  const selectedAssignee = assignees.find(assignee => assignee.id === selectedAssigneeId);
  // Validate form
  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Please enter an assignment title');
      return false;
    }
    if (!selectedContentId) {
      toast.error('Please select content to assign');
      return false;
    }
    if (!selectedAssigneeId) {
      toast.error('Please select an assignee');
      return false;
    }
    if (!dueDate) {
      toast.error('Please select a due date');
      return false;
    }
    return true;
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = {
      id: assignment?.id || `new-${Date.now()}`,
      title,
      description,
      type: selectedContent?.type || 'module',
      status: 'pending',
      assignedTo: selectedAssignee,
      assignedBy: {
        id: 'a1',
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      content: selectedContent,
      dueDate,
      assignedDate: new Date().toISOString().split('T')[0],
      sendNotification
    };
    onSave(formData);
  };
  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case 'learning_path':
        return <BookOpenIcon className="h-5 w-5 text-green-500" />;
      case 'quiz':
        return <CheckCircleIcon className="h-5 w-5 text-purple-500" />;
      case 'certification':
        return <BookOpenIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <FileTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  // Get assignee icon
  const getAssigneeIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <UserIcon className="h-5 w-5 text-blue-500" />;
      case 'team':
        return <UsersIcon className="h-5 w-5 text-green-500" />;
      case 'department':
        return <UsersIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedContentId) {
      toast.error('Please select content to assign');
      return;
    }
    if (currentStep === 2 && !selectedAssigneeId) {
      toast.error('Please select an assignee');
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  // Set minimum due date to tomorrow
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Assignment' : 'Create New Assignment'}
          </h2>
          <button onClick={onClose} className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                    Select Content
                  </span>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                    Choose Assignees
                  </span>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    3
                  </div>
                  <span className={`ml-2 text-sm font-medium ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                    Assignment Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          {/* Step 1: Select Content */}
          {currentStep === 1 && <div className="p-6">
              <h3 className="text-lg font-medium mb-4">
                Select Content to Assign
              </h3>
              <div className="mb-4 flex items-center space-x-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search content..." value={contentSearchTerm} onChange={e => setContentSearchTerm(e.target.value)} />
                </div>
                <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={contentTypeFilter} onChange={e => setContentTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="module">Modules</option>
                  <option value="learning_path">Learning Paths</option>
                  <option value="quiz">Quizzes</option>
                  <option value="certification">Certifications</option>
                </select>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {filteredContent.map(item => <div key={item.id} className={`border rounded-lg p-4 cursor-pointer ${selectedContentId === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedContentId(item.id)}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-12 w-12">
                          {item.thumbnail ? <img src={item.thumbnail} alt={item.title} className="h-12 w-12 rounded object-cover" /> : <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                              {getContentTypeIcon(item.type)}
                            </div>}
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            {getContentTypeIcon(item.type)}
                            <span className="ml-1 capitalize">
                              {item.type.replace('_', ' ')}
                            </span>
                          </div>
                          {item.description && <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {item.description}
                            </p>}
                        </div>
                        {selectedContentId === item.id && <div className="ml-2">
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <CheckIcon className="h-3 w-3 text-white" />
                            </div>
                          </div>}
                      </div>
                    </div>)}
                </div>
                {filteredContent.length === 0 && <div className="p-8 text-center">
                    <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No content found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filters
                    </p>
                  </div>}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Selected content:{' '}
                  {selectedContent ? selectedContent.title : 'None'}
                </p>
              </div>
            </div>}
          {/* Step 2: Choose Assignees */}
          {currentStep === 2 && <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Choose Assignees</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignee Type
                </label>
                <div className="flex space-x-4">
                  <button type="button" className={`px-4 py-2 border rounded-md ${selectedAssigneeType === 'individual' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setSelectedAssigneeType('individual')}>
                    <UserIcon className="h-4 w-4 inline mr-2" />
                    Individuals
                  </button>
                  <button type="button" className={`px-4 py-2 border rounded-md ${selectedAssigneeType === 'team' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setSelectedAssigneeType('team')}>
                    <UsersIcon className="h-4 w-4 inline mr-2" />
                    Teams
                  </button>
                  <button type="button" className={`px-4 py-2 border rounded-md ${selectedAssigneeType === 'department' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setSelectedAssigneeType('department')}>
                    <UsersIcon className="h-4 w-4 inline mr-2" />
                    Departments
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder={`Search ${selectedAssigneeType}s...`} value={assigneeSearchTerm} onChange={e => setAssigneeSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {filteredAssignees.map(assignee => <div key={assignee.id} className={`border rounded-lg p-4 cursor-pointer ${selectedAssigneeId === assignee.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedAssigneeId(assignee.id)}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {assignee.avatar ? <img src={assignee.avatar} alt={assignee.name} className="h-10 w-10 rounded-full" /> : <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              {getAssigneeIcon(assignee.type)}
                            </div>}
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium">{assignee.name}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="capitalize">{assignee.type}</span>
                            {assignee.count && <span className="ml-1">
                                ({assignee.count} members)
                              </span>}
                          </div>
                        </div>
                        {selectedAssigneeId === assignee.id && <div className="ml-2">
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <CheckIcon className="h-3 w-3 text-white" />
                            </div>
                          </div>}
                      </div>
                    </div>)}
                </div>
                {filteredAssignees.length === 0 && <div className="p-8 text-center">
                    <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No assignees found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or select a different type
                    </p>
                  </div>}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Selected assignee:{' '}
                  {selectedAssignee ? selectedAssignee.name : 'None'}
                </p>
              </div>
            </div>}
          {/* Step 3: Assignment Details */}
          {currentStep === 3 && <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Assignment Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Title*
                  </label>
                  <input type="text" id="title" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter assignment title" required />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea id="description" rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter assignment description" />
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="date" id="dueDate" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={dueDate} onChange={e => setDueDate(e.target.value)} min={getTomorrowDate()} required />
                  </div>
                </div>
                <div className="flex items-center">
                  <input id="sendNotification" name="sendNotification" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={sendNotification} onChange={e => setSendNotification(e.target.checked)} />
                  <label htmlFor="sendNotification" className="ml-2 block text-sm text-gray-900">
                    Send notification to assignees
                  </label>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Assignment Summary
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Content
                      </p>
                      {selectedContent ? <div className="flex items-center">
                          {getContentTypeIcon(selectedContent.type)}
                          <span className="ml-1 text-gray-900">
                            {selectedContent.title}
                          </span>
                        </div> : <p className="text-gray-500">No content selected</p>}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Assignee
                      </p>
                      {selectedAssignee ? <div className="flex items-center">
                          {getAssigneeIcon(selectedAssignee.type)}
                          <span className="ml-1 text-gray-900">
                            {selectedAssignee.name}
                          </span>
                        </div> : <p className="text-gray-500">No assignee selected</p>}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Due Date
                      </p>
                      <p className="text-gray-900">{dueDate || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Status
                      </p>
                      <p className="text-gray-900">Will be set to Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </form>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
          {currentStep > 1 ? <button type="button" onClick={handlePreviousStep} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Back
            </button> : <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>}
          {currentStep < 3 ? <button type="button" onClick={handleNextStep} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Continue
            </button> : <button type="submit" onClick={handleSubmit} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isEditing ? 'Save Changes' : 'Create Assignment'}
            </button>}
        </div>
      </div>
    </div>;
};
// CheckIcon component
const CheckIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>;
export default AssignmentCreationModal;