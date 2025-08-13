'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { 
  Incident, 
  IncidentUpdate,
  Alert, 
  Responder, 
  SecureMessage,
  ResponseCoordination 
} from '../types';

interface RapidResponseContextType {
  // Incidents
  incidents: Incident[];
  activeIncident: Incident | null;
  createIncident: (incident: Partial<Incident>) => Promise<void>;
  updateIncident: (id: string, updates: Partial<Incident>) => Promise<void>;
  assignResponder: (incidentId: string, responderId: string) => Promise<void>;
  
  // Alerts
  alerts: Alert[];
  unreadAlerts: number;
  acknowledgeAlert: (alertId: string) => Promise<void>;
  sendAlert: (alert: Partial<Alert>) => Promise<void>;
  
  // Responders
  responders: Responder[];
  availableResponders: Responder[];
  updateAvailability: (status: 'available' | 'busy' | 'offline') => Promise<void>;
  
  // Messaging
  messages: SecureMessage[];
  sendSecureMessage: (message: Partial<SecureMessage>) => Promise<void>;
  
  // Coordination
  coordinations: ResponseCoordination[];
  createCoordination: (coordination: Partial<ResponseCoordination>) => Promise<void>;
  
  // Real-time subscriptions
  subscribeToIncident: (incidentId: string) => () => void;
  subscribeToAlerts: () => () => void;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

const RapidResponseContext = createContext<RapidResponseContextType | undefined>(undefined);

export function RapidResponseProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const supabase = createClientComponentClient();
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [responders, setResponders] = useState<Responder[]>([]);
  const [messages, setMessages] = useState<SecureMessage[]>([]);
  const [coordinations, setCoordinations] = useState<ResponseCoordination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate unread alerts
  const unreadAlerts = alerts.filter(alert => !alert.acknowledgedAt).length;
  
  // Calculate available responders
  const availableResponders = responders.filter(r => r.availability.status === 'available');

