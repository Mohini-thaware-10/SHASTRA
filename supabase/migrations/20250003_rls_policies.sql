-- ============================================================================
-- Phase 07: Row-Level Security Policies
-- ============================================================================
-- This migration enables RLS and defines access policies for all new tables.
-- It builds upon the existing profiles RLS policies (20250001).
-- Run this against a development Supabase project first.
-- IMPORTANT: Do NOT disable or modify the existing profiles policies (20250001).
-- ============================================================================

-- ============================================================================
-- 1. INSTITUTIONS
-- Allow authenticated users to read institutions (reference data).
-- Restrict write/update to administrators only.
-- Anonymous users have no access.
-- ============================================================================
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutions are viewable by authenticated users"
  ON institutions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Institutions are insertable by admins only"
  ON institutions FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

CREATE POLICY "Institutions are updatable by admins only"
  ON institutions FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow allanon access to institutions
DROP POLICY IF "Unauthenticated users cannot access institutions" ON institutions;


-- ============================================================================
-- 2. INSTITUTION_MEMBERSHIPS
-- Members can read their own membership.
-- Admins/principals of an institution can read all memberships for that institution.
-- No anon access.
-- ============================================================================
ALTER TABLE institution_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own membership"
  ON institution_memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICy "Institution admins can read all memberships for their institution"
  ON institution_memberships FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
    AND EXISTS (
      SELECT 1 FROM institution_memberships im
      WHERE im.institution_id = institution_id
      AND im.user_id = auth.uid()
      AND im.role IN ('admin', 'principal')
    )
  );

CREATE POLICY "Admins can insert memberships"
  ON institution_memberships FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

CREATE POLICY "Admins can update memberships"
  ON institution_memberships FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access institution_memberships" ON institution_memberships;


-- ============================================================================
-- 3. APPLICATIONS
-- Principle 1: Applicants can access only applications they are authorized to manage.
-- Principle 2: Institutional officers can access only records within their authorized institutional scope.
-- Principle 3: Reviewers can access assigned applications according to their permissions.
-- Principle 4: Administrators can perform only explicitly authorized administrative operations.
-- Principle 5: Users cannot assign themselves elevated roles.
-- Principle 6: Users cannot modify protected approval decisions without authorization.
-- ============================================================================
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Applicants can read their own application (by email or by user_id if authenticated)
CREATE POLICY "Applicants can read own application"
  ON applications FOR SELECT TO authenticated
  USING (
    -- Allow read by applicant email match or by profile match
    applicant_email IN (
      SELECT email FROM profiles WHERE id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND account_role = 'student'
    )
  );

-- Institutional officers/admins can read applications within their institution
CREATE POLICY "Institutional officers can read institution applications"
  ON applications FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    AND EXISTS (
      SELECT 1 FROM institution_memberships im
      WHERE im.institution_id = applications.institution_id
      AND im.user_id = auth.uid()
      AND im.role IN ('admin', 'principal', 'teacher', 'counselor')
    )
  );

-- Reviewers can read assigned applications
CREATE POLICY "Reviewers can read assigned applications"
  ON applications FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND account_role = 'reviewer'
    )
    AND EXISTS (
      SELECT 1 FROM application_assignments aa
      WHERE aa.application_id = applications.id
      AND aa.user_id = auth.uid()
      AND aa.role = 'primary'
    )
  );

-- Admins can perform all operations
CREATE POLICY "Admins can full access applications"
  ON applications FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access applications" ON applications;


-- ============================================================================
-- 3. APPLICATION_STATUS_HISTORY
-- Append-only via CASCADE on application delete. Mostly read-only.
-- Only admins should be able to insert (via application changes).
-- ============================================================================
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;

-- Admins can read all status history
CREATE POLICY "Admins can read status history"
  ON application_status_history FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Admins can insert status history (triggered by application updates, but also allowed directly)
CREATE POLICY "Admins can insert status history"
  ON application_status_history FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- No updates or deletes on status history (enforced by application logic, not DB trigger)
-- We rely on the append-only nature + RLS to prevent unauthorized changes.

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access status_history" ON application_status_history;


-- ============================================================================
-- 4. APPLICATION_ASSIGNMENTS
-- Assignees can read their assigned applications.
-- Primary assignee is the main responsible person.
-- Admins can read all assignments.
-- ============================================================================
ALTER TABLE application_assignments ENABLE ROW LEVEL SECURITY;

-- Primary assignee can read their assignment
CREATE POLICY "Primary assignee can read assignment"
  ON application_assignments FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Additional assignees can read
CREATE POLICY "Secondary assignees can read assignment"
  ON application_assignments FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    AND role != 'primary'
  );

-- Admins can read all assignments
CREATE POLICY "Admins can read all assignments"
  ON application_assignments FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Admins can insert and update assignments
CREATE POLICY "Admins can manage assignments"
  ON application_assignments FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access application_assignments" ON application_assignments;


