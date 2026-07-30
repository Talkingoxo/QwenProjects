# LocalConvert on Cloudflare Workers

A browser-based file conversion website served directly from the Worker root URL. The selected files stay in the browser and are not uploaded to the Worker.

## Direct website

The design is returned at `/`. No additional route is required.

## Working converters

- Images: PNG, JPEG and WebP through the browser Canvas API
- PDF merging through PDF-Lib, loaded only when selected
- DOCX to HTML or text through Mammoth, loaded only when selected
- XLSX/XLS/ODS to CSV or JSON through SheetJS, loaded only when selected
- JSON and CSV conversion through built-in JavaScript

## Local verification

```bash
npm install
npm test
npm run check
npm run dev
```

## Cloudflare Workers Builds

- Production branch: `main`
- Root directory: empty or `/`
- Deploy command: `npm run deploy`
- Build output directory: empty

The deployable Worker entry point is `src/index.js`, configured by the root `wrangler.toml`.
