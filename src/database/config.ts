/**
 * Database Configuration
 * Supabase client setup and configuration
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (replace with your actual Supabase credentials)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('users').select('count').limit(1);
    return !error;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
}

// Initialize offline storage
export function initializeOfflineStorage() {
  if (typeof window !== 'undefined') {
    // Check if IndexedDB is available
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported - offline mode disabled');
      return false;
    }
    
    // Initialize local storage for offline queue
    const offlineQueue = localStorage.getItem('offlineQueue');
    if (!offlineQueue) {
      localStorage.setItem('offlineQueue', JSON.stringify([]));
    }
    
    return true;
  }
  return false;
}

export default supabase;
