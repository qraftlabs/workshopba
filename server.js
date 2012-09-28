var path = require("path"),
  mailer = require("./lib/mailer");

var express = require("express"),
  stylus = require("stylus"),
  nib = require("nib"),
  app = express();

app.configure(function(){
  this.set("views", __dirname + "/views");
  this.set("view engine", "jade");
  this.use(express.bodyParser());
  this.use('/css', stylus.middleware({
    src: __dirname + "/stylesheets",
    dest: __dirname + "/public/css",
    compile:  function compile(str, filePath) {
     return stylus(str)
       .set('filename', filePath)
        .set('paths', [ __dirname + "/stylesheets" ])
       .set('compress', true)
       .use(nib())
       .import('nib');
   }
  }));

  this.use(express.static(__dirname + "/public"));
  this.use(app.router);
});

app.get("/", function(req, res){
  res.render("index");
});

app.post("/register", function(req, res){
  mailer(req.body.email, function(err){
    if(err){
      res.send(500, err);
    }else{
      res.json({ok: 1});
    }
  });
});

app.listen(8001, function(){
  console.log("listening on http://localhost:8001");
});