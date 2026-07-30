# QwenProjects Worker

This repository is a Cloudflare Worker project. The deployable application lives directly on the `main` branch:

- Worker source: `src/index.js`
- Worker configuration: `wrangler.toml`
- Package scripts: `package.json`

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| `GET` / `HEAD` | `/` | Worker status JSON |
| `GET` / `HEAD` | `/api` | API status and timestamp |
| Other methods | Any path | `405 Method Not Allowed` |
| `GET` / `HEAD` | Any other path | `404 Not Found` |

## Local validation

Requires Node.js 20 or newer.

```bash
npm install
npm test
npm run check
npm run dev
```

`npm run check` compiles the Worker with Wrangler without deploying it.

## Cloudflare Workers Builds

Use these settings when connecting this repository:

- Production branch: `main`
- Root directory: leave empty, or use `/`
- Deploy command: `npm run deploy`
- Build output directory: leave empty

Do not select a `cloudflare-worker` subdirectory. This repository has one Worker configuration at the repository root.

## AI-generated updates

AI branches named `folder-structure-management-*` are validated before merging. Application-code changes are tested, compiled with Wrangler, and squash-merged into `main` automatically. Changes to deployment workflows or Wrangler configuration stop for manual review instead of being published automatically.

## Manual GitHub Actions deployment

The optional **Deploy Worker** workflow requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The connected Cloudflare Workers Builds integration does not use that GitHub Actions workflow.
