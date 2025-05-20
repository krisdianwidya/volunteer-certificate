export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          name: string
          date: string
          location: string
          description: string
          image: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          date: string
          location: string
          description: string
          image: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          date?: string
          location?: string
          description?: string
          image?: string
          created_at?: string
        }
      }
      volunteers: {
        Row: {
          id: string
          name: string
          event_id: string
          year: number
          role: string
          description: string
          certificate_image: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          event_id: string
          year: number
          role: string
          description: string
          certificate_image: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          event_id?: string
          year?: number
          role?: string
          description?: string
          certificate_image?: string
          created_at?: string
        }
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
  }
}