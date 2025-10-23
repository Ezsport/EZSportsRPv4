"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer, Event, SlotInfo, Views } from "react-big-calendar";
import moment from "moment";
import { Card } from "@/components/controls/card";
import { Button } from "@/components/controls/button";
import { 
  TrophyIcon, 
  UsersIcon, 
  BookOpenIcon,
  FlagIcon,
  ClockIcon,
  MedalIcon,
  StarIcon,
  ShieldIcon,
  Target,
  ZapIcon
} from "lucide-react";

// Import calendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set up localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Event types with distinct colors and icons
const EVENT_TYPES = {
  GAME: { 
    color: 'bg-red-500', 
    icon: TrophyIcon,
    name: 'Game' 
  },
  TRAINING: { 
    color: 'bg-green-500', 
    icon: ZapIcon,
    name: 'Training' 
  },
  MEETING: { 
    color: 'bg-blue-500', 
    icon: UsersIcon,
    name: 'Meeting' 
  },
  REFEREE_ASSIGNMENT: { 
    color: 'bg-yellow-500', 
    icon: ShieldIcon,
    name: 'Referee Assignment' 
  }
};

// Define types for events
type CalendarEvent = Event & {
  type: keyof typeof EVENT_TYPES;
  team?: string;
  location?: string;
  description?: string;
};

// Comprehensive mock events data for 2025
const mockEvents: CalendarEvent[] = [
  // Game Schedules - September 2025
  {
    title: 'U-18 Soccer Championship',
    start: new Date(2025, 9, 5, 14, 0),
    end: new Date(2025, 9, 5, 16, 0),
    type: 'GAME',
    team: 'Eagles FC',
    location: 'Central Stadium',
    description: 'Regional youth soccer tournament'
  },
  {
    title: 'Regional League Match',
    start: new Date(2025, 9, 15, 15, 0),
    end: new Date(2025, 9, 15, 17, 0),
    type: 'GAME',
    team: 'Lions United',
    location: 'Sports Complex',
    description: 'Crucial match for league standings'
  },

  // Training Schedules - September 2025
  {
    title: 'Team Training Session',
    start: new Date(2025, 9, 8, 18, 0),
    end: new Date(2025, 9, 8, 20, 0),
    type: 'TRAINING',
    team: 'Eagles FC',
    location: 'Training Grounds',
    description: 'Strength and conditioning training'
  },
  {
    title: 'Tactical Practice',
    start: new Date(2025, 9, 22, 17, 30),
    end: new Date(2025, 9, 22, 19, 30),
    type: 'TRAINING',
    team: 'Lions United',
    location: 'Club Training Facility',
    description: 'Game strategy and formation practice'
  },

  // Meeting Schedules - September 2025
  {
    title: 'Coaches Meeting',
    start: new Date(2025, 9, 12, 10, 0),
    end: new Date(2025, 9, 12, 11, 30),
    type: 'MEETING',
    team: 'Regional Sports Association',
    location: 'Conference Room',
    description: 'Monthly coaching staff coordination meeting'
  },
  {
    title: 'Team Managers Briefing',
    start: new Date(2025, 9, 28, 16, 0),
    end: new Date(2025, 9, 28, 17, 30),
    type: 'MEETING',
    team: 'Multiple Clubs',
    location: 'Virtual Meeting',
    description: 'Quarterly team managers coordination call'
  }
];

export default function CalendarPage() {
  // Initialize with September 2025 to show events clearly
  const [selectedMonth, setSelectedMonth] = useState(new Date(2025, 9, 1));
  const [selectedEventType, setSelectedEventType] = useState<
    keyof typeof EVENT_TYPES | null
  >(null);

  // Filter events based on selected month and event type
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const isSameMonth =
        event.start!.getMonth() === selectedMonth.getMonth() &&
        event.start!.getFullYear() === selectedMonth.getFullYear();

      const matchesType =
        !selectedEventType || event.type === selectedEventType;

      return isSameMonth && matchesType;
    });
  }, [selectedMonth, selectedEventType]);

  // Count events by type for the selected month
  const eventTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEvents.forEach((event) => {
      counts[event.type] = (counts[event.type] || 0) + 1;
    });
    return counts;
  }, [filteredEvents]);

  // Custom event rendering
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const backgroundColor = EVENT_TYPES[event.type].color;
    return { 
      style: { 
        backgroundColor,
        color: 'white',
        borderRadius: '4px',
        opacity: 0.8,
        fontSize: '0.65rem',
        padding: '2px 4px'
      }
    };
  }, []);

  // Event component to show more details
  const EventComponent = useCallback(({ event }: { event: CalendarEvent }) => {
    const EventIcon = EVENT_TYPES[event.type].icon;
    return (
      <div 
        title={event.description} 
        className="flex items-center space-x-1"
      >
        <EventIcon size={12} className="mr-1" />
        <span className="text-[0.6rem] font-semibold">{event.title}</span>
        {event.team && <span className="text-[0.5rem] ml-1 opacity-75">{event.team}</span>}
      </div>
    );
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Today</Button>
          <Button>Create Event</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Calendar - First Column */}
        <Card className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Schedules</h2>
            <BookOpenIcon className="text-gray-500" />
          </div>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month', 'week', 'day']}
            defaultView={Views.MONTH}
            onNavigate={(date) => setSelectedMonth(date)}
            eventPropGetter={eventStyleGetter}
            components={{
              event: EventComponent
            }}
            popup
            selectable
          />
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6 md:col-span-1">
          {/* Event Types Filter */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Event Types</h2>
              <BookOpenIcon className="text-gray-500" />
            </div>
            <div className="space-y-3">
              {Object.entries(EVENT_TYPES).map(([key, type]) => {
                const TypeIcon = type.icon;
                const count = eventTypeCounts[key] || 0;
                return (
                  <Button
                    key={key}
                    variant={selectedEventType === key ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() =>
                      setSelectedEventType((prev) =>
                        prev === key ? null : (key as keyof typeof EVENT_TYPES)
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <TypeIcon size={16} />
                      <span className="text-sm">{type.name}</span>
                    </div>
                    <span className="text-xs">{count}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Coming Games Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Coming Games</h2>
              <Target className="text-green-600" />
            </div>
            <div className="space-y-4">
              {mockEvents.filter(event => event.type === 'GAME').map((game, index) => (
                <div
                  key={`game-${index}`}
                  className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{game.title}</span>
                    <span className="text-xs text-gray-500">
                      {moment(game.start).format('MMM D, YYYY')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-600">
                        Time: {moment(game.start).format('h:mm A')}
                      </p>
                      <p className="text-xs text-gray-600">
                        Location: {game.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{game.team}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
