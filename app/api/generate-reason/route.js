/**
 * Next.js API route for JSDoc vs TypeScript reason generation
 * Uses GitHub Models with OpenAI SDK on the server side
 * @author Your Name
 */

import { generateJSDocReason } from '../../../lib/ai-service.js';

/**
 * POST /api/generate-reason
 * Generates a new JSDoc vs TypeScript debate reason using AI
 * @param {Request} request - Next.js API request
 * @returns {Response} JSON response with generated reason
 */
export async function POST(request) {
  try {
    // Parse request body
    const { existingReasons = [], customContext = '' } = await request.json();

    console.log('🎯 API: Generating reason with server-side AI...');

    // Call the AI service (now running server-side with access to environment variables)
    const result = await generateJSDocReason(existingReasons, customContext);

    if (result.success) {
      console.log('✅ API: Successfully generated reason');
      return Response.json({
        success: true,
        data: result.data,
        error: null
      });
    } else {
      console.warn('⚠️ API: AI generation failed:', result.error);
      return Response.json({
        success: false,
        data: null,
        error: result.error
      }, { status: 400 });
    }

  } catch (error) {
    console.error('🚨 API: Unexpected error:', error);
    return Response.json({
      success: false,
      data: null,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return Response.json({
    success: false,
    error: 'Method not allowed. Use POST to generate reasons.'
  }, { status: 405 });
}
