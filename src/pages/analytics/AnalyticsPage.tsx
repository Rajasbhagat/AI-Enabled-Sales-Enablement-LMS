import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { BarChart2Icon, TrendingUpIcon, UsersIcon, BookOpenIcon, AwardIcon, ClockIcon, FilterIcon, DownloadIcon, CalendarIcon, CheckCircleIcon } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import CompletionRateCard from '../../components/analytics/CompletionRateCard';
import MetricCard from '../../components/analytics/MetricCard';
import TopContentTable from '../../components/analytics/TopContentTable';
import UserProgressTable from '../../components/analytics/UserProgressTable';
import LearningPathProgressChart from '../../components/analytics/LearningPathProgressChart';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend);
const AnalyticsPage = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  // State for filters
  const [dateRange, setDateRange] = useState('30');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  // Sample data for charts
  const completionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: isAdmin ? 'Organization Completion' : 'Team Completion',
      data: [65, 68, 70, 72, 75, 78],
      fill: false,
      borderColor: '#2563EB',
      tension: 0.1
    }, {
      label: isAdmin ? 'Benchmark' : 'Department Average',
      data: [70, 72, 73, 75, 78, 80],
      fill: false,
      borderColor: '#6B7280',
      borderDash: [5, 5],
      tension: 0.1
    }]
  };
  const contentEngagementData = {
    labels: ['Modules', 'Quizzes', 'Videos', 'Documents', 'Assessments', 'Learning Paths'],
    datasets: [{
      label: 'Completion Rate',
      data: [78, 65, 82, 56, 70, 62],
      backgroundColor: '#3B82F6',
      borderRadius: 4
    }, {
      label: 'Engagement Score',
      data: [85, 72, 90, 60, 75, 68],
      backgroundColor: '#10B981',
      borderRadius: 4
    }]
  };
  const contentDistributionData = {
    labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'],
    datasets: [{
      data: [42, 28, 18, 12],
      backgroundColor: ['#10B981', '#3B82F6', '#6B7280', '#EF4444'],
      borderWidth: 1,
      cutout: '70%'
    }]
  };
  const skillsRadarData = {
    labels: ['Product Knowledge', 'Sales Methodology', 'Negotiation', 'Communication', 'Objection Handling', 'Closing Techniques'],
    datasets: [{
      label: isAdmin ? 'Organization Average' : 'Team Average',
      data: [72, 68, 65, 78, 62, 70],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      borderWidth: 2
    }, {
      label: 'Benchmark',
      data: [80, 75, 75, 85, 75, 80],
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10B981',
      borderWidth: 2,
      borderDash: [5, 5]
    }]
  };
  const timeSpentData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Time Spent (hours)',
      data: [3.2, 2.8, 4.1, 3.5],
      backgroundColor: '#8B5CF6',
      borderColor: '#8B5CF6',
      borderWidth: 1,
      borderRadius: 4
    }]
  };
  // Top content data
  const topContentData = [{
    id: '1',
    title: 'Sales Methodology Fundamentals',
    type: 'Module',
    completionRate: 85,
    avgScore: 78,
    engagementScore: 82,
    avgTimeSpent: '45 min'
  }, {
    id: '2',
    title: 'Objection Handling Techniques',
    type: 'Module',
    completionRate: 78,
    avgScore: 75,
    engagementScore: 80,
    avgTimeSpent: '38 min'
  }, {
    id: '3',
    title: 'Product Knowledge Assessment',
    type: 'Quiz',
    completionRate: 92,
    avgScore: 82,
    engagementScore: 88,
    avgTimeSpent: '22 min'
  }, {
    id: '4',
    title: 'Advanced Negotiation Skills',
    type: 'Learning Path',
    completionRate: 65,
    avgScore: 72,
    engagementScore: 75,
    avgTimeSpent: '2.5 hrs'
  }, {
    id: '5',
    title: 'Customer Discovery Process',
    type: 'Module',
    completionRate: 72,
    avgScore: 68,
    engagementScore: 70,
    avgTimeSpent: '32 min'
  }];
  // User/department progress data
  const progressData = isAdmin ? [{
    id: '1',
    name: 'Sales Department',
    type: 'department',
    completionRate: 78,
    avgScore: 75,
    activeLearners: 45,
    trend: {
      value: 3,
      isPositive: true
    }
  }, {
    id: '2',
    name: 'Marketing Department',
    type: 'department',
    completionRate: 72,
    avgScore: 70,
    activeLearners: 32,
    trend: {
      value: 2,
      isPositive: true
    }
  }, {
    id: '3',
    name: 'Customer Success',
    type: 'department',
    completionRate: 85,
    avgScore: 82,
    activeLearners: 28,
    trend: {
      value: 5,
      isPositive: true
    }
  }, {
    id: '4',
    name: 'Product Department',
    type: 'department',
    completionRate: 65,
    avgScore: 68,
    activeLearners: 18,
    trend: {
      value: 1,
      isPositive: false
    }
  }, {
    id: '5',
    name: 'Engineering',
    type: 'department',
    completionRate: 58,
    avgScore: 72,
    activeLearners: 24,
    trend: {
      value: 2,
      isPositive: true
    }
  }] : [{
    id: '1',
    name: 'Sarah Johnson',
    type: 'user',
    completionRate: 92,
    avgScore: 85,
    activeCourses: 3,
    trend: {
      value: 5,
      isPositive: true
    }
  }, {
    id: '2',
    name: 'John Smith',
    type: 'user',
    completionRate: 85,
    avgScore: 78,
    activeCourses: 2,
    trend: {
      value: 3,
      isPositive: true
    }
  }, {
    id: '3',
    name: 'Michael Lee',
    type: 'user',
    completionRate: 45,
    avgScore: 62,
    activeCourses: 4,
    trend: {
      value: 2,
      isPositive: false
    }
  }, {
    id: '4',
    name: 'Emily Davis',
    type: 'user',
    completionRate: 78,
    avgScore: 75,
    activeCourses: 2,
    trend: {
      value: 4,
      isPositive: true
    }
  }, {
    id: '5',
    name: 'Robert Wilson',
    type: 'user',
    completionRate: 62,
    avgScore: 68,
    activeCourses: 3,
    trend: {
      value: 1,
      isPositive: true
    }
  }];
  // Handle export data
  const handleExportData = () => {
    alert('Exporting analytics data...');
  };
  return <DashboardLayout title="Analytics">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Learning Analytics</h2>
            <p className="text-gray-600 mt-1">
              {isAdmin ? 'Comprehensive analytics for organization-wide learning performance' : "Detailed analytics for your team's learning performance"}
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
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 365 days</option>
            </select>
          </div>
          {isAdmin && <div>
              <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="all">All Departments</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="customer_success">Customer Success</option>
                <option value="product">Product</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>}
          <div>
            <select value={contentTypeFilter} onChange={e => setContentTypeFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">All Content Types</option>
              <option value="modules">Modules</option>
              <option value="quizzes">Quizzes</option>
              <option value="learning_paths">Learning Paths</option>
              <option value="certifications">Certifications</option>
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
              <button className={`px-3 py-2 text-sm ${viewMode === 'users' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('users')}>
                {isAdmin ? 'Departments' : 'Team Members'}
              </button>
            </div>
          </div>
        </div>
        {/* Overview Section */}
        {viewMode === 'overview' && <>
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              <CompletionRateCard title={isAdmin ? 'Organization Completion' : 'Team Completion'} completionRate={isAdmin ? 73 : 68} trend={{
            value: isAdmin ? 3 : 2,
            isPositive: true
          }} description={isAdmin ? 'Across all departments' : 'Department avg: 72%'} />
              <MetricCard title="Avg. Quiz Score" value="75%" icon={<BarChart2Icon />} trend={{
            value: 2,
            isPositive: true
          }} description="Pass rate: 82%" color="blue" />
              <MetricCard title={isAdmin ? 'Active Users' : 'Active Learners'} value={isAdmin ? '2,845' : '6'} icon={<UsersIcon />} description={isAdmin ? '87% of total users' : '100% of team members'} color="purple" />
              <MetricCard title="Avg. Time Spent" value="3.5 hrs" icon={<ClockIcon />} trend={{
            value: 0.5,
            isPositive: true
          }} description="Per week per user" color="indigo" />
            </div>
            {/* Completion Trend Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Completion Trend</h3>
                <div className="h-80">
                  <Line data={completionTrendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 50,
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
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skills Gap Analysis
                </h3>
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
            </div>
            {/* Content Distribution and Time Spent */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Content Status Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={contentDistributionData} options={{
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
                    <p className="text-xl font-semibold text-green-600">42%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Overdue Rate</p>
                    <p className="text-xl font-semibold text-red-600">12%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Time Spent Learning
                </h3>
                <div className="h-64">
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
                  Learning Milestones
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">
                        Certifications Completed
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{
                        width: '65%'
                      }}></div>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <AwardIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">
                        Learning Path Progress
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                        width: '72%'
                      }}></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <BookOpenIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">
                        Required Training Completed
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{
                        width: '85%'
                      }}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CalendarIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">
                        Quarterly Goals Progress
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{
                        width: '78%'
                      }}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-2">
                    Upcoming Due Dates
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Product Certification</span>
                      <span className="text-red-600 font-medium">
                        5 days left
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Sales Methodology</span>
                      <span className="text-yellow-600 font-medium">
                        12 days left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Top Content and User Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <TopContentTable data={topContentData} />
              <UserProgressTable data={progressData} isAdmin={isAdmin} />
            </div>
            {/* Learning Path Progress */}
            <LearningPathProgressChart isAdmin={isAdmin} />
          </>}
        {/* Content Performance View */}
        {viewMode === 'content' && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard title="Content Completion" value="68%" icon={<CheckCircleIcon />} trend={{
            value: 3,
            isPositive: true
          }} description="Average across all content" color="green" />
              <MetricCard title="Avg. Engagement Score" value="75/100" icon={<TrendingUpIcon />} trend={{
            value: 2,
            isPositive: true
          }} description="Based on interactions" color="blue" />
              <MetricCard title="Content Items" value={isAdmin ? '248' : '52'} icon={<BookOpenIcon />} description={`${isAdmin ? '32' : '8'} added in last 30 days`} color="purple" />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Content Engagement by Type
              </h3>
              <div className="h-80">
                <Bar data={contentEngagementData} options={{
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
            <div className="mb-6">
              <TopContentTable data={topContentData} showExtendedMetrics={true} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Content Completion Status
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={contentDistributionData} options={{
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
                    <p className="text-lg font-semibold text-green-600">42%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">In Progress</p>
                    <p className="text-lg font-semibold text-blue-600">28%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Not Started</p>
                    <p className="text-lg font-semibold text-gray-600">18%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Overdue</p>
                    <p className="text-lg font-semibold text-red-600">12%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Content Feedback</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        User Satisfaction
                      </span>
                      <span className="text-sm font-medium">4.2/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: '84%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Content Relevance
                      </span>
                      <span className="text-sm font-medium">4.5/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: '90%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Content Clarity
                      </span>
                      <span className="text-sm font-medium">4.0/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: '80%'
                  }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Assessment Quality
                      </span>
                      <span className="text-sm font-medium">3.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                    width: '76%'
                  }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-2">
                    Top Content Comments
                  </h4>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">
                        Sales Methodology Fundamentals
                      </p>
                      <p className="text-gray-600">
                        "Very practical examples that I can apply immediately."
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        Objection Handling Techniques
                      </p>
                      <p className="text-gray-600">
                        "Could use more real-world scenarios."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
        {/* User/Department Performance View */}
        {viewMode === 'users' && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard title={isAdmin ? 'Departments' : 'Team Members'} value={isAdmin ? '5' : '6'} icon={<UsersIcon />} description={isAdmin ? 'Active departments' : 'Active team members'} color="blue" />
              <MetricCard title={isAdmin ? 'Avg. Department Completion' : 'Avg. Member Completion'} value="72%" icon={<CheckCircleIcon />} trend={{
            value: 3,
            isPositive: true
          }} description="Last 30 days" color="green" />
              <MetricCard title="Certifications Achieved" value={isAdmin ? '142' : '15'} icon={<AwardIcon />} trend={{
            value: isAdmin ? 12 : 2,
            isPositive: true
          }} description="Last 30 days" color="yellow" />
            </div>
            <div className="mb-6">
              <UserProgressTable data={progressData} isAdmin={isAdmin} showExtendedMetrics={true} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  {isAdmin ? 'Department Completion Comparison' : 'Team Member Completion Comparison'}
                </h3>
                <div className="h-80">
                  <Bar data={{
                labels: progressData.map(item => item.name),
                datasets: [{
                  label: 'Completion Rate',
                  data: progressData.map(item => item.completionRate),
                  backgroundColor: '#3B82F6',
                  borderRadius: 4
                }, {
                  label: 'Avg. Score',
                  data: progressData.map(item => item.avgScore),
                  backgroundColor: '#10B981',
                  borderRadius: 4
                }]
              }} options={{
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
                      text: isAdmin ? 'Department' : 'Team Member'
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
                  Skills Gap Analysis
                </h3>
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
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {isAdmin ? 'Department Learning Paths Progress' : 'Team Learning Paths Progress'}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      Sales Methodology Fundamentals
                    </span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{
                  width: '85%'
                }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span>Started: Jun 1, 2023</span>
                    <span>Due: Jul 30, 2023</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      Advanced Negotiation Techniques
                    </span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                  width: '45%'
                }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span>Started: Jun 15, 2023</span>
                    <span>Due: Aug 15, 2023</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      Product Knowledge Certification
                    </span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{
                  width: '72%'
                }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span>Started: May 20, 2023</span>
                    <span>Due: Jul 20, 2023</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      Customer Success Fundamentals
                    </span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{
                  width: '95%'
                }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span>Started: Apr 10, 2023</span>
                    <span>Due: Jun 10, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </DashboardLayout>;
};
export default AnalyticsPage;