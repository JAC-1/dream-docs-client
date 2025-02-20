export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          status: string
          title: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title?: string
          year?: number
        }
        Relationships: []
      }
      downloads_cache: {
        Row: {
          document_id: string
          downloaded_at: string
          id: string
        }
        Insert: {
          document_id: string
          downloaded_at?: string
          id?: string
        }
        Update: {
          document_id?: string
          downloaded_at?: string
          id?: string
        }
        Relationships: []
      }
      file_cache: {
        Row: {
          created_at: string
          document_id: string
          file_name: string
          file_size: number
          id: string
          mime_type: string
          processing_attempts: number | null
          status: string
          status_message: string | null
          task_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id?: string
          file_name: string
          file_size: number
          id?: string
          mime_type: string
          processing_attempts?: number | null
          status?: string
          status_message?: string | null
          task_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          file_name?: string
          file_size?: number
          id?: string
          mime_type?: string
          processing_attempts?: number | null
          status?: string
          status_message?: string | null
          task_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_cache_table_user_id_students_table_display_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["display_id"]
          },
        ]
      }
      file_keys: {
        Row: {
          created_at: string
          document_id: string
          encrypted_key: string
          expires_at: string | null
          id: string
          last_accessed_at: string | null
          revoked_at: string | null
          rotated_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          document_id: string
          encrypted_key: string
          expires_at?: string | null
          id?: string
          last_accessed_at?: string | null
          revoked_at?: string | null
          rotated_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          document_id?: string
          encrypted_key?: string
          expires_at?: string | null
          id?: string
          last_accessed_at?: string | null
          revoked_at?: string | null
          rotated_at?: string | null
          status?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          duration: string
          end_date: string
          id: string
          location: string
          name: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration: string
          end_date: string
          id?: string
          location: string
          name: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: string
          end_date?: string
          id?: string
          location?: string
          name?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          class: string
          created_at: string
          display_id: string
          display_name: string
          id: string
          last_login_at: string | null
          login_count: number | null
          program: string
          status: string
          updated_at: number | null
        }
        Insert: {
          class: string
          created_at?: string
          display_id: string
          display_name: string
          id?: string
          last_login_at?: string | null
          login_count?: number | null
          program: string
          status?: string
          updated_at?: number | null
        }
        Update: {
          class?: string
          created_at?: string
          display_id?: string
          display_name?: string
          id?: string
          last_login_at?: string | null
          login_count?: number | null
          program?: string
          status?: string
          updated_at?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_table_class_classes_table_id_fk"
            columns: ["class"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_table_program_programs_table_id_fk"
            columns: ["program"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_document_with_keys: {
        Args: {
          document_id: string
          file_name: string
          mime_type: string
          file_size: number
          user_id: string
          created_at: string
          key_id: string
          encrypted_key: string
        }
        Returns: {
          inserted_document_id: string
          inserted_key_id: string
        }[]
      }
      insert_program_with_classes_and_students: {
        Args: {
          program_data: Json
          classes_data: Json
          students_data: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
