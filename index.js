var express = require('express'); //require express
var app = express();
//var server = app.listen(8080); //on computer
var server = app.listen(788); //on BB
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
  //res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/index.html");
  res.sendFile("/root/webserver/index.html"); //to read on BB
});

app.get('/nipples',function(req,res){
  //res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/test/index1.html");
  res.sendFile("/root/webserver/test/index1.html"); //to read on BB
});

app.post('/timelapse/login',function (req, res) {
  var hour=req.body.hour;
  var minute=req.body.minute;
  var second=req.body.second;
  var ips=req.body.ips;

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

    console.log(msg);

    if(isNumber(msg)) {
       if(precisionRound((msg*1000)/2000, 1) > 1.5) number = "1.5"
       else number = String(precisionRound((msg*1000)/2000, 1));
     }
     else dir = msg;


    if(msg == "forward") fs.writeFileSync("moteur1.txt", "1", "UTF-8", "w");
    else if(msg == "backward") fs.writeFileSync("moteur1.txt", "-1", "UTF-8","w");

    if(typeof angle !== 'undefined') {

      mode = "w"; //writing
      if(dir == "left"){
        write = "-"+ number;
        file = "moteur2.txt";
        }
      else if(dir == "right"){
        write = "+"+ number;
        file = "moteur2.txt";
        }
      else if(dir == "down") {
        write = "-"+ number;
        file = "moteur3.txt";
        }
      else if(dir == "up"){
        write = "+"+ number;
        file = "moteur3.txt";
        }
      else console.log("error");

      fs.writeFileSync(file, write, "UTF-8",mode);
    }

  });
});
