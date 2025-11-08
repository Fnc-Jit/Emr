/**
 * Test Supabase Connection
 * Run this to verify your Supabase setup is working
 */

import { supabase, checkDatabaseConnection } from './config';

export async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test 1: Check if Supabase client is initialized
    console.log('✅ Supabase client initialized');
    console.log('   URL:', supabase.supabaseUrl);
    
    // Test 2: Check database connection
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
      console.log('✅ Database connection successful!');
    } else {
      console.log('⚠️  Database connection failed - tables may not be created yet');
      console.log('   Run the SQL schema from /src/database/schema.ts in Supabase SQL Editor');
    }
    
    // Test 3: Check if tables exist
    const tables = ['users', 'emergency_reports', 'volunteers', 'report_verifications'];
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('count').limit(1);
        if (error) {
          console.log(`❌ Table '${table}' not found or not accessible`);
        } else {
          console.log(`✅ Table '${table}' exists`);
        }
      } catch (err) {
        console.log(`❌ Error checking table '${table}':`, err);
      }
    }
    
    return isConnected;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

// Auto-run if imported in browser
if (typeof window !== 'undefined') {
  // Uncomment to auto-test on page load
  // testSupabaseConnection();
}

