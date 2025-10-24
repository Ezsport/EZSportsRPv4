'use client';

import React, { useState } from 'react';
import { Button } from '@/components/controls/button';
import Table from '@/components/controls/table';
import { Card } from '@/components/controls/card';
import { Modal } from '@/components/controls/modal';
import { Form } from '@/components/controls/form';
import { useTeams } from '@/hooks/useTeams';
import { useClubs } from '@/hooks/useClubs';
import { useSports } from '@/hooks/useSports';
import { Toaster, toast } from 'sonner';
import { Team } from '@/lib/services/service-team';

export default function TeamsPage() {
  const { 
    teams, 
    createTeam, 
    updateTeam, 
    deleteTeam,
    isLoading,
    error,
    updateParams
  } = useTeams();
  const { clubs } = useClubs();
  const { sports } = useSports();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  const handleCreateOrUpdateTeam = async (formData: any) => {
    try {
      if (currentTeam) {
        await updateTeam(currentTeam.id!, formData);
        toast.success('Team updated successfully');
      } else {
        await createTeam(formData);
        toast.success('Team created successfully');
      }
      setIsModalOpen(false);
      setCurrentTeam(null);
    } catch (error) {
      toast.error('Failed to save team');
      console.error(error);
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await deleteTeam(teamId);
      toast.success('Team deleted successfully');
    } catch (error) {
      toast.error('Failed to delete team');
      console.error(error);
    }
  };

  const teamColumns = [
    { 
      header: 'Name', 
      accessorKey: 'name' 
    },
    { 
      header: 'Club', 
      accessorKey: 'club.name' 
    },
    { 
      header: 'Sport', 
      accessorKey: 'sport.name' 
    },
    {
      header: 'Actions',
      cell: (info: any) => (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setCurrentTeam(info.row.original);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => handleDeleteTeam(info.row.original.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  // Filtering and pagination controls
  const handleFilterChange = (filterType: string, value: string) => {
    updateParams({ 
      [filterType]: value,
      page: 1  // Reset to first page when filter changes
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Team Management</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Create New Team
          </Button>
        </div>

        {/* Optional: Add filter controls */}
        <div className="flex space-x-4 mb-4">
          <select 
            onChange={(e) => handleFilterChange('clubId', e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Clubs</option>
            {clubs?.map(club => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>

          <select 
            onChange={(e) => handleFilterChange('sportId', e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Sports</option>
            {sports?.map(sport => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p>Loading teams...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table 
            columns={teamColumns} 
            data={teams || []} 
          />
        )}
      </Card>

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTeam(null);
          }}
          title={currentTeam ? 'Edit Team' : 'Create New Team'}
        >
          <Form
            fields={[
              {
                name: 'name',
                label: 'Team Name',
                type: 'text',
                required: true,
                defaultValue: currentTeam?.name || ''
              },
              {
                name: 'clubId',
                label: 'Club',
                type: 'select',
                options: clubs?.map(club => ({
                  value: club.id,
                  label: club.name
                })) || [],
                required: true,
                defaultValue: currentTeam?.clubId || ''
              },
              {
                name: 'sportId',
                label: 'Sport',
                type: 'select',
                options: sports?.map(sport => ({
                  value: sport.id,
                  label: sport.name
                })) || [],
                required: true,
                defaultValue: currentTeam?.sportId || ''
              }
            ]}
            onSubmit={handleCreateOrUpdateTeam}
          />
        </Modal>
      )}
      
      <Toaster richColors position="top-right" />
    </div>
  );
}
