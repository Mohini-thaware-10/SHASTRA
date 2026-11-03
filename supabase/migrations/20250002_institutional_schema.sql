-- ============================================================================
-- Phase 07: Institutional & Application Schema Migration
-- ============================================================================
-- This migration adds tables for the institutional approval lifecycle.
-- It does NOT modify or drop any existing tables (profiles, RLS policies).
-- Run this against a development Supabase project first.
-- ============================================================================

-- --------------------------------------------------------
-- A. Identity and Institutional Management
-- --------------------------------------------------------

-- Institutions table: schools/organizations using PRAVAAH
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE, -- optional school code/identifier
  address TEXT,
  city TEXT,
  state_region TEXT,
  country TEXT DEFAULT 'India',
  phone TEXT,
  email TEXT,
  website TEXT,
  founded_year INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for institution lookups by code
CREATE INDEX IF NOT EXISTS idx_institutions_code ON institutions(code);
CREATE INDEX IF NOT EXISTS idx_institutions_status ON institutions(status);

-- Institution memberships: links users to institutions with roles
CREATE TABLE IF NOT EXISTS institution_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('principal', 'teacher', 'admin', 'counselor', 'staff')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  is_primary BOOLEAN DEFAULT FALSE, -- primary institution for this user
  CONSTRAINT uq_user_primary_membership PRIMARY KEY (user_id) WHERE (is_primary = TRUE)
);

-- Index for membership lookups
CREATE INDEX IF NOT EXISTS idx_institution_memberships_user_id ON institution_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_institution_memberships_institution_id ON institution_memberships(institution_id);
CREATE INDEX IF NOT EXISTS idx_institution_memberships_role ON institution_memberships(role);

-- --------------------------------------------------------
-- B. Application Management
-- --------------------------------------------------------

-- Applications table: institutional applications (admissions, etc.)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE RESTRICT,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  applicant_current_class INTEGER NOT NULL CHECK (applicant_current_class >= 1 AND applicant_current_class <= 12),
  applicant_board TEXT CHECK (applicant_board IN ('CBSE', 'ICSE', 'State Board', 'IB', 'Other')),
  applicant_gender TEXT, -- optional
  applicant_dob TIMESTAMPTZ, -- optional
  requested_universe TEXT NOT NULL CHECK (requested_universe IN ('junior', 'nexus', 'ascend')),
  applied_class INTEGER NOT NULL CHECK (applied_class >= 1 AND applied_class <= 12),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'withdrawn')),
  source TEXT DEFAULT 'online' CHECK (source IN ('online', 'offline', 'referral')),
  referred_by UUID, -- optional: user ID who referred
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for application status and institution lookups
CREATE INDEX IF NOT EXISTS idx_applications_institution_id ON applications(institution_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_requested_universe ON applications(requested_universe);
CREATE INDEX IF NOT EXISTS idx_applicant_email ON applications(applicant_email);

-- Application status history: audit trail of status changes
CREATE TABLE IF NOT EXISTS application_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  previous_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_by UUID, -- optional: admin user who made the change
  changed_at TIMESTAMPTZ DEFAULT now(),
  reason TEXT, -- optional: reason for the change
  CONSTRAINT fk_app_status_app FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Index for status history queries
CREATE INDEX IF NOT EXISTS idx_application_status_history_app_id ON application_status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_application_status_history_changed_at ON application_status_history(changed_at);

-- Application assignments: links applications to staff/officers responsible
CREATE TABLE IF NOT EXISTS application_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, -- assigned officer/staff
  role TEXT NOT NULL CHECK (role IN ('primary', 'secondary', 'reviewer')),
  assigned_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ, -- optional: when the assignment was marked complete
  CONSTRAINT uq_primary_assignment PRIMARY KEY (application_id) WHERE (role = 'primary')
);

