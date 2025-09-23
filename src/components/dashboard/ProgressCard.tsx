import React from 'react';
type ProgressCardProps = {
  title: string;
  value: number;
  maxValue: number;
  description?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
};
const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  maxValue,
  description,
  color = 'blue'
}) => {
  const percentage = Math.round(value / maxValue * 100);
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };
  return <div className="rounded-lg border p-5 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">
            {value} of {maxValue}
          </span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`${colorClasses[color]} h-2.5 rounded-full`} style={{
          width: `${percentage}%`
        }}></div>
        </div>
      </div>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>;
};
export default ProgressCard;