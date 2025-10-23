'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/controls/card';
import { Button } from '@/components/controls/button';
import { 
  Users, 
  Trophy, 
  Calendar, 
  Activity, 
  TrendingUp,
  FileText,
  Zap,
  Flag,
  UserCheck,
  CheckIcon,
  Star
} from 'lucide-react';

// Dynamically import Recharts components
const LineChart = dynamic(() => 
  import('recharts').then((mod) => mod.LineChart), 
  { ssr: false }
);
const Line = dynamic(() => 
  import('recharts').then((mod) => mod.Line), 
  { ssr: false }
);
const XAxis = dynamic(() => 
  import('recharts').then((mod) => mod.XAxis), 
  { ssr: false }
);
const YAxis = dynamic(() => 
  import('recharts').then((mod) => mod.YAxis), 
  { ssr: false }
);
const CartesianGrid = dynamic(() => 
  import('recharts').then((mod) => mod.CartesianGrid), 
  { ssr: false }
);
const Tooltip = dynamic(() => 
  import('recharts').then((mod) => mod.Tooltip), 
  { ssr: false }
);
const ResponsiveContainer = dynamic(() => 
  import('recharts').then((mod) => mod.ResponsiveContainer), 
  { ssr: false }
);
const RadarChart = dynamic(() => 
  import('recharts').then((mod) => mod.RadarChart), 
  { ssr: false }
);
const Radar = dynamic(() => 
  import('recharts').then((mod) => mod.Radar), 
  { ssr: false }
);
const PolarGrid = dynamic(() => 
  import('recharts').then((mod) => mod.PolarGrid), 
  { ssr: false }
);
const PolarAngleAxis = dynamic(() => 
  import('recharts').then((mod) => mod.PolarAngleAxis), 
  { ssr: false }
);
const PolarRadiusAxis = dynamic(() => 
  import('recharts').then((mod) => mod.PolarRadiusAxis), 
  { ssr: false }
);

// Expanded mock data
const statsData = {
  totalUsers: 1245,
  totalSports: 12,
  upcomingEvents: 24,
  activeClubs: 56,
  revenue: 45678,
  pendingApprovals: 7,
  growthRate: 15.5,
  newRegistrations: 87,
  activeSubscriptions: 342,
  
  // New metrics
  totalTeams: 128,
  totalClubs: 42,
  totalPlayers: 3456,
  totalReferees: 215,
  totalClubAdmins: 87,
  totalTeamManagers: 64,
  totalGames: 512
};

// Growth data for Bezier line chart
const growthData = [
  { month: 'Jan', users: 400, registrations: 240, subscriptions: 180 },
  { month: 'Feb', users: 300, registrations: 139, subscriptions: 221 },
  { month: 'Mar', users: 200, registrations: 980, subscriptions: 229 },
  { month: 'Apr', users: 278, registrations: 390, subscriptions: 200 },
  { month: 'May', users: 189, registrations: 480, subscriptions: 218 },
  { month: 'Jun', users: 239, registrations: 380, subscriptions: 250 }
];

// Radar chart data for Top Performing
const topPerformingData = [
  {
    subject: 'Soccer',
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: 'Basketball',
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: 'Tennis',
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: 'Volleyball',
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: 'Swimming',
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: 'Athletics',
    A: 65,
    B: 85,
    fullMark: 150
  }
];

// Top teams
const topTeams = [
  { name: 'Eagles FC', sport: 'Soccer', wins: 18, points: 54, icon: Flag },
  { name: 'Thunder Strikers', sport: 'Basketball', wins: 16, points: 48, icon: Star },
  { name: 'Lightning Runners', sport: 'Track', wins: 15, points: 45, icon: Activity }
];

// Top players
const topPlayers = [
  { name: 'John Smith', sport: 'Soccer', goals: 22, assists: 15, icon: UserCheck },
  { name: 'Emily Rodriguez', sport: 'Basketball', points: 28, rebounds: 12, icon: CheckIcon },
  { name: 'Michael Chen', sport: 'Tennis', matches: 24, wins: 20, icon: Trophy }
];

