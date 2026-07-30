import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

test('GET / renders the LocalConvert application directly', async () => {
  const response = await worker.fetch(new Request('https://example.com/'));
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.match(body, /<!doctype html>/i);
  assert.match(body, /LocalConvert/);
  assert.match(body, /Convert files without/);
  assert.match(body, /Drop an image here/);
  assert.match(body, /Merge PDFs/);
  assert.match(body, /Spreadsheets/);
});

test('HEAD / returns application headers without a response body', async () => {
  const response = await worker.fetch(new Request('https://example.com/', { method: 'HEAD' }));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('GET /api returns health metadata', async () => {
  const response = await worker.fetch(new Request('https://example.com/api'));
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(body.status, 'ok');
  assert.equal(body.application, 'LocalConvert');
  assert.equal(body.branch, 'main');
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)));
});

test('unknown routes render an HTML 404 page', async () => {
  const response = await worker.fetch(new Request('https://example.com/missing'));
  const body = await response.text();

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.match(body, /The requested page was not found/);
});

test('unsupported methods return 405 and an Allow header', async () => {
  const response = await worker.fetch(new Request('https://example.com/', { method: 'POST' }));

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
  assert.deepEqual(await response.json(), { error: 'Method Not Allowed' });
});