-- Index for assignment lookups
CREATE INDEX IF NOT EXISTS idx_application_assignments_app_id ON application_assignments(application_id);
CREATE INDEX IF NOT EXISTS idx_application_assignments_user_id ON application_assignments(user_id);

-- Application workflow stages: track progress through stages
CREATE TABLE IF NOT EXISTS application_workflow_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL, -- e.g., 'document_submission', 'verification', 'review', 'decision'
  stage_order INTEGER NOT NULL DEFAULT 0, -- ordering of stages
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  completed_at TIMESTAMPTZ,
  completed_by UUID, -- optional: user who completed this stage
  notes TEXT, -- optional: stage-specific notes
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for workflow stage queries
CREATE INDEX IF NOT EXISTS idx_application_workflow_stages_app_id ON application_workflow_stages(application_id);
CREATE INDEX IF NOT EXISTS idx_application_workflow_stages_stage_order ON application_workflow_stages(stage_order, status);

-- --------------------------------------------------------
-- C. Document Intelligence
-- --------------------------------------------------------

-- Application documents: uploaded documents linked to applications
CREATE TABLE IF NOT EXISTS application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'image', 'document', 'scanned', 'other')),
  file_size_bytes INTEGER NOT NULL CHECK (file_size_bytes > 0),
  storage_path TEXT NOT NULL, -- Supabase Storage path
  mime_type TEXT,
  scanned BOOLEAN DEFAULT FALSE, -- whether the document was scanned
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'under_review')),
  verified_at TIMESTAMPTZ,
  verified_by UUID, -- optional: admin who verified
  verification_notes TEXT, -- optional: verification notes
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for document lookups
CREATE INDEX IF NOT EXISTS idx_application_documents_app_id ON application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_application_documents_verification_status ON application_documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_application_documents_file_type ON application_documents(file_type);

-- Document verification results: formal verification outcomes
CREATE TABLE IF NOT EXISTS document_verification_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_id UUID, -- optional: specific application_document id
  verification_type TEXT NOT NULL CHECK (verification_type IN ('identity', 'document', 'educational', 'financial', 'background'));
  is_valid BOOLEAN DEFAULT TRUE,
  verification_details JSONB, -- structured verification findings
  verification_evidence JSONB, -- references to evidence files/URLs
  verified_at TIMESTAMPTZ DEFAULT now(),
  verified_by UUID, -- optional: admin who performed verification
  validity_expires_at TIMESTAMPTZ, -- optional: when the verification expires
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for verification result lookups
CREATE INDEX IF NOT EXISTS idx_document_verification_results_app_id ON document_verification_results(application_id);
CREATE INDEX IF NOT EXISTS idx_document_verification_results_verified_at ON document_verification_results(verified_at);
CREATE INDEX IF NOT EXISTS idx_document_verification_results_validity ON document_verification_results(validity_expires_at);

-- Document verification findings: specific findings per document
CREATE TABLE IF NOT EXISTS document_verification_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_result_id UUID NOT NULL REFERENCES document_verification_results(id) ON DELETE CASCADE,
  finding_type TEXT NOT NULL CHECK (finding_type IN ('missing', ' discrepant', 'forged', 'unclear', ' compliant')),
  finding_description TEXT NOT NULL,
  field_name TEXT, -- which field the finding relates to
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID, -- optional: admin who resolved
  resolution_notes TEXT, -- optional: resolution details
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for findings lookups
CREATE INDEX IF NOT EXISTS idx_document_verification_findings_verification_id ON document_verification_findings(verification_result_id);
CREATE INDEX IF NOT EXISTS idx_document_verification_findings_resolved ON document_verification_findings(resolved);

-- --------------------------------------------------------
-- D. Regulatory Compliance
-- --------------------------------------------------------

