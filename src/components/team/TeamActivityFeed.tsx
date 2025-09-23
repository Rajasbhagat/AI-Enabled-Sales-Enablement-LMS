import React from 'react';
import { CheckCircleIcon, XCircleIcon, PlayIcon, TrophyIcon } from 'lucide-react';
type Activity = {
  id: string;
  user: string;
  action: 'completed' | 'started' | 'failed' | 'certified';
  item: string;
  timestamp: string;
  score?: string;
};
type TeamActivityFeedProps = {
  activities: Activity[];
};
const TeamActivityFeed: React.FC<TeamActivityFeedProps> = ({
  activities
}) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'started':
        return <PlayIcon className="h-5 w-5 text-blue-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'certified':
        return <TrophyIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  const getActionText = (action: string) => {
    switch (action) {
      case 'completed':
        return 'completed';
      case 'started':
        return 'started';
      case 'failed':
        return 'failed';
      case 'certified':
        return 'earned certification for';
      default:
        return '';
    }
  };
  return <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-medium mb-4">Recent Team Activity</h3>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {activities.map(activity => <div key={activity.id} className="flex">
            <div className="mr-3 flex-shrink-0">
              {getActionIcon(activity.action)}
            </div>
            <div className="flex-grow">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                {getActionText(activity.action)}{' '}
                <span className="font-medium">{activity.item}</span>
                {activity.score && <span className={`ml-1 ${activity.action === 'failed' ? 'text-red-600' : 'text-green-600'}`}>
                    ({activity.score})
                  </span>}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>)}
      </div>
      {activities.length === 0 && <div className="text-center py-6 text-gray-500">
          <p>No recent activity</p>
        </div>}
      <div className="mt-4 pt-4 border-t">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Activity
        </button>
      </div>
    </div>;
};
export default TeamActivityFeed;