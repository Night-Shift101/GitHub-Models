/**
 * Utility functions for the application
 * @author Your Name
 */

/**
 * Standard success response helper
 * @param {any} data - The data to return
 * @returns {{ success: boolean, error: null, data: any }}
 */
export function success(data = null) {
  return { success: true, error: null, data };
}

/**
 * Standard error response helper
 * @param {string} message - The error message
 * @returns {{ success: boolean, error: string, data: null }}
 */
export function failure(message = 'Unknown error') {
  return { success: false, error: message, data: null };
}

/**
 * Combines CSS class names conditionally
 * @param {...(string|undefined|null|boolean)} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {Intl.DateTimeFormatOptions} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };

    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function call
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function() {
    const args = arguments;
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random ID string
 * @param {number} length - The length of the ID (default: 8)
 * @returns {string} A random ID string
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Safely parses JSON with error handling
 * @param {string} jsonString - The JSON string to parse
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {{ success: boolean, error: string|null, data: any }}
 */
export function safeJsonParse(jsonString, fallback = null) {
  try {
    const data = JSON.parse(jsonString);
    return success(data);
  } catch (error) {
    console.error('JSON parsing error:', error);
    return failure(error.message);
  }
}

/**
 * Checks if the code is running in a browser environment
 * @returns {boolean} Whether the code is running in a browser
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Gets the current viewport dimensions
 * @returns {{ width: number, height: number }} Viewport dimensions
 */
export function getViewportDimensions() {
  if (!isBrowser()) {
    return { width: 0, height: 0 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * Scrolls to an element smoothly
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Optional offset from the element (default: 0)
 */
export function scrollToElement(elementId, offset = 0) {
  if (!isBrowser()) return;
  
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
