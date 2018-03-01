var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/',function (req, res) {
  var hour=req.body.hour;
  var minute=req.body.minute;
  var second=req.body.second;
  console.log(hour+" h : "+minute+" m : "+second+" s");
})

app.listen(3000);
