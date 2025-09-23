import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
type ContentItem = {
  id: string;
  title: string;
  type: string;
  completionRate: number;
  avgScore: number;
  engagementScore: number;
  avgTimeSpent: string;
};
type TopContentTableProps = {
  data: ContentItem[];
  showExtendedMetrics?: boolean;
};
const TopContentTable: React.FC<TopContentTableProps> = ({
  data,
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
    const aValue = a[sortField as keyof ContentItem];
    const bValue = b[sortField as keyof ContentItem];
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
      <h3 className="text-lg font-medium mb-4">Top Performing Content</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                <div className="flex items-center">
                  Content Title
                  {getSortIcon('title')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                <div className="flex items-center">
                  Type
                  {getSortIcon('type')}
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
              {showExtendedMetrics && <>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('engagementScore')}>
                    <div className="flex items-center">
                      Engagement
                      {getSortIcon('engagementScore')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('avgTimeSpent')}>
                    <div className="flex items-center">
                      Avg. Time
                      {getSortIcon('avgTimeSpent')}
                    </div>
                  </th>
                </>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map(item => <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.type}</div>
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
                {showExtendedMetrics && <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.engagementScore}/100
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.avgTimeSpent}
                      </div>
                    </td>
                  </>}
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default TopContentTable;