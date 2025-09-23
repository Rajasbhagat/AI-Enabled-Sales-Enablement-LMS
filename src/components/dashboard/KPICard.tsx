import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';
type KPICardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    isNeutral?: boolean;
  };
  icon?: React.ReactNode;
  color?: 'tangerine' | 'viridian' | 'royal-blue' | 'violet' | 'gray';
  onClick?: () => void;
};
const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  description,
  trend,
  icon,
  color = 'viridian',
  onClick
}) => {
  const colorClasses = {
    tangerine: 'bg-tangerine-20 text-tangerine-100 border-tangerine-40',
    viridian: 'bg-viridian-20 text-viridian-100 border-viridian-40',
    'royal-blue': 'bg-royal-blue-20 text-royal-blue-100 border-royal-blue-40',
    violet: 'bg-violet-20 text-violet-100 border-violet-40',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  };
  const iconColorClasses = {
    tangerine: 'bg-tangerine-40 text-tangerine-100',
    viridian: 'bg-viridian-40 text-viridian-100',
    'royal-blue': 'bg-royal-blue-40 text-royal-blue-100',
    violet: 'bg-violet-40 text-violet-100',
    gray: 'bg-gray-100 text-gray-600'
  };
  const trendColorClasses = {
    positive: 'text-viridian-100 bg-viridian-20',
    negative: 'text-tangerine-100 bg-tangerine-20',
    neutral: 'text-gray-600 bg-gray-50'
  };
  return <div className={`bg-white rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-medium text-gray-900">{value}</p>
            {trend && <span className={`ml-2 text-xs px-2 py-1 rounded-full flex items-center ${trend.isNeutral ? trendColorClasses.neutral : trend.isPositive ? trendColorClasses.positive : trendColorClasses.negative}`}>
                {trend.isNeutral ? <MinusIcon className="h-3 w-3 mr-1" /> : trend.isPositive ? <TrendingUpIcon className="h-3 w-3 mr-1" /> : <TrendingDownIcon className="h-3 w-3 mr-1" />}
                {trend.value}%
              </span>}
          </div>
        </div>
        {icon && <div className={`p-2 rounded-full ${iconColorClasses[color]}`}>
            {icon}
          </div>}
      </div>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>;
};
export default KPICard;