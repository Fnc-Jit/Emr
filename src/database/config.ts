/**
 * Database Configuration
 * Supabase client setup and configuration
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (replace with your actual Supabase credentials)
// For Vite, use import.meta.env instead of process.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kamikyfpgxvowzkpodtk.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthbWlreWZwZ3h2b3d6a3BvZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODY0OTksImV4cCI6MjA3ODE2MjQ5OX0.dS_mRMmyYjq_oy5xJi1IkaUuJViIzh-ShEoRyXdLNFQ';

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
