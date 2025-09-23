import React, { useState } from 'react';
import { XIcon, BookOpenIcon, CalendarIcon, ClockIcon, UserIcon, UsersIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, EditIcon, RefreshCwIcon, FileTextIcon, ArrowRightIcon, DownloadIcon } from 'lucide-react';
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
type AssignmentDetailModalProps = {
  assignment: Assignment;
  onClose: () => void;
  onEdit: () => void;
  onSendReminder: () => void;
};
const AssignmentDetailModal: React.FC<AssignmentDetailModalProps> = ({
  assignment,
  onClose,
  onEdit,
  onSendReminder
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'progress' | 'history'>('details');
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending
          </span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            <RefreshCwIcon className="h-3 w-3 mr-1" />
            In Progress
          </span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Completed
          </span>;
      case 'overdue':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Overdue
          </span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Failed
          </span>;
      default:
        return null;
    }
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
        return <UserIcon className="h-4 w-4 text-gray-500" />;
      case 'team':
        return <UsersIcon className="h-4 w-4 text-gray-500" />;
      case 'department':
        return <UsersIcon className="h-4 w-4 text-gray-500" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  // Sample activity history data
  const activityHistory = [{
    id: '1',
    date: '2023-06-28 14:32',
    action: 'Assignment created',
    user: assignment.assignedBy.name
  }, {
    id: '2',
    date: '2023-06-28 14:35',
    action: 'Assignment notification sent',
    user: 'System'
  }, {
    id: '3',
    date: '2023-06-29 09:15',
    action: 'Assignment started',
    user: assignment.assignedTo.type === 'individual' ? assignment.assignedTo.name : 'First team member'
  }, {
    id: '4',
    date: '2023-07-02 11:20',
    action: 'Progress update (35%)',
    user: assignment.assignedTo.type === 'individual' ? assignment.assignedTo.name : 'System'
  }, {
    id: '5',
    date: '2023-07-05 16:45',
    action: 'Reminder sent',
    user: 'System'
  }];
  // Sample progress data for teams/departments
  const individualProgress = assignment.assignedTo.type !== 'individual' ? [{
    name: 'Alex Johnson',
    status: 'completed',
    progress: 100,
    completionDate: '2023-07-01'
  }, {
    name: 'Maria Garcia',
    status: 'in_progress',
    progress: 75
  }, {
    name: 'James Wilson',
    status: 'in_progress',
    progress: 60
  }, {
    name: 'Sarah Brown',
    status: 'overdue',
    progress: 30
  }, {
    name: 'David Lee',
    status: 'pending',
    progress: 0
  }] : [];
  // Sample content sections data
  const contentSections = assignment.type === 'learning_path' ? [{
    title: 'Module 1: Introduction',
    type: 'module',
    status: 'completed',
    progress: 100
  }, {
    title: 'Module 2: Core Concepts',
    type: 'module',
    status: 'completed',
    progress: 100
  }, {
    title: 'Quiz 1: Fundamentals',
    type: 'quiz',
    status: 'completed',
    progress: 100
  }, {
    title: 'Module 3: Advanced Techniques',
    type: 'module',
    status: 'in_progress',
    progress: 60
  }, {
    title: 'Module 4: Case Studies',
    type: 'module',
    status: 'pending',
    progress: 0
  }, {
    title: 'Final Assessment',
    type: 'quiz',
    status: 'pending',
    progress: 0
  }] : [];
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              {assignment.content.thumbnail ? <img src={assignment.content.thumbnail} alt={assignment.content.title} className="h-10 w-10 rounded object-cover" /> : <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                  {getContentTypeIcon(assignment.content.type)}
                </div>}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {assignment.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span className="capitalize">
                  {assignment.type.replace('_', ' ')}
                </span>
                <span className="mx-2">•</span>
                <span>{getStatusBadge(assignment.status)}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="border-b">
          <nav className="-mb-px flex space-x-8 px-6">
            <button className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('details')}>
              Assignment Details
            </button>
            {(assignment.type === 'learning_path' || assignment.assignedTo.type !== 'individual') && <button className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'progress' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('progress')}>
                Detailed Progress
              </button>}
            <button className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('history')}>
              Activity History
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Assignment Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  {assignment.description && <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="text-gray-700">{assignment.description}</p>
                    </div>}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Status
                      </p>
                      <p className="text-gray-700">
                        {getStatusBadge(assignment.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Type
                      </p>
                      <div className="flex items-center">
                        {getContentTypeIcon(assignment.type)}
                        <p className="ml-1 text-gray-700 capitalize">
                          {assignment.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Assigned Date
                      </p>
                      <p className="text-gray-700">{assignment.assignedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Due Date
                      </p>
                      <p className="text-gray-700">{assignment.dueDate}</p>
                    </div>
                    {assignment.completionDate && <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Completion Date
                        </p>
                        <p className="text-gray-700">
                          {assignment.completionDate}
                        </p>
                      </div>}
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-4">
                  Content Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 h-12 w-12">
                      {assignment.content.thumbnail ? <img src={assignment.content.thumbnail} alt={assignment.content.title} className="h-12 w-12 rounded object-cover" /> : <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                          {getContentTypeIcon(assignment.content.type)}
                        </div>}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">
                        {assignment.content.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="capitalize">
                          {assignment.content.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                      View Content
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </button>
                    {(assignment.type === 'module' || assignment.type === 'document') && <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                        <DownloadIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Assignee Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-10 w-10">
                      {assignment.assignedTo.avatar ? <img src={assignment.assignedTo.avatar} alt={assignment.assignedTo.name} className="h-10 w-10 rounded-full" /> : <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {getAssigneeIcon(assignment.assignedTo.type)}
                        </div>}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">
                        {assignment.assignedTo.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="capitalize">
                          {assignment.assignedTo.type}
                        </span>
                        {assignment.assignedTo.count && <span className="ml-1">
                            ({assignment.assignedTo.count} members)
                          </span>}
                      </div>
                    </div>
                  </div>
                  {assignment.assignedTo.type !== 'individual' && <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Team Progress Overview
                      </p>
                      <div className="mb-2">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-500">
                            Overall Completion
                          </span>
                          <span className="font-medium">
                            {assignment.progress || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${(assignment.progress || 0) >= 80 ? 'bg-green-500' : (assignment.progress || 0) >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                      width: `${assignment.progress || 0}%`
                    }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {assignment.assignedTo.count && Math.round((assignment.progress || 0) * assignment.assignedTo.count / 100)}{' '}
                          of {assignment.assignedTo.count} completed
                        </span>
                        <button className="text-blue-600 hover:text-blue-800" onClick={() => setActiveTab('progress')}>
                          View Details
                        </button>
                      </div>
                    </div>}
                </div>
                <h3 className="text-lg font-medium mb-4">
                  Assignment Progress
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {assignment.progress !== undefined ? <>
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">
                            {assignment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${assignment.progress >= 80 ? 'bg-green-500' : assignment.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                      width: `${assignment.progress}%`
                    }}></div>
                        </div>
                      </div>
                      {assignment.status === 'completed' && <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              Assignment Completed
                            </p>
                            <p className="text-xs text-green-700">
                              Completed on {assignment.completionDate}
                            </p>
                          </div>
                        </div>}
                      {assignment.status === 'failed' && <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                          <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-red-800">
                              Assignment Failed
                            </p>
                            <p className="text-xs text-red-700">
                              Failed on {assignment.completionDate}
                            </p>
                          </div>
                        </div>}
                      {assignment.status === 'overdue' && <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                          <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-red-800">
                              Assignment Overdue
                            </p>
                            <p className="text-xs text-red-700">
                              Due date was {assignment.dueDate}
                            </p>
                          </div>
                        </div>}
                      {(assignment.status === 'pending' || assignment.status === 'in_progress') && <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center">
                          <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">
                              {assignment.status === 'pending' ? 'Assignment Pending' : 'Assignment In Progress'}
                            </p>
                            <p className="text-xs text-blue-700">
                              Due on {assignment.dueDate}
                            </p>
                          </div>
                        </div>}
                    </> : <div className="text-center py-4">
                      <p className="text-gray-500">
                        No progress data available
                      </p>
                    </div>}
                </div>
              </div>
            </div>}
          {activeTab === 'progress' && <div>
              {assignment.type === 'learning_path' && <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    Learning Path Progress
                  </h3>
                  <div className="bg-white border rounded-lg divide-y">
                    {contentSections.map((section, index) => <div key={index} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start">
                            {getContentTypeIcon(section.type)}
                            <h4 className="ml-2 font-medium">
                              {section.title}
                            </h4>
                          </div>
                          {getStatusBadge(section.status)}
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">
                              {section.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${section.progress >= 80 ? 'bg-green-500' : section.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                      width: `${section.progress}%`
                    }}></div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}
              {assignment.assignedTo.type !== 'individual' && <div>
                  <h3 className="text-lg font-medium mb-4">
                    Individual Progress
                  </h3>
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Progress
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Completion Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {individualProgress.map((person, index) => <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {person.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(person.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-full max-w-xs">
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="font-medium">
                                    {person.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${person.progress >= 80 ? 'bg-green-500' : person.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                            width: `${person.progress}%`
                          }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {person.completionDate || '-'}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
            </div>}
          {activeTab === 'history' && <div>
              <h3 className="text-lg font-medium mb-4">Activity History</h3>
              <div className="bg-white border rounded-lg divide-y">
                {activityHistory.map(activity => <div key={activity.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">
                          By {activity.user}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Assigned by:</span>{' '}
              {assignment.assignedBy.name}
            </p>
          </div>
          <div className="flex space-x-4">
            <button onClick={onSendReminder} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <RefreshCwIcon className="h-4 w-4 inline mr-1" />
              Send Reminder
            </button>
            <button onClick={onEdit} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <EditIcon className="h-4 w-4 inline mr-1" />
              Edit Assignment
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default AssignmentDetailModal;