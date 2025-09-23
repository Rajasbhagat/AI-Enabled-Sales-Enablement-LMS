import React from 'react';
import { CheckCircleIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
type CompletionRateCardProps = {
  title: string;
  completionRate: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
};
const CompletionRateCard: React.FC<CompletionRateCardProps> = ({
  title,
  completionRate,
  trend,
  description
}) => {
  return <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {completionRate}%
            </p>
            {trend && <p className={`ml-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="flex items-center">
                  {trend.isPositive ? <TrendingUpIcon className="h-3 w-3 mr-0.5" /> : <TrendingDownIcon className="h-3 w-3 mr-0.5" />}
                  {trend.value}%
                </span>
              </p>}
          </div>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getColorClass(completionRate)}`}>
          <CheckCircleIcon className={`h-6 w-6 ${getIconColorClass(completionRate)}`} />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={getProgressColorClass(completionRate)} style={{
          width: `${completionRate}%`
        }}></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>;
};
// Helper functions for dynamic styling
const getColorClass = (rate: number) => {
  if (rate >= 75) return 'bg-green-100';
  if (rate >= 50) return 'bg-yellow-100';
  return 'bg-red-100';
};
const getIconColorClass = (rate: number) => {
  if (rate >= 75) return 'text-green-600';
  if (rate >= 50) return 'text-yellow-600';
  return 'text-red-600';
};
const getProgressColorClass = (rate: number) => {
  if (rate >= 75) return 'bg-green-500 h-2.5 rounded-full';
  if (rate >= 50) return 'bg-yellow-500 h-2.5 rounded-full';
  return 'bg-red-500 h-2.5 rounded-full';
};
export default CompletionRateCard;