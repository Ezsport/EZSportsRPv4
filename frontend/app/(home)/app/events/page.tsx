"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Table, { TableRowData } from "@/components/controls/table";
import { Badge } from "@/components/ui/badge";

// Define types for our data
type GameSummary = {
  homeTeam: {
    name: string;
    quarters: number[];
    totalScore: number;
  };
  awayTeam: {
    name: string;
    quarters: number[];
    totalScore: number;
  };
};

type MatchStatistic = TableRowData & {
  statistic: string;
  homeTeam: number;
  awayTeam: number;
};

type PlayerStatistic = TableRowData & {
  name: string;
  points: number;
  jerseyNumber: number;
};

type GameRecord = TableRowData & {
  team: string;
  jerseyNumber: number;
  name: string;
  eventType: string;
  point: number;
  time: string;
  reason: string;
};

// Mock data for demonstration - replace with actual data fetching
const mockGameSummary: GameSummary = {
  homeTeam: {
    name: "Home Team",
    quarters: [10, 15, 12, 8],
    totalScore: 45,
  },
  awayTeam: {
    name: "Away Team",
    quarters: [8, 12, 9, 11],
    totalScore: 40,
  },
};

const mockMatchStatistics: MatchStatistic[] = [
  { id: "1", statistic: "Goal", homeTeam: 1, awayTeam: 1 },
  { id: "2", statistic: "Defensive Error", homeTeam: 1, awayTeam: 1 },
  { id: "3", statistic: "Positive Passes", homeTeam: 6, awayTeam: 1 },
  { id: "4", statistic: "Negative Heading", homeTeam: 2, awayTeam: 1 },
  { id: "5", statistic: "Positive Penalty", homeTeam: 4, awayTeam: 1 },
  { id: "6", statistic: "Negative Penalty", homeTeam: 1, awayTeam: 1 },
];

const mockPlayerStatistics: PlayerStatistic[] = [
  { id: "1", name: "John Doe", points: 22, jerseyNumber: 10 },
  { id: "2", name: "Jane Smith", points: 18, jerseyNumber: 7 },
  { id: "3", name: "Mike Johnson", points: 15, jerseyNumber: 23 },
];

const mockGameRecords: GameRecord[] = [
  {
    id: "1",
    team: "Home Team",
    jerseyNumber: 10,
    name: "John Doe",
    eventType: "Score",
    point: 2,
    time: "Q1 05:30",
    reason: "Jump Shot",
  },
  {
    id: "2",
    team: "Away Team",
    jerseyNumber: 7,
    name: "Jane Smith",
    eventType: "Foul",
    point: 0,
    time: "Q2 03:15",
    reason: "Personal Foul",
  },
];

export default function EventsPage() {
  const [recordFilter, setRecordFilter] = useState("All");

  const recordFilterOptions = [
    "All",
    "Coach Record",
    "Referee Record",
    "Player Record",
    "Team Record",
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Game Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Score Section */}
            <Card className="mt-4 pt-4">
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {mockGameSummary.homeTeam.name}
                    </h2>
                    <div className="flex space-x-2 mt-2 justify-center">
                      {mockGameSummary.homeTeam.quarters.map((score, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          Q{index + 1}: {score}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xl font-bold mt-2 text-primary">
                      {mockGameSummary.homeTeam.totalScore}
                    </div>
                  </div>

                  <div className="text-lg font-bold text-gray-500">VS</div>

                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {mockGameSummary.awayTeam.name}
                    </h2>
                    <div className="flex space-x-2 mt-2 justify-center">
                      {mockGameSummary.awayTeam.quarters.map((score, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          Q{index + 1}: {score}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xl font-bold mt-2 text-primary">
                      {mockGameSummary.awayTeam.totalScore}
                    </div>
                  </div>
                </div>

                {/* Match Statistics Table */}
                <div className="mt-6">
                  <Table<MatchStatistic>
                    draggable={false}
                    cols={[
                      {
                        accessor: "statistic",
                        header: "Match Statistics",
                        cell: (row: MatchStatistic) => (
                          <span className="font-medium text-sm text-gray-700">
                            {row.statistic}
                          </span>
                        ),
                      },
                      {
                        accessor: "homeTeam",
                        header: mockGameSummary.homeTeam.name,
                        cell: (row: MatchStatistic) => (
                          <span className="text-center block text-sm font-semibold text-gray-800">
                            {row.homeTeam}
                          </span>
                        ),
                      },
                      {
                        accessor: "awayTeam",
                        header: mockGameSummary.awayTeam.name,
                        cell: (row: MatchStatistic) => (
                          <span className="text-center block text-sm font-semibold text-gray-800">
                            {row.awayTeam}
                          </span>
                        ),
                      },
                    ]}
                    data={mockMatchStatistics}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Player Statistics Section */}
            <Card className="mt-4 ">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700">
                  Player Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table<PlayerStatistic>
                  draggable={false}
                  cols={[
                    {
                      accessor: "jerseyNumber",
                      header: "Jersey #",
                      cell: (row: PlayerStatistic) => (
                        <span className="text-sm text-gray-600">
                          {row.jerseyNumber}
                        </span>
                      ),
                    },
                    {
                      accessor: "name",
                      header: "Name",
                      cell: (row: PlayerStatistic) => (
                        <span className="text-sm text-gray-700 font-medium">
                          {row.name}
                        </span>
                      ),
                    },
                    {
                      accessor: "points",
                      header: "Points",
                      cell: (row: PlayerStatistic) => (
                        <span className="text-sm text-primary font-semibold">
                          {row.points}
                        </span>
                      ),
                    },
                  ]}
                  data={mockPlayerStatistics}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Game Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            {/* <Select value={recordFilter} onValueChange={setRecordFilter}>
              <SelectTrigger className="w-[200px] text-sm">
                <SelectValue placeholder="Select Record Type" />
              </SelectTrigger>
              <SelectContent>
                {recordFilterOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-sm">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>

          <Table<GameRecord>
            draggable={false}
            cols={[
              {
                accessor: "team",
                header: "Team",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-600">{row.team}</span>
                ),
              },
              {
                accessor: "jerseyNumber",
                header: "Jersey #",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-600">
                    {row.jerseyNumber}
                  </span>
                ),
              },
              {
                accessor: "name",
                header: "Name",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-700 font-medium">
                    {row.name}
                  </span>
                ),
              },
              {
                accessor: "eventType",
                header: "Event Type",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-600">{row.eventType}</span>
                ),
              },
              {
                accessor: "point",
                header: "Point",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-primary font-semibold">
                    {row.point}
                  </span>
                ),
              },
              {
                accessor: "time",
                header: "Time",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-600">{row.time}</span>
                ),
              },
              {
                accessor: "reason",
                header: "Reason",
                cell: (row: GameRecord) => (
                  <span className="text-sm text-gray-600">{row.reason}</span>
                ),
              },
            ]}
            data={mockGameRecords}
          />
        </CardContent>
      </Card>
    </div>
  );
}
