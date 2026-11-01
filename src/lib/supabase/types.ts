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
        };
        Insert: {
          id: string;
          full_name: string | null;
          requested_role: string | null;
          account_role?: string;
          account_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          requested_role?: string | null;
          account_role?: string;
          account_status?: string;
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
      // Other tables can be added here
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};