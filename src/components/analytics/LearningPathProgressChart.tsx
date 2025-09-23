import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
type LearningPathProgressChartProps = {
  isAdmin: boolean;
};
const LearningPathProgressChart: React.FC<LearningPathProgressChartProps> = ({
  isAdmin
}) => {
  const learningPaths = [{
    id: '1',
    title: 'Sales Methodology Certification',
    completionRate: 78,
    modules: [{
      title: 'Introduction to Sales Methodology',
      status: 'completed',
      progress: 100
    }, {
      title: 'Discovery Process',
      status: 'completed',
      progress: 100
    }, {
      title: 'Solution Presentation',
      status: 'completed',
      progress: 100
    }, {
      title: 'Objection Handling',
      status: 'in_progress',
      progress: 65
    }, {
      title: 'Closing Techniques',
      status: 'not_started',
      progress: 0
    }, {
      title: 'Final Assessment',
      status: 'not_started',
      progress: 0
    }],
    dueDate: 'Aug 15, 2023'
  }, {
    id: '2',
    title: 'Product Knowledge Mastery',
    completionRate: 45,
    modules: [{
      title: 'Product Overview',
      status: 'completed',
      progress: 100
    }, {
      title: 'Core Features',
      status: 'completed',
      progress: 100
    }, {
      title: 'Advanced Features',
      status: 'in_progress',
      progress: 35
    }, {
      title: 'Competitive Analysis',
      status: 'not_started',
      progress: 0
    }, {
      title: 'Product Certification Exam',
      status: 'not_started',
      progress: 0
    }],
    dueDate: 'Sep 30, 2023'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'not_started':
      default:
        return 'bg-gray-300';
    }
  };
  return <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {isAdmin ? 'Organization Learning Path Progress' : 'Team Learning Path Progress'}
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View All Paths
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="space-y-6">
        {learningPaths.map(path => <div key={path.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{path.title}</h4>
                <p className="text-sm text-gray-500">Due: {path.dueDate}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">
                  {path.completionRate}%
                </span>
                <p className="text-xs text-gray-500">Completion</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className={`h-2.5 rounded-full ${path.completionRate >= 75 ? 'bg-green-500' : path.completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
            width: `${path.completionRate}%`
          }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {path.modules.map((module, index) => <div key={index} className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(module.status)} mr-2`}></div>
                  <span className="text-sm truncate">{module.title}</span>
                </div>)}
            </div>
          </div>)}
      </div>
    </div>;
};
export default LearningPathProgressChart;