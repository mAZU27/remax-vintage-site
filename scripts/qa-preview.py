"""Serve a built site on loopback with a fake lead endpoint. NEVER forwards data.

Usage: python3 scripts/qa-preview.py
Set next response: curl http://127.0.0.1:4322/__qa__/failure (or success/unconfirmed)
An event receipt is appended to the DOM for browser assertions only.
"""
import http.server
import json
import pathlib
from urllib.parse import urlsplit, unquote

ROOT = (pathlib.Path(__file__).resolve().parents[1] / 'dist/client').resolve()
MODE = 'failure'
RECEIPT = b'''<script>window.addEventListener('vintage:measurement',function(e){var o=document.createElement('output');o.hidden=true;o.className='qa-measurement';o.textContent=JSON.stringify(e.detail);document.body.appendChild(o);});</script>'''

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        global MODE
        path = unquote(urlsplit(self.path).path)
        if path.startswith('/__qa__/'):
            mode = path.rsplit('/', 1)[1]
            if mode not in ('failure', 'success', 'unconfirmed'):
                self.send_error(400); return
            MODE = mode
            self.send_response(200); self.end_headers(); self.wfile.write(mode.encode()); return
        file = (ROOT / path.lstrip('/')).resolve()
        if not file.is_relative_to(ROOT):
            self.send_error(403); return
        if file.is_dir(): file /= 'index.html'
        if not file.exists():
            self.send_html(ROOT / '404.html', 404); return
        if file.suffix == '.html':
            self.send_html(file, 200); return
        super().do_GET()

    def send_html(self, file, status):
        body = file.read_bytes().replace(b'</head>', RECEIPT + b'</head>')
        self.send_response(status)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('X-Robots-Tag', 'noindex')
        self.end_headers(); self.wfile.write(body)

    def do_POST(self):
        if self.path != '/api/lead': self.send_error(404); return
        body = self.rfile.read(int(self.headers.get('Content-Length', 0)))
        try: payload = json.loads(body)
        except ValueError: self.send_error(400); return
        # Inspect shape, never retain personal values or forward requests.
        print(json.dumps({'form': payload.get('form'), 'fields': sorted(payload), 'mode': MODE}), flush=True)
        self.send_response(502 if MODE == 'failure' else 200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers(); self.wfile.write(json.dumps({'delivered': MODE == 'success'}).encode())

http.server.ThreadingHTTPServer(('127.0.0.1', 4322), Handler).serve_forever()