// Predicted game scores (mock data)
const predictedScores = [
  { 
    homeTeam: 'Eagles FC', 
    awayTeam: 'Thunder Strikers', 
    predictedHomeScore: 2, 
    predictedAwayScore: 1,
    sport: 'Soccer'
  },
  { 
    homeTeam: 'Lightning Runners', 
    awayTeam: 'Storm Chasers', 
    predictedHomeScore: 3, 
    predictedAwayScore: 2,
    sport: 'Basketball'
  }
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="space-x-2 flex">
          <Button variant="outline">Refresh Data</Button>
          <Button>Create New</Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <Users className="mb-2 text-blue-500" />
          <h3 className="text-lg font-semibold">{statsData.totalUsers}</h3>
          <p className="text-sm text-gray-500">Total Users</p>
        </Card>
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <Flag className="mb-2 text-green-500" />
          <h3 className="text-lg font-semibold">{statsData.totalTeams}</h3>
          <p className="text-sm text-gray-500">Total Teams</p>
        </Card>
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <Activity className="mb-2 text-purple-500" />
          <h3 className="text-lg font-semibold">{statsData.totalClubs}</h3>
          <p className="text-sm text-gray-500">Total Clubs</p>
        </Card>
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <UserCheck className="mb-2 text-red-500" />
          <h3 className="text-lg font-semibold">{statsData.totalPlayers}</h3>
          <p className="text-sm text-gray-500">Total Players</p>
        </Card>
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <CheckIcon className="mb-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">{statsData.totalReferees}</h3>
          <p className="text-sm text-gray-500">Total Referees</p>
        </Card>
        <Card className="p-4 flex flex-col items-center hover:shadow-md transition-shadow">
          <Trophy className="mb-2 text-orange-500" />
          <h3 className="text-lg font-semibold">{statsData.totalGames}</h3>
          <p className="text-sm text-gray-500">Total Games</p>
        </Card>
      </div>

      {/* Advanced Insights Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Top Teams */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Teams</h2>
            <Flag className="text-green-600" />
          </div>
          <div className="space-y-3">
            {topTeams.map((team, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <team.icon className="text-gray-500" size={20} />
                  <div>
                    <span className="text-sm font-medium">{team.name}</span>
                    <p className="text-xs text-gray-500">{team.sport}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">{team.wins} Wins</span>
                  <p className="text-xs text-gray-500">{team.points} Points</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Players */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Players</h2>
            <Star className="text-yellow-600" />
          </div>
          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <player.icon className="text-gray-500" size={20} />
                  <div>
                    <span className="text-sm font-medium">{player.name}</span>
                    <p className="text-xs text-gray-500">{player.sport}</p>
                  </div>
                </div>
                <div className="text-right">
                  {player.goals !== undefined && (
                    <span className="text-sm font-semibold">{player.goals} Goals</span>
                  )}
                  {player.points !== undefined && (
                    <span className="text-sm font-semibold">{player.points} Points</span>
                  )}
                  {player.matches !== undefined && (
                    <span className="text-sm font-semibold">{player.matches} Matches</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Predicted Game Scores */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Predicted Scores</h2>
            <Calendar className="text-blue-600" />
          </div>
          <div className="space-y-3">
            {predictedScores.map((game, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{game.homeTeam}</span>
                    <span className="text-xs text-gray-500">vs</span>
                    <span className="text-sm font-medium">{game.awayTeam}</span>
                  </div>
                  <p className="text-xs text-gray-500">{game.sport}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{game.predictedHomeScore}</span>
                  <span className="text-xs text-gray-500">-</span>
                  <span className="text-sm font-semibold">{game.predictedAwayScore}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Existing sections from previous implementation */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Growth Metrics */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Growth Metrics</h2>
            <TrendingUp className="text-green-600" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderColor: '#e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="subscriptions" 
                  stroke="#ffc658" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#8884d8] rounded-full"></div>
                <span className="text-xs">Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-full"></div>
                <span className="text-xs">Registrations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#ffc658] rounded-full"></div>
                <span className="text-xs">Subscriptions</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Performing Section with Radar Chart */}
        <Card className="p-6 pb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Performing Sports</h2>
            <Trophy className="text-orange-600" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="80%" 
                data={topPerformingData}
              >
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="subject" 
                  scale="point"
                  reversed={false}
                />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar 
                  name="Team A" 
                  dataKey="A" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Team B" 
                  dataKey="B" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#8884d8] rounded-full"></div>
                <span className="text-xs">Team A</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-full"></div>
                <span className="text-xs">Team B</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <Zap className="text-yellow-500" />
          </div>
          <div className="space-y-3">
            <Button className="w-full">Manage Users</Button>
            <Button className="w-full">Create New Sport</Button>
            <Button className="w-full">Manage Clubs</Button>
            <Button className="w-full">Generate Report</Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <FileText className="text-blue-600" />
        </div>
        <ul className="divide-y">
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">New user registered</p>
              <span className="text-xs text-gray-500">John Doe joined the platform</span>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Club "Soccer United" created</p>
              <span className="text-xs text-gray-500">New sports club added</span>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Payment received</p>
              <span className="text-xs text-gray-500">Subscription payment processed</span>
            </div>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
