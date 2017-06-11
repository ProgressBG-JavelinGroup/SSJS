var http = require('http');

var post_req  = null,
    post_data = '{"login":"toto","password":"okay","duration":"9999"}';

var post_options = {
    hostname: '127.0.0.1',
    port    : '3000',
    path    : '/',
    method  : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': post_data.length
    }
};

post_req = http.request(post_options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
    });
});

post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

post_req.write(post_data);
post_req.end();