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
      Businesses: {
        Row: {
          address: string | null
          created_at: string
          email: string
          id: string
          invites_sent: number
          name: string
          redeem_qty: number
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          id?: string
          invites_sent?: number
          name: string
          redeem_qty?: number
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          id?: string
          invites_sent?: number
          name?: string
          redeem_qty?: number
        }
        Relationships: []
      }
      Customers: {
        Row: {
          business_id: string
          created_at: string
          full_name: string
          id: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Employees: {
        Row: {
          business_id: string
          created_at: string
          email: string | null
          empNumber: string
          full_name: string
          id: number
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          email?: string | null
          empNumber: string
          full_name: string
          id?: number
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          email?: string | null
          empNumber?: string
          full_name?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Employees_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Invites: {
        Row: {
          accepted_at: string | null
          business_id: string
          customer_id: string
          id: number
          invite_code: string
          sent_at: string
        }
        Insert: {
          accepted_at?: string | null
          business_id: string
          customer_id: string
          id?: number
          invite_code: string
          sent_at?: string
        }
        Update: {
          accepted_at?: string | null
          business_id?: string
          customer_id?: string
          id?: number
          invite_code?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Invites_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Invites_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
        ]
      }
      Rewards: {
        Row: {
          business_id: string
          created_at: string
          customer_id: string
          id: string
          points: number
          redeems: number
        }
        Insert: {
          business_id: string
          created_at?: string
          customer_id: string
          id?: string
          points?: number
          redeems?: number
        }
        Update: {
          business_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          points?: number
          redeems?: number
        }
        Relationships: [
          {
            foreignKeyName: "Rewards_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Rewards_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          auth_id: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          auth_id: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Users_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
