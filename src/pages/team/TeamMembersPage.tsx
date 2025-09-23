import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SearchIcon, PlusIcon, FilterIcon, DownloadIcon, MoreHorizontalIcon, CheckCircleIcon, XCircleIcon, ClockIcon, UserPlusIcon, AwardIcon, BookOpenIcon, MessageCircleIcon, CalendarIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import TeamMemberDetailModal from '../../components/team/TeamMemberDetailModal';
import AddTeamMemberModal from '../../components/team/AddTeamMemberModal';
type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive';
  progress: {
    completion: number;
    quizAvg: number;
    overdue: number;
  };
  skills: {
    name: string;
    level: number;
  }[];
  certifications: {
    name: string;
    status: 'active' | 'expired' | 'pending';
    expiry?: string;
  }[];
  joinDate: string;
  lastActive: string;
};
const TeamMembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  // Sample team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Account Executive',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'active',
    progress: {
      completion: 85,
      quizAvg: 78,
      overdue: 0
    },
    skills: [{
      name: 'Product Knowledge',
      level: 85
    }, {
      name: 'Discovery',
      level: 80
    }, {
      name: 'Negotiation',
      level: 75
    }, {
      name: 'Closing',
      level: 82
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-12-15'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-10-30'
    }],
    joinDate: '2022-05-15',
    lastActive: '2023-06-28'
  }, {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Senior Sales Representative',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'active',
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
      level: 88
    }, {
      name: 'Closing',
      level: 92
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2024-01-20'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-11-15'
    }, {
      name: 'Advanced Negotiation',
      status: 'active',
      expiry: '2023-09-30'
    }],
    joinDate: '2021-03-10',
    lastActive: '2023-06-29'
  }, {
    id: '3',
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    role: 'Sales Representative',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'active',
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
      level: 50
    }, {
      name: 'Closing',
      level: 45
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'expired',
      expiry: '2023-05-20'
    }, {
      name: 'Product Specialist',
      status: 'pending'
    }],
    joinDate: '2023-01-05',
    lastActive: '2023-06-25'
  }, {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Account Executive',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    status: 'active',
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
      level: 80
    }, {
      name: 'Negotiation',
      level: 65
    }, {
      name: 'Closing',
      level: 70
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-10-10'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-08-15'
    }],
    joinDate: '2022-08-20',
    lastActive: '2023-06-28'
  }, {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    role: 'Sales Representative',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'active',
    progress: {
      completion: 65,
      quizAvg: 70,
      overdue: 2
    },
    skills: [{
      name: 'Product Knowledge',
      level: 72
    }, {
      name: 'Discovery',
      level: 68
    }, {
      name: 'Negotiation',
      level: 55
    }, {
      name: 'Closing',
      level: 65
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-09-05'
    }, {
      name: 'Product Specialist',
      status: 'expired',
      expiry: '2023-06-10'
    }],
    joinDate: '2022-11-12',
    lastActive: '2023-06-27'
  }, {
    id: '6',
    name: 'Jennifer Miller',
    email: 'jennifer.miller@example.com',
    role: 'Senior Account Executive',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    status: 'inactive',
    progress: {
      completion: 90,
      quizAvg: 82,
      overdue: 0
    },
    skills: [{
      name: 'Product Knowledge',
      level: 88
    }, {
      name: 'Discovery',
      level: 85
    }, {
      name: 'Negotiation',
      level: 90
    }, {
      name: 'Closing',
      level: 88
    }],
    certifications: [{
      name: 'Sales Methodology',
      status: 'active',
      expiry: '2023-11-30'
    }, {
      name: 'Product Specialist',
      status: 'active',
      expiry: '2023-10-15'
    }, {
      name: 'Advanced Negotiation',
      status: 'active',
      expiry: '2023-12-20'
    }],
    joinDate: '2021-06-15',
    lastActive: '2023-05-30'
  }]);
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const handleViewDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDetailModal(true);
  };
  const handleAssign = (memberId: string) => {
    toast.info(`Assigning content to team member: ${memberId}`);
    setShowActionMenu(null);
  };
  const handleSchedule = (memberId: string) => {
    toast.info(`Scheduling coaching for team member: ${memberId}`);
    setShowActionMenu(null);
  };
  const handleCertification = (memberId: string) => {
    toast.info(`Managing certifications for team member: ${memberId}`);
    setShowActionMenu(null);
  };
  const handleAddTeamMember = (newMember: any) => {
    setTeamMembers([...teamMembers, newMember]);
    toast.success(`Team member ${newMember.name} has been added successfully`);
  };
  const getStatusBadge = (status: 'active' | 'inactive') => {
    return status === 'active' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Active
      </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Inactive
      </span>;
  };
  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  const getCertificationStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  return <DashboardLayout title="Team Members">
      <div className="mb-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <h2 className="text-xl font-semibold">Team Members</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setShowAddMemberModal(true)}>
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Add Team Member
          </button>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-3 sm:space-y-0">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search team members..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex space-x-2">
            <div className="relative inline-block text-left">
              <select className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FilterIcon className="h-4 w-4 mr-2" />
              More Filters
            </button>
            <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => toast.info('Export functionality')}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        {/* Team Members Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Member
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
                    Certifications
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map(member => <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {member.avatar ? <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} /> : <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {member.name.charAt(0)}
                            </div>}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2 text-sm">
                          {member.progress.completion}%
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${getProgressColor(member.progress.completion)}`} style={{
                        width: `${member.progress.completion}%`
                      }}></div>
                        </div>
                        {member.progress.overdue > 0 && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            {member.progress.overdue} overdue
                          </span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        {member.certifications.length > 0 ? member.certifications.slice(0, 2).map((cert, index) => <div key={index} className="flex items-center">
                                {getCertificationStatusIcon(cert.status)}
                                <span className="ml-1">{cert.name}</span>
                              </div>) : <span>No certifications</span>}
                        {member.certifications.length > 2 && <span className="text-xs text-blue-600">
                            +{member.certifications.length - 2} more
                          </span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button onClick={() => handleViewDetails(member)} className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        <div className="relative">
                          <button onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)} className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontalIcon className="h-5 w-5" />
                          </button>
                          {showActionMenu === member.id && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <button onClick={() => handleAssign(member.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <BookOpenIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Assign Content
                              </button>
                              <button onClick={() => handleSchedule(member.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <CalendarIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Schedule Coaching
                              </button>
                              <button onClick={() => handleCertification(member.id)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <AwardIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Manage Certifications
                              </button>
                              <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => {
                          toast.info(`Sending message to ${member.name}`);
                          setShowActionMenu(null);
                        }}>
                                <MessageCircleIcon className="mr-3 h-4 w-4 text-gray-500" />
                                Send Message
                              </button>
                            </div>}
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredMembers.length}</span> of{' '}
                <span className="font-medium">{filteredMembers.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Team Member Detail Modal */}
      {showDetailModal && selectedMember && <TeamMemberDetailModal member={selectedMember} onClose={() => setShowDetailModal(false)} onAssign={() => handleAssign(selectedMember.id)} onSchedule={() => handleSchedule(selectedMember.id)} />}
      {/* Add Team Member Modal */}
      {showAddMemberModal && <AddTeamMemberModal onClose={() => setShowAddMemberModal(false)} onAddMember={handleAddTeamMember} />}
    </DashboardLayout>;
};
export default TeamMembersPage;