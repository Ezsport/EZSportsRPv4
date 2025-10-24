'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/controls/card';
import { Button } from '@/components/controls/button';
import { 
  Users, 
  Trophy, 
  Calendar, 
  Activity, 
  User, 
  Shield, 
  Clock, 
  FileText,
  Star,
  Medal,
  Flag,
  Shirt,
  Target,
  Zap,
  Landmark,
  BookUser,
  Footprints
} from 'lucide-react';

// Define types to resolve linting issues
type Club = {
  name: string;
  logo: string;
  founded: number;
  location: string;
  facilities: string[];
};

type TeamStats = {
  totalPlayers: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: string;
  goalsScored: number;
  goalsConceded: number;
};

type Team = {
  name: string;
  division: string;
  age: string;
  sport: string;
  teamStats: TeamStats;
  topPlayers: Array<{
    name: string;
    position: string;
    goals: number;
    assists: number;
  }>;
};

type UserData = {
  name: string;
  role: string;
  club: Club;
  team: Team;
  teamStats?: TeamStats;  // Optional team stats for all roles
  membershipStatus: string;
  membershipExpires: string;
  profileImage?: string;
  upcomingMatches: Array<{
    date: string;
    opponent: string;
    time: string;
    location: string;
    competition: string;
  }>;
  recentPerformance?: Array<{
    match: string;
    result: string;
    score: string;
    competition: string;
  }>;
  certificationLevel?: string;
  assignedSport?: string;
  specializations?: string[];
  upcomingAssignments?: Array<{
    date: string;
    match: string;
    time: string;
    location: string;
    teams: string[];
  }>;
  performanceStats?: {
    totalMatchesRefereed: number;
    yellowCards: number;
    redCards: number;
    averageRating: number;
    highProfileMatches: number;
  };
  personalInfo?: {
    age: number;
    height: string;
    weight: string;
    dominantFoot: string;
  };
  personalStats?: {
    matchesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
    passingAccuracy: string;
  };
  trainingSchedule?: Array<{
    day: string;
    time: string;
    type: string;
    focus: string;
  }>;
};

// Mock user roles and data
const mockUserData: Record<'coach' | 'referee' | 'player', UserData> = {
  coach: {
    name: 'John Smith',
    role: 'Head Coach',
    profileImage: '/path/to/coach-profile.png',
    club: {
      name: 'Eagles Sports Club',
      logo: '/path/to/eagles-logo.png',
      founded: 2005,
      location: 'San Francisco, CA',
      facilities: ['Indoor Training Hall', 'Outdoor Pitch', 'Gym']
    },
    team: {
      name: 'U-18 Soccer Team',
      division: 'Youth Premier League',
      age: 'Under 18',
      sport: 'Soccer',
      teamStats: {
        totalPlayers: 18,
        wins: 12,
        losses: 3,
        draws: 2,
        winRate: '75%',
        goalsScored: 45,
        goalsConceded: 15
      },
      topPlayers: [
        { name: 'Alex Rodriguez', position: 'Striker', goals: 12, assists: 5 },
        { name: 'Emily Chen', position: 'Midfielder', goals: 8, assists: 7 }
      ]
    },
    membershipStatus: 'Active',
    membershipExpires: '2024-12-31',
    upcomingMatches: [
      { 
        date: '2024-02-15', 
        opponent: 'Tigers FC', 
        time: '14:00', 
        location: 'Home Stadium',
        competition: 'Youth League Championship'
      },
      { 
        date: '2024-02-22', 
        opponent: 'Lions United', 
        time: '15:30', 
        location: 'Away Stadium',
        competition: 'Regional Tournament'
      }
    ],
    recentPerformance: [
      { match: 'vs Hawks', result: 'Win', score: '3-1', competition: 'League Match' },
      { match: 'vs Panthers', result: 'Draw', score: '2-2', competition: 'Friendly Match' }
    ]
  },
  referee: {
    name: 'Emily Rodriguez',
    role: 'Certified Referee',
    certificationLevel: 'FIFA International',
    assignedSport: 'Soccer',
    profileImage: '/path/to/referee-profile.png',
    specializations: ['VAR', 'Youth Tournaments', 'Professional Leagues'],
    club: {
      name: 'Referee Association',
      logo: '/path/to/ref-logo.png',
      founded: 2010,
      location: 'National Sports Complex',
      facilities: ['Referee Training Center']
    },
    team: {
      name: 'Officiating Team',
      division: 'National Referees',
      age: 'Professional',
      sport: 'Multi-Sport',
      teamStats: {
        totalPlayers: 50,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 'N/A',
        goalsScored: 0,
        goalsConceded: 0
      },
      topPlayers: []
    },
    membershipStatus: 'Active',
    membershipExpires: '2024-12-31',
    upcomingMatches: [],
    upcomingAssignments: [
      { 
        date: '2024-02-16', 
        match: 'U-18 Championship', 
        time: '16:00', 
        location: 'Central Stadium',
        teams: ['Eagles FC', 'Lions United']
      },
      { 
        date: '2024-02-23', 
        match: 'Regional League', 
        time: '14:30', 
        location: 'Sports Complex',
        teams: ['Tigers FC', 'Panthers SC']
      }
    ],
    performanceStats: {
      totalMatchesRefereed: 45,
      yellowCards: 78,
      redCards: 12,
      averageRating: 4.7,
      highProfileMatches: 15
    }
  },
  player: {
    name: 'Michael Chen',
    role: 'Midfielder',
    profileImage: '/path/to/player-profile.png',
    club: {
      name: 'Eagles Sports Club',
      logo: '/path/to/eagles-logo.png',
      founded: 2005,
      location: 'San Francisco, CA',
      facilities: ['Indoor Training Hall', 'Outdoor Pitch', 'Gym']
    },
    team: {
      name: 'Amateur Soccer Team',
      division: 'Amateur League',
      age: 'Senior',
      sport: 'Soccer',
      teamStats: {
        totalPlayers: 25,
        wins: 10,
        losses: 5,
        draws: 3,
        winRate: '65%',
        goalsScored: 35,
        goalsConceded: 25
      },
      topPlayers: [
        { name: 'Michael Chen', position: 'Midfielder', goals: 8, assists: 12 }
      ]
    },
    membershipStatus: 'Active',
    membershipExpires: '2024-12-31',
    upcomingMatches: [
      { 
        date: '2024-02-15', 
        opponent: 'Tigers FC', 
        time: '14:00', 
        location: 'Home Stadium',
        competition: 'Amateur League'
      },
      { 
        date: '2024-02-22', 
        opponent: 'Lions United', 
        time: '15:30', 
        location: 'Away Stadium',
        competition: 'Cup Tournament'
      }
    ],
    personalInfo: {
      age: 22,
      height: '5\'10"',
      weight: '165 lbs',
      dominantFoot: 'Right'
    },
    personalStats: {
      matchesPlayed: 22,
      goals: 8,
      assists: 12,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1980,
      passingAccuracy: '85%'
    },
    trainingSchedule: [
      { day: 'Monday', time: '18:00-20:00', type: 'Strength Training', focus: 'Core and Leg Strength' },
      { day: 'Wednesday', time: '17:30-19:30', type: 'Tactical Practice', focus: 'Midfield Positioning' },
      { day: 'Friday', time: '18:00-20:00', type: 'Match Preparation', focus: 'Game Strategy' }
    ]
  }
};