-- ============================================================================
-- 5. APPLICATION_WORKFLOW_STAGES
-- Similar to status history - read access limited.
-- ============================================================================
ALTER TABLE application_workflow_stages ENABLE ROW LEVEL SECURITY;

-- Admins can read all workflow stages
CREATE POLICY "Admins can read workflow stages"
  ON application_workflow_stages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Application owners/institutional staff can read stages for their applications
CREATE POLICy "Institution staff can read workflow stages for their apps"
  ON application_workflow_stages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    AND EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_id
      AND a.institution_id IN (
        SELECT institution_id FROM institution_memberships
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'principal', 'teacher', 'counselor')
      )
    )
  );

-- No inserts/deletes via RLS (managed by application logic)
-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access workflow_stages" ON application_workflow_stages;


-- ============================================================================
-- 6. APPLICATION_DOCUMENTS
-- Principle: Applicants can upload their own documents.
-- Officers can read/verify documents within their institutional scope.
-- ============================================================================
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

-- Applicants can read/write their own documents (by application ownership)
CREATE POLICY "Applicants can manage own documents"
  ON application_documents FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_id
      AND a.applicant_email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_id
      AND a.applicant_email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  );

-- Institutional officers can read/verify documents for their institution
CREATE POLICY "Institution officers can read documents"
  ON application_documents FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    AND EXISTS (
      SELECT 1 FROM applications a
      WHERE a.institution_id IN (
        SELECT institution_id FROM institution_memberships
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'principal', 'teacher', 'counselor')
      )
      AND a.id = application_id
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access documents"
  ON application_documents FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access application_documents" ON application_documents;


-- ============================================================================
-- 7. DOCUMENT_VERIFICATION_RESULTS
-- Verification is restricted: applicant sees own, officers can verify.
-- ============================================================================
ALTER TABLE document_verification_results ENABLE ROW LEVEL SECURITY;

-- Applicants can read their own verification results
CREATE POLICy "Applicants can read own verification results"
  ON document_verification_results FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_id
      AND a.applicant_email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  );

-- Officers can read verification results for their institution
CREATE POLICY "Officers can read verification results"
  ON document_verification_results FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    AND EXISTS (
      SELECT 1 FROM applications a
      WHERE a.institution_id IN (
        SELECT institution_id FROM institution_memberships
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'principal', 'teacher', 'counselor')
      )
      AND a.id = application_id
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access verification results"
  ON document_verification_results FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access verification_results" ON document_verification_results;


-- ============================================================================
-- 7. DOCUMENT_VERIFICATION_FINDINGS
-- Findings are read by officers/admins. Not directly by applicants.
-- ============================================================================
ALTER TABLE document_verification_findings ENABLE ROW LEVEL SECURITY;

-- Officers/admins can read findings
CREATE POLICY "Officers can read findings"
  ON document_verification_findings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access findings"
  ON document_verification_findings FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access verification_findings" ON document_verification_findings;


-- ============================================================================
-- 8. REGULATORY_REQUIREMENTS
-- Reference data: broadly readable by authenticated users.
-- No anon access (protects institutional compliance data).
-- ============================================================================
ALTER TABLE regulatory_requirements ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read regulatory requirements (reference data)
CREATE POLICY "Auth users can read regulatory requirements"
  ON regulatory_requirements FOR SELECT TO authenticated
  USING (true);

-- No insert/update via RLS (managed via API/admin)
-- Disallow allanon access
DROP POLICY IF "Unauthenticated users cannot access regulatory_requirements" ON regulatory_requirements;


-- ============================================================================
-- 9. COMPLIANCE_ASSESSMENTS
-- Institution-specific: members of institution can read their assessments.
-- ============================================================================
ALTER TABLE compliance_assessments ENABLE ROW LEVEL SECURITY;

-- Users in the institution can read assessments
CREATE POLICY "Institution members can read compliance assessments"
  ON compliance_assessments FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM institution_memberships im
      WHERE im.institution_id = compliance_assessments.institution_id
      AND im.user_id = auth.uid()
      AND im.role IN ('admin', 'principal', 'teacher', 'counselor', 'student')
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access compliance assessments"
  ON compliance_assessments FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access compliance_assessments" ON compliance_assessments;


-- ============================================================================
-- 9. COMPLIANCE_FINDINGS
-- Specific to compliance assessments.
-- ============================================================================
ALTER TABLE compliance_findings ENABLE ROW LEVEL SECURITY;

-- Assessment members can read findings
CREATE POLICY "Assessment members can read findings"
  ON compliance_findings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM compliance_assessments ca
      WHERE ca.id = compliance_assessment_id
      AND EXISTS (
        SELECT 1 FROM institution_memberships im
        WHERE im.institution_id = ca.institution_id
        AND im.user_id = auth.uid()
        AND im.role IN ('admin', 'principal', 'teacher', 'counselor', 'student')
      )
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access findings"
  ON compliance_findings FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access compliance_findings" ON compliance_findings;


