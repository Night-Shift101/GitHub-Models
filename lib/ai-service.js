/**
 * Advanced AI Service for JSDoc vs TypeScript debate platform
 * Uses GitHub Models API with OpenAI SDK and YAML prompt configuration
 * @author Your Name
 */

import OpenAI from "openai";
import { success, failure } from './utils.js';

/**
 * Initialize GitHub Models client with OpenAI SDK
 * @returns {OpenAI} Configured OpenAI client for GitHub Models
 */
function initializeGitHubModelsClient() {
  const token = process.env["GITHUB_TOKEN"];
  const endpoint = "https://models.github.ai/inference";
  
  if (!token) {
    throw new Error('GitHub token not found. Please set GITHUB_TOKEN environment variable.');
  }

  return new OpenAI({ 
    baseURL: endpoint, 
    apiKey: token 
  });
}

/**
 * Load and parse the JSDoc prompt configuration
 * Based on the JSDoc.prompt.yml file structure  
 * @returns {Object} Parsed prompt configuration with advanced parameters
 */
function loadPromptConfig() {
  return {
    model: 'gpt-4o', // GitHub Models format
    systemContent: `You are a passionate JavaScript developer who strongly believes JSDoc is superior to TypeScript.

Your task is to provide ONE compelling reason why JSDoc is better than TypeScript.

Requirements:
- Return JSON with "abridged" (short reason ~7 words) and "fullReason" (short paragraph)
- Be technically accurate but opinionated in favor of JSDoc
- Focus on real developer pain points with TypeScript
- Make it engaging and debate-worthy
- ABSOLUTELY DO NOT repeat any existing reasons provided`,
    temperature: 0.85,
    maxTokens: 600,
    topP: 0.9,
    frequencyPenalty: 0.3,
    presencePenalty: 0.6,
    seed: null // Will be randomized per request
  };
}

/**
 * Enhanced AI reason generation using OpenAI SDK with GitHub Models
 * @param {Array<{abridged: string, fullReason: string}>} existingReasons - Array of existing reasons to avoid duplicates
 * @param {string} customContext - Optional custom context for AI generation
 * @returns {Promise<{success: boolean, error: string|null, data?: Object}>}
 */
