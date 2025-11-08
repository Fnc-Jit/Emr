/**
 * Offline Queue Handler
 * Manages queued operations when offline and syncs when online
 */

import { ReportService } from './services';

export interface QueuedOperation {
  action: 'create_report' | 'update_report' | 'create_verification';
  payload: any;
  timestamp: string;
}

/**
 * Process offline queue when connection is restored
 */
export async function processOfflineQueue(): Promise<void> {
  if (!navigator.onLine) {
    return;
  }

  const queue: QueuedOperation[] = JSON.parse(
    localStorage.getItem('offlineQueue') || '[]'
  );

  if (queue.length === 0) {
    return;
  }

  const processed: QueuedOperation[] = [];
  const failed: QueuedOperation[] = [];

  for (const item of queue) {
    try {
      if (item.action === 'create_report') {
        const { error } = await ReportService.createReport(item.payload);
        if (!error) {
          processed.push(item);
        } else {
          failed.push(item);
        }
      }
      // Add other action types as needed
    } catch (error) {
      console.error(`Failed to process queued operation:`, error);
      failed.push(item);
    }
  }

  // Update queue with failed items
  localStorage.setItem('offlineQueue', JSON.stringify(failed));

  return;
}

/**
 * Initialize offline queue sync
 */
export function initializeOfflineSync() {
  if (typeof window === 'undefined') return;

  // Listen for online event
  window.addEventListener('online', async () => {
    await processOfflineQueue();
  });

  // Process queue on page load if online
  if (navigator.onLine) {
    processOfflineQueue();
  }
}

