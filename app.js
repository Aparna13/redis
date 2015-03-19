var express = require("express"),
app = express(),
redis = require("redis"),
client = redis.createClient(),
methodOverride = require("method-override"),
bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

app.get ("/", function(req,res){
  client.lrange("students",0, -1, function(err,students){
     res.render("index", {students: students});
  });
});

app.post("/create", function(req,res){
  client.lpush("students", req.body.name);
  res.redirect("/");
});

app.delete("/remove/:student", function(req,res){
  client.lrange("students", 0, -1, function(err,students){
    students.forEach(function(student){
      if (req.params.student === student) {
        client.lrem("students", 1, student);
        res.redirect("/");
      }
    });
  });
});


app.put("/update/:student", function(req,res){
  client.lrange("students", 0, -1, function(err,students){
    students.forEach(function(student){
      if (req.params.student === student) {
        client.lrem("students", 1, student);
        res.redirect("/");
      }
    });
  });
});








app.listen(3000, function(){
  console.log("server starting on port 3000");
});