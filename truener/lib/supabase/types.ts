export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          nickname: string;
          gender: "male" | "female";
          birth_date: string;
          area: string;
          bio: string | null;
          is_age_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          nickname: string;
          gender: "male" | "female";
          birth_date: string;
          area: string;
          bio?: string | null;
          is_age_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          nickname?: string;
          gender?: "male" | "female";
          birth_date?: string;
          area?: string;
          bio?: string | null;
          is_age_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

export type SupabaseUser = Database["public"]["Tables"]["users"]["Row"];
