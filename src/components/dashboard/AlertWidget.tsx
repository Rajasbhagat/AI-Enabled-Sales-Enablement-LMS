import React from 'react';
import { AlertTriangleIcon, BellIcon, ClockIcon, UserIcon } from 'lucide-react';
type Alert = {
  id: string;
  type: 'overdue' | 'certification' | 'content' | 'coaching';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  date?: string;
};
type AlertWidgetProps = {
  alerts: Alert[];
  onAction: (alertId: string, action: string) => void;
};
const AlertWidget: React.FC<AlertWidgetProps> = ({
  alerts,
  onAction
}) => {
  if (alerts.length === 0) {
    return <div className="bg-white rounded-lg shadow-sm p-5 h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Alerts & Notifications</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <BellIcon className="h-12 w-12 mb-2" />
          <p>No alerts at this time</p>
        </div>
      </div>;
  }
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <ClockIcon className="h-5 w-5 text-red-500" />;
      case 'certification':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'content':
        return <AlertTriangleIcon className="h-5 w-5 text-blue-500" />;
      case 'coaching':
        return <UserIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertTriangleIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  const getActionButtons = (type: string, id: string) => {
    switch (type) {
      case 'overdue':
        return <>
            <button onClick={() => onAction(id, 'remind')} className="px-3 py-1 bg-white text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-100">
              Send Reminder
            </button>
            <button onClick={() => onAction(id, 'extend')} className="px-3 py-1 bg-red-600 text-sm text-white rounded-md hover:bg-red-700">
              Extend Deadline
            </button>
          </>;
      case 'certification':
        return <>
            <button onClick={() => onAction(id, 'remind')} className="px-3 py-1 bg-white text-sm text-yellow-600 border border-yellow-300 rounded-md hover:bg-yellow-100">
              Send Reminder
            </button>
            <button onClick={() => onAction(id, 'view')} className="px-3 py-1 bg-yellow-600 text-sm text-white rounded-md hover:bg-yellow-700">
              View Details
            </button>
          </>;
      case 'content':
        return <>
            <button onClick={() => onAction(id, 'review')} className="px-3 py-1 bg-white text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-100">
              Review Content
            </button>
            <button onClick={() => onAction(id, 'update')} className="px-3 py-1 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700">
              Update
            </button>
          </>;
      case 'coaching':
        return <>
            <button onClick={() => onAction(id, 'assign')} className="px-3 py-1 bg-white text-sm text-purple-600 border border-purple-300 rounded-md hover:bg-purple-100">
              Assign Remedial
            </button>
            <button onClick={() => onAction(id, 'schedule')} className="px-3 py-1 bg-purple-600 text-sm text-white rounded-md hover:bg-purple-700">
              Schedule Call
            </button>
          </>;
      default:
        return <button onClick={() => onAction(id, 'view')} className="px-3 py-1 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700">
            View Details
          </button>;
    }
  };
  return <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Alerts & Notifications</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.length} New
        </span>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.map(alert => <div key={alert.id} className={`border rounded-md p-4 ${getAlertColor(alert.priority)}`}>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="mt-0.5 mr-3">{getAlertIcon(alert.type)}</div>
                <div>
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  {alert.date && <p className="text-xs text-gray-500 mt-1">{alert.date}</p>}
                </div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2 justify-end">
              {getActionButtons(alert.type, alert.id)}
            </div>
          </div>)}
      </div>
    </div>;
};
export default AlertWidget;