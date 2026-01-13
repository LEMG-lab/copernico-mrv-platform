
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not found in env vars. Using mock mode.');
}

export const supabase = createClient(
    supabaseUrl || 'https://mock.supabase.co',
    supabaseKey || 'mock-key'
);

// Tipado básico de la DB
export type Database = {
    public: {
        Tables: {
            companies: {
                Row: { id: string; name: string; created_at: string };
                Insert: { id?: string; name: string; created_at?: string };
                Update: { id?: string; name?: string; created_at?: string };
            };
            plant_applications: {
                Row: {
                    id: string;
                    current_step: string;
                    form_state: any;
                    status: string;
                    updated_at: string
                };
                Insert: {
                    id?: string;
                    current_step?: string;
                    form_state?: any;
                    status?: string
                };
                Update: {
                    current_step?: string;
                    form_state?: any;
                    status?: string;
                    updated_at?: string
                };
            };
            // ... expand as needed
        };
    };
};
