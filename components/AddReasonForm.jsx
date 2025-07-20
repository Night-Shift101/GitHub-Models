'use client';

import { useState } from 'react';

/**
 * AddReasonForm component for generating new AI-powered reasons
 * @param {{existingReasons: Array<{abridged: string, fullReason: string}>, onReasonAdded: Function}} props
 * @returns {JSX.Element}
 * @author Your Name
 */
export default function AddReasonForm({ existingReasons = [], onReasonAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  /**
   * Handles generating a new reason using server-side AI via API
   */
  const handleGenerateReason = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 Calling server-side AI API...');
      
      // Call our Next.js API route instead of direct AI service
      const response = await fetch('/api/generate-reason', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          existingReasons,
          customContext: customPrompt
        })
      });

      const result = await response.json();

      if (result.success) {
        if (onReasonAdded && typeof onReasonAdded === 'function') {
          onReasonAdded(result.data);
        }
        // Clear custom prompt on successful generation
        setCustomPrompt('');
        console.log('✅ Server-side AI generated reason with metadata:', result.data.metadata);
      } else {
        console.warn('Server-side AI generation failed:', result.error);
        setError(result.error || 'Failed to generate new reason. The AI might be having an existential crisis about TypeScript!');
      }
    } catch (err) {
      console.error('Unexpected error calling AI API:', err);
      setError('Failed to connect to AI service. Please check your connection and try again!');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateReason();
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 border border-primary-200 dark:border-gray-700 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            🤖 AI-Powered Reason Generator
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Let AI generate compelling reasons why JSDoc is superior to TypeScript
          </p>
        </div>
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600">
          <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Context (Optional)
          </label>
          <textarea
            id="customPrompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Add specific context or focus area for the AI to consider..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm"
            rows={3}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This will be included in the AI prompt to generate more targeted reasons
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Generation Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 hover:shadow-md transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Reason...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate New Reason
            </>
          )}
        </button>

        {existingReasons.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all reasons? This cannot be undone.')) {
                if (onReasonAdded) {
                  // Signal to parent to clear all reasons
                  onReasonAdded(null, true);
                }
              }
            }}
            disabled={isLoading}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            title="Clear all reasons"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </form>

      {/* Advanced Stats */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {existingReasons.length} reason{existingReasons.length !== 1 ? 's' : ''} generated so far
        </span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            OpenAI SDK + GitHub Models
          </span>
          {existingReasons.length > 0 && (
            <span className="flex items-center text-green-600 dark:text-green-400">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {existingReasons.filter(r => r.source === 'ai-generated-openai-sdk').length} AI Generated
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