  // Load initial data
  useEffect(() => {
    if (user) {
      loadIncidents();
      loadAlerts();
      loadResponders();
    }
  }, [user]);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) throw error;
      setIncidents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load incidents');
    } finally {
      setLoading(false);
    }
  };

  const loadAlerts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('recipientId', user.id)
        .order('createdAt', { ascending: false });
      
      if (error) throw error;
      setAlerts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
    }
  };

  const loadResponders = async () => {
    try {
      const { data, error } = await supabase
        .from('responders')
        .select('*');
      
      if (error) throw error;
      setResponders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load responders');
    }
  };

  const createIncident = async (incident: Partial<Incident>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const newIncident = {
        ...incident,
        reportedBy: user.id,
        reportedAt: new Date(),
        status: 'reported',
        respondersAssigned: [],
        updates: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const { data, error } = await supabase
        .from('incidents')
        .insert([newIncident])
        .select()
        .single();
      
      if (error) throw error;
      
      setIncidents(prev => [data, ...prev]);
      
      // Send alerts to available responders
      await notifyResponders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create incident');
    } finally {
      setLoading(false);
    }
  };

  const updateIncident = async (id: string, updates: Partial<Incident>) => {
    try {
      const { data, error } = await supabase
        .from('incidents')
        .update({ ...updates, updatedAt: new Date() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setIncidents(prev => prev.map(inc => inc.id === id ? data : inc));
      if (activeIncident?.id === id) {
        setActiveIncident(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update incident');
    }
  };

  const assignResponder = async (incidentId: string, responderId: string) => {
    try {
      const incident = incidents.find(inc => inc.id === incidentId);
      if (!incident) return;
      
      const updatedAssignees = [...incident.respondersAssigned, responderId];
      await updateIncident(incidentId, { respondersAssigned: updatedAssignees });
      
      // Send assignment alert
      await sendAlert({
        incidentId,
        recipientId: responderId,
        type: 'assignment',
        priority: 'high',
        message: `You have been assigned to incident: ${incident.title}`,
        actionRequired: 'Please acknowledge and respond',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign responder');
    }
  };

  const acknowledgeAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ acknowledgedAt: new Date() })
        .eq('id', alertId);
      
      if (error) throw error;
      
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledgedAt: new Date() }
          : alert
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to acknowledge alert');
    }
  };

  const sendAlert = async (alert: Partial<Alert>) => {
    try {
      const newAlert = {
        ...alert,
        createdAt: new Date(),
      };
      
      const { data, error } = await supabase
        .from('alerts')
        .insert([newAlert])
        .select()
        .single();
      
      if (error) throw error;
      
      // Real-time notification will update other users
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send alert');
    }
  };

  const updateAvailability = async (status: 'available' | 'busy' | 'offline') => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('responders')
        .update({ 
          'availability': { 
            ...responders.find(r => r.userId === user.id)?.availability,
            status 
          } 
        })
        .eq('userId', user.id);
      
      if (error) throw error;
      
      setResponders(prev => prev.map(r => 
        r.userId === user.id 
          ? { ...r, availability: { ...r.availability, status } }
          : r
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update availability');
    }
  };

  const sendSecureMessage = async (message: Partial<SecureMessage>) => {
    if (!user) return;
    
    try {
      const newMessage = {
        ...message,
        senderId: user.id,
        readBy: [],
        createdAt: new Date(),
      };
      
      const { data, error } = await supabase
        .from('secure_messages')
        .insert([newMessage])
        .select()
        .single();
      
      if (error) throw error;
      
      setMessages(prev => [...prev, data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  const createCoordination = async (coordination: Partial<ResponseCoordination>) => {
    try {
      const { data, error } = await supabase
        .from('response_coordinations')
        .insert([coordination])
        .select()
        .single();
      
      if (error) throw error;
      
      setCoordinations(prev => [...prev, data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create coordination');
    }
  };

  const notifyResponders = async (incident: Incident) => {
    // Find responders with matching skills and availability
    const matchingResponders = availableResponders.filter(responder => {
      if (incident.type.requiredSkills) {
        return incident.type.requiredSkills.some(skill => 
          responder.skills.includes(skill)
        );
      }
      return true;
    });

    // Send alerts to matching responders
    for (const responder of matchingResponders) {
      await sendAlert({
        incidentId: incident.id,
        recipientId: responder.userId,
        type: 'new_incident',
        priority: incident.severity === 'critical' ? 'urgent' : 'high',
        message: `New ${incident.severity} incident: ${incident.title}`,
        actionRequired: 'Response needed',
      });
    }
  };

  const subscribeToIncident = useCallback((incidentId: string) => {
    const channel = supabase
      .channel(`incident:${incidentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'incidents',
          filter: `id=eq.${incidentId}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setIncidents(prev => prev.map(inc => 
              inc.id === incidentId ? payload.new as Incident : inc
            ));
            if (activeIncident?.id === incidentId) {
              setActiveIncident(payload.new as Incident);
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'incident_updates',
          filter: `incidentId=eq.${incidentId}`,
        },
        (payload) => {
          // Handle new updates
          const update = payload.new as IncidentUpdate;
          setIncidents(prev => prev.map(inc => {
            if (inc.id === incidentId) {
              return {
                ...inc,
                updates: [...inc.updates, update],
              };
            }
            return inc;
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, activeIncident]);

  const subscribeToAlerts = useCallback(() => {
    if (!user) return () => {};

    const channel = supabase
      .channel(`alerts:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts',
          filter: `recipientId=eq.${user.id}`,
        },
        (payload) => {
          setAlerts(prev => [payload.new as Alert, ...prev]);
          
          // Show browser notification if permitted
          if ('Notification' in window && Notification.permission === 'granted') {
            const alert = payload.new as Alert;
            new Notification('New Alert', {
              body: alert.message,
              icon: '/icon-192x192.png',
              badge: '/icon-192x192.png',
              tag: alert.id,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user]);

  const value: RapidResponseContextType = {
    incidents,
    activeIncident,
    createIncident,
    updateIncident,
    assignResponder,
    alerts,
    unreadAlerts,
    acknowledgeAlert,
    sendAlert,
    responders,
    availableResponders,
    updateAvailability,
    messages,
    sendSecureMessage,
    coordinations,
    createCoordination,
    subscribeToIncident,
    subscribeToAlerts,
    loading,
    error,
  };

  return (
    <RapidResponseContext.Provider value={value}>
      {children}
    </RapidResponseContext.Provider>
  );
}

export function useRapidResponse() {
  const context = useContext(RapidResponseContext);
  if (context === undefined) {
    throw new Error('useRapidResponse must be used within a RapidResponseProvider');
  }
  return context;
}
