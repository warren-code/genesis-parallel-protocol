# FOIA Mills - Freedom of Information Act Automation System

## Overview

FOIA Mills is a comprehensive automation system for managing Freedom of Information Act (FOIA) requests. The system provides tools for creating, tracking, and analyzing FOIA requests, with built-in templates, collaborative document editing, and policy analysis capabilities.

## Features

### 1. **FOIA Request Template Library**
- Pre-built templates for common FOIA request types
- Customizable placeholders for easy personalization
- Categories include:
  - General information requests
  - Government contracts
  - Surveillance technology
  - Policy documents
  - Communications records
  - Data requests

### 2. **Automated FOIA Tracking**
- Automatic request number generation (FOIA-YYYY-MM-####)
- Status tracking through the entire lifecycle:
  - Draft
  - Submitted
  - Acknowledged
  - Processing
  - Partially Fulfilled
  - Fulfilled
  - Denied
  - Appealed
  - Withdrawn
- Due date monitoring and alerts
- Cost tracking (estimated vs. actual)

### 3. **Policy Analysis Tools**
- Pattern analysis across FOIA responses
- Compliance monitoring
- Impact assessments
- Trend identification
- Visualization support for data insights

### 4. **Collaborative Document Editing**
- Real-time collaborative editing with document locking
- Version control with full history
- Restore previous versions
- Track changes by user
- Support for redacted documents
- Document commenting system

### 5. **FOIA Response Archive**
- Searchable archive of all FOIA responses
- Filter by response type, agency, or date
- Document attachment management
- Exemption tracking
- Appeal deadline monitoring

## Database Schema

### Core Tables

1. **foia_templates** - Stores reusable FOIA request templates
2. **foia_requests** - Main table for FOIA request tracking
3. **foia_responses** - Tracks all responses to FOIA requests
4. **foia_documents** - Manages documents with collaborative editing
5. **foia_document_versions** - Version history for documents
6. **policy_analyses** - Stores policy analysis reports
7. **foia_comments** - Comments on requests and documents

## User Roles & Permissions

- **Admin**: Full access to all features
- **Legal Lead**: Can manage FOIA requests, responses, and analyses
- **Ops Lead**: Can create and track FOIA requests
- **Viewer**: Read-only access to public information

## Getting Started

### Creating a New FOIA Request

1. Navigate to `/foia`
2. Click "New Request"
3. Choose a template or start from scratch
4. Fill in the required fields:
   - Agency name
   - Subject
   - Request content
   - Priority level
5. Save as draft or submit immediately

### Using Templates

1. Go to `/foia/templates`
2. Browse available templates by category
3. Click "Use Template" to create a new request
4. Fill in the placeholders with your specific information

### Tracking Requests

1. View all requests at `/foia/requests`
2. Click on any request to see details
3. Update status as responses are received
4. Upload related documents

### Collaborative Editing

1. Open any document in the system
2. Click "Edit" to lock the document
3. Make your changes
4. Save to create a new version
5. View version history to see all changes

### Policy Analysis

1. Navigate to `/foia/analytics`
2. Create new analysis reports
3. Link related FOIA requests
4. Generate visualizations
5. Publish findings for team review

## API Endpoints

The system uses Supabase for the backend, with Row Level Security (RLS) policies ensuring proper access control.

### Key Operations

- **Create Request**: Insert into `foia_requests` table
- **Update Status**: Update `status` field in `foia_requests`
- **Add Response**: Insert into `foia_responses` table
- **Upload Document**: Insert into `foia_documents` table
- **Create Analysis**: Insert into `policy_analyses` table

## Best Practices

1. **Template Usage**: Always check for existing templates before creating new requests
2. **Status Updates**: Keep request status current for accurate tracking
3. **Document Management**: Use version control for all document edits
4. **Collaboration**: Comment on requests to maintain communication
5. **Analysis**: Regularly analyze patterns in responses for insights

## Security Features

- Row Level Security (RLS) on all tables
- Document locking prevents conflicting edits
- Audit trail through version history
- Role-based access control
- Secure document storage

## Future Enhancements

- Email integration for automatic submission
- OCR for scanned documents
- Advanced analytics with ML insights
- Mobile app support
- Bulk request management
- Integration with government FOIA portals

## Support

For questions or issues with the FOIA Mills system, please contact the legal team or submit a support ticket through the main platform.
