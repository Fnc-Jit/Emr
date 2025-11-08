/**
 * User Service
 * Database operations for users
 */

import { supabase } from '../config';
import type { User } from '../schema';

export class UserService {
  /**
   * Create a new user account
   */
  static async createUser(userData: Partial<User>): Promise<{ data: User | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error creating user:', error);
      return { data: null, error };
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<{ data: User | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { data: null, error };
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<{ data: User | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return { data: null, error };
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(userId: string, updates: Partial<User>): Promise<{ data: User | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error updating user:', error);
      return { data: null, error };
    }
  }

  /**
   * Update last login timestamp
   */
  static async updateLastLogin(userId: string): Promise<void> {
    try {
      await supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Delete user account
   */
  static async deleteUser(userId: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      return { error };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { error };
    }
  }

  /**
   * Check if email exists
   */
  static async emailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      return !error && data !== null;
    } catch (error) {
      return false;
    }
  }
}