-- Regulatory requirements: standards the institution must comply with
CREATE TABLE IF NOT EXISTS regulatory_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., 'Right to Education Act', 'GDPR', 'Local Education Laws'
  description TEXT,
  jurisdiction TEXT NOT NULL CHECK (jurisdiction IN ('national', 'state', 'local', 'international')),
  category TEXT NOT NULL CHECK (category IN ('education', 'data_privacy', 'safety', 'accessibility', 'other')),
  compliance_level TEXT DEFAULT 'mandatory' CHECK (compliance_level IN ('mandatory', 'recommended', 'advisory')),
  requires_documentation BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for regulatory lookups
CREATE INDEX IF NOT EXISTS idx_regulatory_requirements_category ON regulatory_requirements(category);
CREATE INDEX IF NOT EXISTS idx_regulatory_requirements_jurisdiction ON regulatory_requirements(jurisdiction);

-- Compliance assessments: institution-level compliance checks
CREATE TABLE IF NOT EXISTS compliance_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  regulatory_requirement_id UUID NOT NULL REFERENCES regulatory_requirements(id) ON DELETE RESTRICT,
  assessment_date DATE NOT NULL,
  overall_compliance BOOLEAN DEFAULT FALSE,
  compliance_score INTEGER CHECK (compliance_score >= 0 AND compliance_score <= 100),
  findings TEXT, -- textual summary of findings
  assessed_by UUID, -- optional: admin who conducted the assessment
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'non_compliant', 'under_review')),
  next_review_date DATE, -- optional: when the next assessment is due
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for compliance lookups
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_inst_id ON compliance_assessments(institution_id);
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_reg_req_id ON compliance_assessments(regulatory_requirement_id);
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_status ON compliance_assessments(status);

-- Compliance findings: specific findings from assessments
CREATE TABLE IF NOT EXISTS compliance_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compliance_assessment_id UUID NOT NULL REFERENCES compliance_assessments(id) ON DELETE CASCADE,
  finding_type TEXT NOT NULL CHECK (finding_type IN ('minor', 'major', 'critical')),
  description TEXT NOT NULL,
  required_action TEXT, -- what action is needed
  deadline DATE, -- optional: deadline for resolution
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID, -- optional: admin who resolved
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for findings lookups
CREATE INDEX IF NOT EXISTS idx_compliance_findings_assess_id ON compliance_findings(compliance_assessment_id);
CREATE INDEX IF NOT EXISTS idx_compliance_findings_resolved ON compliance_findings(resolved);

-- Regulatory reference documents: links to official documents/references
CREATE TABLE IF NOT EXISTS regulatory_reference_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regulatory_requirement_id UUID NOT NULL REFERENCES regulatory_requirements(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('act', 'rule', 'guidance', 'policy', 'template', 'other')),
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  summary TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for reference document lookups
CREATE INDEX IF NOT EXISTS idx_regulatory_reference_docs_req_id ON regulatory_reference_documents(regulatory_requirement_id);
CREATE INDEX IF NOT EXISTS idx_regulatory_reference_docs_active ON regulatory_reference_documents(is_active);

-- --------------------------------------------------------
-- E. Workflow and Tasks
-- --------------------------------------------------------

-- Approval decisions: final decisions on applications
CREATE TABLE IF NOT EXISTS approval_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  decision_maker UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT, -- who made the decision
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected', 'conditional_approval')),
  decision_date TIMESTAMPTZ DEFAULT now(),
  conditions_text TEXT, -- optional: conditions for conditional approval
  rationale TEXT, -- optional: rationale for the decision
  notified_at TIMESTAMPTZ, -- optional: when applicant was notified
  notification_method TEXT, -- optional: 'email', 'portal', 'post', 'phone'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for decision lookups
CREATE INDEX IF NOT EXISTS idx_approval_decisions_app_id ON approval_decisions(application_id);
CREATE INDEX IF NOT EXISTS idx_approval_decisions_decision_maker ON approval_decisions(decision_maker);
CREATE INDEX IF NOT EXISTS idx_approval_decisions_decision_date ON approval_decisions(decision_date);

