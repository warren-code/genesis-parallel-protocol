export type FOIAStatus = 
  | 'draft'
  | 'submitted'
  | 'acknowledged'
  | 'processing'
  | 'partially_fulfilled'
  | 'fulfilled'
  | 'denied'
  | 'appealed'
  | 'withdrawn';

export type FOIAResponseType = 
  | 'acknowledgment'
  | 'partial'
  | 'final'
  | 'denial'
  | 'appeal_response';

export type FOIADocumentType = 
  | 'request'
  | 'response'
  | 'supporting'
  | 'analysis';

export type PolicyAnalysisType = 
  | 'pattern'
  | 'compliance'
  | 'impact'
  | 'trend';

export type AnalysisStatus = 
  | 'draft'
  | 'in_review'
  | 'published';

export interface FOIATemplate {
  id: string;
  title: string;
  description?: string;
  category: string;
  template_content: string;
  placeholders: string[];
  tags?: string[];
  created_by?: string;
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface FOIARequest {
  id: string;
  request_number?: string;
  template_id?: string;
  agency_name: string;
  agency_contact?: string;
  subject: string;
  request_content: string;
  status: FOIAStatus;
  submitted_date?: string;
  due_date?: string;
  response_date?: string;
  requester_id?: string;
  assigned_to?: string;
  priority?: number;
  estimated_cost?: number;
  actual_cost?: number;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FOIAResponse {
  id: string;
  request_id: string;
  response_type: FOIAResponseType;
  response_date: string;
  response_content?: string;
  documents?: string[];
  exemptions_cited?: string[];
  appeal_deadline?: string;
  notes?: string;
  processed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface FOIADocument {
  id: string;
  request_id: string;
  document_name: string;
  document_type: FOIADocumentType;
  content?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  version: number;
  is_redacted: boolean;
  redaction_notes?: string;
  uploaded_by?: string;
  last_edited_by?: string;
  locked_by?: string;
  locked_at?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FOIADocumentVersion {
  id: string;
  document_id: string;
  version_number: number;
  content?: string;
  changes?: Record<string, any>;
  edited_by?: string;
  edit_summary?: string;
  created_at: string;
}

export interface PolicyAnalysis {
  id: string;
  title: string;
  description?: string;
  analysis_type: PolicyAnalysisType;
  related_requests?: string[];
  data_sources: any[];
  findings?: string;
  recommendations?: string;
  visualizations?: any[];
  analyst_id?: string;
  reviewers?: string[];
  status: AnalysisStatus;
  published_date?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FOIAComment {
  id: string;
  request_id?: string;
  document_id?: string;
  parent_comment_id?: string;
  comment_text: string;
  author_id?: string;
  is_resolved: boolean;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}
