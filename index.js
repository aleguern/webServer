//do not forget to "npm install"

var express = require('express'); //require express
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser'); //require bodyParser
const isNumber = require('is-number'); //number
var math = require('mathjs');
//var pyshell = new PythonShell('script3.py');
var fs = require("fs");

/*
function python(arg1, arg2, arg3, arg4){

  var spawn = require('child_process').spawn,
      py    = spawn('python', ['script3.py']),
      data = [arg1, arg2, arg3, arg4],
      dataString = '';

  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    //console.log(dataString);
  });
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();
}*/

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

  //écriture dans un fichier en py
  //python(hour,minute,second,ips);

  write = hour*3600+minute*60+second

  fs.writeFileSync("timelapse", write, "UTF-8","w");
  res.redirect('/timelapse')
})

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);

    //écriture dans un fichier en node
    if(isNumber(msg)) {
      if(precisionRound((msg*1000)/2000, 1) > 1.5) number = "1.5"
      else number = String(precisionRound((msg*1000)/2000, 1));
    }
    else dir = msg;

    if(typeof dir !== 'undefined') {

      mode = "w"; //writing
      if(dir == "left"){
        write = "-1 "+ number;
        file = "moteur2.txt";
      }
      else if(dir == "right"){
        write = "+1 "+ number;
        file = "moteur2.txt";
      }
      else if(dir == "down") {
        write = "-1 "+ number;
        file = "moteur3.txt";
      }
      else if(dir == "up"){
        write = "+1 "+ number;
        file = "moteur3.txt";
      }
      else console.log("error");

      fs.writeFileSync(file, write, "UTF-8",mode);
    }

    //écriture dans un fichier en py
    /*if(isNumber(msg)) python(String(Math.trunc(msg*100)),0,0,0);
    else python(msg,0,0,0);*/

  });
});
