const BASE_HEADERS = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()'
};

const HOME_PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#09090b">
  <meta name="description" content="LocalConvert converts files directly in your browser. Files never leave your device.">
  <title>LocalConvert — Private file conversion</title>
  <style>
    :root {
      color-scheme: dark;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --bg: #09090b;
      --panel: rgba(24, 24, 27, .82);
      --muted: #a1a1aa;
      --text: #fafafa;
      --line: rgba(255, 255, 255, .10);
      --brand: #8b5cf6;
      --brand-2: #22d3ee;
      --success: #22c55e;
      --shadow: 0 30px 90px rgba(0, 0, 0, .42);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      min-height: 100vh;
      margin: 0;
      color: var(--text);
      background:
        radial-gradient(circle at 8% 8%, rgba(139, 92, 246, .24), transparent 27rem),
        radial-gradient(circle at 92% 24%, rgba(34, 211, 238, .16), transparent 30rem),
        linear-gradient(180deg, #09090b 0%, #111827 100%);
    }
    button, select { font: inherit; }
    button { cursor: pointer; }
    .shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; }
    header {
      position: sticky;
      top: 0;
      z-index: 20;
      border-bottom: 1px solid var(--line);
      background: rgba(9, 9, 11, .76);
      backdrop-filter: blur(18px);
    }
    nav {
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand { display: flex; align-items: center; gap: 12px; font-weight: 850; letter-spacing: -.03em; }
    .brand-mark {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      box-shadow: 0 12px 32px rgba(139, 92, 246, .34);
    }
    .privacy-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 13px;
      border: 1px solid rgba(34, 197, 94, .28);
      border-radius: 999px;
      color: #bbf7d0;
      background: rgba(34, 197, 94, .08);
      font-size: 13px;
      font-weight: 750;
    }
    .privacy-pill span { width: 8px; height: 8px; border-radius: 999px; background: var(--success); box-shadow: 0 0 16px rgba(34, 197, 94, .85); }
    .hero { padding: 84px 0 40px; text-align: center; }
    .eyebrow { color: #c4b5fd; font-size: 13px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
    h1 { max-width: 950px; margin: 20px auto 0; font-size: clamp(48px, 9vw, 92px); line-height: .95; letter-spacing: -.065em; }
    .gradient-text { color: transparent; background: linear-gradient(90deg, #c4b5fd, #67e8f9); background-clip: text; -webkit-background-clip: text; }
    .hero p { max-width: 720px; margin: 26px auto 0; color: #d4d4d8; font-size: clamp(17px, 2.4vw, 21px); line-height: 1.65; }
    .app-card {
      margin: 36px auto 0;
      padding: clamp(20px, 4vw, 34px);
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(20px);
      text-align: left;
    }
    .tool-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
    .tool-button {
      min-height: 84px;
      padding: 14px;
      border: 1px solid var(--line);
      border-radius: 16px;
      color: #d4d4d8;
      background: rgba(39, 39, 42, .66);
      text-align: left;
      transition: transform .18s ease, border-color .18s ease, background .18s ease;
    }
    .tool-button:hover { transform: translateY(-2px); border-color: rgba(196, 181, 253, .42); }
    .tool-button.active { color: white; border-color: rgba(139, 92, 246, .75); background: linear-gradient(145deg, rgba(139, 92, 246, .25), rgba(34, 211, 238, .08)); }
    .tool-button strong { display: block; margin-top: 8px; font-size: 14px; }
    .tool-button small { display: block; margin-top: 5px; color: var(--muted); line-height: 1.35; }
    .workspace { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(250px, .6fr); gap: 18px; margin-top: 18px; }
    .dropzone {
      min-height: 300px;
      display: grid;
      place-items: center;
      padding: 28px;
      border: 1.5px dashed rgba(196, 181, 253, .42);
      border-radius: 22px;
      background: rgba(9, 9, 11, .42);
      text-align: center;
      transition: border-color .18s ease, background .18s ease, transform .18s ease;
    }
    .dropzone.dragging { border-color: #67e8f9; background: rgba(34, 211, 238, .08); transform: scale(1.005); }
    .drop-icon { width: 66px; height: 66px; margin: 0 auto 18px; display: grid; place-items: center; border-radius: 20px; background: linear-gradient(145deg, rgba(139, 92, 246, .28), rgba(34, 211, 238, .16)); font-size: 30px; }
    .dropzone h2 { margin: 0; font-size: 24px; letter-spacing: -.03em; }
    .dropzone p { margin: 10px 0 0; color: var(--muted); line-height: 1.55; }
    .choose-button, .convert-button, .download-button {
      min-height: 48px;
      padding: 0 20px;
      border: 0;
      border-radius: 13px;
      font-weight: 850;
    }
    .choose-button { margin-top: 20px; color: #09090b; background: #fafafa; }
    .settings {
      padding: 20px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(9, 9, 11, .42);
    }
    .settings h3 { margin: 0 0 18px; font-size: 16px; }
    label { display: block; margin-top: 15px; color: #d4d4d8; font-size: 13px; font-weight: 750; }
    select {
      width: 100%;
      min-height: 46px;
      margin-top: 8px;
      padding: 0 12px;
      border: 1px solid var(--line);
      border-radius: 12px;
      color: var(--text);
      background: #27272a;
    }
    .convert-button { width: 100%; margin-top: 20px; color: white; background: linear-gradient(135deg, var(--brand), #6d28d9); box-shadow: 0 15px 35px rgba(124, 58, 237, .25); }
    .convert-button:disabled { cursor: not-allowed; opacity: .48; box-shadow: none; }
    .hint { margin-top: 14px; color: var(--muted); font-size: 12px; line-height: 1.5; }
    .file-list { display: grid; gap: 10px; margin-top: 18px; }
    .file-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 13px 15px; border: 1px solid var(--line); border-radius: 14px; background: rgba(39, 39, 42, .56); }
    .file-meta { min-width: 0; }
    .file-meta strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }
    .file-meta small { display: block; margin-top: 4px; color: var(--muted); }
    .remove-file { width: 34px; height: 34px; flex: 0 0 auto; border: 1px solid var(--line); border-radius: 10px; color: #fecaca; background: rgba(248, 113, 113, .08); }
    .status { display: none; margin-top: 18px; padding: 15px 17px; border: 1px solid var(--line); border-radius: 14px; color: #d4d4d8; background: rgba(9, 9, 11, .55); line-height: 1.5; }
    .status.show { display: block; }
    .status.error { border-color: rgba(248, 113, 113, .4); color: #fecaca; }
    .status.success { border-color: rgba(34, 197, 94, .36); color: #bbf7d0; }
    .result { display: none; margin-top: 14px; }
    .result.show { display: block; }
    .download-button { color: #052e16; background: #86efac; }
    .features { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 52px 0 80px; }
    .feature { padding: 24px; border: 1px solid var(--line); border-radius: 20px; background: rgba(24, 24, 27, .58); }
    .feature strong { display: block; font-size: 17px; }
    .feature p { margin: 10px 0 0; color: var(--muted); line-height: 1.6; }
    footer { padding: 24px 0 38px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; text-align: center; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    @media (max-width: 900px) {
      .tool-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .workspace { grid-template-columns: 1fr; }
      .features { grid-template-columns: 1fr; }
    }
    @media (max-width: 560px) {
      .shell { width: min(100% - 20px, 1180px); }
      nav { min-height: 62px; }
      .privacy-pill { display: none; }
      .hero { padding-top: 58px; }
      .tool-grid { grid-template-columns: 1fr; }
      .dropzone { min-height: 260px; padding: 20px; }
    }
  </style>
</head>
<body>
  <!-- QwenProjects is live. main / src/index.js -->
  <header>
    <nav class="shell">
      <div class="brand"><span class="brand-mark">↻</span><span>LocalConvert</span></div>
      <div class="privacy-pill"><span></span>Files stay on this device</div>
    </nav>
  </header>

  <main class="shell">
    <section class="hero">
      <div class="eyebrow">Private · Fast · Browser-based</div>
      <h1>Convert files without <span class="gradient-text">uploading them.</span></h1>
      <p>A lightweight CloudConvert-style toolkit that processes files locally in your browser. Select a converter, drop files, and download the result.</p>

      <section class="app-card" aria-label="File converter">
        <div class="tool-grid" id="toolGrid">
          <button class="tool-button active" type="button" data-tool="image"><span>🖼️</span><strong>Images</strong><small>PNG, JPEG and WebP</small></button>
          <button class="tool-button" type="button" data-tool="pdf"><span>📄</span><strong>Merge PDFs</strong><small>Combine PDF files locally</small></button>
          <button class="tool-button" type="button" data-tool="docx"><span>📝</span><strong>DOCX</strong><small>Export as HTML or text</small></button>
          <button class="tool-button" type="button" data-tool="sheet"><span>📊</span><strong>Spreadsheets</strong><small>XLSX to CSV or JSON</small></button>
          <button class="tool-button" type="button" data-tool="data"><span>⌁</span><strong>Data</strong><small>JSON and CSV conversion</small></button>
        </div>

        <div class="workspace">
          <div>
            <div class="dropzone" id="dropzone" tabindex="0" role="button" aria-label="Choose files">
              <div>
                <div class="drop-icon" id="dropIcon">🖼️</div>
                <h2 id="dropTitle">Drop an image here</h2>
                <p id="dropDescription">PNG, JPEG, WebP, GIF, BMP and SVG are supported.</p>
                <button class="choose-button" id="chooseButton" type="button">Choose file</button>
                <input class="sr-only" id="fileInput" type="file" accept="image/*">
              </div>
            </div>
            <div class="file-list" id="fileList" aria-live="polite"></div>
            <div class="status" id="status" role="status" aria-live="polite"></div>
            <div class="result" id="result"><button class="download-button" id="downloadButton" type="button">Download converted file</button></div>
          </div>

          <aside class="settings">
            <h3>Conversion settings</h3>
            <div id="settingsFields"></div>
            <button class="convert-button" id="convertButton" type="button" disabled>Convert locally</button>
            <p class="hint" id="toolHint">Image conversion uses the browser Canvas API. Animated images are exported as a single frame.</p>
          </aside>
        </div>
      </section>
    </section>

    <section class="features">
      <article class="feature"><strong>Nothing is uploaded</strong><p>Conversion happens in browser memory. The Worker serves the application but never receives your selected files.</p></article>
      <article class="feature"><strong>Loads libraries only when needed</strong><p>PDF, DOCX and spreadsheet libraries are fetched only after selecting the relevant converter.</p></article>
      <article class="feature"><strong>Direct download</strong><p>The converted output is generated as a local Blob and downloaded immediately from your browser.</p></article>
    </section>
  </main>

  <footer><div class="shell">LocalConvert runs directly at this Worker URL. API health is available at <code>/api</code>.</div></footer>

  <script>
    (() => {
      'use strict';

      const tools = {
        image: {
          icon: '🖼️',
          title: 'Drop an image here',
          description: 'PNG, JPEG, WebP, GIF, BMP and SVG are supported.',
          accept: 'image/*,.svg,.bmp',
          multiple: false,
          hint: 'Image conversion uses the browser Canvas API. Animated images are exported as a single frame.',
          options: [
            ['imageFormat', 'Output format', [['png', 'PNG'], ['jpeg', 'JPEG'], ['webp', 'WebP']]],
            ['imageQuality', 'Quality', [['0.92', 'High (92%)'], ['0.8', 'Balanced (80%)'], ['0.65', 'Small file (65%)']]]
          ]
        },
        pdf: {
          icon: '📄',
          title: 'Drop PDF files here',
          description: 'Select two or more PDF files and arrange them in selection order.',
          accept: 'application/pdf,.pdf',
          multiple: true,
          hint: 'PDF merging uses PDF-Lib and runs entirely in browser memory.',
          options: []
        },
        docx: {
          icon: '📝',
          title: 'Drop a DOCX file here',
          description: 'Convert a Microsoft Word document to clean HTML or plain text.',
          accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          multiple: false,
          hint: 'DOCX conversion uses Mammoth and loads only after conversion starts.',
          options: [
            ['docxFormat', 'Output format', [['html', 'HTML'], ['txt', 'Plain text']]]
          ]
        },
        sheet: {
          icon: '📊',
          title: 'Drop a spreadsheet here',
          description: 'Convert the first worksheet from XLSX or XLS to CSV or JSON.',
          accept: '.xlsx,.xls,.ods',
          multiple: false,
          hint: 'Spreadsheet conversion uses SheetJS and processes the workbook locally.',
          options: [
            ['sheetFormat', 'Output format', [['csv', 'CSV'], ['json', 'JSON']]]
          ]
        },
        data: {
          icon: '⌁',
          title: 'Drop a JSON or CSV file here',
          description: 'Convert structured data between JSON and CSV.',
          accept: '.json,.csv,application/json,text/csv',
          multiple: false,
          hint: 'JSON and CSV conversion uses built-in JavaScript only.',
          options: [
            ['dataFormat', 'Output format', [['auto', 'Detect opposite format'], ['json', 'JSON'], ['csv', 'CSV']]]
          ]
        }
      };

      const state = { tool: 'image', files: [], output: null, outputName: '' };
      const toolGrid = document.getElementById('toolGrid');
      const dropzone = document.getElementById('dropzone');
      const dropIcon = document.getElementById('dropIcon');
      const dropTitle = document.getElementById('dropTitle');
      const dropDescription = document.getElementById('dropDescription');
      const chooseButton = document.getElementById('chooseButton');
      const fileInput = document.getElementById('fileInput');
      const fileList = document.getElementById('fileList');
      const settingsFields = document.getElementById('settingsFields');
      const convertButton = document.getElementById('convertButton');
      const toolHint = document.getElementById('toolHint');
      const status = document.getElementById('status');
      const result = document.getElementById('result');
      const downloadButton = document.getElementById('downloadButton');

      function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
      }

      function formatBytes(bytes) {
        if (!Number.isFinite(bytes) || bytes === 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB'];
        const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
        return (bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0) + ' ' + units[index];
      }

      function setStatus(message, kind) {
        status.textContent = message;
        status.className = 'status show' + (kind ? ' ' + kind : '');
      }

      function clearStatus() {
        status.textContent = '';
        status.className = 'status';
      }

      function clearOutput() {
        if (state.output) URL.revokeObjectURL(state.output);
        state.output = null;
        state.outputName = '';
        result.className = 'result';
      }

      function renderSettings() {
        const config = tools[state.tool];
        settingsFields.innerHTML = config.options.map(option => {
          const id = option[0];
          const label = option[1];
          const values = option[2];
          return '<label for="' + id + '">' + escapeHtml(label) + '</label><select id="' + id + '">' + values.map(value => '<option value="' + escapeHtml(value[0]) + '">' + escapeHtml(value[1]) + '</option>').join('') + '</select>';
        }).join('');
      }

      function renderFiles() {
        fileList.innerHTML = state.files.map((file, index) => '<div class="file-row"><div class="file-meta"><strong>' + escapeHtml(file.name) + '</strong><small>' + formatBytes(file.size) + '</small></div><button class="remove-file" type="button" data-index="' + index + '" aria-label="Remove ' + escapeHtml(file.name) + '">×</button></div>').join('');
        convertButton.disabled = !state.files.length || (state.tool === 'pdf' && state.files.length < 2);
      }

      function activateTool(tool) {
        if (!tools[tool]) return;
        state.tool = tool;
        state.files = [];
        clearOutput();
        clearStatus();
        const config = tools[tool];
        document.querySelectorAll('.tool-button').forEach(button => button.classList.toggle('active', button.dataset.tool === tool));
        dropIcon.textContent = config.icon;
        dropTitle.textContent = config.title;
        dropDescription.textContent = config.description;
        fileInput.accept = config.accept;
        fileInput.multiple = config.multiple;
        fileInput.value = '';
        toolHint.textContent = config.hint;
        renderSettings();
        renderFiles();
      }

      function addFiles(files) {
        clearOutput();
        clearStatus();
        const config = tools[state.tool];
        const selected = Array.from(files || []);
        state.files = config.multiple ? selected : selected.slice(0, 1);
        renderFiles();
      }

      function optionValue(id, fallback) {
        const element = document.getElementById(id);
        return element ? element.value : fallback;
      }

      function baseName(filename) {
        const index = filename.lastIndexOf('.');
        return index > 0 ? filename.slice(0, index) : filename;
      }

      function saveResult(blob, filename) {
        clearOutput();
        state.output = URL.createObjectURL(blob);
        state.outputName = filename;
        downloadButton.textContent = 'Download ' + filename;
        result.className = 'result show';
        setStatus('Conversion complete. The result is ready to download.', 'success');
      }

      function loadScript(url, globalName) {
        if (globalName && window[globalName]) return Promise.resolve(window[globalName]);
        return new Promise((resolve, reject) => {
          const existing = document.querySelector('script[data-source="' + url + '"]');
          if (existing) {
            existing.addEventListener('load', () => resolve(globalName ? window[globalName] : true), { once: true });
            existing.addEventListener('error', () => reject(new Error('Could not load the conversion library.')), { once: true });
            return;
          }
          const script = document.createElement('script');
          script.src = url;
          script.async = true;
          script.dataset.source = url;
          script.onload = () => resolve(globalName ? window[globalName] : true);
          script.onerror = () => reject(new Error('Could not load the conversion library. Check your network connection and try again.'));
          document.head.appendChild(script);
        });
      }

      async function convertImage(file) {
        const format = optionValue('imageFormat', 'png');
        const quality = Number(optionValue('imageQuality', '0.92'));
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d', { alpha: format !== 'jpeg' });
        if (!context) throw new Error('Canvas conversion is unavailable in this browser.');
        if (format === 'jpeg') {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(bitmap, 0, 0);
        bitmap.close();
        const mime = format === 'jpeg' ? 'image/jpeg' : 'image/' + format;
        const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Image conversion failed.')), mime, quality));
        saveResult(blob, baseName(file.name) + '.' + (format === 'jpeg' ? 'jpg' : format));
      }

      async function mergePdfs(files) {
        await loadScript('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js', 'PDFLib');
        const output = await window.PDFLib.PDFDocument.create();
        for (let index = 0; index < files.length; index += 1) {
          setStatus('Reading PDF ' + (index + 1) + ' of ' + files.length + '…');
          const source = await window.PDFLib.PDFDocument.load(await files[index].arrayBuffer());
          const pages = await output.copyPages(source, source.getPageIndices());
          pages.forEach(page => output.addPage(page));
        }
        const bytes = await output.save();
        saveResult(new Blob([bytes], { type: 'application/pdf' }), 'merged.pdf');
      }

      async function convertDocx(file) {
        await loadScript('https://cdn.jsdelivr.net/npm/mammoth@1.10.0/mammoth.browser.min.js', 'mammoth');
        const format = optionValue('docxFormat', 'html');
        const input = { arrayBuffer: await file.arrayBuffer() };
        const converted = format === 'txt' ? await window.mammoth.extractRawText(input) : await window.mammoth.convertToHtml(input);
        const mime = format === 'txt' ? 'text/plain;charset=utf-8' : 'text/html;charset=utf-8';
        const body = format === 'txt' ? converted.value : '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escapeHtml(baseName(file.name)) + '</title></head><body>' + converted.value + '</body></html>';
        saveResult(new Blob([body], { type: mime }), baseName(file.name) + '.' + format);
      }

      async function convertSheet(file) {
        await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'XLSX');
        const workbook = window.XLSX.read(await file.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) throw new Error('The workbook does not contain a worksheet.');
        const sheet = workbook.Sheets[sheetName];
        const format = optionValue('sheetFormat', 'csv');
        const content = format === 'json' ? JSON.stringify(window.XLSX.utils.sheet_to_json(sheet, { defval: null }), null, 2) : window.XLSX.utils.sheet_to_csv(sheet);
        const mime = format === 'json' ? 'application/json;charset=utf-8' : 'text/csv;charset=utf-8';
        saveResult(new Blob([content], { type: mime }), baseName(file.name) + '.' + format);
      }

      function csvEscape(value) {
        const text = value == null ? '' : String(value);
        return /[",\n\r]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
      }

      function jsonToCsv(value) {
        const rows = Array.isArray(value) ? value : [value];
        if (!rows.length) return '';
        const objects = rows.map(row => row && typeof row === 'object' && !Array.isArray(row) ? row : { value: row });
        const headers = Array.from(new Set(objects.flatMap(row => Object.keys(row))));
        return [headers.map(csvEscape).join(','), ...objects.map(row => headers.map(header => csvEscape(row[header])).join(','))].join('\n');
      }

      function parseCsv(text) {
        const rows = [];
        let row = [];
        let field = '';
        let quoted = false;
        for (let index = 0; index < text.length; index += 1) {
          const char = text[index];
          if (quoted) {
            if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
            else if (char === '"') quoted = false;
            else field += char;
          } else if (char === '"') quoted = true;
          else if (char === ',') { row.push(field); field = ''; }
          else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
          else if (char !== '\r') field += char;
        }
        row.push(field);
        if (row.length > 1 || row[0] !== '' || !rows.length) rows.push(row);
        const headers = rows.shift() || [];
        return rows.filter(values => values.some(value => value !== '')).map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] == null ? '' : values[index]])));
      }

      async function convertData(file) {
        const text = await file.text();
        let format = optionValue('dataFormat', 'auto');
        const sourceIsJson = file.name.toLowerCase().endsWith('.json') || file.type === 'application/json';
        if (format === 'auto') format = sourceIsJson ? 'csv' : 'json';
        if (format === 'csv') {
          const parsed = JSON.parse(text);
          saveResult(new Blob([jsonToCsv(parsed)], { type: 'text/csv;charset=utf-8' }), baseName(file.name) + '.csv');
        } else {
          const parsed = sourceIsJson ? JSON.parse(text) : parseCsv(text);
          saveResult(new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json;charset=utf-8' }), baseName(file.name) + '.json');
        }
      }

      async function convert() {
        if (!state.files.length) return;
        clearOutput();
        convertButton.disabled = true;
        setStatus('Converting locally…');
        try {
          if (state.tool === 'image') await convertImage(state.files[0]);
          else if (state.tool === 'pdf') await mergePdfs(state.files);
          else if (state.tool === 'docx') await convertDocx(state.files[0]);
          else if (state.tool === 'sheet') await convertSheet(state.files[0]);
          else if (state.tool === 'data') await convertData(state.files[0]);
        } catch (error) {
          console.error(error);
          setStatus(error && error.message ? error.message : 'The conversion failed.', 'error');
        } finally {
          convertButton.disabled = !state.files.length || (state.tool === 'pdf' && state.files.length < 2);
        }
      }

      toolGrid.addEventListener('click', event => {
        const button = event.target.closest('.tool-button');
        if (button) activateTool(button.dataset.tool);
      });
      chooseButton.addEventListener('click', event => { event.stopPropagation(); fileInput.click(); });
      dropzone.addEventListener('click', event => { if (!event.target.closest('button')) fileInput.click(); });
      dropzone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fileInput.click(); } });
      fileInput.addEventListener('change', () => addFiles(fileInput.files));
      ['dragenter', 'dragover'].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.add('dragging'); }));
      ['dragleave', 'drop'].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove('dragging'); }));
      dropzone.addEventListener('drop', event => addFiles(event.dataTransfer.files));
      fileList.addEventListener('click', event => {
        const button = event.target.closest('.remove-file');
        if (!button) return;
        state.files.splice(Number(button.dataset.index), 1);
        clearOutput();
        renderFiles();
      });
      convertButton.addEventListener('click', convert);
      downloadButton.addEventListener('click', () => {
        if (!state.output) return;
        const link = document.createElement('a');
        link.href = state.output;
        link.download = state.outputName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
      window.addEventListener('beforeunload', clearOutput);
      activateTool('image');
    })();
  </script>
</body>
</html>`;

const NOT_FOUND_PAGE = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found</title><style>body{font-family:system-ui;margin:0;min-height:100vh;display:grid;place-items:center;background:#09090b;color:#fafafa}main{text-align:center}a{color:#c4b5fd}</style></head><body><main><h1>404</h1><p>The requested page was not found.</p><a href="/">Open LocalConvert</a></main></body></html>';

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
  return response(JSON.stringify(body), 'application/json; charset=utf-8', request, init);
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
          application: 'LocalConvert',
          branch: 'main',
          timestamp: new Date().toISOString()
        },
        request
      );
    }

    return response(NOT_FOUND_PAGE, 'text/html; charset=utf-8', request, { status: 404 });
  }
};
