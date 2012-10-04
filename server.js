var path = require("path"),
  mailer = require("./lib/mailer"),
  generateDineroMailUrl = require("./lib/dineromail");

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

app.get("/succeed", function(req, res){
  res.render("succeed");
});

app.post("/", function(req, res){
  mailer(req.body.email, req.body.categoria, function(err){
    if(err){
      res.send(500, err);
    }else{
      res.redirect(generateDineroMailUrl(req.body));
    }
  });
});

app.listen(8001, function(){
  console.log("listening on http://localhost:8001");
});