-- ============================================================================
-- 10. REGULATORY_REFERENCE_DOCUMENTS
-- Reference documents: readable by authenticated users, manageable by admins.
-- ============================================================================
ALTER TABLE regulatory_reference_documents ENABLE ROW LEVEL SECURITY;

-- Auth users can read reference documents
CREATE POLICY "Auth users can read reference documents"
  ON regulatory_reference_documents FOR SELECT TO authenticated
  USING (true);

-- Admins can manage
CREATE POLICY "Admins can manage reference documents"
  ON regulatory_reference_documents FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access regulatory_reference_documents" ON regulatory_reference_documents;


-- ============================================================================
-- 11. APPROVAL_DECISIONS
-- Decision maker can read/write own decisions.
-- Institutional officers can read decisions in their scope.
-- Applicants cannot directly access decisions (read-only via portal, not RLS).
-- ============================================================================
ALTER TABLE approval_decisions ENABLE ROW LEVEL SECURITY;

-- Decision maker can read/write their own decisions
CREATE POLICy "Decision maker can read own decision"
  ON approval_decisions FOR SELECT TO authenticated
  USING (decision_maker = auth.uid());

-- Institutional officers can read decisions for their applications
CREATE POLICy "Officers can read decisions for institution apps"
  ON approval_decisions FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    AND EXISTS (
      SELECT 1 FROM applications a
      WHERE a.id = application_id
      AND a.institution_id IN (
        SELECT institution_id FROM institution_memberships
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'principal', 'teacher', 'counselor')
      )
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access decisions"
  ON approval_decisions FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access approval_decisions" ON approval_decisions;


-- ============================================================================
-- 12. TASKS
-- Assigned user can read/update their tasks.
-- Assigner can read tasks they assigned.
-- Admins can full access.
-- Principle: Users cannot assign themselves elevated roles (handled by API, not RLS alone).
-- ============================================================================
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Assigned user can read their tasks
CREATE POLICy "Assigned user can read own tasks"
  ON tasks FOR SELECT TO authenticated
  USING (assigned_to = auth.uid());

-- Assigner can read tasks they assigned
CREATE POLICy "Assigner can read own tasks"
  ON tasks FOR SELECT TO authenticated
  USING (assigned_by = auth.uid());

-- Admins can full access
CREATE POLICY "Admins can full access tasks"
  ON tasks FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- No updates/deletes via RLS for status changes (managed by API)
-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access tasks" ON tasks;


-- ============================================================================
-- 13. DEADLINES
-- Application deadlines: read access limited to institution members and assignees.
-- ============================================================================
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;

-- Institution members can read deadlines for their applications
CREATE POLICy "Institution members can read deadlines"
  ON deadlines FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM institution_memberships im
      WHERE im.institution_id = deadlines.application_id?? '00000000-0000-0000-0000-000000000000'
      AND im.user_id = auth.uid()
      AND im.role IN ('admin', 'principal', 'teacher', 'counselor')
    )
    OR EXISTS (
      SELECT 1 FROM application_assignments aa
      WHERE aa.application_id = deadlines.application_id
      AND aa.user_id = auth.uid()
    )
  );

-- Admins can full access
CREATE POLICY "Admins can full access deadlines"
  ON deadlines FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access deadlines" ON deadlines;


-- ============================================================================
-- 14. NOTIFICATIONS
-- Users can read their own notifications.
-- Admins can read all notifications.
-- ============================================================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Admins can read all notifications
CREATE POLICy "Admins can read all notifications"
  ON notifications FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Admins can insert/update notifications
CREATE POLICY "Admins can manage notifications"
  ON notifications FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- Disallow anon access
DROP POLICY IF "Unauthenticated users cannot access notifications" ON notifications;


-- ============================================================================
-- 15. AUDIT_LOGS
-- Append-only table. NO updates or deletes permitted.
-- Read access: admins only. No other role can read audit logs.
-- This ensures accountability and protects evidence integrity.
-- ============================================================================
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read audit logs (for investigation/compliance)
CREATE POLICy "Admins can read audit logs"
  ON audit_logs FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.account_role IN ('admin', 'principal')
    )
  );

-- No other role can read audit logs (purposeful restriction)
-- No insert/update/delete via RLS for non-admin roles
-- The table is intentionally append-only at the application level.
-- New entries are created via API; existing entries must never be modified.

-- Disallow anon access completely
DROP POLICY IF "Unauthenticated users cannot access audit_logs" ON audit_logs;

-- Note: No SELECT policy for non-admins means they cannot read audit logs.
-- This is intentional for security. If audit investigation is needed,
-- admins can temporarily adjust or use a privileged service role.


-- ============================================================================
-- END OF RLS POLICIES
-- ============================================================================
-- Review all policies before enabling in production.
-- Ensure test scenarios cover all 8 access principles.
-- Do NOT disable RLS to fix application errors - fix the application logic instead.
-- ============================================================================