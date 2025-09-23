import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import KPICard from '../../components/dashboard/KPICard';
import ProgressCard from '../../components/dashboard/ProgressCard';
import ActionWidget from '../../components/dashboard/ActionWidget';
import AlertWidget from '../../components/dashboard/AlertWidget';
import TeamPerformanceTable from '../../components/dashboard/TeamPerformanceTable';
import { UsersIcon, CheckCircleIcon, ClockIcon, AlertTriangleIcon, BrainIcon, UserPlusIcon, BarChart4Icon } from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
const AdminDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  // Pie Chart Data
  const completionData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      data: [73, 18, 9],
      backgroundColor: ['#059669', '#D97706', '#6B7280'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      borderWidth: 2
    }]
  };
  // Line Chart Data
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Completion Rate',
      data: [65, 68, 70, 72, 75, 73],
      fill: false,
      borderColor: '#2563EB',
      tension: 0.1
    }]
  };
  // Department Data for Performance Table
  const departments = [{
    id: '1',
    name: 'Sales',
    completion: 85,
    score: 78,
    overdue: 5,
    status: 'On Track'
  }, {
    id: '2',
    name: 'Marketing',
    completion: 72,
    score: 81,
    overdue: 12,
    status: 'Attention Needed'
  }, {
    id: '3',
    name: 'Customer Success',
    completion: 68,
    score: 75,
    overdue: 15,
    status: 'Attention Needed'
  }, {
    id: '4',
    name: 'Product',
    completion: 79,
    score: 83,
    overdue: 8,
    status: 'On Track'
  }, {
    id: '5',
    name: 'Engineering',
    completion: 45,
    score: 65,
    overdue: 23,
    status: 'At Risk'
  }];
  // Alerts for Alert Widget
  const alerts = [{
    id: '1',
    type: 'overdue',
    title: 'Overdue Assignments',
    description: '24 assignments are overdue across 3 departments',
    priority: 'high',
    date: 'Today'
  }, {
    id: '2',
    type: 'certification',
    title: 'Expiring Certifications',
    description: '12 certifications will expire in the next 30 days',
    priority: 'medium',
    date: 'Today'
  }, {
    id: '3',
    type: 'content',
    title: 'Content Review Required',
    description: '3 modules have been flagged for review due to outdated information',
    priority: 'medium',
    date: 'Yesterday'
  }];
  const handleAction = (action: string) => {
    toast.info(`Action triggered: ${action}`);
  };
  const handleAlertAction = (alertId: string, action: string) => {
    toast.info(`Alert action triggered: ${action} for alert ${alertId}`);
  };
  const handleTeamMemberAction = (memberId: string, action: string) => {
    toast.info(`Team member action triggered: ${action} for member ${memberId}`);
  };
  return <DashboardLayout title="Home">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Organization Overview</h2>
          <div className="flex space-x-4">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 365 days</option>
            </select>
            <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="cs">Customer Success</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <KPICard title="Org Completion Rate" value="73%" trend={{
          value: 3,
          isPositive: true
        }} icon={<CheckCircleIcon className="h-5 w-5" />} color="green" />
          <KPICard title="Average Quiz Score" value="78%" description="Pass Rate: 85%" icon={<BarChart4Icon className="h-5 w-5" />} color="blue" />
          <KPICard title="Active Users (MAU)" value="2,845" description="87% of total users" trend={{
          value: 5,
          isPositive: true
        }} icon={<UsersIcon className="h-5 w-5" />} color="blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <KPICard title="At-Risk Learners" value="124" description="9% of active users" trend={{
          value: 2,
          isPositive: false
        }} icon={<AlertTriangleIcon className="h-5 w-5" />} color="red" />
          <KPICard title="Time-to-Competency" value="45 days" description="Target: 60 days" trend={{
          value: 15,
          isPositive: true
        }} icon={<ClockIcon className="h-5 w-5" />} color="green" />
          <KPICard title="New Hire Progress" value="82%" description="Meeting onboarding milestones" icon={<UserPlusIcon className="h-5 w-5" />} color="blue" />
        </div>

        {/* Charts and Action Widgets Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Completion Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <Pie data={completionData} options={{
                maintainAspectRatio: false
              }} />
              </div>
              <div className="h-64">
                <Line data={trendData} options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Completion Trend (Last 6 Months)',
                    font: {
                      size: 14
                    }
                  }
                }
              }} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ActionWidget role="ADMIN" onAction={handleAction} />
          </div>
        </div>

        {/* Department Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TeamPerformanceTable members={departments} onAction={handleTeamMemberAction} role="ADMIN" />
          </div>
          <div className="lg:col-span-1">
            <AlertWidget alerts={alerts} onAction={handleAlertAction} />
          </div>
        </div>

        {/* New Hire Progress Section */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            New Hire Onboarding Progress
          </h3>
          <div className="space-y-4">
            <ProgressCard title="7-Day Milestone (Basic Setup)" value={95} maxValue={100} color="green" description="95% of new hires completed basic onboarding" />
            <ProgressCard title="30-Day Milestone (Core Training)" value={82} maxValue={100} color="green" description="82% of new hires completed core training modules" />
            <ProgressCard title="60-Day Milestone (Certification)" value={68} maxValue={100} color="yellow" description="68% of new hires achieved certification (Target: 75%)" />
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default AdminDashboardPage;