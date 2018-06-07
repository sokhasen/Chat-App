const socket = require('socket.io');
const http = require('http');
// SERVER HANDLING
const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var fs = require("fs");
        fs.readFile(__dirname + "/public/index.html", "utf8", (err, html) => {
            if (err) throw err;
            res.end(html);
        });
    });

// SOCKET HANDLING
const io = socket(server);
io.on('connection', function(client){
    // console.log("connected socket", client.id);
    client.on('chat', function(data){
        console.log(data);
        // client.emit('chat', data);
        client.broadcast.emit('chat', data);
    });
    // client.on('disconnect', function(){});
});
server.listen(3000,  () => {
    console.log("Server on http://localhost:3000");
});
