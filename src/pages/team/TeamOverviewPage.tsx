import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import KPICard from '../../components/dashboard/KPICard';
import ProgressCard from '../../components/dashboard/ProgressCard';
import { UsersIcon, CheckCircleIcon, AwardIcon, BrainIcon, AlertTriangleIcon, TrendingUpIcon, CalendarIcon, XIcon, BookOpenIcon } from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Radar, Line } from 'react-chartjs-2';
import TeamSkillsWidget from '../../components/team/TeamSkillsWidget';
import TeamLearningPathsWidget from '../../components/team/TeamLearningPathsWidget';
import TeamActivityFeed from '../../components/team/TeamActivityFeed';
import { toast } from 'react-toastify';
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);
const TeamOverviewPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showTeamMembersModal, setShowTeamMembersModal] = useState(false);
  const [showCertificationsModal, setShowCertificationsModal] = useState(false);
  const [showQuizScoresModal, setShowQuizScoresModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showDeadlinesModal, setShowDeadlinesModal] = useState(false);
  // Sample data for charts
  const completionTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Team Completion',
      data: [58, 62, 65, 68],
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
      borderColor: 'rgba(37, 99, 235, 1)',
      borderWidth: 2
    }, {
      label: 'Department Average',
      data: [62, 65, 69, 72],
      backgroundColor: 'rgba(107, 114, 128, 0.5)',
      borderColor: 'rgba(107, 114, 128, 1)',
      borderWidth: 2,
      borderDash: [5, 5]
    }]
  };
  const skillsData = {
    labels: ['Product Knowledge', 'Discovery', 'Negotiation', 'Closing', 'Objection Handling', 'Presentation'],
    datasets: [{
      label: 'Team Average',
      data: [75, 68, 65, 70, 62, 80],
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: 'rgba(37, 99, 235, 1)',
      borderWidth: 2
    }, {
      label: 'Benchmark',
      data: [85, 80, 75, 80, 75, 85],
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      borderColor: 'rgba(5, 150, 105, 1)',
      borderWidth: 2
    }]
  };
  const performanceByModuleData = {
    labels: ['Sales Methodology', 'Product Features', 'Negotiation', 'Objection Handling', 'Closing Techniques'],
    datasets: [{
      label: 'Quiz Score',
      data: [82, 76, 65, 72, 78],
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
      borderRadius: 4
    }, {
      label: 'Completion Rate',
      data: [95, 88, 72, 85, 92],
      backgroundColor: 'rgba(5, 150, 105, 0.7)',
      borderRadius: 4
    }]
  };
  const quizScoresByMemberData = {
    labels: ['John Smith', 'Sarah Johnson', 'Michael Lee', 'Emily Davis', 'Robert Wilson', 'Jennifer Miller'],
    datasets: [{
      label: 'Quiz Scores',
      data: [78, 85, 62, 75, 70, 82],
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
      borderRadius: 4
    }, {
      label: 'Benchmark',
      data: [75, 75, 75, 75, 75, 75],
      backgroundColor: 'rgba(107, 114, 128, 0.5)',
      borderRadius: 4
    }]
  };
  const teamActivity = [{
    id: '1',
    user: 'Sarah Johnson',
    action: 'completed',
    item: 'Advanced Negotiation Techniques',
    timestamp: 'Today, 10:23 AM',
    score: '92%'
  }, {
    id: '2',
    user: 'Michael Lee',
    action: 'started',
    item: 'Product Knowledge - Q2 Updates',
    timestamp: 'Today, 9:15 AM'
  }, {
    id: '3',
    user: 'Emily Davis',
    action: 'completed',
    item: 'Customer Objection Handling',
    timestamp: 'Yesterday, 4:45 PM',
    score: '85%'
  }, {
    id: '4',
    user: 'Robert Wilson',
    action: 'failed',
    item: 'Sales Methodology Quiz',
    timestamp: 'Yesterday, 2:30 PM',
    score: '58%'
  }, {
    id: '5',
    user: 'John Smith',
    action: 'completed',
    item: 'Discovery Call Best Practices',
    timestamp: '2 days ago',
    score: '78%'
  }];
  // Team members data
  const teamMembers = [{
    id: '1',
    name: 'John Smith',
    role: 'Account Executive',
    status: 'On Track',
    progress: {
      completion: 85,
      quizAvg: 78,
      overdue: 0
    }
  }, {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Senior Sales Representative',
    status: 'On Track',
    progress: {
      completion: 92,
      quizAvg: 85,
      overdue: 0
    }
  }, {
    id: '3',
    name: 'Michael Lee',
    role: 'Sales Representative',
    status: 'At Risk',
    progress: {
      completion: 45,
      quizAvg: 62,
      overdue: 3
    }
  }, {
    id: '4',
    name: 'Emily Davis',
    role: 'Account Executive',
    status: 'Attention Needed',
    progress: {
      completion: 73,
      quizAvg: 75,
      overdue: 1
    }
  }, {
    id: '5',
    name: 'Robert Wilson',
    role: 'Sales Representative',
    status: 'Attention Needed',
    progress: {
      completion: 65,
      quizAvg: 70,
      overdue: 2
    }
  }, {
    id: '6',
    name: 'Jennifer Miller',
    role: 'Senior Account Executive',
    status: 'On Track',
    progress: {
      completion: 90,
      quizAvg: 82,
      overdue: 0
    }
  }];
  // Certification data
  const certifications = [{
    name: 'Sales Methodology',
    total: 6,
    active: 5,
    expired: 0,
    pending: 1,
    nextDue: '5 days'
  }, {
    name: 'Product Specialist',
    total: 5,
    active: 3,
    expired: 1,
    pending: 1,
    nextDue: '14 days'
  }, {
    name: 'Advanced Negotiation',
    total: 3,
    active: 3,
    expired: 0,
    pending: 0,
    nextDue: '30 days'
  }];
  // Deadlines data
  const deadlines = [{
    id: '1',
    title: 'Product Knowledge Certification',
    dueIn: 3,
    priority: 'high',
    pendingMembers: 2,
    pendingMembersList: ['Michael Lee', 'Robert Wilson']
  }, {
    id: '2',
    title: 'Q2 Sales Methodology Training',
    dueIn: 7,
    priority: 'medium',
    pendingMembers: 4,
    pendingMembersList: ['Michael Lee', 'Robert Wilson', 'Emily Davis', 'John Smith']
  }, {
    id: '3',
    title: 'Quarterly Performance Review',
    dueIn: 14,
    priority: 'medium',
    pendingMembers: 6,
    pendingMembersList: ['John Smith', 'Sarah Johnson', 'Michael Lee', 'Emily Davis', 'Robert Wilson', 'Jennifer Miller']
  }, {
    id: '4',
    title: 'Objection Handling Workshop',
    dueIn: 21,
    priority: 'low',
    pendingMembers: 3,
    pendingMembersList: ['Michael Lee', 'Robert Wilson', 'Emily Davis']
  }];
  const handleAction = (action: string) => {
    toast.info(`${action} action initiated`);
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 text-red-500';
      case 'medium':
        return 'border-yellow-500 text-yellow-500';
      case 'low':
        return 'border-blue-500 text-blue-500';
      default:
        return 'border-gray-500 text-gray-500';
    }
  };
  return <DashboardLayout title="Team Overview">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Team Performance Dashboard</h2>
          <div className="flex space-x-4">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 365 days</option>
            </select>
          </div>
        </div>
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div onClick={() => setShowCompletionModal(true)} className="cursor-pointer">
            <KPICard title="Team Completion" value="68%" trend={{
            value: 3,
            isPositive: true
          }} icon={<CheckCircleIcon className="h-5 w-5" />} color="green" description="Dept Avg: 72%" />
          </div>
          <div onClick={() => setShowTeamMembersModal(true)} className="cursor-pointer">
            <KPICard title="Team Members" value="6" description="2 need attention" icon={<UsersIcon className="h-5 w-5" />} color="blue" />
          </div>
          <div onClick={() => setShowCertificationsModal(true)} className="cursor-pointer">
            <KPICard title="Certifications" value="8/12" description="3 expiring soon" icon={<AwardIcon className="h-5 w-5" />} color="yellow" />
          </div>
          <div onClick={() => setShowQuizScoresModal(true)} className="cursor-pointer">
            <KPICard title="Avg. Quiz Score" value="74%" trend={{
            value: 2,
            isPositive: true
          }} icon={<BrainIcon className="h-5 w-5" />} color="blue" description="Pass Rate: 80%" />
          </div>
        </div>
        {/* Completion Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Completion Trend</h3>
            <div className="h-80">
              <Line data={completionTrendData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  min: 50,
                  max: 100
                }
              },
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Last 30 Days Progress'
                }
              }
            }} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-5 rounded-lg shadow-sm h-full">
              <h3 className="text-lg font-medium mb-4">Team Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">On Track</span>
                  <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">
                    3 members
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{
                  width: '50%'
                }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Needs Attention</span>
                  <span className="text-sm bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">
                    2 members
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                  width: '33%'
                }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">At Risk</span>
                  <span className="text-sm bg-red-100 text-red-800 py-1 px-2 rounded-full">
                    1 member
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{
                  width: '17%'
                }}></div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Coaching Needed</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        Michael Lee - 3 overdue items
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangleIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        Robert Wilson - Low quiz scores
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Skills and Performance by Module */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm" onClick={() => setShowSkillsModal(true)} style={{
          cursor: 'pointer'
        }}>
            <h3 className="text-lg font-medium mb-4">Skills Gap Analysis</h3>
            <div className="h-80">
              <Radar data={skillsData} options={{
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
              elements: {
                line: {
                  borderWidth: 2
                }
              }
            }} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Performance by Module</h3>
            <div className="h-80">
              <Bar data={performanceByModuleData} options={{
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
                    text: 'Training Modules'
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
        {/* Learning Paths and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TeamLearningPathsWidget />
          </div>
          <div className="lg:col-span-1">
            <TeamActivityFeed activities={teamActivity} />
          </div>
        </div>
        {/* Upcoming Deadlines */}
        <div className="bg-white p-5 rounded-lg shadow-sm" onClick={() => setShowDeadlinesModal(true)} style={{
        cursor: 'pointer'
      }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">
                    Product Knowledge Certification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Due in 3 days • 2 team members pending
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Q2 Sales Methodology Training</h4>
                  <p className="text-sm text-gray-600">
                    Due in 7 days • 4 team members pending
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Quarterly Performance Review</h4>
                  <p className="text-sm text-gray-600">
                    Due in 14 days • All team members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drill-down Modals */}
      {/* Completion Modal */}
      {showCompletionModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Team Completion Details
              </h2>
              <button onClick={() => setShowCompletionModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="h-64">
                  <Line data={completionTrendData} options={{
                responsive: true,
                maintainAspectRatio: false
              }} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Completion Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Completed</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '68%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">In Progress</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '22%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Not Started</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-500 h-2.5 rounded-full" style={{
                      width: '10%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Completion by Content Type
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Required Modules
                          </span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{
                        width: '75%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Optional Modules
                          </span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-500 h-2.5 rounded-full" style={{
                        width: '45%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Certifications
                          </span>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{
                        width: '62%'
                      }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Individual Completion Rates
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team Member
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Completion Rate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Overdue Items
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teamMembers.map(member => <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900 mr-2">
                                {member.progress.completion}%
                              </span>
                              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                                <div className={`h-2.5 rounded-full ${member.progress.completion >= 80 ? 'bg-green-500' : member.progress.completion >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                            width: `${member.progress.completion}%`
                          }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'On Track' ? 'bg-green-100 text-green-800' : member.status === 'Attention Needed' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.progress.overdue}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={() => {
              setShowCompletionModal(false);
              toast.info('Exporting completion report');
            }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Export Report
                </button>
                <button onClick={() => {
              setShowCompletionModal(false);
              toast.info('Opening team progress management');
            }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Manage Progress
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Team Members Modal */}
      {showTeamMembersModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Team Members Status
              </h2>
              <button onClick={() => setShowTeamMembersModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-2">On Track</h3>
                  <p className="text-2xl font-bold text-green-600">3</p>
                  <p className="text-sm text-green-700 mt-1">
                    50% of team members
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">
                    Needs Attention
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    33% of team members
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 mb-2">At Risk</h3>
                  <p className="text-2xl font-bold text-red-600">1</p>
                  <p className="text-sm text-red-700 mt-1">
                    17% of team members
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completion
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quiz Avg
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembers.map(member => <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {member.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'On Track' ? 'bg-green-100 text-green-800' : member.status === 'Attention Needed' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.progress.completion}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.progress.quizAvg}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button onClick={() => {
                      setShowTeamMembersModal(false);
                      toast.info(`Viewing details for ${member.name}`);
                    }} className="text-blue-600 hover:text-blue-900 mr-3">
                            View
                          </button>
                          {member.status !== 'On Track' && <button onClick={() => {
                      setShowTeamMembersModal(false);
                      toast.info(`Setting up coaching for ${member.name}`);
                    }} className="text-green-600 hover:text-green-900">
                              Coach
                            </button>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => {
              setShowTeamMembersModal(false);
              toast.info('Navigating to team members page');
            }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  View All Team Members
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Certifications Modal */}
      {showCertificationsModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Team Certifications
              </h2>
              <button onClick={() => setShowCertificationsModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <AwardIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800">Active</h3>
                  <p className="text-2xl font-bold text-green-600">11</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <ClockIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-medium text-yellow-800">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <AlertTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-medium text-red-800">Expired</h3>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-3">
                Certification Status
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Certification
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expired
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pending
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Due
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certifications.map((cert, index) => <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {cert.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cert.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                          {cert.active}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {cert.expired}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                          {cert.pending}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cert.nextDue}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <h3 className="font-medium text-gray-900 mb-3">Expiring Soon</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Emily Davis - Product Specialist
                      </p>
                      <p className="text-sm text-yellow-700">
                        Expires in 5 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        John Smith - Sales Methodology
                      </p>
                      <p className="text-sm text-yellow-700">
                        Expires in 14 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Sarah Johnson - Advanced Negotiation
                      </p>
                      <p className="text-sm text-yellow-700">
                        Expires in 30 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => {
              setShowCertificationsModal(false);
              toast.info('Sending certification reminders');
            }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Send Reminders
                </button>
                <button onClick={() => {
              setShowCertificationsModal(false);
              toast.info('Opening certification management');
            }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Manage Certifications
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Quiz Scores Modal */}
      {showQuizScoresModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Quiz Performance
              </h2>
              <button onClick={() => setShowQuizScoresModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-blue-800">Average Score</h3>
                  <p className="text-2xl font-bold text-blue-600">74%</p>
                  <p className="text-sm text-blue-700 mt-1">
                    +2% from last month
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-green-800">Pass Rate</h3>
                  <p className="text-2xl font-bold text-green-600">80%</p>
                  <p className="text-sm text-green-700 mt-1">
                    4 out of 5 members
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-yellow-800">
                    Needs Improvement
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Below 65% threshold
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  Quiz Scores by Team Member
                </h3>
                <div className="h-64">
                  <Bar data={quizScoresByMemberData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Score (%)'
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
              <h3 className="font-medium text-gray-900 mb-3">
                Recent Quiz Results
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quiz
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Advanced Negotiation Techniques
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        92%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Passed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Today
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Emily Davis
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Customer Objection Handling
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        85%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Passed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Yesterday
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Robert Wilson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Sales Methodology Quiz
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        58%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Failed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Yesterday
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        John Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Discovery Call Best Practices
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        78%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Passed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 days ago
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => {
              setShowQuizScoresModal(false);
              toast.info('Exporting quiz performance report');
            }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Export Report
                </button>
                <button onClick={() => {
              setShowQuizScoresModal(false);
              toast.info('Opening quiz management');
            }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Manage Quizzes
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Skills Modal */}
      {showSkillsModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Team Skills Analysis
              </h2>
              <button onClick={() => setShowSkillsModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="h-80">
                  <Radar data={skillsData} options={{
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
                }
              }} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Skill Gap Analysis
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Negotiation</span>
                        <span className="text-sm font-medium">65% / 75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{
                      width: '65%'
                    }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        10% below benchmark - Highest priority
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Objection Handling
                        </span>
                        <span className="text-sm font-medium">62% / 75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{
                      width: '62%'
                    }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        13% below benchmark - High priority
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Discovery</span>
                        <span className="text-sm font-medium">68% / 80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '68%'
                    }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        12% below benchmark - Medium priority
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Recommended Training
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <BookOpenIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            Advanced Negotiation Techniques
                          </p>
                          <p className="text-sm text-gray-600">
                            4-week course to improve negotiation skills
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpenIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            Objection Handling Masterclass
                          </p>
                          <p className="text-sm text-gray-600">
                            2-week intensive program with role-playing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-3">
                Individual Skills Assessment
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Negotiation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Objection Handling
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discovery
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Closing
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Knowledge
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        80%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        85%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        85%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        90%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        90%
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        John Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        70%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        65%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        75%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        85%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        80%
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Michael Lee
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        45%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        40%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        55%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        50%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        60%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => {
              setShowSkillsModal(false);
              toast.info('Creating team development plan');
            }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Create Development Plan
                </button>
                <button onClick={() => {
              setShowSkillsModal(false);
              toast.info('Assigning skill training');
            }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Assign Training
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Deadlines Modal */}
      {showDeadlinesModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900">
                Upcoming Deadlines
              </h2>
              <button onClick={() => setShowDeadlinesModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6 mb-6">
                {deadlines.map(deadline => <div key={deadline.id} className={`border-l-4 pl-4 py-3 ${getPriorityColor(deadline.priority)}`}>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <CalendarIcon className={`h-5 w-5 mt-0.5 mr-2 flex-shrink-0 ${getPriorityColor(deadline.priority)}`} />
                        <div>
                          <h4 className="font-medium">{deadline.title}</h4>
                          <p className="text-sm text-gray-600">
                            Due in {deadline.dueIn} days •{' '}
                            {deadline.pendingMembers} team member
                            {deadline.pendingMembers !== 1 ? 's' : ''} pending
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">
                              Pending team members:
                            </p>
                            <div className="flex flex-wrap mt-1 gap-1">
                              {deadline.pendingMembersList.map((member, idx) => <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {member}
                                  </span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button onClick={() => toast.info(`Sending reminder for ${deadline.title}`)} className="text-sm text-blue-600 hover:text-blue-900">
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="flex justify-between">
                <button onClick={() => {
              setShowDeadlinesModal(false);
              toast.info('Opening calendar view');
            }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  View Calendar
                </button>
                <div className="space-x-3">
                  <button onClick={() => {
                setShowDeadlinesModal(false);
                toast.info('Sending reminders to all pending team members');
              }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Send All Reminders
                  </button>
                  <button onClick={() => {
                setShowDeadlinesModal(false);
                toast.info('Creating new deadline');
              }} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Add Deadline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </DashboardLayout>;
};
export default TeamOverviewPage;