const express = require('express');

const httpProxy = require('http-proxy');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const backendApi = {
    prod: 'http://tacticalbeard39.com/'
};

const apiForwardingUrl = backendApi.prod;

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
const proxyOptions = {
    changeOrigin: true,

    secure: false
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

const apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Node express server setup.

const server = express();

const serverPort = 8042;

server.set('port', serverPort);

const staticResourcesDir = 'web';

server.use(express.static(path.join(__dirname, staticResourcesDir)));

server.all('/api|index.php/*', function (req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.get('*', function (req, res) {
    if (req.method === 'GET') {
        try {
            fs.accessSync(path.join(__dirname, staticResourcesDir, req.path));
        } catch (error) {
            console.error('File path: ', path.join(__dirname, staticResourcesDir, req.path));

            console.log('Request "' + req.path + '" can not be served as a static file. Redirecting to index.html');

            res.sendFile(path.join(__dirname, staticResourcesDir, 'index.html'));
        }
    }
});

server.use(bodyParser.json());

server.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

// Start Server.

server.listen(serverPort, function () {
    console.log('Express server listening on port ' + serverPort);
});