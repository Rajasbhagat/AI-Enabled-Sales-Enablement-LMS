import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart2Icon, TrendingUpIcon, UsersIcon, BookOpenIcon, AwardIcon, ClockIcon, FilterIcon, DownloadIcon, CalendarIcon, CheckCircleIcon, UserIcon, BrainIcon, AlertCircleIcon } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import MetricCard from '../../components/analytics/MetricCard';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend);
const IndividualPerformancePage = () => {
  // State for filters and selected user
  const [dateRange, setDateRange] = useState('90');
  const [selectedUser, setSelectedUser] = useState('sarah');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  // Sample team members data
  const teamMembers = [{
    id: 'sarah',
    name: 'Sarah Johnson'
  }, {
    id: 'john',
    name: 'John Smith'
  }, {
    id: 'michael',
    name: 'Michael Lee'
  }, {
    id: 'emily',
    name: 'Emily Davis'
  }, {
    id: 'robert',
    name: 'Robert Wilson'
  }];
  // Get current user data
  const getCurrentUserData = () => {
    const users = {
      sarah: {
        name: 'Sarah Johnson',
        role: 'Senior Sales Representative',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        joinDate: 'May 15, 2021',
        lastActive: 'Today, 10:23 AM',
        completion: 92,
        quizAvg: 85,
        timeSpent: 28.5,
        overdue: 0,
        certifications: 4,
        inProgress: 2,
        skillsAvg: 82
      },
      john: {
        name: 'John Smith',
        role: 'Sales Representative',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        joinDate: 'Jan 10, 2022',
        lastActive: 'Today, 9:45 AM',
        completion: 85,
        quizAvg: 78,
        timeSpent: 22.0,
        overdue: 1,
        certifications: 3,
        inProgress: 3,
        skillsAvg: 76
      },
      michael: {
        name: 'Michael Lee',
        role: 'Junior Sales Representative',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        joinDate: 'Mar 22, 2022',
        lastActive: 'Yesterday, 4:30 PM',
        completion: 45,
        quizAvg: 62,
        timeSpent: 15.5,
        overdue: 3,
        certifications: 1,
        inProgress: 4,
        skillsAvg: 58
      },
      emily: {
        name: 'Emily Davis',
        role: 'Senior Sales Representative',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        joinDate: 'Aug 5, 2021',
        lastActive: 'Today, 11:15 AM',
        completion: 78,
        quizAvg: 75,
        timeSpent: 24.0,
        overdue: 1,
        certifications: 3,
        inProgress: 2,
        skillsAvg: 74
      },
      robert: {
        name: 'Robert Wilson',
        role: 'Sales Representative',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        joinDate: 'Nov 12, 2021',
        lastActive: 'Today, 8:50 AM',
        completion: 62,
        quizAvg: 68,
        timeSpent: 18.5,
        overdue: 2,
        certifications: 2,
        inProgress: 3,
        skillsAvg: 65
      }
    };
    return users[selectedUser];
  };
  const userData = getCurrentUserData();
  // Sample data for charts
  const progressTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Completion Rate',
      data: selectedUser === 'sarah' ? [72, 78, 82, 85, 88, 92] : selectedUser === 'john' ? [65, 68, 72, 75, 80, 85] : selectedUser === 'michael' ? [30, 32, 35, 38, 42, 45] : selectedUser === 'emily' ? [60, 65, 68, 72, 75, 78] : [45, 48, 52, 55, 58, 62],
      fill: false,
      borderColor: '#2563EB',
      tension: 0.1
    }, {
      label: 'Team Average',
      data: [62, 65, 68, 70, 72, 75],
      fill: false,
      borderColor: '#6B7280',
      borderDash: [5, 5],
      tension: 0.1
    }]
  };
  const quizScoreTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Quiz Scores',
      data: selectedUser === 'sarah' ? [75, 78, 80, 82, 84, 85] : selectedUser === 'john' ? [70, 72, 74, 75, 76, 78] : selectedUser === 'michael' ? [55, 58, 60, 60, 62, 62] : selectedUser === 'emily' ? [68, 70, 72, 72, 74, 75] : [60, 62, 64, 65, 68, 68],
      fill: false,
      borderColor: '#8B5CF6',
      tension: 0.1
    }, {
      label: 'Team Average',
      data: [68, 70, 71, 72, 73, 75],
      fill: false,
      borderColor: '#6B7280',
      borderDash: [5, 5],
      tension: 0.1
    }]
  };
  const timeSpentData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Hours Spent Learning',
      data: selectedUser === 'sarah' ? [7.5, 8.0, 6.5, 6.5] : selectedUser === 'john' ? [6.0, 5.5, 5.0, 5.5] : selectedUser === 'michael' ? [4.0, 3.5, 4.5, 3.5] : selectedUser === 'emily' ? [6.5, 6.0, 5.5, 6.0] : [5.0, 4.5, 4.5, 4.5],
      backgroundColor: '#8B5CF6',
      borderRadius: 4
    }, {
      label: 'Team Average',
      data: [5.5, 5.0, 5.2, 5.3],
      backgroundColor: '#D1D5DB',
      borderRadius: 4
    }]
  };
  const skillsRadarData = {
    labels: ['Product Knowledge', 'Sales Methodology', 'Negotiation', 'Communication', 'Objection Handling', 'Closing Techniques'],
    datasets: [{
      label: userData.name,
      data: selectedUser === 'sarah' ? [85, 82, 78, 90, 75, 80] : selectedUser === 'john' ? [80, 75, 72, 82, 70, 75] : selectedUser === 'michael' ? [65, 55, 50, 70, 55, 52] : selectedUser === 'emily' ? [78, 72, 75, 85, 65, 70] : [70, 65, 60, 75, 60, 65],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      borderWidth: 2
    }, {
      label: 'Team Average',
      data: [75, 70, 68, 80, 65, 70],
      backgroundColor: 'rgba(107, 114, 128, 0.2)',
      borderColor: '#6B7280',
      borderWidth: 2,
      borderDash: [5, 5]
    }, {
      label: 'Required Level',
      data: [80, 75, 75, 85, 75, 80],
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10B981',
      borderWidth: 2,
      borderDash: [5, 5]
    }]
  };
  const contentCompletionData = {
    labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'],
    datasets: [{
      data: selectedUser === 'sarah' ? [75, 15, 10, 0] : selectedUser === 'john' ? [65, 20, 10, 5] : selectedUser === 'michael' ? [30, 25, 30, 15] : selectedUser === 'emily' ? [60, 20, 15, 5] : [45, 25, 20, 10],
      backgroundColor: ['#10B981', '#3B82F6', '#6B7280', '#EF4444'],
      borderWidth: 1
    }]
  };
  const contentTypePerformanceData = {
    labels: ['Modules', 'Quizzes', 'Videos', 'Documents', 'Assessments'],
    datasets: [{
      label: 'Completion Rate',
      data: selectedUser === 'sarah' ? [95, 90, 98, 85, 92] : selectedUser === 'john' ? [88, 82, 90, 80, 85] : selectedUser === 'michael' ? [50, 45, 60, 40, 40] : selectedUser === 'emily' ? [82, 78, 85, 75, 70] : [65, 60, 75, 55, 55],
      backgroundColor: '#3B82F6',
      borderRadius: 4
    }, {
      label: 'Score/Engagement',
      data: selectedUser === 'sarah' ? [88, 85, 90, 80, 82] : selectedUser === 'john' ? [80, 78, 85, 75, 72] : selectedUser === 'michael' ? [65, 62, 70, 60, 55] : selectedUser === 'emily' ? [78, 75, 82, 72, 68] : [70, 68, 75, 65, 60],
      backgroundColor: '#10B981',
      borderRadius: 4
    }]
  };
  // Sample recent activity data
  const recentActivities = [...(selectedUser === 'sarah' ? [{
    id: '1',
    type: 'completed',
    item: 'Advanced Negotiation Techniques',
    date: 'Today, 10:23 AM',
    score: '92%'
  }, {
    id: '2',
    type: 'started',
    item: 'Leadership in Sales',
    date: 'Yesterday, 2:45 PM'
  }, {
    id: '3',
    type: 'completed',
    item: 'Q2 Product Knowledge Quiz',
    date: '2 days ago',
    score: '95%'
  }] : []), ...(selectedUser === 'john' ? [{
    id: '1',
    type: 'completed',
    item: 'Objection Handling Techniques',
    date: 'Today, 9:30 AM',
    score: '85%'
  }, {
    id: '2',
    type: 'started',
    item: 'Advanced Sales Strategies',
    date: 'Yesterday, 11:15 AM'
  }, {
    id: '3',
    type: 'failed',
    item: 'Enterprise Solution Quiz',
    date: '3 days ago',
    score: '65%'
  }] : []), ...(selectedUser === 'michael' ? [{
    id: '1',
    type: 'started',
    item: 'Sales Methodology Fundamentals',
    date: 'Yesterday, 4:10 PM'
  }, {
    id: '2',
    type: 'failed',
    item: 'Product Features Quiz',
    date: '2 days ago',
    score: '58%'
  }, {
    id: '3',
    type: 'overdue',
    item: 'Customer Needs Assessment',
    date: 'Due 5 days ago'
  }] : []), ...(selectedUser === 'emily' ? [{
    id: '1',
    type: 'completed',
    item: 'Sales Process Optimization',
    date: 'Today, 11:05 AM',
    score: '88%'
  }, {
    id: '2',
    type: 'started',
    item: 'Customer Success Stories',
    date: 'Yesterday, 3:30 PM'
  }, {
    id: '3',
    type: 'completed',
    item: 'Negotiation Skills Quiz',
    date: '4 days ago',
    score: '82%'
  }] : []), ...(selectedUser === 'robert' ? [{
    id: '1',
    type: 'started',
    item: 'Objection Handling Techniques',
    date: 'Today, 8:45 AM'
  }, {
    id: '2',
    type: 'completed',
    item: 'Basic Product Training',
    date: 'Yesterday, 1:15 PM',
    score: '72%'
  }, {
    id: '3',
    type: 'overdue',
    item: 'Sales Methodology Quiz',
    date: 'Due 2 days ago'
  }] : [])];
  // Sample learning paths data
  const learningPaths = [{
    id: '1',
    name: 'Sales Methodology Certification',
    progress: selectedUser === 'sarah' ? 100 : selectedUser === 'john' ? 85 : selectedUser === 'michael' ? 35 : selectedUser === 'emily' ? 90 : 65,
    dueDate: '2023-08-15',
    modules: [{
      name: 'Introduction to Sales Methodology',
      status: 'completed'
    }, {
      name: 'Discovery Process',
      status: 'completed'
    }, {
      name: 'Solution Presentation',
      status: selectedUser === 'sarah' || selectedUser === 'emily' ? 'completed' : selectedUser === 'john' ? 'completed' : 'in_progress'
    }, {
      name: 'Objection Handling',
      status: selectedUser === 'sarah' || selectedUser === 'emily' ? 'completed' : selectedUser === 'john' ? 'in_progress' : 'not_started'
    }, {
      name: 'Closing Techniques',
      status: selectedUser === 'sarah' ? 'completed' : selectedUser === 'emily' ? 'in_progress' : 'not_started'
    }]
  }, {
    id: '2',
    name: 'Product Knowledge Mastery',
    progress: selectedUser === 'sarah' ? 90 : selectedUser === 'john' ? 75 : selectedUser === 'michael' ? 40 : selectedUser === 'emily' ? 80 : 60,
    dueDate: '2023-09-30',
    modules: [{
      name: 'Product Overview',
      status: 'completed'
    }, {
      name: 'Core Features',
      status: selectedUser === 'michael' ? 'in_progress' : 'completed'
    }, {
      name: 'Advanced Features',
      status: selectedUser === 'sarah' || selectedUser === 'emily' ? 'completed' : selectedUser === 'john' ? 'in_progress' : 'not_started'
    }, {
      name: 'Competitive Analysis',
      status: selectedUser === 'sarah' ? 'completed' : selectedUser === 'emily' ? 'in_progress' : 'not_started'
    }, {
      name: 'Product Certification Exam',
      status: selectedUser === 'sarah' ? 'in_progress' : 'not_started'
    }]
  }];
  // Sample certifications data
  const certifications = [{
    id: '1',
    name: 'Sales Methodology Certification',
    status: selectedUser === 'sarah' || selectedUser === 'john' || selectedUser === 'emily' ? 'active' : selectedUser === 'robert' ? 'active' : 'not_started',
    score: selectedUser === 'sarah' ? '92%' : selectedUser === 'john' ? '85%' : selectedUser === 'emily' ? '88%' : selectedUser === 'robert' ? '78%' : '-',
    date: selectedUser === 'sarah' ? 'Apr 15, 2023' : selectedUser === 'john' ? 'May 2, 2023' : selectedUser === 'emily' ? 'Apr 20, 2023' : selectedUser === 'robert' ? 'May 10, 2023' : '-',
    expiry: selectedUser === 'sarah' ? 'Apr 15, 2024' : selectedUser === 'john' ? 'May 2, 2024' : selectedUser === 'emily' ? 'Apr 20, 2024' : selectedUser === 'robert' ? 'May 10, 2024' : '-'
  }, {
    id: '2',
    name: 'Product Specialist Level 1',
    status: selectedUser === 'sarah' || selectedUser === 'john' || selectedUser === 'emily' || selectedUser === 'robert' ? 'active' : 'not_started',
    score: selectedUser === 'sarah' ? '95%' : selectedUser === 'john' ? '88%' : selectedUser === 'emily' ? '90%' : selectedUser === 'robert' ? '82%' : '-',
    date: selectedUser === 'sarah' ? 'Feb 10, 2023' : selectedUser === 'john' ? 'Mar 5, 2023' : selectedUser === 'emily' ? 'Feb 25, 2023' : selectedUser === 'robert' ? 'Mar 15, 2023' : '-',
    expiry: selectedUser === 'sarah' ? 'Feb 10, 2024' : selectedUser === 'john' ? 'Mar 5, 2024' : selectedUser === 'emily' ? 'Feb 25, 2024' : selectedUser === 'robert' ? 'Mar 15, 2024' : '-'
  }, {
    id: '3',
    name: 'Product Specialist Level 2',
    status: selectedUser === 'sarah' || selectedUser === 'emily' ? 'active' : 'not_started',
    score: selectedUser === 'sarah' ? '90%' : selectedUser === 'emily' ? '85%' : '-',
    date: selectedUser === 'sarah' ? 'May 20, 2023' : selectedUser === 'emily' ? 'Jun 5, 2023' : '-',
    expiry: selectedUser === 'sarah' ? 'May 20, 2024' : selectedUser === 'emily' ? 'Jun 5, 2024' : '-'
  }, {
    id: '4',
    name: 'Advanced Negotiation',
    status: selectedUser === 'sarah' ? 'active' : 'not_started',
    score: selectedUser === 'sarah' ? '88%' : '-',
    date: selectedUser === 'sarah' ? 'Jun 12, 2023' : '-',
    expiry: selectedUser === 'sarah' ? 'Jun 12, 2024' : '-'
  }];
  // Handle export data
  const handleExportData = () => {
    alert(`Exporting analytics data for ${userData.name}...`);
  };
  // Get status color
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'started':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <DashboardLayout title="Individual Performance">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Individual Performance Analytics
            </h2>
            <p className="text-gray-600 mt-1">
              Detailed performance metrics and learning analytics for team
              members
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleExportData} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              {teamMembers.map(member => <option key={member.id} value={member.id}>
                  {member.name}
                </option>)}
            </select>
          </div>
          <div>
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
              <option value="365">Last 365 days</option>
            </select>
          </div>
          <div>
            <select value={contentTypeFilter} onChange={e => setContentTypeFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">All Content Types</option>
              <option value="modules">Modules</option>
              <option value="quizzes">Quizzes</option>
              <option value="videos">Videos</option>
              <option value="assessments">Assessments</option>
            </select>
          </div>
          <div className="ml-auto">
            <div className="flex border border-gray-300 rounded-md">
              <button className={`px-3 py-2 text-sm ${viewMode === 'overview' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('overview')}>
                Overview
              </button>
              <button className={`px-3 py-2 text-sm ${viewMode === 'content' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('content')}>
                Content Performance
              </button>
              <button className={`px-3 py-2 text-sm ${viewMode === 'skills' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('skills')}>
                Skills & Certifications
              </button>
            </div>
          </div>
        </div>
        {/* User Profile Header */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <img src={userData.avatar} alt={userData.name} className="h-16 w-16 rounded-full" />
            </div>
            <div className="sm:ml-4">
              <h3 className="text-lg font-semibold">{userData.name}</h3>
              <div className="text-sm text-gray-500 mt-1">
                <span>{userData.role}</span>
                <span className="mx-2">•</span>
                <span>Joined: {userData.joinDate}</span>
                <span className="mx-2">•</span>
                <span>Last active: {userData.lastActive}</span>
              </div>
            </div>
            <div className="sm:ml-auto mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Assign Content
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Schedule Coaching
              </button>
            </div>
          </div>
        </div>
        {/* Overview Section */}
        {viewMode === 'overview' && <>
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard title="Completion Rate" value={`${userData.completion}%`} icon={<CheckCircleIcon />} trend={{
            value: 4,
            isPositive: true
          }} description={`Team avg: 75%`} color="green" />
              <MetricCard title="Avg. Quiz Score" value={`${userData.quizAvg}%`} icon={<BrainIcon />} trend={{
            value: 2,
            isPositive: true
          }} description="Pass threshold: 70%" color="blue" />
              <MetricCard title="Learning Time" value={`${userData.timeSpent}h`} icon={<ClockIcon />} description="Last 30 days" color="purple" />
              <MetricCard title="Certifications" value={`${userData.certifications}`} icon={<AwardIcon />} description={`${userData.inProgress} in progress`} color="yellow" />
            </div>
            {/* Progress Trend Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Completion Progress Trend
                </h3>
                <div className="h-80">
                  <Line data={progressTrendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Completion Rate (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Month'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                      }
                    }
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Quiz Performance Trend
                </h3>
                <div className="h-80">
                  <Line data={quizScoreTrendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Score (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Month'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                      }
                    }
                  }
                }
              }} />
                </div>
              </div>
            </div>
            {/* Time Spent and Content Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Time Spent Learning
                </h3>
                <div className="h-80">
                  <Bar data={timeSpentData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Hours'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Week'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Content Status Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={contentCompletionData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-xl font-semibold text-green-600">
                      {userData.completion}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Overdue Items</p>
                    <p className="text-xl font-semibold text-red-600">
                      {userData.overdue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map(activity => <div key={activity.id} className="flex items-start">
                      <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.type)} mt-0.5`}>
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{activity.item}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{activity.date}</span>
                          {activity.score && <>
                              <span className="mx-1">•</span>
                              <span className="font-medium">
                                Score: {activity.score}
                              </span>
                            </>}
                        </div>
                      </div>
                    </div>)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Full Activity History
                  </button>
                </div>
              </div>
            </div>
            {/* Skills Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>
                <div className="h-80">
                  <Radar data={skillsRadarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 20
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Learning Paths Progress
                </h3>
                <div className="space-y-6">
                  {learningPaths.map(path => <div key={path.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {path.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Due: {path.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-semibold">
                            {path.progress}%
                          </span>
                          <p className="text-xs text-gray-500">Completion</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className={`h-2.5 rounded-full ${path.progress >= 75 ? 'bg-green-500' : path.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                    width: `${path.progress}%`
                  }}></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {path.modules.map((module, index) => <div key={index} className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${module.status === 'completed' ? 'bg-green-500' : module.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm truncate">
                              {module.name}
                            </span>
                          </div>)}
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </>}
        {/* Content Performance View */}
        {viewMode === 'content' && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard title="Content Completion" value={`${userData.completion}%`} icon={<CheckCircleIcon />} trend={{
            value: 4,
            isPositive: true
          }} description="Average across all content" color="green" />
              <MetricCard title="Avg. Content Score" value={`${userData.quizAvg}%`} icon={<BarChart2Icon />} trend={{
            value: 2,
            isPositive: true
          }} description="Assessments and quizzes" color="blue" />
              <MetricCard title="Content Items" value={userData.completion >= 80 ? 'On Track' : userData.completion >= 60 ? 'Progressing' : 'Needs Attention'} icon={<BookOpenIcon />} description={`${userData.overdue} items overdue`} color={userData.completion >= 80 ? 'green' : userData.completion >= 60 ? 'yellow' : 'red'} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Content Type Performance
                </h3>
                <div className="h-80">
                  <Bar data={contentTypePerformanceData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Percentage'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Content Type'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Content Status Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={contentCompletionData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-lg font-semibold text-green-600">
                      {contentCompletionData.datasets[0].data[0]}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">In Progress</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {contentCompletionData.datasets[0].data[1]}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Not Started</p>
                    <p className="text-lg font-semibold text-gray-600">
                      {contentCompletionData.datasets[0].data[2]}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Overdue</p>
                    <p className="text-lg font-semibold text-red-600">
                      {contentCompletionData.datasets[0].data[3]}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Content Completion Details
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completion Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Spent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Sales Methodology Fundamentals
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Module</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {userData.quizAvg + 5}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          Jun 10, 2023
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2h 15m</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Product Features Quiz
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Quiz</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {userData.quizAvg}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Jun 5, 2023</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">45m</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Customer Discovery Process
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Module</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {userData.completion > 70 ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Completed
                          </span> : <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            In Progress
                          </span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {userData.completion > 70 ? `${userData.quizAvg - 3}%` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 70 ? 'May 28, 2023' : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 70 ? '1h 30m' : '45m'}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Advanced Negotiation Techniques
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Module</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {userData.completion > 85 ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Completed
                          </span> : userData.completion > 60 ? <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            In Progress
                          </span> : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Not Started
                          </span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {userData.completion > 85 ? `${userData.quizAvg + 2}%` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 85 ? 'Jun 15, 2023' : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 85 ? '3h 10m' : userData.completion > 60 ? '1h 25m' : '-'}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Closing Techniques Workshop
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Workshop</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {userData.completion > 80 ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Completed
                          </span> : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Not Started
                          </span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {userData.completion > 80 ? `${userData.quizAvg - 2}%` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 80 ? 'May 20, 2023' : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.completion > 80 ? '4h 00m' : '-'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Content (25 items)
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Learning Paths Progress
                </h3>
                <div className="space-y-6">
                  {learningPaths.map(path => <div key={path.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {path.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Due: {path.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-semibold">
                            {path.progress}%
                          </span>
                          <p className="text-xs text-gray-500">Completion</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className={`h-2.5 rounded-full ${path.progress >= 75 ? 'bg-green-500' : path.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                    width: `${path.progress}%`
                  }}></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {path.modules.map((module, index) => <div key={index} className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${module.status === 'completed' ? 'bg-green-500' : module.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm truncate">
                              {module.name}
                            </span>
                          </div>)}
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Content Engagement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Video Completion Rate
                      </span>
                      <span className="text-sm font-medium">
                        {userData.completion > 80 ? '95%' : userData.completion > 60 ? '85%' : '70%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: userData.completion > 80 ? '95%' : userData.completion > 60 ? '85%' : '70%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Interactive Content Engagement
                      </span>
                      <span className="text-sm font-medium">
                        {userData.completion > 80 ? '90%' : userData.completion > 60 ? '80%' : '65%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: userData.completion > 80 ? '90%' : userData.completion > 60 ? '80%' : '65%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Document Read-Through Rate
                      </span>
                      <span className="text-sm font-medium">
                        {userData.completion > 80 ? '85%' : userData.completion > 60 ? '75%' : '60%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: userData.completion > 80 ? '85%' : userData.completion > 60 ? '75%' : '60%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Quiz Attempt Rate
                      </span>
                      <span className="text-sm font-medium">
                        {userData.completion > 80 ? '100%' : userData.completion > 60 ? '90%' : '75%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: userData.completion > 80 ? '100%' : userData.completion > 60 ? '90%' : '75%'
                  }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-2">
                    Learning Style Insights
                  </h4>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Preferred Content Types</p>
                      <p className="text-gray-600 mt-1">
                        {userData.name} shows highest engagement with{' '}
                        {userData.completion > 80 ? 'interactive content and video tutorials' : userData.completion > 60 ? 'video content and practical exercises' : 'short-form content and quizzes'}
                        .
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Learning Pattern</p>
                      <p className="text-gray-600 mt-1">
                        Typically engages with content{' '}
                        {userData.completion > 80 ? 'consistently throughout the week, with higher activity on Tuesday and Thursday mornings' : userData.completion > 60 ? 'in concentrated sessions, primarily in the afternoons' : 'sporadically, with longer weekend sessions'}
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
        {/* Skills & Certifications View */}
        {viewMode === 'skills' && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard title="Skills Average" value={`${userData.skillsAvg}%`} icon={<BrainIcon />} trend={{
            value: 3,
            isPositive: true
          }} description="Across all skill areas" color="blue" />
              <MetricCard title="Certifications" value={`${userData.certifications}`} icon={<AwardIcon />} description={`${userData.inProgress} in progress`} color="yellow" />
              <MetricCard title="Development Status" value={userData.skillsAvg >= 80 ? 'Advanced' : userData.skillsAvg >= 70 ? 'Proficient' : userData.skillsAvg >= 60 ? 'Developing' : 'Needs Focus'} icon={<TrendingUpIcon />} description="Based on skill assessments" color={userData.skillsAvg >= 80 ? 'green' : userData.skillsAvg >= 70 ? 'blue' : userData.skillsAvg >= 60 ? 'yellow' : 'red'} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>
                <div className="h-80">
                  <Radar data={skillsRadarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 20
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skill Development Over Time
                </h3>
                <div className="h-80">
                  <Line data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Product Knowledge',
                  data: selectedUser === 'sarah' ? [70, 72, 75, 78, 82, 85] : selectedUser === 'john' ? [65, 68, 72, 75, 78, 80] : selectedUser === 'michael' ? [55, 58, 60, 62, 64, 65] : selectedUser === 'emily' ? [68, 70, 72, 74, 76, 78] : [60, 62, 65, 68, 70, 70],
                  borderColor: '#3B82F6',
                  tension: 0.1
                }, {
                  label: 'Negotiation',
                  data: selectedUser === 'sarah' ? [65, 68, 70, 72, 75, 78] : selectedUser === 'john' ? [60, 62, 65, 68, 70, 72] : selectedUser === 'michael' ? [40, 42, 45, 48, 50, 50] : selectedUser === 'emily' ? [62, 65, 68, 70, 72, 75] : [55, 58, 58, 60, 60, 60],
                  borderColor: '#F59E0B',
                  tension: 0.1
                }, {
                  label: 'Objection Handling',
                  data: selectedUser === 'sarah' ? [60, 65, 68, 70, 72, 75] : selectedUser === 'john' ? [55, 60, 62, 65, 68, 70] : selectedUser === 'michael' ? [45, 48, 50, 52, 55, 55] : selectedUser === 'emily' ? [58, 60, 62, 63, 64, 65] : [50, 52, 55, 58, 60, 60],
                  borderColor: '#EF4444',
                  tension: 0.1
                }]
              }} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Skill Level (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Month'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }} />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Detailed Skills Assessment
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skill
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Required Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gap
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Assessed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Product Knowledge
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[0]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[0] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[0] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[0]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">80%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[0] >= 80 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[0] - 80}%
                            </span> : <span className="text-red-600">
                              -{80 - skillsRadarData.datasets[0].data[0]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          Jun 15, 2023
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Sales Methodology
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[1]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[1] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[1] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[1]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">75%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[1] >= 75 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[1] - 75}%
                            </span> : <span className="text-red-600">
                              -{75 - skillsRadarData.datasets[0].data[1]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          Jun 10, 2023
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Negotiation
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[2]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[2] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[2] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[2]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">75%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[2] >= 75 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[2] - 75}%
                            </span> : <span className="text-red-600">
                              -{75 - skillsRadarData.datasets[0].data[2]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          May 28, 2023
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Communication
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[3]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[3] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[3] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[3]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">85%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[3] >= 85 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[3] - 85}%
                            </span> : <span className="text-red-600">
                              -{85 - skillsRadarData.datasets[0].data[3]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Jun 5, 2023</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Objection Handling
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[4]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[4] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[4] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[4]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">75%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[4] >= 75 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[4] - 75}%
                            </span> : <span className="text-red-600">
                              -{75 - skillsRadarData.datasets[0].data[4]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          May 20, 2023
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Closing Techniques
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {skillsRadarData.datasets[0].data[5]}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${skillsRadarData.datasets[0].data[5] >= 80 ? 'bg-green-500' : skillsRadarData.datasets[0].data[5] >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                          width: `${skillsRadarData.datasets[0].data[5]}%`
                        }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">80%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {skillsRadarData.datasets[0].data[5] >= 80 ? <span className="text-green-600">
                              +{skillsRadarData.datasets[0].data[5] - 80}%
                            </span> : <span className="text-red-600">
                              -{80 - skillsRadarData.datasets[0].data[5]}%
                            </span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 flex items-center">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          Improving
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Jun 2, 2023</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Certifications</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Certification
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiry
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {certifications.map(cert => <tr key={cert.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {cert.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${cert.status === 'active' ? 'bg-green-100 text-green-800' : cert.status === 'expired' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                              {cert.status === 'active' ? 'Active' : cert.status === 'expired' ? 'Expired' : 'Not Started'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {cert.score}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {cert.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {cert.expiry}
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skill Development Recommendations
                </h3>
                <div className="space-y-6">
                  {userData.skillsAvg < 80 && <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                      <h4 className="font-medium text-yellow-800">
                        Priority Development Areas
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-yellow-700">
                        {skillsRadarData.datasets[0].data[4] < 75 && <li className="flex items-start">
                            <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Objection Handling</p>
                              <p>
                                Currently {skillsRadarData.datasets[0].data[4]}%
                                vs required 75%
                              </p>
                            </div>
                          </li>}
                        {skillsRadarData.datasets[0].data[2] < 75 && <li className="flex items-start">
                            <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Negotiation</p>
                              <p>
                                Currently {skillsRadarData.datasets[0].data[2]}%
                                vs required 75%
                              </p>
                            </div>
                          </li>}
                        {skillsRadarData.datasets[0].data[5] < 80 && <li className="flex items-start">
                            <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Closing Techniques</p>
                              <p>
                                Currently {skillsRadarData.datasets[0].data[5]}%
                                vs required 80%
                              </p>
                            </div>
                          </li>}
                      </ul>
                    </div>}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium">
                      Recommended Learning Content
                    </h4>
                    <div className="mt-3 space-y-3">
                      {skillsRadarData.datasets[0].data[4] < 75 && <div className="flex items-start">
                          <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              Advanced Objection Handling
                            </p>
                            <p className="text-sm text-gray-600">
                              Comprehensive training on handling complex sales
                              objections
                            </p>
                            <button className="mt-1 text-xs text-blue-600 font-medium">
                              Assign Content
                            </button>
                          </div>
                        </div>}
                      {skillsRadarData.datasets[0].data[2] < 75 && <div className="flex items-start">
                          <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              Negotiation Masterclass
                            </p>
                            <p className="text-sm text-gray-600">
                              Strategic negotiation techniques for complex sales
                            </p>
                            <button className="mt-1 text-xs text-blue-600 font-medium">
                              Assign Content
                            </button>
                          </div>
                        </div>}
                      {skillsRadarData.datasets[0].data[5] < 80 && <div className="flex items-start">
                          <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              Closing Techniques Workshop
                            </p>
                            <p className="text-sm text-gray-600">
                              Practical workshop on effective closing strategies
                            </p>
                            <button className="mt-1 text-xs text-blue-600 font-medium">
                              Assign Content
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium">Coaching Recommendations</h4>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-start">
                        <CalendarIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">1:1 Coaching Session</p>
                          <p className="text-sm text-gray-600">
                            Schedule a focused coaching session on
                            {skillsRadarData.datasets[0].data[4] < 75 ? ' objection handling' : skillsRadarData.datasets[0].data[2] < 75 ? ' negotiation skills' : ' closing techniques'}
                          </p>
                          <button className="mt-1 text-xs text-purple-600 font-medium">
                            Schedule Session
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <UsersIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            Peer Learning Opportunity
                          </p>
                          <p className="text-sm text-gray-600">
                            Pair with{' '}
                            {selectedUser === 'sarah' ? 'Emily Davis' : 'Sarah Johnson'}{' '}
                            for skill sharing and collaborative learning
                          </p>
                          <button className="mt-1 text-xs text-purple-600 font-medium">
                            Arrange Pairing
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </DashboardLayout>;
};
export default IndividualPerformancePage;