export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcement_dismissals: {
        Row: {
          announcement_id: string
          dismissed_at: string
          user_id: string
        }
        Insert: {
          announcement_id: string
          dismissed_at?: string
          user_id: string
        }
        Update: {
          announcement_id?: string
          dismissed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcement_dismissals_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcement_dismissals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          audience: Database["public"]["Enums"]["announcement_audience"]
          audience_shop_ids: string[]
          body: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          link_label: string | null
          link_url: string | null
          published_at: string | null
          severity: Database["public"]["Enums"]["announcement_severity"]
          status: Database["public"]["Enums"]["announcement_status"]
          title: string
          updated_at: string
        }
        Insert: {
          audience?: Database["public"]["Enums"]["announcement_audience"]
          audience_shop_ids?: string[]
          body: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          link_label?: string | null
          link_url?: string | null
          published_at?: string | null
          severity?: Database["public"]["Enums"]["announcement_severity"]
          status?: Database["public"]["Enums"]["announcement_status"]
          title: string
          updated_at?: string
        }
        Update: {
          audience?: Database["public"]["Enums"]["announcement_audience"]
          audience_shop_ids?: string[]
          body?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          link_label?: string | null
          link_url?: string | null
          published_at?: string | null
          severity?: Database["public"]["Enums"]["announcement_severity"]
          status?: Database["public"]["Enums"]["announcement_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          barber_id: string | null
          barbershop_id: string
          client_id: string
          created_at: string
          created_by: string | null
          duration_minutes: number
          id: string
          notes: string | null
          price_cents: number
          scheduled_at: string
          service_id: string
          source: string
          status: Database["public"]["Enums"]["appointment_status"]
          updated_at: string
        }
        Insert: {
          barber_id?: string | null
          barbershop_id: string
          client_id: string
          created_at?: string
          created_by?: string | null
          duration_minutes: number
          id?: string
          notes?: string | null
          price_cents?: number
          scheduled_at: string
          service_id: string
          source?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Update: {
          barber_id?: string | null
          barbershop_id?: string
          client_id?: string
          created_at?: string
          created_by?: string | null
          duration_minutes?: number
          id?: string
          notes?: string | null
          price_cents?: number
          scheduled_at?: string
          service_id?: string
          source?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          barbershop_id: string | null
          created_at: string
          id: number
          ip: unknown
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          barbershop_id?: string | null
          created_at?: string
          id?: number
          ip?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          barbershop_id?: string | null
          created_at?: string
          id?: number
          ip?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_products: {
        Row: {
          barber_id: string
          barbershop_id: string
          commission_percent: number
          created_at: string
          id: string
          is_active: boolean
          product_id: string
          updated_at: string
        }
        Insert: {
          barber_id: string
          barbershop_id: string
          commission_percent?: number
          created_at?: string
          id?: string
          is_active?: boolean
          product_id: string
          updated_at?: string
        }
        Update: {
          barber_id?: string
          barbershop_id?: string
          commission_percent?: number
          created_at?: string
          id?: string
          is_active?: boolean
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "barber_products_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_services: {
        Row: {
          barber_id: string
          barbershop_id: string
          commission_percent: number | null
          created_at: string
          duration_minutes: number | null
          id: string
          is_active: boolean
          price_cents: number | null
          service_id: string
          updated_at: string
        }
        Insert: {
          barber_id: string
          barbershop_id: string
          commission_percent?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_active?: boolean
          price_cents?: number | null
          service_id: string
          updated_at?: string
        }
        Update: {
          barber_id?: string
          barbershop_id?: string
          commission_percent?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_active?: boolean
          price_cents?: number | null
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "barber_services_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_services_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_time_off: {
        Row: {
          barber_id: string
          barbershop_id: string
          created_at: string
          created_by: string | null
          ends_at: string
          id: string
          reason: string | null
          starts_at: string
        }
        Insert: {
          barber_id: string
          barbershop_id: string
          created_at?: string
          created_by?: string | null
          ends_at: string
          id?: string
          reason?: string | null
          starts_at: string
        }
        Update: {
          barber_id?: string
          barbershop_id?: string
          created_at?: string
          created_by?: string | null
          ends_at?: string
          id?: string
          reason?: string | null
          starts_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "barber_time_off_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_time_off_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_time_off_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_working_hours: {
        Row: {
          barber_id: string
          barbershop_id: string
          break_ends_at: string | null
          break_starts_at: string | null
          closes_at: string | null
          created_at: string
          id: string
          is_closed: boolean
          opens_at: string | null
          updated_at: string
          weekday: number
        }
        Insert: {
          barber_id: string
          barbershop_id: string
          break_ends_at?: string | null
          break_starts_at?: string | null
          closes_at?: string | null
          created_at?: string
          id?: string
          is_closed?: boolean
          opens_at?: string | null
          updated_at?: string
          weekday: number
        }
        Update: {
          barber_id?: string
          barbershop_id?: string
          break_ends_at?: string | null
          break_starts_at?: string | null
          closes_at?: string | null
          created_at?: string
          id?: string
          is_closed?: boolean
          opens_at?: string | null
          updated_at?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "barber_working_hours_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_working_hours_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      barbershop_members: {
        Row: {
          barbershop_id: string
          created_at: string
          is_active: boolean
          is_commissioned: boolean
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          barbershop_id: string
          created_at?: string
          is_active?: boolean
          is_commissioned?: boolean
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          barbershop_id?: string
          created_at?: string
          is_active?: boolean
          is_commissioned?: boolean
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "barbershop_members_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barbershop_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      barbershops: {
        Row: {
          address: Json | null
          cnpj: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          plan_id: string | null
          primary_color: string | null
          public_booking_enabled: boolean
          slug: string
          status: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          plan_id?: string | null
          primary_color?: string | null
          public_booking_enabled?: boolean
          slug: string
          status?: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          plan_id?: string | null
          primary_color?: string | null
          public_booking_enabled?: boolean
          slug?: string
          status?: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      business_hours: {
        Row: {
          barbershop_id: string
          break_ends_at: string | null
          break_starts_at: string | null
          closes_at: string | null
          is_closed: boolean
          opens_at: string | null
          weekday: number
        }
        Insert: {
          barbershop_id: string
          break_ends_at?: string | null
          break_starts_at?: string | null
          closes_at?: string | null
          is_closed?: boolean
          opens_at?: string | null
          weekday: number
        }
        Update: {
          barbershop_id?: string
          break_ends_at?: string | null
          break_starts_at?: string | null
          closes_at?: string | null
          is_closed?: boolean
          opens_at?: string | null
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_hours_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_movements: {
        Row: {
          amount_cents: number
          barbershop_id: string
          cash_session_id: string
          created_at: string
          created_by: string | null
          description: string | null
          expense_id: string | null
          id: string
          reason: string
          receivable_id: string | null
          type: string
        }
        Insert: {
          amount_cents: number
          barbershop_id: string
          cash_session_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_id?: string | null
          id?: string
          reason: string
          receivable_id?: string | null
          type: string
        }
        Update: {
          amount_cents?: number
          barbershop_id?: string
          cash_session_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_id?: string | null
          id?: string
          reason?: string
          receivable_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_movements_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_receivable_id_fkey"
            columns: ["receivable_id"]
            isOneToOne: false
            referencedRelation: "receivables"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_sessions: {
        Row: {
          barbershop_id: string
          closed_at: string | null
          closed_by: string | null
          closing_amount_cents: number | null
          created_at: string
          difference_cents: number | null
          expected_amount_cents: number | null
          id: string
          notes: string | null
          opened_at: string
          opened_by: string
          opening_amount_cents: number
          status: Database["public"]["Enums"]["cash_session_status"]
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          closed_at?: string | null
          closed_by?: string | null
          closing_amount_cents?: number | null
          created_at?: string
          difference_cents?: number | null
          expected_amount_cents?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          opened_by: string
          opening_amount_cents?: number
          status?: Database["public"]["Enums"]["cash_session_status"]
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          closed_at?: string | null
          closed_by?: string | null
          closing_amount_cents?: number | null
          created_at?: string
          difference_cents?: number | null
          expected_amount_cents?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          opened_by?: string
          opening_amount_cents?: number
          status?: Database["public"]["Enums"]["cash_session_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_sessions_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_sessions_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_sessions_opened_by_fkey"
            columns: ["opened_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          accepts_whatsapp: boolean
          barbershop_id: string
          birth_date: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
          whatsapp_optout_at: string | null
        }
        Insert: {
          accepts_whatsapp?: boolean
          barbershop_id: string
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp_optout_at?: string | null
        }
        Update: {
          accepts_whatsapp?: boolean
          barbershop_id?: string
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp_optout_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_payouts: {
        Row: {
          barber_id: string
          barbershop_id: string
          created_at: string
          created_by: string | null
          id: string
          method: string
          notes: string | null
          paid_at: string
          period_end: string
          period_start: string
          total_cents: number
        }
        Insert: {
          barber_id: string
          barbershop_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          method: string
          notes?: string | null
          paid_at?: string
          period_end: string
          period_start: string
          total_cents: number
        }
        Update: {
          barber_id?: string
          barbershop_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          method?: string
          notes?: string | null
          paid_at?: string
          period_end?: string
          period_start?: string
          total_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "commission_payouts_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          barbershop_id: string
          color: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          color?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          color?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_categories_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount_cents: number
          barbershop_id: string
          cash_session_id: string | null
          category_id: string | null
          created_at: string
          created_by: string | null
          description: string
          due_date: string
          id: string
          notes: string | null
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          barbershop_id: string
          cash_session_id?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          due_date: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          barbershop_id?: string
          cash_session_id?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          due_date?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_cents: number
          asaas_payment_id: string | null
          barbershop_id: string
          created_at: string
          due_date: string
          id: string
          invoice_url: string | null
          paid_at: string | null
          payment_method: string | null
          pix_qrcode_image: string | null
          pix_qrcode_payload: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subscription_id: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          asaas_payment_id?: string | null
          barbershop_id: string
          created_at?: string
          due_date: string
          id?: string
          invoice_url?: string | null
          paid_at?: string | null
          payment_method?: string | null
          pix_qrcode_image?: string | null
          pix_qrcode_payload?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subscription_id: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          asaas_payment_id?: string | null
          barbershop_id?: string
          created_at?: string
          due_date?: string
          id?: string
          invoice_url?: string | null
          paid_at?: string | null
          payment_method?: string | null
          pix_qrcode_image?: string | null
          pix_qrcode_payload?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_punch_card_services: {
        Row: {
          barbershop_id: string
          service_id: string
        }
        Insert: {
          barbershop_id: string
          service_id: string
        }
        Update: {
          barbershop_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_punch_card_services_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_punch_card_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_punch_cards: {
        Row: {
          barbershop_id: string
          client_id: string
          completed_at: string | null
          created_at: string
          current_count: number
          expires_at: string | null
          id: string
          required: number
          started_at: string
          status: Database["public"]["Enums"]["loyalty_punch_status"]
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          client_id: string
          completed_at?: string | null
          created_at?: string
          current_count?: number
          expires_at?: string | null
          id?: string
          required: number
          started_at?: string
          status?: Database["public"]["Enums"]["loyalty_punch_status"]
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          client_id?: string
          completed_at?: string | null
          created_at?: string
          current_count?: number
          expires_at?: string | null
          id?: string
          required?: number
          started_at?: string
          status?: Database["public"]["Enums"]["loyalty_punch_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_punch_cards_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_punch_cards_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_redemptions: {
        Row: {
          barbershop_id: string
          client_id: string
          code: string
          created_at: string
          created_by: string | null
          id: string
          points_used: number
          product_id: string | null
          punch_card_id: string | null
          reward_id: string | null
          reward_name: string
          reward_type: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value: number | null
          sale_id: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["loyalty_redemption_status"]
          updated_at: string
          used_at: string | null
        }
        Insert: {
          barbershop_id: string
          client_id: string
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          points_used?: number
          product_id?: string | null
          punch_card_id?: string | null
          reward_id?: string | null
          reward_name: string
          reward_type: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value?: number | null
          sale_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["loyalty_redemption_status"]
          updated_at?: string
          used_at?: string | null
        }
        Update: {
          barbershop_id?: string
          client_id?: string
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          points_used?: number
          product_id?: string | null
          punch_card_id?: string | null
          reward_id?: string | null
          reward_name?: string
          reward_type?: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value?: number | null
          sale_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["loyalty_redemption_status"]
          updated_at?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_redemptions_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_punch_card_id_fkey"
            columns: ["punch_card_id"]
            isOneToOne: false
            referencedRelation: "loyalty_punch_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "loyalty_rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_rewards: {
        Row: {
          barbershop_id: string
          cost_points: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          product_id: string | null
          reward_type: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value: number | null
          service_id: string | null
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          cost_points: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          product_id?: string | null
          reward_type: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value?: number | null
          service_id?: string | null
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          cost_points?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          product_id?: string | null
          reward_type?: Database["public"]["Enums"]["loyalty_reward_type"]
          reward_value?: number | null
          service_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_rewards_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_rewards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_rewards_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_settings: {
        Row: {
          barbershop_id: string
          birthday_bonus_points: number
          created_at: string
          expire_after_days: number | null
          is_active: boolean
          min_redemption_points: number
          points_per_real: number
          punch_card_active: boolean
          punch_card_expire_days: number | null
          punch_card_required: number
          punch_card_reward_service_id: string | null
          updated_at: string
          welcome_bonus_points: number
        }
        Insert: {
          barbershop_id: string
          birthday_bonus_points?: number
          created_at?: string
          expire_after_days?: number | null
          is_active?: boolean
          min_redemption_points?: number
          points_per_real?: number
          punch_card_active?: boolean
          punch_card_expire_days?: number | null
          punch_card_required?: number
          punch_card_reward_service_id?: string | null
          updated_at?: string
          welcome_bonus_points?: number
        }
        Update: {
          barbershop_id?: string
          birthday_bonus_points?: number
          created_at?: string
          expire_after_days?: number | null
          is_active?: boolean
          min_redemption_points?: number
          points_per_real?: number
          punch_card_active?: boolean
          punch_card_expire_days?: number | null
          punch_card_required?: number
          punch_card_reward_service_id?: string | null
          updated_at?: string
          welcome_bonus_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_settings_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: true
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_settings_punch_card_reward_service_id_fkey"
            columns: ["punch_card_reward_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_transactions: {
        Row: {
          barbershop_id: string
          client_id: string
          created_at: string
          created_by: string | null
          description: string | null
          expires_at: string | null
          id: string
          points: number
          redemption_id: string | null
          sale_id: string | null
          type: Database["public"]["Enums"]["loyalty_tx_type"]
        }
        Insert: {
          barbershop_id: string
          client_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          points: number
          redemption_id?: string | null
          sale_id?: string | null
          type: Database["public"]["Enums"]["loyalty_tx_type"]
        }
        Update: {
          barbershop_id?: string
          client_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          points?: number
          redemption_id?: string | null
          sale_id?: string | null
          type?: Database["public"]["Enums"]["loyalty_tx_type"]
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_transactions_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_tx_redemption_fk"
            columns: ["redemption_id"]
            isOneToOne: false
            referencedRelation: "loyalty_redemptions"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_gateway_settings: {
        Row: {
          asaas_account_email: string | null
          asaas_account_name: string | null
          asaas_api_key: string | null
          environment: Database["public"]["Enums"]["payment_gateway_environment"]
          id: number
          last_validated_at: string | null
          provider: Database["public"]["Enums"]["payment_gateway_provider"]
          updated_at: string
          updated_by: string | null
          webhook_id: string | null
          webhook_registered_at: string | null
          webhook_token: string | null
        }
        Insert: {
          asaas_account_email?: string | null
          asaas_account_name?: string | null
          asaas_api_key?: string | null
          environment?: Database["public"]["Enums"]["payment_gateway_environment"]
          id?: number
          last_validated_at?: string | null
          provider?: Database["public"]["Enums"]["payment_gateway_provider"]
          updated_at?: string
          updated_by?: string | null
          webhook_id?: string | null
          webhook_registered_at?: string | null
          webhook_token?: string | null
        }
        Update: {
          asaas_account_email?: string | null
          asaas_account_name?: string | null
          asaas_api_key?: string | null
          environment?: Database["public"]["Enums"]["payment_gateway_environment"]
          id?: number
          last_validated_at?: string | null
          provider?: Database["public"]["Enums"]["payment_gateway_provider"]
          updated_at?: string
          updated_by?: string | null
          webhook_id?: string | null
          webhook_registered_at?: string | null
          webhook_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_gateway_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          billing_cycle: Database["public"]["Enums"]["plan_billing_cycle"]
          created_at: string
          description: string | null
          features: Json
          id: string
          is_active: boolean
          max_barbers: number | null
          max_whatsapp_messages_per_month: number | null
          name: string
          price_cents: number
          slug: string
          sort_order: number
          trial_days: number
          updated_at: string
        }
        Insert: {
          billing_cycle?: Database["public"]["Enums"]["plan_billing_cycle"]
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          max_barbers?: number | null
          max_whatsapp_messages_per_month?: number | null
          name: string
          price_cents: number
          slug: string
          sort_order?: number
          trial_days?: number
          updated_at?: string
        }
        Update: {
          billing_cycle?: Database["public"]["Enums"]["plan_billing_cycle"]
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          max_barbers?: number | null
          max_whatsapp_messages_per_month?: number | null
          name?: string
          price_cents?: number
          slug?: string
          sort_order?: number
          trial_days?: number
          updated_at?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          app_url: string | null
          brand_name: string
          default_primary_color: string | null
          default_trial_days: number
          dunning_days_to_suspend: number
          id: number
          maintenance_message: string | null
          maintenance_mode: boolean
          support_email: string | null
          support_whatsapp: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          app_url?: string | null
          brand_name?: string
          default_primary_color?: string | null
          default_trial_days?: number
          dunning_days_to_suspend?: number
          id?: number
          maintenance_message?: string | null
          maintenance_mode?: boolean
          support_email?: string | null
          support_whatsapp?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          app_url?: string | null
          brand_name?: string
          default_primary_color?: string | null
          default_trial_days?: number
          dunning_days_to_suspend?: number
          id?: number
          maintenance_message?: string | null
          maintenance_mode?: boolean
          support_email?: string | null
          support_whatsapp?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barbershop_id: string
          commission_percent: number
          cost_cents: number
          created_at: string
          id: string
          is_active: boolean
          name: string
          price_cents: number
          sku: string | null
          stock_min: number
          stock_qty: number
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          commission_percent?: number
          cost_cents?: number
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          price_cents: number
          sku?: string | null
          stock_min?: number
          stock_qty?: number
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          commission_percent?: number
          cost_cents?: number
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          price_cents?: number
          sku?: string | null
          stock_min?: number
          stock_qty?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cpf: string | null
          created_at: string
          full_name: string | null
          id: string
          is_super_admin: boolean
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_super_admin?: boolean
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_super_admin?: boolean
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      receivables: {
        Row: {
          amount_cents: number
          barbershop_id: string
          cash_session_id: string | null
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string
          due_date: string
          id: string
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          received_at: string | null
          sale_id: string | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          barbershop_id: string
          cash_session_id?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          due_date: string
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          received_at?: string | null
          sale_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          barbershop_id?: string
          cash_session_id?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          due_date?: string
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          received_at?: string | null
          sale_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "receivables_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          appointment_id: string | null
          barber_id: string | null
          barbershop_id: string
          client_id: string | null
          comment: string | null
          created_at: string
          id: string
          is_hidden: boolean
          manager_response: string | null
          rating: number
          responded_at: string | null
          responded_by: string | null
          source: string
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          barber_id?: string | null
          barbershop_id: string
          client_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_hidden?: boolean
          manager_response?: string | null
          rating: number
          responded_at?: string | null
          responded_by?: string | null
          source?: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          barber_id?: string | null
          barbershop_id?: string
          client_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_hidden?: boolean
          manager_response?: string | null
          rating?: number
          responded_at?: string | null
          responded_by?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          created_at: string
          description: string
          id: string
          product_id: string | null
          quantity: number
          sale_id: string
          service_id: string | null
          total_cents: number
          unit_cents: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          product_id?: string | null
          quantity?: number
          sale_id: string
          service_id?: string | null
          total_cents: number
          unit_cents: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          product_id?: string | null
          quantity?: number
          sale_id?: string
          service_id?: string | null
          total_cents?: number
          unit_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_payments: {
        Row: {
          amount_cents: number
          created_at: string
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          paid_by_name: string | null
          received_at: string
          sale_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          id?: string
          method: Database["public"]["Enums"]["payment_method"]
          paid_by_name?: string | null
          received_at?: string
          sale_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          paid_by_name?: string | null
          received_at?: string
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_payments_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          appointment_id: string | null
          barber_id: string | null
          barbershop_id: string
          cash_session_id: string | null
          client_id: string | null
          created_at: string
          created_by: string | null
          discount_cents: number
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["sale_status"]
          subtotal_cents: number
          total_cents: number
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          barber_id?: string | null
          barbershop_id: string
          cash_session_id?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          discount_cents?: number
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["sale_status"]
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          barber_id?: string | null
          barbershop_id?: string
          cash_session_id?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          discount_cents?: number
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["sale_status"]
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          barbershop_id: string
          commission_percent: number
          created_at: string
          duration_minutes: number
          id: string
          is_active: boolean
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          commission_percent?: number
          created_at?: string
          duration_minutes: number
          id?: string
          is_active?: boolean
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          commission_percent?: number
          created_at?: string
          duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          asaas_customer_id: string | null
          asaas_subscription_id: string | null
          barbershop_id: string
          cancel_reason: string | null
          cancelled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          barbershop_id: string
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          barbershop_id?: string
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_messages: {
        Row: {
          appointment_id: string | null
          attempts: number
          barbershop_id: string
          body: string
          client_id: string | null
          created_at: string
          created_by: string | null
          delivered_at: string | null
          error: string | null
          failed_at: string | null
          id: string
          provider_message_id: string | null
          read_at: string | null
          scheduled_for: string
          sent_at: string | null
          status: Database["public"]["Enums"]["whatsapp_message_status"]
          template_slug: string | null
          to_phone: string
          trigger: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          attempts?: number
          barbershop_id: string
          body: string
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          error?: string | null
          failed_at?: string | null
          id?: string
          provider_message_id?: string | null
          read_at?: string | null
          scheduled_for?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["whatsapp_message_status"]
          template_slug?: string | null
          to_phone: string
          trigger?: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          attempts?: number
          barbershop_id?: string
          body?: string
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          delivered_at?: string | null
          error?: string | null
          failed_at?: string | null
          id?: string
          provider_message_id?: string | null
          read_at?: string | null
          scheduled_for?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["whatsapp_message_status"]
          template_slug?: string | null
          to_phone?: string
          trigger?: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_settings: {
        Row: {
          barbershop_id: string
          business_hours_end: string
          business_hours_only: boolean
          business_hours_start: string
          connection_status: Database["public"]["Enums"]["whatsapp_connection_status"]
          created_at: string
          evolution_instance_name: string | null
          evolution_instance_token: string | null
          last_connected_at: string | null
          last_disconnected_at: string | null
          last_qr: string | null
          last_qr_at: string | null
          phone_number: string | null
          trigger_birthday: boolean
          trigger_birthday_hour: number
          trigger_confirmation: boolean
          trigger_post_service: boolean
          trigger_post_service_delay_hours: number
          trigger_reminder: boolean
          trigger_reminder_hours_before: number
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          business_hours_end?: string
          business_hours_only?: boolean
          business_hours_start?: string
          connection_status?: Database["public"]["Enums"]["whatsapp_connection_status"]
          created_at?: string
          evolution_instance_name?: string | null
          evolution_instance_token?: string | null
          last_connected_at?: string | null
          last_disconnected_at?: string | null
          last_qr?: string | null
          last_qr_at?: string | null
          phone_number?: string | null
          trigger_birthday?: boolean
          trigger_birthday_hour?: number
          trigger_confirmation?: boolean
          trigger_post_service?: boolean
          trigger_post_service_delay_hours?: number
          trigger_reminder?: boolean
          trigger_reminder_hours_before?: number
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          business_hours_end?: string
          business_hours_only?: boolean
          business_hours_start?: string
          connection_status?: Database["public"]["Enums"]["whatsapp_connection_status"]
          created_at?: string
          evolution_instance_name?: string | null
          evolution_instance_token?: string | null
          last_connected_at?: string | null
          last_disconnected_at?: string | null
          last_qr?: string | null
          last_qr_at?: string | null
          phone_number?: string | null
          trigger_birthday?: boolean
          trigger_birthday_hour?: number
          trigger_confirmation?: boolean
          trigger_post_service?: boolean
          trigger_post_service_delay_hours?: number
          trigger_reminder?: boolean
          trigger_reminder_hours_before?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_settings_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: true
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_templates: {
        Row: {
          barbershop_id: string
          body: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          trigger: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at: string
        }
        Insert: {
          barbershop_id: string
          body: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          trigger: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at?: string
        }
        Update: {
          barbershop_id?: string
          body?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          trigger?: Database["public"]["Enums"]["whatsapp_trigger"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_templates_barbershop_id_fkey"
            columns: ["barbershop_id"]
            isOneToOne: false
            referencedRelation: "barbershops"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_member_by_email: {
        Args: {
          _barbershop: string
          _email: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: string
      }
      create_staff_user: {
        Args: {
          _barbershop: string
          _email: string
          _full_name: string
          _password: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: string
      }
      fn_active_announcements_for_user: {
        Args: never
        Returns: {
          body: string
          id: string
          link_label: string
          link_url: string
          published_at: string
          severity: Database["public"]["Enums"]["announcement_severity"]
          title: string
        }[]
      }
      fn_award_birthday_bonus: { Args: { p_shop: string }; Returns: number }
      fn_award_points_for_sale: { Args: { p_sale: string }; Returns: undefined }
      fn_barbers_for_service: {
        Args: { p_barbershop: string; p_service: string }
        Returns: {
          barber_id: string
        }[]
      }
      fn_cancel_redemption: {
        Args: { p_redemption: string }
        Returns: undefined
      }
      fn_cash_session_expected: { Args: { p_session: string }; Returns: number }
      fn_commission_summary: {
        Args: {
          p_barber_id: string
          p_barbershop_id: string
          p_from: string
          p_to: string
        }
        Returns: {
          commission_cents: number
          commission_percent: number
          description: string
          item_id: string
          kind: string
          quantity: number
          ref_id: string
          sale_created_at: string
          sale_id: string
          total_cents: number
          unit_cents: number
        }[]
      }
      fn_create_public_review: {
        Args: {
          p_appointment_id: string
          p_comment: string
          p_rating: number
          p_slug: string
        }
        Returns: string
      }
      fn_create_sale: {
        Args: {
          _appointment: string
          _barber: string
          _barbershop: string
          _client: string
          _discount_cents: number
          _items: Json
          _notes: string
          _payments: Json
        }
        Returns: string
      }
      fn_expire_old_points: { Args: { p_shop: string }; Returns: number }
      fn_financial_daily: {
        Args: { p_from: string; p_shop: string; p_to: string }
        Returns: {
          day: string
          expenses_cents: number
          revenue_cents: number
        }[]
      }
      fn_financial_summary: {
        Args: { p_from: string; p_shop: string; p_to: string }
        Returns: Json
      }
      fn_log_audit: {
        Args: {
          p_action: string
          p_barbershop?: string
          p_metadata?: Json
          p_resource_id?: string
          p_resource_type?: string
        }
        Returns: number
      }
      fn_loyalty_balance: { Args: { p_client: string }; Returns: number }
      fn_loyalty_gen_code: { Args: never; Returns: string }
      fn_public_available_slots: {
        Args: {
          p_barber_id: string
          p_date: string
          p_service_id: string
          p_slug: string
        }
        Returns: string[]
      }
      fn_public_booking_data: { Args: { p_slug: string }; Returns: Json }
      fn_public_create_appointment: {
        Args: {
          p_barber_id: string
          p_client_name: string
          p_client_phone: string
          p_notes?: string
          p_scheduled_at: string
          p_service_id: string
          p_slug: string
        }
        Returns: Json
      }
      fn_redeem_reward: {
        Args: { p_client: string; p_reward: string }
        Returns: string
      }
      fn_review_summary: {
        Args: {
          p_barber?: string
          p_barbershop: string
          p_from?: string
          p_to?: string
        }
        Returns: {
          avg_rating: number
          star_1: number
          star_2: number
          star_3: number
          star_4: number
          star_5: number
          total_count: number
        }[]
      }
      fn_run_dunning: {
        Args: never
        Returns: {
          suspended_count: number
          suspended_subscription_ids: string[]
        }[]
      }
      fn_seed_expense_categories: {
        Args: { p_shop: string }
        Returns: undefined
      }
      fn_update_member_profile: {
        Args: {
          _avatar_url: string
          _full_name: string
          _phone: string
          _user_id: string
        }
        Returns: undefined
      }
      fn_wa_enqueue: {
        Args: {
          _appointment_id: string
          _barbershop_id: string
          _client_id: string
          _scheduled_for?: string
          _template_slug: string
          _trigger: Database["public"]["Enums"]["whatsapp_trigger"]
          _vars: Json
        }
        Returns: string
      }
      fn_wa_render: { Args: { _body: string; _vars: Json }; Returns: string }
      fn_wa_seed_templates: {
        Args: { _barbershop_id: string }
        Returns: undefined
      }
      has_role_in: {
        Args: {
          _barbershop: string
          _roles: Database["public"]["Enums"]["app_role"][]
        }
        Returns: boolean
      }
      is_super_admin: { Args: never; Returns: boolean }
      user_barbershop_ids: { Args: never; Returns: string[] }
    }
    Enums: {
      announcement_audience: "all" | "selected"
      announcement_severity: "info" | "success" | "warning" | "critical"
      announcement_status: "draft" | "published" | "archived"
      app_role: "super_admin" | "gestor" | "recepcionista" | "barbeiro"
      appointment_status:
        | "scheduled"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no_show"
      cash_session_status: "open" | "closed"
      invoice_status: "pending" | "paid" | "overdue" | "refunded" | "cancelled"
      loyalty_punch_status: "active" | "completed" | "expired"
      loyalty_redemption_status: "pending" | "used" | "cancelled"
      loyalty_reward_type:
        | "discount_amount"
        | "discount_percent"
        | "free_service"
        | "free_product"
      loyalty_tx_type:
        | "earn"
        | "redeem"
        | "adjust"
        | "expire"
        | "welcome"
        | "birthday"
      payment_gateway_environment: "sandbox" | "production"
      payment_gateway_provider: "asaas"
      payment_method: "cash" | "pix" | "debit" | "credit" | "voucher" | "other"
      plan_billing_cycle: "monthly" | "quarterly" | "yearly"
      sale_status: "open" | "paid" | "cancelled"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "suspended"
        | "cancelled"
      tenant_status: "trial" | "active" | "suspended" | "cancelled"
      whatsapp_connection_status:
        | "disconnected"
        | "qr_pending"
        | "connecting"
        | "connected"
        | "error"
      whatsapp_message_status:
        | "pending"
        | "sending"
        | "sent"
        | "delivered"
        | "read"
        | "failed"
        | "cancelled"
      whatsapp_trigger:
        | "manual"
        | "appointment_confirmation"
        | "appointment_reminder"
        | "post_service"
        | "birthday"
        | "loyalty_redemption"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      announcement_audience: ["all", "selected"],
      announcement_severity: ["info", "success", "warning", "critical"],
      announcement_status: ["draft", "published", "archived"],
      app_role: ["super_admin", "gestor", "recepcionista", "barbeiro"],
      appointment_status: [
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
        "no_show",
      ],
      cash_session_status: ["open", "closed"],
      invoice_status: ["pending", "paid", "overdue", "refunded", "cancelled"],
      loyalty_punch_status: ["active", "completed", "expired"],
      loyalty_redemption_status: ["pending", "used", "cancelled"],
      loyalty_reward_type: [
        "discount_amount",
        "discount_percent",
        "free_service",
        "free_product",
      ],
      loyalty_tx_type: [
        "earn",
        "redeem",
        "adjust",
        "expire",
        "welcome",
        "birthday",
      ],
      payment_gateway_environment: ["sandbox", "production"],
      payment_gateway_provider: ["asaas"],
      payment_method: ["cash", "pix", "debit", "credit", "voucher", "other"],
      plan_billing_cycle: ["monthly", "quarterly", "yearly"],
      sale_status: ["open", "paid", "cancelled"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "suspended",
        "cancelled",
      ],
      tenant_status: ["trial", "active", "suspended", "cancelled"],
      whatsapp_connection_status: [
        "disconnected",
        "qr_pending",
        "connecting",
        "connected",
        "error",
      ],
      whatsapp_message_status: [
        "pending",
        "sending",
        "sent",
        "delivered",
        "read",
        "failed",
        "cancelled",
      ],
      whatsapp_trigger: [
        "manual",
        "appointment_confirmation",
        "appointment_reminder",
        "post_service",
        "birthday",
        "loyalty_redemption",
      ],
    },
  },
} as const