export async function generateJSDocReason(existingReasons = [], customContext = '') {
  try {
    // Validate inputs
    if (!Array.isArray(existingReasons)) {
      return failure('Invalid existing reasons format');
    }

    // Initialize GitHub Models client
    let client;
    try {
      client = initializeGitHubModelsClient();
    } catch (clientError) {
      console.warn('GitHub Models client initialization failed:', clientError.message);
      return getFallbackReason(existingReasons);
    }

    // Load advanced prompt configuration from YAML structure
    const config = loadPromptConfig();

    // Prepare existing reasons context for AI with enhanced formatting
    const existingReasonsText = existingReasons.length > 0 
      ? existingReasons
          .map((reason, index) => `${index + 1}. "${reason.abridged}": ${reason.fullReason}`)
          .join('\n\n')
      : 'No existing reasons yet - this will be the first!';

    // Build context-aware system prompt
    const enhancedSystemPrompt = `${config.systemContent}

CRITICAL CONTEXT - EXISTING REASONS TO AVOID:
${existingReasonsText}

${customContext ? `ADDITIONAL CONTEXT: ${customContext}\n` : ''}

RESPONSE REQUIREMENTS:
- Generate a COMPLETELY UNIQUE reason that differs from all ${existingReasons.length} existing ones
- Focus on specific technical, performance, or developer experience advantages
- Make it controversial and conversation-starting
- Keep "abridged" to exactly 7 words or less
- Make "fullReason" a compelling 2-3 sentence argument
- Avoid generic statements - be specific and technical

Return ONLY valid JSON in this exact format:
{
  "abridged": "Brief compelling reason (max 7 words)",
  "fullReason": "Detailed 2-3 sentence explanation of why this makes JSDoc superior to TypeScript, focusing on specific technical advantages or developer pain points"
}`;

    // Generate unique seed for reproducibility tracking
    const requestSeed = Math.floor(Math.random() * 100000);

    console.log(`🤖 Generating reason #${existingReasons.length + 1} with GitHub Models OpenAI SDK...`);
    
    // Use OpenAI SDK with GitHub Models
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: enhancedSystemPrompt
        },
        {
          role: 'user',
          content: `Generate a unique, compelling reason why JSDoc dominates TypeScript. Make it technical, specific, and completely different from the ${existingReasons.length} existing reasons. Focus on real-world developer pain points and be controversial!`
        }
      ],
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      top_p: config.topP,
      frequency_penalty: config.frequencyPenalty,
      presence_penalty: config.presencePenalty,
      response_format: { type: "json_object" },
      seed: requestSeed,
      user: 'jsdoc-debate-platform'
    });

    console.log('✅ GitHub Models OpenAI SDK response received:', {
      model: response.model,
      usage: response.usage,
      finish_reason: response.choices?.[0]?.finish_reason
    });
    
    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Invalid OpenAI SDK response structure:', response);
      return failure('Invalid response format from AI service');
    }

    const content = response.choices[0].message.content.trim();
    
    // Enhanced JSON parsing with fallback strategies
    let reasonData;
    try {
      reasonData = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', content);
      
      // Try to extract JSON from markdown code blocks or text wrapping
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          reasonData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch (secondParseError) {
          console.warn('JSON extraction failed, using fallback...');
          return getFallbackReason(existingReasons);
        }
      } else {
        return getFallbackReason(existingReasons);
      }
    }

    // Enhanced validation with detailed checks
    if (!reasonData || typeof reasonData !== 'object') {
      console.error('AI returned non-object response:', reasonData);
      return getFallbackReason(existingReasons);
    }

    if (!reasonData.abridged || !reasonData.fullReason) {
      console.error('AI response missing required fields:', reasonData);
      return getFallbackReason(existingReasons);
    }

    // Quality assurance checks
    const wordCount = reasonData.abridged.split(' ').length;
    if (wordCount > 8) {
      console.warn(`Abridged reason too long (${wordCount} words), truncating...`);
      reasonData.abridged = reasonData.abridged.split(' ').slice(0, 7).join(' ') + '...';
    }

    // Advanced duplicate detection
    const abridgedLower = reasonData.abridged.toLowerCase();
    const fullReasonStart = reasonData.fullReason.toLowerCase().substring(0, 50);
    
    const isDuplicate = existingReasons.some(existing => {
      const existingAbridged = existing.abridged.toLowerCase();
      const existingFullStart = existing.fullReason.toLowerCase().substring(0, 50);
      
      return (
        existingAbridged.includes(abridgedLower) ||
        abridgedLower.includes(existingAbridged) ||
        existingFullStart.includes(fullReasonStart) ||
        fullReasonStart.includes(existingFullStart) ||
        // Check for semantic similarity (simple keyword overlap)
        existingAbridged.split(' ').some(word => 
          word.length > 3 && abridgedLower.includes(word)
        )
      );
    });

    if (isDuplicate) {
      console.warn('🔄 Detected potential duplicate, using fallback...');
      return getFallbackReason(existingReasons);
    }

    // Create enhanced reason with comprehensive metadata
    const enhancedReason = {
      abridged: reasonData.abridged.trim(),
      fullReason: reasonData.fullReason.trim(),
      timestamp: new Date().toISOString(),
      source: 'ai-generated-openai-sdk',
      model: response.model || config.model,
      usage: response.usage || null,
      parameters: {
        temperature: config.temperature,
        maxTokens: config.maxTokens,
        topP: config.topP,
        frequencyPenalty: config.frequencyPenalty,
        presencePenalty: config.presencePenalty,
        seed: requestSeed
      },
      quality: {
        uniqueness: 'verified',
        contextAware: existingReasons.length > 0,
        customContext: !!customContext,
        wordCount: wordCount,
        duplicateCheck: 'passed'
      },
      metadata: {
        generationAttempt: 1,
        requestId: `jsdoc-openai-${Date.now()}-${requestSeed}`,
        promptVersion: '2.0-openai-sdk',
        sdkVersion: 'github-models'
      }
    };

    console.log(`🎯 Generated unique reason #${existingReasons.length + 1} via OpenAI SDK: "${reasonData.abridged}"`);

    return success(enhancedReason);

  } catch (error) {
    console.error('🚨 Error in OpenAI SDK AI generation:', error);
    
    // Handle specific OpenAI SDK errors
    if (error.code === 'rate_limit_exceeded') {
      return failure('Rate limit exceeded. The AI is thinking too hard about JSDoc superiority! Try again in a moment.');
    } else if (error.code === 'invalid_api_key') {
      return failure('Invalid GitHub token. Please check your GITHUB_TOKEN environment variable.');
    } else if (error.code === 'insufficient_quota') {
      return failure('GitHub Models quota exceeded. Time to get more free AI power!');
    } else if (error.status === 400) {
      console.warn('Bad request with OpenAI SDK, falling back...');
      return getFallbackReason(existingReasons);
    }
    
    return failure(`Unexpected error: ${error.message}`);
  }
}

