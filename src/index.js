const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers ?? {})
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse(
        { error: 'Method Not Allowed' },
        { status: 405, headers: { allow: 'GET, HEAD' } }
      );
    }

    if (url.pathname === '/') {
      return jsonResponse({
        message: 'QwenProjects Worker is running',
        path: url.pathname,
        method: request.method
      });
    }

    if (url.pathname === '/api') {
      return jsonResponse({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    }

    return jsonResponse({ error: 'Not Found' }, { status: 404 });
  }
};
