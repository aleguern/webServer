//do not forget to "npm install"

var express = require('express'); //require express
var app = express();
var bodyParser = require('body-parser'); //require bodyParser

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

app.get('/timelapse',function(req,res){
  res.sendfile("index.html");
});

app.post('/timelapse/login',function (req, res) {
  var hour=req.body.hour;
  var minute=req.body.minute;
  var second=req.body.second;
  var ips=req.body.ips;

  var spawn = require("child_process").spawn;
  var pythonProcess=spawn('python',["hello.py"]);

  pythonProcess.stdout.on('data',function(data){
      console.log('miaou');
  })

  console.log(hour+" h : "+minute+" m : "+second+" s : "+ips+" ips");
  res.redirect('/timelapse')
})

app.listen(3000);
