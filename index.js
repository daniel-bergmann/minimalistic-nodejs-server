const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {


    //  This is not dynamic
    //  below you can find a dynamic example

    // Checking the url
    // if (req.url === '/') {
    //     // if true - Read the file in the public folder
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         // Checking for errors first
    //         if (err) throw err;
    //         // Set status as 200, and set the content type
    //         // Displaying content in the public folder
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         // serve the data(HTML page)
    //         res.end(data);
    //     });
    // }



////////////////////////////////////////////////////////////////
        // The about page

        // Checking the url
    // if (req.url === '/about') {
    //     // if true - Read the file in the public folder
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
    //         // Checking for errors first
    //         if (err) throw err;
    //         // Set status as 200, and set the content type
    //         // Displaying content in the public folder
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         // serve the data(HTML page)
    //         res.end(data);
    //     });   
    // }



////////////////////////////////////////////////////////////////
        //  Making an API
        // if (req.url === '/api/users') {
        //         const users = [
        //             { 
        //                 name: 'Jimi Hendrix',
        //                 age: 27
        //             },
        //             { 
        //                 name: 'Eric Clapton',
        //                 age: 75
        //             },
        //         ];
        //         res.writeHead(200, { 'Content-Type': 'application/json' });
        //         res.end(JSON.stringify(users));
        // }
    

        ////////////////////////////////////////////////////////////////
        //  Making a dynamic filepath

        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

        // Extension of file
        let extname = path.extname(filePath);

        // initial content type
        let contentType = 'text/html';

        // check ext and set content type
        switch(extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }

        // Read file
        fs.readFile(filePath, (err, content) => {
            if(err) {
                if(err.code == 'ENOENT') { //ENOENT means page not found
                    // page not found
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    })
                } else {
                    // some server error
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                    // success
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf8');
                }
            
        });


});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));