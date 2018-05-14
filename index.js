//do not forget to "npm install"

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
  //res.sendFile("/root/webserver/index.html"); //to read on BB
});

app.get('/nipples',function(req,res){
  res.sendFile("/Users/antoineleguern/Documents/rail/webServer-master/test/index1.html");
  //res.sendFile("/root/webserver/test/index1.html"); //to read on BB
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

    //console.log(msg);
    if(msg < 4) {
      if(precisionRound((msg*1000)/2000, 1) > 1.5) number = "1.5"
      else number = String(precisionRound((msg*1000)/2000, 1));
      //force = msg;
      //console.log("force : " + msg)
    }
    else if (msg >= 4) angle = msg;
    //else console.log("direction : " + msg);

    //écriture dans un fichier en node
    /*
    if(isNumber(msg)) {

    }
    else dir = msg;
*/
    if(typeof angle !== 'undefined') {

      mode = "w"; //writing

      if(angle >= 0 && angle <= 30 || angle >= 330 && angle <= 360){
        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle > 30 && angle < 60){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle >= 60 && angle <= 120){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle > 120 && angle < 150){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle >= 150 && angle <= 210){
        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle > 210 && angle < 240){
        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle >= 240 && angle <= 300) {
        write = "-"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle > 300 && angle < 330) {
        write = "-"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }

      else {
        console.log("error");
        console.log(angle);
      };
    }

    //écriture dans un fichier en py
    /*if(isNumber(msg)) python(String(Math.trunc(msg*100)),0,0,0);
    else python(msg,0,0,0);*/

  });
});


io.on('connection', function(socket){
  socket.on('chat message2', function(msg){
    io.emit('chat message2', msg);

    console.log(msg);

/*

    //console.log(msg);
    if(msg < 4) {
      if(precisionRound((msg*1000)/2000, 1) > 1.5) number = "1.5"
      else number = String(precisionRound((msg*1000)/2000, 1));
      //force = msg;
      //console.log("force : " + msg)
    }
    else if (msg >= 4) angle = msg;
    //else console.log("direction : " + msg);

    //écriture dans un fichier en node
    /*
    if(isNumber(msg)) {

    }
    else dir = msg;
////////
    if(typeof angle !== 'undefined') {

      mode = "w"; //writing

      if(angle >= 0 && angle <= 30 || angle >= 330 && angle <= 360){
        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle > 30 && angle < 60){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle >= 60 && angle <= 120){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle > 120 && angle < 150){
        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle >= 150 && angle <= 210){
        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }
      else if(angle > 210 && angle < 240){
        write = "-"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle >= 240 && angle <= 300) {
        write = "-"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);
      }
      else if(angle > 300 && angle < 330) {
        write = "-"+ number;
        fs.writeFileSync("moteur3.txt", write, "UTF-8",mode);

        write = "+"+ number;
        fs.writeFileSync("moteur2.txt", write, "UTF-8",mode);
      }

      else {
        console.log("error");
        console.log(angle);
      };
    }

    //écriture dans un fichier en py
    /*if(isNumber(msg)) python(String(Math.trunc(msg*100)),0,0,0);
    else python(msg,0,0,0);*/

  });
});
