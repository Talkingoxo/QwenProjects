const BASE_HEADERS = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer'
};

const HOME_PAGE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>QwenProjects</title>
  <style>
    :root {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #f8fafc;
      background: #020617;
    }
    * { box-sizing: border-box; }
    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 32px;
      background:
        radial-gradient(circle at 15% 20%, rgba(59, 130, 246, .28), transparent 34rem),
        radial-gradient(circle at 85% 80%, rgba(168, 85, 247, .22), transparent 32rem),
        #020617;
    }
    main {
      width: min(920px, 100%);
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 24px;
      padding: clamp(28px, 6vw, 64px);
      background: rgba(15, 23, 42, .78);
      box-shadow: 0 30px 90px rgba(0, 0, 0, .38);
      backdrop-filter: blur(18px);
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      color: #cbd5e1;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 20px rgba(34, 197, 94, .8);
    }
    h1 {
      max-width: 760px;
      margin: 0;
      font-size: clamp(48px, 10vw, 96px);
      line-height: .95;
      letter-spacing: -.055em;
    }
    .lead {
      max-width: 680px;
      margin: 28px 0 0;
      color: #cbd5e1;
      font-size: clamp(18px, 2.4vw, 22px);
      line-height: 1.65;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 38px;
    }
    .card {
      min-height: 130px;
      padding: 20px;
      border: 1px solid rgba(148, 163, 184, .18);
      border-radius: 18px;
      background: rgba(30, 41, 59, .55);
    }
    .label {
      color: #94a3b8;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
    }
    .value {
      margin-top: 12px;
      font-size: 18px;
      font-weight: 750;
      overflow-wrap: anywhere;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 30px;
    }
    a {
      display: inline-flex;
      align-items: center;
      min-height: 46px;
      padding: 0 18px;
      border-radius: 12px;
      color: #020617;
      background: #f8fafc;
      font-weight: 800;
      text-decoration: none;
    }
    a.secondary {
      color: #e2e8f0;
      border: 1px solid rgba(148, 163, 184, .28);
      background: rgba(15, 23, 42, .55);
    }
    @media (max-width: 700px) {
      body { padding: 16px; }
      main { border-radius: 18px; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main>
    <div class="eyebrow"><span class="dot"></span> Cloudflare Worker online</div>
    <h1>QwenProjects is live.</h1>
    <p class="lead">This rendered page is served by the application on the repository's <strong>main</strong> branch. Future verified AI updates are promoted to main automatically.</p>
    <section class="grid" aria-label="Deployment details">
      <article class="card"><div class="label">Runtime</div><div class="value">Cloudflare Workers</div></article>
      <article class="card"><div class="label">Source</div><div class="value">main / src/index.js</div></article>
      <article class="card"><div class="label">Status</div><div class="value">Operational</div></article>
    </section>
    <div class="actions">
      <a href="/api">Open API status</a>
      <a class="secondary" href="/">Refresh page</a>
    </div>
  </main>
</body>
</html>`;

const NOT_FOUND_PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found</title><style>body{font-family:system-ui;margin:0;min-height:100vh;display:grid;place-items:center;background:#020617;color:#f8fafc}main{text-align:center}a{color:#93c5fd}</style></head><body><main><h1>404</h1><p>The requested page was not found.</p><a href="/">Return home</a></main></body></html>`;

function response(body, contentType, request, init = {}) {
  return new Response(request.method === 'HEAD' ? null : body, {
    ...init,
    headers: {
      ...BASE_HEADERS,
      'content-type': contentType,
      ...(init.headers ?? {})
    }
  });
}

function jsonResponse(body, request, init = {}) {
  return response(
    JSON.stringify(body),
    'application/json; charset=utf-8',
    request,
    init
  );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse(
        { error: 'Method Not Allowed' },
        request,
        { status: 405, headers: { allow: 'GET, HEAD' } }
      );
    }

    if (url.pathname === '/') {
      return response(HOME_PAGE, 'text/html; charset=utf-8', request);
    }

    if (url.pathname === '/api') {
      return jsonResponse(
        {
          status: 'ok',
          service: 'qwenprojects',
          branch: 'main',
          timestamp: new Date().toISOString()
        },
        request
      );
    }

    return response(
      NOT_FOUND_PAGE,
      'text/html; charset=utf-8',
      request,
      { status: 404 }
    );
  }
};