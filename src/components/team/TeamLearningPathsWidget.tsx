import React from 'react';
import { BookOpenIcon, CheckCircleIcon, AlertTriangleIcon, ClockIcon } from 'lucide-react';
const TeamLearningPathsWidget: React.FC = () => {
  // Sample learning paths data
  const learningPaths = [{
    id: '1',
    name: 'Sales Methodology Fundamentals',
    description: 'Core sales process and methodology training',
    progress: 85,
    dueDate: '2023-08-15',
    completed: 5,
    total: 6,
    status: 'on_track'
  }, {
    id: '2',
    name: 'Advanced Negotiation Techniques',
    description: 'Advanced training for handling complex negotiations',
    progress: 45,
    dueDate: '2023-07-30',
    completed: 2,
    total: 6,
    status: 'at_risk'
  }, {
    id: '3',
    name: 'Product Knowledge - Q2 Updates',
    description: 'Latest product features and updates',
    progress: 68,
    dueDate: '2023-09-10',
    completed: 4,
    total: 6,
    status: 'attention'
  }];
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'attention':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'at_risk':
        return <AlertTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'On Track';
      case 'attention':
        return 'Needs Attention';
      case 'at_risk':
        return 'At Risk';
      default:
        return 'Unknown';
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-800';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'at_risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Team Learning Paths</h3>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
          View All Paths
        </button>
      </div>
      <div className="space-y-6">
        {learningPaths.map(path => <div key={path.id} className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start">
                  <BookOpenIcon className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">{path.name}</h4>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(path.status)}`}>
                  {getStatusText(path.status)}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Team Progress: {path.progress}%</span>
                  <span>
                    {path.completed} of {path.total} members completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${getProgressColor(path.progress)}`} style={{
                width: `${path.progress}%`
              }}></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Due: {path.dueDate}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Details
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Manage Assignments
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default TeamLearningPathsWidget;