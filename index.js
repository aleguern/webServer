//do not forget to "npm install"

var express = require('express'); //require express
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser'); //require bodyParser
var PythonShell = require('python-shell');
var pyshell = new PythonShell('script3.py');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

app.get('/timelapse',function(req,res){
  res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/index.html");
});

app.get('/nipples',function(req,res){
  res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/test/index1.html");
});

app.post('/timelapse/login',function (req, res) {
  var hour=req.body.hour;
  var minute=req.body.minute;
  var second=req.body.second;
  var ips=req.body.ips;

  //start.js
  var spawn = require('child_process').spawn,
      py    = spawn('python', ['script3.py']),
      data = [hour,minute,second,ips],
      dataString = '';

  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    console.log(dataString);
  });
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();

  res.redirect('/timelapse')
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('chat message', msg);
  });
});
