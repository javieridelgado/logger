var express = require('express');
var app = express();

app.use(function(req, res, next) {
  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.body = data;
    next();
  });
});

app.get('/', function(req, res) {
  res.send('Hello World!');
  console.log(req.body);
});

app.post('/', function(req, res) {
  res.send('Logged');
  console.log(req.body);
});

app.put('/', function(req, res) {
  res.send('Logged');
  console.log(req.body);
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
