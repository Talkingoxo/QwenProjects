# QwenProjects Worker

This repository is a Cloudflare Worker project. The deployable application lives directly on the `main` branch:

- Rendered application: `src/index.js`
- Worker configuration: `wrangler.toml`
- Package scripts: `package.json`

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| `GET` / `HEAD` | `/` | Rendered HTML application page |
| `GET` / `HEAD` | `/api` | JSON service status and timestamp |
| Other methods | Any path | `405 Method Not Allowed` |
| `GET` / `HEAD` | Any other path | Rendered HTML `404` page |

## Local validation

Requires Node.js 22 or newer.

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

The deployable Worker configuration is at the repository root. Do not select a separate `cloudflare-worker` directory.

## AI-generated updates

The Qwen coding agent creates temporary branches named `folder-structure-management-*`. GitHub now handles them automatically:

1. Rebase the update onto the latest `main`.
2. Reject changes to deployment infrastructure for manual review.
3. Install dependencies and run the complete test suite.
4. Compile the Worker with `wrangler deploy --dry-run`.
5. Push the verified code directly to `main`.
6. Delete the temporary AI branch.

This means the agent may create a branch briefly, but successful application code lands on the normal `main` page and the temporary branch is removed.

## Manual GitHub Actions deployment

The optional **Deploy Worker** workflow requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The connected Cloudflare Workers Builds integration deploys from `main` and does not use the optional manual GitHub Actions workflow.