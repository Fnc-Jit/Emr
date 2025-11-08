/**
 * Report Service
 * Database operations for emergency reports
 */

import { supabase } from '../config';
import type { EmergencyReport } from '../schema';

export class ReportService {
  /**
   * Create a new emergency report
   */
  static async createReport(reportData: Partial<EmergencyReport>): Promise<{ data: EmergencyReport | null; error: any }> {
    try {
      // Generate case ID
      const caseId = await this.generateCaseId();
      
      const { data, error } = await supabase
        .from('emergency_reports')
        .insert([{ ...reportData, case_id: caseId }])
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error creating report:', error);
      return { data: null, error };
    }
  }

  /**
   * Generate unique case ID
   */
  private static async generateCaseId(): Promise<string> {
    const year = new Date().getFullYear();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CASE-${year}-${timestamp}-${random}`;
  }

  /**
   * Get report by ID
   */
  static async getReportById(reportId: string): Promise<{ data: EmergencyReport | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('emergency_reports')
        .select('*')
        .eq('id', reportId)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching report:', error);
      return { data: null, error };
    }
  }

  /**
   * Get report by case ID
   */
  static async getReportByCaseId(caseId: string): Promise<{ data: EmergencyReport | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('emergency_reports')
        .select('*')
        .eq('case_id', caseId)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching report by case ID:', error);
      return { data: null, error };
    }
  }

  /**
   * Get all reports for a user
   */
  static async getUserReports(userId: string, filters?: {
    status?: string;
    needType?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: EmergencyReport[]; error: any; count?: number }> {
    try {
      let query = supabase
        .from('emergency_reports')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.needType) {
        query = query.eq('need_type', filters.needType);
      }
      
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error, count } = await query;
      
      return { data: data || [], error, count: count || 0 };
    } catch (error) {
      console.error('Error fetching user reports:', error);
      return { data: [], error };
    }
  }

  /**
   * Get all reports (for volunteers/responders)
   */
  static async getAllReports(filters?: {
    status?: string;
    priority?: string;
    needType?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: EmergencyReport[]; error: any; count?: number }> {
    try {
      let query = supabase
        .from('emergency_reports')
        .select('*', { count: 'exact' })
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      
      if (filters?.needType) {
        query = query.eq('need_type', filters.needType);
      }
      
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error, count } = await query;
      
      return { data: data || [], error, count: count || 0 };
    } catch (error) {
      console.error('Error fetching reports:', error);
      return { data: [], error };
    }
  }

  /**
   * Update report
   */
  static async updateReport(reportId: string, updates: Partial<EmergencyReport>): Promise<{ data: EmergencyReport | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('emergency_reports')
        .update(updates)
        .eq('id', reportId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error updating report:', error);
      return { data: null, error };
    }
  }

  /**
   * Delete report
   */
  static async deleteReport(reportId: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('emergency_reports')
        .delete()
        .eq('id', reportId);
      
      return { error };
    } catch (error) {
      console.error('Error deleting report:', error);
      return { error };
    }
  }

  /**
   * Search reports by query
   */
  static async searchReports(query: string, userId?: string): Promise<{ data: EmergencyReport[]; error: any }> {
    try {
      let dbQuery = supabase
        .from('emergency_reports')
        .select('*')
        .or(`case_id.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (userId) {
        dbQuery = dbQuery.eq('user_id', userId);
      }
      
      const { data, error } = await dbQuery;
      
      return { data: data || [], error };
    } catch (error) {
      console.error('Error searching reports:', error);
      return { data: [], error };
    }
  }

  /**
   * Mark report as duplicate
   */
  static async markAsDuplicate(reportId: string, originalReportId: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('emergency_reports')
        .update({
          is_duplicate: true,
          duplicate_of: originalReportId,
          status: 'duplicate',
        })
        .eq('id', reportId);
      
      return { error };
    } catch (error) {
      console.error('Error marking as duplicate:', error);
      return { error };
    }
  }
}
