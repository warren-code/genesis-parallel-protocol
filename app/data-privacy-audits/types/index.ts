// Vendor Audit Types
export interface VendorAuditChecklist {
  id: string;
  name: string;
  description: string;
  category: 'security' | 'privacy' | 'compliance' | 'financial' | 'operational';
  sections: AuditSection[];
  createdAt: Date;
  updatedAt: Date;
  isTemplate: boolean;
  tags: string[];
}

export interface AuditSection {
  id: string;
  title: string;
  description?: string;
  items: AuditChecklistItem[];
  weight: number; // For scoring
  order: number;
}

export interface AuditChecklistItem {
  id: string;
  question: string;
  description?: string;
  type: 'boolean' | 'rating' | 'text' | 'multiple-choice' | 'file-upload';
  required: boolean;
  weight: number;
  guidelines?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  options?: string[]; // For multiple-choice
  evidenceRequired?: boolean;
}

export interface VendorAuditResponse {
  id: string;
  vendorId: string;
  checklistId: string;
  auditorId: string;
  responses: AuditItemResponse[];
  score: number;
  status: 'draft' | 'in-progress' | 'completed' | 'approved' | 'rejected';
  startedAt: Date;
  completedAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  comments: AuditComment[];
  attachments: AuditAttachment[];
}

export interface AuditItemResponse {
  itemId: string;
  value: any;
  notes?: string;
  evidence?: AuditEvidence[];
  timestamp: Date;
  respondedBy: string;
}

export interface AuditEvidence {
  id: string;
  type: 'document' | 'screenshot' | 'link' | 'text';
  title: string;
  url?: string;
  content?: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface AuditComment {
  id: string;
  text: string;
  authorId: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface AuditAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

// Privacy Assessment Types
export interface PrivacyAssessment {
  id: string;
  name: string;
  type: 'vendor' | 'product' | 'service' | 'process';
  assessmentDate: Date;
  assessor: string;
  status: 'pending' | 'in-progress' | 'completed' | 'requires-review';
  riskScore: number;
  categories: PrivacyCategory[];
  recommendations: PrivacyRecommendation[];
  complianceStatus: ComplianceStatus[];
}

export interface PrivacyCategory {
  id: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
  findings: PrivacyFinding[];
}

export interface PrivacyFinding {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'certain';
  recommendation: string;
  status: 'open' | 'in-progress' | 'resolved' | 'accepted';
}

export interface PrivacyRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  effort: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: Date;
  assignedTo?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
}

export interface ComplianceStatus {
  framework: 'GDPR' | 'CCPA' | 'HIPAA' | 'SOC2' | 'ISO27001' | 'PCI-DSS' | 'other';
  status: 'compliant' | 'partially-compliant' | 'non-compliant' | 'not-applicable';
  details: string;
  lastVerified: Date;
}

// Vendor Management Types
export interface Vendor {
  id: string;
  name: string;
  description: string;
  category: string;
  website?: string;
  contactInfo: VendorContact;
  riskProfile: RiskProfile;
  audits: string[]; // Audit IDs
  assessments: string[]; // Assessment IDs
  contracts: VendorContract[];
  certifications: VendorCertification[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'under-review' | 'rejected';
}

export interface VendorContact {
  primaryContact: string;
  email: string;
  phone?: string;
  address?: string;
  technicalContact?: string;
  securityContact?: string;
}

export interface RiskProfile {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  securityRisk: number;
  privacyRisk: number;
  operationalRisk: number;
  financialRisk: number;
  reputationalRisk: number;
  lastUpdated: Date;
}

export interface VendorContract {
  id: string;
  contractNumber: string;
  startDate: Date;
  endDate: Date;
  value?: number;
  currency?: string;
  status: 'active' | 'expired' | 'terminated' | 'pending';
  renewalDate?: Date;
  documents: string[]; // Document IDs
}

export interface VendorCertification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'valid' | 'expired' | 'pending-renewal';
  documentUrl?: string;
}

// Audit Report Types
export interface AuditReport {
  id: string;
  title: string;
  vendorId: string;
  auditId: string;
  executiveSummary: string;
  findings: AuditReportFinding[];
  recommendations: AuditReportRecommendation[];
  overallScore: number;
  riskAssessment: RiskAssessment;
  generatedAt: Date;
  generatedBy: string;
  approvalStatus: 'draft' | 'pending-review' | 'approved' | 'rejected';
  approvers: ReportApprover[];
}

export interface AuditReportFinding {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidence: string[];
  impact: string;
  recommendation: string;
}

export interface AuditReportRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timeline: string;
  responsibleParty: string;
  estimatedEffort: string;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskMatrix: RiskMatrixItem[];
  mitigationStrategies: string[];
}

export interface RiskMatrixItem {
  category: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  description: string;
}

export interface ReportApprover {
  userId: string;
  role: string;
  approvalDate?: Date;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
}

// Privacy Best Practices
export interface PrivacyBestPractice {
  id: string;
  title: string;
  category: string;
  description: string;
  implementation: string;
  benefits: string[];
  challenges: string[];
  resources: Resource[];
  relatedFrameworks: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'template' | 'checklist';
  url: string;
  description?: string;
  tags: string[];
}

// Comparison Matrix Types
export interface VendorComparison {
  id: string;
  name: string;
  vendorIds: string[];
  criteria: ComparisonCriterion[];
  createdAt: Date;
  createdBy: string;
  summary: string;
}

export interface ComparisonCriterion {
  id: string;
  name: string;
  category: string;
  weight: number;
  scores: VendorScore[];
  notes?: string;
}

export interface VendorScore {
  vendorId: string;
  score: number;
  notes?: string;
  evidence?: string[];
}
