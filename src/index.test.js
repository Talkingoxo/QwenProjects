import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

test('GET / returns the worker status', async () => {
  const response = await worker.fetch(new Request('https://example.com/'));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.message, 'QwenProjects Worker is running');
  assert.equal(body.path, '/');
});

test('GET /api returns a valid status payload', async () => {
  const response = await worker.fetch(new Request('https://example.com/api'));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)));
});

test('unknown routes return JSON 404', async () => {
  const response = await worker.fetch(new Request('https://example.com/missing'));

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Not Found' });
});

test('unsupported methods return 405 and an Allow header', async () => {
  const response = await worker.fetch(
    new Request('https://example.com/api', { method: 'POST' })
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
});
