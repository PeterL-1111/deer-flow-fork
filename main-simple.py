#!/usr/bin/env python3
"""
Simplified main entry point for Unghost Agent
This version avoids asyncio and uses basic HTTP server functionality
"""

import sys
import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import threading
import time

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {'status': 'healthy', 'message': 'Unghost Agent is running'}
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {'error': 'Not found'}
            self.wfile.write(json.dumps(response).encode())
    
    def do_POST(self):
        self.send_response(501)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {'error': 'Not implemented in simple mode'}
        self.wfile.write(json.dumps(response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server():
    port = int(os.environ.get('PORT', 8000))
    server = HTTPServer(('0.0.0.0', port), SimpleHandler)
    print(f"Starting simple HTTP server on port {port}")
    print("This is a fallback server that avoids asyncio dependencies")
    print("For full functionality, ensure Python has complete standard library")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.shutdown()

if __name__ == "__main__":
    run_server()