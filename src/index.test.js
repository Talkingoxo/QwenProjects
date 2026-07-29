import { describe, it, expect } from 'vitest';

describe('Cloudflare Worker', () => {
  it('should return hello message at root', async () => {
    const worker = await import('../src/index.js');
    const request = new Request('http://example.com/');
    const response = await worker.default.fetch(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toContain('Hello from Cloudflare Workers!');
  });

  it('should return API response at /api', async () => {
    const worker = await import('../src/index.js');
    const request = new Request('http://example.com/api');
    const response = await worker.default.fetch(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('API endpoint working');
  });

  it('should return 404 for unknown routes', async () => {
    const worker = await import('../src/index.js');
    const request = new Request('http://example.com/unknown');
    const response = await worker.default.fetch(request);
    
    expect(response.status).toBe(404);
  });
});
