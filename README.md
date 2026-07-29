# QwenProjects Worker

A minimal Cloudflare Worker with tested HTTP endpoints and controlled GitHub Actions workflows.

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| `GET` / `HEAD` | `/` | Worker status JSON |
| `GET` / `HEAD` | `/api` | API status and timestamp |
| Other methods | Any path | `405 Method Not Allowed` |
| `GET` / `HEAD` | Any other path | `404 Not Found` |

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm test
npm run dev
```

Wrangler serves the Worker locally, normally at `http://localhost:8787`.

## Deployment

Deployment is intentionally manual so unreviewed AI changes are not published automatically.

1. In the repository settings, add these GitHub Actions secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
2. Open **Actions → Deploy Worker**.
3. Select **Run workflow**.

The deployment job runs the test suite before executing `wrangler deploy`.
