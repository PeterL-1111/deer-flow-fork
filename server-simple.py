"""
Simplified server script for running the Unghost Agent API.
This version uses only standard library and minimal dependencies.
"""

import argparse
import logging
import os
import sys
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/config':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            config = {
                "rag": {"provider": None},
                "models": {
                    "basic": ["gpt-3.5-turbo"],
                    "reasoning": []
                }
            }
            
            self.wfile.write(json.dumps(config).encode())
            return
            
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b'Not Found')

    def do_POST(self):
        """Handle POST requests"""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/chat/stream':
            self.send_response(200)
            self.send_header('Content-type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Send a simple response
            event_data = {
                "thread_id": "simple-thread",
                "agent": "planner",
                "id": "msg-123",
                "role": "assistant",
                "content": "This is a simplified server response. The full Unghost Agent requires additional setup.",
                "finish_reason": "stop"
            }
            
            self.wfile.write(f"event: message_chunk\ndata: {json.dumps(event_data)}\n\n".encode())
            self.wfile.flush()
            return
            
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b'Not Found')
        
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(host='localhost', port=8000):
    """Run the simple HTTP server"""
    server_address = (host, port)
    httpd = HTTPServer(server_address, SimpleHandler)
    logger.info(f"Starting simple server on {host}:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")
    finally:
        httpd.server_close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run a simple Unghost Agent API server")
    parser.add_argument('--host', type=str, default='localhost', help='Host to bind the server to')
    parser.add_argument('--port', type=int, default=8000, help='Port to bind the server to')
    
    args = parser.parse_args()
    run_server(args.host, args.port)