import React from 'react';
import { PlusIcon, CheckCircleIcon, FileTextIcon, UserPlusIcon, BookOpenIcon } from 'lucide-react';
type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
};
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  primary = false
}) => <button onClick={onClick} className={`flex items-center justify-center w-full p-3 rounded-md transition-colors ${primary ? 'bg-tangerine-100 text-white hover:bg-tangerine-80' : 'bg-white text-gray-900 border border-gray-200 hover:bg-starlight-40'}`}>
    <span className="mr-2">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>;
type ActionWidgetProps = {
  role: 'ADMIN' | 'SALES_MANAGER';
  onAction: (action: string) => void;
};
const ActionWidget: React.FC<ActionWidgetProps> = ({
  role,
  onAction
}) => {
  const adminActions = [{
    label: 'Add User',
    icon: <UserPlusIcon className="h-5 w-5" />,
    action: 'add_user',
    primary: true
  }, {
    label: 'Create Module',
    icon: <FileTextIcon className="h-5 w-5" />,
    action: 'create_module'
  }, {
    label: 'Assign Content',
    icon: <CheckCircleIcon className="h-5 w-5" />,
    action: 'assign_content'
  }];
  const managerActions = [{
    label: 'Add Team Member',
    icon: <UserPlusIcon className="h-5 w-5" />,
    action: 'add_team_member',
    primary: true
  }, {
    label: 'Assign Module',
    icon: <BookOpenIcon className="h-5 w-5" />,
    action: 'assign_module'
  }, {
    label: 'Create Quiz',
    icon: <FileTextIcon className="h-5 w-5" />,
    action: 'create_quiz'
  }];
  const actions = role === 'ADMIN' ? adminActions : managerActions;
  return <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-900">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map(action => <ActionButton key={action.action} label={action.label} icon={action.icon} primary={action.primary} onClick={() => onAction(action.action)} />)}
      </div>
    </div>;
};
export default ActionWidget;