import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
type MetricCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
};
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  color = 'blue'
}) => {
  return <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && <p className={`ml-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="flex items-center">
                  {trend.isPositive ? <TrendingUpIcon className="h-3 w-3 mr-0.5" /> : <TrendingDownIcon className="h-3 w-3 mr-0.5" />}
                  {trend.value}
                </span>
              </p>}
          </div>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getBackgroundColor(color)}`}>
          <div className={getTextColor(color)}>{icon}</div>
        </div>
      </div>
    </div>;
};
// Helper functions for dynamic styling
const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'green':
      return 'bg-green-100';
    case 'yellow':
      return 'bg-yellow-100';
    case 'red':
      return 'bg-red-100';
    case 'purple':
      return 'bg-purple-100';
    case 'indigo':
      return 'bg-indigo-100';
    case 'blue':
    default:
      return 'bg-blue-100';
  }
};
const getTextColor = (color: string) => {
  switch (color) {
    case 'green':
      return 'text-green-600';
    case 'yellow':
      return 'text-yellow-600';
    case 'red':
      return 'text-red-600';
    case 'purple':
      return 'text-purple-600';
    case 'indigo':
      return 'text-indigo-600';
    case 'blue':
    default:
      return 'text-blue-600';
  }
};
export default MetricCard;