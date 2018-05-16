var express = require('express'); //require express
var app = express();
var server = app.listen(8080); //on computer
//var server = app.listen(788); //on BB
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser'); //require bodyParser
const isNumber = require('is-number'); //number
var math = require('mathjs');
//var pyshell = new PythonShell('script3.py');
var fs = require("fs");

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
    extended: false
}));

app.get('/timelapse',function(req,res){
  res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/index.html");
  //res.sendFile("/root/webServer/index.html"); //to read on BB
});

app.get('/nipples',function(req,res){
  res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/test/index1.html");
  //res.sendFile("/root/webServer/test/index1.html"); //to read on BB
});

app.post('/timelapse/login',function (req, res) {
  var hour=req.body.hour;
  var minute=req.body.minute;
  var second=req.body.second;
  var ips=req.body.ips;

  write = hour*3600+minute*60+second

  fs.writeFileSync("", write, "UTF-8","w");
  res.redirect('/timelapse')
})

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);

    if(isNumber(msg)) {
       if(precisionRound((msg*1000)/2000, 1) > 1.5) number = "1.5"
       else number = String(precisionRound((msg*1000)/2000, 1));
     }
     else dir = msg;

    if(msg.includes("s")){
      var num = msg.split(" ");
      fs.writeFileSync("moteur1.txt", num[1], "UTF-8", "w");
    }

    if(msg == "start") fs.writeFileSync("mode.txt", "1", "UTF-8","w");
    else if(msg == "stop"){
      fs.writeFileSync("mode.txt", "0", "UTF-8","w");
      fs.writeFileSync("moteur1.txt", "0", "UTF-8","w");
      fs.writeFileSync("moteur2.txt", "0", "UTF-8","w");
      fs.writeFileSync("moteur3.txt", "0", "UTF-8","w");
    }

    if(typeof dir !== 'undefined') {
      if(dir == "left"){
        fs.writeFileSync("moteur2.txt","-"+ number, "UTF-8","w");
        }
      else if(dir == "right"){
        fs.writeFileSync("moteur2.txt","+"+ number, "UTF-8","w");
        }
      else if(dir == "down") {
        fs.writeFileSync("moteur3.txt","-"+ number, "UTF-8","w");
        }
      else if(dir == "up"){
        fs.writeFileSync("moteur3.txt","+"+ number, "UTF-8","w");
        }
      else {}
    }
  });
});
