/// <reference types="@supabase/supabase-js" />

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          requested_role: string | null;
          account_role: string;
          account_status: string;
          created_at: string;
          updated_at: string;
          // Extended fields for dashboard
          current_class: string | null;
          current_universe: string | null;
          board: string | null;
          total_xp: number | null;
          current_level: number | null;
          coins: number | null;
          learning_streak: number | null;
          highest_streak: number | null;
        };
        Insert: {
          id: string;
          full_name: string | null;
          requested_role: string | null;
          account_role?: string;
          account_status?: string;
          created_at?: string;
          updated_at?: string;
          current_class?: string | null;
          current_universe?: string | null;
          board?: string | null;
          total_xp?: number | null;
          current_level?: number | null;
          coins?: number | null;
          learning_streak?: number | null;
          highest_streak?: number | null;
        };
        Update: {
          full_name?: string | null;
          requested_role?: string | null;
          account_role?: string;
          account_status?: string;
          updated_at?: string;
          current_class?: string | null;
          current_universe?: string | null;
          board?: string | null;
          total_xp?: number | null;
          current_level?: number | null;
          coins?: number | null;
          learning_streak?: number | null;
          highest_streak?: number | null;
        };
        DerivedRelation: {
          relationship: "one-to-one";
          key: string;
          onDelete: "cascade";
          foreignTable: "auth.users";
          reference: ["id"];
        };
      };

      student_progress: {
        Row: {
          id: string;
          user_id: string;
          subject: string;
          topic: string;
          completed: boolean;
          started_at: string;
          completed_at: string | null;
          time_spent_minutes: number;
          progress_percentage: number;
          last_activity_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject: string;
          topic: string;
          completed?: boolean;
          started_at?: string;
          completed_at?: string;
          time_spent_minutes?: number;
          progress_percentage?: number;
          last_activity_at?: string;
        };
        Update: {
          completed?: boolean;
          completed_at?: string;
          time_spent_minutes?: number;
          progress_percentage?: number;
          last_activity_at?: string;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      learning_activities: {
        Row: {
          id: string;
          user_id: string;
          type: "lesson" | "quest" | "assessment" | "revision" | "achievement";
          title: string;
          description: string | null;
          subject: string;
          universe: string;
          difficulty: "easy" | "medium" | "hard";
          estimated_duration_minutes: number;
          completed: boolean;
          started_at: string;
          completed_at: string | null;
          xp_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "lesson" | "quest" | "assessment" | "revision" | "achievement";
          title: string;
          description?: string | null;
          subject: string;
          universe: string;
          difficulty?: "easy" | "medium" | "hard";
          estimated_duration_minutes: number;
          completed?: boolean;
          started_at?: string;
          completed_at?: string;
          xp_earned?: number;
          created_at?: string;
        };
        Update: {
          completed?: boolean;
          completed_at?: string;
          xp_earned?: number;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      subjects_selected: {
        Row: {
          id: string;
          user_id: string;
          subject: string;
          selected_at: string;
          universe: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject: string;
          selected_at?: string;
          universe: string;
        };
        Update: {
          selected_at?: string;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      assessment_results: {
        Row: {
          id: string;
          user_id: string;
          score: number;
          total: number;
          percentage: number;
          subject_accuracies: string; // JSON string
          topic_gaps: string; // JSON string
          taken_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          score: number;
          total: number;
          percentage: number;
          subject_accuracies: string; // JSON string
          topic_gaps: string; // JSON string
          taken_at?: string;
        };
        Update: {
          score?: number;
          total?: number;
          percentage?: number;
          subject_accuracies?: string;
          topic_gaps?: string;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      achievements: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          badge_name: string | null;
          unlocked_at: string;
          universe: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          badge_name?: string | null;
          unlocked_at?: string;
          universe?: string | null;
        };
        Update: {
          unlocked_at?: string;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      user_streaks: {
        Row: {
          user_id: string;
          current_streak: number;
          highest_streak: number;
          last_activity_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          current_streak: number;
          highest_streak: number;
          last_activity_at?: string;
          updated_at?: string;
        };
        Update: {
          current_streak?: number;
          highest_streak?: number;
          last_activity_at?: string;
          updated_at?: string;
        };
        DerivedRelation: {
          relationship: "one-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      institutions: {
        Row: {
          id: string;
          name: string;
          code: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          code?: string | null;
          address?: string | null;
          updated_at?: string;
        };
        DerivedRelation: {
          relationship: "one-to-one";
          key: string;
          onDelete: "cascade";
          foreignTable: "auth.users";
          reference: ["id"];
        };
      };

      institution_memberships: {
        Row: {
          id: string;
          user_id: string;
          institution_id: string;
          role: "principal" | "teacher" | "admin" | "counselor" | "staff";
          joined_at: string;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          institution_id: string;
          role?: "principal" | "teacher" | "admin" | "counselor" | "staff";
          joined_at?: string;
          is_primary?: boolean;
        };
        Update: {
          role?: "principal" | "teacher" | "admin" | "counselor" | "staff";
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
        DerivedRelation2: {
          relationship: "many-to-one";
          key: "institution_id";
          onDelete: "cascade";
          foreignTable: "institutions";
          reference: ["id"];
        };
      };

      applications: {
        Row: {
          id: string;
          institution_id: string;
          applicant_name: string;
          applicant_email: string;
          applicant_phone: string;
          applicant_current_class: number;
          applicant_board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
          applicant_gender: string | null;
          applicant_dob: string | null;
          requested_universe: "junior" | "nexus" | "ascend";
          applied_class: number;
          status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          source: "online" | "offline" | "referral";
          referred_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution_id: string;
          applicant_name: string;
          applicant_email: string;
          applicant_phone?: string;
          applicant_current_class: number;
          applicant_board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
          applicant_gender?: string | null;
          applicant_dob?: string | null;
          requested_universe: "junior" | "nexus" | "ascend";
          applied_class: number;
          status?: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          source?: "online" | "offline" | "referral";
          referred_by?: string | null;
        };
        Update: {
          institution_id?: string;
          applicant_name?: string;
          applicant_email?: string;
          applicant_phone?: string;
          applicant_current_class?: number;
          applicant_board?: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
          applicant_gender?: string | null;
          applicant_dob?: string | null;
          requested_universe?: "junior" | "nexus" | "ascend";
          applied_class?: number;
          status?: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          source?: "online" | "offline" | "referral";
          referred_by?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "institution_id";
          onDelete: "restrict";
          foreignTable: "institutions";
          reference: ["id"];
        };
      };

      application_status_history: {
        Row: {
          id: string;
          application_id: string;
          previous_status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          new_status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          changed_by: string | null;
          changed_at: string;
          reason: string | null;
        };
        Insert: {
          id?: string;
          application_id: string;
          previous_status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          new_status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          changed_by?: string | null;
          changed_at?: string;
          reason?: string | null;
        };
        Update: {
          previous_status?: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
          new_status?: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
      };

      application_assignments: {
        Row: {
          id: string;
          application_id: string;
          user_id: string;
          role: "primary" | "secondary" | "reviewer";
          assigned_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          application_id: string;
          user_id: string;
          role?: "primary" | "secondary" | "reviewer";
          assigned_at?: string;
          completed_at?: string;
        };
        Update: {
          role?: "primary" | "secondary" | "reviewer";
          completed_at?: string;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
        DerivedRelation2: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      application_workflow_stages: {
        Row: {
          id: string;
          application_id: string;
          stage_name: string;
          stage_order: number;
          status: "pending" | "in_progress" | "completed" | "blocked";
          completed_at: string | null;
          completed_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          stage_name: string;
          stage_order?: number;
          status?: "pending" | "in_progress" | "completed" | "blocked";
          completed_at?: string;
          completed_by?: string | null;
          notes?: string | null;
        };
        Update: {
          stage_name?: string;
          stage_order?: number;
          status?: "pending" | "in_progress" | "completed" | "blocked";
          completed_at?: string;
          completed_by?: string | null;
          notes?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
      };

      application_documents: {
        Row: {
          id: string;
          application_id: string;
          file_name: string;
          original_name: string;
          file_type: "pdf" | "image" | "document" | "scanned" | "other";
          file_size_bytes: number;
          storage_path: string;
          mime_type: string | null;
          scanned: boolean;
          verification_status: "pending" | "verified" | "rejected" | "under_review";
          verified_at: string | null;
          verified_by: string | null;
          verification_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          file_name: string;
          original_name: string;
          file_type: "pdf" | "image" | "document" | "scanned" | "other";
          file_size_bytes: number;
          storage_path: string;
          mime_type?: string | null;
          scanned?: boolean;
          verification_status?: "pending" | "verified" | "rejected" | "under_review";
          verified_at?: string | null;
          verified_by?: string | null;
          verification_notes?: string | null;
        };
        Update: {
          file_name?: string;
          original_name?: string;
          file_type?: "pdf" | "image" | "document" | "scanned" | "other";
          file_size_bytes?: number;
          storage_path?: string;
          mime_type?: string | null;
          scanned?: boolean;
          verification_status?: "pending" | "verified" | "rejected" | "under_review";
          verified_at?: string | null;
          verified_by?: string | null;
          verification_notes?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
      };

      document_verification_results: {
        Row: {
          id: string;
          application_id: string;
          document_id: string | null;
          verification_type: "identity" | "document" | "educational" | "financial" | "background";
          is_valid: boolean;
          verification_details: string; // JSON string
          verification_evidence: string; // JSON string
          verified_at: string;
          verified_by: string | null;
          validity_expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          document_id?: string | null;
          verification_type: "identity" | "document" | "educational" | "financial" | "background";
          is_valid?: boolean;
          verification_details: string; // JSON string
          verification_evidence: string; // JSON string
          verified_at?: string | null;
          verified_by?: string | null;
          validity_expires_at?: string | null;
        };
        Update: {
          is_valid?: boolean;
          verification_details?: string;
          verification_evidence?: string;
          validity_expires_at?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
      };

      document_verification_findings: {
        Row: {
          id: string;
          verification_result_id: string;
          finding_type: "missing" | "discrepant" | "forged" | "unclear" | "compliant";
          finding_description: string;
          field_name: string | null;
          resolved: boolean;
          resolved_at: string | null;
          resolved_by: string | null;
          resolution_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          verification_result_id: string;
          finding_type: "missing" | "discrepant" | "forged" | "unclear" | "compliant";
          finding_description: string;
          field_name?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          resolved_by?: string | null;
          resolution_notes?: string | null;
        };
        Update: {
          finding_type?: "missing" | "discrepant" | "forged" | "unclear" | "compliant";
          finding_description?: string;
          field_name?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          resolved_by?: string | null;
          resolution_notes?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "verification_result_id";
          onDelete: "cascade";
          foreignTable: "document_verification_results";
          reference: ["id"];
        };
      };

      regulatory_requirements: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          jurisdiction: "national" | "state" | "local" | "international";
          category: "education" | "data_privacy" | "safety" | "accessibility" | "other";
          compliance_level: "mandatory" | "recommended" | "advisory";
          requires_documentation: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          jurisdiction: "national" | "state" | "local" | "international";
          category: "education" | "data_privacy" | "safety" | "accessibility" | "other";
          compliance_level?: "mandatory" | "recommended" | "advisory";
          requires_documentation?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          jurisdiction?: "national" | "state" | "local" | "international";
          category?: "education" | "data_privacy" | "safety" | "accessibility" | "other";
          compliance_level?: "mandatory" | "recommended" | "advisory";
          requires_documentation?: boolean;
        };
        DerivedRelation: {
          relationship: "one-to-one";
          key: string;
          onDelete: "restrict";
          foreignTable: "auth.users";
          reference: ["id"];
        };
      };

      compliance_assessments: {
        Row: {
          id: string;
          institution_id: string;
          regulatory_requirement_id: string;
          assessment_date: string;
          overall_compliance: boolean;
          compliance_score: number; // 0-100
          findings: string | null;
          assessed_by: string | null;
          status: "pending" | "completed" | "non_compliant" | "under_review";
          next_review_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution_id: string;
          regulatory_requirement_id: string;
          assessment_date: string;
          overall_compliance?: boolean;
          compliance_score?: number; // 0-100
          findings?: string | null;
          assessed_by?: string | null;
          status?: "pending" | "completed" | "non_compliant" | "under_review";
          next_review_date?: string | null;
        };
        Update: {
          overall_compliance?: boolean;
          compliance_score?: number; // 0-100
          findings?: string | null;
          assessed_by?: string | null;
          status?: "pending" | "completed" | "non_compliant" | "under_review";
          next_review_date?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "institution_id";
          onDelete: "cascade";
          foreignTable: "institutions";
          reference: ["id"];
        };
        DerivedRelation2: {
          relationship: "many-to-one";
          key: "regulatory_requirement_id";
          onDelete: "restrict";
          foreignTable: "regulatory_requirements";
          reference: ["id"];
        };
      };

      compliance_findings: {
        Row: {
          id: string;
          compliance_assessment_id: string;
          finding_type: "minor" | "major" | "critical";
          description: string;
          required_action: string | null;
          deadline: string | null;
          resolved: boolean;
          resolved_at: string | null;
          resolved_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          compliance_assessment_id: string;
          finding_type: "minor" | "major" | "critical";
          description: string;
          required_action?: string | null;
          deadline?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          resolved_by?: string | null;
        };
        Update: {
          finding_type?: "minor" | "major" | "critical";
          description?: string;
          required_action?: string | null;
          deadline?: string | null;
          resolved?: boolean;
          resolved_at?: string | null;
          resolved_by?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "compliance_assessment_id";
          onDelete: "cascade";
          foreignTable: "compliance_assessments";
          reference: ["id"];
        };
      };

      regulatory_reference_documents: {
        Row: {
          id: string;
          regulatory_requirement_id: string;
          title: string;
          document_type: "act" | "rule" | "guidance" | "policy" | "template" | "other";
          file_name: string;
          storage_path: string;
          summary: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          regulatory_requirement_id: string;
          title: string;
          document_type?: "act" | "rule" | "guidance" | "policy" | "template" | "other";
          file_name: string;
          storage_path: string;
          summary?: string | null;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          document_type?: "act" | "rule" | "guidance" | "policy" | "template" | "other";
          file_name?: string;
          storage_path?: string;
          summary?: string | null;
          is_active?: boolean;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "regulatory_requirement_id";
          onDelete: "restrict";
          foreignTable: "regulatory_requirements";
          reference: ["id"];
        };
      };

      approval_decisions: {
        Row: {
          id: string;
          application_id: string;
          decision_maker: string;
          decision: "approved" | "rejected" | "conditional_approval";
          decision_date: string;
          conditions_text: string | null;
          rationale: string | null;
          notified_at: string | null;
          notification_method: "email" | "portal" | "post" | "phone" | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          decision_maker: string;
          decision?: "approved" | "rejected" | "conditional_approval";
          conditions_text?: string | null;
          rationale?: string | null;
          notified_at?: string | null;
          notification_method?: "email" | "portal" | "post" | "phone" | null;
        };
        Update: {
          decision?: "approved" | "rejected" | "conditional_approval";
          conditions_text?: string | null;
          rationale?: string | null;
          notified_at?: string | null;
          notification_method?: "email" | "portal" | "post" | "phone" | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
        DerivedRelation2: {
          relationship: "many-to-one";
          key: "decision_maker";
          onDelete: "restrict";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          assignment_type: "application" | "document" | "compliance" | "follow_up" | "notification";
          application_id: string | null;
          institution_id: string | null;
          assigned_to: string;
          assigned_by: string | null;
          status: "pending" | "in_progress" | "completed" | "overdue";
          priority: "low" | "medium" | "high" | "urgent";
          due_date: string | null;
          completed_at: string | null;
          completed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          assignment_type?: "application" | "document" | "compliance" | "follow_up" | "notification";
          application_id?: string | null;
          institution_id?: string | null;
          assigned_to: string;
          assigned_by?: string | null;
          status?: "pending" | "in_progress" | "completed" | "overdue";
          priority?: "low" | "medium" | "high" | "urgent";
          due_date?: string | null;
          completed_at?: string | null;
          completed_by?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          assignment_type?: "application" | "document" | "compliance" | "follow_up" | "notification";
          application_id?: string | null;
          institution_id?: string | null;
          status?: "pending" | "in_progress" | "completed" | "overdue";
          priority?: "low" | "medium" | "high" | "urgent";
          due_date?: string | null;
          completed_at?: string | null;
          completed_by?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "assigned_to";
          onDelete: "restrict";
          foreignTable: "profiles";
          reference: ["id"];
        };
        DerivedRelation2: {
          relationship: "many-to-one";
          key: "assigned_by";
          onDelete: "restrict";
          foreignTable: "profiles";
          reference: ["id"];
        };
        DerivedRelation3: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
        DerivedRelation4: {
          relationship: "many-to-one";
          key: "institution_id";
          onDelete: "restrict";
          foreignTable: "institutions";
          reference: ["id"];
        };
      };

      deadlines: {
        Row: {
          id: string;
          application_id: string;
          task_type: "submission" | "document_upload" | "verification" | "decision" | "payment";
          title: string;
          description: string | null;
          due_date: string;
          is_missed: boolean;
          missed_at: string | null;
          reminded_at: string | null;
          sent_notification: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          task_type?: "submission" | "document_upload" | "verification" | "decision" | "payment";
          title: string;
          description?: string | null;
          due_date: string;
          is_missed?: boolean;
          missed_at?: string | null;
          reminded_at?: string | null;
          sent_notification?: boolean;
        };
        Update: {
          task_type?: "submission" | "document_upload" | "verification" | "decision" | "payment";
          title?: string;
          description?: string | null;
          due_date?: string;
          is_missed?: boolean;
          missed_at?: string | null;
          reminded_at?: string | null;
          sent_notification?: boolean;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "application_id";
          onDelete: "cascade";
          foreignTable: "applications";
          reference: ["id"];
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          notification_type: "application_status" | "document_update" | "compliance" | "deadline" | "system" | "approval";
          related_id: string | null;
          related_type: string | null;
          is_read: boolean;
          action_url: string | null;
          action_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          notification_type?: "application_status" | "document_update" | "compliance" | "deadline" | "system" | "approval";
          related_id?: string | null;
          related_type?: string | null;
          is_read?: boolean;
          action_url?: string | null;
          action_text?: string | null;
        };
        Update: {
          is_read?: boolean;
          action_url?: string | null;
          action_text?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "cascade";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };

      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action:
            | "application_create"
            | "application_update"
            | "application_status_change"
            | "document_upload"
            | "document_verify"
            | "approval_decision"
            | "role_assign"
            | "role_revoke"
            | "login"
            | "logout"
            | "password_reset"
            | "profile_update"
            | "system_cleanup";
          target_type: string | null;
          target_id: string | null;
          previous_value: string; // JSON string
          new_value: string; // JSON string
          ip_inet: string; // PostgreSQL inet type stored as string for type compatibility
          user_agent: string | null;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action:
            | "application_create"
            | "application_update"
            | "application_status_change"
            | "document_upload"
            | "document_verify"
            | "approval_decision"
            | "role_assign"
            | "role_revoke"
            | "login"
            | "logout"
            | "password_reset"
            | "profile_update"
            | "system_cleanup";
          target_type: string | null;
          target_id: string | null;
          previous_value: string; // JSON string
          new_value: string; // JSON string
          ip_inet: string;
          user_agent?: string | null;
          session_id?: string | null;
        };
        Update: {
          previous_value?: string;
          new_value?: string;
          ip_inet?: string;
          user_agent?: string | null;
          session_id?: string | null;
        };
        DerivedRelation: {
          relationship: "many-to-one";
          key: "user_id";
          onDelete: "set null";
          foreignTable: "profiles";
          reference: ["id"];
        };
      };
    };

    Enums: {
      profile_account_role: "pending_teacher" | "teacher" | "admin" | "student";
      profile_account_status: "pending_verification" | "active" | "pending_approval" | "suspended";
      learning_activity_type: "lesson" | "quest" | "assessment" | "revision" | "achievement";
      user_streak_field: "current_streak" | "highest_streak";
      application_source: "online" | "offline" | "referral";
      application_status: "pending" | "under_review" | "approved" | "rejected" | "withdrawn";
      task_assignment_type: "application" | "document" | "compliance" | "follow_up" | "notification";
      task_status: "pending" | "in_progress" | "completed" | "overdue";
      task_priority: "low" | "medium" | "high" | "urgent";
      verification_type: "identity" | "document" | "educational" | "financial" | "background";
      finding_type: "missing" | "discrepant" | "forged" | "unclear" | "compliant";
      compliance_finding_type: "minor" | "major" | "critical";
      document_file_type: "pdf" | "image" | "document" | "scanned" | "other";
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};