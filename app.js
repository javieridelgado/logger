var express = require('express');
var https = require("https");
var app = express();

var options = {
  hostname: 'wd3-impl-services1.workday.com',
  port: 443,
  path: '/ccx/service/verisure1/Human_Resources/v31.2'
}

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
  var data = '';

  options.method = 'GET';

  console.log(options.method);
  console.log(req.body);

  var wdayCall = https.request(options, (r) => {
    console.log(`statusCode: ${r.statusCode}`)

    r.on('data', (d) => {
      data += d;
    });

    r.on('end', function() {
      console.log('response: ' + data);
      res.send(data);
    });
  });
});

app.post('/', function(req, res) {
  var data = '';

  options.method = 'POST';

  console.log(options.method);
  console.log(req.body);

  var wdayCall = https.request(options, (r) => {
    console.log(`statusCode: ${r.statusCode}`)

    r.on('data', (d) => {
      data += d;
    });

    r.on('end', function() {
      console.log('response: ' + data);
      res.send(data);
    });
  });

  wdayCall.on('error', (error) => {
    console.error(error)
  })

  wdayCall.write(req.body);
  wdayCall.end();
});

app.put('/', function(req, res) {
  var data = '';

  options.method = 'PUT';

  console.log(options.method);
  console.log(req.body);

  var wdayCall = https.request(options, (r) => {
    console.log(`statusCode: ${r.statusCode}`)

    r.on('data', (d) => {
      console.log('receiving data: ' + d);
      data += d;
    });

    r.on('end', function() {
      console.log('response: ' + data);
      res.send(data);
    });
  });

  wdayCall.on('error', (error) => {
    console.error(error)
  })

  wdayCall.write(req.body);
  wdayCall.end();
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});