/**
 * Enhanced fallback reasons with more variety and technical depth
 * Used when GitHub Models + OpenAI SDK is unavailable
 */
export const FALLBACK_REASONS = [
  {
    abridged: 'No Build Step Required',
    fullReason: 'JSDoc works directly with JavaScript without requiring a compilation step. You can document your code and see immediate benefits without setting up TypeScript compilation, webpack loaders, or complex build configurations. This reduces complexity and speeds up development cycles significantly.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  },
  {
    abridged: 'Gradual Adoption Friendly',
    fullReason: 'You can add JSDoc comments incrementally to existing JavaScript codebases without breaking anything. Unlike TypeScript which often requires significant refactoring and can break existing code, JSDoc enhancement is completely non-invasive and backwards compatible.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  },
  {
    abridged: 'Better Runtime Flexibility',
    fullReason: 'JavaScript with JSDoc maintains full runtime flexibility while providing documentation benefits. TypeScript\'s strict typing can be overly restrictive for dynamic JavaScript patterns like duck typing and monkey patching that are perfectly valid and useful in real-world applications.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  },
  {
    abridged: 'Zero Learning Curve for JS Devs',
    fullReason: 'JSDoc uses familiar JavaScript syntax with simple comment annotations. TypeScript introduces entirely new syntax, interfaces, generics, and type system concepts that require significant learning investment. JSDoc leverages existing JavaScript knowledge.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  },
  {
    abridged: 'Superior IDE Integration Simplicity',
    fullReason: 'Modern IDEs understand JSDoc natively without additional configuration or language servers. TypeScript requires specific tooling setup, tsconfig.json configuration, and constant maintenance of type definitions that can break IDE features.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  },
  {
    abridged: 'No Type Definition Hell',
    fullReason: 'JSDoc eliminates the nightmare of managing @types packages and conflicting type definitions. With TypeScript, you constantly battle outdated or missing type definitions for third-party libraries, while JSDoc works with any JavaScript library immediately.',
    timestamp: new Date().toISOString(),
    source: 'fallback-enhanced',
    quality: { uniqueness: 'verified', technical: true }
  }
];

/**
 * Enhanced fallback reason selection with intelligent filtering
 * @param {Array<{abridged: string, fullReason: string}>} existingReasons - Existing reasons to check against
 * @returns {{ success: boolean, error: string|null, data: { abridged: string, fullReason: string }|null }}
 */
export function getFallbackReason(existingReasons = []) {
  try {
    // Create set of used abridged reasons for O(1) lookup
    const usedAbridged = new Set(
      existingReasons.map(r => r.abridged.toLowerCase().trim())
    );
    
    // Filter available reasons with enhanced duplicate detection
    const availableReasons = FALLBACK_REASONS.filter(reason => {
      const reasonAbridged = reason.abridged.toLowerCase().trim();
      
      // Exact match check
      if (usedAbridged.has(reasonAbridged)) return false;
      
      // Partial similarity check
      const isSimilar = existingReasons.some(existing => {
        const existingLower = existing.abridged.toLowerCase();
        return existingLower.includes(reasonAbridged) || reasonAbridged.includes(existingLower);
      });
      
      return !isSimilar;
    });
    
    if (availableReasons.length === 0) {
      // If all fallbacks are used, create a meta-reason about running out of reasons
      return success({
        abridged: 'Infinite JSDoc Arguments Exist',
        fullReason: 'The fact that we\'ve exhausted our prepared list of JSDoc advantages only proves there are countless more reasons why JSDoc dominates TypeScript. This abundance of benefits showcases JSDoc\'s inherent superiority - there are simply too many advantages to enumerate!',
        timestamp: new Date().toISOString(),
        source: 'meta-fallback',
        quality: { uniqueness: 'guaranteed', meta: true }
      });
    }

    // Select random available reason with enhanced metadata
    const randomIndex = Math.floor(Math.random() * availableReasons.length);
    const selectedReason = {
      ...availableReasons[randomIndex],
      timestamp: new Date().toISOString(), // Fresh timestamp
      metadata: {
        fallbackIndex: randomIndex,
        totalAvailable: availableReasons.length,
        selectionMethod: 'random'
      }
    };

    console.log(`📋 Using enhanced fallback reason: "${selectedReason.abridged}"`);

    return success(selectedReason);
    
  } catch (error) {
    console.error('Error in enhanced fallback selection:', error);
    return failure('Failed to get fallback reason');
  }
}
