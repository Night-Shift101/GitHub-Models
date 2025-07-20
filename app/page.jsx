'use client';

import { useState, useEffect } from 'react';
import AddReasonForm from '../components/AddReasonForm.jsx';
import ReasonCard from '../components/ReasonCard.jsx';
import { loadReasons, saveReasons, addReason } from '../lib/storage.js';

/**
 * JSDoc vs TypeScript debate platform homepage
 * @returns {JSX.Element}
 * @author Your Name
 */
export default function HomePage() {
  const [reasons, setReasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reasons from localStorage on component mount
  useEffect(() => {
    const loadStoredReasons = async () => {
      try {
        const result = await loadReasons();
        if (result.success && Array.isArray(result.data)) {
          setReasons(result.data);
        }
      } catch (err) {
        console.error('Failed to load stored reasons:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredReasons();
  }, []);

  /**
   * Handle adding a new reason or clearing all reasons
   * @param {Object|null} newReason - The new reason object, or null to clear all
   * @param {boolean} clearAll - Whether to clear all reasons
   */
  const handleReasonAdded = async (newReason, clearAll = false) => {
    try {
      if (clearAll) {
        // Clear all reasons
        const result = await saveReasons([]);
        if (result.success) {
          setReasons([]);
        }
      } else if (newReason) {
        // Add new reason
        const result = await addReason(newReason);
        if (result.success) {
          setReasons(result.data);
        }
      }
    } catch (err) {
      console.error('Failed to update reasons:', err);
    }
  };

  /**
   * Handle removing a specific reason
   * @param {number} index - Index of the reason to remove
   */
  const handleRemoveReason = async (index) => {
    try {
      const newReasons = reasons.filter((_, i) => i !== index);
      const result = await saveReasons(newReasons);
      if (result.success) {
        setReasons(newReasons);
      }
    } catch (err) {
      console.error('Failed to remove reason:', err);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Debate Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              JSDoc vs
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                TypeScript
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              🔥 <strong>The Ultimate Showdown</strong> - Discover why JSDoc is the superior choice for JavaScript projects. 
              Let AI generate compelling arguments that will change how you think about type safety.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                AI Generated
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Locally Stored
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Portfolio Showcase
              </span>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ <strong>Disclaimer:</strong> This is a provocative AI experiment designed to showcase advanced integration skills. 
                TypeScript fans, prepare to question everything you thought you knew! 😉
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add Reason Form */}
          <AddReasonForm 
            existingReasons={reasons}
            onReasonAdded={handleReasonAdded}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Loading reasons...</p>
            </div>
          )}

          {/* Reasons List */}
          {!isLoading && (
            <>
              {reasons.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2m16-7a2 2 0 01-2 2H6a2 2 0 01-2-2m0 0V9a2 2 0 012-2h12a2 2 0 012 2v4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Reasons Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Click the button above to let AI generate compelling reasons why JSDoc is better than TypeScript!
                  </p>
                  <div className="text-sm text-gray-400 dark:text-gray-500">
                    💡 Each reason is AI-generated and unique - no duplicates allowed!
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      🏆 Why JSDoc Dominates TypeScript
                    </h2>
                    <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        {reasons.length} Strong Argument{reasons.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {reasons.map((reason, index) => (
                      <ReasonCard
                        key={`${reason.timestamp}-${index}`}
                        reason={reason}
                        index={index}
                        onRemove={handleRemoveReason}
                      />
                    ))}
                  </div>

                  {/* Battle Stats */}
                  <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      🎯 Battle Statistics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {reasons.length}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">JSDoc Wins</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">0</div>
                        <div className="text-gray-600 dark:text-gray-300">TypeScript Wins</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">∞</div>
                        <div className="text-gray-600 dark:text-gray-300">More Arguments Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
