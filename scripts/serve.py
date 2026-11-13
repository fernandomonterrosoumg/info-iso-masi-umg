"""Servidor de desarrollo local: publica solo el tablero y sus recursos."""
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def configuration():
    values = {}
    env = ROOT / '.env'
    if env.exists():
        for line in env.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                values[key.strip()] = value.strip().strip('"\'')
    return {**values, **os.environ}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path == '/config.json':
            body = json.dumps({'apiUrl': SETTINGS.get('DATA_API_URL', ''),
                               'authUrl': SETTINGS.get('AUTH_URL', '')}).encode()
            mime = 'application/json'
        else:
            files = {
                '/': ('tablero_iso27001_2.html', 'text/html; charset=utf-8'),
                '/tablero_iso27001_2.html': ('tablero_iso27001_2.html', 'text/html; charset=utf-8'),
                '/assets/css/tablero.css': ('assets/css/tablero.css', 'text/css; charset=utf-8'),
                '/assets/js/tablero.js': ('assets/js/tablero.js', 'text/javascript; charset=utf-8'),
            }
            if path not in files:
                self.send_error(404)
                return
            filename, mime = files[path]
            body = (ROOT / filename).read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('X-Frame-Options', 'DENY')
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    SETTINGS = configuration()
    port = int(SETTINGS.get('PORT', '8000'))
    print(f'Tablero disponible en http://127.0.0.1:{port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
