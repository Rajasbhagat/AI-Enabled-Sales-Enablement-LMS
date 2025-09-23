import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
type ProgressItem = {
  id: string;
  name: string;
  type: string;
  completionRate: number;
  avgScore: number;
  activeLearners?: number;
  activeCourses?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};
type UserProgressTableProps = {
  data: ProgressItem[];
  isAdmin: boolean;
  showExtendedMetrics?: boolean;
};
const UserProgressTable: React.FC<UserProgressTableProps> = ({
  data,
  isAdmin,
  showExtendedMetrics = false
}) => {
  const [sortField, setSortField] = useState<string>('completionRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof ProgressItem];
    const bValue = b[sortField as keyof ProgressItem];
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    // For string values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };
  return <div className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">
        {isAdmin ? 'Department Performance' : 'Team Member Performance'}
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  {isAdmin ? 'Department' : 'Team Member'}
                  {getSortIcon('name')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('completionRate')}>
                <div className="flex items-center">
                  Completion Rate
                  {getSortIcon('completionRate')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('avgScore')}>
                <div className="flex items-center">
                  Avg. Score
                  {getSortIcon('avgScore')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(isAdmin ? 'activeLearners' : 'activeCourses')}>
                <div className="flex items-center">
                  {isAdmin ? 'Active Learners' : 'Active Courses'}
                  {getSortIcon(isAdmin ? 'activeLearners' : 'activeCourses')}
                </div>
              </th>
              {showExtendedMetrics && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">Trend</div>
                </th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map(item => <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 mr-2">
                      {item.completionRate}%
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${item.completionRate >= 75 ? 'bg-green-500' : item.completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                    width: `${item.completionRate}%`
                  }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.avgScore}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {isAdmin ? item.activeLearners : item.activeCourses}
                  </div>
                </td>
                {showExtendedMetrics && item.trend && <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${item.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend.isPositive ? <TrendingUpIcon className="h-4 w-4 mr-1" /> : <TrendingDownIcon className="h-4 w-4 mr-1" />}
                      {item.trend.value}%
                    </div>
                  </td>}
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default UserProgressTable;