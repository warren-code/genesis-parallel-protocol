'use client';

import React, { useState } from 'react';
import { useRapidResponse } from '../context/RapidResponseContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/app/components/ui/Button';
import type { ResponseTeam, Task } from '../types';

export default function CoordinationDashboard() {
  const { coordinations, incidents, responders, createCoordination } = useRapidResponse();
  const { user } = useAuth();
  const [selectedIncident, setSelectedIncident] = useState('');
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const activeCoordinations = coordinations.filter(c => c.status === 'active');
  const activeIncidents = incidents.filter(i => i.status !== 'resolved');

  const handleCreateTeam = async () => {
    if (!selectedIncident || !teamName.trim() || selectedMembers.length === 0) return;

    const newTeam: ResponseTeam = {
      id: Date.now().toString(),
      name: teamName,
      lead: user?.id || '',
      members: selectedMembers,
      assignedTasks: [],
    };

    await createCoordination({
      incidentId: selectedIncident,
      teams: [newTeam],
      resources: [],
      timeline: [],
      status: 'active',
    });

    // Reset form
    setTeamName('');
    setSelectedMembers([]);
    setShowCreateTeam(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-ink">Response Coordination</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-accent">{activeIncidents.length}</div>
          <div className="text-sm text-gray">Active Incidents</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-green-500">{responders.filter(r => r.availability.status === 'available').length}</div>
          <div className="text-sm text-gray">Available Responders</div>
        </div>
      </div>

      {/* Create Response Team */}
      <div>
        <Button
          onClick={() => setShowCreateTeam(!showCreateTeam)}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          Create Response Team
        </Button>
        
        {showCreateTeam && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg space-y-4">
            <select
              value={selectedIncident}
              onChange={(e) => setSelectedIncident(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
            >
              <option value="">Select Incident</option>
              {activeIncidents.map(incident => (
                <option key={incident.id} value={incident.id}>
                  {incident.title} ({incident.severity})
                </option>
              ))}
            </select>
            
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full px-3 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
            />
            
            <div>
              <p className="text-sm text-gray mb-2">Select Team Members:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {responders.filter(r => r.availability.status === 'available').map(responder => (
                  <label key={responder.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(responder.userId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, responder.userId]);
                        } else {
                          setSelectedMembers(selectedMembers.filter(id => id !== responder.userId));
                        }
                      }}
                      className="rounded border-gray/40"
                    />
                    <span>{responder.name}</span>
                    <span className="text-xs text-gray">({responder.skills.join(', ')})</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleCreateTeam}
                variant="primary"
                size="sm"
                disabled={!selectedIncident || !teamName.trim() || selectedMembers.length === 0}
              >
                Create Team
              </Button>
              <Button
                onClick={() => setShowCreateTeam(false)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Active Coordinations */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-3">Active Operations</h3>
        {activeCoordinations.length === 0 ? (
          <p className="text-gray text-center py-4">No active coordinations</p>
        ) : (
          <div className="space-y-3">
            {activeCoordinations.map(coordination => {
              const incident = incidents.find(i => i.id === coordination.incidentId);
              return (
                <div key={coordination.incidentId} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-medium text-ink">{incident?.title}</p>
                  <div className="mt-2 space-y-1">
                    {coordination.teams.map(team => (
                      <div key={team.id} className="text-sm">
                        <span className="text-gray">Team {team.name}:</span>
                        <span className="text-ink ml-1">{team.members.length} members</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
