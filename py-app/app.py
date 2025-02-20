from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Author", "me")
        self.end_headers()
        self.wfile.write(b"Hello, again!")

def run(server_class=HTTPServer, handler_class=MyHandler, port=8000):
        server_address = ('', port)
        httpd = server_class(server_address, handler_class)
        print(f"Starting httpd server on port {port}")
        httpd.serve_forever()

if __name__ == '__main__':
    run()

