import { formatDate } from '../lib/utils.js';

/**
 * ReasonCard component for displaying individual JSDoc vs TypeScript reasons
 * @param {{reason: {abridged: string, fullReason: string, timestamp: string}, index: number, onRemove?: Function}} props
 * @returns {JSX.Element}
 * @author Your Name
 */
export default function ReasonCard({ reason, index, onRemove }) {
  const handleRemove = () => {
    if (onRemove && typeof onRemove === 'function') {
      onRemove(index);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up">
      {/* Header with reason number and timestamp */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
            {index + 1}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {reason.abridged}
          </h3>
        </div>
        {onRemove && (
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Remove this reason"
            title="Remove this reason"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Full reason explanation */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
        {reason.fullReason}
      </p>

      {/* Timestamp and metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="flex items-center space-x-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Added {formatDate(reason.timestamp, { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </span>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            JSDoc Wins
          </span>
        </div>
      </div>
    </div>
  );
}
