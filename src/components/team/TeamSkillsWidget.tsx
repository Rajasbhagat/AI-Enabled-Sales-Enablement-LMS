import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
const TeamSkillsWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // Sample team skills data
  const teamSkills = [{
    name: 'Product Knowledge',
    level: 75,
    trend: {
      value: 5,
      isPositive: true
    },
    benchmark: 85
  }, {
    name: 'Discovery',
    level: 68,
    trend: {
      value: 3,
      isPositive: true
    },
    benchmark: 80
  }, {
    name: 'Negotiation',
    level: 65,
    trend: {
      value: 2,
      isPositive: false
    },
    benchmark: 75
  }, {
    name: 'Closing',
    level: 70,
    trend: {
      value: 4,
      isPositive: true
    },
    benchmark: 80
  }, {
    name: 'Objection Handling',
    level: 62,
    trend: {
      value: 3,
      isPositive: false
    },
    benchmark: 75
  }, {
    name: 'Presentation',
    level: 80,
    trend: {
      value: 6,
      isPositive: true
    },
    benchmark: 85
  }];
  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  const getSkillGapClass = (level: number, benchmark: number) => {
    const gap = benchmark - level;
    if (gap <= 5) return 'text-green-600';
    if (gap <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };
  return <div className="bg-white rounded-lg shadow-sm">
      <div className="p-5 border-b">
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex justify-between items-center w-full">
          <h3 className="text-lg font-medium">Team Skills Assessment</h3>
          {isExpanded ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
        </button>
      </div>
      {isExpanded && <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamSkills.map((skill, index) => <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{skill.name}</h4>
                  <div className="flex items-center">
                    {skill.trend.isPositive ? <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" /> : <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />}
                    <span className={`text-xs ${skill.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {skill.trend.value}%
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>Current: {skill.level}%</span>
                    <span className={getSkillGapClass(skill.level, skill.benchmark)}>
                      Gap: {Math.max(0, skill.benchmark - skill.level)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
                    <div className={`h-2.5 rounded-full ${getSkillLevelColor(skill.level)}`} style={{
                width: `${skill.level}%`
              }}></div>
                    {/* Benchmark indicator */}
                    <div className="absolute top-0 bottom-0 w-0.5 bg-blue-700" style={{
                left: `${skill.benchmark}%`
              }}>
                      <div className="absolute -top-4 -translate-x-1/2 text-xs text-blue-700 whitespace-nowrap">
                        Target: {skill.benchmark}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {skill.level >= 80 ? <span className="text-green-600">Team strength</span> : skill.level >= 60 ? <span className="text-yellow-600">Developing area</span> : <span className="text-red-600">Needs attention</span>}
                </div>
              </div>)}
          </div>
        </div>}
    </div>;
};
export default TeamSkillsWidget;