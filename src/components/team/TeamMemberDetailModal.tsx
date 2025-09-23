import React, { useState } from 'react';
import { XIcon, BookOpenIcon, AwardIcon, CalendarIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';
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
type TeamMemberDetailModalProps = {
  member: TeamMember;
  onClose: () => void;
  onAssign: () => void;
  onSchedule: () => void;
};
const TeamMemberDetailModal: React.FC<TeamMemberDetailModalProps> = ({
  member,
  onClose,
  onAssign,
  onSchedule
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-viridian-100';
    if (level >= 60) return 'bg-tangerine-100';
    return 'bg-red-500';
  };
  const getCertificationStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-viridian-20 text-viridian-100">
            Active
          </span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Expired
          </span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-tangerine-20 text-tangerine-100">
            Pending
          </span>;
      default:
        return null;
    }
  };
  // Sample learning paths data
  const learningPaths = [{
    id: '1',
    name: 'Sales Methodology Fundamentals',
    progress: 85,
    dueDate: '2023-08-15'
  }, {
    id: '2',
    name: 'Product Knowledge - Q2 Updates',
    progress: 60,
    dueDate: '2023-07-30'
  }, {
    id: '3',
    name: 'Advanced Negotiation Techniques',
    progress: 25,
    dueDate: '2023-09-10'
  }];
  // Sample recent activities
  const recentActivities = [{
    id: '1',
    action: 'Completed module',
    item: 'Discovery Call Best Practices',
    date: '2023-06-28',
    score: '85%'
  }, {
    id: '2',
    action: 'Started module',
    item: 'Advanced Negotiation Techniques',
    date: '2023-06-27'
  }, {
    id: '3',
    action: 'Failed quiz',
    item: 'Product Features Quiz',
    date: '2023-06-25',
    score: '58%'
  }, {
    id: '4',
    action: 'Completed certification',
    item: 'Sales Methodology',
    date: '2023-06-20',
    score: '92%'
  }];
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              {member.avatar ? <img className="h-12 w-12 rounded-full" src={member.avatar} alt={member.name} /> : <div className="h-12 w-12 rounded-full bg-tangerine-100 flex items-center justify-center text-white font-medium text-lg">
                  {member.name.charAt(0)}
                </div>}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-gray-900">
                {member.name}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <span>{member.role}</span>
                <span className="mx-2">•</span>
                <span>Joined {member.joinDate}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="border-b">
          <div className="px-6 py-2 flex space-x-8">
            <button className={`py-2 px-1 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-tangerine-100 text-tangerine-100' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`py-2 px-1 text-sm font-medium border-b-2 ${activeTab === 'learning' ? 'border-tangerine-100 text-tangerine-100' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('learning')}>
              Learning Progress
            </button>
            <button className={`py-2 px-1 text-sm font-medium border-b-2 ${activeTab === 'skills' ? 'border-tangerine-100 text-tangerine-100' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('skills')}>
              Skills Assessment
            </button>
            <button className={`py-2 px-1 text-sm font-medium border-b-2 ${activeTab === 'activity' ? 'border-tangerine-100 text-tangerine-100' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('activity')}>
              Recent Activity
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Contact Information
                </h3>
                <div className="bg-starlight-40 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{member.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="mt-1">{member.role}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <p className="mt-1">
                        {member.status === 'active' ? <span className="px-2 py-1 text-xs rounded-full bg-viridian-20 text-viridian-100">
                            Active
                          </span> : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Last Active
                      </p>
                      <p className="mt-1">{member.lastActive}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-4">Certifications</h3>
                <div className="bg-starlight-40 rounded-lg p-4">
                  {member.certifications.length > 0 ? <div className="space-y-4">
                      {member.certifications.map((cert, index) => <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            {cert.expiry && <p className="text-sm text-gray-500">
                                {cert.status === 'expired' ? `Expired on ${cert.expiry}` : `Expires on ${cert.expiry}`}
                              </p>}
                          </div>
                          <div>{getCertificationStatusBadge(cert.status)}</div>
                        </div>)}
                    </div> : <p className="text-gray-500">No certifications yet</p>}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
                <div className="bg-starlight-40 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">
                          Overall Completion
                        </p>
                        <p className="text-sm font-medium">
                          {member.progress.completion}%
                        </p>
                      </div>
                      <div className="w-full bg-starlight-80 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${member.progress.completion >= 80 ? 'bg-viridian-100' : member.progress.completion >= 60 ? 'bg-tangerine-100' : 'bg-red-500'}`} style={{
                      width: `${member.progress.completion}%`
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Average Quiz Score
                      </p>
                      <p className="text-2xl font-bold mt-1">
                        {member.progress.quizAvg}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Overdue Items
                      </p>
                      <p className="text-2xl font-bold mt-1">
                        {member.progress.overdue}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>
                <div className="bg-starlight-40 rounded-lg p-4">
                  {member.skills.map((skill, index) => <div key={index} className="mb-3 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">{skill.name}</p>
                        <p className="text-sm font-medium">{skill.level}%</p>
                      </div>
                      <div className="w-full bg-starlight-80 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${getSkillLevelColor(skill.level)}`} style={{
                    width: `${skill.level}%`
                  }}></div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === 'learning' && <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Assigned Learning Paths
                </h3>
                <div className="bg-white border rounded-lg divide-y">
                  {learningPaths.map(path => <div key={path.id} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{path.name}</h4>
                        <span className="text-sm text-gray-500">
                          Due: {path.dueDate}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <div className="w-full bg-starlight-80 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${path.progress >= 80 ? 'bg-viridian-100' : path.progress >= 60 ? 'bg-tangerine-100' : 'bg-red-500'}`} style={{
                        width: `${path.progress}%`
                      }}></div>
                          </div>
                        </div>
                        <span className="ml-4 text-sm font-medium">
                          {path.progress}%
                        </span>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Recommended Content
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Advanced Objection Handling
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Based on skill assessment, this module will help improve
                      objection handling techniques.
                    </p>
                    <button className="text-sm text-tangerine-100 font-medium hover:text-tangerine-80" onClick={onAssign}>
                      Assign
                    </button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Negotiation Masterclass
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Recommended to address gaps in negotiation skills.
                    </p>
                    <button className="text-sm text-tangerine-100 font-medium hover:text-tangerine-80" onClick={onAssign}>
                      Assign
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Upcoming Deadlines</h3>
                <div className="bg-white border rounded-lg divide-y">
                  <div className="p-4 flex items-start">
                    <ClockIcon className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">
                        Product Knowledge Certification
                      </h4>
                      <p className="text-sm text-gray-600">
                        Due in 7 days • 2 of 5 modules completed
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start">
                    <ClockIcon className="h-5 w-5 text-tangerine-100 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">
                        Quarterly Skills Assessment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Due in 14 days • Not started
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'skills' && <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>
                <div className="bg-white border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {member.skills.map((skill, index) => <div key={index} className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium">{skill.name}</p>
                          <div className="flex items-center">
                            <p className="font-medium">{skill.level}%</p>
                            {skill.level < 70 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-tangerine-20 text-tangerine-100">
                                Needs Improvement
                              </span>}
                          </div>
                        </div>
                        <div className="w-full bg-starlight-80 rounded-full h-2.5 mb-2">
                          <div className={`h-2.5 rounded-full ${getSkillLevelColor(skill.level)}`} style={{
                      width: `${skill.level}%`
                    }}></div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {skill.level >= 80 ? 'Proficient - Consistently demonstrates strong capability' : skill.level >= 60 ? 'Developing - Shows competency but has room to grow' : 'Needs Focus - Requires significant improvement'}
                        </p>
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Skill Development Plan
                </h3>
                <div className="bg-white border rounded-lg p-4">
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Negotiation techniques - Currently at 65%</li>
                      <li>Objection handling - Currently at 62%</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Recommended Actions</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <BookOpenIcon className="h-5 w-5 text-tangerine-100 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">
                            Complete "Advanced Negotiation" module
                          </p>
                          <p className="text-sm text-gray-600">
                            Targets improvement in negotiation skills
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CalendarIcon className="h-5 w-5 text-tangerine-100 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">
                            Schedule coaching session
                          </p>
                          <p className="text-sm text-gray-600">
                            One-on-one training for objection handling
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Strengths to Leverage</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Product Knowledge - Currently at 85%</li>
                      <li>Discovery - Currently at 80%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'activity' && <div>
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="bg-white border rounded-lg divide-y">
                {recentActivities.map(activity => <div key={activity.id} className="p-4">
                    <div className="flex items-start">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">
                          {activity.action}:{' '}
                          <span className="text-tangerine-100">
                            {activity.item}
                          </span>
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500">
                            {activity.date}
                          </p>
                          {activity.score && <>
                              <span className="mx-2 text-gray-300">•</span>
                              <p className="text-sm text-gray-500">
                                Score: {activity.score}
                              </p>
                            </>}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <TrendingUpIcon className="h-5 w-5 text-viridian-100 mr-2" />
                    <span className="font-medium">
                      Improving in Product Knowledge
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Quiz scores have increased from 65% to 85% over the last 3
                    months.
                  </p>
                  <div className="flex items-center mb-4">
                    <TrendingUpIcon className="h-5 w-5 text-red-500 mr-2 transform rotate-180" />
                    <span className="font-medium">
                      Declining in Negotiation Skills
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Role play assessments show a 10% decrease in effectiveness
                    over the last quarter.
                  </p>
                </div>
              </div>
            </div>}
        </div>
        <div className="px-6 py-4 border-t bg-starlight-40 flex justify-end space-x-4">
          <button onClick={onSchedule} className="px-4 py-2 border border-tangerine-100 rounded-md text-sm font-medium text-tangerine-100 bg-white hover:bg-tangerine-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tangerine-100">
            Schedule Coaching
          </button>
          <button onClick={onAssign} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tangerine-100 hover:bg-tangerine-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tangerine-100">
            Assign Content
          </button>
        </div>
      </div>
    </div>;
};
export default TeamMemberDetailModal;