/**
 * Volunteer Service
 * Database operations for volunteers and verifications
 */

import { supabase } from '../config';
import type { Volunteer, ReportVerification } from '../schema';

export class VolunteerService {
  /**
   * Create volunteer profile
   */
  static async createVolunteer(volunteerData: Partial<Volunteer>): Promise<{ data: Volunteer | null; error: any }> {
    try {
      // Generate volunteer ID
      const volunteerId = await this.generateVolunteerId();
      
      const { data, error } = await supabase
        .from('volunteers')
        .insert([{ ...volunteerData, volunteer_id: volunteerId }])
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error creating volunteer:', error);
      return { data: null, error };
    }
  }

  /**
   * Generate unique volunteer ID
   */
  private static async generateVolunteerId(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.getVolunteerCount();
    return `VOL-${year}-${(count + 1).toString().padStart(4, '0')}`;
  }

  /**
   * Get volunteer count
   */
  private static async getVolunteerCount(): Promise<number> {
    try {
      const { count } = await supabase
        .from('volunteers')
        .select('*', { count: 'exact', head: true });
      
      return count || 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get volunteer by user ID
   */
  static async getVolunteerByUserId(userId: string): Promise<{ data: Volunteer | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching volunteer:', error);
      return { data: null, error };
    }
  }

  /**
   * Update volunteer profile
   */
  static async updateVolunteer(volunteerId: string, updates: Partial<Volunteer>): Promise<{ data: Volunteer | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .update(updates)
        .eq('id', volunteerId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error updating volunteer:', error);
      return { data: null, error };
    }
  }

  /**
   * Create report verification
   */
  static async createVerification(verificationData: Partial<ReportVerification>): Promise<{ data: ReportVerification | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('report_verifications')
        .insert([verificationData])
        .select()
        .single();
      
      // Update report verification count
      if (!error && verificationData.report_id) {
        await this.incrementReportVerificationCount(verificationData.report_id);
      }
      
      // Update volunteer stats
      if (!error && verificationData.volunteer_id) {
        await this.incrementVolunteerVerificationCount(verificationData.volunteer_id);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Error creating verification:', error);
      return { data: null, error };
    }
  }

  /**
   * Increment report verification count
   */
  private static async incrementReportVerificationCount(reportId: string): Promise<void> {
    try {
      await supabase.rpc('increment_verification_count', { report_id: reportId });
    } catch (error) {
      console.error('Error incrementing verification count:', error);
    }
  }

  /**
   * Increment volunteer verification count
   */
  private static async incrementVolunteerVerificationCount(volunteerId: string): Promise<void> {
    try {
      const { data: volunteer } = await supabase
        .from('volunteers')
        .select('total_verifications')
        .eq('id', volunteerId)
        .single();
      
      if (volunteer) {
        await supabase
          .from('volunteers')
          .update({ total_verifications: volunteer.total_verifications + 1 })
          .eq('id', volunteerId);
      }
    } catch (error) {
      console.error('Error incrementing volunteer count:', error);
    }
  }

  /**
   * Get verifications for a report
   */
  static async getReportVerifications(reportId: string): Promise<{ data: ReportVerification[]; error: any }> {
    try {
      const { data, error } = await supabase
        .from('report_verifications')
        .select('*')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false });
      
      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching verifications:', error);
      return { data: [], error };
    }
  }

  /**
   * Get volunteer's verification history
   */
  static async getVolunteerVerifications(volunteerId: string, limit = 50): Promise<{ data: ReportVerification[]; error: any }> {
    try {
      const { data, error } = await supabase
        .from('report_verifications')
        .select('*')
        .eq('volunteer_id', volunteerId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching volunteer verifications:', error);
      return { data: [], error };
    }
  }

  /**
   * Get volunteer statistics
   */
  static async getVolunteerStats(volunteerId: string): Promise<{
    total_verifications: number;
    reputation_score: number;
    verified_this_week: number;
  }> {
    try {
      const { data: volunteer } = await supabase
        .from('volunteers')
        .select('total_verifications, reputation_score')
        .eq('id', volunteerId)
        .single();
      
      // Get this week's verifications
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { count } = await supabase
        .from('report_verifications')
        .select('*', { count: 'exact', head: true })
        .eq('volunteer_id', volunteerId)
        .gte('created_at', weekAgo.toISOString());
      
      return {
        total_verifications: volunteer?.total_verifications || 0,
        reputation_score: volunteer?.reputation_score || 0,
        verified_this_week: count || 0,
      };
    } catch (error) {
      console.error('Error fetching volunteer stats:', error);
      return {
        total_verifications: 0,
        reputation_score: 0,
        verified_this_week: 0,
      };
    }
  }
}
