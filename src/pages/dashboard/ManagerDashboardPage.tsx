import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import KPICard from '../../components/dashboard/KPICard';
import ActionWidget from '../../components/dashboard/ActionWidget';
import AlertWidget from '../../components/dashboard/AlertWidget';
import TeamPerformanceTable from '../../components/dashboard/TeamPerformanceTable';
import TeamMemberDetailModal from '../../components/team/TeamMemberDetailModal';
import TeamSkillsWidget from '../../components/team/TeamSkillsWidget';
import TeamLearningPathsWidget from '../../components/team/TeamLearningPathsWidget';
import { UsersIcon, CheckCircleIcon, AlertTriangleIcon, BrainIcon, AwardIcon, BarChart4Icon } from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Radar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Tooltip, Legend);
const ManagerDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showCertificationsModal, setShowCertificationsModal] = useState(false);
  const [showCoachingModal, setShowCoachingModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  // Pie Chart Data
  const completionData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      data: [68, 22, 10],
      backgroundColor: ['#FF7A01', '#FAF8D5', '#6B7280'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      borderWidth: 2
    }]
  };
  // Radar Chart Data for Skills Gap
  const skillsData = {
    labels: ['Product Knowledge', 'Discovery', 'Negotiation', 'Closing', 'Objection Handling', 'Presentation'],
    datasets: [{
      label: 'Team Average',
      data: [75, 68, 65, 70, 62, 80],
      backgroundColor: 'rgba(255, 122, 1, 0.2)',
      borderColor: 'rgba(255, 122, 1, 1)',
      borderWidth: 2
    }, {
      label: 'Benchmark',
      data: [85, 80, 75, 80, 75, 85],
      backgroundColor: 'rgba(0, 135, 131, 0.1)',
      borderColor: 'rgba(0, 135, 131, 1)',
      borderWidth: 2
    }]
  };
  // Team Member Data
  const teamMembers = [{
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Sales Representative',
    completion: 85,
    score: 78,
    overdue: 0,
    status: 'On Track',
    progress: {
      completion: 85,
      quizAvg: 78,
      overdue: 0
    },
    skills: [{
      name: 'Product Knowledge',
      level: 80
    }, {
      name: 'Discovery',
      level: 75
    }, {
      name: 'Negotiation',
      level: 70
    }, {
      name: 'Closing',
      level: 85
    }, {
      name: 'Objection Handling',
      level: 65
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-12-15'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-11-30'
    }],
    joinDate: '2022-03-15',
    lastActive: '2023-07-01'
  }, {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Senior Sales Representative',
    completion: 92,
    score: 85,
    overdue: 0,
    status: 'On Track',
    progress: {
      completion: 92,
      quizAvg: 85,
      overdue: 0
    },
    skills: [{
      name: 'Product Knowledge',
      level: 90
    }, {
      name: 'Discovery',
      level: 85
    }, {
      name: 'Negotiation',
      level: 80
    }, {
      name: 'Closing',
      level: 90
    }, {
      name: 'Objection Handling',
      level: 85
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2024-01-15'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-12-10'
    }, {
      name: 'Advanced Negotiation',
      status: 'active',
      expiry: '2023-10-22'
    }],
    joinDate: '2021-06-10',
    lastActive: '2023-07-02'
  }, {
    id: '3',
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    role: 'Sales Representative',
    completion: 45,
    score: 62,
    overdue: 3,
    status: 'At Risk',
    progress: {
      completion: 45,
      quizAvg: 62,
      overdue: 3
    },
    skills: [{
      name: 'Product Knowledge',
      level: 60
    }, {
      name: 'Discovery',
      level: 55
    }, {
      name: 'Negotiation',
      level: 45
    }, {
      name: 'Closing',
      level: 50
    }, {
      name: 'Objection Handling',
      level: 40
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'pending',
      expiry: ''
    }],
    joinDate: '2023-01-20',
    lastActive: '2023-06-28'
  }, {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Sales Representative',
    completion: 73,
    score: 75,
    overdue: 1,
    status: 'Attention Needed',
    progress: {
      completion: 73,
      quizAvg: 75,
      overdue: 1
    },
    skills: [{
      name: 'Product Knowledge',
      level: 75
    }, {
      name: 'Discovery',
      level: 70
    }, {
      name: 'Negotiation',
      level: 65
    }, {
      name: 'Closing',
      level: 70
    }, {
      name: 'Objection Handling',
      level: 60
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-09-15'
    }, {
      name: 'Product Specialist',
      status: 'expired',
      expiry: '2023-06-30'
    }],
    joinDate: '2022-08-05',
    lastActive: '2023-07-01'
  }, {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    role: 'Sales Representative',
    completion: 65,
    score: 70,
    overdue: 2,
    status: 'Attention Needed',
    progress: {
      completion: 65,
      quizAvg: 70,
      overdue: 2
    },
    skills: [{
      name: 'Product Knowledge',
      level: 70
    }, {
      name: 'Discovery',
      level: 65
    }, {
      name: 'Negotiation',
      level: 55
    }, {
      name: 'Closing',
      level: 60
    }, {
      name: 'Objection Handling',
      level: 55
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-08-20'
    }],
    joinDate: '2022-11-12',
    lastActive: '2023-06-29'
  }];
  // Alerts for Alert Widget
  const alerts = [{
    id: '1',
    type: 'coaching',
    title: 'Michael Lee needs coaching',
    description: '3 overdue assignments, quiz score below 65%',
    priority: 'high',
    date: 'Today'
  }, {
    id: '2',
    type: 'coaching',
    title: 'Robert Wilson needs attention',
    description: '2 overdue assignments, negotiation skills gap',
    priority: 'medium',
    date: 'Yesterday'
  }, {
    id: '3',
    type: 'certification',
    title: 'Team Certifications Expiring',
    description: '3 team members have certifications expiring in 14 days',
    priority: 'medium',
    date: '2 days ago'
  }];
  const handleAction = (action: string) => {
    switch (action) {
      case 'add_team_member':
        toast.info('Opening add team member form');
        // In a real app, you would navigate to the form or open a modal
        break;
      case 'assign_module':
        toast.info('Opening module assignment interface');
        break;
      case 'create_quiz':
        toast.info('Opening quiz creation interface');
        break;
      default:
        toast.info(`Action triggered: ${action}`);
    }
  };
  const handleAlertAction = (alertId: string, action: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (action === 'assign') {
      toast.info(`Opening assignment interface for ${alert?.title}`);
    } else if (action === 'schedule') {
      toast.info(`Opening scheduling calendar for ${alert?.title}`);
    } else if (action === 'remind') {
      toast.success(`Reminder sent for ${alert?.title}`);
    } else if (action === 'view') {
      toast.info(`Viewing details for ${alert?.title}`);
    }
  };
  const handleTeamMemberAction = (memberId: string, action: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (action === 'view') {
      setSelectedMember(member);
      setShowDetailModal(true);
    } else if (action === 'coach') {
      setSelectedMember(member);
      setShowCoachingModal(true);
    }
  };
  const handleKPIClick = (type: string) => {
    switch (type) {
      case 'completion':
        setShowPerformanceModal(true);
        break;
      case 'quiz':
        toast.info('Opening quiz performance details');
        break;
      case 'certifications':
        setShowCertificationsModal(true);
        break;
      case 'coaching':
        setShowCoachingModal(true);
        break;
      case 'skills':
        setShowSkillsModal(true);
        break;
      case 'performer':
        const topPerformer = teamMembers.find(m => m.name === 'Sarah Johnson');
        setSelectedMember(topPerformer);
        setShowDetailModal(true);
        break;
      default:
        toast.info(`Viewing ${type} details`);
    }
  };
  return <DashboardLayout title="Home">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Team Overview</h2>
          <div className="flex space-x-4">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-tangerine-100 focus:border-tangerine-100 sm:text-sm rounded-md">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <select value={selectedTeamMember} onChange={e => setSelectedTeamMember(e.target.value)} className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-tangerine-100 focus:border-tangerine-100 sm:text-sm rounded-md">
              <option value="all">All Team Members</option>
              {teamMembers.map(member => <option key={member.id} value={member.name.toLowerCase().replace(' ', '_')}>
                  {member.name}
                </option>)}
            </select>
          </div>
        </div>
        {/* KPI Cards Row - 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div onClick={() => handleKPIClick('completion')} className="cursor-pointer">
            <KPICard title="Team Completion Rate" value="68%" trend={{
            value: 2,
            isPositive: true
          }} icon={<CheckCircleIcon className="h-5 w-5" />} color="tangerine" description="Department Avg: 72%" />
          </div>
          <div onClick={() => handleKPIClick('quiz')} className="cursor-pointer">
            <KPICard title="Average Quiz Score" value="74%" description="Pass Rate: 80%" icon={<BarChart4Icon className="h-5 w-5" />} color="viridian" />
          </div>
          <div onClick={() => handleKPIClick('certifications')} className="cursor-pointer">
            <KPICard title="Certifications Due" value="3" description="Next due: 5 days" icon={<AwardIcon className="h-5 w-5" />} color="royal-blue" />
          </div>
          <div onClick={() => handleKPIClick('coaching')} className="cursor-pointer">
            <KPICard title="Coaching Queue" value="2" description="Team members need attention" icon={<AlertTriangleIcon className="h-5 w-5" />} color="tangerine" />
          </div>
          <div onClick={() => handleKPIClick('skills')} className="cursor-pointer">
            <KPICard title="Skills Gap Alert" value="Negotiation" description="Biggest team improvement area" icon={<BrainIcon className="h-5 w-5" />} color="royal-blue" />
          </div>
          <div onClick={() => handleKPIClick('performer')} className="cursor-pointer">
            <KPICard title="Top Performer" value="Sarah Johnson" description="92% completion, 85% quiz avg" icon={<UsersIcon className="h-5 w-5" />} color="viridian" />
          </div>
        </div>
        {/* Charts and Widgets Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-gray-900">
              Performance Overview
            </h3>
            <div className="h-64">
              <Pie data={completionData} options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-gray-900">
              Skills Gap Analysis
            </h3>
            <div className="h-64">
              <Radar data={skillsData} options={{
              maintainAspectRatio: false,
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  beginAtZero: true
                }
              },
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }} />
            </div>
          </div>
        </div>
        {/* Team Performance and Alerts/Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TeamPerformanceTable members={teamMembers} onAction={handleTeamMemberAction} role="SALES_MANAGER" />
          </div>
          <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            <AlertWidget alerts={alerts} onAction={handleAlertAction} />
            <ActionWidget role="SALES_MANAGER" onAction={handleAction} />
          </div>
        </div>
        {/* Team Learning Paths Widget */}
        <TeamLearningPathsWidget />
        {/* Modals */}
        {showDetailModal && selectedMember && <TeamMemberDetailModal member={selectedMember} onClose={() => setShowDetailModal(false)} onAssign={() => {
        setShowDetailModal(false);
        toast.info(`Opening assignment interface for ${selectedMember.name}`);
      }} onSchedule={() => {
        setShowDetailModal(false);
        toast.info(`Opening scheduling calendar for ${selectedMember.name}`);
      }} />}
        {showSkillsModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-medium text-gray-900">
                  Team Skills Analysis
                </h2>
                <button onClick={() => setShowSkillsModal(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <TeamSkillsWidget />
              </div>
            </div>
          </div>}
        {showCertificationsModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-medium text-gray-900">
                  Team Certifications
                </h2>
                <button onClick={() => setShowCertificationsModal(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {teamMembers.map(member => <div key={member.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <div className="mt-2 space-y-2">
                        {member.certifications.length > 0 ? member.certifications.map((cert, index) => <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">
                                  {cert.name}
                                </p>
                                {cert.expiry && <p className="text-xs text-gray-500">
                                    {cert.status === 'expired' ? `Expired on ${cert.expiry}` : `Expires on ${cert.expiry}`}
                                  </p>}
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${cert.status === 'active' ? 'bg-viridian-20 text-viridian-100' : cert.status === 'pending' ? 'bg-tangerine-20 text-tangerine-100' : 'bg-red-100 text-red-800'}`}>
                                {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                              </span>
                            </div>) : <p className="text-sm text-gray-500">
                            No certifications
                          </p>}
                      </div>
                    </div>)}
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => {
                setShowCertificationsModal(false);
                toast.info('Opening certification management interface');
              }} className="px-4 py-2 bg-tangerine-100 text-white rounded-md hover:bg-tangerine-80">
                    Manage Certifications
                  </button>
                </div>
              </div>
            </div>
          </div>}
        {showCoachingModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-medium text-gray-900">
                  Coaching Queue
                </h2>
                <button onClick={() => setShowCoachingModal(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {teamMembers.filter(member => member.status !== 'On Track').map(member => <div key={member.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">
                            {member.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'At Risk' ? 'bg-red-100 text-red-800' : 'bg-tangerine-20 text-tangerine-100'}`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            {member.status === 'At Risk' ? `${member.overdue} overdue items, quiz score ${member.score}%` : `${member.overdue} overdue items`}
                          </p>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button onClick={() => {
                    toast.info(`Opening remedial content for ${member.name}`);
                  }} className="px-3 py-1 text-sm bg-white border border-tangerine-100 text-tangerine-100 rounded-md hover:bg-tangerine-20">
                            Assign Remedial
                          </button>
                          <button onClick={() => {
                    toast.info(`Opening scheduling calendar for ${member.name}`);
                  }} className="px-3 py-1 text-sm bg-tangerine-100 text-white rounded-md hover:bg-tangerine-80">
                            Schedule Call
                          </button>
                        </div>
                      </div>)}
                </div>
              </div>
            </div>
          </div>}
        {showPerformanceModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-medium text-gray-900">
                  Team Completion Details
                </h2>
                <button onClick={() => setShowPerformanceModal(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="h-64">
                    <Pie data={completionData} options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
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
                          <div className="bg-tangerine-100 h-2.5 rounded-full" style={{
                        width: '68%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            In Progress
                          </span>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-starlight-100 h-2.5 rounded-full" style={{
                        width: '22%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Not Started
                          </span>
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
                            <div className="bg-viridian-100 h-2.5 rounded-full" style={{
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
                            <div className="bg-royal-blue-100 h-2.5 rounded-full" style={{
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
                            <div className="bg-violet-100 h-2.5 rounded-full" style={{
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
                      <thead className="bg-starlight-80">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Team Member
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Completion Rate
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Actions
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
                                  {member.completion}%
                                </span>
                                <div className="w-24 bg-starlight-80 rounded-full h-2.5">
                                  <div className={`h-2.5 rounded-full ${member.completion >= 80 ? 'bg-viridian-100' : member.completion >= 60 ? 'bg-tangerine-100' : 'bg-red-500'}`} style={{
                              width: `${member.completion}%`
                            }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'On Track' ? 'bg-viridian-20 text-viridian-100' : member.status === 'Attention Needed' ? 'bg-tangerine-20 text-tangerine-100' : 'bg-red-100 text-red-800'}`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={() => {
                          setSelectedMember(member);
                          setShowDetailModal(true);
                          setShowPerformanceModal(false);
                        }} className="text-tangerine-100 hover:text-tangerine-80">
                                View Details
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </DashboardLayout>;
};
export default ManagerDashboardPage;