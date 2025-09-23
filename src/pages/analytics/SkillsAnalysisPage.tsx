import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BarChart2Icon, TrendingUpIcon, UsersIcon, BookOpenIcon, AwardIcon, ClockIcon, FilterIcon, DownloadIcon, CalendarIcon, CheckCircleIcon, AlertCircleIcon, BrainIcon, UserIcon, AlertTriangleIcon } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import MetricCard from '../../components/analytics/MetricCard';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend);
const SkillsAnalysisPage = () => {
  // State for filters
  const [dateRange, setDateRange] = useState('90');
  const [departmentFilter, setDepartmentFilter] = useState('sales');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  // Handle export data
  const handleExportData = () => {
    alert('Exporting skills analytics data...');
  };
  // Sample data for charts
  const teamSkillsRadarData = {
    labels: ['Product Knowledge', 'Sales Methodology', 'Negotiation', 'Communication', 'Objection Handling', 'Closing Techniques'],
    datasets: [{
      label: 'Team Average',
      data: [75, 70, 68, 80, 65, 70],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      borderWidth: 2
    }, {
      label: 'Required Level',
      data: [80, 75, 75, 85, 75, 80],
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10B981',
      borderWidth: 2,
      borderDash: [5, 5]
    }]
  };
  const skillDistributionData = {
    labels: ['Exceeds', 'Meets', 'Approaching', 'Needs Development'],
    datasets: [{
      data: [15, 45, 25, 15],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      borderWidth: 1
    }]
  };
  const skillTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Product Knowledge',
      data: [68, 70, 72, 73, 74, 75],
      borderColor: '#3B82F6',
      tension: 0.1
    }, {
      label: 'Negotiation',
      data: [60, 62, 64, 65, 67, 68],
      borderColor: '#F59E0B',
      tension: 0.1
    }, {
      label: 'Objection Handling',
      data: [58, 60, 62, 63, 64, 65],
      borderColor: '#EF4444',
      tension: 0.1
    }]
  };
  const skillGapData = {
    labels: ['Product Knowledge', 'Sales Methodology', 'Negotiation', 'Communication', 'Objection Handling', 'Closing Techniques'],
    datasets: [{
      label: 'Skill Gap',
      data: [80 - 75, 75 - 70, 75 - 68, 85 - 80, 75 - 65, 80 - 70 // Closing Techniques gap
      ],
      backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(239, 68, 68, 0.7)'],
      borderRadius: 4
    }]
  };
  const teamMemberSkillsData = {
    labels: ['Sarah J.', 'John S.', 'Michael L.', 'Emily D.', 'Robert W.'],
    datasets: [{
      label: 'Product Knowledge',
      data: [85, 80, 65, 78, 70],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderRadius: 4
    }, {
      label: 'Negotiation',
      data: [78, 72, 50, 75, 60],
      backgroundColor: 'rgba(245, 158, 11, 0.7)',
      borderRadius: 4
    }, {
      label: 'Objection Handling',
      data: [75, 70, 55, 65, 60],
      backgroundColor: 'rgba(239, 68, 68, 0.7)',
      borderRadius: 4
    }]
  };
  const certificationStatusData = {
    labels: ['Certified', 'In Progress', 'Not Started', 'Expired'],
    datasets: [{
      data: [60, 25, 10, 5],
      backgroundColor: ['#10B981', '#3B82F6', '#6B7280', '#EF4444'],
      borderWidth: 1
    }]
  };
  // Sample team members skills data
  const teamMembersSkills = [{
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Senior Sales Representative',
    skills: {
      productKnowledge: 85,
      salesMethodology: 82,
      negotiation: 78,
      communication: 90,
      objectionHandling: 75,
      closingTechniques: 80
    },
    certifications: 4,
    skillsAvg: 82
  }, {
    id: '2',
    name: 'John Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Sales Representative',
    skills: {
      productKnowledge: 80,
      salesMethodology: 75,
      negotiation: 72,
      communication: 82,
      objectionHandling: 70,
      closingTechniques: 75
    },
    certifications: 3,
    skillsAvg: 76
  }, {
    id: '3',
    name: 'Michael Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    role: 'Junior Sales Representative',
    skills: {
      productKnowledge: 65,
      salesMethodology: 55,
      negotiation: 50,
      communication: 70,
      objectionHandling: 55,
      closingTechniques: 52
    },
    certifications: 1,
    skillsAvg: 58
  }, {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    role: 'Senior Sales Representative',
    skills: {
      productKnowledge: 78,
      salesMethodology: 72,
      negotiation: 75,
      communication: 85,
      objectionHandling: 65,
      closingTechniques: 70
    },
    certifications: 3,
    skillsAvg: 74
  }, {
    id: '5',
    name: 'Robert Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Sales Representative',
    skills: {
      productKnowledge: 70,
      salesMethodology: 65,
      negotiation: 60,
      communication: 75,
      objectionHandling: 60,
      closingTechniques: 65
    },
    certifications: 2,
    skillsAvg: 65
  }];
  // Sample skill categories data
  const skillCategories = [{
    id: 'product',
    name: 'Product Knowledge',
    description: 'Understanding of product features, benefits, and use cases',
    teamAvg: 75,
    requiredLevel: 80,
    gap: 5,
    trend: 'improving',
    subSkills: [{
      name: 'Core Features',
      avg: 80,
      required: 85
    }, {
      name: 'Advanced Features',
      avg: 72,
      required: 80
    }, {
      name: 'Competitive Positioning',
      avg: 68,
      required: 75
    }, {
      name: 'Use Cases',
      avg: 78,
      required: 80
    }]
  }, {
    id: 'sales',
    name: 'Sales Methodology',
    description: 'Application of sales frameworks and methodologies',
    teamAvg: 70,
    requiredLevel: 75,
    gap: 5,
    trend: 'improving',
    subSkills: [{
      name: 'Discovery Process',
      avg: 72,
      required: 75
    }, {
      name: 'Needs Analysis',
      avg: 70,
      required: 75
    }, {
      name: 'Solution Presentation',
      avg: 68,
      required: 75
    }, {
      name: 'Value Proposition',
      avg: 70,
      required: 75
    }]
  }, {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'Ability to negotiate terms and close deals effectively',
    teamAvg: 68,
    requiredLevel: 75,
    gap: 7,
    trend: 'improving',
    subSkills: [{
      name: 'Pricing Discussions',
      avg: 65,
      required: 75
    }, {
      name: 'Value Justification',
      avg: 70,
      required: 75
    }, {
      name: 'Terms Negotiation',
      avg: 68,
      required: 75
    }, {
      name: 'Concession Management',
      avg: 65,
      required: 75
    }]
  }, {
    id: 'communication',
    name: 'Communication',
    description: 'Effective verbal and written communication skills',
    teamAvg: 80,
    requiredLevel: 85,
    gap: 5,
    trend: 'stable',
    subSkills: [{
      name: 'Verbal Communication',
      avg: 82,
      required: 85
    }, {
      name: 'Written Communication',
      avg: 78,
      required: 85
    }, {
      name: 'Active Listening',
      avg: 75,
      required: 85
    }, {
      name: 'Presentation Skills',
      avg: 80,
      required: 85
    }]
  }, {
    id: 'objection',
    name: 'Objection Handling',
    description: 'Ability to address and overcome customer objections',
    teamAvg: 65,
    requiredLevel: 75,
    gap: 10,
    trend: 'improving',
    subSkills: [{
      name: 'Objection Identification',
      avg: 68,
      required: 75
    }, {
      name: 'Response Frameworks',
      avg: 65,
      required: 75
    }, {
      name: 'Addressing Pricing Concerns',
      avg: 62,
      required: 75
    }, {
      name: 'Competitive Objections',
      avg: 65,
      required: 75
    }]
  }, {
    id: 'closing',
    name: 'Closing Techniques',
    description: 'Skills for effectively closing sales opportunities',
    teamAvg: 70,
    requiredLevel: 80,
    gap: 10,
    trend: 'improving',
    subSkills: [{
      name: 'Trial Closes',
      avg: 72,
      required: 80
    }, {
      name: 'Urgency Creation',
      avg: 68,
      required: 80
    }, {
      name: 'Commitment Securing',
      avg: 70,
      required: 80
    }, {
      name: 'Follow-up Process',
      avg: 70,
      required: 80
    }]
  }];
  // Get skill category by ID
  const getSkillCategory = id => {
    return skillCategories.find(category => category.id === id) || skillCategories[0];
  };
  // Currently selected skill category
  const selectedSkillCategory = skillCategoryFilter === 'all' ? null : getSkillCategory(skillCategoryFilter);
  // Get status color based on value
  const getStatusColor = (value, threshold) => {
    if (value >= threshold) return 'bg-green-100 text-green-800';
    if (value >= threshold - 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  // Get progress bar color based on value
  const getProgressColor = (value, threshold) => {
    if (value >= threshold) return 'bg-green-500';
    if (value >= threshold - 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  // Get trend icon and color
  const getTrendDisplay = trend => {
    switch (trend) {
      case 'improving':
        return {
          icon: <TrendingUpIcon className="h-4 w-4 mr-1" />,
          color: 'text-green-600',
          text: 'Improving'
        };
      case 'declining':
        return {
          icon: <TrendingUpIcon className="h-4 w-4 mr-1 transform rotate-180" />,
          color: 'text-red-600',
          text: 'Declining'
        };
      default:
        return {
          icon: <TrendingUpIcon className="h-4 w-4 mr-1 transform rotate-90" />,
          color: 'text-gray-600',
          text: 'Stable'
        };
    }
  };
  return <DashboardLayout title="Skills Analysis">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Skills Analysis Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Comprehensive analysis of team skills, gaps, and development
              opportunities
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
            <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="sales">Sales Department</option>
              <option value="marketing">Marketing Department</option>
              <option value="customer_success">Customer Success</option>
            </select>
          </div>
          <div>
            <select value={skillCategoryFilter} onChange={e => setSkillCategoryFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">All Skill Categories</option>
              {skillCategories.map(category => <option key={category.id} value={category.id}>
                  {category.name}
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
          <div className="ml-auto">
            <div className="flex border border-gray-300 rounded-md">
              <button className={`px-3 py-2 text-sm ${viewMode === 'overview' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('overview')}>
                Overview
              </button>
              <button className={`px-3 py-2 text-sm ${viewMode === 'detail' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('detail')}>
                Skill Details
              </button>
              <button className={`px-3 py-2 text-sm ${viewMode === 'team' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('team')}>
                Team Members
              </button>
            </div>
          </div>
        </div>
        {/* Overview Section */}
        {viewMode === 'overview' && <>
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard title="Overall Skills Average" value="72%" icon={<BrainIcon />} trend={{
            value: 3,
            isPositive: true
          }} description="Across all team members" color="blue" />
              <MetricCard title="Skill Gap" value="7%" icon={<TrendingUpIcon />} trend={{
            value: 2,
            isPositive: true
          }} description="Improvement from last quarter" color="green" />
              <MetricCard title="Certification Rate" value="65%" icon={<AwardIcon />} trend={{
            value: 5,
            isPositive: true
          }} description="Team members with certifications" color="yellow" />
              <MetricCard title="Skills Needing Focus" value="2" icon={<AlertTriangleIcon />} description="Objection Handling, Negotiation" color="red" />
            </div>
            {/* Skills Radar and Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Team Skills Assessment
                </h3>
                <div className="h-80">
                  <Radar data={teamSkillsRadarData} options={{
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
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.r}%`;
                      }
                    }
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skill Level Distribution
                </h3>
                <div className="h-80">
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut data={skillDistributionData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `${context.label}: ${context.parsed}%`;
                        }
                      }
                    }
                  }
                }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Meeting or Exceeding
                      </p>
                      <p className="text-xl font-semibold text-green-600">
                        60%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Needing Development
                      </p>
                      <p className="text-xl font-semibold text-yellow-600">
                        40%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Skill Gap and Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skill Gaps by Category
                </h3>
                <div className="h-80">
                  <Bar data={skillGapData} options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    max: 15,
                    title: {
                      display: true,
                      text: 'Gap (%)'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Skill Category'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `Gap: ${context.parsed.x}%`;
                      }
                    }
                  }
                }
              }} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Skill Development Trend
                </h3>
                <div className="h-80">
                  <Line data={skillTrendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 50,
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
            {/* Skill Categories Overview */}
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Skill Categories Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skill Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Average
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Required Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gap
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {skillCategories.map(category => {
                  const trend = getTrendDisplay(category.trend);
                  return <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900 mr-2">
                                {category.teamAvg}%
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full ${getProgressColor(category.teamAvg, category.requiredLevel)}`} style={{
                            width: `${category.teamAvg}%`
                          }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {category.requiredLevel}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {category.gap > 0 ? <span className="text-red-600">
                                  -{category.gap}%
                                </span> : <span className="text-green-600">
                                  +{Math.abs(category.gap)}%
                                </span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(category.teamAvg, category.requiredLevel)}`}>
                              {category.teamAvg >= category.requiredLevel ? 'Meeting Target' : category.teamAvg >= category.requiredLevel - 10 ? 'Approaching' : 'Needs Focus'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex items-center text-sm ${trend.color}`}>
                              {trend.icon}
                              {trend.text}
                            </div>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Team Members Skills and Certification Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Team Member Skills Comparison
                </h3>
                <div className="h-80">
                  <Bar data={teamMemberSkillsData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Skill Level (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Team Member'
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
                  Certification Status
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={certificationStatusData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.parsed}%`;
                      }
                    }
                  }
                }
              }} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Total Certifications</p>
                  <p className="text-xl font-semibold">13 / 20 Required</p>
                </div>
              </div>
            </div>
            {/* Development Recommendations */}
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Development Recommendations
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Recommendations
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Objection Handling
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        10% gap from required level. Highest priority for team
                        development.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                          Training Needed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Negotiation Skills
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        7% gap from required level. Focus on value-based
                        negotiation techniques.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                          Workshop Recommended
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Closing Techniques
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        10% gap from required level. Focus on commitment
                        securing strategies.
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                          Role Play Sessions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium mb-2">Recommended Learning Paths</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Advanced Objection Handling</p>
                      <p className="text-sm text-gray-600">
                        Comprehensive training on addressing complex sales
                        objections
                      </p>
                      <button className="mt-1 text-xs text-blue-600 font-medium">
                        Assign to Team
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Negotiation Masterclass</p>
                      <p className="text-sm text-gray-600">
                        Value-based negotiation techniques for complex sales
                      </p>
                      <button className="mt-1 text-xs text-blue-600 font-medium">
                        Assign to Team
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Closing Techniques Workshop</p>
                      <p className="text-sm text-gray-600">
                        Practical workshop on effective closing strategies
                      </p>
                      <button className="mt-1 text-xs text-blue-600 font-medium">
                        Assign to Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
        {/* Skill Details Section */}
        {viewMode === 'detail' && <>
            {selectedSkillCategory ? <>
                {/* Selected Skill Category Details */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        {selectedSkillCategory.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {selectedSkillCategory.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Team Average</p>
                        <p className="text-xl font-semibold">
                          {selectedSkillCategory.teamAvg}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Required</p>
                        <p className="text-xl font-semibold">
                          {selectedSkillCategory.requiredLevel}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Gap</p>
                        <p className="text-xl font-semibold text-red-600">
                          -{selectedSkillCategory.gap}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">Overall Progress</p>
                      <p className="text-sm font-medium">
                        {selectedSkillCategory.teamAvg}% /{' '}
                        {selectedSkillCategory.requiredLevel}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${getProgressColor(selectedSkillCategory.teamAvg, selectedSkillCategory.requiredLevel)}`} style={{
                  width: `${selectedSkillCategory.teamAvg}%`
                }}></div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium mb-3">
                        Sub-Skills Breakdown
                      </h4>
                      <div className="space-y-4">
                        {selectedSkillCategory.subSkills.map((subSkill, index) => <div key={index}>
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">
                                  {subSkill.name}
                                </p>
                                <p className="text-sm">
                                  {subSkill.avg}% / {subSkill.required}%
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full ${getProgressColor(subSkill.avg, subSkill.required)}`} style={{
                        width: `${subSkill.avg}%`
                      }}></div>
                              </div>
                            </div>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-medium mb-3">
                        Team Member Performance
                      </h4>
                      <div className="space-y-4">
                        {teamMembersSkills.map(member => {
                    const skillValue = member.skills[selectedSkillCategory.id === 'product' ? 'productKnowledge' : selectedSkillCategory.id === 'sales' ? 'salesMethodology' : selectedSkillCategory.id === 'negotiation' ? 'negotiation' : selectedSkillCategory.id === 'communication' ? 'communication' : selectedSkillCategory.id === 'objection' ? 'objectionHandling' : 'closingTechniques'];
                    return <div key={member.id}>
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">
                                  {member.name}
                                </p>
                                <p className="text-sm">{skillValue}%</p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full ${getProgressColor(skillValue, selectedSkillCategory.requiredLevel)}`} style={{
                          width: `${skillValue}%`
                        }}></div>
                              </div>
                            </div>;
                  })}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skill Development Trend */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedSkillCategory.name} Development Trend
                  </h3>
                  <div className="h-80">
                    <Line data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Team Average',
                  data: [selectedSkillCategory.teamAvg - 5, selectedSkillCategory.teamAvg - 4, selectedSkillCategory.teamAvg - 3, selectedSkillCategory.teamAvg - 2, selectedSkillCategory.teamAvg - 1, selectedSkillCategory.teamAvg],
                  borderColor: '#3B82F6',
                  tension: 0.1
                }, {
                  label: 'Required Level',
                  data: Array(6).fill(selectedSkillCategory.requiredLevel),
                  borderColor: '#10B981',
                  borderDash: [5, 5],
                  tension: 0.1
                }]
              }} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 50,
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
                {/* Development Recommendations */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    Development Recommendations
                  </h3>
                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 mb-6">
                    <div className="flex items-start">
                      <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">
                          {selectedSkillCategory.name} Gap Analysis
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Current team average is {selectedSkillCategory.gap}%
                          below the required level.
                          {selectedSkillCategory.gap >= 7 ? ' This is a high priority area for development.' : selectedSkillCategory.gap >= 5 ? ' This is a medium priority area for development.' : ' This is a low priority area for development.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-medium mb-2">
                        Recommended Learning Content
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-start">
                            <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">
                                {selectedSkillCategory.id === 'product' ? 'Advanced Product Knowledge' : selectedSkillCategory.id === 'sales' ? 'Sales Methodology Mastery' : selectedSkillCategory.id === 'negotiation' ? 'Negotiation Masterclass' : selectedSkillCategory.id === 'communication' ? 'Effective Communication' : selectedSkillCategory.id === 'objection' ? 'Advanced Objection Handling' : 'Closing Techniques Workshop'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Comprehensive training covering all aspects of{' '}
                                {selectedSkillCategory.name.toLowerCase()}.
                              </p>
                              <button className="mt-2 text-xs text-blue-600 font-medium">
                                Assign to Team
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-start">
                            <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">
                                {selectedSkillCategory.id === 'product' ? 'Competitive Product Analysis' : selectedSkillCategory.id === 'sales' ? 'Consultative Selling Techniques' : selectedSkillCategory.id === 'negotiation' ? 'Value-Based Negotiation' : selectedSkillCategory.id === 'communication' ? 'Advanced Presentation Skills' : selectedSkillCategory.id === 'objection' ? 'Handling Price Objections' : 'Creating Urgency in Sales'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Focused training on specific aspects of{' '}
                                {selectedSkillCategory.name.toLowerCase()} that
                                need improvement.
                              </p>
                              <button className="mt-2 text-xs text-blue-600 font-medium">
                                Assign to Team
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        Practical Development Activities
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <UsersIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Role Play Workshops</p>
                            <p className="text-sm text-gray-600">
                              Schedule regular role play sessions focusing on{' '}
                              {selectedSkillCategory.name.toLowerCase()}{' '}
                              scenarios.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CalendarIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              Peer Learning Sessions
                            </p>
                            <p className="text-sm text-gray-600">
                              Pair team members with different skill levels for
                              knowledge sharing and mutual improvement.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Certification Program</p>
                            <p className="text-sm text-gray-600">
                              Implement a formal certification program for{' '}
                              {selectedSkillCategory.name.toLowerCase()} to
                              motivate skill development.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </> : <>
                {/* All Skills Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {skillCategories.map(category => <div key={category.id} className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">{category.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(category.teamAvg, category.requiredLevel)}`}>
                          {category.teamAvg >= category.requiredLevel ? 'Meeting Target' : category.teamAvg >= category.requiredLevel - 10 ? 'Approaching' : 'Needs Focus'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Team Average</p>
                          <p className="text-sm font-medium">
                            {category.teamAvg}% / {category.requiredLevel}%
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${getProgressColor(category.teamAvg, category.requiredLevel)}`} style={{
                    width: `${category.teamAvg}%`
                  }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Gap</p>
                          <p className="text-xl font-semibold text-red-600">
                            -{category.gap}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Trend</p>
                          <div className={`flex items-center text-sm ${getTrendDisplay(category.trend).color}`}>
                            {getTrendDisplay(category.trend).icon}
                            {getTrendDisplay(category.trend).text}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Sub-Skills</h4>
                        <div className="space-y-2">
                          {category.subSkills.map((subSkill, index) => <div key={index}>
                              <div className="flex justify-between items-center">
                                <p className="text-xs">{subSkill.name}</p>
                                <p className="text-xs">
                                  {subSkill.avg}% / {subSkill.required}%
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div className={`h-1.5 rounded-full ${getProgressColor(subSkill.avg, subSkill.required)}`} style={{
                        width: `${subSkill.avg}%`
                      }}></div>
                              </div>
                            </div>)}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                        <button onClick={() => setSkillCategoryFilter(category.id)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>)}
                </div>
                {/* Skills Comparison */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    Skills Comparison
                  </h3>
                  <div className="h-80">
                    <Bar data={{
                labels: skillCategories.map(category => category.name),
                datasets: [{
                  label: 'Team Average',
                  data: skillCategories.map(category => category.teamAvg),
                  backgroundColor: 'rgba(59, 130, 246, 0.7)',
                  borderRadius: 4
                }, {
                  label: 'Required Level',
                  data: skillCategories.map(category => category.requiredLevel),
                  backgroundColor: 'rgba(16, 185, 129, 0.7)',
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
                      text: 'Skill Level (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Skill Category'
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
                {/* Development Priorities */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    Development Priorities
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Skill Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gap
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recommended Action
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impact
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...skillCategories].sort((a, b) => b.gap - a.gap).slice(0, 5).map((category, index) => <tr key={category.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium">
                                  {index + 1}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {category.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-red-600">
                                  -{category.gap}%
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {index === 0 ? 'Team training workshop and certification program' : index === 1 ? 'Focused learning modules and role play sessions' : index === 2 ? 'Self-paced learning and coaching sessions' : index === 3 ? 'Peer learning and knowledge sharing' : 'Refresher training and practice exercises'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${index === 0 || index === 1 ? 'bg-red-100 text-red-800' : index === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {index === 0 || index === 1 ? 'High Impact' : index === 2 ? 'Medium Impact' : 'Low Impact'}
                                </span>
                              </td>
                            </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>}
          </>}
        {/* Team Members Section */}
        {viewMode === 'team' && <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {teamMembersSkills.map(member => <div key={member.id} className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <h3 className="text-lg font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">Skills Average</p>
                      <p className="text-sm font-medium">{member.skillsAvg}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${member.skillsAvg >= 80 ? 'bg-green-500' : member.skillsAvg >= 70 ? 'bg-blue-500' : member.skillsAvg >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                  width: `${member.skillsAvg}%`
                }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">
                      Skills Breakdown
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(member.skills).map(([key, value]) => {
                  const skillName = key === 'productKnowledge' ? 'Product Knowledge' : key === 'salesMethodology' ? 'Sales Methodology' : key === 'objectionHandling' ? 'Objection Handling' : key === 'closingTechniques' ? 'Closing Techniques' : key.charAt(0).toUpperCase() + key.slice(1);
                  const requiredLevel = skillCategories.find(cat => cat.name === skillName)?.requiredLevel || 75;
                  return <div key={key}>
                            <div className="flex justify-between items-center">
                              <p className="text-xs">{skillName}</p>
                              <p className="text-xs">{value}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div className={`h-1.5 rounded-full ${getProgressColor(value, requiredLevel)}`} style={{
                        width: `${value}%`
                      }}></div>
                            </div>
                          </div>;
                })}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Certifications</p>
                      <p className="text-lg font-semibold">
                        {member.certifications}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${member.skillsAvg >= 80 ? 'bg-green-100 text-green-800' : member.skillsAvg >= 70 ? 'bg-blue-100 text-blue-800' : member.skillsAvg >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {member.skillsAvg >= 80 ? 'Advanced' : member.skillsAvg >= 70 ? 'Proficient' : member.skillsAvg >= 60 ? 'Developing' : 'Needs Focus'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Full Profile
                    </button>
                  </div>
                </div>)}
            </div>
            {/* Team Members Skills Comparison */}
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Team Skills Comparison
              </h3>
              <div className="h-96">
                <Bar data={{
              labels: teamMembersSkills.map(member => member.name.split(' ')[0]),
              datasets: skillCategories.map(category => {
                const skillKey = category.id === 'product' ? 'productKnowledge' : category.id === 'sales' ? 'salesMethodology' : category.id === 'negotiation' ? 'negotiation' : category.id === 'communication' ? 'communication' : category.id === 'objection' ? 'objectionHandling' : 'closingTechniques';
                return {
                  label: category.name,
                  data: teamMembersSkills.map(member => member.skills[skillKey]),
                  backgroundColor: category.id === 'product' ? 'rgba(59, 130, 246, 0.7)' : category.id === 'sales' ? 'rgba(16, 185, 129, 0.7)' : category.id === 'negotiation' ? 'rgba(245, 158, 11, 0.7)' : category.id === 'communication' ? 'rgba(139, 92, 246, 0.7)' : category.id === 'objection' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(107, 114, 128, 0.7)',
                  borderRadius: 4
                };
              })
            }} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Skill Level (%)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Team Member'
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
            {/* Team Development Recommendations */}
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">
                Team Development Recommendations
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Top Strength
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Primary Gap
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommended Focus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembersSkills.map(member => {
                  // Find top strength
                  const skills = Object.entries(member.skills);
                  const topStrength = [...skills].sort((a, b) => b[1] - a[1])[0];
                  const topStrengthName = topStrength[0] === 'productKnowledge' ? 'Product Knowledge' : topStrength[0] === 'salesMethodology' ? 'Sales Methodology' : topStrength[0] === 'objectionHandling' ? 'Objection Handling' : topStrength[0] === 'closingTechniques' ? 'Closing Techniques' : topStrength[0].charAt(0).toUpperCase() + topStrength[0].slice(1);
                  // Find primary gap
                  const primaryGap = [...skills].sort((a, b) => a[1] - b[1])[0];
                  const primaryGapName = primaryGap[0] === 'productKnowledge' ? 'Product Knowledge' : primaryGap[0] === 'salesMethodology' ? 'Sales Methodology' : primaryGap[0] === 'objectionHandling' ? 'Objection Handling' : primaryGap[0] === 'closingTechniques' ? 'Closing Techniques' : primaryGap[0].charAt(0).toUpperCase() + primaryGap[0].slice(1);
                  return <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {member.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {topStrengthName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {topStrength[1]}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {primaryGapName}
                            </div>
                            <div className="text-sm text-red-600">
                              {primaryGap[1]}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {primaryGap[0] === 'objectionHandling' ? 'Advanced Objection Handling' : primaryGap[0] === 'negotiation' ? 'Negotiation Masterclass' : primaryGap[0] === 'closingTechniques' ? 'Closing Techniques Workshop' : primaryGap[0] === 'salesMethodology' ? 'Sales Methodology Training' : primaryGap[0] === 'productKnowledge' ? 'Product Knowledge Deep Dive' : 'Communication Skills Workshop'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Assign
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              Schedule
                            </button>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Team Learning Paths */}
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Team Learning Paths</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Create New Learning Path
                </button>
              </div>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Sales Methodology Certification
                      </h4>
                      <p className="text-sm text-gray-500">
                        Required for all sales representatives
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">3/5</span>
                      <p className="text-xs text-gray-500">
                        Team members completed
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{
                  width: '60%'
                }}></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teamMembersSkills.map((member, index) => <div key={member.id} className={`px-2 py-1 text-xs rounded-full flex items-center ${index < 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        <div className="w-4 h-4 rounded-full overflow-hidden mr-1">
                          <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        {member.name.split(' ')[0]}
                        {index < 3 && <CheckCircleIcon className="h-3 w-3 ml-1 text-green-600" />}
                      </div>)}
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Advanced Objection Handling
                      </h4>
                      <p className="text-sm text-gray-500">
                        Recommended for all team members
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">1/5</span>
                      <p className="text-xs text-gray-500">
                        Team members completed
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                  width: '20%'
                }}></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teamMembersSkills.map((member, index) => <div key={member.id} className={`px-2 py-1 text-xs rounded-full flex items-center ${index < 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        <div className="w-4 h-4 rounded-full overflow-hidden mr-1">
                          <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        {member.name.split(' ')[0]}
                        {index < 1 && <CheckCircleIcon className="h-3 w-3 ml-1 text-green-600" />}
                      </div>)}
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </DashboardLayout>;
};
export default SkillsAnalysisPage;