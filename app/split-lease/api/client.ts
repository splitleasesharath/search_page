/**
 * Supabase client initialization and configuration
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Initialize Supabase client
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase URL and Anon Key must be configured');
    }
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

// Error handling helper
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export function handleApiError(error: any): ApiError {
  if (error?.message) {
    return {
      message: error.message,
      code: error.code,
      details: error.details,
    };
  }
  return {
    message: 'An unexpected error occurred',
    details: error,
  };
}

// Initialize with credentials if available (for browser usage)
export function initSupabase(url: string, anonKey: string): SupabaseClient {
  supabaseClient = createClient(url, anonKey);
  return supabaseClient;
}

export default getSupabaseClient;
