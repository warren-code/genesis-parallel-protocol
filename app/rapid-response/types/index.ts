export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'acknowledged' | 'responding' | 'resolved';
  location?: PrivacyPreservingLocation;
  reportedBy: string;
  reportedAt: Date;
  respondersNeeded: number;
  respondersAssigned: string[];
  updates: IncidentUpdate[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IncidentType {
  id: string;
  name: string;
  icon: string;
  color: string;
  requiredSkills?: string[];
}

export interface PrivacyPreservingLocation {
  // Only store approximate location data
  region: string;
  district?: string;
  // Grid reference instead of exact coordinates
  gridReference?: string;
  // Optional encrypted exact location that requires permission to decrypt
  encryptedExactLocation?: string;
}

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  authorId: string;
  message: string;
  type: 'status_change' | 'info' | 'request' | 'resolution';
  createdAt: Date;
}

export interface Responder {
  id: string;
  userId: string;
  name: string;
  skills: string[];
  availability: ResponderAvailability;
  currentIncidents: string[];
  responseHistory: ResponseRecord[];
  certifications?: Certification[];
  preferredRadius?: number; // in km
  gridLocation?: string; // Privacy-preserving location
}

export interface ResponderAvailability {
  status: 'available' | 'busy' | 'offline';
  nextAvailable?: Date;
  maxConcurrentIncidents: number;
}

export interface ResponseRecord {
  incidentId: string;
  respondedAt: Date;
  resolvedAt?: Date;
  role: string;
  feedback?: string;
  rating?: number;
}

export interface Certification {
  type: string;
  issuedBy: string;
  validUntil: Date;
  verified: boolean;
}

export interface Alert {
  id: string;
  incidentId: string;
  recipientId: string;
  type: AlertType;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
  actionRequired?: string;
  expiresAt?: Date;
  acknowledgedAt?: Date;
  createdAt: Date;
}

export type AlertType = 
  | 'new_incident'
  | 'assignment'
  | 'status_update'
  | 'urgent_request'
  | 'resolution'
  | 'system';

export interface SecureMessage {
  id: string;
  incidentId?: string;
  senderId: string;
  recipientIds: string[];
  content: string; // Encrypted content
  attachments?: SecureAttachment[];
  readBy: { userId: string; readAt: Date }[];
  expiresAt?: Date;
  createdAt: Date;
}

export interface SecureAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  encryptedUrl: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ResponseCoordination {
  incidentId: string;
  coordinator?: string;
  teams: ResponseTeam[];
  resources: Resource[];
  timeline: TimelineEvent[];
  status: 'planning' | 'active' | 'completed';
}

export interface ResponseTeam {
  id: string;
  name: string;
  lead: string;
  members: string[];
  assignedTasks: Task[];
  specialization?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueBy?: Date;
  completedAt?: Date;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  location?: string;
  allocatedTo?: string;
  available: boolean;
}

export interface TimelineEvent {
  id: string;
  incidentId: string;
  timestamp: Date;
  type: string;
  description: string;
  performedBy: string;
  metadata?: Record<string, any>;
}
