/**
 * Local storage utilities for persisting JSDoc reasons
 * @author Your Name
 */

import { success, failure, isBrowser } from './utils.js';

const STORAGE_KEY = 'jsdoc-vs-typescript-reasons';

/**
 * Saves reasons to localStorage
 * @param {Array<{abridged: string, fullReason: string, timestamp: string}>} reasons - Reasons to save
 * @returns {{ success: boolean, error: string|null, data: any }}
 */
export function saveReasons(reasons) {
  try {
    if (!isBrowser()) {
      return failure('Cannot save to localStorage in server environment');
    }

    if (!Array.isArray(reasons)) {
      return failure('Reasons must be an array');
    }

    const dataToSave = {
      reasons,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return success({ saved: reasons.length });
  } catch (error) {
    console.error('Error saving reasons to localStorage:', error);
    return failure(`Failed to save reasons: ${error.message}`);
  }
}

/**
 * Loads reasons from localStorage
 * @returns {{ success: boolean, error: string|null, data: Array<{abridged: string, fullReason: string, timestamp: string}>|null }}
 */
export function loadReasons() {
  try {
    if (!isBrowser()) {
      return success([]); // Return empty array for server-side rendering
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return success([]); // No data stored yet
    }

    const parsed = JSON.parse(stored);
    
    // Validate data structure
    if (!parsed.reasons || !Array.isArray(parsed.reasons)) {
      console.warn('Invalid stored data structure, clearing storage');
      localStorage.removeItem(STORAGE_KEY);
      return success([]);
    }

    return success(parsed.reasons);
  } catch (error) {
    console.error('Error loading reasons from localStorage:', error);
    // Clear corrupted data
    if (isBrowser()) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return success([]); // Return empty array as fallback
  }
}

/**
 * Adds a new reason to the stored list
 * @param {{abridged: string, fullReason: string, timestamp: string}} newReason - New reason to add
 * @returns {{ success: boolean, error: string|null, data: Array<{abridged: string, fullReason: string, timestamp: string}>|null }}
 */
export function addReason(newReason) {
  try {
    // Validate new reason
    if (!newReason || typeof newReason !== 'object') {
      return failure('Invalid reason object');
    }

    if (!newReason.abridged || !newReason.fullReason) {
      return failure('Reason must have abridged and fullReason properties');
    }

    // Load existing reasons
    const loadResult = loadReasons();
    if (!loadResult.success) {
      return failure('Failed to load existing reasons');
    }

    const existingReasons = loadResult.data || [];

    // Check for duplicates (case-insensitive)
    const isDuplicate = existingReasons.some(
      reason => reason.abridged.toLowerCase().trim() === newReason.abridged.toLowerCase().trim()
    );

    if (isDuplicate) {
      return failure('This reason already exists');
    }

    // Add timestamp if not present
    if (!newReason.timestamp) {
      newReason.timestamp = new Date().toISOString();
    }

    // Add new reason to the beginning of the array (most recent first)
    const updatedReasons = [newReason, ...existingReasons];

    // Save updated list
    const saveResult = saveReasons(updatedReasons);
    if (!saveResult.success) {
      return failure('Failed to save updated reasons');
    }

    return success(updatedReasons);
  } catch (error) {
    console.error('Error adding reason:', error);
    return failure(`Failed to add reason: ${error.message}`);
  }
}

/**
 * Clears all stored reasons
 * @returns {{ success: boolean, error: string|null, data: any }}
 */
export function clearReasons() {
  try {
    if (!isBrowser()) {
      return failure('Cannot clear localStorage in server environment');
    }

    localStorage.removeItem(STORAGE_KEY);
    return success({ cleared: true });
  } catch (error) {
    console.error('Error clearing reasons:', error);
    return failure(`Failed to clear reasons: ${error.message}`);
  }
}

/**
 * Gets storage statistics
 * @returns {{ success: boolean, error: string|null, data: {totalReasons: number, lastUpdated: string|null, storageSize: number}|null }}
 */
export function getStorageStats() {
  try {
    if (!isBrowser()) {
      return success({
        totalReasons: 0,
        lastUpdated: null,
        storageSize: 0
      });
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return success({
        totalReasons: 0,
        lastUpdated: null,
        storageSize: 0
      });
    }

    const parsed = JSON.parse(stored);
    const storageSize = new Blob([stored]).size;

    return success({
      totalReasons: parsed.reasons?.length || 0,
      lastUpdated: parsed.lastUpdated || null,
      storageSize: storageSize
    });
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return failure(`Failed to get storage stats: ${error.message}`);
  }
}
