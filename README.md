# Cloudflare Worker Project

A ready-to-deploy Cloudflare Workers project with testing support.

## Structure

```
/workspace
├── package.json          # Node.js dependencies and scripts
├── wrangler.toml         # Cloudflare Workers configuration
├── src/
│   ├── index.js          # Main worker entry point
│   └── index.test.js     # Unit tests
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI (`npm install -g wrangler`)

### Installation

```bash
npm install
```

### Development

Run the worker locally:

```bash
npm run dev
```

This starts a local development server at `http://localhost:8787`.

### Testing

Run the test suite:

```bash
npm test
```

### Deployment

Deploy to Cloudflare:

```bash
npm run deploy
```

**Note:** Before deploying, you need to:
1. Login to Cloudflare: `npx wrangler login`
2. Update `wrangler.toml` with your worker name and any required bindings

## Configuration

Edit `wrangler.toml` to configure:
- Worker name
- Environment variables (`[vars]`)
- KV Namespaces
- R2 Buckets
- D1 Databases
- Other bindings

## Example Endpoints

- `GET /` - Returns a welcome message
- `GET /api` - Returns API status
- Any other route - Returns 404

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
