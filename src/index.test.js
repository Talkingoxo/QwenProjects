import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

test('GET / renders an HTML application page', async () => {
  const response = await worker.fetch(new Request('https://example.com/'));
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.match(body, /<!doctype html>/i);
  assert.match(body, /QwenProjects is live\./);
  assert.match(body, /main \/ src\/index\.js/);
});

test('HEAD / returns HTML headers without a response body', async () => {
  const response = await worker.fetch(
    new Request('https://example.com/', { method: 'HEAD' })
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('GET /api returns a valid status payload', async () => {
  const response = await worker.fetch(new Request('https://example.com/api'));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'qwenprojects');
  assert.equal(body.branch, 'main');
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)));
});

test('unknown routes render an HTML 404 page', async () => {
  const response = await worker.fetch(new Request('https://example.com/missing'));
  const body = await response.text();

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.match(body, /The requested page was not found\./);
});

test('unsupported methods return 405 and an Allow header', async () => {
  const response = await worker.fetch(
    new Request('https://example.com/api', { method: 'POST' })
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
  assert.deepEqual(await response.json(), { error: 'Method Not Allowed' });
});