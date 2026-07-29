/**
 * Cloudflare Worker entry point
 * @param {Request} request - The incoming request
 * @param {Env} env - Environment variables and bindings
 * @param {ExecutionContext} ctx - Execution context
 * @returns {Response}
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Simple routing example
    if (url.pathname === '/') {
      return new Response(JSON.stringify({
        message: 'Hello from Cloudflare Workers!',
        path: url.pathname,
        method: request.method
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/api') {
      return new Response(JSON.stringify({
        status: 'API endpoint working',
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Default 404
    return new Response('Not Found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