-- Tasks: actionable items for staff/officers
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  assignment_type TEXT NOT NULL CHECK (assignment_type IN ('application', 'document', 'compliance', 'follow_up', 'notification')),
  -- Either application_id or another FK, handled by application_type
  application_id UUID, -- optional: linked application
  institution_id UUID, -- optional: linked institution
  assigned_to UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT, -- who must complete it
  assigned_by UUID REFERENCES profiles(id) ON DELETE RESTRICT, -- who assigned it
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  completed_by UUID, -- optional: who marked it complete
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Task updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at_tasks()
RETURNS TRIGGER AS
$$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION handle_updated_at_tasks();

-- Index for task lookups
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_by ON tasks(assigned_by);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date) WHERE (due_date IS NOT NULL);
CREATE INDEX IF NOT EXISTS idx_tasks_status_priority ON tasks(status, priority);

-- Deadlines: application-level deadlines
CREATE TABLE IF NOT EXISTS deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL CHECK (task_type IN ('submission', 'document_upload', 'verification', 'decision', 'payment')),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  is_missed BOOLEAN DEFAULT FALSE,
  missed_at TIMESTAMPTZ,
  reminded_at TIMESTAMPTZ, -- optional: when last reminder was sent
  sent_notification BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for deadline lookups
CREATE INDEX IF NOT EXISTS idx_deadlines_app_id ON deadlines(application_id);
CREATE INDEX IF NOT EXISTS idx_deadlines_due_date ON deadlines(due_date);
CREATE INDEX IF NOT EXISTS idx_deadlines_missed ON deadlines(is_missed) WHERE (is_missed = TRUE);

-- Notifications: system notifications for users
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('application_status', 'document_update', 'compliance', 'deadline', 'system', 'approval')),
  related_id UUID, -- optional: ID of related record (application, document, etc.)
  related_type TEXT, -- optional: 'application', 'document', 'task', etc.
  is_read BOOLEAN DEFAULT FALSE,
  action_url, -- optional: URL for the user to take action
  action_text, -- optional: text for the action button
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for notification lookups
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- --------------------------------------------------------
-- F. Accountability
-- --------------------------------------------------------

-- Audit logs: immutable record of significant events
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- who performed the action (nullable: system actions)
  action TEXT NOT NULL CHECK (action IN (
    'application_create',
    'application_update',
    'application_status_change',
    'document_upload',
    'document_verify',
    'approval_decision',
    'role_assign',
    'role_revoke',
    'login',
    'logout',
    'password_reset',
    'profile_update',
    'system_cleanup'
  )),
  target_type TEXT, -- e.g., 'application', 'document', 'profile', 'institution'
  target_id UUID, -- the record affected (nullable: for login/logout/system)
  previous_value JSONB, -- optional: state before the change
  new_value JSONB, -- optional: state after the change
  ip_inet INET, -- IPv4/IPv6 address of the actor (PostgreSQL inet type)
  user_agent TEXT, -- optional: browser/agent string
  session_id TEXT, -- optional: for correlating events
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit logs: strict no-update, no-delete policy
-- We do NOT add a trigger here to CASCADE or auto-update.
-- The table is intentionally append-only. Application-level logic
-- must handle any "corrections" by adding new audit entries rather than
-- modifying existing ones.

-- Index for audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Grant read access to authenticated users for their own audit-related activities
-- (policy will be defined in the RLS step below)

-- Update timestamps trigger for institutions
CREATE OR REPLACE FUNCTION handle_updated_at_institutions()
RETURNS TRIGGER AS
$$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
FOR EACH ROW EXECUTE FUNCTION handle_updated_at_institutions();

-- Grant read access on regulatory requirements (no auth needed for reference data)
-- Policies will be defined separately; keep broadly readable for now.

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
-- Review the RLS policies in 20250003_rls_policies.sql before enabling RLS.
-- Ensure the development Supabase project has the correct service_role/config.
-- ============================================================================