const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5000;

// Load HTML files
const home = fs.readFileSync('index3.html');
const about = fs.readFileSync('about.html');
const contact = fs.readFileSync('contactus.html');
const dashboard = fs.readFileSync('dashboard.html');
const loginn = fs.readFileSync('login.html');
const signup = fs.readFileSync('signup.html');

const server = http.createServer((req, res) => {
    console.log(`Request URL: ${req.url}`);
    const url = req.url;

    // Define content types for different file extensions
    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon'
    };

    // Handle predefined routes for HTML files
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(home);
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(about);
    } else if (url === '/contactus') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contact);
    } else if (url === '/dashboard') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dashboard);
    } else if (url === '/login') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(loginn);
    } else if (url === '/signup') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(signup);
    } else {
        // Handle static files (images, etc.)
        const filePath = path.join(__dirname, url); // Map URL to file path (e.g., /assets/images/python.png)
        const extname = path.extname(filePath).toLowerCase();

        // If the URL doesn't match a predefined route, try to serve a static file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Serve the file with the correct Content-Type
                const contentType = contentTypeMap[extname] || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});