export default function AppDashboard() {
  const [userRole, setUserRole] = useState<'coach' | 'referee' | 'player'>('coach');
  const [userData, setUserData] = useState<UserData>(mockUserData.coach);

  // In a real application, this would come from authentication context
  useEffect(() => {
    // Simulating role selection or authentication
    const storedRole = localStorage.getItem('userRole') as 'coach' | 'referee' | 'player';
    if (storedRole) {
      setUserRole(storedRole);
      setUserData(mockUserData[storedRole]);
    }
  }, []);

  // Role switcher (for demonstration, would be removed in production)
  const switchRole = (role: 'coach' | 'referee' | 'player') => {
    setUserRole(role);
    setUserData(mockUserData[role]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        
        {/* Role Switcher (for demonstration only) */}
        <div className="flex space-x-2">
          <Button 
            variant={userRole === 'coach' ? 'default' : 'outline'}
            onClick={() => switchRole('coach')}
          >
            Coach View
          </Button>
          <Button 
            variant={userRole === 'referee' ? 'default' : 'outline'}
            onClick={() => switchRole('referee')}
          >
            Referee View
          </Button>
          <Button 
            variant={userRole === 'player' ? 'default' : 'outline'}
            onClick={() => switchRole('player')}
          >
            Player View
          </Button>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Club/Team Information Card */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {userRole === 'coach' ? 'Club Information' : 
               userRole === 'referee' ? 'Referee Profile' : 
               'Team Information'}
            </h2>
            {userRole === 'coach' ? <Landmark className="text-blue-600" /> : 
             userRole === 'referee' ? <Trophy className="text-blue-600" /> : 
             <Shirt className="text-blue-600" />}
          </div>
          
          {userRole === 'coach' && userData.club && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Flag className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">{userData.club.name}</span>
                  <p className="text-xs text-gray-500">Founded: {userData.club.founded}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Location</span>
                  <p className="text-xs text-gray-500">{userData.club.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Facilities</span>
                  <p className="text-xs text-gray-500">
                    {userData.club.facilities.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {userRole === 'referee' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <BookUser className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Specializations</span>
                  <p className="text-xs text-gray-500">
                    {userData.specializations?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Footprints className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">High Profile Matches</span>
                  <p className="text-xs text-gray-500">
                    {userData.performanceStats?.highProfileMatches || 0}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {userRole === 'player' && userData.team && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shirt className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">{userData.team.name}</span>
                  <p className="text-xs text-gray-500">{userData.team.division}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="text-gray-500" />
                <div>
                  <span className="text-sm font-medium">Sport</span>
                  <p className="text-xs text-gray-500">{userData.team.sport}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <User className="text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Name:</span>
              <span className="text-sm font-medium">{userData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Role:</span>
              <span className="text-sm font-medium">{userData.role}</span>
            </div>
            {userData.club && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Club:</span>
                <span className="text-sm font-medium">{userData.club.name}</span>
              </div>
            )}
            {userData.team && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Team:</span>
                <span className="text-sm font-medium">{userData.team.name}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Membership Status */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Membership</h2>
            <Shield className="text-green-600" />
          </div>
          {userData.membershipStatus && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-green-600">
                  {userData.membershipStatus}
                </span>
              </div>
              {userData.membershipExpires && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expires:</span>
                  <span className="text-sm font-medium">
                    {userData.membershipExpires}
                  </span>
                </div>
              )}
            </div>
          )}
          {userData.certificationLevel && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Certification:</span>
                <span className="text-sm font-medium">
                  {userData.certificationLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sport:</span>
                <span className="text-sm font-medium">
                  {userData.assignedSport}
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Performance/Stats Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {userRole === 'coach' ? 'Team Stats' : 
               userRole === 'referee' ? 'Referee Stats' : 
               'Personal Stats'}
            </h2>
            <Trophy className="text-orange-600" />
          </div>
          {userRole === 'coach' && userData.teamStats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Players:</span>
                <span className="text-sm font-medium">{userData.teamStats.totalPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Wins:</span>
                <span className="text-sm font-medium">{userData.teamStats.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Losses:</span>
                <span className="text-sm font-medium">{userData.teamStats.losses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Win Rate:</span>
                <span className="text-sm font-medium text-green-600">{userData.teamStats.winRate}</span>
              </div>
            </div>
          )}
          {userRole === 'referee' && userData.performanceStats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Matches Refereed:</span>
                <span className="text-sm font-medium">{userData.performanceStats.totalMatchesRefereed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Yellow Cards:</span>
                <span className="text-sm font-medium">{userData.performanceStats.yellowCards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Red Cards:</span>
                <span className="text-sm font-medium">{userData.performanceStats.redCards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Rating:</span>
                <span className="text-sm font-medium text-green-600">{userData.performanceStats.averageRating}</span>
              </div>
            </div>
          )}
          {userRole === 'player' && userData.personalStats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Matches Played:</span>
                <span className="text-sm font-medium">{userData.personalStats.matchesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Goals:</span>
                <span className="text-sm font-medium">{userData.personalStats.goals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assists:</span>
                <span className="text-sm font-medium">{userData.personalStats.assists}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Yellow Cards:</span>
                <span className="text-sm font-medium">{userData.personalStats.yellowCards}</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Upcoming Matches/Assignments */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {userRole === 'coach' ? 'Upcoming Matches' : 
             userRole === 'referee' ? 'Referee Assignments' : 
             'Upcoming Matches'}
          </h2>
          <Calendar className="text-purple-600" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {userData.upcomingMatches && userData.upcomingMatches.map((match, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{match.opponent}</span>
                <span className="text-xs text-gray-500">{match.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Time: {match.time}</span>
                <span className="text-xs text-gray-600">Location: {match.location}</span>
              </div>
            </div>
          ))}
          {userRole === 'referee' && userData.upcomingAssignments && userData.upcomingAssignments.map((assignment, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{assignment.match}</span>
                <span className="text-xs text-gray-500">{assignment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Time: {assignment.time}</span>
                <span className="text-xs text-gray-600">Location: {assignment.location}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Training/Recent Performance */}
      {userRole === 'player' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Training Schedule</h2>
            <Clock className="text-blue-600" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {userData.trainingSchedule && userData.trainingSchedule.map((session, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{session.day}</span>
                  <span className="text-xs text-gray-500">{session.time}</span>
                </div>
                <span className="text-xs text-gray-600">{session.type}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Performance for Coach and Referee */}
      {(userRole === 'coach' || userRole === 'referee') && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {userRole === 'coach' ? 'Recent Match Performance' : 'Recent Assignments'}
            </h2>
            <Star className="text-yellow-600" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {userRole === 'coach' && userData.recentPerformance && userData.recentPerformance.map((match, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{match.match}</span>
                  <span 
                    className={`text-xs font-medium ${
                      match.result === 'Win' ? 'text-green-600' : 
                      match.result === 'Loss' ? 'text-red-600' : 'text-yellow-600'
                    }`}
                  >
                    {match.result}
                  </span>
                </div>
                <span className="text-xs text-gray-600">Score: {match.score}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
