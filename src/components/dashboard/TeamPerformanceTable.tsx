import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, AlertTriangleIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
type TeamMember = {
  id: string;
  name: string;
  email: string;
  department?: string;
  completion: number;
  score: number;
  overdue: number;
  status: 'On Track' | 'Attention Needed' | 'At Risk';
};
type TeamPerformanceTableProps = {
  members: TeamMember[];
  onAction: (memberId: string, action: string) => void;
  role: 'ADMIN' | 'SALES_MANAGER';
};
const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({
  members,
  onAction,
  role
}) => {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const sortedMembers = [...members].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortField === 'completion') {
      return sortDirection === 'asc' ? a.completion - b.completion : b.completion - a.completion;
    }
    if (sortField === 'score') {
      return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
    }
    if (sortField === 'overdue') {
      return sortDirection === 'asc' ? a.overdue - b.overdue : b.overdue - a.overdue;
    }
    return 0;
  });
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'On Track':
        return <CheckCircleIcon className="h-4 w-4 text-viridian-100 mr-1" />;
      case 'Attention Needed':
        return <AlertCircleIcon className="h-4 w-4 text-tangerine-100 mr-1" />;
      case 'At Risk':
        return <AlertTriangleIcon className="h-4 w-4 text-red-600 mr-1" />;
      default:
        return null;
    }
  };
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };
  if (members.length === 0) {
    return <div className="bg-white p-5 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-900">
          {role === 'ADMIN' ? 'Department Performance' : 'Team Performance'}
        </h3>
        <div className="flex flex-col items-center justify-center h-40 text-gray-600">
          <p>No data available</p>
        </div>
      </div>;
  }
  return <div className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4 text-gray-900">
        {role === 'ADMIN' ? 'Department Performance' : 'Team Performance'}
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-starlight-80">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  {role === 'ADMIN' ? 'Department' : 'Team Member'}
                  {getSortIcon('name')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('completion')}>
                <div className="flex items-center">
                  Completion Rate
                  {getSortIcon('completion')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('score')}>
                <div className="flex items-center">
                  Avg. Quiz Score
                  {getSortIcon('score')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('overdue')}>
                <div className="flex items-center">
                  {role === 'ADMIN' ? 'At-Risk Learners' : 'Overdue Items'}
                  {getSortIcon('overdue')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMembers.map(member => <tr key={member.id} className="hover:bg-starlight-20">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-2">{member.completion}%</span>
                    <div className="w-24 bg-starlight-80 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${member.completion >= 80 ? 'bg-viridian-100' : member.completion >= 60 ? 'bg-tangerine-100' : 'bg-red-500'}`} style={{
                    width: `${member.completion}%`
                  }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.score}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.overdue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${member.status === 'On Track' ? 'bg-viridian-20 text-viridian-100' : member.status === 'Attention Needed' ? 'bg-tangerine-20 text-tangerine-100' : 'bg-red-100 text-red-800'}`}>
                    {getStatusIcon(member.status)}
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onAction(member.id, 'view')} className="text-tangerine-100 hover:text-tangerine-80 mr-3 font-medium">
                    View
                  </button>
                  <button onClick={() => onAction(member.id, role === 'ADMIN' ? 'drill_down' : 'coach')} className="text-viridian-100 hover:text-viridian-80 font-medium">
                    {role === 'ADMIN' ? 'Drill Down' : 'Coach'}
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default TeamPerformanceTable;